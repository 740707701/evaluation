import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home.vue";
import ResumeBg from "../views/ResumeBg.vue";
import Resume from "../views/Resume.vue";
import ResumePreview from "../views/ResumePreview.vue";
import ViewResume from "../views/ViewResume";
import CartDetail from "../views/CartDetail.vue";
import Settlement from "../views/Settlement.vue";
import CourseList from "../views/CourseList.vue";
import CourseDetail from "../views/CourseDetail.vue";
import Evaluation from "../views/Evaluation.vue";
import PersonalCenter from "../views/PersonalCenter/PersonalCenter.vue";
import MyEvaluation from "../views/PersonalCenter/MyEvaluation.vue";
import MyResume from "../views/PersonalCenter/MyResume.vue";
import MyPlan from "../views/PersonalCenter/MyPlan.vue";
import MyBook from "../views/PersonalCenter/MyBook.vue";
import Order from "../views/PersonalCenter/Order.vue";
import PaySuccess from "../views/PaySuccess.vue";
import Setting from "../views/PersonalCenter/Setting.vue";
import Statistics from "../views/PersonalCenter/Statistics.vue";
import News from "../views/PersonalCenter/News.vue";
import CareerPlan from "../views/CareerPlan.vue";
import BookLibrary from "../views/BookLibrary.vue";
import Agreement from "../views/Agreement.vue";
import TemplateList from "../views/ResumeTemplate/TemplateList.vue";
import Template1 from "../views/ResumeTemplate/template1.vue";
import Template2 from "../views/ResumeTemplate/template2.vue";
import Template3 from "../views/ResumeTemplate/template3.vue";
import Template31 from "../views/ResumeTemplate/Template31.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/",
        name: "courselist",
        component: CourseList
      },
      {
        path: "/coursedetail/:cepingId",
        name: "coursedetail",
        component: CourseDetail
      }
    ]
  },
  {
    path: "/personalcenter/:activeName?",
    component: PersonalCenter,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: "/",
        name: "myevaluation",
        component: MyEvaluation
      },
      {
        path: "/myresume",
        name: "myresume",
        component: MyResume
      },
      {
        path: "/myplan",
        name: "myplan",
        component: MyPlan
      },
      {
        path: "/mybook",
        name: "mybook",
        component: MyBook
      },
      {
        path: "/news",
        name: "news",
        component: News
      },
      {
        path: "/statistics",
        name: "statistics",
        component: Statistics
      },
      {
        path: "/setting",
        name: "setting",
        component: Setting
      },
      {
        path: "/order",
        name: "order",
        component: Order
      }
    ]
  },
  {
    path: "/evaluation/:cepingId/:serialNo",
    name: "evaluation",
    component: Evaluation
  },
  {
    path: "/careerplan",
    name: "careerplan",
    component: CareerPlan,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/BookLibrary",
    name: "bookLibrary",
    component: BookLibrary,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/resumeBg",
    name: "resumeBg",
    component: ResumeBg
  },
  {
    path: "/resume/:resumeId?",
    name: "resume",
    component: Resume,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/viewResume/:resumeId/:org?",
    name: "viewResume",
    component: ViewResume,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/cartdetail",
    name: "cartDetail",
    component: CartDetail
  },
  {
    path: "/settlement",
    name: "settlement",
    component: Settlement
  },
  {
    path: "/paysuccess/:orderNo/:money",
    name: "paysuccess",
    component: PaySuccess
  },
  {
    path: "/resumePreview",
    name: "resumePreview",
    component: ResumePreview,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/agreement",
    name: "agreement",
    component: Agreement
  },
  {
    path: "/templateList/:resumeId",
    name: "templateList",
    component: TemplateList
  },
  {
    path: "/template1/:resumeId-:templateId",
    name: "template1",
    component: Template1
  },
  {
    path: "/template2/:resumeId-:templateId",
    name: "template2",
    component: Template2
  },
  {
    path: "/template3/:resumeId-:templateId",
    name: "template3",
    component: Template3
  },
  {
    path: "/template31/:resumeId-:templateId",
    name: "template31",
    component: Template31
  }
];

const router = new VueRouter({
  mode: "history",
  routes
  // fallback: false, //当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式。默认值为 true。
  // scrollBehavior: () => ({ y: 0 }), 滚动行为
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.getToken) {
      next();
    } else {
      store.state.isLogin = false;
      store.state.showLoginPage = true;
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
          isLogin: false
        }
      });
    }
  } else {
    next();
  }
});
export default router;
