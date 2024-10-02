<template>
  <div>
    <!-- This is where the routed component will be displayed -->
    <router-view :fullName="fullName"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fullName: '',
      balance: ''
    }
  },
  mounted () {
    // Fetch the full name from localStorage and set it to the component's state
    this.fullName = localStorage.getItem('full name') || 'Guest' // Ensure the key matches what you set
    this.balance = localStorage.getItem('balance') || '/' // Ensure the key matches what you set
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
