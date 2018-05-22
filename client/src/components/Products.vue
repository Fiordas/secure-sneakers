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
                    <p>{{ product.description }}</p>
                  </div>
                  <footer class="card-footer">
                    <router-link to="" class="button is-primary is-uppercase">Details</router-link>
                  </footer>
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
