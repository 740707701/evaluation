import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CartDetail from '../views/CartDetail.vue'
import Detail from '../views/Detail.vue'
import CourseList from '../views/CourseList.vue'
import CourseDetail from '../views/CourseDetail.vue'
import Evaluation from '../views/Evaluation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'courselist',
          component: CourseList
        },
        {
          path: '/coursedetail/:id',
          name: 'coursedetail',
          component: CourseDetail
        }
      ]
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: Evaluation
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cartdetail',
      name: 'CartDetail',
      component: CartDetail
    }

  ]
})
