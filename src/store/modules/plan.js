import api from "../../api/index"
import config from "../../api/config"

const PLAN_SET = "PLAN_SET"

const FIND_PLACEHOLDER = 'FIND_PLACEHOLDER'
const PLAN_DICT_DATA = 'PLAN_DICT_DATA'
const GENERALPLAN_PAPER = 'GENERALPLAN_PAPER'
const SAVE_GENERALPLAN = 'SAVE_GENERALPLAN'
const GENERALPLAN_INFO = 'GENERALPLAN_INFO'

const VIDEO_LIST = 'VIDEO_LIST'
const INSERT_VIDEO_OPEN = 'INSERT_VIDEO_OPEN'
const FIND_VIDEO_OPEN = 'FIND_VIDEO_OPEN'

const PLANINFO = "PLANINFO"
const PLANLIST = "PLANLIST"
const OPENPLAN = "OPENPLAN"
const SUBMITPLAN = "SUBMITPLAN"
const QUERYPLAN = 'QUERYPLAN'
const RECORD_OPENSTATE = 'RECORD_OPENSTATE'

const CERTIFICATE_DATA = "CERTIFICATE_DATA"
const CATEGORY_DATA = "CATEGORY_DATA"
const BOOK_DATA = "BOOK_DATA"
const OFFICE_DATA = "OFFICE_DATA"
const VOCATION_DATA = "VOCATION_DATA"

const ADDITIONAL_LIST = "ADDITIONAL_LIST"
const INSERT_ADDITIONAL = "INSERT_ADDITIONAL"
const DELETE_ADDITIONAL = "DELETE_ADDITIONAL"
const UPDATE_ADDITIONAL = "UPDATE_ADDITIONAL"

const CERTIFICATE_LIST = "CERTIFICATE_LIST"
const INSERT_CERTIFICATE = "INSERT_CERTIFICATE"
const DELETE_CERTIFICATE = "DELETE_CERTIFICATE"
const UPDATE_CERTIFICATE = "UPDATE_CERTIFICATE"

const INTERNSHIP_LIST = "INTERNSHIP_LIST"
const INSERT_INTERNSHIP = "INSERT_INTERNSHIP"
const DELETE_INTERNSHIP = "DELETE_INTERNSHIP"
const UPDATE_INTERNSHIP = "UPDATE_INTERNSHIP"

const OFFICE_LIST = "OFFICE_LIST"
const INSERT_OFFICE = "INSERT_OFFICE"
const DELETE_OFFICE = "DELETE_OFFICE"
const UPDATE_OFFICE = "UPDATE_OFFICE"

const OPTIONAL_LIST = "OPTIONAL_LIST"
const INSERT_OPTIONAL = "INSERT_OPTIONAL"
const DELETE_OPTIONAL = "DELETE_OPTIONAL"
const UPDATE_OPTIONAL = "UPDATE_OPTIONAL"

const PROF_LIST = "PROF_LIST"
const INSERT_PROF = "INSERT_PROF"
const DELETE_PROF = "DELETE_PROF"
const UPDATE_PROF = "UPDATE_PROF"

const PREAD_LIST = "PREAD_LIST"
const INSERT_PREAD = "INSERT_PREAD"
const UPDATE_PREAD = "UPDATE_PREAD"
const DELETE_PREAD = "DELETE_PREAD"

const REQUIRED_LIST = "REQUIRED_LIST"
const INSERT_REQUIRED = "INSERT_REQUIRED"
const DELETE_REQUIRED = "DELETE_REQUIRED"
const UPDATE_REQUIRED = "UPDATE_REQUIRED"

const SELF_LIST = "SELF_LIST"
const INSERT_SELF = "INSERT_SELF"
const DELETE_SELF = "DELETE_SELF"
const UPDATE_SELF = "UPDATE_SELF"

const VOCATION_LIST = "VOCATIONSL_LIST"
const INSERT_VOCATION = "INSERT_VOCATION"
const DELETE_VOCATION = "DELETE_VOCATION"
const UPDATE_VOCATION = "UPDATE_VOCATION"

const OTHERPLAN_LIST = "OTHERPLAN_LIST"
const INSERT_OTHERPLAN = "INSERT_OTHERPLAN"
const DELETE_OTHERPLAN = "DELETE_OTHERPLAN"
const UPDATE_OTHERPLAN = "UPDATE_OTHERPLAN"

const INSERT_BGPROMOTION = 'INSERT_BGPROMOTION'
const DELETE_BGPROMOTION = 'DELETE_BGPROMOTION'
const UPDATE_BGPROMOTION = 'UPDATE_BGPROMOTION'
const BGPROMOTION_LIST = 'BGPROMOTION_LIST'

const INSERT_INTERPERSONALRELATIONSHIP = 'INSERT_INTERPERSONALRELATIONSHIP'
const DELETE_INTERPERSONALRELATIONSHIP = 'DELETE_INTERPERSONALRELATIONSHIP'
const UPDATE_INTERPERSONALRELATIONSHIP = 'UPDATE_INTERPERSONALRELATIONSHIP'
const INTERPERSONALRELATIONSHIP_LIST = 'INTERPERSONALRELATIONSHIP_LIST'

const INSERT_LIFEMANAGEMENT = 'INSERT_LIFEMANAGEMENT'
const DELETE_LIFEMANAGEMENT = 'DELETE_LIFEMANAGEMENT'
const UPDATE_LIFEMANAGEMENT = 'UPDATE_LIFEMANAGEMENT'
const LIFEMANAGEMENT_LIST = 'LIFEMANAGEMENT_LIST'

const INSERT_PROFTHESIS = 'INSERT_PROFTHESIS'
const DELETE_PROFTHESIS = 'DELETE_PROFTHESIS'
const UPDATE_PROFTHESIS = 'UPDATE_PROFTHESIS'
const PROFTHESIS_LIST = 'PROFTHESIS_LIST'

export default {
  state: {},
  mutations: {
    [PLAN_SET](state, data) {
      state[data["target"]] = data.data
    }
  },
  actions: {
    // 查看总规划字典
    [PLAN_DICT_DATA]({ commit }, params) {
      return api.get(config.url.planDictData, params).then(res =>{
        return res
      })
    },
    // 查看总规划paper 默认的数据格式
    [GENERALPLAN_PAPER]({commit}){
      return api.get(config.url.findGeneralPlanPaper).then(res =>{
        return res
      })
    },
    // 添加、修改个人总规划
    [SAVE_GENERALPLAN]({commit}, data) {
      return api.post(config.url.saveGeneralPlan, data).then(res => {
        return res
      })
    },
    // 查看个人总规划
    [GENERALPLAN_INFO]({commit}) {
      return api.get(config.url.generalPlanInfo).then(res => {
        return res
      })
    },
    // 总规划视频video列表
    [VIDEO_LIST]({ commit }) {
      return api.get(config.url.videoList).then(res => {
        return res
      })
    },
    // 开启总规划视频
    [INSERT_VIDEO_OPEN]({commit}) {
      return api.post(config.url.insertVideoOpen).then(res => {
        return res
      })
    },
    // 查询是否已查看过总规划视频
    [FIND_VIDEO_OPEN]({commit}) {
      return api.get(config.url.findVideoOpen).then(res => {
        return res
      })
    },

    //获取规划内容
    [PLANINFO]({ commit }, params) {
      return api.get(config.url.planInfo, params).then(res => {
        return res
      })
    },
    //根据用户获取规划列表
    [PLANLIST]({ commit }, params) {
      return api.get(config.url.planList, params).then(res => {
        return res
      })
    },
    //开启计划
    [OPENPLAN]({ commit }, data) {
      return api.post(config.url.openPlan, data).then(res => {
        return res
      })
    },
    //记录开启按钮
    [RECORD_OPENSTATE]({commit}, data){
      return api.post(config.url.recordOpenState, data).then(res => {
        return res
      })
    },
    //查询是否开启计划
    [QUERYPLAN]({ commit }, params){
      return api.get(config.url.queryOpen, params).then(res => {
        return res
      })
    },
    //提交计划
    [SUBMITPLAN]({ commit }, data) {
      return api.put(config.url.submitPlan, data).then(res => {
        return res
      })
    },

    //所有证书列表
    [CERTIFICATE_DATA]({ commit }, params) {
      return api.get(config.url.certificateData, params).then(res => {
        return res
      })
    },
    //所有书籍分类
    [CATEGORY_DATA]({ commit }, params) {
      return api.get(config.url.categoryData, params).then(res => {
        return res
      })
    },
    //所有的书列表
    [BOOK_DATA]({ commit }, params) {
      return api.get(config.url.bookData, params).then(res => {
        return res
      })
    },
    //所有办公技能列表
    [OFFICE_DATA]({ commit }, params) {
      return api.get(config.url.officeData, params).then(res => {
        return res
      })
    },
    //所有职业能力列表
    [VOCATION_DATA]({ commit }, params) {
      return api.get(config.url.vocationData, params).then(res => {
        return res
      })
    },

    //必修课列表
    [REQUIRED_LIST]({ commit }, params) {
      return api.get(config.url.listReruired, params).then(res => {
        return res
      })
    },
    //新增必修课
    [INSERT_REQUIRED]({ commit }, data) {
      return api.post(config.url.insertRequired, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_REQUIRED]({ commit }, data) {
      return api.put(config.url.updateRequired, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_REQUIRED]({ commit }, params) {
      return api.delete(config.url.deleteRequired, params).then(res => {
        return res
      })
    },

    //选修课列表
    [OPTIONAL_LIST]({ commit }, params) {
      return api.get(config.url.listOptional, params).then(res => {
        return res
      })
    },
    //新增 选修课
    [INSERT_OPTIONAL]({ commit }, data) {
      return api.post(config.url.insertOptional, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_OPTIONAL]({ commit }, data) {
      return api.put(config.url.updateOptional, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_OPTIONAL]({ commit }, data) {
      return api.delete(config.url.deleteOptional, data).then(res => {
        return res
      })
    },

    //自学课列表
    [SELF_LIST]({ commit }, params) {
      return api.get(config.url.listSelf, params).then(res => {
        return res
      })
    },
    //新增 自学课
    [INSERT_SELF]({ commit }, data) {
      return api.post(config.url.insertSelf, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_SELF]({ commit }, data) {
      return api.put(config.url.updateSelf, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_SELF]({ commit }, data) {
      return api.delete(config.url.deleteSelf, data).then(res => {
        return res
      })
    },

    //专业大赛
    [PROF_LIST]({ commit }, params) {
      return api.get(config.url.listProf, params).then(res => {
        return res
      })
    },
    //新增 专业大赛
    [INSERT_PROF]({ commit }, data) {
      return api.post(config.url.insertProf, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_PROF]({ commit }, data) {
      return api.put(config.url.updateProf, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_PROF]({ commit }, data) {
      return api.delete(config.url.deleteProf, data).then(res => {
        return res
      })
    },

    //专业阅读
    [PREAD_LIST]({ commit }, params) {
      return api.get(config.url.listPread, params).then(res => {
        return res
      })
    },
    //新增 专业阅读
    [INSERT_PREAD]({ commit }, data) {
      return api.post(config.url.insertPread, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_PREAD]({ commit }, data) {
      return api.put(config.url.updatePread, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_PREAD]({ commit }, data) {
      return api.delete(config.url.deletePread, data).then(res => {
        return res
      })
    },

    //办公技能列表
    [OFFICE_LIST]({ commit }, params) {
      return api.get(config.url.listOffice, params).then(res => {
        return res
      })
    },
    //新增 办公技能
    [INSERT_OFFICE]({ commit }, data) {
      return api.post(config.url.insertOffice, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_OFFICE]({ commit }, data) {
      return api.put(config.url.updateOffice, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_OFFICE]({ commit }, data) {
      return api.delete(config.url.deleteOffice, data).then(res => {
        return res
      })
    },

    //职业能力列表
    [VOCATION_LIST]({ commit }, params) {
      return api.get(config.url.listVocation, params).then(res => {
        return res
      })
    },
    //新增 职业能力
    [INSERT_VOCATION]({ commit }, data) {
      return api.post(config.url.insertVocation, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_VOCATION]({ commit }, data) {
      return api.put(config.url.updateVocation, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_VOCATION]({ commit }, data) {
      return api.delete(config.url.deleteVocation, data).then(res => {
        return res
      })
    },

    //实习实践列表
    [INTERNSHIP_LIST]({ commit }, params) {
      return api.get(config.url.listInternship, params).then(res => {
        return res
      })
    },
    //新增 实习实践
    [INSERT_INTERNSHIP]({ commit }, data) {
      return api.post(config.url.insertInternship, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_INTERNSHIP]({ commit }, data) {
      return api.put(config.url.updateInternship, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_INTERNSHIP]({ commit }, data) {
      return api.delete(config.url.deleteInternship, data).then(res => {
        return res
      })
    },

    //证书列表
    [CERTIFICATE_LIST]({ commit }, params) {
      return api.get(config.url.listCertificate, params).then(res => {
        return res
      })
    },
    //新增 证书
    [INSERT_CERTIFICATE]({ commit }, data) {
      return api.post(config.url.insertCertificate, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_CERTIFICATE]({ commit }, data) {
      return api.put(config.url.updateCertificate, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_CERTIFICATE]({ commit }, data) {
      return api.delete(config.url.deleteCertificate, data).then(res => {
        return res
      })
    },

    //其他计划 列表
    [OTHERPLAN_LIST]({ commit }, params) {
      return api.get(config.url.otherPlans, params).then(res => {
        return res
      })
    },

    //获取附加列表
    [ADDITIONAL_LIST]({ commit }, params) {
      return api.get(config.url.listAdditions, params).then(res => {
        return res
      })
    },
    //新增 附加计划
    [INSERT_ADDITIONAL]({ commit }, data) {
      return api.post(config.url.insertAdditional, data).then(res => {
        return res
      })
    },
    //修改
    [UPDATE_ADDITIONAL]({ commit }, data) {
      return api.put(config.url.updateAdditional, data).then(res => {
        return res
      })
    },
    //删除
    [DELETE_ADDITIONAL]({ commit }, data) {
      return api.delete(config.url.deleteAdditional, data).then(res => {
        return res
      })
    },

    // 背景提升计划列表
    [BGPROMOTION_LIST]({ commit }, params) {
      return api.get(config.url.listBackgroundPromotion, params).then(res => {
        return res
      })
    },
    // 添加背景提升计划
    [INSERT_BGPROMOTION]({ commit }, data) {
      return api.post(config.url.insertBackgroundPromotion, data).then(res => {
        return res
      })
    },
    // 修改背景提升计划
    [UPDATE_BGPROMOTION]({ commit }, data) {
      return api.put(config.url.updateBackgroundPromotion, data).then(res => {
        return res
      })
    },
    // 删除背景提升计划
    [DELETE_BGPROMOTION]({ commit }, params) {
      return api.delete(config.url.deleteBackgroundPromotion, params).then(res => {
        return res
      })
    },
    
    // 人际关系与社交管理计划列表
    [INTERPERSONALRELATIONSHIP_LIST]({ commit }, params) {
      return api.get(config.url.listInterpersonalRelationship, params).then(res => {
        return res
      })
    },
    // 添加人际关系与社交管理计划
    [INSERT_INTERPERSONALRELATIONSHIP]({ commit }, data) {
      return api.post(config.url.insertInterpersonalRelationship, data).then(res => {
        return res
      })
    },
    // 修改人际关系与社交管理计划
    [UPDATE_INTERPERSONALRELATIONSHIP]({ commit }, data) {
      return api.put(config.url.updateInterpersonalRelationship, data).then(res => {
        return res
      })
    },
    // 删除人际关系与社交管理计划
    [DELETE_INTERPERSONALRELATIONSHIP]({ commit }, params) {
      return api.delete(config.url.deleteInterpersonalRelationship, params).then(res => {
        return res
      })
    },
    
    // 生活管理计划列表
    [LIFEMANAGEMENT_LIST]({ commit }, params) {
      return api.get(config.url.listLifeManagement, params).then(res => {
        return res
      })
    },
    // 添加生活管理计划
    [INSERT_LIFEMANAGEMENT]({ commit }, data) {
      return api.post(config.url.insertLifeManagement, data).then(res => {
        return res
      })
    },
    // 修改生活管理计划
    [UPDATE_LIFEMANAGEMENT]({ commit }, data) {
      return api.put(config.url.updateLifeManagement, data).then(res => {
        return res
      })
    },
    // 删除生活管理计划
    [DELETE_LIFEMANAGEMENT]({ commit }, params) {
      return api.delete(config.url.deleteLifeManagement, params).then(res => {
        return res
      })
    },
    
    // 专业论文列表
    [PROFTHESIS_LIST]({ commit }, params) {
      return api.get(config.url.listProfThesis, params).then(res => {
        return res
      })
    },
    // 添加专业论文
    [INSERT_PROFTHESIS]({ commit }, data) {
      return api.post(config.url.insertProfThesis, data).then(res => {
        return res
      })
    },
    // 修改专业论文
    [UPDATE_PROFTHESIS]({ commit }, data) {
      return api.put(config.url.updateProfThesis, data).then(res => {
        return res
      })
    },
    // 删除专业论文
    [DELETE_PROFTHESIS]({ commit }, params) {
      return api.delete(config.url.deleteProfThesis, params).then(res => {
        return res
      })
    },
    // 根据名称查看placehoder文字
    [FIND_PLACEHOLDER]({ commit }, params) {
      return api.get(config.url.planPlaceholder, params).then(res => {
        return res
      })
    },



  }
}
