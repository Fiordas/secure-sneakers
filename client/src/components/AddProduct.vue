<template>
  <div class="products">
    <h1>Add Product</h1>
    <div class="form">
      <div>
        <input type="text" name="name" placeholder="NAME" v-model="name">
      </div>
      <div>
        <input type="text" name="brand" placeholder="BRAND" v-model="brand">
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <input type="number" name="size" placeholder="SIZE" v-model="size">
      </div>
      <div>
        <input type="number" name="price" placeholder="PRICE" v-model="price">
      </div>
      <div>
        <button class="app_post_btn" @click="addProduct">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      brand: '',
      description: '',
      size: 0,
      price: 0
    }
  },
  methods: {
    async addProduct () {
      await ProductsService.addProduct({
        name: this.name,
        brand: this.brand,
        description: this.description,
        price: this.price,
        size: this.size
      })
      this.$router.push({ name: 'Panel' })
    }
  }
}
</script>
<style type="text/css">
  .form input, .form textarea {
    width: 500px;
    padding: 10px;
    border: 1px solid #e0dede;
    outline: none;
    font-size: 12px;
  }
  .form div {
    margin: 20px;
  }
  .app_post_btn {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    width: 520px;
    border: none;
    cursor: pointer;
  }
</style>
