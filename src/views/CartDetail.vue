<template>
  <div class="cart-page">
    <headerNav></headerNav>
    <div class="banner-bg">
      <img src="../assets/images/bg_02.png" alt="">
    </div>
    <div class="container">
      <div class="top">
        <div class="title">我的购物车</div>
        <div class="sub-title">共{{cepingList.length}}门，已选择{{checkedIdList.length}}门</div>
        <div class="right">我的订单中心</div>
      </div>
      <div class="intro-box">
        <table class="table">
          <thead>
            <tr>
              <td style="width:80px">
                <div>
                  <input type="checkbox" :checked="isCheckAll"  @click="checkAll($event)">
                  <span class="checkall">全选</span>
                </div>
              </td>
              <td>测评课程</td>
              <td>金额</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cepingList" :key="item.id">
              <td style="width:80px">
                <input :checked="item.isChecked" type="checkbox" @click="checkOne($event, item.id)">
              </td>
              <td>
                <img :src="item.picAll" alt="">
                <div class="name">{{item.cepingName}}</div>
              </td>
              <td class="red">¥ {{item.price}}</td>
              <td class="red"><i class="iconfont icon-delete" @click="del(item.id)"></i></td>
            </tr>
          </tbody>
        </table>
        <div class="total-box">
          <div class="total-money">
            总计金额:
            <div class="red">¥{{totalPrice}}</div>
          </div>
          <div class="settle-btn">去结算</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav";
export default {
  name: "cart",
  data() {
    return {
      cepingList: [],
      totalPrice: 0,
      isCheckAll: false,
      isChecked: false,
      checkedIdList: []
    };
  },
  created() {
    this.getEvaluationList(2);
  },
  methods: {
    getEvaluationList: function(index) {
      this.$store
        .dispatch("EVALUATION_LIST", { cepingItem: index })
        .then(res => {
          this.cepingList = res.data;
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
              message: "获取数据失败"
            });
          }
        });
    },
    //全选
    checkAll(e) {
      var checkAllItem = e.target;
      this.checkedIdList = [];
      if (checkAllItem.checked) {
        for (let item of this.cepingList) {
          item.isChecked = true;
          this.checkedIdList.push(item.id);
          this.totalPrice += Number(item.price);
        }
        this.isCheckAll = true;
      } else {
        for (let item of this.cepingList) {
          item.isChecked = false;
        }
        this.totalPrice = 0;
        this.isCheckAll = false;
        this.checkedIdList = [];
      }
      // console.log("cepingList", this.cepingList);
      // console.log("checkIdList", this.checkedIdList);
    },
    //单选
    checkOne(e, id){
      let checkOneItem = e.target;
      if(checkOneItem.checked == true){
        for(var item of this.cepingList){
          if(item.id == id){
            this.checkedIdList.push(item.id)
            item.isChecked = true
          }
        }
        if(this.cepingList.length == this.checkedIdList.length){
          this.isCheckAll = true;
        }
      }else {
        for(var item of this.cepingList){
          if(item.id == id){
            item.isChecked = false;
            let index = this.checkedIdList.indexOf(id)
            this.checkedIdList.splice(index, 1)
          }
        }
        this.isCheckAll = false
      }
      // console.log("cepingList", this.cepingList);
      // console.log("checkIdList", this.checkedIdList);
    },

    del(id) {
      console.log(id);
    }
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.cart-page {
  width: 100%;
  min-height: 100%;
  background-color: @main-color-bg;
  padding-top: 60px;
  padding-bottom: 25px;
  position: relative;
  z-index: 1;
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
      height: calc(100% - 200px);
      margin: 0 auto;
      margin-top: 40px;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      position: absolute;
      .table {
        width: 100%;
        thead {
          height: 50px;
          line-height: 50px;
          .checkall {
            margin-left: 6px;
            cursor: pointer;
          }
        }
        tbody {
          tr {
            td {
              line-height: 80px;
            }
          }
        }
        tr {
          border-bottom: 1px solid @main-color-border;
          td {
            color: @main-color-text;
            text-align: left;
            padding-left: 20px;
            vertical-align: middle;
            padding: 6px 10px;
            img {
              float: left;
              width: 160px;
              height: 80px;
              border-radius: 4px;
            }
            .name {
              display: inline-block;
              margin-left: 20px;
            }
          }
          .red {
            color: red;
          }
          .icon-delete {
            cursor: pointer;
          }
          /*
            input[type="checkbox"] {
              width: 20px;
              height: 20px;
              background-color: #fff;
              border: 1px solid @main-color-border;
              margin: 0;
              -webkit-appearance: none;  //清除复选框默认样式
              // background: #fff url(i/blue.png);  //复选框的背景图，就是上图
              vertical-align: middle;
            }
            input[type="checkbox"]:checked {
              background-position: -48px 0;
              border: 1px solid red;
            }
            input[type="checkbox"].active {
              border: none;
            }
            */
        }
        tr:hover {
          background-color: #fafafa;
        }
      }
      .total-box {
        float: right;
        margin-top: 20px;
        margin-bottom: 30px;
        .total-money {
          float: left;
          margin-right: 100px;
          padding-top: 10px;
          .red {
            color: red;
            font-size: 16px;
            line-height: 30px;
          }
        }
        .settle-btn {
          float: right;
          width: 112px;
          height: 54px;
          line-height: 54px;
          text-align: center;
          background: rgba(219, 53, 41, 1);
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

