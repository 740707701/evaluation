import api from '../../api/index'
import config from '../../api/config'
import {getLoginConfig} from '../../api/asset-login'

const USER_SET = 'USER_SET'
const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const CAPTCHA = 'CAPTCHA'
const FORGET = 'FORGET'
const USERINFO = 'USERINFO'
const GETAUTHMSG = 'GETAUTHMSG'
const VALIDAUTHCODE = 'VALIDAUTHCODE'
const PAGE_MODULE = 'PAGE_MODULE'
const ASSET_LOGIN_CONFIG = 'ASSET_LOGIN_CONFIG'

export default {
  state: {
    loginInfo: {},
    registerInfo: {},
    forgetInfo: {},
    captchaInfo: {},
    userInfo: {},
    moduleList: []
  },
  mutations: {
    [USER_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    [LOGIN]({ commit }, data) {
      // data = new URLSearchParams(data) //有兼容问题 360安全浏览器不可以
      return api.post(config.url.login, data).then(res => {
        commit('USER_SET', {
          target: 'loginInfo',
          data: res
        })
        return res
      })
    },
    [ASSET_LOGIN_CONFIG]({commit}) {
      return getLoginConfig().then(res => {
        return res
      })
    },
    [REGISTER]({ commit }, data) {
      // data = new URLSearchParams(data) 
      return api.post(config.url.register, data).then(res => {
        commit('USER_SET', {
          target: 'registerInfo',
          data: res
        })
        return res
      })
    },
    [GETAUTHMSG]({commit}, data) {
      return api.post(config.url.getAuthMsg, data).then(res => {
        return res
      })
    },
    [VALIDAUTHCODE]({commit}, data) {
      return api.post(config.url.authValid, data).then(res => {
        return res
      })
    },
    [FORGET]({ commit }, data) {
      // data = new URLSearchParams(data)
      return api.post(config.url.forget, data).then(res => {
        commit('USER_SET', {
          target: 'forgetInfo',
          data: res
        })
        return res
      })
    },
    [CAPTCHA]({ commit }, data) {
      // data = new URLSearchParams(data)
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
    [PAGE_MODULE]({ commit }, params) {
      return api.get(config.url.pageModule, params).then(res => {
        return res
      })
    },
  }
}