<template>
  <div class="bg-color min-h-screen flex flex-col justify-between text-gray-900">
    <main class="w-full max-w-6xl mx-auto mt-5 mb-5 py-10 px-4 lg:px-8 bg-white rounded-lg shadow-xl">
      <!-- Title Section -->
      <h1 class="text-center text-4xl font-bold text-gray-800 mb-6 md:text-5xl">Finance Tracker</h1>
      <p class="text-center text-lg text-gray-500 mb-8">The best way to manage your money!</p>

      <!-- Parent container with flex layout -->
      <div class="flex space-x-4 w-full">
        <!-- Welcome Message -->
        <div class="bg-gray-100 rounded-lg p-4 shadow-md flex items-center justify-center flex-1">
          <p class="font-bold text-xl text-gray-800">Welcome, {{ fullName }}</p>
        </div>
        <!-- Balance -->
        <div class="bg-gray-100 rounded-lg p-4 text-center shadow-md flex-1">
          <p class="text-lg font-medium text-gray-600">Your balance</p>
          <h2 class="text-green-500 text-3xl font-bold">{{ localBalance.toFixed(2) }}$</h2>
        </div>
        <!-- Total Expenses -->
        <div class="bg-gray-100 rounded-lg p-4 text-center shadow-md flex-1">
          <p class="text-lg font-medium text-gray-600">Your total expenses</p>
          <h2 class="text-red-500 text-3xl font-bold">{{ totalExpenses.toFixed(2) }}$</h2>
        </div>
      </div>

      <!-- Expense Table -->
      <div class="mt-5 mb-5 border rounded-lg overflow-hidden max-h-64 overflow-y-auto relative drop-shadow-md">
        <table class="min-w-full max-w-6xl text-left text-sm bg-gray-100 table-fixed">
          <tbody>
            <!-- Group expenses by date -->
            <template v-for="(expenseGroup, index) in groupedExpenses" :key="index">
              <!-- Date Row -->
              <tr class="bg-neutral-200">
                <td colspan="3" class="px-6 py-2 font-semibold text-left">{{ formatDate(expenseGroup.date) }}</td>
              </tr>
              <!-- Transactions -->
              <tr v-for="(expense, expenseIndex) in expenseGroup.expenses" :key="expenseIndex">
                <td class="w-1/3 whitespace-nowrap px-6 py-2 text-left">{{ expense.name }}</td>
                <td class="w-1/3 whitespace-nowrap px-6 py-2 italic font-thin text-center">{{ formatTime(expense.datetime) }}</td>
                <td class="w-1/3 whitespace-nowrap px-6 py-2 text-right" :class="expense.price < 0 ? 'text-red-600' : 'text-green-600'">
                  {{ formatPrice(expense.price) }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="flex space-x-4 mb-4">
    <input type="text" v-model="newExpenseName" placeholder="Expense Name" class="flex-1 p-3 rounded-lg border border-gray-300" />
    <input type="number" v-model="newExpensePrice" placeholder="Amount" class="flex-1 p-3 rounded-lg border border-gray-300" />
    <button @click="addExpense" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg">Add</button>
  </div>
<div class="overflow-hidden rounded-lg border mb-4 shadow-md">
    <table class="min-w-full bg-gray-100">
      <tbody>
        <!-- Table content goes here -->
        <!-- Footer Row -->
        <tr>
          <td colspan="4" class="px-6 py-4 text-right">
            <div class="flex justify-end">
              <button @click="removeLastExpense" class="flex-1 bg-gray-800 text-white py-2 rounded-lg shadow-md hover:bg-beige transition-colors duration-300">Remove</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
      <!-- Additional Information Sections -->
      <section class="grid gap-6 md:grid-cols-2">
        <!-- Subscriptions -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <div class="text-center text-lg font-semibold text-gray-800">
            <router-link to="/SubscriptionManag" class="hover:text-gray-500">Your subscriptions</router-link>
          </div>
        </div>
        <!-- Smart Banking -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <div class="text-center text-lg font-semibold text-gray-800">
            <router-link to="/SmartBanking" class="hover:text-gray-500">Your smart banking</router-link>
          </div>
          <p class="mt-4 text-center text-gray-600">This month, you used 50% more on groceries and 20% less on family expenses.</p>
        </div>
      </section>

      <!-- Tasks -->
      <div class="bg-gray-100 p-6 rounded-lg shadow-md mt-7">
        <div class="text-center text-lg font-semibold text-gray-800">
          <router-link to="/Tasks">
            <button>Your tasks</button>
          </router-link>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-10 text-center text-gray-500">
        <p class="text-sm">&copy; 2024 Fleury Menard Chartier</p>
      </footer>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      localBalance: 0,
      Allexpenses: [],
      totalExpenses: 0,
      groupedExpenses: [],
      newExpenseName: '', // New data property for the expense name
      newExpensePrice: 0 // New data property for the expense price
    }
  },
  created () {
    this.fullName = this.$route.query.fullName || localStorage.getItem('fullName') || 'Guest'
    this.balance = this.$route.query.balance || localStorage.getItem('balance') || 0
    this.localBalance = parseFloat(this.balance)
    this.userId = this.$route.query.userId || localStorage.getItem('userId') || null

    const userExpensesData = this.$route.query.userExpenses || localStorage.getItem('userExpenses') || '[]'
    this.Allexpenses = JSON.parse(userExpensesData) // Parse the JSON string to an object

    // Initialize total expenses and grouped expenses
    this.totalExpenses = this.calculateTotalExpenses(this.Allexpenses)
    this.localBalance = this.calculateBalance(this.Allexpenses)
    this.groupedExpenses = this.groupExpensesByDate(this.Allexpenses)

    console.log('User expenses:', this.Allexpenses)
    console.log('Total Expenses:', this.totalExpenses)
    console.log('Local Balance:', this.localBalance)
  },
  methods: {
    // Group expenses by date
    groupExpensesByDate (expenses) {
      const grouped = []
      expenses.forEach(expense => {
        const date = expense.datetime.split('T')[0] // Assuming ISO format
        let group = grouped.find(g => g.date === date)
        if (!group) {
          group = { date, expenses: [] }
          grouped.push(group)
        }
        group.expenses.push(expense)
      })
      console.log('Grouped expenses:', grouped)
      return grouped
    },
    // Calculate total expenses (only negative expenses)
    calculateTotalExpenses (userExpenses) {
      return userExpenses.reduce((sum, expense) => {
        return expense.price < 0 ? sum + Math.abs(parseFloat(expense.price)) : sum
      }, 0)
    },
    // Calculate balance based on the initial localBalance plus all expenses
    calculateBalance (expenses) {
      return this.localBalance + expenses.reduce((balance, expense) => {
        return balance + parseFloat(expense.price)
      }, 0)
    },
    // Format date (helper function)
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    },
    // Format time (helper function)
    formatTime (time) {
      return new Date(time).toLocaleTimeString()
    },
    // Format price (helper function)
    formatPrice (price) {
      return `$${Math.abs(price).toFixed(2)}`
    },
    // Add new expense to the database
    async addExpense () {
      const expenseName = this.newExpenseName ? this.newExpenseName.trim() : ''
      if (!expenseName || this.newExpensePrice === undefined) {
        alert('Please enter both an expense name and a price.')
        return
      }

      const newExpense = {
        name: expenseName,
        price: parseFloat(this.newExpensePrice),
        datetime: new Date().toISOString()
      }

      try {
        const response = await axios.post('http://localhost:8080/addExpense', {
          username: this.username || localStorage.getItem('username'),
          expense: newExpense,
          userId: this.userId
        })

        const expenseData = response.data

        // Update the expenses list
        this.Allexpenses.push(expenseData)

        // Check if the last expense was positive or negative
        if (expenseData.price > 0) {
          this.localBalance += expenseData.price
        } else {
          this.localBalance -= Math.abs(expenseData.price)
          this.totalExpenses += Math.abs(expenseData.price)
        }

        // Update grouped expenses
        this.groupedExpenses = this.groupExpensesByDate(this.Allexpenses)

        // Clear input fields
        this.newExpenseName = ''
        this.newExpensePrice = 0
      } catch (error) {
        console.error('Error adding expense:', error)
        alert('Failed to add expense. Please try again.')
      }
    },
    async removeLastExpense () {
      if (this.Allexpenses.length === 0) {
        alert('No expenses to remove!')
        return
      }

      const lastExpense = this.Allexpenses[this.Allexpenses.length - 1]

      try {
        const response = await axios.post('http://localhost:8080/removeLastExpense', {
          userId: this.userId
        })

        if (response.data.message === 'Last expense deleted successfully.') {
          // Remove the last expense from the array
          this.Allexpenses.pop()

          // Check if the last expense was positive or negative
          if (lastExpense.price > 0) {
            // For positive expenses, subtract the amount from the balance
            this.localBalance -= lastExpense.price
          } else {
            // For negative expenses, add the amount back to the balance
            this.localBalance += Math.abs(lastExpense.price)
            this.totalExpenses -= Math.abs(lastExpense.price)
          }

          // Update grouped expenses
          this.groupedExpenses = this.groupExpensesByDate(this.Allexpenses)
        } else {
          console.error('Error removing expense:', response.data.message)
        }
      } catch (error) {
        console.error('Error removing expense:', error)
        alert('Failed to remove the last expense. Please try again.')
      }
    }
  }
}
</script>

<style>
.bg-color {
  background: linear-gradient(to right, #364652, rgb(255, 255, 255));
}  /* Designing for scroll-bar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: grey;
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #2c3e50;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style>
