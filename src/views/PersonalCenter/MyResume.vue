<template>
  <div class="myresume-page">
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane label="简历记录" name="first">
        <div class="resume-list">
          <div class="nodata" v-if="!resumeList.length">还没有任何数据~</div>
          <div class="item resume-item" v-for="resume in resumeList" :key="resume.id">
            <img src="../../assets/images/resume_icon.svg" alt="">
            <div class="item-content">
              <div class="name">{{resume.resumeName}}-{{resume.updateDate.slice(0,10)}}</div>
              <div class="score" v-if="resume.resumePoint">分数：<span>{{resume.resumePoint}}分</span></div>
              <div class="status">状态：
                <span class="red" v-if="resume.state == 10">待审核</span>
                <span class="green" v-if="resume.state == 20">审核通过</span>
              </div>
              <div class="time">
                <span v-if="resume.time_solt.year">{{resume.time_solt.year}}年前</span>
                <span v-if="resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.month}}个月前</span>
                <span v-if="resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.day}}天前</span>
                <span v-if="resume.time_solt.hour&&!resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.hour}}小时前</span>
                <span v-if="resume.time_solt.minute&&!resume.time_solt.hour&&!resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.minute}}分钟前</span>
                <span v-if="resume.time_solt.second&&!resume.time_solt.minute&&!resume.time_solt.hour&&!resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.second}}秒前</span>
              </div>
              <div class="btn-box">
                <div class="operation-btn edit-btn" @click="edit(resume.id)">修改</div>
                <div class="operation-btn view-btn">
                  <router-link target="_blank" :to="`/viewResume/${resume.id}`">查看</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待修改" name="second">
        <div class="resume-list">
          <div class="nodata" v-if="!modifyList.length">还没有任何数据~</div>
          <div class="item modify-item" v-for="item in modifyList" :key="item.id">
            <img src="../../assets/images/resume_icon.svg" alt="">
            <div class="item-content">
              <div class="name">{{item.name}}</div>
              <div class="comment">修改评语：</div>
              <div class="comment">{{item.resumeComment}}</div>
              <div class="btn-box">
                <div class="operation-btn view-btn" @click="edit(item.id)">立即修改</div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import time from '../../api/time.js'
  export default {
    name: 'myresume',
    data(){
      return {
        activeName: "first",
        resumeList: [],
        modifyList: []
      }
    },
    created(){
      this.getResumeList()
    },
    methods: {
      tabsClick: function(tab, event){
        let tabIndex = tab.index
        if(tabIndex == 0){
          this.getResumeList()
        }else if(tabIndex == 1){
          this.getModifyList()
        }
      },
      getResumeList: function(){
        this.$store.dispatch('RESUME_LIST').then(res => {
          this.resumeList = res.data
          for(var item of this.resumeList){
            item.time_solt = time.getTime(item.updateDate)
          }
          // console.log(this.resumeList)
        }).catch(err => {
          console.log(err)
          if (err.data.msg) {
            this.$message({
              message: err.data.msg,
              type: "error"
            });
          } else {
            this.$message({
              message: "获取简历列表失败",
              type: "error"
            });
          }
        })
      },
      getModifyList: function(){
        this.$store.dispatch('MODIFY_LIST').then(res => {
          // console.log(res)
          this.modifyList = res.data
        }).catch(err => {
          if (err.data.msg) {
            this.$message({
              message: err.data.msg,
              type: "error"
            });
          } else {
            this.$message({
              message: "获取待修改简历列表失败",
              type: "error"
            });
          }
        })
      },
      edit: function(id){
        this.$router.push({
          name: 'resume',
          params: {
            resumeId: id
          }
        })
      },
      view: function(id){
        this.$router.push({
          name: 'resume',
          params: {
            resumeId: id
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.myresume-page {
  .nodata {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
  }
  .resume-list {
    width: 100%;
    font-size: 13px;
    padding:10px 20px;
    // display: inline-block;
    display: flex;
    -webkit-display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .green {
      color: #5EBD96;
    }
    .red {
      color: #EB6A68;
    }
    .resume-item {
      width: 220px;
    }
    .modify-item {
      width: 298px;
    }
    .item {
      padding: 10px;
      border-radius: 4px;
      box-shadow: 2px 0px 10px rgba(56, 127, 246, 0.15);
      margin-bottom: 10px;
      margin-right: 12px;
      display: inline-block;
      img {
        float: left;
        width: 40px;
        height: 48px;
      }
      .item-content {
        height: 100%;
        margin-left: 55px;
        line-height: 20px;
        padding-bottom: 32px;
        position: relative;
        .score {
          span {
            color: red;
          }
        }
        .time {
          color: #DCDFE6;
        }
        .commont-title {
          color: #A2A9B8;
        }
        .comment {
          line-height: 20px;
          color: #A2A9B8;
        }
        .btn-box {
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .edit-btn {
          border: 1px solid @main-color-blue;
          color: @main-color-blue;
          margin-right: 10px;
        }
        .view-btn {
          background-color: @main-color-blue;
          color: #fff;
        }
        .operation-btn {
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
          display: inline-block;
          a {
            width: 100%;
            line-height: 30px;
            display: inline-block;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

