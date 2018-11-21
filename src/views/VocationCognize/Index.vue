<template>
  <div class="vocation-cognize">
    <headerNav></headerNav>
    <div class="container">
      <div class="forbidden-box">
        <img class="forbidden-img" src="../../assets/images/building.png" alt="">
        <div class="forbidden-text">本模块正在建设中，敬请期待...</div>
      </div>
    </div>
  </div>
</template>

<script>
import headerNav from "@/components/HeaderNav.vue"
export default {
  name: 'vocationCognize',
  components: {
    headerNav
  }
}
</script>

<style lang="less">
@import "../../assets/css/colors.less";
  .vocation-cognize {
    width: 100%;
    min-height: 100%;
    background-color: @main-color-bg;
    padding-top: 60px;
    padding-bottom: 25px;
    .container {
      width: 1200px;
      min-height: calc(100vh - 165px); // 80+60+25
      margin: 40px auto;
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
          font-size: 24px;
          text-align: center;
          margin-top: 30px;
        }
      }
    }
  }
</style>