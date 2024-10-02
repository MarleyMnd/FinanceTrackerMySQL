<template>
  <div>
    <!-- This is where the routed component will be displayed -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      fullName: ''
    }
  },
  mounted () {
    // Fetch the full name from localStorage and set it to the component's state
    this.fullName = localStorage.getItem('full name') || 'Guest' // Ensure the key matches what you set
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>
