<template>
  <div>
    <h1 class="title">Products</h1>
    <div class="columns">
      <div class="column is-one-fifth">
        <h4 class="subtitle is-4">Search</h4>
        <input type="range" min="1" max="100" class="slider">
        <div class="field">
          <div class="control">
            <label class="checkbox">
              Brand <input type="checkbox">
            </label>
          </div>
          <div class="control">
            <label class="checkbox">
              Brand <input type="checkbox">
            </label>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="media" v-if="products.length > 0">
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="(product, index) in products" :key="product._id">
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                    <img src="../assets/adidas-nmd-runner-triple-white.jpg">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{ product.name }}</p>
                      <p class="subtitle is-6">{{ product.brand }}</p>
                    </div>
                  </div>
                  <div class="content">
                    <p class="limited-text">{{ product.description }}</p>
                  </div>
                  <router-link v-bind:to="{ name: 'Details', params: { id: product._id } }" class="button is-primary is-outlined">Details</router-link>
                  <p class="buttons is-pulled-right">
                    <router-link v-bind:to="{ name: 'Details', params: { id: product._id } }" class="button is-primary is-outlined"><i class="fa fa-star"></i></router-link>
                  </p>

                  <div @click.stop :class="{ 'is-active': activeItemId === index }" class="dropdown is-pulled-right">
                    <div>
                      <button @click="setActiveItemId(index)" class="button is-primary is-outlined" aria-haspopup="true" aria-controls="dropdown-menu2"><i class="fa fa-shopping-basket"></i></button>
                    </div>
                    <div v-on-clickaway="closeDropdown" class="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <div class="dropdown-item">
                          <p>Select size:</p>
                          <hr class="dropdown-divider">
                          <div class="buttons has-addons">
                            <template v-for="(stocks, cartIndex) in product.stock">
                              <template v-if="stocks.quantity > 0">
                                <span @click="addOrder(index, cartIndex, product._id, product.name, stocks._id, stocks.size, product.price)" v-bind:key="cartIndex" class="button">{{stocks.size}}</span>
                              </template>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <router-view/>
        </div>
        <div v-else>
          There are no products..<br /><br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'products',
  directives: {
    onClickaway: onClickaway
  },
  data () {
    return {
      products: [],
      activeItemId: '',
      cartItems: [{
        productId: '',
        name: '',
        amount: {
          stockId: '',
          size: 0,
          quantity: 0
        },
        price: 0
      }],
      addItem: {
        productId: '',
        name: '',
        amount: {
          stockId: '',
          size: 0,
          quantity: 0
        },
        price: 0
      }
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    async getProducts () {
      const response = await ProductsService.fetchProducts()
      this.products = response.data.products
    },
    addOrder (productIndex, cartIndex, selectedProductId, selectedName, selectedStockId, selectedSize, selectedPrice) {
      this.products[productIndex].stock[cartIndex].quantity -= 1

      if (!localStorage.getItem('cart')) {
        this.cartItems = [{
          productId: selectedProductId,
          name: selectedName,
          amount: {
            stockId: selectedStockId,
            size: selectedSize,
            quantity: 1
          },
          price: selectedPrice
        }]
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        this.$store.dispatch('storeCart')
      } else {
        this.cartItems = JSON.parse(localStorage.getItem('cart'))
        for (let i = 0, length = this.cartItems.length; i < length; i++) {
          if (this.cartItems[i].productId === selectedProductId && this.cartItems[i].amount.size === selectedSize) {
            this.cartItems[i].amount.quantity++
            localStorage.setItem('cart', JSON.stringify(this.cartItems))
            this.$store.dispatch('storeCart')
            return
          }
        }
        // when new one
        this.addItem = {
          productId: selectedProductId,
          name: selectedName,
          amount: {
            stockId: selectedStockId,
            size: selectedSize,
            quantity: 1
          },
          price: selectedPrice
        }
        this.cartItems.push(this.addItem)
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        this.$store.dispatch('storeCart')
      }
    },
    setActiveItemId (itemIndex) {
      if (this.activeItemId === '') {
        this.activeItemId = itemIndex
      } else {
        this.activeItemId = ''
      }
    },
    closeDropdown: function () {
      this.activeItemId = ''
    }
  }
}
</script>

<style>
  .limited-text{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
