<template>
	<div class="webcatpay-page">
		<div class="webcat-box">
			<div class="content">
				<div class="top">
					<div class="order-info">
						<i class="iconfont icon-wechatpay"></i>
						<span class="order-no">订单号：{{payInfo.orderNo}}</span>
						<span class="order-price">需要支付¥&nbsp;&nbsp;<span  class="price">{{payInfo.orderPrice}}</span>元</span>
					</div>
				</div>
				<div id="qrcode"></div>
				<p class="tips">您选择的是微信支付，二维码有效期2小时，请尽快完成支付！</p>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import QRCode from 'qrcodejs2';
export default {
	name: 'wechatPay',
	data(){
		return {
			payInfo: {},
			timer: null
		}
	},
	created(){
		this.payInfo = JSON.parse(localStorage.getItem("payInfo"))
	},
	beforeMount(){
		this.timer = setInterval(this.wxquery, 5000)
	},
	mounted(){
		//dom渲染之后 再生成二维码
		this.createCode();
	},
	beforeDestroy() {
		clearInterval(this.timer)
	},
	methods: {
		createCode(){
			let qrCode = new QRCode(document.getElementById("qrcode"),{
				text: this.payInfo.payUrl,
				width: 200,
				height: 200
			})
		},
		wxquery(){
			let data = {
				orderNo: this.payInfo.orderNo
			}
			let self = this
			this.$store.dispatch('WXQUERY', data).then(res => {
				// console.log(res)
				//SUCCESS—支付成功 REFUND—转入退款 NOTPAY—未支付 CLOSED—已关闭 REVOKED—已撤销（刷卡支付） 
				//USERPAYING--用户支付中 PAYERROR--支付失败(其他原因，如银行返回失败)
				if(res.data == 'SUCCESS'){
					window.clearInterval(this.timer)
					if(this.payInfo.templateId){
						this.$router.push({
							path: '/template' +this.payInfo.templateId + '/' + this.payInfo.resumeId + '-' + this.payInfo.templateId
						})
					}else {
						this.$router.push({
							name: 'paysuccess',
							params: {
								orderNo: this.payInfo.orderNo,
								money: this.payInfo.orderPrice
							}
						})
					}
				}

			}).catch(err => {
				console.log(err)
				if(err.data.msg){
					this.$message({
						type: "error",
						message: err.data.msg
					})
				}
			})
		}
	},
	components: {}
}
</script>
<style lang="less" scoped>
@import url("../assets/css/colors.less");
.webcatpay-page {
	min-height: 100%;
	background-color: @main-color-bg;
	.webcat-box {
		width: 1200px;
		margin: 0 auto;
		padding: 50px;
		.content {
			padding: 50px 0;
			background-color: #fff;
			.top {
				padding: 0 50px;
				i {
					float: left;
					font-size: 50px;
					color:#41b035;
				}
				.order-info {
					width:100%;
					display: inline-block;
					span {
						display: inline-block;
						line-height: 50px;
						font-size: 16px;
					}
					.order-no {
						padding-left: 20px;
					}
					.order-price {
						float: right;
						.price {
							color: red;
							font-size: 20px;
							
						}
					}
				}
			}
			.tips {
				text-align: center;
				line-height: 30px;
			}
			#qrcode {
				width: 200px;
				height: 200px;
				margin: 30px auto;
			}
		}
	}
 }
</style>


