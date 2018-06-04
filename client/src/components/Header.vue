<template>
  <nav class="navbar is-light has-shadow">
    <div class="navbar-menu container">
      <div class="navbar-start has-text-black-ter">
        <router-link to="/" class="navbar-item is-uppercase">Home</router-link>
        <router-link to="/products" class="navbar-item is-uppercase">Shop</router-link>
      </div>

      <div class="navbar-end has-text-black-ter">
        <router-link v-if="!auth" to="/signup" class="navbar-item is-uppercase">Sign Up</router-link>
        <router-link v-if="!auth" to="/signin" class="navbar-item is-uppercase">Sign In</router-link>
        <!--<router-link v-if="auth" to="/" class="navbar-item"><i class="fas fa-star"></i></router-link>-->

        <div @click.stop :class="{ 'is-active': dropdownActive === true }" class="dropdown is-right">
          <a @click="setActive" class="navbar-item has-text-black-ter" aria-haspopup="true" aria-controls="dropdown-menu2">
            <div style="font-size:1.5em;">
              <span class="fa-layers fa-fw">
                <i class="fas fa-shopping-cart"></i>
                <span class="fa-layers-counter" style="background:Tomato">{{cart && cart.length || 0}}</span>
              </span>
            </div>
          </a>
          <div v-on-clickaway="closeDropdown" class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <h5 class="title is-5">Shopping cart</h5>
              </div>
              <template v-if="cart && cart.length > 0">
                <template v-for="(item, index) in cart">
                  <div v-bind:key="index">
                    <hr class="dropdown-divider">
                    <div class="dropdown-item">
                      <a @click="cartItemRemove(index)" class="delete is-medium is-pulled-right"></a>
                      <p><strong>{{item.name}}</strong></p>
                      <p>Size: {{item.amount.size}}, Quantity: {{item.amount.quantity}}</p>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <hr class="dropdown-divider">
                <div class="dropdown-item">
                  <p>Empty. Try adding some products!</p>
                </div>
              </template>
              <div class="dropdown-item">
                <router-link @click.native="setActive" to="/checkout" class="button is-primary is-pulled-right">Checkout</router-link>
              </div>
            </div>
          </div>
        </div>

        <p class="buttons">
          <router-link v-if="admin" to="/panel" class="navbar-item button is-link is-outlined">Admin Panel</router-link>
          <a v-if="auth" @click="onLogout()" class="navbar-item button is-primary is-outlined">Logout</a>
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway
  },
  data () {
    return {
      dropdownActive: false,
      cart: []
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    admin () {
      return this.$store.getters.isAdmin
    },
    getCart () {
      return this.$store.getters.getCart
    }
  },
  created () {
    this.cart = this.$store.getters.getCart
  },
  watch: {
    getCart (value) {
      this.cart = value
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    },
    setActive () {
      this.dropdownActive = !this.dropdownActive
    },
    closeDropdown: function () {
      this.dropdownActive = false
    },
    cartItemRemove (index) {
      this.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.$store.dispatch('storeCart')
    }
  }
}
</script>

<style lang="css">
  nav {
    margin-bottom: 30px;
  }
</style>
