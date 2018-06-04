<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <router-view/>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
    this.$store.dispatch('storeCart')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
