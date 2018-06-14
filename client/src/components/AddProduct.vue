<template>
  <div>
    <h1 class="title">Add Product</h1>
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
          <br>
          <img v-if="imageUrl" :src="imageUrl" />
          <img v-if="!imageUrl" src="../assets/image-placeholder.png" />
        </div>
        <div>
          <button class="button is-primary is-pulled-right" @click="addProduct">Add</button>
        </div>
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
      stock: [
        { size: 36, quantity: 0 },
        { size: 37, quantity: 0 },
        { size: 38, quantity: 0 },
        { size: 39, quantity: 0 },
        { size: 40, quantity: 0 },
        { size: 41, quantity: 0 },
        { size: 42, quantity: 0 },
        { size: 43, quantity: 0 },
        { size: 44, quantity: 0 },
        { size: 45, quantity: 0 },
        { size: 46, quantity: 0 },
        { size: 47, quantity: 0 }
      ],
      price: 0,
      file: '',
      filename: 'No file selected',
      imageUrl: null
    }
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      this.imageUrl = URL.createObjectURL(this.file)
      this.filename = this.file.name
    },
    async addProduct () {
      await ProductsService.addProduct({
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
