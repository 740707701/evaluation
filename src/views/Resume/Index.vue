<template>
	<div class="resume">
		<headerNav></headerNav>
		<router-view></router-view>
	</div>
</template>
<script>
import headerNav from '@/components/HeaderNav'
export default {
	name: 'resume',
	data() {
		return {}
	},
	components: {
		headerNav
	}
}
</script>
<style lang="less" scoped>
.resume {
	padding-top: 60px;
	min-height: 100%;
	background-color: #f8fafc;
}
</style>


