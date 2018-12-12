import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/ErrorPage/404')
  },
  {
    path: "/",
    component: () => import('@/views/Home'),
    children: [
      {
        path: "/",
        name: "courselist",
        component: () => import('@/views/Evaluation/CourseList'),
        meta: {
          routerType: 'ceping'
        }
      },
      {
        path: "/coursedetail/:cepingId",
        name: "coursedetail",
        component: () => import('@/views/Evaluation/CourseDetail'),
        meta: {
          routerType: 'ceping'
        }
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
    component: () => import('@/views/Evaluation/Evaluation'),
    meta: {
      routerType: 'ceping'
    }
  },
  {
    path: '/wechatPay',
    name: 'wechatPay',
    component: () => import('@/views/Pay/WechatPay')
  },
  {
    path: '/generalPlan',
    component: () => import('@/views/GeneralPlan/Index'),
    meta:{
      requireAuth: true,
      routerType: 'plan'
    },
    children: [
      {
        path: '/',
        name: 'preface',
        component: () => import('@/views/GeneralPlan/Preface'),
        meta: {
          routerType: 'plan'
        }
      },
      {
        path: '/videoList',
        name: 'videoList',
        component: () => import('@/views/GeneralPlan/VideoList'),
        meta: {
          routerType: 'plan'
        }
      },
      {
        path: '/generalPlanDetail',
        name: 'generalPlanDetail',
        component: () => import('@/views/GeneralPlan/GeneralPlanDetail'),
        meta: {
          routerType: 'plan'
        }
      },
      {
        path: '/generalPlanEntry',
        name: 'generalPlanEntry',
        component: () => import('@/views/GeneralPlan/GeneralPlanEntry'),
        meta: {
          routerType: 'plan'
        }
      },
      {
        path: '/generalPlanInfo',
        name: 'generalPlanInfo',
        component: () => import('@/views/GeneralPlan/GeneralPlanInfo'),
        meta: {
          routerType: 'plan'
        }
      }
    ]
  },
  {
    path: "/careerplan",
    component: () => import('@/views/CareerPlan/Index'),
    meta: {
      requireAuth: true,
      routerType: 'plan'
    },
    children: [
      {
        path: '/',
        name: "careerplan",
        component: () => import('@/views/CareerPlan/CareerPlan'),
        meta: {
          routerType: 'plan'
        }
      },
      {
        path: "/planEntry",
        name: "planEntry",
        component: () => import('@/views/CareerPlan/PlanEntry'),
        meta: {
          routerType: 'plan'
        }
      },
      {
        path: "/termPlan",
        name: "termPlan",
        component: () => import('@/views/CareerPlan/TermPlan'),
        meta: {
          routerType: 'plan'
        }
      },
      {
        path: "/planList/:stage?",
        name: "planList",
        component: () => import('@/views/CareerPlan/PlanList'),
        meta: {
          routerType: 'plan'
        }
      },
    ]
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
    component: () => import('@/views/Resume/ResumeBg'),
    meta: {
      routerType: 'resume'
    }
  },
  {
    path: "/resume/:resumeId?",
    name: "resume",
    component: () => import('@/views/Resume/Resume'),
    meta: {
      requireAuth: true,
      routerType: 'resume'
    }
  },
  {
    path: "/viewResume/:resumeId/:org?",
    name: "viewResume",
    component: () => import('@/views/Resume/ViewResume'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/resumePreview",
    name: "resumePreview",
    component: () => import('@/views/Resume/ResumePreview'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/cartdetail",
    name: "cartDetail",
    component: () => import('@/views/Cart/CartDetail')
  },
  {
    path: "/settlement",
    name: "settlement",
    component: () => import('@/views/Settlement/Settlement')
  },
  {
    path: "/paysuccess/:orderNo/:money",
    name: "paysuccess",
    component: () => import('@/views/Pay/PaySuccess')
  },
  
  {
    path: "/agreement",
    name: "agreement",
    component: () => import('@/views/Agreement/Agreement')
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
      requireAuth: true,
      routerType: 'vocation'
    }
  },
  {
    path: "/practiceEmployment",
    name: "practiceEmployment",
    component: () => import('@/views/PracticeEmployment/Index'),
    meta: {
      requireAuth: true,
      routerType: 'practice'
    }
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/Forbidden/Index'),
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
