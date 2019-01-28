/**
 * 行业与职业认知 
 * 课程目录相关接口连接题库服务器
 */
import axios from 'axios'
import config from '@/api/config'
const Baseurl = process.env.NODE_ENV === 'development' ? 'http://101.132.100.21:8083' : 
								process.env.NODE_ENV === 'production' && process.env.ENV_CONFIG === 'prodtest' ? 'http://101.132.100.21:8083' : 'http://tiku.xuedian98.com:8080'
const Apiurl = Baseurl + '/Portal/'

const QUESTION_SET = 'QUESTION_SET'

const VERIFY_ANSWER = 'VERIFY_ANSWER'
const VOCATION_VIDEO_LIST = 'VOCATION_VIDEO_LIST'

export default {
	state: {},
	mutations: {
		[QUESTION_SET](state, data) {
			state[data['target']] = data.data
		}
	},
	actions: {
		// 行业与职业认知 验证练习题答案是否完全正确
		[VERIFY_ANSWER]({ commit }, data) {
			return new Promise((resolve, reject) => {
				axios.post(Apiurl + config.url.vocationVerifyAnswer, data).then(res => {
				}).catch(err => {
					if(err.data.result === 'success') {
						resolve(err)
					} else {
						reject(err)
					}
				})
			})
		},
		// 行业与职业认知 课程详情 课程目录
		[VOCATION_VIDEO_LIST]({ commit }, params) {
			return new Promise((resolve, reject) => {
				axios.get(Apiurl + config.url.vocationVideoList.replace('{pointId}', params)).then(res => {
				}).catch(err => {
					if(err.data.result === 'success') {
						resolve(err)
					} else {
						reject(err)
					}
				})

			})
		},
	}
}