<template>
  <div class="gradient-bg">
    <div class="left-side flex flex-col justify-center items-center p-8 text-white">
      <h1 class="mb-4 text-3xl font-extrabold bg-clip-text bg-gradient-to-r from-orange-900 to-red-300 md:text-5xl lg:text-6xl">
        Finance Tracker
      </h1>
      <section class="description flex flex-col items-center">
        <h3 class="text-xl mb-4">The best way to manage your money!</h3>
      </section>
    </div>

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
        <router-link to="/ForgotPasswd" class="text-primary text-center p-1 rounded-md hover:text-[#BD897E]">
          <strong>Forgot your password?</strong>
        </router-link>
        <router-link to="/CreateAccount" class="bg-primary text-center text-white p-2 rounded-md hover-bg-accent mt-1">
          <strong>Create an account</strong>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  setup () {
    const router = useRouter()
    return { router }
  },
  methods: {
    async handleSubmit () {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          username: this.credentials.username,
          password: this.credentials.password
        })

        const userData = response.data
        console.log('Login successful:', userData)

        console.log('User ID:', userData.id)

        // Store full name in localStorage
        localStorage.setItem('userId', userData.id)
        localStorage.setItem('fullName', userData.fullName)
        localStorage.setItem('balance', userData.balance)
        localStorage.setItem('userExpenses', JSON.stringify(userData.userExpenses))
        localStorage.setItem('userTasks', JSON.stringify(userData.userTasks))

        // Navigate to FinanceTracker with fullName in the query
        this.$router.push({ name: 'FinanceTracker', query: { fullName: userData.fullName } })
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Login failed: Invalid username or password.')
        } else {
          alert('Login failed: An error occurred. Please try again later.')
        }
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

.gradient-bg {
  background: linear-gradient(to right, #364652, rgb(255, 255, 255));
  height: 100vh;
  display: flex;
}

.left-side,
.right-side {
  width: 50%;
}

.text-primary {
  color: #364652;
}

.bg-primary {
  background-color: #364652;
}

.hover-bg-accent:hover {
  background-color: #BD897E;
}

.border-primary {
  border-color: #364652;
}

.placeholder-primary::placeholder {
  color: #364652;
}
</style>
