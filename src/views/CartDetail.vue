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
        <router-link to="/order">
          <div class="right">我的订单中心</div>
        </router-link>
      </div>
      <div class="intro-box">
        <div class="nodata" v-if="!cepingList.length">还没有加入任何商品到购物车~</div>
        <table class="table" v-if="cepingList.length">
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
            <tr v-for="item in cepingList" :key="item.cepingId">
              <td style="width:80px">
                <input :checked="item.isChecked" type="checkbox" @click="checkOne($event, item.cepingId)">
              </td>
              <td>
                <img :src="rootPath+item.pic" alt="">
                <div class="name">{{item.cepingName}}</div>
              </td>
              <td class="red">¥ {{item.price}}</td>
              <td class="red"><i class="iconfont icon-delete" @click="deleteCart(item)"></i></td>
            </tr>
          </tbody>
        </table>
        <div class="total-box" v-if="cepingList.length">
          <div class="total-money">
            总计金额:
            <div class="red">¥&nbsp;&nbsp;{{totalPrice.toFixed(2)}}</div>
          </div>
          <div class="settle-btn" :class="{'disabled': !checkedItemList.length}" @click="settlement">去结算</div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmDeleteCart">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav";
export default {
  name: "cart",
  data() {
    return {
      rootPath: "",
      cepingList: [],
      totalPrice: 0,
      isCheckAll: false,
      isChecked: false,
      checkedIdList: [],
      checkedItemList: [],
      dialogVisible: false,
      currentCart: ''
    };
  },
  created() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      this.$store
        .dispatch("CARTLIST")
        .then(res => {
          this.rootPath = res.data.rootPath;
          this.cepingList = res.data.cartListNormal;
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
              message: "获取购物车失败，请稍后重试"
            });
          }
        });
    },
    //全选
    checkAll(e) {
      var checkAllItem = e.target;
      this.checkedIdList = [];
      this.checkedItemList = [];
      if (checkAllItem.checked) {
        for (let item of this.cepingList) {
          item.isChecked = true;
          item.purchaseNum = 1; //购买的数量 目前默认为1
          this.checkedIdList.push(item.cepingId);
          this.checkedItemList.push(item);
          this.totalPrice += Number(item.price);
        }
        this.isCheckAll = true;
      } else {
        for (let item of this.cepingList) {
          item.isChecked = false;
          item.purchaseNum = 0; //购买的数量 目前默认为1 
        }
        this.totalPrice = 0;
        this.isCheckAll = false;
        this.checkedIdList = [];
        this.checkedItemList = [];
      }
      // console.log("cepingList", this.cepingList);
      // console.log("checkIdList", this.checkedIdList);
      // console.log("checkedItemList", this.checkedItemList);
    },
    //单选
    checkOne(e, id) {
      let checkOneItem = e.target;
      if (checkOneItem.checked == true) {
        for (var item of this.cepingList) {
          if (item.cepingId == id) {
            this.checkedIdList.push(item.cepingId);
            this.checkedItemList.push(item);
            item.isChecked = true;
            item.purchaseNum = 1; //购买的数量 目前默认为1
            this.totalPrice += Number(item.price);
          }
        }
        if (this.cepingList.length == this.checkedIdList.length) {
          this.isCheckAll = true;
        }
      } else {
        for (var item of this.cepingList) {
          if (item.cepingId == id) {
            item.isChecked = false;
            item.purchaseNum = 0; //购买的数量 目前默认为1
            let index = this.checkedIdList.indexOf(id);
            this.checkedIdList.splice(index, 1);
            this.checkedItemList.splice(index, 1);
            this.totalPrice -= Number(item.price);
          }
        }
        this.isCheckAll = false;
      }
      // console.log("cepingList", this.cepingList);
      // console.log("checkIdList", this.checkedIdList);
      // console.log("checkedItemList", this.checkedItemList);
    },
    deleteCart(currentCart){
      this.dialogVisible = true;
      this.currentCart = currentCart;
    },
    confirmDeleteCart() {
      let params = {
        cartId: this.currentCart.cartId
      };
      this.$store
        .dispatch("DELETECART", params)
        .then(res => {
          this.dialogVisible = false;
          this.currentCart.isChecked = false;
          this.currentCart.purchaseNum = 0; //购买的数量 目前默认为1
          let index = this.checkedIdList.indexOf(this.currentCart.cepingId);
          this.checkedIdList.splice(index, 1);
          this.checkedItemList.splice(index, 1);
          this.totalPrice -= Number(this.currentCart.price);
          this.cepingList.forEach((item, index) => {
            if(item.cartId == this.currentCart.cartId){
              this.cepingList.splice(index, 1)
            }
          })
          this.$message({
            type: "success",
            message: "删除成功"
          });
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
              message: "删除失败，请稍后重试"
            });
          }
        });
    },
    //结算
    settlement() {
      if (!this.checkedItemList.length) {
        return;
      }
      let cartData = {
        rootPath: this.rootPath,
        totalPrice: this.totalPrice.toFixed(2)
      };
      localStorage.setItem("cartList", JSON.stringify(this.checkedItemList));
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.$router.push({ name: "settlement" });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
  .nodata {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
  }
  .disabled {
    background-color: #eaeaea !important;
    cursor: no-drop !important;
  }
  .banner-bg {
    width: 100%;
    height: 150px;
    margin-top: 0;
    position: absolute;
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
    position: absolute;
    left: 50%;
    margin-left: -600px;
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
      min-height: calc(100% - 200px);
      margin: 0 auto;
      margin-top: 40px;
      margin-bottom: 20px;
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
          input[type="checkbox"] {
            width: 20px;
            height: 20px;
            background-color: #fff;
            border: 1px solid @main-color-border;
            margin: 0;
            -webkit-appearance: none; //清除复选框默认样式
            background: #fff url(../assets/images/checkbox.png); //复选框的背景图，就是上图
            vertical-align: middle;
          }
          input[type="checkbox"]:checked {
            background-position: 42px -23px;
          }
          input[type="checkbox"].active {
            border: none;
          }
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
          margin-right: 60px;
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
          height: 44px;
          line-height: 44px;
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

