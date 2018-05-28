<template>
  <div>
    <div>
      <form @submit.prevent="onSubmit">
        <div>
          <label>E-Mail</label>
          <input
            type="email"
            id="email"
            v-model="email">
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            id="firstName"
            v-model.number="firstName">
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model.number="lastName">
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            v-model="password">
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    onSubmit () {
      /*
      await UsersService.addUser({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
      */
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
