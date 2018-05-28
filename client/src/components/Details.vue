<template>
  <div>
    Size:
    <select>
      <option v-model="selected" v-for="s in stock" v-if="s.quantity>0">{{s.size}}</option>
    </select>
    <br>
    <button v-on:click="counter += 1">Add to chart</button>

    <p>Total: {{ counter }} quantity.</p>
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
        price: 0
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
      },
    }
  }
</script>
