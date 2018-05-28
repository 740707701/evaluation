import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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

Vue.use(VueRouter)


const routes = [{
    path: '/',
    component: Home,
    children: [{
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
    meta: {
      requireAuth: true
    },
    children: [{
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
    path: '/evaluation/:id',
    name: 'evaluation',
    component: Evaluation
  },
  {
    path: '/careerplan',
    name: 'careerplan',
    component: CareerPlan,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/industryintro',
    name: 'industryintro',
    component: IndustryIntro,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume,
    meta: {
      requireAuth: true
    }
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
    component: ResumePreview,
    meta: {
      requireAuth: true
    },
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
  // fallback: false, //当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式。默认值为 true。
  // scrollBehavior: () => ({ y: 0 }), 滚动行为
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.getToken) {
      next();
    } else {
      store.state.isLogin = false;
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router