import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import ResumePreview from '../views/ResumePreview.vue'
import CartDetail from '../views/CartDetail.vue'
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
import Agreement from '../views/Agreement.vue'

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
    path: '/evaluation/:id/:serialNo',
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
    }
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: Agreement
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
      store.state.showLoginPage = true;
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
          isLogin: false
        }
      })
    }
  } else {
    next()
  }
})
export default router