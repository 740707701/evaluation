<template>
  <div class="news-page">
    <el-tabs  v-model="activeName">
      <el-tab-pane label="消息通知" name="first">
        <div class="notice-list">
          <div class="nodata" v-if="!noticeList.length&&!systemList.length">还没有任何消息哦~</div>
          <div class="notice" v-if="noticeList.length">
            <div class="item" v-for="msg in noticeList" :key="msg.id" v-if="msg.type==1" @click="updateStatus(msg.id)">
              <div class="logo" v-if="msg.user">
                <img class="avatar" :src="rootPath + msg.user.avatar" alt="">
              </div>
              <div class="content">
                <div class="title">
                  <span>{{msg.user.userName}}</span>
                  <span class="time">{{msg.createTime}}</span>
                </div>
                <div class="message">{{msg.content}}</div>
              </div>
            </div>
          </div>
          <!-- <div class="share">
            <div class="item">
              <div class="logo">
                <img src="../../assets/images/demo/03.jpg" alt="">
              </div>
              <div class="content">
                <div class="title">
                  <span>李某人</span>
                  <span class="time">03-26 12:22</span>
                </div>
                <div class="message">推荐分享给你一份测评题目<a href="javascript:">《高考专业选择测评》</a></div>
              </div>
            </div>
          </div> -->
          <div class="system">
            <div class="item" v-for="msg in systemList" :key="msg.id" v-if="msg.type==0" @click="updateStatus(msg.id)">
              <div class="logo" v-if="msg.user">
                <img class="avatar" :src="msg.user.avatar" alt="">
              </div>
              <div class="content">
                <div class="title">
                  <span>公告</span>
                  <span class="time">{{msg.createTime}}</span>
                </div>
                <div class="message">{{msg.content}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "news",
  data() {
    return {
      rootPath: '',
      activeName: 'first',
      msgList: [],
      noticeList: [],
      systemList:[]
    };
  },
  created(){
    this.getMsgList()
  },
  methods: {
    getMsgList: function(){
      this.$store.dispatch('MSG_LIST').then(res => {
        this.msgList = res.data.list || []
        this.rootPath = res.data.rootPath
        this.systemList = this.msgList.filter( item => {
          return item.type == 0
        })
        this.noticeList = this.msgList.filter(item => {
          return item.type == 1
        })
      }).catch(err => {
        console.log(err)
        if(err.data.msg){
          this.$message({
            type: 'error',
            message: err.data.msg
          })
        }else {
          this.$message({
            type: 'error',
            message: "获取消息失败"
          })
        }
      })
    },
    updateStatus: function(id){
      let params = {
        id: id
      }
      this.$store.dispatch('UPDATE_MSG', params).then(res => {
        console.log('已读',res)
      }).catch(err => {
        if(err.data.msg){
          this.$message({
            type: 'error',
            message: err.data.msg
          })
        }else {
          this.$message({
            type: 'error',
            message: "获取消息失败"
          })
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.news-page {
  height: 100%;
  .nodata {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
  }
  .notice-list {
    padding: 10px 0;
  }
  .notice {
    padding-bottom: 20px;
    border-bottom: 1px solid @main-color-border;
  }
  .notice, .share , .system {
    padding: 10px 20px;
    .item {
      // padding-top: 10px;
      cursor: pointer;
      .logo {
        float: left;
        background-color: @main-color-imgbg;
        border-radius: 20px;
        margin-top: 8px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          display: inline-block;
        }
      }
      .content {
        margin-left: 60px;
        .title {
          line-height: 30px;
          color: @main-color-gray;
          .time {
            margin-left: 90px;
          }
        }
        .message {
          line-height: 22px;
          color: @main-color-text;
          a {
            color: @main-color-blue;
          }
        }
      }
    }
  }
}
</style>

