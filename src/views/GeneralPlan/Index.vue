<template>
	<div class="general-plan">
		<headerNav></headerNav>
		<router-view></router-view>
	</div>
</template>
<script>
import headerNav from '@/components/HeaderNav'
export default {
	name: 'generalplan',
	data() {
		return {}
	},
	components: {
		headerNav
	}
}
</script>
<style lang="less" scoped>
.general-plan {
	padding-top: 60px;
	min-height: 100%;
	background-color: #f8fafc;
}
</style>


