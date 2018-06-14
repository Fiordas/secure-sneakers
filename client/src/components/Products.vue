<template>
  <div>
    <h1 class="title">Products</h1>
    <div class="columns">
      <div class="column is-one-fifth">
        <h4 class="subtitle is-4">Filter</h4>
        <label class="label">Brand</label>
        <div class="field" v-for="(brand, i) in brands" v-bind:key="brand.name">
          <div class="control">
            <input v-bind:id="brand.name" type="checkbox" v-model="brands[i].filter">
            <label v-bind:for="brand.name"> {{brand.name}}</label>
          </div>
        </div>
        <div class="field">
          <label style="margin-bottom: 20px;" class="label">Price</label>
          <br>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <vue-slider ref="slider" v-bind="priceRange" v-model="priceRange.value"></vue-slider>
              </p>
            </div>
          </div>
        </div>
        <label style="margin-bottom: 20px" class="label">Size</label>
        <div class="field">
          <div class="columns is-multiline">
            <div class="colum" v-for ="(size, i) in sizes" v-bind:key="size.number">
              <div class="buttons has-addons">
                <span class="button" :class="{'active': size.filter}" @click.prevent = "setActive(i)">{{size.number}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="media" v-if="products.length > 0">
          <div class="columns is-multiline">
            <!--<div class="column is-one-third" v-for="(product, index) in products" :key="product._id">-->
            <div class="column is-one-third" v-for="(product, index) in filteredProducts" :key="product._id">
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                    <img v-bind:src="'http://localhost:3000/uploads/' + product.filename" />
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
import vueSlider from 'vue-slider-component'

export default {
  name: 'products',
  directives: {
    onClickaway: onClickaway
  },
  data () {
    return {
      products: [],
      cart: [],
      activeItemId: '',
      brands: [
        {'name': 'Nike', filter: false},
        {'name': 'Adidas', filter: false},
        {'name': 'Reebok', filter: false}
      ],
      sizes: [
        {'number': 36, filter: false},
        {'number': 37, filter: false},
        {'number': 38, filter: false},
        {'number': 39, filter: false},
        {'number': 40, filter: false},
        {'number': 41, filter: false},
        {'number': 42, filter: false},
        {'number': 43, filter: false},
        {'number': 44, filter: false},
        {'number': 45, filter: false},
        {'number': 46, filter: false},
        {'number': 47, filter: false}
      ],
      priceRange: {
        value: [0, 1000],
        max: 1000,
        min: 0,
        width: '93%',
        height: 3,
        dotSize: 10,
        disabled: false,
        show: true,
        useKeyboard: true,
        tooltip: 'always',
        tooltipDir: ['top', 'top'],
        formatter: '€{value}',
        overlapFormatter: '€{value1} ~ €{value2}',
        bgStyle: {
          backgroundColor: '#fff',
          boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.20)'
        },
        tooltipStyle: {
          backgroundColor: 'hsl(171, 100%, 41%)',
          borderColor: 'hsl(171, 100%, 41%)'
        },
        processStyle: {
          backgroundColor: 'hsl(171, 100%, 41%)'
        }
      }
    }
  },
  components: {
    vueSlider
  },
  created () {
    this.cart = this.$store.getters.getCart
    this.getProducts()
  },
  computed: {
    filteredProducts: function () {
      var filteredBrands = []
      for (var i = 0; i < this.brands.length; i++) {
        if (this.brands[i].filter) {
          filteredBrands.push(this.brands[i].name)
        }
      }
      var filteredSizes = []
      for (i = 0; i < this.sizes.length; i++) {
        if (this.sizes[i].filter) {
          filteredSizes.push(this.sizes[i].number)
        }
      }
      return this.products.filter(product => {
        return product.price >= this.priceRange.value[0] && product.price <= this.priceRange.value[1] &&
        (this.brands.every(a => { return !a.filter }) || filteredBrands.includes(product.brand)) &&
        (this.sizes.every(a => { return !a.filter }) || filteredSizes.some(function (value) {
          for (i = 0; i < product.stock.length; i++) {
            if (product.stock[i].size === value && product.stock[i].quantity > 0) {
              return true
            }
          }
          return false
        }))
      })
    }
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
        this.priceRange.min = Math.min.apply(Math, this.products.map(function (o) { return o.price }))
        this.priceRange.max = Math.max.apply(Math, this.products.map(function (o) { return o.price }))
        const min = Math.min.apply(Math, this.products.map(function (o) { return o.price }))
        const max = Math.max.apply(Math, this.products.map(function (o) { return o.price }))
        this.$refs.slider.setValue([min, max])
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
  .limited-text{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .active {
    background-color: #00d1b2;
    color: white;
  }

  .cell {
    display: block;
    padding: 10px;
    color: black;
  }
</style>
