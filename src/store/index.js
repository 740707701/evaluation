import Vue from 'vue'
import Vuex from 'vuex'

import evaluetion from './modules/evaluation'
import resume from './modules/resume'
import plan from './modules/plan'
import user from './modules/user'
import metadata from './modules/metadata'
import person from './modules/person'
import order from './modules/order'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    showLoginPage: false,
  },
  getters: {
    getToken: state => {
      return state.userInfo.token
    }
  },
  mutations: {
    setUserInfo: (state, data) => {
      console.log('setUserInfo', data)
      state.isLogin = JSON.parse(localStorage.getItem("isLogin"));
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
    }
  },
  actions: {},
  modules: {
    evaluetion,
    resume,
    plan,
    user,
    metadata,
    person,
    order
  }
})