import Vue from 'vue'
import Vuex from 'vuex'
import UsersService from '@/services/UsersService'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    admin: null,
    user: null
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
      state.admin = userData.admin
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.token = null
      state.userId = null
      state.admin = null
    }
  },
  actions: {
    setLogoutTimer ({commit, dispatch}, expirationTime) {
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000)
    },
    signUp ({commit, dispatch}, authData) {
      UsersService.addUser(authData)
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.token,
            userId: res.data.userId,
            admin: res.data.admin
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/')
        })
        .catch(error => console.log(error))
    },
    signIn ({commit, dispatch}, authData) {
      UsersService.authenticateUser(authData)
        .then(res => {
          if (res.data.success) {
            console.log(res)
            commit('authUser', {
              token: res.data.token,
              userId: res.data.userId,
              admin: res.data.admin
            })
            const now = new Date()
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch('setLogoutTimer', res.data.expiresIn)
            router.replace('/')
          } else {
            console.log(res)
          }
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
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
          console.log(res)
          commit('storeUser', res.data.decoded)
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.token !== null
    },
    isAdmin (state) {
      return state.admin
    }
  }
})
