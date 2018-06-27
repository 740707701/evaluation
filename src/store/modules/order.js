import api from "../../api/index";
import config from "../../api/config";

const ORDER_SET = "ORDER_SET"

const CREATEORDER = 'CREATEORDER'
const ORDERLIST = "ORDERLIST"
const ORDERINFO = "ORDERINFO"
const ADDCART = 'ADDCART'
const DELETECART = 'DELETECART'
const CARTLIST = 'CARTLIST'
const BUY = 'BUY'

export default {
  state: {
    orderList: [],
		orderInfo: {},
		cartList: [],
		cartInfo: {},
		buyInfo: {}
  },
  mutations: {
    [ORDER_SET](state, data) {
      state[data["target"]] = data.data;
    }
  },
  actions: {
		//创建订单
		[CREATEORDER]({ commit }, params){
			return api.get(config.url.createOrder, params).then(res => {
				commit('ORDER_SET', {
					target: 'orderInfo',
					data: res.data
				})
				return res
			})
		},
		//订单列表
		[ORDERLIST]({ commit }, params){
			return api.get(config.url.orderList, params).then(res => {
				commit('ORDER_SET', {
					target: 'orderList',
					data: res.data
				})
				return res
			})
		},
		//加入购物车
		[ADDCART]({ commit }, data){
			return api.post(config.url.addCart, data).then(res => {
				commit('ORDER_SET', {
					target: 'cartInfo',
					data: res.data
				})
				return res
			})
		},
		//购物车删除
		[DELETECART]({commit}, params){
			return api.delete(api.url.deleteCart, params).then(res => {
				commit('ORDER_SET', {
					target: 'cartInfo',
					data: res.data
				})
				return res
			})
		},
		//购物车列表
		[CARTLIST]({ commit }, params){
			return api.get(api.url.cartList, params).then(res => {
				commit('ORDER_SET', {
					target: 'cartList',
					data: res.data
				})
				return res
			})
		},
		//购买
		[BUY]({ commit }, data) {
      return api.post(config.url.buy, data).then(res => {
        commit('ORDER_SET', {
          target: 'buyInfo',
          data: res.data
        })
        return res
      })
    },
	}
};
