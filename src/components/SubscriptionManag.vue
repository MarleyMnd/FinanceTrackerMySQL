<template>
    <div class="bg_color min-h-screen flex flex-col">
      <!-- Conteneur principal -->
      <div class="w-full max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <!-- Header de la page -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold">Subscription manager</h1>
          <router-link to="/" class="text-blue-600 hover:underline">Back</router-link>
        </div>

        <!-- Formulaire pour ajouter un nouvel abonnement -->
        <div id="subscription-form" class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Add a subscription</h2>

          <!-- Champ de nom de l'abonnement -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name of the subscription</label>
            <input type="text" id="name" v-model="subscription.name" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Name of the subscription">
          </div>

          <!-- Champ de prix -->
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="price" v-model="subscription.price" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Prix">
          </div>

          <!-- Champ de prochaine date de paiement -->
          <div class="mb-4">
            <label for="nextPayment" class="block text-sm font-medium text-gray-700">Next payment date</label>
            <input type="date" id="nextPayment" v-model="subscription.nextPayment" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
          </div>

          <!-- Champ de type de plan -->
          <div class="mb-4">
            <label for="planType" class="block text-sm font-medium text-gray-700">Plan Type</label>
            <input type="text" id="planType" v-model="subscription.planType" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Plan type (ex. Monthly, Yearly)">
          </div>

          <!-- Bouton d'ajout -->
          <button @click="addSubscription" class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">Add a subscription</button>
        </div>
      </div>

      <footer class="mt-10 text-center text-gray-500">
        <p class="text-sm">&copy; 2024 Fleury Menard Chartier Luce-Laurent</p>
      </footer>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      subscription: {
        name: '',
        price: null,
        nextPayment: '',
        planType: ''
      }
    }
  },
  methods: {
    addSubscription () {
      // Logic for adding the subscription
      console.log('Subscription added:', this.subscription)
      // Clear the form after submission
      this.subscription = {
        name: '',
        price: null,
        nextPayment: '',
        planType: ''
      }
    }
  }
}
</script>

  <style scoped>
  .bg-color {
    background: linear-gradient(to right, #364652, rgb(255, 255, 255));
  }

  /* Designing for scroll-bar */
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
