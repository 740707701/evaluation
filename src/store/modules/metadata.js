import api from '../../api/index'
import config from '../../api/config'
import axios from 'axios'

const DATA_SET = 'DATA_SET'
const AREA = 'AREA'
const FUNCTION = 'FUNCTION'
const INDUSTRY = 'INDUSTRY'
const COMPANY_SIZE = 'COMPANY_SIZE'
const COMPANY_NATURE = 'COMPANY_NATURE'
const EDUCATION = 'EDUCATION'
const EXPECT_SALARY = 'EXPECT_SALARY'
const SCHOOLWORK_PROP = 'SCHOOLWORK_PROP'
const JOB_STATUS = 'JOB_STATUS'
const MARRIAGE_STATUS = 'MARRIAGE_STATUS'
const NATIVE = 'NATIVE'
const PROF_TYPE = 'PROF_TYPE'
const SEX = 'SEX'
const MAJOR = 'MAJOR'
const ARRIVE_TIME = 'ARRIVE_TIME'
const WORK_TYPE = 'WORK_TYPE'

export default {
  state: {
    cities: [],
    careerType: [],
    jobStatus: [],
    marriageStatus: [],
    salaryRange: [],
    industryType: [],
    workType: [],
    arriveRange: [],
    funType: [],
    companyNature: [],
    companySize: [],
    majorType: [],
    eduNatureType: [], //学业性质
    degreeType: [],
    sex: []
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
    [INDUSTRY]({ commit }, params) {
      return api.get(config.url.treeItem, params).then(res => {
        commit('DATA_SET', {
          target: 'industryType',
          data: res
        })
        return res
      })
    },
    [COMPANY_NATURE]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'companyNature',
          data: res
        })
        return res
      })
    },
    [COMPANY_SIZE]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'companySize',
          data: res
        })
        return res
      })
    },
    [EDUCATION]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'eduNatureType',
          data: res
        })
        return res
      })
    },
    [EXPECT_SALARY]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'salaryRange',
          data: res
        })
        return res
      })
    },
    [SCHOOLWORK_PROP]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'degreeType',
          data: res
        })
        return res
      })
    },
    [JOB_STATUS]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'jobStatus',
          data: res
        })
        return res
      })
    },
    [MARRIAGE_STATUS]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'marriageStatus',
          data: res
        })
        return res
      })
    },
    [NATIVE]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'native',
          data: res
        })
        return res
      })
    },
    [PROF_TYPE]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'careerType',
          data: res
        })
        return res
      })
    },
    [SEX]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'sex',
          data: res
        })
        return res
      })
    },
    [MAJOR]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'majorType',
          data: res
        })
        return res
      })
    },
    [ARRIVE_TIME]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'arriveRange',
          data: res
        })
        return res
      })
    },
    [WORK_TYPE]({ commit }, params) {
      return api.get(config.url.dictItem, params).then(res => {
        commit('DATA_SET', {
          target: 'workType',
          data: res
        })
        return res
      })
    },
  },
  getters: {},
  modules: {}
}