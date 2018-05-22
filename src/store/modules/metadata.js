import api from '../../api/index'
import config from '../../api/config'
import axios from 'axios'

const DATA_SET = 'DATA_SET'
const AREA = 'AREA'
const FUNCTION = 'FUNCTION'

export default {
  state: {
    cities: [],
    native: [],
    careerType: [],
    jobStatus: [],
    marriageStatus: [],
    salaryRange: [],
    workplaceList: [],
    positionType: [],
    industryType: [],
    workType: [],
    arriveRange: [],
    companySize: [],
    funType: [],
    companyNature: [],
    majorType: [],
    eduNatureType: [],
    degreeType: []
  },
  mutations: {
    [DATA_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    [AREA]({ commit }, params) {
      return api.get(config.url.treeItem, params).then(res => {
        commit('DATA_SET', {
          target: 'cities',
          data: res
        })
        return res
      })
    },
    [FUNCTION]({ commit }, params) {
      return api.get(config.url.treeItem, params).then(res => {
        commit('DATA_SET', {
          target: 'funType',
          data: res
        })
        return res
      })
    },
  },
  getters: {},
  modules: {}
}