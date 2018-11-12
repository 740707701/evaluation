/**
 * 第三方登录修改的信息文件
 * 替换原来的相关接口
 * 更改的字段有:
 * mobile -- phoneNum
 * password -- userPassword
 * avatar -- personHead
 * 
 */
import axios from '../../api/interceptors'

const Apiurl = 'http://101.132.166.37:8080/saasplat'
// const Apiurl = 'http://192.168.0.177:9088/saasplat' // 本地

const SSO_SET = 'SSO_SET'

const SSO = 'SSO'
const GETUSERINFO = 'GETUSERINFO'
const SSO_USERINFO = 'SSO_USERINFO'
const COMPLETE_USERINFO = 'COMPLETE_USERINFO'
const UPDATE_HEADE = 'UPDATE_HEADE'
const VERIFICATION_CODE = 'VERIFICATION_CODE'
const VERIFY_CODE = 'VERIFY_CODE'
const UPDATE_PHONE_EMAIL = 'UPDATE_PHONE_EMAIL'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

export default {
	state: {
		ssoUserInfo: {}
	},
	mutations: {
		[SSO_SET](state, data) {
			state[data['target']] = data.data
		}
	},
	actions: {
		// sso 第三方登录
		[SSO]({ commit }, data){
			return new Promise((resolve, reject) => {
				axios.post(Apiurl + '/login', data).then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 根据token获取用户信息
		[GETUSERINFO]({commit}, params) {
			return new Promise((resolve, reject) => {
				axios.get(Apiurl + '/token?token=' + params).then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// sso 获取个人信息
		[SSO_USERINFO]({commit}, params) {
			return new Promise((resolve, reject) => {
				axios.get(Apiurl + '/user/info').then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// sso 完善个人资料
		[COMPLETE_USERINFO]({commit}, data) {
			return new Promise((resolve, reject) => {
				axios.put(Apiurl + '/user/complete', data).then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// sso 替换个人头像
		[UPDATE_HEADE]({commit}, data) {
			return new Promise((resolve, reject) => {
				axios.put(Apiurl + '/user/updateHead', data).then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// sso 获取手机验证码
		[VERIFICATION_CODE]({commit}, data) {
			return new Promise((resolve, reject) => {
				axios.post(Apiurl + '/send', data).then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// sso 验证验证码
		[VERIFY_CODE]({commit}, data) {
			return new Promise((resolve, reject) => {
				axios.post(Apiurl + '/verify', data).then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// sso 修改手机号 或 邮箱
		[UPDATE_PHONE_EMAIL]({commit}, data) {
			return new Promise((resolve, reject) => {
				axios.put(Apiurl + '/user/phoneemail', data).then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		// sso 修改密码
		[UPDATE_PASSWORD]({commit}, data){
			return new Promise((resolve, reject) => {
				axios.post(Apiurl + '/user/updatepwd', data).then(res => {
					if(res.data.code === 1) {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}