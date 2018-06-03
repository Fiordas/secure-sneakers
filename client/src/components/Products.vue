<template>
  <div>
    <h1 class="title">Products</h1>
    <div class="columns">
      <div class="column is-one-fifth">
        <h2 class="title">Search</h2>
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
          <div class="field">
            <div class="field-label">
              <label class="label">Price</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <vue-slider v-bind="priceRange" v-bind:min="minPrice" v-bind:max="maxPrice" v-model="priceRange.value"></vue-slider>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="media" v-if="products.length > 0">
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="product in filteredProducts" :key="product._id">
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
                    <router-link v-bind:to="{ name: 'Details', params: { id: product._id } }" class="button is-primary is-outlined"><i class="fa fa-shopping-basket"></i></router-link>
                  </p>
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
import vueSlider from 'vue-slider-component'

export default {
  name: 'products',
  data () {
    return {
      products: [],
      priceRange: {
        value: [0, 100],
        width: '100%',
        height: 3,
        dotSize: 10,
        disabled: false,
        show: true,
        useKeyboard: true,
        tooltip: 'always',
        tooltipDir: ['bottom', 'bottom'],
        formatter: '{value}',
        overlapFormatter: '{value1} ~ {value2}',
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
      return this.products.filter(product => {
        return product.price >= this.priceRange.value[0] && product.price <= this.priceRange.value[1]
      })
    },
    minPrice: function () {
      var prices = this.products.map(a => a.price)
      console.log(prices)
      return Math.min.apply(null, prices)
    },
    maxPrice: function () {
      var prices = this.products.map(a => a.price)
      console.log(prices)
      return Math.max.apply(null, prices)
    }
  },
  methods: {
    async getProducts () {
      const response = await ProductsService.fetchProducts()
      this.products = response.data.products
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
