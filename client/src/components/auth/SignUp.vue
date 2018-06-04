<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$router.go(-1)"></div>
      <div class="modal-content">
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
                v-model="email" required>
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
              <vue-password v-model="password" classes="input" placeholder="Password" required pattern=".{6,}" title="6 characters minimum">
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
              <vue-password v-model="confirmPassword" classes="input" placeholder="Confirm password" required pattern=".{6,}" title="6 characters minimum">
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
      <button class="modal-close is-large" aria-label="close" @click="$router.go(-1)"></button>
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
      if (this.password === this.email) this.errors.push('Password should be different with email')
      if (this.password.includes(this.firstName)) this.errors.push('Password should not contains first name')
      if (this.password.includes(this.lastName)) this.errors.push('Password should not contains last name')
      if (this.errors.length > 0) {
        return false
      }

      // post form
      const formData = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      }
      this.$store.dispatch('signUp', formData)
    }
  }
}
</script>
