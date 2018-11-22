<template>
  <div class="coursedetail-page">
    <div class="container">
      <div class="back">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
          <span>返回首页</span>
        </router-link>
      </div>
      <div class="content" v-if="detail.baseInfo">
        <img :src="detail.baseInfo.picAll" alt="">
        <div class="info-box">
          <p class="title">{{detail.baseInfo.cepingName}}</p>
          <p>适应人群：{{detail.baseInfo.peopleScope}}</p>
          <p>难度：{{detail.baseInfo.cepingLevel}}</p>
          <p>数量：{{detail.baseInfo.num}}题</p>
          <!-- <p class="red" v-if="detail.baseInfo.price>0">价格： ¥{{detail.baseInfo.price}}</p> -->
          <!-- <div class="btn-box" v-if="detail.baseInfo.price>0">
            <el-button size="small" class="buy-btn" @click="showDialog=true">立即购买</el-button>
          </div> -->
          <div class="btn-box" v-if="!detail.showFree">
            <div class="operation-btn test-btn" @click="serialNoTest">使用序列号测试</div>
            <!-- <i class="iconfont icon-cart" @click="addCart"></i> -->
            <div class="operation-btn buy-btn" @click="buy()">付费测试</div>
          </div>
          <div class="btn-box" v-if="detail.showFree">
            <el-button size="small" class="buy-btn eva-btn" @click="getFreeSerialNo()">进入测评</el-button>
          </div>
        </div>
        <div class="intro">
          <p class="title">简介：</p>
          <div class="intro-text">{{detail.baseInfo.remark}}</div>
        </div>
        <div class="hot" v-if="hotList.length">热门测评</div>
        <table class="table">
          <tr v-for="(item, index) in hotList" :key="item.cepingId" @click="linktoDetail(item.cepingId)">
            <td class="name">{{index+1}}</td>
            <td class="name">{{item.cepingName}}</td>
            <td>{{item.num||0}}题</td>
            <!-- <td>价格：¥{{item.price||0}}</td> -->
            <td>{{item.browseCount||0}}人</td>
          </tr>
        </table>
      </div>
      <div class="success-dialog" v-if="showDialog" @click.self="showDialog=false" >
        <div class="success-box">
          <div class="header">
            <img src="../../assets/images/buy_bg.png" alt="">
          </div>
          <div class="content">
            <!-- <p class="title">付款成功</p> -->
            <div class="gray">序列号：{{serialNo}} 
              <i class="el-icon-document copy-icon"
                v-clipboard:copy="serialNo"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"></i>
            </div>
            <el-button round size="small" class="evaluation-btn" @click="toEvaluation()">进入测评</el-button>
            <div class="home-btn">
              <router-link to="/">返回首页</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <evaDialog v-if="dialogInfo.title" :dialogInfo="dialogInfo" @dialogCancelEvent="dialogCancelEvent" @dialogConfirmEvent="dialogConfirmEvent"></evaDialog>
  </div>
</template>
<script>
import axios from "axios";
import evaDialog from '@/components/EvaluationDialog';
export default {
  name: "coursedetail",
  data() {
    return {
      showDialog: false,
      cepingId: '',
      detail: {},
      hotList: [],
      serialNo: '',
      dialogInfo: {}
    };
  },
  created: function() {
    this.cepingId = this.$route.params.cepingId
    this.evaluationDetail(this.cepingId)
    this.getHotList()
  },
  methods: {
    evaluationDetail: function(cepingId) {
      this.$store
        .dispatch("EVALUATION_DETAIL", { cepingId: cepingId })
        .then(res => {
          this.detail = res.data;
        })
        .catch(err => {
          if(err.data.msg){
            this.$message({type: "error", message: err.data.msg})
          }else{
            this.$message({type: "error", message: "获取测评详情失败，请稍后重试！"})
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
            this.$message({type: "error", message: err.data.msg})
          }else{
            this.$message({type: "error", message: "获取热门测评失败，请稍后重试！"})
          }
        });
    },
    //加入购物车
    addCart: function(){
      let data = {
        cepingId: this.detail.baseInfo.cepingId
      }
      this.$store.dispatch('ADDCART', data).then(res => {
        this.getCartCount()
        this.$message({
          type: "success",
          message: "加入成功"
        })
      }).catch(err => {
        if(err.data.msg){
          this.$message({
            type: "error",
            message: err.data.msg
          })
        }else {
          this.$message({
            type: "error",
            message: "加入购物车失败，请稍后重试"
          })
        }
      })
    },
    //获取购物车数量
    getCartCount(){
      this.$store.dispatch('CARTLIST').then(res => {
        let count = res.data.cartListNormal.length || 0;
        this.$store.commit("setCartCount", count)
      }).catch(err => {
        console.log(err)
      })
    },
    //进入测评
    toEvaluation: function() {
      this.$router.push({
        name: `evaluation`,
        params: {
          id: this.$route.params.cepingId, 
          serialNo: this.serialNo
        }
      });
    },
    //立即购买
    buy(){
      let cartData = {
        rootPath: '',
        totalPrice: this.detail.baseInfo.price
      };
      let cartList = []
      this.detail.baseInfo.purchaseNum = 1; //购物车默认数量为1
      cartList.push(this.detail.baseInfo)
      localStorage.setItem("cartList", JSON.stringify(cartList));
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.$router.push({ name: "settlement" });
    },
    // 进入测评详情
    linktoDetail: function(cepingId) {
      this.evaluationDetail(cepingId)
    },
    // 序列号测试
    serialNoTest() {
      this.dialogInfo = {
        title: '温馨提示',
        message: '每一个序列号可以测试本网站的任何一个测试，但是只能测试一次，请同学们选择感兴趣的测试。',
        confirmButtonText: '确定使用序列号测试',
        cancelButtonText: '重新选择题目'
      }
    },
    dialogCancelEvent() {
      this.$router.push({ path: '/'})
    },
    dialogConfirmEvent() {
      this.$router.push({
        name: 'evaluation',
        params: {
          cepingId: this.$route.params.cepingId 
        }
      })
    },
    //获取免费序列号
    getFreeSerialNo: function(){
      let data = {
        cepingId: this.$route.params.cepingId,
        num: "1"
      }
      this.$store.dispatch('CEPINGFREE', data).then(res => {
        console.log(res)
        this.serialNo = res.data.data;
        this.showDialog = true;
      }).catch(err => {
        console.log(err)
        if(err.data.msg){
            this.$message({type: "error", message: err.data.msg})
          }else{
            this.$message({type: "error", message: "获取序列号失败，请稍后重试！"})
          }
      })
    },
    onCopy: function (e) {
      this.$message({type: "success", message: "复制序列号成功"})
    },
    onError: function (e) {
      this.$message({type: "error", message: "复制序列号失败"})
    },
  },
  components: {
    evaDialog
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.coursedetail-page {
  height: 100%;
  .container {
    width: 1200px;
    height: 100%;
    min-height: calc(100vh - 95px);
    margin: 0 auto;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .back {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid @main-color-border;
      i {
        color: @main-color-blue;
        font-size: 16px;
        font-weight: 600;
      }
      span {
        font-weight: bold;
        margin-left: 5px;
        color: @main-color-text;
      }
    }
    .content {
      padding: 20px;
      .copy-icon {
        margin-left: 10px;
        margin-top: 12px;
        cursor: pointer;
      }
      .copy-icon:hover {
        color: @main-color-blue;
      }
      img {
        float: left;
        width: 260px;
        height: 170px;
        border-radius: 10px;
        background-color: #fafafa;
      }
      .info-box {
        margin-left: 290px;
        height: 170px;
        .title {
          font-size: 16px;
          font-weight: bold;
        }
        p {
          line-height: 2;
          font-size: 14px;
        }
        .gray {
          color: @main-color-gray;
        }
        .red {
          color: @main-color-red;
        }
        .disabled {
          background-color: #ddd!important;
          cursor: no-drop!important;
        }
        .btn-box {
          margin-top: 18px;
          display: inline-block;
          .operation-btn {
            float: left;
            width: 112px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin: 0;
            font-size: 12px;
            border-radius: 4px;
            box-shadow: 0 0 0;
            cursor: pointer;
            border: none;
          }
          .buy-btn {
            color: #666;
            background-color: #E2E2E2;
          }
          .test-btn {
            background-color: #C84430;
            color: #fff;
            margin-right: 32px;
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
            margin-right: 20px;
            color: #fff;
            background-color: #dc534d;
            cursor: pointer;
          }
        }
      }
      .intro {
        padding: 20px;
        color: @main-color-text;
        .title {
          line-height: 30px;
        }
        .intro-text {
          line-height: 1.6;
        }
      }
      .hot {
        font-size: 16px;
        color: @main-color-blue;
        line-height: 40px;
        font-weight: 600;
      }
      .table {
        width: 100%;
        font-family: "微软雅黑";
        font-size: 14px;
        tr {
          cursor: pointer;
          td {
            padding: 10px;
            line-height: 20px;
            color: @main-color-text;
          }
        }
      }
    }
    .success-dialog {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      z-index: 21;
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
      .back-box {
        width: 300px;
        height: 135px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -67px;
        margin-left: -150px;
        text-align: center;
        .header {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid @main-color-border;
          .title {
            float: left;
            padding-left: 20px;
          }
          .close {
            font-size: 20px;
            color: @main-color-gray;
            float: right;
            margin-right: 10px;
            cursor: pointer;
          }
        }
        .back-content {
          padding: 30px;
          .text {
            line-height: 50px;
          }
          .back-btn {
            padding: 10px;
            cursor: pointer;
            border: 1px solid @main-color-border;
            border-radius: 4px;
            display: inline-block;
          }
          .success-btn {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>