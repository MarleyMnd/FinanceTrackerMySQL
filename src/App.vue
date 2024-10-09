<template>
  <div id="app">
    <!-- Only show the sidebar if the current route is not 'login' -->
    <SideBar v-if="!hideSidebar" />
    <router-view :fullName="fullName" />
  </div>
</template>

<script>
import SideBar from './Components/SideBar.vue'

export default {
  components: {
    SideBar
  },
  computed: {
    // Check if the current route is the login page (or any other route you want to exclude)
    hideSidebar () {
      const routesWithoutSidebar = ['/', '/ForgotPasswd', '/CreateAccount']
      return routesWithoutSidebar.includes(this.$route.path)
    }
  },
  name: 'App',
  data () {
    return {
      fullName: '',
      balance: '',
      userExpenses: [],
      userTasks: []
    }
  },
  mounted () {
    // Fetch the user details from localStorage and set them to the component's state
    this.fullName = localStorage.getItem('user') || 'Guest'
    this.userExpenses = localStorage.getItem('userExpenses') || []
    this.userId = localStorage.getItem('userId') || null
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
