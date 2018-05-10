import api from '../../api/index'
import config from '../../api/config'

const EVALUATION_SET = 'EVALUATION_SET'
const EVALUATION_LIST = 'EVALUATION_LIST'
const HOT_LIST = 'HOT_LIST'
const EVALUATION_DETAIL = 'EVALUATION_DETAIL'

export default {
  state: {
    evaluationList: [],
    hotList: [],
    evaluationInfo: {}
  },
  mutations: {
    [EVALUATION_SET](state, data){
      state[data['target']] = data.data
    }
  },
  actions: {
    [EVALUATION_LIST]({commit}, params){
      return api.get(config.url.cepingList, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'evaluationList',
          data: res.data
        })
        return res
      })
    },
    [HOT_LIST]({commit}, params){
      return api.get(config.url.hotList, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'hotList',
          data: res.data
        })
        return res
      })
    },
    [EVALUATION_DETAIL]({commit}, params){
      return api.get(config.url.cepingInfo, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'evaluationInfo',
          data: res.data
        })
        return res
      })
    },
  },
  modules: {}
}