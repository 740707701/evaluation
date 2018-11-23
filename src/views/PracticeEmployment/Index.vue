<template>
  <div class="practice-employment">
    <headerNav></headerNav>
    <div class="container" v-if="permission!='forbidden'">
      <div class="forbidden-box">
        <img class="forbidden-img" src="../../assets/images/building.png" alt="">
        <div class="forbidden-text">本模块正在建设中，敬请期待...</div>
      </div>
    </div>
    <forbidden v-if="permission=='forbidden'"></forbidden>
  </div>
</template>

<script>
import headerNav from "@/components/HeaderNav.vue"
import forbidden from '@/components/Forbidden.vue'
export default {
  name: 'practiceEmployment',
  data() {
    return {
      permission: ''
    }
  },
  created() {
    this.permission = this.$route.query.permission
  },
  components: {
    headerNav,
    forbidden
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