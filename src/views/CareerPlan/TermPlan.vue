<template>
	<div class="termplan-page">
		<headerNav></headerNav>
		<div class="termplan-container">
			<div class="top">
				<span>规划表</span>
				<div class="switch-box" v-if="planList.length<=4&&!confirmOpen">
					<span>开启</span>
					<el-switch @change="openTerm"
						v-model="open"
						active-color="#3477F6"
						inactive-color="#ddd">
					</el-switch>
				</div>
			</div>
			<div class="list-content">
				<el-row :gutter="20" class="term-item">
					<el-col :span="6" v-for="(term, index) in planTerm" :key="index">
						<div class="item">
							<img src="../../assets/images/term.png" alt="">
							<div class="title">{{term.title}}</div>
							<el-button @click="toPlan(term.stage)" size="small">进入制作</el-button>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" v-if="confirmOpen">
					<el-col :span="6" v-for="(term, index) in otherPlanTerm" :key="index">
						<div class="item">
							<img src="../../assets/images/term.png" alt="">
							<div class="title">{{term.title}}</div>
							<el-button @click="toPlan(term.stage)" size="small">进入制作</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="dialog" v-if="open&&!confirmOpen">
			<div class="open-content">
				<div class="close" @click="open=false">×</div>
				<i class="iconfont icon-news"></i>
				<div class="title">开启通知</div>
				<div class="tips">开启大三与大四规划与管理表</div>
				<el-button type="primary" round size="small" @click="confirmOpen=true">确认开启</el-button>
				<div class="fold-angle"></div>
			</div>
		</div>
	</div>
</template>

<script>
import headerNav from '../../components/HeaderNav'
	export default {
		name: 'termPlan',
		data(){
			return {
				open: false,
				confirmOpen: false,
				userInfo: JSON.parse(localStorage.getItem("userInfo")),
				planList: [],
				planId: '',
				planTerm: [
					{
						title: "大一上学期规划",
						stage: 1
					},
					{
						title: "大一下学期规划",
						stage: 2
					},
					{
						title: "大二上学期规划",
						stage: 3
					},
					{
						title: "大二下学期规划",
						stage: 4
					}
				],
				otherPlanTerm: [
					{
						title: "大三上学期规划",
						stage: 5
					},
					{
						title: "大三下学期规划",
						stage: 6
					},
					{
						title: "大四上学期规划",
						stage: 7
					},
					{
						title: "大四下学期规划",
						stage: 8
					}
				],
			}
		},
		created(){
			this.getPlanList()
		},
		methods: {
			getPlanList(){
				let params = {
					userId: this.userInfo.id
				}
				this.$store.dispatch('PLANLIST', params).then(res => {
					this.planList = res.data
				}).catch(err => {
					this.$message({
						type: "error",
						message: "获取规划列表失败，请稍后重试！"
					})
				})
			},
			openPlan(stage){
				let data = {
					stage: stage //1:大一上, 2:大一下, 3:大二上, 4:大二下
				}
				this.$store.dispatch('OPENPLAN',data).then(res => {
					this.planId = res.data.data;
					this.$router.push({
						name: 'careerplan',
						query: {
							planId: this.planId
						}
					})
				}).catch(err => {
					console.log(err)
					if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "新建规划失败，请稍后重试！"
            });
          }
				})
			},
			toPlan(stage){
				if(!this.planList.length){
					this.openPlan(stage)
				}else {
					this.planList.map((item, index) => {
						if(item.stage == stage){
							if(item.state == '10'){
								this.$message({
									type: "error",
									message: "当前规划已提交，等待审核！"
								})
								return
							}else {
								this.$router.push({
									name: 'careerplan',
									query: {
										planId: item.id
									}
								})
							}
						}else{
							console.log('开启',index)
							return
						}
					})
				}
			},
			openTerm(){
				// console.log(this.open)
			}
		},
		components: {
			headerNav
		}
	}
</script>

<style lang="less">
 	@import "../../assets/css/colors.less";
	.termplan-page {
		width: 100%;
		min-height: 100%;
		padding: 60px 0;
		background-color: @main-color-bg;
		.termplan-container {
			width: 1200px;
			height: auto;
			margin: 0 auto;
			overflow: hidden;
			.top {
				height: 40px;
				line-height: 40px;
				padding-left: 10px;
				background-color: #ffff;
				border-left: 3px solid @main-color-blue;
				margin: 20px 0;
				.switch-box {
					float: right;
					span {
						margin-right: 10px;
					}
				}
			}
			.list-content {
				.item {
					width: 100%;
					padding: 50px 0;
					text-align: center;
					background:rgba(255,255,255,1);
					border-radius:4px;
					box-shadow:4px 0px 8px rgba(56,126,246,0.15);
					img {
						width: 100px;
						height: auto;
					}
					.title {
						width: 100%;
						text-align: center;
						line-height: 30px;
					}
					button {
						margin-top: 30px;
					}
				}
				.term-item {
					margin-bottom: 20px;
				}
			}
		}
		.dialog {
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.3);
			position: fixed;
			top: 0;
			left: 0;
			.open-content {
				width: 240px;
				height: 320px;
				background-color: #fff;
				text-align: center;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -120px;
				margin-top: -160px;
				.icon-news {
					font-size: 100px;
					margin: 45px auto 20px auto;
					display: inline-block;
				}
				.fold-angle {
					width: 20px;
					height: 20px;
					box-shadow: -4px -4px 7px -2px rgba(0, 0, 0, 0.1);
					border-width: 20px;
					border-style: solid;
					border-color: white rgba(0,0,0,0.3) rgba(0,0,0,0.3) white;
					position: absolute;
					right: 0;
					bottom: 0;
				}
				.close {
					width: 40px;
					height: 40px;
					line-height: 40px;
					border-radius: 20px;
					text-align: center;
					position: absolute;
					top: -20px;
					left: 50%;
					margin-left: -20px;
					color: @main-color-blue;
					background-color: #fff;
					cursor: pointer;
					font-size: 36px;
					box-shadow:0px 2px 6px 0px rgba(56,126,246,0.3);
				}
				.title {
					color: @main-color-text;
					line-height: 40px;
				}
				.tips {
					font-size: 12px;
					color: @main-color-gray;
					margin-bottom: 20px;
				}
			}
		}
	}
</style>

