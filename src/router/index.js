import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

const Home = () => {
  import('../views/Home.vue')
}
import Resume from '../views/resume.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Cart from '../views/cart.vue'
import Detail from '../views/detail.vue'


export default new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: 'home',
      name: 'Home',
      component: Home
    },
    {
      path: 'resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: 'login',
      name: 'Login',
      component: Login
    },
    {
      path: 'register',
      name: 'Register',
      component: Register
    },
    {
      path: 'cart',
      name: 'Cart',
      compoment: Cart
    },
    {
      path: 'detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
