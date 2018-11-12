import Vue from 'vue'
import Vuex from 'vuex'

import evaluetion from './modules/evaluation'
import resume from './modules/resume'
import plan from './modules/plan'
import user from './modules/user'
import sso from './modules/sso'
import metadata from './modules/metadata'
import person from './modules/person'
import order from './modules/order'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: JSON.parse(localStorage.getItem("isLogin") || 0) || false,
    userInfo: JSON.parse(localStorage.getItem("userInfo") || 0) || {},
    showLoginPage: false,
    cartCount: 0
  },
  getters: {
    getToken: state => {
      return state.userInfo.token
    }
  },
  mutations: {
    setUserInfo: (state, data) => {
      state.isLogin = JSON.parse(localStorage.getItem("isLogin"));
      state.userInfo = JSON.parse(localStorage.getItem("userInfo") || 0);
    },
    logout: (state) => {
      state.userInfo = {}
      state.isLogin = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem("isLogin")
    },
    updateUserInfo: (state, data) => {
      state.userInfo = {...state.userInfo, ...data.data }
      localStorage.userInfo = {...state.userInfo, ...data.data }
    },
    setShowLoginPage: (state, data) => {
      state.showLoginPage = data
    },
    setCartCount: (state, data) => {
      state.cartCount = data
    }
  },
  actions: {},
  modules: {
    evaluetion,
    resume,
    plan,
    user,
    sso,
    metadata,
    person,
    order
  }
})