import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import ResumePreview from '../views/ResumePreview.vue'
import Login from '../views/LoginPage.vue'
import Register from '../views/RegisterPage.vue'
import CartDetail from '../views/CartDetail.vue'
import Detail from '../views/Detail.vue'
import CourseList from '../views/CourseList.vue'
import CourseDetail from '../views/CourseDetail.vue'
import Evaluation from '../views/Evaluation.vue'
import PersonalCenter from '../views/PersonalCenter/PersonalCenter.vue'
import MyEvaluation from '../views/PersonalCenter/MyEvaluation.vue'
import MyResume from '../views/PersonalCenter/MyResume.vue'
import Order from '../views/PersonalCenter/Order.vue'
import Setting from '../views/PersonalCenter/Setting.vue'
import Statistics from '../views/PersonalCenter/Statistics.vue'
import News from '../views/PersonalCenter/News.vue'
import CareerPlan from '../views/CareerPlan.vue'
import IndustryIntro from '../views/IndustryIntro.vue'

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
      path: '/personalcenter',
      component: PersonalCenter,
      children: [
        {
          path: '/',
          name: 'myevaluation',
          component: MyEvaluation
        },
        {
          path: '/myresume',
          name: 'myresume',
          component: MyResume
        },
        {
          path: '/news',
          name: 'news',
          component: News
        },
        {
          path: '/statistics',
          name: 'statistics',
          component: Statistics
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
      ]
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: Evaluation
    },
    {
      path: '/careerplan',
      name: 'careerplan',
      component: CareerPlan
    },
    {
      path: '/industryintro',
      name: 'industryintro',
      component: IndustryIntro
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
    },
    {
      path: '/resumePreview',
      name: 'ResumePreview',
      component: ResumePreview
    }

  ]
})
