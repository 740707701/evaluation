<template>
  <div class="order-page">
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane label="所有订单" name="first">
        <div class="order-list">
          <div class="nodata" v-if="!allOrderList.length">还没有任何订单哦~</div>
          <table class="table" v-if="allOrderList.length">
            <thead>
              <tr>
                <td>
                  <div class="item">商品信息</div>
                </td>
                <td>单价</td>
                <td>数量</td>
                <td>实付款</td>
                <td>交易状态</td>
                <td>收货人</td>
                <td>交易操作</td>
              </tr>
            </thead>
            <tbody v-for="order in allOrderList" :key="order.orderNo">
              <tr class="tr-split"></tr>
              <tr class="tr-head">
                <td colspan="7">
                  <span class="date">{{order.orderTime.slice(0, 10)}}</span>
                  <span>订单号：{{order.orderNo}}</span>
                  <!-- <i class="iconfont icon-delete"></i> -->
                </td>
              </tr>
              <tr v-for="item in order.applyList.slice(0,1)" :key="item.id">
                <td>
                  <div class="item">
                    <img :src="item.pic" alt="">
                    <div class="name">{{item.cepingName}}</div>
                  </div>
                </td>
                <td>¥{{item.purchasePrice}}</td>
                <td> ×{{item.purchaseNum}}</td>
                <td class="border-right">¥{{item.purchaseSumPrice}}</td>
                <td class="border-right" :rowspan="order.applyList.length">
                  <div v-if="item.state==3">交易成功</div>
                  <div v-if="item.state==0">待付款</div>
                  <div v-if="item.state==4">已关闭</div>
                  <div v-if="item.state==5">退款成功</div>
                  <div class="refund" v-if="item.state==3" @click="refund(order)">退款</div>
                </td>
                <td class="border-right" :rowspan="order.applyList.length">{{item.realName}}</td>
                <td>
                  <div>序列号</div>
                  <p>{{item.serialNo}}</p>
                  <div class="operation-btn copy-btn" v-if="item.serialNo"
                    v-clipboard:copy="item.serialNo"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">复制
                  </div>
                </td>
              </tr>
              <tr v-for="item in order.applyList.slice(1)" :key="item.id">
                <td>
                  <div class="item">
                    <img :src="item.pic" alt="">
                    <div class="name">{{item.cepingName}}</div>
                  </div>
                </td>
                <td>¥{{item.purchasePrice}}</td>
                <td> ×{{item.purchaseNum}}</td>
                <td class="border-right">¥{{item.purchaseSumPrice}}</td>

                <td>
                  <div>序列号</div>
                  <p>{{item.serialNo}}</p>
                  <div class="operation-btn copy-btn" v-if="item.serialNo"
                    v-clipboard:copy="item.serialNo"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">复制
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="second">
        <div class="order-list">
          <div class="nodata" v-if="!noPayOrder.length">还有相关订单哦~</div>
          <table class="table" v-if="noPayOrder.length">
            <thead>
              <tr>
                <td>
                  <div class="item">商品信息</div>
                </td>
                <td>单价</td>
                <td>数量</td>
                <td>实付款</td>
                <td>交易状态</td>
                <td>收货人</td>
                <td>交易操作</td>
              </tr>
            </thead>
            <tbody v-for="order in noPayOrder" :key="order.orderNo">
              <tr class="tr-split"></tr>
              <tr class="tr-head">
                <td colspan="7">
                  <span class="date">{{order.orderTime.slice(0, 10)}}</span>
                  <span>订单号：{{order.orderNo}}</span>
                  <!-- <i class="iconfont icon-delete"></i> -->
                </td>
              </tr>
              <tr v-for="item in order.applyList.slice(0,1)" :key="item.id">
                <td>
                  <div class="item">
                    <img :src="item.pic" alt="">
                    <div class="name">{{item.cepingName}}</div>
                  </div>
                </td>
                <td>¥{{item.purchasePrice}}</td>
                <td> ×{{item.purchaseNum}}</td>
                <td class="border-right">¥{{item.purchasePrice}}</td>
                <td class="border-right" :rowspan="order.applyList.length">
                  <div v-if="item.state==3">交易成功</div>
                  <div v-if="item.state==0">待付款</div>
                </td>
                <td :rowspan="order.applyList.length" class="border-right">{{item.realName}}</td>
                <td :rowspan="order.applyList.length">
                  <div class="operation-btn pay-btn" @click="pay(order)">立即付款</div>                  
                </td>
              </tr>
              <tr v-for="item in order.applyList.slice(1)" :key="item.id">
                <td>
                  <div class="item">
                    <img :src="item.pic" alt="">
                    <div class="name">{{item.cepingName}}</div>
                  </div>
                </td>
                <td>¥{{item.purchasePrice}}</td>
                <td> ×{{item.purchaseNum}}</td>
                <td class="border-right">¥{{item.purchasePrice}}</td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "order",
  data() {
    return {
      activeName: "first",
      allOrderList: [],
      noPayOrder: [],
      serialNo: ""
    };
  },
  created() {
    this.getAllOrder();
  },
  methods: {
    tabsClick(tab, event) {
      let tabIndex = tab.index;
      if (tabIndex == 0) {
        this.getAllOrder();
      } else if (tabIndex == 1) {
        this.getNopayOrder();
      }
    },
    getAllOrder() {
      let data = {};
      this.$store
        .dispatch("ORDERLIST", data)
        .then(res => {
          this.allOrderList = res.data || [];
        })
        .catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取订单信息失败，请稍后重试"
            });
          }
        });
    },
    getNopayOrder() {
      let data = {};
      this.$store
        .dispatch("NOPAYORDER", data)
        .then(res => {
          this.noPayOrder = res.data || [];
        })
        .catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取订单信息失败，请稍后重试"
            });
          }
        });
    },
    onCopy(e) {
      this.$message({
        message: "复制序列号成功",
        type: "success"
      });
    },
    onError(e) {
      this.$message({
        message: "复制序列号失败",
        type: "error"
      });
    },
    //去付款
    pay(order) {
      let payTitle = [];
      let totalPrice = 0;
      for (let item of order.applyList) {
        payTitle.push(item.cepingName);
        totalPrice += Number(item.purchaseSumPrice);
      }
      let data = {
        orderNo: order.orderNo,
        sumPrice: totalPrice,
        title: payTitle.join(",")
      };
      axios.defaults.headers.post["Content-Type"] = "text/html;charest=utf-8";
      axios
        .post(`ceping/purchase`, data)
        .then(res => {
          console.log(res);
          this.showPayDialog = true;
          const a = document.createElement("a");
          a.id = "alipay-form";
          a.innerHTML = res.data.data;
          document.body.appendChild(a);
          let form = document.getElementById("alipay-form").childNodes[0];
          form.target = "_blank";
          form.submit();
          document.body.removeChild(a);
        })
        .catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "生成订单失败，请稍后重试！"
            });
          }
        });
    },
    //退款
    refund(order) {
      let payTitle = [];
      let totalPrice = 0;
      for (let item of order.applyList) {
        payTitle.push(item.cepingName);
        totalPrice += Number(item.purchaseSumPrice);
      }
      let data = {
        orderNo: order.orderNo,
        sumPrice: totalPrice,
        title: payTitle.join(",")
      };
      this.$store.dispatch('REFUND', data).then(res => {
        console.log('退款成功！');
        this.getAllOrder()
      }).catch(err => {
        if (err.data.msg) {
          this.$message({
            type: "error",
            message: err.data.msg
          });
        } else {
          this.$message({
            type: "error",
            message: "退款失败，请稍后重试！"
          });
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/colors.less");
.order-page {
  .nodata {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
  }
  .gray {
    color: #aaa !important;
  }
  .order-list {
    padding-bottom: 20px;
    .table {
      width: calc(100% - 30px);
      margin: 0 auto;
      border-collapse: collapse;
      .border-right {
        border-right: 1px solid #cbeaf9;
      }
      thead {
        height: 40px;
        line-height: 40px;
        background-color: #fafafa;
        border: 1px solid @main-color-border;
        margin-bottom: 20px;
        td {
          padding: 0;
          text-align: center;
          .item {
            max-width: 300px;
          }
        }
      }
      .tr-head {
        height: 40px;
        line-height: 40px;
        background-color: #cbeaf9;
        color: #a2a9b8;
        td {
          text-align: left;
          padding: 0 0 0 20px;
          .date {
            margin-right: 20px;
          }
          .icon-delete {
            float: right;
            margin-right: 20px;
            cursor: pointer;
            color: #aaa;
          }
          .icon-delete:hover {
            color: @main-color-blue;
          }
        }
      }
      tbody {
        .tr-split {
          height: 20px;
        }
        tr {
          border: 1px solid #cbeaf9;
          td {
            padding: 15px;
            text-align: center;
            vertical-align: top;
            .item {
              float: left;
              max-width: 300px;
              img {
                float: left;
                width: 100px;
                height: 70px;
                background-color: lightgreen;
                margin-right: 15px;
              }
              .name {
                margin-left: 115px;
                line-height: 1.2;
                text-align: left;
                //英文强制换行
                white-space: normal;
                word-break: break-all;
              }
            }
            .operation-btn {
              width: 60px;
              height: 28px;
              line-height: 28px;
              font-size: 12px;
              text-align: center;
              border-radius: 4px;
              cursor: pointer;
              // margin-top: 10px;
              display: inline-block;
            }
            .copy-btn {
              color: #fff;
              background-color: @main-color-blue;
            }
            .pay-btn {
              color: @main-color-blue;
              border: 1px solid @main-color-blue;
            }
            .refund {
              color: @main-color-blue;
              cursor: pointer;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

