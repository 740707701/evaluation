import api from '../../api/index'
import config from '../../api/config'
import axios from 'axios'

const RESUME_SET = 'RESUME_SET'
const RESUME_INFO = 'RESUME_INFO'
const RESUME_LIST = 'RESUME_LIST'
const MODIFY_LIST = 'MODIFY_LIST'
const SUBMIT_RESUME = 'SUBMIT_RESUME'
const EXPORT_RESUME = 'EXPORT_RESUME'
const CHECK_RESUME = 'CHECK_RESUME'

const SET_BASEINFO = 'SET_BASEINFO'
const SET_JOBINTENSION = 'SET_JOBINTENSION'
const SET_EVALUATE = 'SET_EVALUATE'
const SET_WORKEXPER = 'SET_WORKEXPER'
const DELETE_WORKEXPER = 'DELETE_WORKEXPER'
const SET_EDU = 'SET_EDU'
const DELETE_EDU = 'DELETE_EDU'
const SET_SCHOOLHONOR = 'SET_SCHOOLHONOR'
const DELETE_SCHOOLHONOR = 'DELETE_SCHOOLHONOR'
const SET_SCHOOLWORK = 'SET_SCHOOLWORK'
const DELETE_SCHOOLWORK = 'DELETE_SCHOOLWORK'
const SET_SKILL = 'SET_SKILL'
const DELETE_SKILL = 'DELETE_SKILL'
const UPLOAD_HEAD = 'UPLOAD_HEAD'
const UPDATEHEAD = 'UPDATEHEAD'
const TEMPLATELIST = 'TEMPLATELIST'
const VALIDPURCHASE = 'VALIDPURCHASE'

//metadata
const DICTITEM = 'DICTITEM'
const TREEITEM = 'TREEITEM'
const ALL = 'ALL'

//简历页面
export default {
  state: {
    resumeInfo: {},
    resumeList: [],
    baseInfo: [],
    evaluate: {}, //评价
    jobIntension: [], //求职意向
    modifyList: [],
    workExper: [],
    education: [],
    schoolHonor: [],
    schoolWork: [],
    skills: [],
    treeItem: [],
    dictItem: [],
    allList: [],
    uploadFile: '',
    templateList: [],
    validInfo: {}
  },
  mutations: {
    [RESUME_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    [UPDATEHEAD]({ commit }, data) {
      return api.put(config.url.updateHead, data).then(res => {
        commit('USER_SET', {
          target: 'userInfo',
          data: res
        })
        return res
      })
    },
    //检查是否提交过简历
    [CHECK_RESUME]({ commit }, params) {
      return api.get(config.url.checkResume, params).then(res => {
        commit('RESUME_SET', {
          target: 'resumeInfo',
          data: res
        })
        return res
      })
    },
    //获取简历信息
    [RESUME_INFO]({ commit }, params) {
      return api.get(config.url.resumeInfo, { resumeId: params.resumeId }).then(res => {
        commit('RESUME_SET', {
          target: 'resumeInfo',
          data: res
        })
        return res
      })
    },
    //获取简历列表
    [RESUME_LIST]({ commit }, params) {
      return api.get(config.url.resumeList, params).then(res => {
        commit('RESUME_SET', {
          target: 'resumeList',
          data: res
        })
        return res
      })
    },
    //获取待修改简历列表
    [MODIFY_LIST]({ commit }, params) {
      return api.get(config.url.modifyList, params).then(res => {
        commit('RESUME_SET', {
          target: 'modifyList',
          data: res
        })
        return res
      })
    },
    //提交简历
    [SUBMIT_RESUME]({ commit }, params) {
      return api.put(config.url.submitResume.replace('{resumeId}', params.resumeId)).then(res => {
        commit('RESUME_SET', {
          target: 'resumeInfo',
          data: res
        })
        return res
      })
    },
    //导出简历
    [EXPORT_RESUME]({ commit }, params) {
      return api.get(config.url.exportResume.replace('{resumeId}', params.resumeId).replace('{format}', params.format)).then(res => {
        commit('RESUME_SET', {
          target: 'resumeInfo',
          data: res
        })
        return res
      })
    },
    //上传简历头像
    [UPLOAD_HEAD]({ commit }, data) {
      return api.post(config.url.headpic, data).then(res => {
        commit('RESUME_SET', {
          target: 'uploadFile',
          data: res
        })
        return res
      })
    },
    //保存修改基本信息
    [SET_BASEINFO]({ commit }, data) {
      return api.post(config.url.baseInfo, data).then(res => {
        commit('RESUME_SET', {
          target: 'baseInfo',
          data: res
        })
        return res
      })
    },
    //保存修改求职意向
    [SET_JOBINTENSION]({ commit }, data) {
      return api.post(config.url.expect + '?type=2', data).then(res => {
        commit('RESUME_SET', {
          target: 'jobIntension',
          data: res
        })
        return res
      })
    },
    //保存修改求职意向
    [SET_EVALUATE]({ commit }, data) {
      return api.post(config.url.expect + '?type=3', data).then(res => {
        commit('RESUME_SET', {
          target: 'evaluate',
          data: res
        })
        return res
      })
    },
    //保存修改工作经历
    [SET_WORKEXPER]({ commit }, data) {
      return api.post(config.url.workExper, data).then(res => {
        commit('RESUME_SET', {
          target: 'workExper',
          data: res
        })
        return res
      })
    },
    //删除工作经历
    [DELETE_WORKEXPER]({ commit }, params) {
      return api.delete(config.url.deleteWorkExper.replace('{id}', params)).then(res => {
        commit('RESUME_SET', {
          target: 'workExper',
          data: res
        })
        return res
      })
    },
    //保存修改教育经历
    [SET_EDU]({ commit }, data) {
      return api.post(config.url.edu, data).then(res => {
        commit('RESUME_SET', {
          target: 'education',
          data: res
        })
        return res
      })
    },
    //删除教育经历
    [DELETE_EDU]({ commit }, params) {
      return api.delete(config.url.deleteEdu.replace('{id}', params)).then(res => {
        commit('RESUME_SET', {
          target: 'education',
          data: res
        })
        return res
      })
    },
    //保存修改校内荣誉
    [SET_SCHOOLHONOR]({ commit }, data) {
      return api.post(config.url.schoolhonor, data).then(res => {
        commit('RESUME_SET', {
          target: 'schoolHonor',
          data: res
        })
        return res
      })
    },
    //删除校内荣誉
    [DELETE_SCHOOLHONOR]({ commit }, params) {
      return api.delete(config.url.deleteSchoolhonor.replace('{id}', params)).then(res => {
        commit('RESUME_SET', {
          target: 'schoolHonor',
          data: res
        })
        return res
      })
    },
    //保存修改校内职务
    [SET_SCHOOLWORK]({ commit }, data) {
      return api.post(config.url.schoolwork, data).then(res => {
        commit('RESUME_SET', {
          target: 'schoolWork',
          data: res
        })
        return res
      })
    },
    //删除校内职务
    [DELETE_SCHOOLWORK]({ commit }, params) {
      return api.delete(config.url.deleteSchoolwork.replace('{id}', params)).then(res => {
        commit('RESUME_SET', {
          target: 'schoolWork',
          data: res
        })
        return res
      })
    },
    //保存修改技能证书
    [SET_SKILL]({ commit }, data) {
      return api.post(config.url.skills, data).then(res => {
        commit('RESUME_SET', {
          target: 'skills',
          data: res
        })
        return res
      })
    },
    //删除技能证书
    [DELETE_SKILL]({ commit }, params) {
      return api.delete(config.url.deleteSkills.replace('{id}', params)).then(res => {
        commit('RESUME_SET', {
          target: 'skills',
          data: res
        })
        return res
      })
    },
    //模板列表
    [TEMPLATELIST]({ commit }, params){
      return api.get(config.url.templateList, params).then(res => {
        commit('RESUME_SET', {
          target: 'templateList',
          data: res
        })
        return res
      })
    },
    //验证是否购买简历模板
    [VALIDPURCHASE]({ commit }, params){
      return api.get(config.url.validPurchase.replace('{templateId}', params.templateId)).then(res => {
        commit('RESUME_SET', {
          target: 'validInfo',
          data: res
        })
        return res
      })
    }
  },
  getters: {},
  modules: {}
}