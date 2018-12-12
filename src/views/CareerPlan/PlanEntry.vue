<template>
	<div class="planentry-page">
		<div class="img-bg" v-if="permission!='forbidden'">
			<p>未开启大学职业规划与管理</p>
			<router-link to="/termPlan">
				<el-button size="small" type="primary">开启规划</el-button>
			</router-link>
		</div>
		<forbidden v-if="permission=='forbidden'"></forbidden>
	</div>
</template>
<script>
import forbidden from '@/components/Forbidden'
export default {
	name: 'planEntry',
	data() {
		return {
			permission: '',
			title: "计划入口页面"
		}
	},
	created(){
		this.permission = this.$route.query.permission
	},
	methods: {},
	components: {
		forbidden
	}
}
</script>
<style lang="less" scoped>
 @import "../../assets/css/colors.less";
	.planentry-page {
		width: 100%;
		min-height: calc(100vh - 60px);
		background-color: @main-color-bg;
		position: relative;
		.img-bg {
			width: 500px;
			height: 340px;
			background-image: url("../../assets/images/plan.png");
      background-repeat: no-repeat;
      background-size: cover;
			background-position: center center;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -170px;
			margin-left: -250px;
			p {
				width: 100%;
				font-size: 16px;
				text-align: center;
				color: @main-color-text;
				line-height: 30px;
				position: absolute;
				bottom: 70px;
			}
			button {
				position: absolute;
				bottom: 20px;
				left: 50%;
				margin-left: -40px;
			}
		}
	}
</style>


