<template>
  <body class="bg_color min-h-screen flex flex-col justify-between text-gray-900">
    <main class="max-w-6xl mx-auto mt-5 mb-5 py-10 px-4 lg:px-8 bg-white rounded-lg shadow-xl">
      <!-- Title Section -->
      <h1 class="text-center text-4xl font-bold text-gray-800 mb-6 md:text-5xl">Finance Tracker</h1>
      <p class="text-center text-lg text-gray-500 mb-8">The best way to manage your money!</p>

      <!-- Dashboard Section -->
      <div class="grid gap-6 lg:grid-cols-3 mb-8">
        <!-- Welcome Message -->
        <div class="bg-gray-100 rounded-lg p-4 shadow-md flex items-center justify-center">
          <p class="font-bold text-xl text-gray-800">Hello, {{ fullName }}</p>
        </div>
        <!-- Balance -->
        <div class="bg-gray-100 rounded-lg p-4 text-center shadow-md">
          <p class="text-lg font-medium text-gray-600">Your balance</p>
          <h2 class="text-green-500 text-3xl font-bold">$10,000</h2>
        </div>
        <!-- Expenses -->
        <div class="bg-gray-100 rounded-lg p-4 text-center shadow-md">
          <p class="text-lg font-medium text-gray-600">Your expenses</p>
          <h2 class="text-red-500 text-3xl font-bold">-$10,000</h2>
        </div>
      </div>

      <div class="border rounded-2xl overflow-hidden m-2 max-h-64 overflow-y-auto relative">
        <table class="min-w-full text-left text-sm bg-neutral-200 table-fixed">
          <tbody>
            <!-- Date Row -->
            <tr class="bg-gray-300">
              <td colspan="3" class="px-6 py-2 font-semibold text-left">10/18/2024</td>
            </tr>
            <!-- Transactions -->
            <tr>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-left">Dollarama</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 italic font-thin text-center">3:45 PM</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-right text-red-600">-$15.67</td>
            </tr>
            <tr>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-left">Netflix</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 italic font-thin text-center">10:03 AM</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-right text-red-600">-$11.34</td>
            </tr>
            <tr>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-left">National Bank</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 italic font-thin text-center">9:47 AM</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-right text-green-600">+$2537.04</td>
            </tr>
            <!-- Next Date Row -->
            <tr class="bg-gray-300">
              <td colspan="3" class="px-6 py-2 font-semibold text-left">10/17/2024</td>
            </tr>
            <!-- Transactions -->
            <tr>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-left">METRO</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 italic font-thin text-center">7:55 PM</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-right text-red-600">-$30.28</td>
            </tr>
            <tr>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-left">Starbucks</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 italic font-thin text-center">1:03 PM</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-right text-red-600">-$6.81</td>
            </tr>
            <tr>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-left">National Bank</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 italic font-thin text-center">9:47 AM</td>
              <td class="w-1/3 whitespace-nowrap px-6 py-2 text-right text-green-600">+$2537.04</td>
            </tr>
            <tr class="sticky bottom-0">
              <td colspan="3" class="px-6 py-4 text-right">
                <span class="flex justify-end space-x-4">
                  <button class="bg-gray-800 text-white py-3 px-6 rounded-full shadow-md hover:bg-beige transition-colors duration-300 w-32">Remove</button>
                  <button class="bg-gray-800 text-white py-3 px-6 rounded-full shadow-md hover:bg-beige transition-colors duration-300 w-32">Add</button>
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
  </body>
</template>

<script>
export default {
  data () {
    return {
      fullName: ''
    }
  },
  mounted () {
    // Fetch full name from local storage
    this.fullName = localStorage.getItem('full name') || 'Guest' // Get full name with a space
    console.log('Retrieved full name:', this.fullName) // Log the retrieved value
  }
}
</script>

<style>
/* Apply your background color using Tailwind */
.bg_color {
  background: linear-gradient(to right, #364652, rgb(255, 255, 255));
}

/* Designing for scroll-bar */
::-webkit-scrollbar {
  width: 9px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(225, 215, 215);
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2c3e50;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #495a5e;
}
</style>
