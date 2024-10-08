<template>
  <div class="bg_color min-h-screen flex flex-col justify-between">
    <!-- Main Container with top and bottom margin -->
    <div class="max-w-6xl mx-auto mt-5 mb-5 py-10 px-4 lg:px-8 bg-white rounded-lg shadow-xl">
      <div class="container mx-auto py-10 space-y-10">
        <!-- Title -->
        <h1 class="text-center text-4xl font-bold text-gray-800">Your Smart Banking</h1>

        <!-- TradingView Ticker Tape Widget -->
        <div class="px-10">
          <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget" ref="tradingViewWidget"></div>
          </div>
        </div>

        <!-- Monthly Data Section -->
        <div class="grid grid-cols-2 gap-6 px-10">
          <div class="bg-gray-100 rounded-xl p-6 text-center shadow-md">
            <p class="uppercase text-sm font-semibold text-gray-600">This Month</p>
            <p class="text-3xl font-bold text-red-600">-$14200</p>
          </div>
          <div class="bg-gray-100 rounded-xl p-6 text-center shadow-md">
            <p class="uppercase text-sm font-semibold text-gray-600">Last Month</p>
            <p class="text-3xl font-bold text-green-600">-$10000</p>
          </div>
        </div>

        <!-- Graph Section -->
        <div class="px-10">
          <div class="bg-gray-100 rounded-xl p-6 shadow-md">
            <canvas ref="expenseChart" class="rounded-xl"></canvas>
          </div>
        </div>

        <!-- Expense Description -->
        <div class="bg-gray-100 rounded-xl p-6 mx-10 text-center shadow-md">
          <p class="text-lg text-gray-800">
            This month, you used <span class="font-bold">50%</span> more on groceries and <span class="font-bold">20%</span> less on family expenses.
          </p>
        </div>

        <!-- Monthly Comparison -->
        <div class="grid grid-cols-2 gap-6 px-10">
          <div class="bg-gray-100 rounded-xl p-6 text-center shadow-md">
            <p class="text-lg font-semibold text-gray-800">You are using more money than last month</p>
          </div>
          <div class="bg-gray-100 rounded-xl p-6 text-center shadow-md">
            <p class="text-3xl font-bold text-red-600">-$4200</p>
          </div>
        </div>

        <!-- Profile Button -->
        <div class="flex justify-center px-10">
          <router-link to="/Finance">
            <button class="bg-gray-800 text-white font-bold py-2 px-6 border border-black rounded hover:bg-gray-700 transition">
              Your profile
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-10 text-center text-gray-500">
      <p class="text-sm">&copy; 2024 Fleury Menard Chartier</p>
    </footer>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'FinanceTracker',
  data () {
    return {
      chartInstance: null // Store the chart instance for later use
    }
  },
  mounted () {
    this.loadTradingViewWidget()
    this.renderChart()
  },
  methods: {
    loadTradingViewWidget () {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500 Index' },
          { proName: 'FOREXCOM:NSXUSD', title: 'US 100 Cash CFD' },
          { proName: 'FX_IDC:EURUSD', title: 'EUR to USD' },
          { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
          { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' }
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: 'adaptive',
        colorTheme: 'dark',
        locale: 'en'
      })

      this.$refs.tradingViewWidget.appendChild(script)
    },
    renderChart () {
      const ctx = this.$refs.expenseChart.getContext('2d')
      this.chartInstance = new Chart(ctx, { // Store the chart instance
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Monthly Expenses',
            data: [1200, 1900, 3000, 2500, 2800, 2300], // Sample data for expenses
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1 // Adds a slight curve to the line
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Months'
              }
            }
          }
        }
      })
    }
  }
}

</script>

<style scoped>
/* Apply your background color using Tailwind */
.bg_color {
  background: linear-gradient(to right, #364652, rgb(255, 255, 255));
}

/* Hover effect */
.hover-beige:hover {
  background-color: #e0d3b8;
  color: #2c3e50;
}

/* Scroll-bar styling */
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
