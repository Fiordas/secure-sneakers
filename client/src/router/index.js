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
import ShoppingCard from '@/components/ShoppingCard'

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
        if (store.state.admin) {
          next()
        } else {
          next('/signin')
        }
      }
    },
    {
      path: '/panel/add',
      name: 'AddProduct',
      component: AddProduct,
      beforeEnter (to, from, next) {
        if (store.state.admin) {
          next()
        } else {
          next('/signin')
        }
      }
    },
    {
      path: '/panel/edit/:id',
      name: 'EditProduct',
      component: EditProduct,
      beforeEnter (to, from, next) {
        if (store.state.admin) {
          next()
        } else {
          next('/signin')
        }
      }
    },
    {
      path: '/shoppingcard',
      name: 'ShoppingCard',
      component: ShoppingCard
    },

    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
      /*
      beforeEnter (to, from, next) {
        if (store.state.token) {
          alert('You are already signed in!')
          next('/')
        } else {
          next()
        }
      }
      */
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
