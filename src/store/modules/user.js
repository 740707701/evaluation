import api from '../../api/index'
import config from '../../api/config'

const USER_SET = 'USER_SET'
const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const CAPTCHA = 'CAPTCHA'
const FORGET = 'FORGET'
const USERINFO = 'USERINFO'

export default {
  state: {
    loginInfo: {},
    registerInfo: {},
    forgetInfo: {},
    captchaInfo: {},
    userInfo: {}
  },
  mutations: {
    [USER_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    [LOGIN]({ commit }, data) {
      data = new URLSearchParams(data)
      return api.post(config.url.login, data).then(res => {
        commit('USER_SET', {
          target: 'loginInfo',
          data: res
        })
        return res
      })
    },
    [REGISTER]({ commit }, data) {
      data = new URLSearchParams(data)
      return api.post(config.url.register, data).then(res => {
        commit('USER_SET', {
          target: 'registerInfo',
          data: res
        })
        return res
      })
    },
    [FORGET]({ commit }, data) {
      data = new URLSearchParams(data)
      return api.post(config.url.forget, data).then(res => {
        commit('USER_SET', {
          target: 'forgetInfo',
          data: res
        })
        return res
      })
    },
    [CAPTCHA]({ commit }, data) {
      data = new URLSearchParams(data)
      return api.post(config.url.captcha, data).then(res => {
        commit('USER_SET', {
          target: 'captchaInfo',
          data: res
        })
        return res
      })
    },
    [USERINFO]({ commit }, params) {
      return api.put(config.url.userInfo, params).then(res => {
        commit('USER_SET', {
          target: 'userInfo',
          data: res
        })
        return res
      })
    },
  }
}