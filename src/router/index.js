import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store"

Vue.use(VueRouter)

const routes = [
  // 测评
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
      },
      {
        path: "/evaluation/:cepingId/:serialNo?",
        name: "evaluation",
        component: () => import('@/views/Evaluation/Evaluation'),
        meta: {
          routerType: 'ceping'
        }
      },
    ]
  },
  // 个人中心
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
  // 大学总规划
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
  // 分学期规划
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
  // 简历与面试
  {
    path: "/resumeModule",
    component: () => import('@/views/Resume/Index'),
    meta: {
      requireAuth: true,
      routerType: 'resume'
    },
    children: [
      {
        path: '/',
        name: 'resumeModule',
        component: () => import('@/views/Resume/ResumeModule'),
        meta: {
          routerType:'resume'
        }
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
        path: '/resume/:resumeId?',
        name: 'resume',
        component: () => import('@/views/Resume/Resume'),
        meta: {
          routerType: 'resume'
        }
      },
      {
        path: '/freshStudentResume',
        name: 'freshStudentResume',
        component: () => import('@/views/Resume/FreshStudentResume'),
        meta: {
          routerType: 'resume'
        }
      },
    ]
  },
  {
    path: "/viewFreshStudentResume",
    name: "viewFreshStudentResume",
    component: () => import('@/views/Resume/ViewFreshStudentResume'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/viewResume",
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
    path: '/wechatPay',
    name: 'wechatPay',
    component: () => import('@/views/Pay/WechatPay')
  },
  {
    path: "/paysuccess/:orderNo/:money/:productType?",
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
  // 书籍库
  {
    path: "/BookLibrary",
    name: "bookLibrary",
    component: () => import('@/views/BookLibrary'),
    meta: {
      requireAuth: true
    }
  },
  // 行业与职业认知
  {
    path: "/vocationCognize",
    component: () => import('@/views/VocationCognize/Index'),
    meta: {
      requireAuth: true,
      routerType: 'vocation'
    },
    children: [
      {
        path: '/',
        name: 'vocationList',
        component: () => import('@/views/VocationCognize/VocationList'),
        meta: {
          routerType: 'vocation'
        }
      },
      {
        path: '/vocationDetail',
        name: 'vocationDetail',
        component: () => import('@/views/VocationCognize/VocationDetail'),
        meta: {
          routerType: 'vocation'
        }
      },
      {
        path: '/vocationPractice',
        name: 'vocationPractice',
        component: () => import('@/views/VocationCognize/VocationPractice'),
        meta: {
          routerType: 'vocation'
        }
      }
    ]
  },
  // 实习与就业
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
    path: "/AssetLogin",
    name: "assetLogin",
    component: () => import('@/views/AssetLogin'),
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
    path: '/404',
    component: () => import('@/views/ErrorPage/404')
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
