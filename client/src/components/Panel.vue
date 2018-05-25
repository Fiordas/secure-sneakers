<template>
  <div>
    <h1 class="title">Product Panel</h1>
    <div v-if="products.length > 0">
      <div>
        <router-link v-bind:to="{ name: 'AddProduct' }" class="">Add Product</router-link>
      </div>
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td>{{ product.name }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.description }}</td>
            <td>
              <table class="table is-narrow">
                <tr><th>Size</th><th>Quantity</th></tr>
                <template v-for="stocks in product.stock">
                  <template v-if="stocks.quantity > 0">
                    <tr>
                      <td>{{stocks.size}}</td>
                      <td>{{stocks.quantity}}</td>
                    </tr>
                  </template>
                </template>
              </table>
            </td>
            <td>{{ product.price }}</td>
            <td align="center">
              <router-link v-bind:to="{ name: 'EditProduct', params: { id: product._id } }">Edit</router-link> |
              <a href="#" @click="deleteProduct(product._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      There are no products.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'AddProduct' }" class="add_product_link">Add product</router-link>
    </div>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'Panel',
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
    },
    async deleteProduct (id) {
      await ProductsService.deleteProduct(id)
      this.getProducts()
      this.$router.push({ name: 'Panel' })
    }
  }
}
</script>
