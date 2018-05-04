<template>
  <div class="careerplan-page">
    <headerNav></headerNav>
    <div class="container">
      <el-row :gutter="20"></el-row>
        <el-col :span="4" class="left-content">
          <div class="title">
            <i class="el-icon-bell"></i>规划选项
          </div>
        </el-col>
        <el-col :span="20" class="right-content">
          <div class="top">
            <div class="title">大一上半学期计划</div>
          </div>
          <div class="right-container">
            <div class="content one" v-for="item in contents" :key="item">{{item}}</div>
            <div class="content two"></div>
            <div class="content three"></div>
            <div class="pager">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </el-col>

    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
export default {
  name: "careerplan",
  data() {
    return {
      contents: ['111111111111','2222222','333333','44444444']
    };
  },
  methods: {},
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.careerplan-page {
  height: 100%;
  background-color: @main-color-bg;
  padding-top: 60px;
  padding-bottom: 25px;
  .container {
    width: 1200px;
    height: calc(100% - 20px);
    margin: 0 auto;
    margin-top: 20px;
    box-shadow:8px 0px 10px rgba(162,169,184,0.15);
    .left-content,.right-content {
      height: 100%;
    }
    .left-content {
      padding: 10px;
      background-color: #fff;
      border-right: 1px solid @main-color-border;
      border-radius: 8px 0 0 8px;
      .title {
        line-height: 30px;
        i {
          color: @main-color-blue;
          margin-right: 10px;
        }
      }
    }
    .right-content {
      .top {
        padding-left: 20px;
        height: 50px;
        background-color: #fff;
        .title {
          line-height: 50px;
          display: inline-block;
          border-bottom: 2px solid @main-color-blue;
        }
      }
      .right-container {
        height: calc(100% - 50px);
        padding: 20px;
        position: relative;
        .content {
          width: calc(100% - 40px);
          // height: calc(100% - 40px);
          background-color: #fff;
          border-radius: 8px;
          box-shadow:8px 0px 10px rgba(162,169,184,0.15);
          position: absolute;
        }
        .one {
          height: calc(100% - 40px);
          top: 20px;
          left: 20px;
          z-index: 10;
        }
        .two {
          height: calc(100% - 50px);
          left: 25px;
          top: 25px;
          z-index: 9;
        }
        .three {
          height: calc(100% - 60px);
          left: 30px;
          top: 30px;
          z-index: 8;
        }
        .pager {
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          text-align: center;
          color: #fff;
          background-color: @main-color-blue;
          cursor: pointer;
          position: absolute;
          bottom: 40px;
          right: 16px;
          z-index: 11;
        }
      }
    }
  }
}
</style>

