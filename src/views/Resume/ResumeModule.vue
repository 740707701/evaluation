<template>
	<div class="resume-module">
		<div v-if="permission!='forbidden'">
			<img class="img-banner" src="../../assets/images/resume-module-banner.png" alt="">
			<div class="content">
				<div class="container">
					<div class="item-box">
						<router-link to="/resumeBg">
							<div class="item">
								<img src="../../assets/images/resume-module-resume.png" alt="">
								<div class="title">简历</div>
								<div class="sub-title left" v-if="freshStudentResumeCount">您已有{{freshStudentResumeCount}}份在校生/应届毕业生的简历，
									<router-link to="/myResume">点我试试</router-link>
								</div>
								<div class="sub-title left" v-if="workResumeCount">您已有{{workResumeCount}}份职场人士的简历，
									<router-link to="/myResume">点我试试</router-link>
								</div>
							</div>
						</router-link>
					</div>
					<div class="item-box">
						<div class="item">
							<img src="../../assets/images/resume-module-interview.png" alt="">
							<div class="title">面试</div>
							<div class="sub-title">暂未开放</div>
						</div>
					</div>
					<div class="item-box">
						<div class="item">
							<img src="../../assets/images/resume-module-u.png" alt="">
							<div class="title">U我计划（增值服务）</div>
							<div class="sub-title">暂未开放</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<forbidden v-if="permission=='forbidden'"></forbidden>
	</div>
</template>
<script>
import forbidden from '@/components/Forbidden.vue'
export default {
	name: 'resumeModule',
	data() {
		return {
			permission: '',
			freshStudentResumeCount: 0,
			workResumeCount: 0,
		}
	},
	created() {
		this.permission = this.$route.query.permission
		this.getResumeList()
	},
	methods: {
		getResumeList: function(){
			this.$store.dispatch('RESUME_LIST').then(res => {
				let resumeList = res.data
				let freshStudentResumeList = []
				let workResumeList = []
				resumeList.map(item => {
					if(item.resumeType === 1) {
						freshStudentResumeList.push(item)
					} else if(item.resumeType === 2) {
						workResumeList.push(item)
					}
				})
				this.freshStudentResumeCount = freshStudentResumeList.length
				this.workResumeCount = workResumeList.length
			}).catch(err => {
				if (err.data) {
					this.$message({ type: "error", message: err.data.msg});
				} else {
					this.$message({ type: "error", message: "获取简历列表失败" });
				}
			})
		},
	},
	components: {
		forbidden
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.resume-module {
	width: 100%;
	min-height: 100%;
	.img-banner {
		width: 100%;
		height: auto;
	}
	.content {
		width: 1200px;
		margin: 0 auto;
		position: relative;
		.container {
			width: 100%;
			position: absolute;
			left: 50%;
			margin-left: -50%;
			margin-top: -50px;
			margin-bottom: 25px;
			display: flex;
			display: -webkit-flex;
			.left {
				text-align: left;
			}
			.item-box {
				flex: 3;
				padding: 0px 20px;
				a:hover{
					color: #333;
				}
				.item {
					min-height: 325px;
					padding: 30px 30px;
					box-shadow:0px 7px 29px 0px rgba(206,206,206,0.56);
					border-radius:18px;
					background-color: #fff;
					text-align: center;
					img {
						width: 180px;
						height: auto;
					}
					.title {
						font-size: 18px;
						text-align: center;
						margin: 25px 0 20px 0;
					}
					.sub-title {
						line-height: 22px;
						a {
							color: @main-color-blue;
						}
					}
				}
				.item:hover {
					border: 1px solid @main-color-blue;
					.title {
						color: @main-color-blue;
					}
				}
			}
		}
	}
}
</style>


