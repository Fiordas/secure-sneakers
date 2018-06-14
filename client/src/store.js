import Vue from 'vue'
import Vuex from 'vuex'
import UsersService from '@/services/UsersService'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    user: null,
    auth: null,
    cart: null
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
      state.auth = true
    },
    storeUser (state, user) {
      state.user = user
    },
    storeCart (state, cart) {
      state.cart = cart
    },
    clearCart (state) {
      state.cart = null
    },
    clearAuthData (state) {
      state.token = null
      state.userId = null
      state.user = null
      state.auth = false
    },
    authFalse (state) {
      state.auth = false
    }
  },
  actions: {
    setLogoutTimer ({commit, dispatch}, expirationTime) {
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000)
    },
    signUp ({commit, dispatch}, authData) {
      return new Promise((resolve, reject) => {
        UsersService.addUser(authData)
          .then(res => {
            if (res.data.success) {
              commit('authUser', {
                token: res.data.token,
                userId: res.data.userId
              })
              const now = new Date()
              const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('userId', res.data.userId)
              localStorage.setItem('expirationDate', expirationDate)
              dispatch('setLogoutTimer', res.data.expiresIn)
              dispatch('fetchUser')
              router.replace('/')
              resolve(res)
            } else {
              resolve(res)
            }
          })
          .catch(error => reject(error))
      })
    },
    signIn ({commit, dispatch}, authData) {
      return new Promise((resolve, reject) => {
        UsersService.authenticateUser(authData)
          .then(res => {
            if (res.data.success) {
              commit('authUser', {
                token: res.data.token,
                userId: res.data.userId
              })
              const now = new Date()
              const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('userId', res.data.userId)
              localStorage.setItem('expirationDate', expirationDate)
              dispatch('setLogoutTimer', res.data.expiresIn)
              dispatch('fetchUser')
              router.replace('/')
              resolve(res)
            } else {
              resolve(res)
            }
          })
          .catch(error => reject(error))
      })
    },
    tryAutoLogin ({commit, dispatch}) {
      const token = localStorage.getItem('token')
      if (!token) {
        commit('authFalse')
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        commit('authFalse')
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
      dispatch('fetchUser')
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      router.replace('/')
    },
    fetchUser ({commit, state}) {
      if (!state.token) {
        return
      }
      UsersService.fetchUser({ token: state.token })
        .then(res => {
          commit('storeUser', res.data.decoded)
        })
        .catch(error => console.log(error))
    },
    updateCart ({commit}, selectedPayload) {
      if (!localStorage.getItem('cart')) {
        const cartItems = [{
          product: selectedPayload.selectedProduct,
          size: selectedPayload.selectedSize,
          quantity: 1
        }]
        localStorage.setItem('cart', JSON.stringify(cartItems))
        commit('storeCart', cartItems)
      } else {
        const cartItems = JSON.parse(localStorage.getItem('cart'))
        for (let i = 0, length = cartItems.length; i < length; i++) {
          if (cartItems[i].product._id === selectedPayload.selectedProduct._id && cartItems[i].size === selectedPayload.selectedSize) {
            cartItems[i].quantity++
            localStorage.setItem('cart', JSON.stringify(cartItems))
            commit('storeCart', cartItems)
            return
          }
        }
        // when new one
        const addItem = {
          product: selectedPayload.selectedProduct,
          size: selectedPayload.selectedSize,
          quantity: 1
        }
        cartItems.push(addItem)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        commit('storeCart', cartItems)
      }
    },
    storeCart ({commit}) {
      const cart = JSON.parse(localStorage.getItem('cart'))
      if (!cart) {
        commit('clearCart')
        return
      }
      commit('storeCart', cart)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.auth
    },
    getCart (state) {
      return state.cart
    }
  }
})
