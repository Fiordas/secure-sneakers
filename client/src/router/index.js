import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Products from '@/components/Products'
import Panel from '@/components/Panel'
import AddProduct from '@/components/AddProduct'
import EditProduct from '@/components/EditProduct'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/panel',
      name: 'Panel',
      component: Panel
    },
    {
      path: '/panel/add',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/panel/:id',
      name: 'EditProduct',
      component: EditProduct
    }
  ]
})
