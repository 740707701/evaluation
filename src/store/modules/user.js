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
    loginInfo:{},
    registerInfo: {},
    forgetInfo: {},
    captchaInfo: {},
    userInfo: {}
  },
  mutations: {
    [USER_SET](state, data){
      state[data['target']] = data.data
    }
  },
  actions: {
    [LOGIN]({commit}, params){
      return api.post(api.url.login, params).then(res => {
        commit('USER_SET', {
          target: 'loginInfo',
          data: res.data
        })
        return res
      })
    },
    [REGISTER]({commit}, params){
      return api.post(api.url.register, params).then(res => {
        commit('USER_SET', {
          target: 'registerInfo',
          data: res.data
        })
        return res
      })
    },
    [FORGET]({commit}, params){
      return api.post(api.url.forget, params).then(res => {
        commit('USER_SET', {
          target: 'forgetInfo',
          data: res.data
        })
        return res
      })
    },
    [CAPTCHA]({commit}, params){
      return api.post(api.url.captcha, params).then(res => {
        commit('USER_SET', {
          target: 'captchaInfo',
          data: res.data
        })
        return res
      })
    },
    [USERINFO]({commit}, params){
      return api.put(api.url.userInfo, params).then(res => {
        commit('USER_SET', {
          target: 'userInfo',
          data: res.data
        })
        return res
      })
    },
  }
}