<template>
    <div class="gradient-bg">
      <!-- Conteneur principal -->
      <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">

        <!-- Header de la page -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold">Welcome to Finance Tracker</h1>
          <router-link to="/LoginPage" class="text-blue-600 hover:underline">Back to the connection page</router-link>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Sign-Up</h2>

          <!-- Name and Surname -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
            />
          </div>

          <div class="mb-4">
            <label for="surname" class="block text-sm font-medium text-gray-700">Surname</label>
            <input
              type="text"
              id="surname"
              v-model="surname"
              class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              v-model="email"
              class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="@gmail.com"
            />
          </div>

          <button
            @click="createAccount"
            class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">
            Create your account
          </button>
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
      name: '',
      surname: '',
      email: ''
    }
  },
  methods: {
    createAccount () {
      // Logic to create an account
      console.log('Account created for:', this.name, this.surname, this.email)
      // Here you would typically call an API to handle the account creation
      this.name = ''
      this.surname = ''
      this.email = '' // Clear the fields after creating
    }
  }
}
</script>

  <style scoped>
  .gradient-bg {
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
