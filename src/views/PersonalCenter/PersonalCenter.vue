<template>
  <div class="personalcenter-page">
    <headerNav></headerNav>
    <div class="container">
      <div class="personal-info">
        <img class="avatar" src="../../assets/images/demo/04.jpg" alt="">
          <el-container>
            <el-aside width="150px">
              <ul class="info-text">
                <li><span>菜鸟</span>
                <span class="split">|</span>
                <span>男</span></li>
                <li>消费金额：<span class="value">¥89.48</span></li>
                <li>学习时长：<span class="value">20</span> min</li>
              </ul>
              <ul class="tabs">
                <li>
                  <span class="point"></span>
                  <router-link to="/">我的测评</router-link>
                </li>
                <li>
                  <span class="point"></span>
                  <router-link to="/">我的简历</router-link>
                </li>
                <li>
                  <span class="point"></span>
                  <router-link to="/">消息通知</router-link>
                </li>
                <li>
                  <span class="point"></span>
                  <router-link to="/">我的订单</router-link>
                </li>
                <li>
                  <span class="point"></span>
                  <router-link to="/">我的统计</router-link>
                </li>
                <li>
                  <span class="point"></span>
                  <router-link to="/">个人设置</router-link>
                </li>
              </ul>
            </el-aside>
            <el-main>
              <div class="main"></div>
            </el-main>
          </el-container>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from '../../components/HeaderNav'
  export default {
    name: 'personalcenter',
    data(){
      return {
        msg: '个人中心页面'
      }
    },
    method: {},
    components: {
      headerNav
    }
  }
</script>
<style lang="less" scoped>
@import '../../assets/css/colors.less';
.personalcenter-page {
  height: 100%;
  background-color: @main-color-bg;
  .container {
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
    .personal-info {
      .avatar {
        width: 100px;
        height: 100px;
      }
      .info-text {
        display: inline-block;
        li {
          line-height: 1.8;
          color: @main-color-gray;
          .split {
            margin: 0 5px;
          }
          .value {
            color: @main-color-text;
          }
        }
      }
      .tabs {
        width: 100%;
        display: inline-block;
        margin-top: 20px;
        li {
          .point {
            width: 8px;
            height: 8px;
            border-radius: 8px;
            background-color: @main-color-blue;
            display: inline-block;
            line-height: 2;
            margin-right: 6px;
          }
          a {
            line-height: 36px;
            display: inline-block;
            color: @main-color-gray;
          }
        }
      }
      .main {
        background-color: #fff;
        height: 200px;
        border-radius: 10px;
      }
    }
  }
}
</style>

