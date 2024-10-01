<template>
    <div class="gradient-bg">
      <!-- Left side (Gradient from base color to white) -->
      <div class="left-side flex flex-col justify-center items-center p-8 text-white">
        <h1 class="mb-4 text-3xl font-extrabold bg-clip-text bg-gradient-to-r from-orange-900 to-red-300 md:text-5xl lg:text-6xl">
          Finance Tracker
        </h1>
        <section class="description flex flex-col items-center">
          <h3 class="text-xl mb-4">The best way to manage your money!</h3>
        </section>
      </div>

      <!-- Right side (White) -->
      <div class="right-side flex justify-center items-center">
        <form @submit.prevent="handleSubmit" class="form-container text-primary border border-white flex flex-col gap-4 w-500 p-2 rounded border-primary">
          <input
            type="text"
            v-model="credentials.username"
            placeholder="Email or username"
            class="w-80 p-3 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 placeholder-primary"
          />
          <input
            type="password"
            v-model="credentials.password"
            placeholder="Password"
            class="w-80 p-3 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 placeholder-primary"
          />
          <button type="submit" class="bg-primary text-white p-2 rounded-md hover-bg-accent mb-0">
            <strong>Connect</strong>
          </button>
          <router-link to="/ForgotPasswd" class="text-primary p-1 rounded-md hover:text-[#BD897E]">
            <strong>Forgot your password?</strong>
          </router-link>
          <router-link to="/CreateAccount" class="bg-primary text-white p-2 rounded-md hover-bg-accent mt-1">
            <strong>Create an account</strong>
          </router-link>
        </form>
      </div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      // Logic to handle form submission
      console.log('Submitted:', this.credentials)
      // Here you can add logic to authenticate the user
      // Clear the form after submission
      this.credentials.username = ''
      this.credentials.password = ''
    }
  }
}
</script>

  <style scoped>
  /* Updated styles for depth effect */
  .form-container {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow for depth */
    background-color: white; /* Ensure background color stands out */
    border-radius: 10px; /* Rounded corners */
    padding: 20px; /* Padding for a comfortable spacing */
  }

  /* New style for gradient background */
  .gradient-bg {
    background: linear-gradient(to right, #364652, rgb(255, 255, 255)); /* Updated gradient to start with the base color */
    height: 100vh; /* Full viewport height */
    display: flex;
  }

  /* Optional adjustments for left and right containers */
  .left-side,
  .right-side {
    width: 50%; /* Split screen */
  }

  /* Updated colors */
  .text-primary {
    color: #364652; /* Use the base color */
  }

  .bg-primary {
    background-color: #364652; /* Use the base color */
  }

  .hover-bg-accent:hover {
    background-color: #BD897E; /* Accent color */
  }

  .border-primary {
    border-color: #364652; /* Use the base color */
  }

  .placeholder-primary::placeholder {
    color: #364652; /* Placeholder text color */
  }
  </style>
