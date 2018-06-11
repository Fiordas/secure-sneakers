<template>
  <div>
    <h1 class="title">Edit Product</h1>
    <div class="columns">
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
          <label class="label">Unit price</label>
          <div class="control">
            <input class="input" type="number" v-model="price">
          </div>
        </div>
      </div>
      <div class="column is-one-third">
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
      </div>
      <div class="column is-one-third">
        <div class="field">
          <label class="label">Image</label>
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" id="file" ref="file" v-on:change="handleFileUpload()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name">
                {{ filename }}
              </span>
            </label>
          </div>
          <img v-if="imageUrl" :src="imageUrl" />
          <img v-if="!imageUrl && filename" :src="'https://localhost:3000/uploads/' + filename" />
        </div>
        <div>
          <button class="button is-primary is-pulled-right" @click="updateProduct">Update</button>
        </div>
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
      file: '',
      filename: '',
      imageUrl: null
    }
  },
  mounted () {
    this.getProduct()
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      this.imageUrl = URL.createObjectURL(this.file)
      this.filename = this.file.name
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
      this.filename = response.data.filename
    },
    async updateProduct () {
      await ProductsService.updateProduct({
        id: this.$route.params.id,
        name: this.name,
        brand: this.brand,
        description: this.description,
        stock: this.stock,
        price: this.price,
        filename: this.filename
      })

      let formData = new FormData()
      formData.append('image', this.file)
      await ProductsService.upload(formData)

      this.$router.push({ name: 'Panel' })
    }
  }
}
</script>
