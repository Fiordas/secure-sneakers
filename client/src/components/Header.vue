<template>
  <nav class="navbar is-primary">
    <div class="navbar-menu container">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/products" class="navbar-item">Shop</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
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
