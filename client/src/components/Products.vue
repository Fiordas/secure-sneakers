<template>
  <div>
    <h1 class="title">Products</h1>
    <div class="media" v-if="products.length > 0">
      <div class="card" v-for="product in products" :key="product">
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
        </div>
      </div>
    </div>
    <div v-else>
      There are no products..<br /><br />
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
