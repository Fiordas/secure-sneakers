<template>
  <div v-if="checkoutDone === false">
    <h1 class="title">Checkout</h1>
    <div class="columns">
      <div class="column is-two-thirds">
        <h4 class="subtitle is-4">Items in the cart</h4>
        <div v-if="cart && cart.length > 0">
          <article class="media">
            <figure class="media-left"></figure>
            <div class="media-content">
              <div class="content">
                <div class="columns">
                  <div class="column is-one-fourth"></div>
                  <div class="column is-one-fourth"><strong>Size</strong></div>
                  <div class="column is-one-fourth"><strong>Quantity</strong></div>
                  <div class="column is-one-fourth"><strong>Price</strong></div>
                </div>
              </div>
            </div>
            <div class="media-right"></div>
          </article>
          <article class="media" v-for="(item, index) in cart" v-bind:key="index">
            <figure class="media-left">
              <p class="image is-64x64">
                <img v-bind:src="'https://localhost:3000/uploads/' + item.product.filename">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <div class="columns">
                  <div class="column is-one-fourth"><strong>{{item.product.name}}</strong><br>{{item.product.brand}}</div>
                  <div class="column is-one-fourth">{{item.size}}</div>
                  <div class="column is-one-fourth">{{item.quantity}}</div>
                  <div class="column is-one-fourth">€{{item.product.price}}.00</div>
                </div>
              </div>
            </div>
            <div class="media-right">
              <button @click="cartItemRemove(index)" class="delete"></button>
            </div>
          </article>
          <hr>
          <article class="media">
            <figure class="media-left"></figure>
            <div class="media-content">
              <div class="content">
                <div class="columns">
                  <div class="column is-one-fourth"></div>
                  <div class="column is-one-fourth"></div>
                  <div class="column is-one-fourth"></div>
                  <div class="column is-one-fourth"><h1 class="title is-5">Total to Pay €{{calculateTotal}}.00</h1></div>
                </div>
              </div>
            </div>
            <div class="media-right"></div>
          </article>
        </div>
        <div v-else>
          <p>Empty. Try adding some products!</p>
        </div>
      </div>

      <div class="column is-one-third">
        <form @submit.prevent="saveOrder">
          <h4 class="subtitle is-4">Delivery information</h4>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label">First name</label>
                <div class="control has-icons-left">
                  <input v-model="firstName" type="text" class="input" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-address-card"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Last name</label>
                <div class="control has-icons-left">
                  <input v-model="lastName" type="text" class="input" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-address-card"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Adress</label>
            <div class="control has-icons-left">
              <input v-model="adress" type="text" class="input" required>
              <span class="icon is-small is-left">
                <i class="fas fa-home"></i>
              </span>
            </div>
          </div>

          <br>

          <h4 class="subtitle is-4">Payment information</h4>
          <div class="field">
            <label class="label">Card number</label>
            <div class="control has-icons-left">
              <input type="text" class="input" maxlength="19" required>
              <span class="icon is-small is-left">
                <i class="fas fa-credit-card"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Owner name</label>
            <div class="control has-icons-left">
              <input type="text" class="input" required>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label">CVV</label>
                <div class="control has-icons-left">
                  <input type="text" class="input" maxlength="4" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Expiration date</label>
                <div class="control has-icons-left">
                  <input type="month" class="input" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="field submit">
            <div class="control is-pulled-right">
              <br>
              <button class="button is-primary">Checkout</button>
            </div>
            <p class="help is-danger">{{checkoutError}}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
  <section style="margin-top: 200px" v-else class="hero is-success">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Success
        </h1>
        <h2 class="subtitle">
          Order received and being processed
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import OrdersService from '@/services/OrdersService'
import ProductsService from '@/services/ProductsService'

export default {
  name: 'Checkout',
  data () {
    return {
      cart: [],
      totalPrice: 0,
      firstName: '',
      lastName: '',
      adress: '',
      checkoutDone: true,
      checkoutError: ''
    }
  },
  created () {
    this.cart = this.$store.getters.getCart
    this.checkoutDone = false
  },
  methods: {
    cartItemRemove (index) {
      this.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.$store.dispatch('storeCart')
    },
    async saveOrder () {
      const response = await ProductsService.fetchProducts()
      let outOfStockFound = false

      this.cart.forEach(function (item) {
        const itemToCheck = response.data.products.find(products => products._id === item.product.productId)
        const result = itemToCheck.stock.find(stock => stock.size === item.size)
        if (result.quantity < item.quantity) {
          outOfStockFound = true
        }
      })
      if (outOfStockFound) {
        this.checkoutError = 'Selected products are out of stock.'
        return
      }

      this.cart.forEach(async function (item) {
        const itemToCheck = response.data.products.find(products => products._id === item.product.productId)
        const result = itemToCheck.stock.findIndex(stock => stock.size === item.size)
        let updatedItem = itemToCheck
        updatedItem.stock[result].quantity--

        await ProductsService.updateProduct({
          id: itemToCheck.productId,
          name: itemToCheck.name,
          brand: itemToCheck.brand,
          description: itemToCheck.description,
          stock: updatedItem.stock,
          price: itemToCheck.price,
          filename: itemToCheck.filename
        })
      })

      const userId = localStorage.getItem('userId')
      if (!userId) {
        await OrdersService.addOrder({
          customerName: this.firstName + ' ' + this.lastName,
          customerAdress: this.adress,
          items: this.cart,
          totalPrice: this.totalPrice
        })
        this.checkoutDone = true
      } else {
        await OrdersService.addOrder({
          customerId: userId,
          customerName: this.firstName + ' ' + this.lastName,
          customerAdress: this.adress,
          items: this.cart,
          totalPrice: this.totalPrice
        })
        this.checkoutDone = true
      }

      localStorage.removeItem('cart')
      this.$store.dispatch('storeCart')
    }
  },
  computed: {
    calculateTotal: function () {
      // eslint-disable-next-line
      this.totalPrice = 0
      for (const item of this.cart) {
        // eslint-disable-next-line
        this.totalPrice += item.quantity * item.product.price
      }
      return this.totalPrice
    }
  }
}
</script>
