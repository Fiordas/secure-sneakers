<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$router.go(-1)"></div>
    <div class="modal-content">
      <div class="box is-radiusless">
        <div class="columns">
          <div class="column is-two-thirds">
            <figure class="image">
              <img v-bind:src="'http://localhost:3000/uploads/' + filename" />
            </figure>
          </div>
          <div class="column">
            <div class="">
              <div class="">
                <p class="title is-4">{{ name }}</p>
                <p class="subtitle is-6">{{ brand }}</p>
                <p>€ {{price}}</p>
              </div>
            </div>
            <br>
            <div class="field">
              <label class="label">Size:</label>
              <div class="select">
                <select>
                  <option v-for="s in stock" :key="s.id" v-if="s.quantity>0">{{s.size}}</option>
                </select>
              </div>
            </div>
            <br>
            <button class="button is-primary" v-on:click="counter += 1">Add to chart</button>
            <br>
          </div>
        </div>
        <div>
          <p>{{description}}</p>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$router.go(-1)"></button>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'Details',
  data () {
    return {
      id: '',
      name: '',
      brand: '',
      description: '',
      stock: [ ],
      price: 0,
      filename: ''
    }
  },
  mounted () {
    this.getProduct()
  },
  methods: {
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
    }
  }
}
</script>
