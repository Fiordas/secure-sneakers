<template>
  <div class="column is-4 is-offset-4">
    <div class="box">
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
    <p>{{error}}</p>
  </div>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'
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
      UsersService.authenticateUser(formData)
        .then(res => {
          if (res.data.success) {
            console.log(res)
            this.$router.push('/')
          } else {
            console.log(res)
            this.error = res.data.message
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
