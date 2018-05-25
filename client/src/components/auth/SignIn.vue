<template>
  <div>
      <form @submit.prevent="onSubmit">
        <div>
          <label>E-mail</label>
          <input
            type="email"
            v-model="email">
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            v-model="password">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    <p>{{error}}</p>
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
