import api from '../../api/index'
import config from '../../api/config'

const EVALUATION_SET = 'EVALUATION_SET'
const EVALUATION_LIST = 'EVALUATION_LIST'
const HOT_LIST = 'HOT_LIST'
const EVALUATION_DETAIL = 'EVALUATION_DETAIL'
const FINISHED = 'FINISHED'
const UNFINISHED = 'UNFINISHED'
const TOCAICHU = 'TOCAICHU'
const CEPINGFREE = 'CEPINGFREE'
const RECORDREPORT = 'RECORDREPORT'
const BANNERLIST = 'BANNERLIST'
const VALIDCEPING = 'VALIDCEPING'

export default {
  state: {
    bannerList: [],
    evaluationList: [],
    hotList: [],
    evaluationInfo: {},
    finished: [],
    unfinished: [],
    tocaichu: {},
    cepingfree: {},
    report: {},
    validCepingInfo: {}
  },
  mutations: {
    [EVALUATION_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    [BANNERLIST]({ commit }, params) {
      return api.get(config.url.bannerList, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'bannerList',
          data: res.data
        })
        return res
      })
    },
    [EVALUATION_LIST]({ commit }, params) {
      return api.get(config.url.cepingList, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'evaluationList',
          data: res.data
        })
        return res
      })
    },
    [HOT_LIST]({ commit }, params) {
      return api.get(config.url.hotList, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'hotList',
          data: res.data
        })
        return res
      })
    },
    [EVALUATION_DETAIL]({ commit }, params) {
      return api.get(config.url.cepingInfo, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'evaluationInfo',
          data: res.data
        })
        return res
      })
    },
    [FINISHED]({ commit }, params) {
      return api.get(config.url.finished).then(res => {
        commit('EVALUATION_SET', {
          target: 'finished',
          data: res.data
        })
        return res
      })
    },
    [UNFINISHED]({ commit }, params) {
      return api.get(config.url.unfinished, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'unfinished',
          data: res.data
        })
        return res
      })
    },
    [TOCAICHU]({ commit }, data) {
      return api.post(config.url.tocaichu.replace('{cepingId}', data.cepingId).replace('{serialno}', data.serialno).replace('{operator}', data.operator)).then(res => {
        commit('EVALUATION_SET', {
          target: 'tocaichu',
          data: res.data
        })
        return res
      })
    },
    [VALIDCEPING]({ commit }, data){
      return api.post(config.url.validCeping, data).then(res => {
        commit('EVALUATION_SET', {
          target: 'validCepingInfo',
          data: res.data
        })
        return res
      })
    },
    [CEPINGFREE]({ commit }, data) {
      return api.post(config.url.cepingFree, data).then(res => {
        commit('EVALUATION_SET', {
          target: 'cepingfree',
          data: res.data
        })
        return res
      })
    },
    [RECORDREPORT]({ commit }, data) {
      return api.post(config.url.recordreport, data).then(res => {
        commit('EVALUATION_SET', {
          target: 'report',
          data: res.data
        })
        return res
      })
    }
  },
  modules: {}
}