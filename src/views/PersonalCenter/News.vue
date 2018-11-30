<template>
  <div class="news-page">
    <el-tabs  v-model="activeName">
      <el-tab-pane label="消息通知" name="first">
        <div class="notice-list">
          <div class="nodata" v-if="!msgList.length">还没有任何消息哦~</div>
          <div class="notice" v-if="msgList.length">
            <div class="item" v-for="msg in msgList" :key="msg.id" @click="updateStatus(msg.id)">
              <div class="logo" v-if="msg.user">
                <img class="avatar" :src="rootPath + msg.user.avatar" alt="">
              </div>
              <div class="content">
                <div class="title">
                  <span v-if="msg.type===1">{{msg.user.userName}}</span>
                  <span v-if="msg.type===0">公告</span>
                  <span class="time">{{msg.createTime}}</span>
                </div>
                <div class="message">{{msg.content}}</div>
              </div>
            </div>
          </div>
          <div class="page-box">
            <el-pagination layout="prev, pager, next" :total="pageCount"
            :current-page="currentPage"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            ></el-pagination>
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
      pageIndex: 1,
      pageSize: 6,
      currentPage: 1,
      pageCount: 0
    };
  },
  created(){
    this.getMsgList()
  },
  methods: {
    getMsgList: function(){
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.$store.dispatch('MSG_LIST', params).then(res => {
        this.rootPath = res.data.rootPath
        this.msgList = res.data.page.list || []
        this.pageCount =  Math.ceil(Number(res.data.page.total) / this.pageSize) || 1 
      }).catch(err => {
        if(err.data.msg){
          this.$message.error(err.data.msg)
        }else {
          this.$message.error('获取消息失败，请稍后重试！')
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
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getMsgList()
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
  .el-tabs {
    height: 100%;
    & /deep/ .el-tabs__content {
      height: calc(100% - 55px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .notice-list {
    min-height: 100%;
    padding-bottom: 40px;
    position: relative;
    .notice {
      padding: 10px 20px;
      .item {
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
    .page-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
}
</style>

