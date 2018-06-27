<template>
  <div class="order-page">
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane label="所有订单" name="first">
        <div class="order-list">
          <div class="nodata" v-if="!allOrderList.length">还没有任何订单哦~</div>
          <table class="table">
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
            <tbody>
              <tr class="tr-split"></tr>
              <tr class="tr-head">
                <td colspan="7">
                  <span class="date">2018-06-27</span>
                  <span>订单号：18149736446474484847488</span>
                  <i class="iconfont icon-delete"></i>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="item">
                    <img src="" alt="">
                    <div class="name">APP界面UI网页手机iPhone展示样机MOCKUP智能贴图PSD设计模板素材</div>
                  </div>
                </td>
                <td>¥20.00</td>
                <td> ×1</td>
                <td class="border-right">¥20.00</td>
                <td class="border-right">
                  <div>交易成功</div>
                  <div class="refund">退款</div>
                </td>
                <td class="border-right">张三三</td>
                <td>
                  <div>序列号</div>
                  <p>426MRWHQ457359</p>
                  <div class="operation-btn copy-btn" 
                    v-clipboard:copy="serialNo"
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
          <div class="nodata" v-if="!payOrderList.length">还有相关订单哦~</div>
          <table class="table">
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
            <tbody>
              <tr class="tr-split"></tr>
              <tr class="tr-head">
                <td colspan="7">
                  <span class="date">2018-06-27</span>
                  <span>订单号：18149736446474484847488</span>
                  <i class="iconfont icon-delete"></i>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="item">
                    <img src="" alt="">
                    <div class="name">APP界面UI网页手机iPhone展示样机MOCKUP智能贴图PSD设计模板素材</div>
                  </div>
                </td>
                <td>¥20.00</td>
                <td> ×1</td>
                <td class="border-right">¥20.00</td>
                <td class="border-right">
                  <div>等待买家付款</div>
                </td>
                <td class="border-right">张三三</td>
                <td>
                  <div>待付款</div>
                  <div class="operation-btn pay-btn">立即付款</div>                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "order",
  data() {
    return {
      activeName: "first",
      allOrderList: [],
      payOrderList: [],
      serialNo: '123',
    };
  },
  created(){},
  methods: {
    tabsClick: function(tab, event){
      let tabIndex = tab.index
      if(tabIndex == 0){
        // this.getAllOrder()
      }else if(tabIndex == 1){
        // this.getPayOrder()
      }
    },
    getAllOrder(){
      let data = {}
      this.$store.dispatch('ORDERLIST', data).then(res => {
        this.allOrderList = res.data.data
      }).catch(err => {
        if(err.data.msg){
            this.$message({
            type: "error",
            message: err.data.msg
          })
          }else{
            this.$message({
              type: "error",
              message: "获取订单信息失败，请稍后重试"
            })
          }
      })
    },
    getPayOrder(){
      let data = {}
      this.$store.dispatch('ORDERLIST', data).then(res => {
        this.payOrderList = res.data.data
      }).catch(err => {
        if(err.data.msg){
            this.$message({
            type: "error",
            message: err.data.msg
          })
          }else{
            this.$message({
              type: "error",
              message: "获取订单信息失败，请稍后重试"
            })
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
    color: #aaa!important;
  }
  .order-list {
    padding-bottom: 20px;
    .table {
      width: calc(100% - 30px);
      margin: 0 auto;
      border-collapse: collapse;
      .border-right {
        border-right: 1px solid #CBEAF9;
      }
      thead {
        height: 40px;
        line-height: 40px;
        background-color: #FAFAFA;
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
        background-color: #CBEAF9;
        color: #A2A9B8;
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
          border: 1px solid #CBEAF9;
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
              }
            }
            .operation-btn {
              width: 60px;
              height: 30px;
              line-height: 30px;
              font-size: 12px;
              text-align: center;
              border-radius: 4px;
              cursor: pointer;
              margin-top: 6px;
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

