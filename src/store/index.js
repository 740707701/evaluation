import Vue from 'vue'
import Vuex from 'vuex'

import evaluetion from './modules/evaluation'
import resume from './modules/resume'
import plan from './modules/plan'
import user from './modules/user'
import metadata from './modules/metadata'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {}
  },
  actions: {},
  geters: {
    getToken: state => state.userInfo.access_token
  },
  mutations: {
    login: (state, data) => {
      state.userInfo = data.user_info
    },
    logout: (state) => {
      state.userInfo = {}
      localStorage.removeItem('user_info')
    }
  },
  modules: {
    evaluetion, resume, plan, user, metadata
  }
})