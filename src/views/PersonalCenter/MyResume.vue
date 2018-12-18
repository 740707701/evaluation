<template>
  <div class="myresume-page">
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane label="简历记录" name="first">
        <div class="resume-list">
          <div class="nodata" v-if="!resumeList.length">还没有任何数据~</div>
          <div class="item resume-item" v-for="resume in resumeList" :key="resume.id">
            <img src="../../assets/images/resume_icon.svg" alt="">
            <div class="item-content">
              <div class="item-box">
                <div class="name" :title="resume.resumeName">{{resume.resumeName}}</div>
                <div class="name">{{resume.updateDate.slice(0,10)}}</div>
                <!-- <div class="score" v-if="resume.resumePoint">分数：<span>{{resume.resumePoint}}分</span></div> -->
                <div class="status">状态：
                  <span class="red" v-if="resume.state == -1">未提交</span>
                  <span class="red" v-if="resume.state == 10">待审核</span>
                  <span class="green" v-if="resume.state == 20">已审核 通过</span>
                  <span class="red" v-if="resume.state == 30">已审核 待修改</span>
                </div>
                <div class="time">
                  <span v-if="resume.time_solt.year">{{resume.time_solt.year}}年前</span>
                  <span v-if="resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.month}}个月前</span>
                  <span v-if="resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.day}}天前</span>
                  <span v-if="resume.time_solt.hour&&!resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.hour}}小时前</span>
                  <span v-if="resume.time_solt.minute&&!resume.time_solt.hour&&!resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.minute}}分钟前</span>
                  <span v-if="resume.time_solt.second&&!resume.time_solt.minute&&!resume.time_solt.hour&&!resume.time_solt.day&&!resume.time_solt.month&&!resume.time_solt.year">{{resume.time_solt.second}}秒前</span>
                </div>
              </div>
              <div class="btn-box">
                <div class="operation-btn edit-btn" v-if="resume.state!='10'" @click="editResume(resume)">修改</div>
                <div class="operation-btn edit-btn" @click="viewResume(resume)">查看</div>
                <div class="operation-btn view-btn" v-if="resume.state=='-1' || resume.state=='30'" @click="postResume(resume)">提交</div>
              </div>
              <div class="comment-box" v-if="resume.state=='10'">
                <div class="comment-title">提示：</div>
                <div class="comment-content tips">
                  <span>该简历正在审核中</span>
                </div>
              </div>
              <div class="comment-box" v-if="resume.state=='20'">
                <div class="comment-title">分数：</div>
                <div class="comment-content tips">
                  <span>{{resume.resumePoint || 0}}分</span>
                </div>
              </div>
              <div class="comment-box" v-if="resume.resumeComments.length&&resume.state=='30'">
                <div class="comment-title">评语：</div>
                <div class="comment-content" v-if="!resume.showMore">
                  <span v-if="resume.resumeComments[0]!=null">（1）{{resume.resumeComments[0]}}</span>
                </div>
                <div class="comment-all-content" v-if="resume.showMore" v-for="(content, index) in resume.resumeComments" :key="index">
                  <span v-if="content!=null">（{{index+1}}）{{content}}</span>
                </div>
                <div class="show-more" v-if="resume.resumeComments[0]!=null&&resume.resumeComments[0].length>45">
                  <i class="iconfont icon-down" v-if="!resume.showMore" @click="showMoreText(resume)"></i>
                  <i class="iconfont icon-up" v-if="resume.showMore" @click="showMoreText(resume)"></i>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 提交简历弹框 -->
    <div class="dialog" v-if="showSuccessDialog" @click.self="showSuccessDialog=false">
      <div class="post-box">
        <img src="../../assets/images/resume_success.png" alt="" class="post-success">
        <div class="title">简历提交成功</div>
        <div class="date">{{submitDate}}</div>
        <el-button size="small" round class="back-btn" @click="viewResume(currentResume)">查看</el-button>
      </div>
    </div>
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
        modifyList: [],
        showSuccessDialog: false,
        submitDate: '',
        currentResume: {}
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
        }).catch(err => {
          if (err.data) {
            this.$message({ type: "error", message: err.data.msg});
          } else {
            this.$message({ type: "error", message: "获取简历列表失败" });
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
      editResume: function(resume){
        if(resume.resumeType === 1) {
          this.$router.push({ path: '/freshStudentResume', query: { resumeId: resume.id }})
        } else if(resume.resumeType === 2) {
          this.$router.push({ path: '/resume', query: { resumeId: resume.id }})
        }
      },
      viewResume(resume) {
        if(resume.resumeType === 1) {
          this.$router.push({path: '/viewFreshStudentResume', query: { resumeId: resume.id }})
        } else if(resume.resumeType === 2) {
          this.$router.push({ path: '/viewResume', query: { resumeId: resume.id }})
        }
      },
      postResume(resume) {
        this.currentResume = resume
        let data = {
          resumeId: resume.id
        }
        this.$store
        .dispatch("SUBMIT_RESUME", data)
        .then(res => {
          this.submitDate = res.data.data;
          this.showSuccessDialog = true;
        })
        .catch(err => {
          if (err.data.msg) {
            this.$message({ type: "error", message: err.data.msg })
          } else {
            this.$message({ type: "error", message: "提交简历失败，请稍后重试！"})
          }
        });
      },
      showMoreText(resume) {
      this.$set(resume, 'showMore', !resume.showMore)
    },
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
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .green {
      color: #5EBD96;
    }
    .red {
      color: #EB6A68;
    }
    .resume-item {
      width: 290px;
    }
    .modify-item {
      width: 298px;
    }
    .item {
      padding: 10px;
      border-radius: 4px;
      box-shadow: 2px 0px 10px rgba(56, 127, 246, 0.15);
      margin-bottom: 20px;
      margin-right: 20px;
      display: inline-block;
      img {
        float: left;
        width: 50px;
        height: auto;
      }
      .item-content {
        height: 100%;
        line-height: 20px;
        position: relative;
        .item-box {
          margin-left: 65px;
          .name {
            line-height: 22px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
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
          margin: 3px 0 10px 0;
          text-align: right;
          .operation-btn:last-child {
            margin-right: 0!important;
          }
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
          padding: 0 15px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
          display: inline-block;
          a {
            width: 100%;
            line-height: 28px;
            display: inline-block;
            color: #fff;
          }
        }
      }
    }
    .comment-box {
      padding-top: 10px;
      border-top: 1px solid @main-color-border;
      .tips {
        padding-left: 20px;
      }
      .comment-title {
        line-height: 20px;
        color: #A2A9B8;
      }
      .comment-content, .comment-all-content {
        width: 100%;
        line-height: 20px;
        color: #A2A9B8;
      }
      .comment-content {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .show-more {
        width: 100%;
        text-align: center;
        margin-top: 2px;
        i {
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
   .dialog {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 21;
    position: fixed;
    top: 0;
    left: 0;
    .post-box {
      width: 650px;
      background-color: #fff;
      border-radius: 8px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -200px;
      margin-left: -325px;
      padding: 50px 0;
      .post-success {
        width: 370x;
        height: auto;
        margin: 0 auto;
      }
      .title {
        line-height: 30px;
        font-weight: 600;
        padding-top: 10px;
      }
      .date {
        font-size: 12px;
        color: @main-color-gray;
        margin-bottom: 20px;
      }
      .back-btn {
        width: 140px;
        height: 36px;
        color: #fff;
        text-align: center;
        background-color: @main-color-blue;
      }
    }
  }
}
</style>

