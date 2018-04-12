import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

const Home = () => {
  import('../views/Home.vue')
}


export default new Router({

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
    }
  ]
})
