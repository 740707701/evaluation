<template>
	<div class="pay-success">
		<headerNav :updateBuyed="buyed"></headerNav>
		<div class="success-box">
			<i class="iconfont icon-success"></i>
			<div class="title">
				<div>购买成功</div>
				<div>我们尽快为您处理</div>
			</div>
			<p class="order-no">订单编号： {{orderNo}}</p>
			<p class="money">在线支付： {{money}}元</p>
			<div class="link">
				<router-link to="/personalcenter/second">去测评</router-link>
				<router-link to="/">继续逛逛</router-link>
			</div>
			<div class="tips">
				重要提示：扶诚旗下测评平台及销售商不会以订单异常、系统升级为由，要求您点击任何链接进行退款。
			</div>
		</div>
	</div>
</template>
<script>
import headerNav from '../components/HeaderNav'
export default {
	name: 'paysuccess',
	data(){
		return {
			orderNo: '',
			money: '',
			buyed: false,
		}
	},
	created(){
		this.orderNo = this.$route.params.orderNo;
		this.money = this.$route.params.money;
		this.buyed = true; //代表已购买，向头部emit事件显示红点
	},
	methods: {},
	components: {
		headerNav
	}
}
</script>
<style lang="less" scoped>
	@import "../assets/css/colors.less";
	.pay-success {
		width: 100%;
		min-height: 100%;
		background-color: #eaeaea;
		position: relative;
		.success-box {
			width: 500px;
			height: 390px;
			background-color: #fff;
			border-radius: 4px;
			padding: 50px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -195px;
			margin-left: -250px;
			.icon-success {
				font-size: 50px;
				color: rgb(111,204,161);
			}
			.title {
				font-size: 30px;
				font-weight: 500;
				color: rgb(111,204,161);
				line-height: 50px;
			}
			.order-no, .money {
				line-height: 30px;
			}
			.link {
				a {
					color: @main-color-blue;
					margin-right: 20px;
					line-height: 30px;
				}
			}
			.tips {
				color: @main-color-gray;
				line-height: 26px;
			}
		}
	}
</style>


