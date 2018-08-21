import api from "../../api/index";
import config from "../../api/config";

const PLAN_SET = "PLAN_SET";

const PLANINFO = "PLANINFO";
const PLANLIST = "PLANLIST";
const OPENPLAN = "OPENPLAN";
const SUBMITPLAN = "SUBMITPLAN";
const QUERYPLAN = 'QUERYPLAN';
const RECORD_OPENSTATE = 'RECORD_OPENSTATE'

const CERTIFICATE_DATA = "CERTIFICATE_DATA";
const CATEGORY_DATA = "CATEGORY_DATA";
const BOOK_DATA = "BOOK_DATA";
const OFFICE_DATA = "OFFICE_DATA";
const VOCATION_DATA = "VOCATION_DATA";

const ADDITIONAL_LIST = "ADDITIONAL_LIST";
const INSERT_ADDITIONAL = "INSERT_ADDITIONAL";
const DELETE_ADDITIONAL = "DELETE_ADDITIONAL";
const UPDATE_ADDITIONAL = "UPDATE_ADDITIONAL";

const CERTIFICATE_LIST = "CERTIFICATE_LIST";
const INSERT_CERTIFICATE = "INSERT_CERTIFICATE";
const DELETE_CERTIFICATE = "DELETE_CERTIFICATE";
const UPDATE_CERTIFICATE = "UPDATE_CERTIFICATE";

const INTERNSHIP_LIST = "INTERNSHIP_LIST";
const INSERT_INTERNSHIP = "INSERT_INTERNSHIP";
const DELETE_INTERNSHIP = "DELETE_INTERNSHIP";
const UPDATE_INTERNSHIP = "UPDATE_INTERNSHIP";

const OFFICE_LIST = "OFFICE_LIST";
const INSERT_OFFICE = "INSERT_OFFICE";
const DELETE_OFFICE = "DELETE_OFFICE";
const UPDATE_OFFICE = "UPDATE_OFFICE";

const OPTIONAL_LIST = "OPTIONAL_LIST";
const INSERT_OPTIONAL = "INSERT_OPTIONAL";
const DELETE_OPTIONAL = "DELETE_OPTIONAL";
const UPDATE_OPTIONAL = "UPDATE_OPTIONAL";

const PROF_LIST = "PROF_LIST";
const INSERT_PROF = "INSERT_PROF";
const DELETE_PROF = "DELETE_PROF";
const UPDATE_PROF = "UPDATE_PROF";

const PREAD_LIST = "PREAD_LIST";
const INSERT_PREAD = "INSERT_PREAD";
const UPDATE_PREAD = "UPDATE_PREAD";
const DELETE_PREAD = "DELETE_PREAD";

const REQUIRED_LIST = "REQUIRED_LIST";
const INSERT_REQUIRED = "INSERT_REQUIRED";
const DELETE_REQUIRED = "DELETE_REQUIRED";
const UPDATE_REQUIRED = "UPDATE_REQUIRED";

const SELF_LIST = "SELF_LIST";
const INSERT_SELF = "INSERT_SELF";
const DELETE_SELF = "DELETE_SELF";
const UPDATE_SELF = "UPDATE_SELF";

const VOCATION_LIST = "VOCATIONSL_LIST";
const INSERT_VOCATION = "INSERT_VOCATION";
const DELETE_VOCATION = "DELETE_VOCATION";
const UPDATE_VOCATION = "UPDATE_VOCATION";

const OTHERPLAN_LIST = "OTHERPLAN_LIST";
const INSERT_OTHERPLAN = "INSERT_OTHERPLAN";
const DELETE_OTHERPLAN = "DELETE_OTHERPLAN";
const UPDATE_OTHERPLAN = "UPDATE_OTHERPLAN";

export default {
  state: {
    planInfo: {}, //规划内容
    planList: [], //规划列表
    certificateData: [],
    categoryData: [],
    bookData: [],
    officeData: [],
    vocationData: [],
    requiredList: [], //必修课
    requiredInfo: {},
    optionalList: [], //选修课
    optionalInfo: {},
    selfList: [], //自学课
    selfInfo: {},
    profList: [], //专业大赛
    profInfo: {},
    preadList: [], //专业阅读
    preadInfo: {},
    officeList: [], //办公技能
    officeInfo: {},
    vocationList: [], //职业能力
    vocationInfo: {},
    internshipList: [], //实习实践
    internshipInfo: {},
    certificateList: [], //证书
    certificateInfo: {},
    otherPlanList: [], //其他计划
    otherPlanInfo: {},
    additionalList: [], //附加计划
    additionalInfo: {}
  },
  mutations: {
    [PLAN_SET](state, data) {
      state[data["target"]] = data.data;
    }
  },
  actions: {
    //获取规划内容
    [PLANINFO]({ commit }, params) {
      return api.get(config.url.planInfo, params).then(res => {
        commit("PLAN_SET", {
          target: "planInfo",
          data: res.data
        });
        return res;
      });
    },
    //根据用户获取规划列表
    [PLANLIST]({ commit }, params) {
      return api.get(config.url.planList, params).then(res => {
        commit("PLAN_SET", {
          target: "planList",
          data: res.data
        });
        return res;
      });
    },
    //开启计划
    [OPENPLAN]({ commit }, data) {
      return api.post(config.url.openPlan, data).then(res => {
        commit("PLAN_SET", {
          target: "planInfo",
          data: res.data
        });
        return res;
      });
    },
    //记录开启按钮
    [RECORD_OPENSTATE]({commit}, data){
      return api.post(config.url.recordOpenState, data).then(res => {
        commit("PLAN_SET", {
          target: "planInfo",
          data: res.data
        });
        return res;
      });
    },
    //查询是否开启计划
    [QUERYPLAN]({ commit }, params){
      return api.get(config.url.queryOpen, params).then(res => {
        commit("PLAN_SET", {
          target: "planInfo",
          data: res.data
        });
        return res;
      });
    },
    //提交计划
    [SUBMITPLAN]({ commit }, data) {
      return api.put(config.url.submitPlan, data).then(res => {
        commit("PLAN_SET", {
          target: "planInfo",
          data: res.data
        });
        return res;
      });
    },

    //所有证书列表
    [CERTIFICATE_DATA]({ commit }, params) {
      return api
        .get(config.url.certificateData, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "certificateData",
            data: res.data
          });
          return res;
        })
    },
    //所有书籍分类
    [CATEGORY_DATA]({ commit }, params) {
      return api
        .get(config.url.categoryData, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "categoryData",
            data: res.data
          });
          return res;
        })
    },
    //所有的书列表
    [BOOK_DATA]({ commit }, params) {
      return api
        .get(config.url.bookData, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "bookData",
            data: res.data
          });
          return res;
        })
    },
    //所有办公技能列表
    [OFFICE_DATA]({ commit }, params) {
      return api
        .get(config.url.officeData, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "officeData",
            data: res.data
          });
          return res;
        })
    },
    //所有职业能力列表
    [VOCATION_DATA]({ commit }, params) {
      return api
        .get(config.url.vocationData, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "vocationData",
            data: res.data
          });
          return res;
        })
    },

    //必修课列表
    [REQUIRED_LIST]({ commit }, params) {
      return api
        .get(config.url.listReruired, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "requiredList",
            data: res.data
          });
          return res;
        })
    },
    //新增必修课
    [INSERT_REQUIRED]({ commit }, data) {
      return api
        .post(config.url.insertRequired, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "requiredInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_REQUIRED]({ commit }, data) {
      return api
        .put(config.url.updateRequired, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "requiredInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_REQUIRED]({ commit }, params) {
      return api
        .delete(config.url.deleteRequired, params)
        .then(res => {
          console.log(res);
          commit("PLAN_SET", {
            target: "requiredInfo",
            data: res.data
          });
          return res;
        })
    },

    //选修课列表
    [OPTIONAL_LIST]({ commit }, params) {
      return api
        .get(config.url.listOptional, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "optionalList",
            data: res.data
          });
          return res;
        })
    },
    //新增 选修课
    [INSERT_OPTIONAL]({ commit }, data) {
      return api
        .post(config.url.insertOptional, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "optionalInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_OPTIONAL]({ commit }, data) {
      return api
        .put(config.url.updateOptional, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "optionalInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_OPTIONAL]({ commit }, data) {
      return api
        .delete(config.url.deleteOptional, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "optionalInfo",
            data: res.data
          });
          return res;
        })
    },

    //自学课列表
    [SELF_LIST]({ commit }, params) {
      return api
        .get(config.url.listSelf, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "selfList",
            data: res.data
          });
          return res;
        })
    },
    //新增 自学课
    [INSERT_SELF]({ commit }, data) {
      return api
        .post(config.url.insertSelf, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "selfInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_SELF]({ commit }, data) {
      return api
        .put(config.url.updateSelf, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "selfInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_SELF]({ commit }, data) {
      return api
        .delete(config.url.deleteSelf, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "selfInfo",
            data: res.data
          });
          return res;
        })
    },

    //专业大赛
    [PROF_LIST]({ commit }, params) {
      return api
        .get(config.url.listProf, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "profList",
            data: res.data
          });
          return res;
        })
    },
    //新增 专业大赛
    [INSERT_PROF]({ commit }, data) {
      return api
        .post(config.url.insertProf, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "profInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_PROF]({ commit }, data) {
      return api
        .put(config.url.updateProf, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "profInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_PROF]({ commit }, data) {
      return api
        .delete(config.url.deleteProf, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "profInfo",
            data: res.data
          });
          return res;
        })
    },

    //专业阅读
    [PREAD_LIST]({ commit }, params) {
      return api
        .get(config.url.listPread, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "preadList",
            data: res.data
          });
          return res;
        })
    },
    //新增 专业阅读
    [INSERT_PREAD]({ commit }, data) {
      return api
        .post(config.url.insertPread, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "preadInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_PREAD]({ commit }, data) {
      return api
        .put(config.url.updatePread, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "preadInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_PREAD]({ commit }, data) {
      return api
        .delete(config.url.deletePread, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "preadInfo",
            data: res.data
          });
          return res;
        })
    },

    //办公技能列表
    [OFFICE_LIST]({ commit }, params) {
      return api
        .get(config.url.listOffice, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "officeList",
            data: res.data
          });
          return res;
        })
    },
    //新增 办公技能
    [INSERT_OFFICE]({ commit }, data) {
      return api
        .post(config.url.insertOffice, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "officeInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_OFFICE]({ commit }, data) {
      return api
        .put(config.url.updateOffice, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "officeInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_OFFICE]({ commit }, data) {
      return api
        .delete(config.url.deleteOffice, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "officeInfo",
            data: res.data
          });
          return res;
        })
    },

    //职业能力列表
    [VOCATION_LIST]({ commit }, params) {
      return api
        .get(config.url.listVocation, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "vocationList",
            data: res.data
          });
          return res;
        })
    },
    //新增 职业能力
    [INSERT_VOCATION]({ commit }, data) {
      return api
        .post(config.url.insertVocation, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "vocationInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_VOCATION]({ commit }, data) {
      return api
        .put(config.url.updateVocation, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "vocationInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_VOCATION]({ commit }, data) {
      return api
        .delete(config.url.deleteVocation, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "vocationInfo",
            data: res.data
          });
          return res;
        })
    },

    //实习实践列表
    [INTERNSHIP_LIST]({ commit }, params) {
      return api
        .get(config.url.listInternship, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "internshipList",
            data: res.data
          });
          return res;
        })
    },
    //新增 实习实践
    [INSERT_INTERNSHIP]({ commit }, data) {
      return api
        .post(config.url.insertInternship, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "internshipInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_INTERNSHIP]({ commit }, data) {
      return api
        .put(config.url.updateInternship, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "internshipInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_INTERNSHIP]({ commit }, data) {
      return api
        .delete(config.url.deleteInternship, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "internshipInfo",
            data: res.data
          });
          return res;
        })
    },

    //证书列表
    [CERTIFICATE_LIST]({ commit }, params) {
      return api
        .get(config.url.listCertificate, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "certificateList",
            data: res.data
          });
          return res;
        })
    },
    //新增 证书
    [INSERT_CERTIFICATE]({ commit }, data) {
      return api
        .post(config.url.insertCertificate, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "certificateInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_CERTIFICATE]({ commit }, data) {
      return api
        .put(config.url.updateCertificate, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "certificateInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_CERTIFICATE]({ commit }, data) {
      return api
        .delete(config.url.deleteCertificate, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "certificateInfo",
            data: res.data
          });
          return res;
        })
    },

    //其他计划 列表
    [OTHERPLAN_LIST]({ commit }, params) {
      return api
        .get(config.url.otherPlans, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "otherPlanList",
            data: res.data
          });
          return res;
        })
    },
    //新增 其他列表
    [INSERT_OTHERPLAN]({ commit }, data) {
      return api
        .post(config.url, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "otherPlanInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_OTHERPLAN]({ commit }, data) {
      return api
        .put(config.url, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "otherPlanInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_OTHERPLAN]({ commit }, data) {
      return api
        .delete()
        .then(res => {
          commit("PLAN_SET", {
            target: "otherPlanInfo",
            data: res.data
          });
        })
    },

    //获取附加列表
    [ADDITIONAL_LIST]({ commit }, params) {
      return api
        .get(config.url.listAdditions, params)
        .then(res => {
          commit("PLAN_SET", {
            target: "additionalList",
            data: res.data
          });
          return res;
        })
    },
    //新增 附加计划
    [INSERT_ADDITIONAL]({ commit }, data) {
      return api
        .post(config.url.insertAdditional, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "additionalInfo",
            data: res.data
          });
          return res;
        })
    },
    //修改
    [UPDATE_ADDITIONAL]({ commit }, data) {
      return api
        .put(config.url.updateAdditional, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "additionalInfo",
            data: res.data
          });
          return res;
        })
    },
    //删除
    [DELETE_ADDITIONAL]({ commit }, data) {
      return api
        .delete(config.url.deleteAdditional, data)
        .then(res => {
          commit("PLAN_SET", {
            target: "additionalInfo",
            data: res.data
          });
          return res;
        })
    }
  },
  modules: {}
};
