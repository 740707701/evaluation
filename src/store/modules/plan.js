import api from '../../api/index'
import config from '../../api/config'

const PLAN_SET = 'PLAN_SET'

const ADDITIONAL_LIST = 'ADDITIONAL_LIST'
const INSERTADDITIONAL = 'INSERTADDITIONAL'
const DELETEADDITIONAL = 'DELETEADDITIONAL'
const ADDITIONALINFO = 'ADDITIONALINFO'

const CERTIFICATE_LIST = 'CERTIFICATE_LIST'
const INSERTCERTIFICATE = 'INSERTCERTIFICATE'
const DELETECERTIFICATE = 'DELETECERTIFICATE'
const CERTIFICATEINFO = ''

const INTERNSHIP_LIST = 'INTERNSHIP_LIST'
const INSERTINTERNSHIP = 'INSERTINTERNSHIP'
const DELETEINTERNSHIP = 'DELETEINTERNSHIP'
const INTERNSHIPINFO = 'INTERNSHIPINFO'

const OFFICE_LIST = 'OFFICE_LIST'
const INSERTOFFICE = 'INSERTOFFICE'
const DELETEOFFICE = 'DELETEOFFICE'
const OFFICEINFO = 'OFFICEINFO'

const OPTIONAL_LIST = 'OPTIONAL_LIST'
const INSERTOPTIONAL = 'INSERTOPTIONAL'
const DELETEOPTIONAL = 'DELETEOPTIONAL'
const OPTIONALINFO = 'OPTIONALINFO'

const PROF_LIST = 'PROF_LIST'
const INSERTPROF = 'INSERTPROF'
const DELETEPROF = 'DELETEPROF'
const PROFINFO = 'PROFINFO'

const REQUIRE_LIST = 'REQUIRE_LIST'
const INSERTREQUIRE = 'INSERTREQUIRE'
const DELETEREQUIRE = 'DELETEREQUIRE'
const REQUIREINFO = 'REQUIREINFO'

const SELF_LIST = 'SELF_LIST'
const INSERTSELF = 'INSERTSELF'
const DELETESELF = 'DELETESELF'
const SELFINFO = 'SELFINFO'

const VOCATION_LIST = 'VOCATIONSL_LIST'
const INSERTVOCATION = 'INSERTVOCATION'
const DELETEVOCATION = 'DELETEVOCATION'
const VOCATIONINFO = 'VOCATIONINFO'

const OTHERPLAN_LIST = 'OTHERPLAN_LIST'
const INSERTOTHERPLAN = 'INSERTOTHERPLAN'
const DELETEOTHERPLAN = 'DELETEOTHERPLAN'
const OTHERPLANINFO = 'OTHERPLANINFO'

export default {
  state: {
    additionalList: [], //附加计划
    additionalInfo: {},
    certificateList: [], //证书
    certificateInfo: {},
    internshipList: [], //实习实践
    internshipInfo: {},
    officeList: [], //办公技能
    officeInfo: {},
    optionalList: [], //选修课
    optionalInfo: {},
    profList: [], //专业大赛
    profInfo: {},
    requireList: [], //必修课
    requireInfo: {},
    selfList: [], //自学课
    selfInfo: {},
    vocationList: [], //职业能力
    vocationInfo: {},
    otherPlanList: [], //其他计划
    otherPlanInfo: {}
  },
  mutations: {
    [PLAN_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    //获取其他计划列表
    [ADDITIONAL_LIST]({ commit }, params) {
      return api.get(config.url.listAdditions, params).then(res => {
        commit('PLAN_SET', {
          target: 'additionalList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 其他计划
    [INSERTADDITIONAL]({ commit }, data) {
      return api.post(config.url.insertAdditional, params).then(res => {
        commit('PLAN_SET', {
          target: 'additionalInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [ADDITIONALINFO]({ commit }, data) {
      return api.put(config.url.updateAdditional, params).then(res => {
        commit('PLAN_SET', {
          target: 'additionalInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [ADDITIONALINFO]({ commit }, data) {
      return api.delete(config.url.deleteAdditional.replace('{id}', id)).then(res => {
        commit('PLAN_SET', {
          target: 'additionalInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

    //证书列表
    [CERTIFICATE_LIST]({ commit }, params) {
      return api.get(config.url.listCertificate, params).then(res => {
        commit('PLAN_SET', {
          target: 'certificateList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 证书
    [INSERTCERTIFICATE]({ commit }, data) {
      return api.post(config.url.insertCertificate, params).then(res => {
        commit('PLAN_SET', {
          target: 'certificateInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [CERTIFICATEINFO]({ commit }, data) {
      return api.put(config.url.updateCertificate, params).then(res => {
        commit('PLAN_SET', {
          target: 'certificateInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [CERTIFICATEINFO]({ commit }, data) {
      return api.delete(config.url.deleteCertificate.replace('{id}', id)).then(res => {
        commit('PLAN_SET', {
          target: 'certificateInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

    //实习实践列表
    [INTERNSHIP_LIST]({ commit }, params) {
      return api.get(config.url.listInternship, params).then(res => {
        commit('PLAN_SET', {
          target: 'internshipList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 实习实践
    [INSERTINTERNSHIP]({ commit }, data) {
      return api.post(config.url.insertInternship, params).then(res => {
        commit('PLAN_SET', {
          target: 'internshipInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [INTERNSHIPINFO]({ commit }, data) {
      return api.put(config.url.updateInternship, params).then(res => {
        commit('PLAN_SET', {
          target: 'internshipInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [INTERNSHIPINFO]({ commit }, data) {
      return api.delete(config.url.deleteInternship).then(res => {
        commit('PLAN_SET', {
          target: 'internshipInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

    //办公技能列表
    [OFFICE_LIST]({ commit }, params) {
      return api.get(config.url.listOffice, params).then(res => {
        commit('PLAN_SET', {
          target: 'officeList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 办公技能
    [INSERTOFFICE]({ commit }, data) {
      return api.post(config.url.insertOffice, params).then(res => {
        commit('PLAN_SET', {
          target: 'officeInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [OFFICEINFO]({ commit }, data) {
      return api.put(config.url.updateOffice, params).then(res => {
        commit('PLAN_SET', {
          target: 'officeInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [OFFICEINFO]({ commit }, data) {
      return api.delete(config.url.deleteOffice.replace('{id}', id)).then(res => {
        commit('PLAN_SET', {
          target: 'officeInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //////////////////////////////////////////////////////////////////
    //选修课列表
    [OPTIONAL_LIST]({ commit }, params) {
      return api.get(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'optionalList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 选修课
    [INSERTOPTIONAL]({ commit }, data) {
      return api.post(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'optionalInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [OPTIONALINFO]({ commit }, data) {
      return api.put(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'optionalInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [OPTIONALINFO]({ commit }, data) {
      return api.delete().then(res => {
        commit('PLAN_SET', {
          target: 'optionalInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

    //专业大赛
    [PROF_LIST]({ commit }, params) {
      return api.get(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'profList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 专业大赛
    [INSERTPROF]({ commit }, data) {
      return api.post(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'profInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [PROFINFO]({ commit }, data) {
      return api.put(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'profInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [PROFINFO]({ commit }, data) {
      return api.delete().then(res => {
        commit('PLAN_SET', {
          target: 'profInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

    //必修课列表
    [REQUIRE_LIST]({ commit }, params) {
      return api.get(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'requireList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增必修课
    [INSERTREQUIRE]({ commit }, data) {
      return api.post(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'requireInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [REQUIREINFO]({ commit }, data) {
      return api.put(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'requireInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [REQUIREINFO]({ commit }, data) {
      return api.delete().then(res => {
        commit('PLAN_SET', {
          target: 'requireInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

    //自学课列表
    [SELF_LIST]({ commit }, params) {
      return api.get(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'selfList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 自学课
    [INSERTSELF]({ commit }, data) {
      return api.post(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'selfInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [SELFINFO]({ commit }, data) {
      return api.put(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'selfInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [SELFINFO]({ commit }, data) {
      return api.delete().then(res => {
        commit('PLAN_SET', {
          target: 'selfInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

    //职业能力列表
    [VOCATION_LIST]({ commit }, params) {
      return api.get(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'vocationList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 职业能力
    [INSERTVOCATION]({ commit }, data) {
      return api.post(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'vocationInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [VOCATIONINFO]({ commit }, data) {
      return api.put(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'vocationInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [VOCATIONINFO]({ commit }, data) {
      return api.delete().then(res => {
        commit('PLAN_SET', {
          target: 'vocationInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

    //其他计划 列表
    [OTHERPLAN_LIST]({ commit }, params) {
      return api.get(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'otherPlanList',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //新增 其他列表
    [INSERTOTHERPLAN]({ commit }, data) {
      return api.post(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'otherPlanInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //修改
    [OTHERPLANINFO]({ commit }, data) {
      return api.put(config.url, params).then(res => {
        commit('PLAN_SET', {
          target: 'otherPlanInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },
    //删除
    [OTHERPLANINFO]({ commit }, data) {
      return api.delete().then(res => {
        commit('PLAN_SET', {
          target: 'otherPlanInfo',
          data: res.data
        })
      }).catch(err => {
        return err
      })
    },

  },
  modules: {}
}