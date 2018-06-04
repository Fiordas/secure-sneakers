<template>
  <div>
    <h1 class="title">Products</h1>
    <div class="columns">
      <div class="column is-one-fifth">
        <h4 class="subtitle is-4">Search</h4>
        <label class="label">Brand</label>
        <div class="field" v-for="(brand, i) in brands" v-bind:key="brand.name">
          <div class="control b-checkbox is-primary is-inline">
            <input v-bind:id="brand.name" type="checkbox" class="styled" v-model="brands[i].filter">
            <label v-bind:for="brand.name"> {{brand.name}}</label>
          </div>
        </div>
        <div class="field">
          <label class="label">Price</label>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <vue-slider v-bind="priceRange" v-model="priceRange.value"></vue-slider>
              </p>
            </div>
          </div>
        </div>
        <br/> <br/>
        <div class="field">
          <label class="label">Size</label>
          <div class="columns is-multiline">
            <div class="colum" v-for ="(size, i) in sizes" v-bind:key="size.number">
              <div class="card">
                <a href="#" class="cell" :class="{'active': size.filter}" @click.prevent = "setActive(i)">{{size.number}}</a>
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
                                <span @click="addOrder(index, cartIndex, product._id, product.name, product.filename, stocks._id, stocks.size, product.price)" v-bind:key="cartIndex" class="button">{{stocks.size}}</span>
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
import vueSlider from 'vue-slider-component'

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
        filename: '',
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
        filename: '',
        amount: {
          stockId: '',
          size: 0,
          quantity: 0
        },
        price: 0
      },
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
        width: '100%',
        height: 3,
        dotSize: 10,
        disabled: false,
        show: true,
        useKeyboard: true,
        tooltip: 'always',
        tooltipDir: ['bottom', 'bottom'],
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
  mounted () {
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
      const response = await ProductsService.fetchProducts()
      this.products = response.data.products
    },
    addOrder (productIndex, cartIndex, selectedProductId, selectedName, selectedFileName, selectedStockId, selectedSize, selectedPrice) {
      this.products[productIndex].stock[cartIndex].quantity -= 1

      if (!localStorage.getItem('cart')) {
        this.cartItems = [{
          productId: selectedProductId,
          name: selectedName,
          filename: selectedFileName,
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
          filename: selectedFileName,
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
