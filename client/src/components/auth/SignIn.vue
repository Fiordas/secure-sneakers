<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$router.go(-1)"></div>
      <div class="modal-content">
        <div class="box is-radiusless">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">E-mail</label>
              <input
                class="input"
                type="email"
                placeholder="E-mail"
                v-model="email">
            </div>
            <div class="field">
              <label class="label">Password</label>
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model="password">
            </div>
            <div class="field submit">
              <button class="button is-primary" type="submit">Submit</button>
            </div>
          </form>
          <p>{{ error }}</p>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="$router.go(-1)"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
      this.$store.dispatch('signIn', formData)
    }
  }
}
</script>
