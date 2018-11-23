<template>
  <div class="my-evaluation-page">
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane label="我的测评" name="first">
        <div class="completed">
          <p class="nodata" v-if="!finishCount">还没有任何数据~</p>
          <p class="tag" v-if="finishCount">时至今日，{{userInfo.userName?userInfo.userName: userInfo.userNum}}共测评了{{finishCount || 0}}份</p>
          <div class="item-list" v-for="finish in finishedList" :key="finish.keyTime">
            <div class="date-box">
              <div class="day">{{finish.keyTime.slice(4,6)}}</div>
              <div class="year">{{finish.keyTime.slice(0,4)}}</div>
            </div>
            <div class="item-row">
              <div class="item" v-for="item in finish.applyList" :key="item.cepingSerialno">
                <img :src="item.baseInfo.pic" alt="">
                <div class="mask">
                  <a :href="item.cepingReportPath" target="_blank">
                    <div  class="ceping-name">{{item.baseInfo.cepingName}}</div>
                  </a>
                </div>
              </div>
            </div>
            <!-- <div class="page-box" @click="next()">
              <i class="el-icon-arrow-right"></i>
            </div> -->
          </div>
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
          <p class="nodata" v-if="!unfinishedList.length">还没有任何数据~</p>
          <div class="course-list" v-if="unfinishedList">
            <el-row :gutter="20">
              <el-col :span="6" v-for="course in unfinishedList" :key="course.cepingSerialno" >
                <div class="course-box">
                  <img :src="course.baseInfo.pic" alt="">
                  <div class="course-info">
                    <div class="title">{{course.baseInfo.cepingName}}</div>
                    <div class="gray">
                      <span>难度：{{course.baseInfo.cepingLevel}}</span>
                      <el-rate v-model="course.rate" disabled class="rate"></el-rate>
                    </div>
                    <div class="gray">
                      <div class="serial-number" :title="course.cepingSerialno">序列号：{{course.cepingSerialno}}</div>
                      <!-- <i class="el-icon-document copy-icon"
                        v-clipboard:copy="course.cepingSerialno"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"></i> -->
                    </div>
                    <div class="test-box">
                      <el-button class="test-btn" size="small" @click="toEvaluation(course.cepingId,course.cepingSerialno)">进入测试</el-button>
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
      rangeList: [],
      finishCount: '',
      finishedList: [],
      unfinishedList: []
      
    };
  },
  created(){
    this.activeName = this.$route.params.activeName || "first";
    this.userInfo = this.$store.state.userInfo;
    this.getCepingItem()
    this.getFinished()
    this.getUnFinished()
  },
  methods: {
    checkRange: function(range) {
      let cepingItem = range.code - 0 >= 0 ? range.code - 0 : ''
      this.range = range.name;
      this.getUnFinished(cepingItem)
    },
    tabsClick: function(tab, event){
      let tabIndex = tab.index
      if(tabIndex == 0){
        this.getFinished()
      }else if(tabIndex == 1){
        this.getUnFinished()
      }
    },
    getCepingItem() {
      this.$store.dispatch('COURSE_ITEM').then(res => {
        this.rangeList = res.data
        this.rangeList.unshift({name: '全部', sort: 0, id: '000' })
      }).catch(err => {
        if(err.data.msg){
          this.$message({type: 'error', message: err.data.msg})
        }else {
          this.$message({type: 'error', message: '获取测评分类失败，请稍后重试！'})
        }
      })
    },
    getFinished: function(){
      this.$store.dispatch('FINISHED').then(res => {
        this.finishedList = res.data
        let list = []
        for(var item of this.finishedList){
          for(var key of item.applyList){
            list.push(key)
          }
        }
        this.finishCount = list.length
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
          if(item.baseInfo.cepingLevel == "初级"){
            item.rate = 1
          }else if(item.baseInfo.cepingLevel == "中级"){
            item.rate = 2.5
          }else {
            item.rate = 5
          }
        }
      }).catch(err => {
        if (err.data) {
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
    toEvaluation: function(cepingId, serialNo) {
      let data = {
        serialNo: serialNo
      }
      this.$store.dispatch('VALIDCEPING', data).then(res => {
        this.$router.push({
          path: `/evaluation/${cepingId}/${serialNo}`,
          query: {org: 'order' },
        });
      }).catch(err => {
        if (err.data.msg) {
          this.$message({
            message: err.data.msg,
            type: "error"
          });
        } else {
          this.$message({
            message: "序列号验证失败",
            type: "error"
          });
        }
      })
      
    },
    next: function(){ }
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.my-evaluation-page {
  // .el-tabs__nav {
  //   padding-left: 20px;
  // }
  .nodata {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .completed {
    padding: 10px 20px;
    .tag {
      line-height: 30px;
    }
    .item-list {
      width: 100%;
      padding-top: 10px;
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
          font-size: 40px;
          padding-top: 25px;
        }
        .year {
          font-size: 14px;
          line-height: 40px;
        }
      }
      .item-row {
        width: 820px;
        display: inline-block;
        .item {
          float: left;
          width: 154px;
          margin-left: 10px;
          margin-bottom: 10px;
          position: relative;
          img {
            width: 100%;
            height: 120px;
            border-radius: 4px;
          }
          .mask {
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.3);
            border-radius: 4px;
            // display: none;
            position: absolute;
            top: 0;
            left: 0;
            a {
              width: 100%;
              height: 100%;
              display: inline-block;
            }
            .ceping-name {
              color: #fff;
              font-weight: 600;
              padding: 50px 10px 0px 10px;
              text-align: center;
              line-height: 1.5;
            }
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
                width: 40px;
                height: 40px;
                position: absolute;
                top: -20px;
                left: 50%;
                margin-left: -20px;
              }
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
              .title {
                padding-top: 25px;
                text-align: center;
              }
              .preview-text {
                width: 100%;
                display: inline-block;
              }
            }
          }
        }
        .item:hover{
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
        cursor: pointer;
        border: 1px solid @main-color-border;
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
    .item-list:last-child {
      border: none;
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
        height: 250px;
        box-shadow: 4px 0px 8px rgba(56, 127, 246, 0.15);
        border-radius: 8px;
        margin-bottom: 15px;
        position: relative;
        img {
          width: 210px;
          height: 137px;
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
              width: 190px;
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
              width: 80px;
              height: 30px;
              line-height: 0.9;
              background-color: @main-color-blue;
              color: #fff;
              position: absolute;
              bottom: 10px;
              right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

