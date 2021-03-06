import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import Home from '@/components/Home'
import Products from '@/components/Products'
import Details from '@/components/Details'
import Panel from '@/components/Panel'
import AddProduct from '@/components/AddProduct'
import EditProduct from '@/components/EditProduct'
import SignUp from '@/components/auth/SignUp'
import SignIn from '@/components/auth/SignIn'
import Checkout from '@/components/Checkout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      children: [
        { path: '/details/:id', component: Details, name: 'Details' }
      ]
    },
    {
      path: '/panel',
      name: 'Panel',
      component: Panel,
      beforeEnter (to, from, next) {
        const user = store.getters.user
        if (user && user.admin) {
          next()
        } else {
          alert('Permission denied!')
          next('/')
        }
      }
    },
    {
      path: '/panel/add',
      name: 'AddProduct',
      component: AddProduct,
      beforeEnter (to, from, next) {
        const user = store.getters.user
        if (user && user.admin) {
          next()
        } else {
          alert('Permission denied!')
          next('/')
        }
      }
    },
    {
      path: '/panel/edit/:id',
      name: 'EditProduct',
      component: EditProduct,
      beforeEnter (to, from, next) {
        const user = store.getters.user
        if (user && user.admin) {
          next()
        } else {
          alert('Permission denied!')
          next('/')
        }
      }
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },

    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter (to, from, next) {
        if (store.state.auth === null) {
          const watch = store.watch(
            () => store.getters['isAuthenticated']
            , isLoggedIn => {
              if (isLoggedIn === true) {
                alert('You are already signed in!')
                next('/')
                watch()
              }
              next()
              watch()
            }
          )
        } else if (store.state.auth === true) {
          alert('You are already signed in!')
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      beforeEnter (to, from, next) {
        if (store.state.auth === null) {
          const watch = store.watch(
            () => store.getters['isAuthenticated']
            , isLoggedIn => {
              if (isLoggedIn === true) {
                alert('You are already signed in!')
                next('/')
                watch()
              }
              next()
              watch()
            }
          )
        } else if (store.state.auth === true) {
          alert('You are already signed in!')
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})
