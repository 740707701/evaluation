<template>
  <div class="myplan-page">
		<el-tabs>
			<el-tab-pane label="职业规划">
				<div class="plan-content">
					<div class="nodata">功能正在开发中~</div> 
				</div>
			</el-tab-pane>
		</el-tabs>
  </div>
</template>
<script>
export default {
  name: "myplan",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/colors.less");
.myplan-page {
  .plan-content {
    padding: 10px 20px;
    .nodata {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>

