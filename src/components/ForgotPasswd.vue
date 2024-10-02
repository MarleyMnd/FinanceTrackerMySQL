<template>
    <div class="gradient-bg">
      <!-- Conteneur principal -->
      <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">

        <!-- Header de la page -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold">Forgot your password?</h1>
          <router-link to="/" class="text-blue-600 hover:underline">Back to the connection page</router-link>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg shadow-md">

          <!-- Name and Surname -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Specify your email</label>
            <input
              type="text"
              id="email"
              v-model="email"
              class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
            />
          </div>
          <h2 class="mb-2 text-center"><strong>If your email is linked to an account we will send you an email!</strong></h2>
          <button @click="sendResetEmail" class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">Send Reset Email</button>
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
      email: ''
    }
  },
  methods: {
    sendResetEmail () {
      // Logic to send the reset email
      console.log('Reset email sent to:', this.email)
      // Here you would typically call an API to handle the email sending
      this.email = '' // Clear the email field after sending
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
