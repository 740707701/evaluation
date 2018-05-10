import api from '../../api/index'
import config from '../../api/config'

const RESUME_SET = 'RESUME_SET'
const RESUME_INFO = 'RESUME_INFO'

//简历页面

export default {
  state: {
    resumeInfo: {},
    baseInfo: [],
    jobIntension: [],
    evaluation: [],
    workExper: [],
    education: [],
    schoolHonor: [],
    schoolWork: [],
    skills: []
  },
  mutations: {
    [RESUME_INFO](state, data){
      state[data['target']] = data.data
    }
  },
  actions: {
    //获取简历信息
    [RESUME_INFO]({commit}, params){
      return api.get(config.url.resumeInfo, params).then(res => {
        commit ('RESUME_INFO', {
          target: 'resumeInfo',
          data: res
        })
      })
    }
  },
  getters: {},
  modules: {}
}