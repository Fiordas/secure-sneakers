<template>
  <div class="tiles is-ancestor">
    <div class="tiles is-parent is-vertical">
      <div class="tile is-parent">
        <div class="tile is-5 has-black-bg is-child card is-radiusless">
          <h1 class="title-big has-text-grey-light is-uppercase">Secure Sneakers</h1>
        </div>
        <div class="tile is-child card">
          <figure class="image">
            <img src="../assets/adidas-nmd-runner-triple-white.jpg">
          </figure>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="media" v-if="products.length > 0">
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="product in products" :key="product._id">
              <div class="card ">
                <div class="card-image">
                  <router-link v-bind:to="{ name: 'Details', params: { id: product._id } }">
                  <figure class="image">
                    <img src="../assets/adidas-nmd-runner-triple-white.jpg">
                  </figure>
                  </router-link>
                </div>
                <div class="card-content columns">
                  <div class="column"><p class="title is-4">{{ product.name }}</p> <p>{{product.brand}}</p></div>
                    <div class="column">
                    <div class="buttons is-pulled-right">
                      <router-link v-bind:to="{ name: 'Details', params: { id: product._id } }" class="button is-primary is-outlined"><i class="fa fa-star"></i></router-link>
                      <router-link v-bind:to="{ name: 'Details', params: { id: product._id } }" class="button is-primary is-outlined"><i class="fa fa-shopping-basket"></i></router-link>
                    </div>
                  </div>
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

<style>
  .title-big {
    font-size: 100px;
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .has-black-bg {
    background-color: black;
  }
</style>
