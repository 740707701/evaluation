<template>
	<div class="generalplan-entry">
		<div class="container" v-if="permission!='forbidden'">
      <div class="forbidden-box">
        <img class="forbidden-img" src="../../assets/images/generalPlan.png" alt="">
        <div class="forbidden-text">去开启大学各学期的规划与管理</div>
				<router-link to="/videoList">
					<div class="btn video-btn">学习课程</div>
				</router-link>
				<router-link to="/generalPlanInfo">
					<div class="btn generalplan-btn">查看总规划</div>
				</router-link>
				<router-link to="/termPlan">
					<div class="btn open-btn">开启学期规划</div>
				</router-link>
      </div>
    </div>
		<forbidden v-if="permission=='forbidden'"></forbidden>
	</div>
</template>
<script>
import forbidden from '@/components/Forbidden.vue'
export default {
	name: 'generalPlanEntry',
	data() {
		return {
			permission: ''
		}
	},
	created() {
		this.permission = this.$route.query.permission
	},
	components: {
		forbidden
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.generalplan-entry {
	width: 100%;
	min-height: calc(100vh - 60px);
	background-color: @main-color-bg;
	padding-bottom: 25px;
	.container {
		width: 1200px;
		min-height: calc(100vh - 165px); // 80+60+25
		margin: 0px auto;
		margin-top: 40px;
		box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
		text-align: center;
		border-radius: 10px;
		background-color: #fff;
		position: relative;
		.forbidden-box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.forbidden-img {
				width: 200px;
				height: auto;
			}
			.forbidden-text {
				font-size: 18px;
				text-align: center;
				margin-top: 20px;
				color: #A0A9BA;
			}
			.btn {
				width: 110px;
				height: 33px;
				line-height: 33px;
				text-align: center;
				border-radius: 4px;
				cursor: pointer;
				display: inline-block;
				margin-top: 30px;
			}
			.generalplan-btn {
				background-color: #E3E3E3;
				color: #666;
				margin: 0 30px;
			}
			.open-btn {
				background-color: @main-color-blue;
				color: #fff;
			}
			.video-btn {
				border: 1px solid @main-color-blue;
			}
		}
	}
}
</style>


