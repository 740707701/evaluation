<template>
  <div class="personalcenter-page">
    <headerNav></headerNav>
    <div class="container">
      <div class="personal-info">
        <img class="avatar" src="../../assets/images/demo/04.jpg" alt="">
          <el-container>
            <el-aside width="150px">
              <ul class="info-text">
                <li><span>{{username}}</span>
                <span class="split">|</span>
                <span>{{sex}}</span></li>
                <li>消费金额：<span class="value">¥ {{money}}</span></li>
                <li>学习时长：<span class="value">{{time}}</span> min</li>
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
              <div class="main">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="我的测评" name="first">
                    <div class="completed">
                      <p class="tag">时至今日，{{username}}共测评了21份</p>
                      <div>ndjkdfnvdfkbnks</div>

                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="未完成测评" name="second">
                    <div class="unfinished">
                      <div class="range">范围选择：</div>
                      <el-dropdown>
                        <el-button type="default" class="dropdown-btn">{{range?range:'请选择'}}
                          <i class="el-icon-arrow-down el-icon--right">
                        </i></el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="range in rangeList" :key="range.id" @click="checkRange(range)">{{range.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <div class="course-list">
                        <el-row :gutter="20">
                          <el-col :span="6" v-for="course in courseList" :key="course.id" >
                            <div class="course-box">
                              <img :src="course.img" alt="">
                              <div class="course-info">
                                <div class="title">{{course.name}}</div>
                                <div class="gray">
                                  <span>难度：{{course.difficulty}}</span>
                                  <el-rate v-model="course.rate" disabled class="rate"></el-rate>
                                </div>
                                <div class="gray">
                                  <div class="serial-number">序列号：{{course.serialNumber}}</div>
                                  <i class="el-icon-document copy-icon" @click="copy()"></i>
                                </div>
                              </div>
                            </div>
                          </el-col>
                          
                        </el-row>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-main>
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
      activeName: "first",
      username: "菜鸟",
      sex: "男",
      time: "120",
      money: "98.76",
      rateValue: 3.7,
      range: '',
      rangeList: [
        {
          id: 0,
          name: '项目一'
        },
        {
          id: 1,
          name: '项目二'
        },
        {
          id: 2,
          name: '项目三'
        }
      ],
      courseList: [
        {
          id: '00',
          name: 'Swoole入门到实战打造高性能赛事直播平台',
          difficulty: '中级',
          rate: 2.5,
          serialNumber: 'WSE2463o545t54y6',
          img: require('../../assets/images/demo/01.jpg')
        },
        {
          id: '01',
          name: 'Swoole入门到实战打造高性能赛事直播平台',
          difficulty: '中级',
          rate: 3.7,
          serialNumber: 'WSE2463osdfdsgd8y',
          img: require('../../assets/images/demo/02.jpg')
        },
         {
          id: '02',
          name: 'Swoole入门到实战打造高性能赛事直播平台',
          difficulty: '中级',
          rate: 2.7,
          serialNumber: 'WSE2463o54ghdj',
          img: require('../../assets/images/demo/03.jpg')
        },
         {
          id: '03',
          name: 'Swoole入门到实战打造高性能赛事直播平台',
          difficulty: '中级',
          rate: 4.7,
          serialNumber: 'WSE2463o52343546',
          img: require('../../assets/images/demo/04.jpg')
        },
         {
          id: '04',
          name: 'Swoole入门到实战打造高性能赛事直播平台',
          difficulty: '中级',
          rate: 2.1,
          serialNumber: 'WSE2467886867rr',
          img: require('../../assets/images/demo/05.jpg')
        },
         {
          id: '05',
          name: 'Swoole入门到实战打造高性能赛事直播平台',
          difficulty: '中级',
          rate: 1.5,
          serialNumber: 'WSE24667876786',
          img: require('../../assets/images/demo/01.jpg')
        },
         {
          id: '06',
          name: 'Swoole入门到实战打造高性能赛事直播平台',
          difficulty: '中级',
          rate: 4.6,
          serialNumber: 'WSE2463o8674e5673',
          img: require('../../assets/images/demo/03.jpg')
        },
         {
          id: '07',
          name: 'Swoole入门到实战打造高性能赛事直播平台',
          difficulty: '中级',
          rate: 2.5,
          serialNumber: 'WSE3443546576',
          img: require('../../assets/images/demo/06.jpg')
        },
      ]
    };
  },
  method: {
    checkRange: function(range){
      console.log(this.range, range)
      // this.range = range.name
    },
    copy: function(course){

      this.$message({
        message: '复制序列号成功',
        type: 'success'
      })
    }
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
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
        padding: 10px 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow:8px 0px 10px rgba(56,127,246,0.15) ;
        .el-tabs__nav {
          padding-left: 20px;
        }
        .completed {
          .tag {
            line-height: 30px;
            padding-left: 20px;
          }
        }
        .unfinished {
          padding: 10px 20px;
          .range {
            line-height: 30px;
            display: inline-block;
          }
          .el-icon-arrow-down {
            float: right;
          }
          .dropdown-btn {
            width: 120px;
            height: 30px;
            padding: 0 10px;
            text-align: left;
          }
          .course-list {
            padding: 10px 0;
            .course-box {
              width: 210px;
              box-shadow: 4px 0px 8px rgba(56,127,246,0.15) ;
              border-radius: 8px;
              margin-bottom: 15px;
              img {
                width: 210px;
                height: 120px;
                border-radius: 8px 8px 0 0 ;
              }
              .course-info {
                padding: 5px 10px;
                .title {
                  line-height: 1.6;
                }
                .gray {
                  width: 100%;
                  line-height: 1.8;
                  font-size: 12px;
                  color: @main-color-gray;
                  display: inline-block;
                  span {
                    line-height: 1.8;
                    display: inline-block;
                  }
                  .serial-number {
                    float: left;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  .copy-icon {
                    float: right;
                    margin-top: 5px;
                  }
                  .rate {
                    line-height: 12px;
                    margin-left: 5px;
                    display: inline-block;
                    span {
                      .el-rate__icon {
                        font-size: 14px!important;
                      }
                    }
                    i {
                      font-size: 14px!important;
                      background-color: hotpink
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

