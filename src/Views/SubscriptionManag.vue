<template>
  <div class="bg_color min-h-screen flex flex-col">
    <!-- Conteneur principal -->
    <div class="w-full max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <!-- Header de la page -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold">Subscription Manager</h1>
        <router-link to="/Finance" class="text-blue-600 hover:underline">Back</router-link>
      </div>

      <!-- Formulaire pour ajouter un nouvel abonnement -->
      <div id="subscription-form" class="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Add a Subscription</h2>

        <!-- Champ de nom de l'abonnement -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name of the Subscription</label>
          <input type="text" id="name" v-model="subscription.name" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Name of the subscription">
        </div>

        <!-- Champ de prix -->
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="price" v-model="subscription.price" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Price">
        </div>

        <!-- Champ de prochaine date de paiement -->
        <div class="mb-4">
          <label for="nextPayment" class="block text-sm font-medium text-gray-700">Next Payment Date</label>
          <input type="date" id="nextPayment" v-model="subscription.nextPayment" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
        </div>

        <!-- Champ de type de plan -->
        <div class="mb-4">
          <label for="planType" class="block text-sm font-medium text-gray-700">Plan Type</label>
          <input type="text" id="planType" v-model="subscription.planType" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Plan type (ex. Monthly, Yearly)">
        </div>

        <!-- Bouton d'ajout -->
        <button @click="addSubscription" class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">Add a Subscription</button>
      </div>

      <!-- Liste des abonnements -->
      <div v-if="subscriptions.length > 0" class="mt-10">
        <h2 class="text-2xl font-semibold mb-4">Your Subscriptions</h2>
        <div class="bg-gray-100 p-4 rounded-lg shadow-md">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Price</th>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Next Payment</th>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Plan Type</th>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sub, index) in subscriptions" :key="index">
                <td class="py-2">{{ sub.name }}</td>
                <td class="py-2">{{ sub.price }} $</td>
                <td class="py-2">{{ sub.nextPayment }}</td>
                <td class="py-2">{{ sub.planType }}</td>
                <td class="py-2">
                  <button @click="removeSubscription(index)" class="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded-lg shadow">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <footer class="mt-10 text-center text-gray-500">
      <p class="text-sm">&copy; 2024 Fleury Menard Chartier</p>
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
      },
      subscriptions: [] // List to store subscriptions
    }
  },
  methods: {
    addSubscription () {
      if (this.subscription.name && this.subscription.price && this.subscription.nextPayment && this.subscription.planType) {
        // Prepare the subscription data
        const newSubscription = {
          Name: this.subscription.name,
          Price: this.subscription.price,
          PaymentDate: this.subscription.nextPayment,
          PlanType: this.subscription.planType
        }

        // Send a POST request to the server
        fetch('http://localhost:3001/add-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username || localStorage.getItem('username'),
            subscription: newSubscription
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.message === 'Subscription added successfully') {
              // Add to local array only if server call succeeds
              this.subscriptions.push({ ...this.subscription })
              console.log('Subscription added:', this.subscription)
              this.subscription = {
                name: '',
                price: null,
                nextPayment: '',
                planType: ''
              }
            } else {
              alert('Error adding subscription: ' + data.message)
            }
          })
          .catch(error => {
            console.error('Error:', error)
            alert('An error occurred while adding the subscription.')
          })
      } else {
        alert('Please fill out all fields before adding a subscription.')
      }
    },
    removeSubscription (index) {
      // Remove subscription from the list
      this.subscriptions.splice(index, 1)
      console.log('Subscription removed at index:', index)
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
