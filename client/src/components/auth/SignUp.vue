<template>
  <div>
    <h1 class="title">Sign Up</h1>
    <div class="columns">
      <div class="column is-4">

        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input :class="{ 'is-danger': emailError, 'is-success': emailError === null }" class="input" type="email" placeholder="Click to enter email adress" v-model="email" @blur="checkEmailHandler" @input="checkEmailOnInput" required>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span v-if="emailError" class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
              <span v-if="emailError === null" class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <p class="help is-danger">{{emailError}}</p>
          </div>

          <div class="field">
            <label class="label">First Name</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="Click to enter first name" v-model.number="firstName" required pattern=".{3,}" title="3 characters minimum">
              <span class="icon is-small is-left">
                <i class="fas fa-address-card"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Last Name</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="Click to enter last name" v-model.number="lastName" required pattern=".{3,}" title="3 characters minimum">
                <span class="icon is-small is-left">
                  <i class="fas fa-address-card"></i>
                </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <vue-password v-model="password" @input="checkPasswordOnInput" classes="input" placeholder="Enter 6 character password" required pattern=".{6,}" title="6 characters minimum"></vue-password>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <p class="help is-danger">{{passwordError}}</p>
          </div>

          <div class="field">
            <label class="label">Confirm Password</label>
            <div :class="{ 'is-success': confirmPassword && password === confirmPassword }" class="control has-icons-left has-icons-right">
              <vue-password v-model="confirmPassword" classes="input" @blur="checkConfirmPasswordOnBlur" @input="checkConfirmPasswordOnInput" placeholder="Confirm password" required pattern=".{6,}" title="6 characters minimum"></vue-password>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <p class="help is-danger">{{confirmPasswordError}}</p>
          </div>

          <div class="field">
            <vue-recaptcha
              @verify="onVerify"
              @expired="onExpired"
              :sitekey="sitekey">
            </vue-recaptcha>
          </div>

          <div class="field submit">
            <button class="button is-primary" type="submit">Submit</button>
            <p class="help is-danger">{{afterSubmitError}}</p>
          </div>
        </form>
        <hr>
        <router-link to="/signin">Already have an account? Sign in here!</router-link>

      </div>
      <div class="column is-offset-1">
        <br>
        <div style="overflow-y: scroll; height:400px;" class="box">
          <div class="content">
            <h1>Terms of Service</h1>
            <p>Lorem ipsum<sup><a>[1]</a></sup> dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
            <h2>1. Acceptance of Terms</h2>
            <p>Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.</p>
            <ul>
              <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
              <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
              <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
              <li>Ut non enim metus.</li>
            </ul>
            <h3>2. Description of Service</h3>
            <p>Quisque ante lacus, malesuada ac auctor vitae, congue <a href="#">non ante</a>. Phasellus lacus ex, semper ac tortor nec, fringilla condimentum orci. Fusce eu rutrum tellus.</p>
            <ol>
              <li>Donec blandit a lorem id convallis.</li>
              <li>Cras gravida arcu at diam gravida gravida.</li>
              <li>Integer in volutpat libero.</li>
              <li>Donec a diam tellus.</li>
              <li>Aenean nec tortor orci.</li>
              <li>Quisque aliquam cursus urna, non bibendum massa viverra eget.</li>
              <li>Vivamus maximus ultricies pulvinar.</li>
            </ol>
            <blockquote>Ut venenatis, nisl scelerisque sollicitudin fermentum, quam libero hendrerit ipsum, ut blandit est tellus sit amet turpis.</blockquote>
            <p>Quisque at semper enim, eu hendrerit odio. Etiam auctor nisl et <em>justo sodales</em> elementum. Maecenas ultrices lacus quis neque consectetur, et lobortis nisi molestie.</p>
            <p>Sed sagittis enim ac tortor maximus rutrum. Nulla facilisi. Donec mattis vulputate risus in luctus. Maecenas vestibulum interdum commodo.</p>
            <p>Suspendisse egestas sapien non felis placerat elementum. Morbi tortor nisl, suscipit sed mi sit amet, mollis malesuada nulla. Nulla facilisi. Nullam ac erat ante.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePassword from 'vue-password'
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'SignUp',
  components: { VuePassword, VueRecaptcha },
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      afterSubmitError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      sitekey: '6LfPjVkUAAAAAKG9lFMFcGSm7IYk23cPTGA0lBUu',
      challengeStatus: false
    }
  },
  mounted () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
    document.head.appendChild(recaptchaScript)
  },
  methods: {
    checkEmailOnInput () {
      if (this.email === '') {
        this.emailError = 'Email field cannot be empty'
      } else {
        this.emailError = ''
      }
    },
    checkEmailOnBlur () {
      if (this.email !== '' && (!this.email.includes('@') || !this.email.includes('.'))) {
        this.emailError = 'Email format is incorrect'
      } else if (this.email !== '' && this.email.includes('@') && this.email.includes('.')) {
        this.emailError = null
      }
    },
    checkEmailHandler () {
      this.checkEmailOnInput()
      this.checkEmailOnBlur()
      this.afterSubmitError = null
    },
    checkPasswordOnInput () {
      if (this.password !== '' && !this.password.toLowerCase().includes(this.firstName.toLowerCase()) && !this.password.includes(this.firstName.toLowerCase())) this.passwordError = null
      if (this.firstName !== '' && this.password !== '' && this.password.toLowerCase().includes(this.firstName.toLowerCase())) this.passwordError = 'Password should not contain first name'
      if (this.lastName !== '' && this.password.toLowerCase().includes(this.lastName.toLowerCase())) this.passwordError = 'Password should not contain last name'
      this.afterSubmitError = null
    },
    checkConfirmPasswordOnInput () {
      if (this.password === this.confirmPassword) this.confirmPasswordError = null
      this.afterSubmitError = null
    },
    checkConfirmPasswordOnBlur () {
      if (this.password !== this.confirmPassword) this.confirmPasswordError = 'Password does not match'
    },
    onSubmit () {
      if (!this.challengeStatus) {
        this.afterSubmitError = 'Failed to confirm captcha'
        return false
      }

      // check error
      if (this.emailError || this.passwordError || this.confirmPasswordError || this.afterSubmitError) {
        this.afterSubmitError = 'Correct errors before submiting'
        return false
      }

      // post form
      const formData = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      }
      this.$store.dispatch('signUp', formData).then((result) => {
        if (!result.data.success) {
          this.afterSubmitError = result.data.message
        }
      })
    },
    onVerify: function (response) {
      this.challengeStatus = true
      this.afterSubmitError = ''
      console.log('Verify: ' + response)
    },
    onExpired: function () {
      this.afterSubmitError = 'Captcha expired'
      console.log('Expired')
    }
  }
}
</script>
