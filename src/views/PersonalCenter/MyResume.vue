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
              <div class="status">状态：
                <span class="red" v-if="resume.state == 10">待审核</span>
                <span class="green" v-if="resume.state == 20">审核通过</span>
              </div>
              <div class="time">
                <span v-if="resume.time_solt.year">{{resume.time_solt.year}}年</span>
                <span v-if="resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.month}}个月</span>
                <span v-if="resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.day}}天</span>
                <span v-if="resume.time_solt.hour&&!resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.hour}}小时</span>
                <span v-if="resume.time_solt.minute&&!resume.time_solt.hour&&!resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.minute}}分钟</span>
                前
              </div>
              <div class="operation-btn" @click="view(resume.id)">查看</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待修改" name="second">
        <div class="nodata" v-if="!modifyList.length">还没有任何数据~</div>
        <div class="resume-list">
          <div class="item modify-item" v-for="item in modifyList" :key="item.id">
            <img src="../../assets/images/resume_icon.svg" alt="">
            <div class="item-content">
              <div class="name">{{item.name}}</div>
              <div class="comment">修改评语：</div>
              <div class="comment">{{item.resumeComment}}</div>
              <div class="operation-btn" @click="edit(item.id)">立即修改</div>
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
          console.log(this.resumeList)
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
      width: 240px;
      img {
        width: 50px;
        height: 59px;
      }
    }
    .modify-item {
      width: 324px;
      img {
        width: 40px;
        height: 48px;
      }
      .item-content {
        margin-left: 60px!important;
      }
    }
    .item {
      padding: 10px;
      border-radius: 4px;
      box-shadow: 2px 0px 10px rgba(56, 127, 246, 0.15);
      margin-bottom: 10px;
      margin-right: 12px;
      img {
        float: left;
      }
      .item-content {
        margin-left: 70px;
        line-height: 20px;
        padding-bottom: 25px;
        position: relative;
        .time {
          color: #DCDFE6;
        }
        .commont-title {
          color: #A2A9B8;
        }
        .comment {
          line-height: 20px;
          color: #A2A9B8
        }
        .operation-btn {
          padding: 3px 10px;
          border-radius: 4px;
          background-color: @main-color-blue;
          color: #fff;
          cursor: pointer;
          position: absolute;
          bottom: 0px;
          right: 0px;
        }
      }
    }
  }
}
</style>

