<template>
  <div>
    <h1 class="title">Products</h1>
    <div class="columns">
      <div class="column is-one-fifth">
        <h2 class="title">Search</h2>
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
            <div class="column is-one-third" v-for="product in products" :key="product._id">
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
export default {
  name: 'products',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    this.getProducts()
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
