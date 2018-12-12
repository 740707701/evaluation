<template>
	<div class="career-plan">
		<headerNav></headerNav>
		<router-view></router-view>
	</div>
</template>
<script>
import headerNav from '@/components/HeaderNav'
export default {
	name: 'careerplan',
	data() {
		return {}
	},
	components: {
		headerNav
	}
}
</script>
<style lang="less" scoped>
.career-plan {
	padding-top: 60px;
	min-height: 100%;
}
</style>


