<template>
  <div class="columns is-centered">
    <div class="column is-4">
      <div class="box is-radiusless">
        <form @submit.prevent="onSubmit">
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error.id">{{ error }}</li>
            </ul>
          </p>
          <div class="field">
            <label class="label">E-mail</label>
            <input
              class="input"
              type="email"
              placeholder="E-mail"
              v-model="email" required autofocus>
          </div>
          <div class="field">
            <label class="label">First Name</label>
            <input
              class="input"
              type="text"
              placeholder="First name"
              v-model.number="firstName" required pattern=".{3,}" title="3 characters minimum">
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <input
              class="input"
              type="text"
              placeholder="Last name"
              v-model.number="lastName" required pattern=".{3,}" title="3 characters minimum">
          </div>
          <div class="field">
            <label class="label">Password</label>
            <vue-password v-model="password" classes="input" placeholder="Password" required>
              <template slot="password-toggle" slot-scope="props">
                <button class="VuePassword__Toggle"
                        type="button"
                        v-on:click = "props.toggle"
                        v-text="props.type === 'password' ? 'SHOW' : 'HIDE'"
                >
                </button>
              </template>
            </vue-password>
          </div>
          <div class="field">
            <label class="label">Confirm Password</label>
            <vue-password v-model="confirmPassword" classes="input" placeholder="Confirm password" required>
              <template slot="password-toggle" slot-scope="props">
                <button class="VuePassword__Toggle"
                        type="button"
                        v-on:click = "props.toggle"
                        v-text="props.type === 'password' ? 'SHOW' : 'HIDE'"
                >
                </button>
              </template>
            </vue-password>
          </div>
          <div class="field submit">
            <button class="button is-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VuePassword from 'vue-password'
export default {
  name: 'SignUp',
  components: {VuePassword},
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      errors: []
    }
  },
  methods: {
    onSubmit () {
      // check error
      this.errors = []
      if (this.password !== this.confirmPassword) this.errors.push('Password does not match')
      if (this.errors.length > 0) {
        this.password = ''
        this.confirmPassword = ''
        return false
      }

      // post form
      const formData = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      }
      console.log(formData)
      this.$store.dispatch('signUp', formData)
    }
  }
}
</script>
