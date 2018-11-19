<template>
  <div class="practice-employment">
    <headerNav></headerNav>
    <div class="container">
      <span>正在建设中...</span>
    </div>
  </div>
</template>

<script>
import headerNav from "@/components/HeaderNav.vue";
export default {
  name: 'practiceEmployment',
   components: {
    headerNav
  }
}
</script>

<style lang="less">
@import "../../assets/css/colors.less";
  .practice-employment {
    width: 100%;
    min-height: 100%;
    background-color: @main-color-bg;
    padding-top: 60px;
    padding-bottom: 25px;
    .container {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
      text-align: center;
      padding: 200px;
    }
  }
</style>