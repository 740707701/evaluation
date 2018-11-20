<template>
  <div class="forbidden">
    <headerNav></headerNav>
    <div class="container">
      <span>本模块暂未开放</span>
    </div>
  </div>
</template>

<script>
import headerNav from "@/components/HeaderNav.vue";
export default {
  name: 'forbidden',
  components: {
    headerNav
  }
}
</script>

<style lang="less">
@import "../../assets/css/colors.less";
  .forbidden {
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