<template>
  <div class="coursedetail-page">
    <div class="container">
      <div class="back">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
          <span>返回</span>
        </router-link>
      </div>
      <div class="content">
        <img src="../assets/images/demo/05.jpg" alt="">
        <div class="info-box">
          <p class="title">{{detail.cepingName}}</p>
          <p class="gray">适应人群：{{detail.peopleScope}}</p>
          <p class="gray">难度：{{detail.cepingLevel}}</p>
          <p class="gray">数量：{{detail.num}}题</p>
          <!-- <p class="red" v-if="detail.price>0">价格： ¥{{detail.price}}</p> -->
          <!-- <div class="btn-box" v-if="detail.price>0">
            <el-button size="small" class="buy-btn" @click="showDialog=true">立即购买</el-button>
            <i class="iconfont icon-cart"></i>
          </div> -->
          <div class="btn-box">
            <el-button size="small" class="buy-btn eva-btn" @click="toEvaluation()">进入测评</el-button>
          </div>
        </div>
        <div class="intro">
          <p class="title">简介：</p>
          <div class="intro-text">{{detail.remark}}</div>
        </div>
        <div class="hot">热门测评</div>
        <table class="table">
          <tr v-for="(item, index) in hotList" :key="item.id">
            <td class="name">{{index+1}}</td>
            <td class="name">{{item.cepingName}}</td>
            <td>{{item.num||0}}题</td>
            <td>价格：¥{{item.price||0}}</td>
            <td>{{item.browseCount||0}}人</td>
          </tr>
        </table>
      </div>
      <div class="dialog" v-if="showDialog" @click.self="showDialog=false" >
        <div class="success-box">
          <div class="header">
            <img src="../assets/images/buy_bg.png" alt="">
          </div>
          <div class="content">
            <p class="title">付款成功</p>
            <p class="gray">序列号：2375869784856869</p>
            <el-button round size="small" class="evaluation-btn" @click="toEvaluation()">进入测评</el-button>
            <div class="home-btn">
              <router-link to="/">返回首页</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "coursedetail",
  data() {
    return {
      showDialog: false,
      detail: {},
      hotList: []
    };
  },
  created: function() {
    this.evaluationDetail();
    this.getHotList();
  },
  methods: {
    evaluationDetail: function() {
      this.$store
        .dispatch("EVALUATION_DETAIL", { cepingId: this.$route.params.id })
        .then(res => {
          this.detail = res.data;
        })
        .catch(err => {
          if(err.data.msg){
            this.$message({
            type: "error",
            message: err.data.msg
          })
          }else{
            this.$message({
              type: "error",
              message: "获取测评详情失败"
            })
          }
        });
    },
    getHotList: function() {
      this.$store
        .dispatch("HOT_LIST", { size: 4 })
        .then(res => {
          this.hotList = res.data;
        })
        .catch(err => {
          if(err.data.msg){
            this.$message({
            type: "error",
            message: err.data.msg
          })
          }else{
            this.$message({
              type: "error",
              message: "获取热门测评失败"
            })
          }
        });
    },
    //进入测评
    toEvaluation: function() {
      this.$router.push({
        name: `evaluation`,
        params: { id: this.$route.params.id }
      });
    },
    //立即购买
    buy: function(){
      let data = {
        cepingId: this.$route.params.id
      }
      this.$store.dispatch('CEPINGBUY', data).then(res => {
        console.log(res)
        this.showDialog = true
      }).catch(err => {
        if(err.data.msg){
            this.$message({
            type: "error",
            message: err.data.msg
          })
          }else{
            this.$message({
              type: "error",
              message: "获取测评详情失败"
            })
          }
      })
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.coursedetail-page {
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .back {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid @main-color-border;
      i {
        color: @main-color-blue;
      }
      span {
        margin-left: 5px;
        color: @main-color-text;
      }
    }
    .content {
      padding: 20px;
      img {
        float: left;
        width: 300px;
        height: 160px;
        border-radius: 10px;
      }
      .info-box {
        margin-left: 330px;
        height: 160px;
        .title {
          font-weight: bold;
        }
        p {
          line-height: 1.7;
          font-size: 14px;
        }
        .gray {
          color: @main-color-gray;
        }
        .red {
          color: @main-color-red;
        }
        .btn-box {
          margin-top: 10px;
          display: inline-block;
          .buy-btn {
            float: left;
            height: 30px;
            color: #fff;
            margin: 0;
            background-color: #db3523;
            border-radius: 4px 0 0 4px;
            box-shadow: 0 0 0;
            border: none;
          }
          .eva-btn {
            border-radius: 4px;
          }
          .icon-cart {
            float: left;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background-color: #dc534d;
            cursor: pointer;
          }
        }
      }
      .intro {
        padding: 20px;
        color: @main-color-lighttext;
        .title {
          line-height: 30px;
        }
        .intro-text {
          line-height: 1.6;
        }
      }
      .hot {
        color: @main-color-blue;
        line-height: 40px;
      }
      .table {
        width: 100%;
        font-family: "微软雅黑";
        font-size: 14px;
        tr {
          td {
            padding: 10px;
            line-height: 20px;
            color: @main-color-lighttext;
          }
          .name {
            color: @main-color-text;
          }
        }
      }
    }
    .dialog {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      z-index: 11;
      position: absolute;
      top: 0;
      left: 0;
      .success-box {
        width: 250px;
        background-color: #fff;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -125px;
        .header {
          width: 100%;
          height: 110px;
          border-radius: 10px 10px 0 0;
          img {
            width: 100%;
            height: auto;
            margin-top: -1px;
          }
        }
        .content {
          text-align: center;
          padding: 20px 10px;
          .title {
            font-weight: bold;
            line-height: 2;
          }
          .gray {
            color: @main-color-gray;
            line-height: 3;
          }
          .evaluation-btn {
            width: 100px;
            background-color: @main-color-blue;
            color: #fff;
          }
          .home-btn {
            a {
              color: @main-color-gray;
              line-height: 4;
            }
          }
        }
      }
    }
  }
}
</style>