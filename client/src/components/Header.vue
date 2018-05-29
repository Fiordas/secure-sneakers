<template>
  <nav class="navbar is-light has-shadow">
    <div class="navbar-menu container">
      <div class="navbar-start has-text-black-ter">
        <router-link to="/" class="navbar-item is-uppercase">Home</router-link>
        <router-link to="/products" class="navbar-item is-uppercase">Shop</router-link>
      </div>

      <div class="navbar-end is-dark">
        <div class="navbar-item">
          <router-link v-if="!auth" to="/signup" class="navbar-item is-uppercase">Sign Up</router-link>
          <router-link v-if="!auth" to="/signin" class="navbar-item is-uppercase">Sign In</router-link>
          <p class="buttons">
            <router-link v-if="auth" to="/panel" class="navbar-item button is-link is-outlined">Admin Panel</router-link>
            <a v-if="auth" @click="onLogout()" class="navbar-item button is-primary is-outlined">Logout</a>
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="css">
  nav {
    margin-bottom: 30px;
  }
</style>
