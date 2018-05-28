<template>
  <nav class="navbar is-light has-shadow">
    <div class="navbar-menu container">
      <div class="navbar-start has-text-black-ter">
        <router-link to="/" class="navbar-item is-uppercase">Home</router-link>
        <router-link to="/products" class="navbar-item is-uppercase">Shop</router-link>
      </div>

      <div class="navbar-end is-dark">
        <div class="navbar-item">
          <router-link to="/signup" class="navbar-item is-uppercase">Sign Up</router-link>
          <router-link to="/signin" class="navbar-item is-uppercase">Sign In</router-link>
          <p class="control">
            <router-link to="/panel" class="navbar-item button is-link">Admin Panel</router-link>
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="css">
  nav {
    margin-bottom: 30px;
  }
</style>
