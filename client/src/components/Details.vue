<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$router.go(-1)"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Details</p>
        <button class="delete is-medium" aria-label="close" @click="$router.go(-1)"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column is-three-fifths">
            <figure class="image">
              <img v-if="product.filename" v-bind:src="'https://localhost:3000/uploads/' + product.filename" />
            </figure>
          </div>
          <div class="column">
            <div class="">
              <div class="">
                <p class="title is-4">{{ product.name }}</p>
                <p class="subtitle is-6">{{ product.brand }}</p>
                <p>€ {{ product.price }}</p>
              </div>
            </div>
            <br>
            <div class="field">
              <label class="label">Sizes available:</label>
              <div class="buttons has-addons">
                <template v-for="(stock, stockIndex) in product.stock">
                  <template v-if="stock.quantity > 0">
                    <span @click="addOrder(stockIndex, product, stock.size)" v-bind:key="stockIndex" class="button is-primary is-outlined">{{stock.size}}</span>
                  </template>
                  <template v-else>
                    <span v-bind:key="stockIndex" disabled class="button">{{stock.size}}</span>
                  </template>
                </template>
              </div>
              <small>* press to add selected size to cart</small>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">About the product:</label>
          <p>{{ product.description }}</p>
        </div>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'Details',
  data () {
    return {
      product: [],
      cart: [],
      id: ''
    }
  },
  created () {
    this.cart = this.$store.getters.getCart
    this.getProduct()
  },
  methods: {
    async getProduct () {
      await ProductsService.getProduct({
        id: this.$route.params.id
      }).then((response) => {
        if (this.cart) {
          this.cart.reduceRight(function (acc, item) {
            if (response.data._id === item.product._id) {
              const stockIndex = response.data.stock.findIndex(stock => stock.size === item.size)
              response.data.stock[stockIndex].quantity -= item.quantity
            }
          }, [])
        }
        this.product = response.data
      })
    },
    addOrder (stockIndex, selectedProduct, selectedSize) {
      this.product.stock[stockIndex].quantity -= 1
      const selectedPayload = {
        selectedProduct: selectedProduct,
        selectedSize: selectedSize
      }
      this.$store.dispatch('updateCart', selectedPayload)
    }
  }
}
</script>
