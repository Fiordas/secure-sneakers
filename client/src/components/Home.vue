<template>
  <div class="tiles is-ancestor">
    <div class="tiles is-parent is-vertical">
      <div class="tile is-parent">
        <div class="tile is-5 has-black-bg is-child card is-radiusless">
          <h1 class="title-big has-text-grey-light is-uppercase">Secure Sneakers</h1>
        </div>
        <div class="tile is-child card">
          <figure class="image">
            <img src="../assets/adidas-nmd-runner-triple-white.jpg">
          </figure>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="media" v-if="products.length > 0">
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="(product, index) in products" :key="index">
              <div class="card ">
                <div class="card-image">
                  <router-link v-bind:to="{ name: 'Details', params: { id: product._id } }">
                  <figure class="image">
                    <img v-bind:src="'http://localhost:3000/uploads/' + product.filename">
                  </figure>
                  </router-link>
                </div>
                <div class="card-content columns">
                  <div class="column is-two-thirds"><p class="title is-4">{{ product.name }}</p> <p>{{product.brand}}</p></div>
                  <div class="column is-one-third">
                  <div class="buttons is-pulled-right">
                    <router-link v-bind:to="{ name: 'Details', params: { id: product._id } }" class="button is-primary is-outlined"><i class="fa fa-star"></i></router-link>

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
                              <template v-for="(stocks, stockIndex) in product.stock">
                                <template v-if="stocks.quantity > 0">
                                  <span @click="addOrder(index, stockIndex, product, stocks.size)" v-bind:key="stockIndex" class="button">{{stocks.size}}</span>
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

            </div>
          </div>
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
      cart: [],
      activeItemId: ''
    }
  },
  created () {
    this.cart = this.$store.getters.getCart
    this.getProducts()
  },
  methods: {
    async getProducts () {
      await ProductsService.fetchProducts().then((response) => {
        let removed = false
        if (this.cart) {
          this.cart.reduceRight(function (acc, item, index, object) {
            const productIndex = response.data.products.findIndex(products => products._id === item.product._id)
            if (productIndex !== -1) {
              const stockIndex = response.data.products[productIndex].stock.findIndex(stock => stock.size === item.size)
              if (response.data.products[productIndex].stock[stockIndex].quantity < item.quantity) {
                removed = true
                object.splice(index, 1)
              } else {
                response.data.products[productIndex].stock[stockIndex].quantity -= item.quantity
              }
            }
          }, [])
        }
        this.products = response.data.products
        if (removed) {
          alert('One or more items in your cart went out of stock and has been removed!')
          localStorage.setItem('cart', JSON.stringify(this.cart))
          this.$store.dispatch('storeCart')
        }
      })
    },
    addOrder (productIndex, stockIndex, selectedProduct, selectedSize) {
      this.products[productIndex].stock[stockIndex].quantity -= 1
      const selectedPayload = {
        selectedProduct: selectedProduct,
        selectedSize: selectedSize
      }
      this.$store.dispatch('updateCart', selectedPayload)
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
    },
    setActive: function (i) {
      this.sizes[i].filter = !this.sizes[i].filter
    }
  }
}
</script>

<style>
  .title-big {
    font-size: 100px;
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .has-black-bg {
    background-color: black;
  }
</style>
