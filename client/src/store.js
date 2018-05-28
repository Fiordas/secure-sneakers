import Vue from 'vue'
import Vuex from 'vuex'
import UsersService from '@/services/UsersService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
    }
  },
  actions: {
    signUp ({commit}, authData) {
      UsersService.addUser(authData)
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.token,
            userId: res.data._id
          })
        })
        .catch(error => console.log(error))
    },
    signIn ({commit}, authData) {
      UsersService.authenticateUser(authData)
        .then(res => {
          if (res.data.success) {
            console.log(res)
            commit('authUser', {
              token: res.data.token,
              userId: res.data._id
            })
            // this.$router.push('/')
          } else {
            console.log(res)
            // this.error = res.data.message
          }
        })
        .catch(error => console.log(error))
    }
  },
  getters: {

  }
})
