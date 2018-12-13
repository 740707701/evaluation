<template>
	<div class="generalplan-preface">
		<div v-if="permission!='forbidden'">
			<img class="img-banner" src="../../assets/images/preface-banner.png" alt="">
			<div class="content">
				<div class="container">
					<div class="title">大学规划与管理</div>
					<div class="title preface">序</div>
					<p class="item">大学四年是人生最美好的年华，从最初的热忱满满，憧憬多多，到后来许多同学的浑浑噩噩，一切都在不知不觉中发生了变化。大四毕业的时候，太多同学都开始后悔虚度了四年，看到曾经在同一起跑线的同学获得研究生入学通知、收获各种证书、各种社会实践荣誉、获得名企高薪就业OFFER，才迷迷糊糊地发现，自己与别人的距离已经拉开了一大截。</p>
					<p class="item">过去十多年的读书冲刺，让每个人走到今天的大学校园，如何更好的规划四年大学生活，让自己毕业的时候，给家人，更是给自己未来一个问心无愧的答卷；如何通过大学四年的继续拼搏，为自己打开人生视野，为自己的独立、就业创造更好的起点，一切，从规划开始，从最基础的时间管理开始，从点点滴滴的自律、践行开始！</p>
					<p>假如一个人，自己都不爱自己，就不值得任何人去爱了；</p>
					<p>假如一个人，只想放任、纵容自己，只想让自己舒服，就等于说这个人自己都放弃自己的前程了，因为天上从来不会掉馅饼；</p>
					<p>假如一个人，觉得学习太苦了，不愿意再奋斗了，那是因为他没有走进社会，不知道跟讨生活的艰辛相比，学习生涯简直犹如天堂；从拒绝继续学习开始，意味着自己认为自己就这么回事了，不可能变得更好、更优秀了；那就意味着，距离“混”不远了......</p>
					<p>成为最好的自己，永远在路上——从大学规划开始！去遇见更美好的自己！</p>
					<div class="btn-box">
						<router-link to="/videoList">
							<div class="btn study-btn">学习课程</div>
						</router-link>
						<div class="btn open-btn" @click="openGeneralPlan">制定总规划</div>
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
	name: 'preface',
	data() {
		return {
			permission: '',
			isOpenVideo: false
		}
	},
	created() {
		this.permission = this.$route.query.permission
		// this.findVideoOpen()
	},
	methods: {
		findVideoOpen() {
			this.$store.dispatch('FIND_VIDEO_OPEN').then(res => {
				if(res.data.state === '1') {
					this.isOpenVideo = true
				}
			}).catch(err =>{
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('查询是否播放过该视频失败，请稍后重试！')
				}
			})
		},
		openGeneralPlan() {
			this.$router.push({ path: '/generalPlanDetail'})
			/**
			if(this.isOpenVideo) {
				this.$router.push({ path: '/generalPlanDetail'})
			} else {
				this.$message.error(`请先点击左侧学习课程，查看总规划学习视频之后再来制定总规划吧！`)
			}
			*/
		}
	},
	components: {
		forbidden
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.generalplan-preface {
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
			padding: 30px;
			background-color: #fff;
			border-radius: 18px;
			box-shadow:0px 4px 24px 0px rgba(181,181,181,0.2);
			position: absolute;
			left: 50%;
			margin-left: -50%;
			margin-top: -50px;
			margin-bottom: 40px;
			.title {
				font-size: 20px;
				font-weight: 600;
				text-align: center;
				line-height: 28px;
			}
			p {
				color: #666;
			}
			.preface {
				margin-bottom: 30px;
			}
			.item {
				margin-bottom: 10px;
			}
			.btn-box {
				margin-top: 30px;
				text-align: center;
				.btn {
					width: 110px;
					height: 33px;
					line-height: 33px;
					text-align: center;
					border-radius: 4px;
					cursor: pointer;
					display: inline-block;
				}
				.study-btn {
					background-color: #E3E3E3;
					margin-right: 50px;
				}
				.open-btn {
					background-color: @main-color-blue;
					color: #fff;
				}
			}
		}
	}
}
</style>


