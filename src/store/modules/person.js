import api from '../../api/index'
import config from '../../api/config'
import axios from 'axios'

const MSG_SET = 'MSG_SET'


const MSG_LIST = 'MSG_LIST'
const UPDATE_MSG = 'UPDATE_MSG'
const DELETE_MSG = 'DELETE_MSG'
const ADD_MSG = 'ADD_MSG'


export default {
  state: {
    msgList: [],
    msgInfo: {}
  },
  mutations: {
    [MSG_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    [MSG_LIST]({ commit }, params) {
      return api.get(config.url.listMsg, params).then(res => {
        commit('MSG_SET', {
          target: 'msgList',
          data: res.data
        })
        return res
      })
    },
    [ADD_MSG]({ commit }, params) {
      return api.post(config.url.addMsg, params).then(res => {
        commit('MSG_SET', {
          target: 'msgInfo',
          data: res.data
        })
        return res
      })
    },
    [UPDATE_MSG]({ commit }, params) {
      // data = new URLSearchParams(data)
      return api.put(config.url.updateMsg, params).then(res => {
        commit('MSG_SET', {
          target: 'msgInfo',
          data: res.data
        })
        return res
      })
    },
    [DELETE_MSG]({ commit }, params) {
      return api.delete(config.url.deleteMsg, params).then(res => {
        commit('MSG_SET', {
          target: 'msgInfo',
          data: res.data
        })
        return res
      })
    },
  },
  getters: {},
  modules: {}
}