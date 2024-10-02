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
            <div class="tradingview-widget-copyright">
              <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                <span class="blue-text">Track all markets on TradingView</span>
              </a>
            </div>
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

        <!-- Graph Placeholder -->
        <div class="px-10">
          <div class="bg-gray-100 rounded-xl p-6 shadow-md">
            <div class="w-full h-80 bg-gray-200 rounded-xl flex items-center justify-center">
              <p class="text-gray-500">Graph Chart Placeholder</p>
            </div>
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
          <router-link to="/">
            <button class="bg-gray-800 text-white font-bold py-2 px-6 border border-black rounded hover:bg-gray-700 transition">
              Your profile
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-10 text-center text-gray-500">
      <p class="text-sm">&copy; 2024 Fleury Menard Chartier Luce-Laurent</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FinanceTracker',
  mounted () {
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
