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
          <h2 class="text-green-500 text-3xl font-bold">{{ balance }}$</h2>
        </div>
        <!-- Total Expenses -->
        <div class="bg-gray-100 rounded-lg p-4 text-center shadow-md flex-1">
          <p class="text-lg font-medium text-gray-600">Your total expenses</p>
          <h2 class="text-red-500 text-3xl font-bold">{{ totalExpenses }}$</h2>
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
                <td class="w-1/3 whitespace-nowrap px-6 py-2 text-left">{{ expense.Name }}</td>
                <td class="w-1/3 whitespace-nowrap px-6 py-2 italic font-thin text-center">{{ formatTime(expense.Date) }}</td>
                <td class="w-1/3 whitespace-nowrap px-6 py-2 text-right" :class="expense.Price < 0 ? 'text-red-600' : 'text-green-600'">
                  {{ formatPrice(expense.Price) }}
                </td>
              </tr>
            </template>

            <!-- Add Expense Form -->
            <tr class="bg-gray-50">
              <td colspan="3" class="px-6 py-4">
                <div class="flex space-x-4">
                  <input type="text" v-model="newExpenseName" placeholder="Expense Name" class="flex-1 p-3 rounded-lg border border-gray-300"/>
                  <input type="number" v-model="newExpensePrice" placeholder="Amount" class="flex-1 p-3 rounded-lg border border-gray-300"/>
                  <button @click="addExpense" class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">Add</button>
                </div>
              </td>
            </tr>

            <!-- Footer Row -->
            <tr>
              <td colspan="3" class="px-6 py-4 text-right">
                <span class="flex justify-end space-x-4">
                  <button @click="removeLastExpense" class="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md hover:bg-beige transition-colors duration-300">Remove</button>
                </span>
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
          <img src="chart-placeholder.png" alt="Chart of subscriptions" class="mt-4 w-full h-40 object-cover rounded-lg">
        </div>
        <!-- Smart Banking -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <div class="text-center text-lg font-semibold text-gray-800">
            <router-link to="/SmartBanking" class="hover:text-gray-500">Your smart banking</router-link>
          </div>
          <p class="mt-4 text-center text-gray-600">This month, you used 50% more on groceries and 20% less on family expenses.</p>
        </div>
      </section>

      <!-- Footer -->
      <footer class="mt-10 text-center text-gray-500">
        <p class="text-sm">&copy; 2024 Fleury Menard Chartier Luce-Laurent</p>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      fullName: '',
      balance: 0,
      Allexpenses: [],
      totalExpenses: 0,
      groupedExpenses: [],
      newExpenseName: '', // New data property for the expense name
      newExpensePrice: 0 // New data property for the expense price
    }
  },
  created () {
  // Fetch data from query params or localStorage if available
    this.username = this.$route.query.username || localStorage.getItem('username') || ''
    this.fullName = this.$route.query.fullName || localStorage.getItem('fullName') || 'Guest'

    // Retrieve the expenses data from query params or localStorage
    const expensesData = this.$route.query.Allexpenses || localStorage.getItem('Allexpenses') || '[]'

    // Parse and set Allexpenses
    this.Allexpenses = JSON.parse(expensesData)

    // Now calculate the total expenses and balance after setting Allexpenses
    this.groupedExpenses = this.groupExpensesByDate(this.Allexpenses)
    this.totalExpenses = this.calculateTotalExpenses(this.Allexpenses)
    this.balance = this.calculateBalance(this.Allexpenses) || '/' // Fallback to '/' if no balance
  },
  methods: {
    // Group expenses by date
    groupExpensesByDate (expenses) {
      const grouped = []
      expenses.forEach(expense => {
        const date = expense.Date.split('T')[0] // Assuming ISO format
        let group = grouped.find(g => g.date === date)
        if (!group) {
          group = { date, expenses: [] }
          grouped.push(group)
        }
        group.expenses.push(expense)
      })
      return grouped
    },
    // Calculate total expenses
    calculateTotalExpenses (expenses) {
      return expenses.reduce((sum, expense) => {
        return expense.Price < 0 ? sum + Math.abs(parseFloat(expense.Price)) : sum // Only sum negative expenses
      }, 0)
    },
    calculateBalance (expenses) {
      return expenses.reduce((balance, expense) => {
        return balance + parseFloat(expense.Price) // Adds both positive and negative expenses correctly
      }, 0) // Start from 0
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
      const newExpense = {
        Name: this.newExpenseName,
        Price: parseFloat(this.newExpensePrice),
        Date: new Date().toISOString()
      }

      try {
        const response = await fetch('http://localhost:3001/add-expense', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username || localStorage.getItem('username'),
            expense: newExpense
          })
        })

        if (response.ok) {
          const data = await response.json()
          this.Allexpenses.push(data.expense)

          // Update balance based on the nature of the new expense
          this.balance = this.calculateBalance(this.Allexpenses) // Calculate balance after adding the new expense

          // Recalculate total expenses
          this.totalExpenses = this.calculateTotalExpenses(this.Allexpenses)

          // Group expenses by date
          this.groupedExpenses = this.groupExpensesByDate(this.Allexpenses)

          // Clear input fields
          this.newExpenseName = ''
          this.newExpensePrice = 0
        } else {
          console.error('Error adding expense:', await response.json())
        }
      } catch (error) {
        console.error('Error adding expense:', error)
      }
    },
    async removeLastExpense () {
      if (this.Allexpenses.length === 0) {
        alert('No expenses to remove!')
        return
      }

      const lastExpense = this.Allexpenses[this.Allexpenses.length - 1]

      try {
        const response = await fetch('http://localhost:3001/remove-expense', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username || localStorage.getItem('username'),
            expenseId: lastExpense._id // Assuming each expense has a unique _id in the database
          })
        })

        if (response.ok) {
        // Remove last expense from the array
          this.Allexpenses.pop()

          // Update balance and total expenses
          this.balance = this.calculateBalance(this.Allexpenses)
          this.totalExpenses = this.calculateTotalExpenses(this.Allexpenses)
          this.groupedExpenses = this.groupExpensesByDate(this.Allexpenses)
        } else {
          console.error('Error removing expense:', await response.json())
        }
      } catch (error) {
        console.error('Error removing expense:', error)
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
