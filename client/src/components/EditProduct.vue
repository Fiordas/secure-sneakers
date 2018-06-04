<template>
  <div>
    <h1 class="title">Edit Product</h1>
    <div class="column is-one-third">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name" v-model="name">
        </div>
      </div>
      <div class="field">
        <label class="label">Brand</label>
        <div class="control">
          <input class="input" type="text" placeholder="Brand" v-model="brand">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Description" v-model="description"></textarea>
        </div>
      </div>
      <div class="field">
        <div class="label">
          <label class="label">Size quantity in stock</label>
        </div>
        <div class="column">
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="(items, index) in stock" :key="index">
              <div class="field is-expanded">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">{{items.size}}</a>
                  </p>
                  <p class="control is-expanded">
                    <input class="input" type="number" v-model="items.quantity">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Unit price</label>
        <div class="control">
          <input class="input" type="number" v-model="price">
        </div>
      </div>
      <div class="field">
        <label class="label">Image</label>
        <div class="control">
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </div>
      </div>
      <div>
        <button class="button is-primary" @click="updateProduct">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'EditProduct',
  data () {
    return {
      name: '',
      brand: '',
      description: '',
      stock: [ ],
      price: 0,
      file: ''
    }
  },
  mounted () {
    this.getProduct()
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    async getProduct () {
      const response = await ProductsService.getProduct({
        id: this.$route.params.id
      })
      this.name = response.data.name
      this.brand = response.data.brand
      this.description = response.data.description
      this.stock = response.data.stock
      this.price = response.data.price
    },
    async updateProduct () {
      await ProductsService.updateProduct({
        id: this.$route.params.id,
        name: this.name,
        brand: this.brand,
        description: this.description,
        stock: this.stock,
        price: this.price,
        filename: this.file.name
      })

      let formData = new FormData()
      formData.append('image', this.file)
      await ProductsService.upload(formData)

      this.$router.push({ name: 'Panel' })
    }
  }
}
</script>
