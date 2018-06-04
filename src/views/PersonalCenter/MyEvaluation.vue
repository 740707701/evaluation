<template>
  <div class="my-evaluation-page">
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane label="我的测评" name="first">
        <div class="completed">
          <p class="tag">时至今日，{{userInfo.userName?userInfo.userName: userInfo.userNum}}共测评了21份</p>
          <!-- <div v-for="finish in finishedList" :key="finish.cepingId">
            <div v-for="item in finish" :key="item.id">
                <div>{{item}}<br><br><br><br><br><br><br><br></div>
            </div>
          </div> -->


          <!-- <div class="item-list">
            <div class="date-box">
              <div class="day">{{item.cepingTime}}</div>
              <div class="year">{{item.cepingTime}}</div>
            </div>
            <ul class="item-row">
              <li v-for="course in finish[index]" :key="course.cepingId">
                <img :src="course.baseInfo.pic" alt="">
                <div class="mask">
                  <div class="preview">
                    <div class="circle">
                      <img :src="course.baseInfo.pic" alt="">
                    </div>
                    <router-link target="_blank" :to="course.cepingReportPath">
                      <div class="title">点击预览</div>
                    </router-link>
                  </div>
                </div>
              </li>
            </ul>
            <div class="page-box" @click="next()">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div> -->
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
              <el-dropdown-item v-for="range in rangeList" :key="range.id" @click.native="checkRange(range)">{{range.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="course-list">
            <el-row :gutter="20">
              <el-col :span="6" v-for="course in unfinishedList" :key="course.cepingId" >
                <div class="course-box">
                  <img :src="course.baseInfo.pic" alt="">
                  <div class="course-info">
                    <div class="title">{{course.baseInfo.cepingName}}</div>
                    <div class="gray">
                      <span>难度：{{course.baseInfo.cepingLevel}}</span>
                      <el-rate v-model="course.rate" disabled class="rate"></el-rate>
                    </div>
                    <div class="gray">
                      <div class="serial-number">序列号：{{course.cepingSerialno}}</div>
                      <i class="el-icon-document copy-icon"
                        v-clipboard:copy="course.cepingSerialno"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"></i>
                    </div>
                    <div class="test-box">
                      <el-button class="test-btn" size="small" @click="toEvaluation(course.cepingId)">进入测试</el-button>
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
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
  name: "myevaluation",
  data() {
    return {
      creator: "",
      activeName: "first",
      userInfo: "",
      time: "120",
      money: "98.76",
      rateValue: 3.7,
      range: "",
      rangeList: [
        {
          id: 1,
          name: "专业选择"
        },
        {
          id: 2,
          name: "自我认知"
        },
        {
          id: 3,
          name: "职业形象与风格"
        },
        {
          id: 4,
          name: '岗位分类'
        }
      ],
      finishedList: [],
      unfinishedList: []
      
    };
  },
  created(){
    this.userInfo = this.$store.state.userInfo;
    this.getFinished()
  },
  methods: {
    checkRange: function(range) {
      let cepingItem = range.id;
      this.range = range.name;
      this.getUnFinished(cepingItem)
    },
    tabsClick: function(tab, event){
      let tabIndex = tab.index
      console.log(tab)
      if(tabIndex == 0){
        this.getFinished()
      }else if(tabIndex == 1){
        this.getUnFinished()
      }
    },
    getFinished: function(){
      this.$store.dispatch('FINISHED').then(res => {
        this.finishedList = res.data
        console.log(this.finishedList)
      }).catch(err => {
        if (err.data.msg) {
          this.$message({
            message: err.data.msg,
            type: "error"
          });
        } else {
          this.$message({
            message: "获取已完成测评列表失败",
            type: "error"
          });
        }
      })
    },
    getUnFinished: function(cepingItem){
      let params = {
        cepingItem: cepingItem
      }
      this.$store.dispatch('UNFINISHED', params ).then(res => {
        this.unfinishedList = res.data
        for(var item of this.unfinishedList){
          if(item.cepingLevel == "初级"){
            item.rate = 1
          }else if(item.cepingLevel == "中级"){
            item.rate = 2.5
          }else {
            item.rate = 5
          }
        }
          console.log('item',this.unfinishedList)
      }).catch(err => {
        if (err.data.msg) {
          this.$message({
            message: err.data.msg,
            type: "error"
          });
        } else {
          this.$message({
            message: "获取未完成测评列表失败",
            type: "error"
          });
        }
      })
    },
    onCopy: function (e) {
      this.$message({
        message: "复制序列号成功",
        type: "success"
      });
    },
    onError: function (e) {
      this.$message({
        message: "复制序列号失败",
        type: "error"
      });
    },
    toEvaluation: function(id) {
      alert(id);
      // this.router.push('/')
    },
    next: function(){

    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.my-evaluation-page {
  .el-tabs__nav {
    padding-left: 20px;
  }
  .completed {
    .tag {
      line-height: 30px;
    }
    .item-list {
      width: 100%;
      height: 140px;
      border-bottom: 1px solid @main-color-border;
      .date-box {
        float: left;
        width: 110px;
        height: 120px;
        text-align: center;
        background-color: #5E99FF;
        color: #fff;
        border-radius: 4px;
        .day {
          font-size: 30px;
          line-height: 30px;
          padding-top: 25px;
        }
        .year {
          font-size: 14px;
          line-height: 30px;
        }
      }
      .item-row {
        width: 830px;
        // overflow: hidden;
        display: inline-block;
        li {
          float: left;
          width: 156px;
          margin-left: 10px;
          position: relative;
          img {
            width: 100%;
            height: 120px;
            border-radius: 4px;
          }
          .mask {
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            .preview {
              width: 100%;
              height: 60px;
              background-color: #fff;
              box-shadow: 2px 2px 4px #eee; 
              cursor: pointer;
              position: absolute;
              bottom: 0;
              left: 0;
              .circle {
                width: 50px;
                height: 50px;
                position: absolute;
                top: -25px;
                left: 50%;
                margin-left: -25px;
              }
              img {
                width:50px;
                height: 50px;
                border-radius: 50px;
              }
              .title {
                line-height: 30px;
                padding-top: 25px;
                text-align: center;
              }
            }
          }
        }
        li:hover{
          .mask {
            display: inline-block;
          }
        }
      }
      .page-box {
        float: right;
        width: 60px;
        height: 105px;
        line-height: 105px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid red;
        margin-top: 7px;
        i {
          width: 30px;
          border-radius: 15px;
          height: 30px;
          line-height: 30px;
          background-color: #eee;
          opacity: 0.3;
          text-align: center;
        }
      }
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
      height: 30px;
      padding: 0 10px;
      text-align: left;
    }
    .course-list {
      padding: 10px 0;
      .course-box {
        width: 210px;
        box-shadow: 4px 0px 8px rgba(56, 127, 246, 0.15);
        border-radius: 8px;
        margin-bottom: 15px;
        img {
          width: 210px;
          height: 120px;
          border-radius: 8px 8px 0 0;
        }
        .course-info {
          padding: 5px 10px;
          .title {
            line-height: 1.6;
            font-size: 13px;
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
              cursor: pointer;
            }
            .copy-icon:hover {
              color: @main-color-blue;
            }
            .rate {
              line-height: 12px;
              margin-left: 5px;
              display: inline-block;
              span {
                .el-rate__icon {
                  font-size: 14px !important;
                }
              }
            }
          }
          .test-box {
            width: 100%;
            height: 30px;
            display: inline-block;
            .test-btn {
              float: right;
              width: 80px;
              height: 30px;
              line-height: 0.9;
              background-color: @main-color-blue;
              color: #fff;
              display: none;
            }
          }
        }
      }
      .course-box:hover {
        .test-box {
          .test-btn {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>

