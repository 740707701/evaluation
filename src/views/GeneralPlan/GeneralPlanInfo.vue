<template>
	<div class="generalplan-info">
		<div class="container">
			<div class="content">
				<div class="banner">
					<img src="../../assets/images/plan_bg.jpg" alt="">
					<div class="banner-text">
						<div class="term-title">我的大学总规划</div>
						<div class="term-split"></div>
						<div class="sub-title">My university master plan</div>
					</div>
				</div>
				<div class="back">
					<router-link to="/generalPlanEntry">
						<span>
							<i class="el-icon-arrow-left"></i>返回
						</span>
					</router-link>
				</div>
				<div class="generalplan">
						<div class="item" v-for="(item,index) in generalPlanInfo"  :key="index">
							<div class="round"></div>
							<div class="en">{{item.en}}</div>
							<div class="split"></div>
							<div class="cn">{{item.title.slice(item.title.indexOf('、')+1)}}</div>
							<div class="value" v-if="item.value" >
								<span v-for="(val,idx) in item.value" :key="idx">{{val}}</span>
							</div>
							<div class="value-box" v-if="item.subtitleList">
								<div class="value-item" v-for="(sub,i) in item.subtitleList" :key="i">
									<span class="name">{{sub.title}}{{sub.title.indexOf('：') === -1 ?'：': '' }}</span>
									<span class="value" v-if="sub.value instanceof Array" v-for="(subVal,subIdx) in sub.value" :key="subIdx">{{subVal}}</span>
									<div class="sub-item" v-if="typeof sub.value === 'string'">
										<div class="sub-value">{{sub.value}}</div>
									</div>
								</div>
							</div>
							<div v-if="item.inputChoiceList">
								<div class="value-box" v-for="(choice,index) in item.inputChoiceList" :key="index" v-if="choice.subchoiceInput.length">
									<div class="value-item">
										<span class="other-value" v-for="(subChoice,idx) in choice.subchoiceInput" :key="idx">{{subChoice.value}}</span>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'generalPlanInfo',
	data() {
		return {
			generalPlanInfo: []
		}
	},
	created() {
		// console.log(this.$route)
		this.getGeneralPlanInfo()
	},
	methods: {
		getGeneralPlanInfo() {
			this.$store.dispatch('GENERALPLAN_INFO').then(res => {
				this.generalPlanInfo = JSON.parse(res.data.content)
				console.log(this.generalPlanInfo)
			}).catch(err => {
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('获取总规划信息失败，请稍后重试！')
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.generalplan-info {
	width: 100%;
	min-height: calc(100vh - 60px);
	background-color: @main-color-bg;
	.container {
		width: 1200px;
		margin: 0 auto;
		.content {
			width: 100%;
			background-color: #fff;
			.banner {
				width: 100%;
				height: 350px;
				position: relative;
				img {
					width: 100%;
					height: 350px;
				}
				.banner-text {
					position: absolute;
					top: 110px;
					left: 230px;
					.term-title {
						font-size: 40px;
						margin-bottom: 20px;
					}
					.term-split {
						width: 60px;
						height: 4px;
						display: inline-block;
						border-bottom:4px solid @main-color-blue;
						margin-bottom: 20px;
					}
					.sub-title {
						font-size: 20px;
						color: #535A6C;
						line-height: 30px;
					}
				}
			}
			.back {
				height: 50px;
				line-height: 40px;
				padding-left: 20px;
				border-top: 10px solid @main-color-bg;
				border-bottom: 1px solid @main-color-border;
				span {
					padding: 0 10px;
					line-height: 40px;
					display: inline-block;
					cursor: pointer;
				}
				i {
					margin-right: 10px;
				}
			}
			.generalplan {
				padding: 0 20px;
				.item {
					padding: 10px 30px;
					border-bottom: 1px solid @main-color-border;
					.round {
						width: 16px;
						height: 16px;
						border-radius: 50%;
						background-color: #FF9915;
						display: inline-block;
						margin-right: 10px;
						margin-left: -30px;
						margin-bottom: -2px;
					}
					.en {
						font-size: 18px;
						font-weight: 600;
						line-height: 30px;
						display: inline-block;
					}
					.split {
						width: 42px;
						height: 2px;
						background-color: @main-color-blue;
						margin: 3px 0;
					}
					.cn {
						font-size: 16px;
						line-height: 30px;
						margin-bottom: 5px;
					}
					.value {
						line-height: 30px;
						span {
							margin-right: 12px;
							color: #A2A9B8;
						}
					}
					.value-box {
						.value-item {
							width: 100%;
							display: inline-block;
							.name {
								float: left;
								color:#333;
								width: 150px;
								line-height: 26px;
							}
							.value {
								color: #A2A9B8;
								margin-right: 20px;
							}
							.other-value {
								line-height: 22px;
								color: #A2A9B8;
							}
							.sub-item {
								padding-left: 150px;
								line-height: 26px;
								color: #A2A9B8;
								.sub-value {
									line-height: 22px;
									margin-bottom: 10px;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>


