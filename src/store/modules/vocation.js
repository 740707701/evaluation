import api from '../../api/index'
import config from '../../api/config'

const VOCATION_SET = 'VOCATION_SET'
const VOCATION_COURSE_LIST = 'VOCATION_COURSE_LIST'
const VOCATION_COURSE_DETAIL = 'VOCATION_COURSE_DETAIL'
const VOCATION_VIDEO_LIST = 'VOCATION_VIDEO_LIST'
const VOCATION_VIDEO_STATUS = 'VOCATION_VIDEO_STATUS'
const VOCATION_COMMENT_LIST = 'VOCATION_COMMENT_LIST'
const VOCATION_INSERT_VIEWS = 'VOCATION_INSERT_VIEWS'
const PUBLISH_COMMENT = 'PUBLISH_COMMENT'
const VOCATION_LIKE = 'VOCATION_LIKE'
const OPEN_NEXT_QUESTION = 'OPEN_NEXT_QUESTION'


 export default {
	state: {},
	mutations: {
		[VOCATION_SET]({ commit }, data) {
			state[data['target']] = data.data
		}
	},
	actions: {
		// 获取课程列表
		[VOCATION_COURSE_LIST]({ commit }, params) {
			return api.get(config.url.vocationCourseList, params).then(res => {
				return res
			})
		},
		// 获取课程详情
		[VOCATION_COURSE_DETAIL]({ commit }, params) {
			return api.get(config.url.vocationCourseDetail, params).then(res => {
				return res
			})
		},
		// 获取 课程视频可播放状态 是否开启
		[VOCATION_VIDEO_STATUS]({ commit }, params) {
			return api.get(config.url.vocationVideoStatus, params).then(res => {
				return res
			})
		},
		// 点击题目 添加浏览次数
		[VOCATION_INSERT_VIEWS]({ commit }, data) {
			return api.post(config.url.vocationInsertViews, data).then(res => {
				return res
			})
		},
		// 开启下一课程
		[OPEN_NEXT_QUESTION]({ commit }, data) {
			return api.post(config.url.openNextQuestion, data).then(res => {
				return res
			})
		},
		// 发表、回复评论
		[PUBLISH_COMMENT]({ commit }, data) {
			return api.post(config.url.publishComment, data).then(res => {
				return res
			})
		},
		// 评论列表
		[VOCATION_COMMENT_LIST]({ commit }, params) {
			return api.get(config.url.vocationCommentList, params).then(res => {
				return res
			})
		},
		// 点赞
		[VOCATION_LIKE]({ commit }, params) {
		return api.get(config.url.vocationLike, params).then(res => {
			return res
		})
	}
	}
 }