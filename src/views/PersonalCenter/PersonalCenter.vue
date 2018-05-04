<template>
  <div class="personalcenter-page">
    <headerNav></headerNav>
    <div class="container">
      <div class="personal-info">
        <img class="avatar" src="../../assets/images/demo/04.jpg" alt="">
          <el-container>
            <el-aside width="150px">
              <div class="aside-box">
                <ul class="info-text">
                  <li><span>{{username}}</span>
                  <span class="split">|</span>
                  <span>{{sex}}</span></li>
                  <li>消费金额：<span class="value">¥ {{money}}</span></li>
                  <li>学习时长：<span class="value">{{time}}</span> min</li>
                </ul>
                <ul class="tabs">
                  <li>
                      <span class="point" v-if="$route.name==`myevaluation`"></span>
                      <router-link to="/personalcenter">我的测评</router-link>
                  </li>
                  <li>
                    <span class="point" v-if="$route.name==`myresume`"></span>
                    <router-link to="/myresume">我的简历</router-link>
                  </li>
                  <li>
                    <span class="point" v-if="$route.name==`news`"></span>
                    <el-badge class="badge" is-dot></el-badge>
                    <router-link to="/news">消息通知</router-link>
                  </li>
                  <li>
                    <span class="point" v-if="$route.name==`order`"></span>
                    <router-link to="/order">我的订单</router-link>
                  </li>
                  <li>
                    <span class="point" v-if="$route.name==`statistics`"></span>
                    <router-link to="/statistics">我的统计</router-link>
                  </li>
                  <li>
                    <span class="point" v-if="$route.name==`setting`"></span>
                    <router-link to="/setting">个人设置</router-link>
                  </li>
                </ul>
              </div>
            </el-aside>
            <el-container>
              <div class="main">
                <router-view></router-view>
              </div>
            </el-container>
          </el-container>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from "../../components/HeaderNav";
export default {
  name: "personalcenter",
  data() {
    return {
      username: "菜鸟",
      sex: "男",
      time: "120",
      money: "98.76",
    };
  },
  method: {
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.personalcenter-page {
  min-height: 100%;
  background-color: @main-color-bg;
  padding-top: 60px;  
  padding-bottom: 25px;
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-top: 10px;
    .personal-info {
      // width: 100%;
      // height: 100%;
      .avatar {
        width: 100px;
        height: 100px;
        margin-left: 20px;
      }
      .aside-box {
        .info-text {
          padding-left: 20px;
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
          .router-link-active {
            color: @main-color-blue;
          }
          li {
            position: relative;
            width: 100%;
            height: 44px;
            .point {
              width: 8px;
              height: 8px;
              border-radius: 8px;
              background-color: @main-color-blue;
              display: inline-block;
              margin-right: 6px;
              position: absolute;
              top: 15px; 
              left: 0;
            }
            .badge {
              position: absolute;
              top: 8px;
              left: 72px;
            }
            a {
              line-height: 40px;
              padding-left: 20px;
              display: inline-block;
              color: @main-color-gray;
            }
          }
        }
      }
      .main {
        width: 100%;
        // height: 100%;
        padding: 10px 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow:8px 0px 10px rgba(56,127,246,0.15) ;
        
      }
    }
  }
}
</style>

