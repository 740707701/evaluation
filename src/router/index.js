import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/errorPage/404')
  },
  {
    path: "/",
    component: () => import('@/views/Home'),
    children: [
      {
        path: "/",
        name: "courselist",
        component: () => import('@/views/CourseList')
      },
      {
        path: "/coursedetail/:cepingId",
        name: "coursedetail",
        component: () => import('@/views/CourseDetail')
      }
    ]
  },
  {
    path: "/personalcenter/:activeName?",
    component: () => import('@/views/PersonalCenter/PersonalCenter'),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: "/",
        name: "myevaluation",
        component: () => import('@/views/PersonalCenter/MyEvaluation')
      },
      {
        path: "/myresume",
        name: "myresume",
        component: () => import('@/views/PersonalCenter/MyResume')
      },
      {
        path: "/myplan",
        name: "myplan",
        component: () => import('@/views/PersonalCenter/MyPlan')
      },
      {
        path: "/mybook",
        name: "mybook",
        component: () => import('@/views/PersonalCenter/MyBook')
      },
      {
        path: "/news",
        name: "news",
        component: () => import('@/views/PersonalCenter/News')
      },
      {
        path: "/statistics",
        name: "statistics",
        component: () => import('@/views/PersonalCenter/Statistics')
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import('@/views/PersonalCenter/Setting')
      },
      {
        path: "/order",
        name: "order",
        component: () => import('@/views/PersonalCenter/Order')
      }
    ]
  },
  {
    path: "/evaluation/:cepingId/:serialNo?",
    name: "evaluation",
    component: () => import('@/views/Evaluation')
  },
  {
    path: '/wechatPay',
    name: 'wechatPay',
    component: () => import('@/views/WechatPay')
  },
  {
    path: "/careerplan",
    name: "careerplan",
    component: () => import('@/views/CareerPlan/CareerPlan'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/planEntry",
    name: "planEntry",
    component: () => import('@/views/CareerPlan/PlanEntry'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/termPlan",
    name: "termPlan",
    component: () => import('@/views/CareerPlan/TermPlan'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/planList/:stage?",
    name: "planList",
    component: () => import('@/views/CareerPlan/PlanList'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/BookLibrary",
    name: "bookLibrary",
    component: () => import('@/views/BookLibrary'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/AssetLogin",
    name: "assetLogin",
    component: () => import('@/views/AssetLogin'),
  },
  {
    path: "/resumeBg",
    name: "resumeBg",
    component: () => import('@/views/ResumeBg')
  },
  {
    path: "/resume/:resumeId?",
    name: "resume",
    component: () => import('@/views/Resume'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/viewResume/:resumeId/:org?",
    name: "viewResume",
    component: () => import('@/views/ViewResume'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/cartdetail",
    name: "cartDetail",
    component: () => import('@/views/CartDetail')
  },
  {
    path: "/settlement",
    name: "settlement",
    component: () => import('@/views/Settlement')
  },
  {
    path: "/paysuccess/:orderNo/:money",
    name: "paysuccess",
    component: () => import('@/views/PaySuccess')
  },
  {
    path: "/resumePreview",
    name: "resumePreview",
    component: () => import('@/views/ResumePreview'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/agreement",
    name: "agreement",
    component: () => import('@/views/Agreement')
  },
  {
    path: "/templateList/:resumeId",
    name: "templateList",
    component: () => import('@/views/ResumeTemplate/TemplateList')
  },
  {
    path: "/template1/:resumeId-:templateId",
    name: "template1",
    component: () => import('@/views/ResumeTemplate/template1')
  },
  {
    path: "/template2/:resumeId-:templateId",
    name: "template2",
    component: () => import('@/views/ResumeTemplate/template2')
  },
  {
    path: "/template3/:resumeId-:templateId",
    name: "template3",
    component: () => import('@/views/ResumeTemplate/template3')
  },
  {
    path: "/template3Next/:resumeId-:templateId",
    name: "template3Next",
    component: () => import('@/views/ResumeTemplate/template3Next')
  },
  {
    path: "/vocationCognize",
    name: "vocationCognize",
    component: () => import('@/views/VocationCognize/Index'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/practiceEmployment",
    name: "practiceEmployment",
    component: () => import('@/views/PracticeEmployment/Index'),
    meta: {
      requireAuth: true
    }
  },
  { 
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }), // 滚动行为
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.getToken) {
      next()
    } else {
      store.state.isLogin = false
      store.state.showLoginPage = true
      next({
        path: "/",
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
