<template>
  <div style="margin-bottom: 285px">
    <h1 class="title">Sign In</h1>
    <div class="columns">
      <div class="column is-4">
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input :class="{ 'is-danger': emailError }" class="input" type="email" placeholder="Click to enter email adress" v-model="email" @blur="handler" @input="checkEmailInputOnInput" required>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span v-if="emailError" class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p class="help is-danger">{{emailError}}</p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input class="input" type="password" placeholder="Click to enter password" v-model="password" @input="afterSubmitError = ''" required>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <vue-recaptcha
              @verify="onVerify"
              @expired="onExpired"
              :sitekey="sitekey">
            </vue-recaptcha>
          </div>

          <div class="field submit">
            <button :class="{ 'is-disabled': emailError }" :disabled="afterSubmitError !== ''" class="button is-primary" type="submit">Sign In</button>
            <p class="help is-danger">{{afterSubmitError}}</p>
          </div>
        </form>
        <hr>
        <a href="">Forgot password</a>
      </div>
      <div class="column is-offset-1">
        <br>
        <section class="hero is-primary is-bold">
          <div class="hero-body">
            <h1 class="title">
              Welcome Back
            </h1>
            <h2 class="subtitle">
              Sign in and get your exlusive deals
            </h2>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'SignIn',
  components: { VueRecaptcha },
  data () {
    return {
      email: '',
      password: '',
      afterSubmitError: null,
      emailError: null,

      sitekey: '6LfPjVkUAAAAAKG9lFMFcGSm7IYk23cPTGA0lBUu',
      challengeStatus: false
    }
  },
  mounted () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
    document.head.appendChild(recaptchaScript)
  },
  watch: {

  },
  methods: {
    onSubmit () {
      if (!this.challengeStatus) {
        return false
      }

      const formData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signIn', formData).then((result) => {
        if (!result.data.success) {
          this.afterSubmitError = result.data.message
        }
      })
    },
    onVerify: function (response) {
      this.challengeStatus = true
      console.log('Verify: ' + response)
    },
    onExpired: function () {
      console.log('Expired')
    },
    checkEmailInputOnInput () {
      if (this.email === '') {
        this.emailError = 'Email field cannot be empty'
      } else {
        this.emailError = ''
        this.afterSubmitError = ''
      }
    },
    checkEmailInputOnBlur () {
      if (this.email !== '' && (!this.email.includes('@') || !this.email.includes('.'))) {
        this.emailError = 'Email format is incorrect'
      } else if (this.email.includes('@')) {
        this.emailError = ''
      }
    },
    handler () {
      this.checkEmailInputOnInput()
      this.checkEmailInputOnBlur()
    }
  }
}
</script>
