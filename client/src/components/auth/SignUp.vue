<template>
  <div class="column is-4 is-offset-4">
    <div class="box" id="signupbox">
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
            id="email"
            placeholder="E-mail"
            v-model="email" required autofocus>
        </div>
        <div class="field">
          <label class="label">First Name</label>
          <input
            class="input"
            type="text"
            id="firstName"
            placeholder="First name"
            v-model.number="firstName" required pattern=".{3,}" title="3 characters minimum">
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <input
            class="input"
            type="text"
            id="lastName"
            placeholder="Last name"
            v-model.number="lastName" required pattern=".{3,}" title="3 characters minimum">
        </div>
        <div class="field">
          <label class="label">Password</label>
          <input
            class="input"
            type="password"
            id="password"
            placeholder="Password"
            v-model="password" required pattern=".{6,}" title="6 characters minimum">
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <input
            class="input"
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            v-model="confirmPassword" required pattern=".{6,}" title="6 characters minimum">
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

      // set form to empty
      this.email = ''
      this.firstName = ''
      this.lastName = ''
      this.password = ''
      this.confirmPassword = ''
      alert('You have been registered, please sign in')
    }
  }
}
</script>
