<template>
  <div class="column is-4 is-offset-4">
    <div class="box" id="signupbox">
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label class="label">E-mail</label>
          <input
            class="input"
            type="email"
            id="email"
            placeholder="E-mail"
            v-model="email">
        </div>
        <div class="field">
          <label class="label">First Name</label>
          <input
            class="input"
            type="text"
            id="firstName"
            placeholder="First name"
            v-model.number="firstName">
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <input
            class="input"
            type="text"
            id="lastName"
            placeholder="Last name"
            v-model.number="lastName">
        </div>
        <div class="field">
          <label class="label">Password</label>
          <input
            class="input"
            type="password"
            id="password"
            placeholder="Password"
            v-model="password">
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <input
            class="input"
            type="password"
            id="confirm-password"
            placeholder="Repeat password"
            v-model="confirmPassword">
        </div>
        <div class="field submit">
          <button class="button is-primary" type="submit">Submit</button>
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
