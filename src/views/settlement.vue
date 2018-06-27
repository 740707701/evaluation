<template>
  <div class="settlement-page">
    <headerNav></headerNav>
    <div class="banner-bg">
      <img src="../assets/images/bg_02.png" alt="">
    </div>
    <div class="container">
      <div class="top">
        <div class="title">确认订单</div>
      </div>
      <div class="intro-box">
				<div class="title">商品信息</div>
				<div class="goodslist">
					<div class="item" v-for="item in cepingList" :key="item.id">
						<img :src="item.picAll" alt="">
						<div class="name">{{item.cepingName}}</div>
						<div class="price">¥ {{item.price}}</div>
					</div>
				</div>
				<div class="pay-type">
					<div class="title">请选择支付方式</div>
					<div class="alipay icon-box" @click="payType='alipay'">
						<input type="radio" name="type" id="">
						<i class="iconfont icon-alipay"></i>
					</div>
					<div class="wechat icon-box" @click="payType='wechatpay'">
						<input type="radio" name="type" id="">
						<i class="iconfont icon-wechatpay"></i>
					</div>
				</div>
        <div class="total-box">
          <p class="total-money">共{{cepingList.length}}件商品，商品总金额: ¥ {{totalPrice}}</p>
          <p class="settlement">应付：<span class="red">¥{{totalPrice}}</span></p>
          <p class="username">购买账号：{{userInfo.userName}}</p>
          <div class="settle-btn" @click="pay">提交订单</div>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import headerNav from "../components/HeaderNav";
import axios from "axios";
export default {
  name: "settlement",
  data() {
    return {
      cepingList: [],
      cepingIdList: [],
      totalPrice: 0, //商品总额
      payPrice: 0 ,//应付金额
      userInfo: "",
      payType: ""
    };
  },
  created() {
    this.cepingList = JSON.parse(localStorage.getItem("cartList"));
    this.userInfo = this.$store.state.userInfo;
    for(let item of this.cepingList){
      this.cepingIdList.push(item.id)
    }
  },
  methods: {
    pay: function(){
      let data = {
        cepingId: this.cepingIdList,
        num: this.cepingList.length
      }
      if(!this.payType){
        this.$message({
          type: "error",
          message: "请选择支付方式"
        })
        return;
      }
      if(this.payType == 'alipay'){
        axios.defaults.headers.post["Content-Type"] = "text/html;charest=utf-8"
        axios.post(`ceping/purchase`, data)
        .then(res => {
          console.log(res)
          const a = document.createElement('a');
          a.id = 'alipay-form'
          a.innerHTML = res.data.data;
          document.body.appendChild(a);
          let form = document.getElementById("alipay-form").childNodes[0]
          form.target = '_blank'
          form.submit()
          document.body.removeChild(a)
        }).catch(err => {
          if(err.data.msg){
              this.$message({
              type: "error",
              message: err.data.msg
            })
            }else{
              this.$message({
                type: "error",
                message: "生成订单失败，请稍后重试！"
              })
            }
        })
      }
    },
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.settlement-page {
  width: 100%;
  min-height: 100%;
  background-color: @main-color-bg;
  padding-top: 60px;
  padding-bottom: 25px;
  position: relative;
  z-index: 1;
  .red {
    color: red;
  }
  .banner-bg {
    width: 100%;
    height: 150px;
    margin-top: 0;
    position: absolute;
    z-index: -1;
    img {
      width: 100%;
      height: 150px;
    }
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    margin-top: 45px;
    height: calc(100% - 45px);
    .top {
      height: 30px;
      line-height: 30px;
      .title {
        font-size: 30px;
        display: inline-block;
      }
      .sub-title {
        margin-left: 100px;
        display: inline-block;
      }
      .right {
        float: right;
      }
    }
    .intro-box {
      width: 1200px;
      // height: calc(100% - 200px);
      margin: 0 auto;
      margin-top: 40px;
      margin-bottom: 20px;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      position: absolute;
      .title {
				line-height: 30px;
				font-size: 14px;
				color: @main-color-text;
			}
			.goodslist {
				width: 100%;
				padding: 10px 20px;
				background-color: @main-color-bg;
				.item {
					width: 100%;
					margin-bottom: 20px;
					display: inline-block;
					img {
						float: left;
						width: 160px;
						height: 80px;
						border-radius: 4px;
						margin-right: 20px;
					}
					.name {
						display: inline-block;
						padding-top: 15px;
					}
					.price {
						float: right;
						color: red;
						line-height: 80px;
						margin-right: 100px;
					}
				}
			}
			.pay-type {
				padding: 10px 0;
				.title {
					line-height: 40px;
        }
        .alipay {
          margin-right: 20px;
        }
				.icon-box {
					width: 148px;
					height: 48px;
					line-height: 48px;
					padding-left: 30px;
					display: inline-block;
					cursor: pointer;
					position: relative;
					input[type="radio"] {
            width: 148px;
						height: 48px;
            border: 1px solid @main-color-border;
            display: inline-block;
            cursor: pointer;
            margin: 0;
						-webkit-appearance: none;
            background: url("../assets/images/icon-normal.png") no-repeat;
            background-position: top right;
            z-index: 1;
            position: absolute;
            top: 0;
            left: 0;
					}
					input[type="radio"]:checked {
            background: url("../assets/images/icon-select.png") no-repeat;
            background-position: top right;
            z-index: 1;
            border: 1px solid green;
          }
					i {
						font-size: 26px;
						position: absolute;
            top: 0;
					}
					.icon-checked {
            color: #eaeaea;
            position: absolute;
            top:0;
            right: 0;
					}
					.icon-alipay {
            color: rgb(20, 161, 252);
					}
					.icon-wechatpay {
						color: rgb(65, 176, 53);
					}
				}
			}
      .total-box {
        float: right;
        .total-money {
          .red {
            color: red;
            font-size: 16px;
            line-height: 30px;
          }
        }
        .username {
          font-size: 12px;
          color: @main-color-gray;
        }
        .settle-btn {
          float: right;
          width: 112px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          background: rgba(219, 53, 41, 1);
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>


