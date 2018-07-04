<template>
	<div class="template2-page">
		<div class="container">
			<div class="base-content">
				<div class="base"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'template2',
	data(){
		return {}
	},
	created(){},
	methods: {}
}
</script>
<style lang="less" scoped>
	@import url("../../assets/css/colors.less");
	.template2-page {
		.container {
			width: 1020px;
			margin: 20px auto;
			.base-content {
				width: 100%;
				height: 240px;
				background: url("../../assets/images/base_bg.jpg") no-repeat;
				background-position: center center;
				background-size: 100% 100%;
			}
		}
	}
</style>


