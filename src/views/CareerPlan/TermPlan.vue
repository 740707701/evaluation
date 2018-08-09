<template>
	<div class="termplan-page">
		<headerNav></headerNav>
		<div class="termplan-container">
			<div class="top">
				<span>规划表</span>
				<div class="switch-box">
					<span>开启</span>
					<el-switch
						v-model="open"
						active-color="#3477F6"
						inactive-color="#ddd">
					</el-switch>
				</div>
			</div>
			<div class="list-content">
				<el-row :gutter="20">
					<el-col :span="6">
						<div class="item">
							<img src="../../assets/images/term.png" alt="">
							<div class="title">大一上学期规划</div>
							<el-button @click="toPlan(1)" type="primary" size="small">进入制作</el-button>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="item">
							<img src="../../assets/images/term.png" alt="">
							<div class="title">大一下学期规划</div>
							<el-button @click="toPlan(2)" type="default" size="small">进入制作</el-button>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="item">
							<img src="../../assets/images/term.png" alt="">
							<div class="title">大二上学期规划</div>
							<el-button @click="toPlan(3)" type="default" size="small">进入制作</el-button>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="item">
							<img src="../../assets/images/term.png" alt="">
							<div class="title">大二下学期规划</div>
							<el-button @click="toPlan(4)" type="default" size="small">进入制作</el-button>
						</div>
					</el-col>
				</el-row>
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
				userInfo: JSON.parse(localStorage.getItem("userInfo")),
				planList: [],
				planId: '',
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
						message: "获取规划列表失败！"
					})
				})
			},
			openPlan(stage){
				let data = {
					stage: stage //1:大一上, 2:大一下, 3:大二上, 4:大二下
				}
				this.$store.dispatch('OPENPLAN',data).then(res => {
					this.planId = res.data.data;
					console.log(this.planId)
					this.$router.push({
						name: 'careerplan',
						query: {
							planId: this.planId
						}
					})
				}).catch(err => {
					console.log(err)
				})
			},
			toPlan(stage){
				if(!this.planList.length){
					this.openPlan(stage)
				}else {
					this.$router.push({
						name: 'careerplan',
						query: {
							planId: this.planList[stage-1].id
						}
					})
				}
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
		height: 100%;
		padding-top: 60px;
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
			}
		}
	}
</style>

