<template>
  <el-container>
    <el-header class="header">
      <nav class="navbar">
        <router-link to="/">
          <div class="nav-left">
            <img src="../assets/images/logo.png" alt="" class="logo">
          </div>
        </router-link>
        <ul class="nav-center">
          <li v-for="m in moduleList" :key="m.id" @click="changeLogin(m.id,m)" v-bind:class="{'active':$route.name==m.routerName || $route.name==m.routerName2 || $route.name==m.routerName3 || $route.name==m.routerName4}">{{m.moduleName}}</li>
        </ul>
        <div class="nav-right">
          <router-link to="/order" class="order-btn" v-if="isLogin">
            <el-button round size="small" icon="iconfont icon-myorder">我的订单</el-button>
          </router-link>
          <!-- <router-link to="/cartDetail" v-if="isLogin" class="cart-btn">
            <el-badge v-if="cartCount" :value="cartCount" :max="99">
              <el-button class="cart-btn" round size="small">
                <i class="iconfont icon-cart"></i>
                购物车
              </el-button>
            </el-badge>
            <el-button v-if="!cartCount" class="cart-btn" round size="small">
              <i class="iconfont icon-cart"></i>
              购物车
            </el-button>
          </router-link> -->
          <ul class="logout" v-if="!isLogin">
            <li>
              <div class="name" @click="login">登录</div>
            </li>
            <!-- <li>
              <div class="name" @click="register">注册</div>
            </li> -->
          </ul>
          <div class="login" v-if="isLogin">
            <router-link to="/news" class="news">
              <el-badge :is-dot="isNews" class="news-badge">
                消息<i class="iconfont icon-newslist"></i>
              </el-badge>
            </router-link>
            <div class="username" :title="userInfo.userName||userInfo.mobile">你好，{{userInfo.userName||userInfo.mobile}}</div>
            <el-dropdown @command="dropdownEvent">
              <el-button class="avatar el-dropdown-link">
                <el-badge :is-dot="isBuyed" >
                <i class="iconfont icon-user-outline" v-if="!userInfo.personHead"></i>
                  <img class="avatar-img" v-if="userInfo.personHead" :src="userInfo.personHead" alt="">
                </el-badge>
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personalcenter" class="dropdown-badge">
                  <el-badge :is-dot="isBuyed" >我的测评</el-badge>
                </el-dropdown-item>
                <el-dropdown-item command="myresume">我的简历</el-dropdown-item>
                <el-dropdown-item command="myplan">我的规划</el-dropdown-item>
                <el-dropdown-item command="order">订单中心</el-dropdown-item>
                <el-dropdown-item command="setting">个人资料</el-dropdown-item>
                <el-dropdown-item command="logout">退出账号</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </nav>
    </el-header>
    <div class="bg" v-if="showLoginPage || showRegisterPage || showForgetPage" @click.self="hide">
      <login v-if="showLoginPage " @showRegister="register" @showForget="forget" @hideLogin="hideLogin"></login>
      <register v-if="showRegisterPage" @showLogin="login" @hideLogin="hideLogin"></register>
      <forget v-if="showForgetPage" @hideLogin="hideLogin"></forget>
    </div>
  </el-container>
</template>
<script>
import login from "./Login.vue";
import register from "./Register.vue";
import forget from "./Forget.vue";
import { mapState } from 'vuex';
import { getLoginChannel, removeLoginChannel } from '@/utils/login-channel'
export default {
  name: "headerNav",
  data() {
    return { 
      showRegisterPage: false,
      showForgetPage: false,
      isBuyed: false,
      isNews: false,
      cartList: [],
      moduleList: []
    };
  },
  props: ["updateBuyed", "updateNews"],
  created() {
    if(this.$route.query.token){
      this.getUserInfo()
    }
    this.getModuleList()
    this.isBuyed =this.updateBuyed || false;
    this.isNews =this.updateNews || false;
    if(this.$store.state.isLogin){
      // this.getCartCount()
      this.getNewsList()
    }
  },
  computed: {
    // isLogin (){
    //   return this.$store.state.isLogin
    // }, 等同于下面的写法
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.userInfo,
      showLoginPage: state => state.showLoginPage,
      cartCount: state => state.cartCount
    })
  },
  methods: {
    getLoginChannel() {
      return getLoginChannel()
    },
    getUserInfo() {
      const token = this.$route.query.token
      this.$store.dispatch('GETUSERINFO', token).then(res =>{
        localStorage.setItem("userInfo",JSON.stringify(res.data.data));
        localStorage.setItem("isLogin", true);
        this.$store.commit("setUserInfo", res.data.data);
      }).catch(err =>{
        this.$message.error(err.data.msg)
      })
    },
    login: function() {
      this.$store.commit("setShowLoginPage", true);
      this.showRegisterPage = false;
      this.showForgetPage = false;
    },
    hideLogin: function() {
      this.$store.commit("setShowLoginPage", false);
      this.showRegisterPage = false;
      this.showForgetPage = false;
    },
    register: function() {
      this.showRegisterPage = true;
      this.$store.commit("setShowLoginPage", false);
      this.showForgetPage = false;
    },
    forget: function() {
      this.showForgetPage = true;
      this.showRegisterPage = false;
      this.$store.commit("setShowLoginPage", false);
    },
    dropdownEvent: function(command){
      if(command == 'logout'){
        this.$store.commit("logout")
        // getLoginChannel()
        // "true" 表示从官方登录进来的渠道退出
        // "false" 表示非官方登录进来的渠道退出
        // console.log('getLoginChannel', getLoginChannel(), typeof(getLoginChannel()))
        
        if (location.href.indexOf('www.uwopai') === -1) {
          this.$router.push({path: '/AssetLogin'})
        }else {
          this.$router.push({path: '/'})
        }
        // 移除登录渠道
        removeLoginChannel()
      }else if(command == 'personalcenter'){
        this.$router.push({ path: '/personalcenter'})
      }else if(command == 'myresume'){
        this.$router.push({path: '/myresume'})
      }else if(command == 'myplan'){
        this.$router.push({path: '/myplan'})
      }else if(command == 'order'){
        this.$router.push({ path: '/order' })
      }else if(command == 'setting'){
        this.$router.push({ path: '/setting' })
      }
    },
    hide: function(){
      this.$store.commit("setShowLoginPage", false)
      this.showRegisterPage = false;
      this.showForgetPage = false;
    },
    changeLogin: function(id, item){
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if(userInfo){
        if(id == 1){ // type: 1：免费, 0：收费
          if(item.type === 0){
            this.$router.push({ path: '/forbidden' })
          } else if(item.type === 1) {
            this.$router.push({ path: '/' })
          }
        }else if(id == 2) {
          if(item.type === 0){
            this.$router.push({ path: '/forbidden' })
          } else if(item.type === 1) {
            this.$router.push({ path: '/vocationCognize'})
          }
        }else if(id == 3){
          if(item.type === 0){
            this.$router.push({ path: '/forbidden' })
          } else if(item.type === 1) {
            let params = {
              userId: userInfo.id
            }
            this.$store.dispatch('PLANLIST', params).then(res => {
              if(res.data.length){
                this.$router.push({ path: '/termPlan' })
              }else {
                this.$router.push({ path: '/planEntry' })
              }
            }).catch(err => {
              if(err.data.msg){
                this.$message({type: "error", message: err.data.msg})
              }else {
                this.$message({type: "error", message: "检查是否添加过规划失败，请稍后重试！"})
              }
            })
          }
        }else if (id == 4){
          if(item.type === 0){
            this.$router.push({ path: '/forbidden' })
          } else if(item.type === 1) {
            this.$store.dispatch('CHECK_RESUME').then(res => {
              if(res.data == 0){
                this.$router.push({ path: '/resumeBg'})
              }else {
                this.$router.push({ path: '/resume' })
              }
            }).catch(err => {
              if(err.data.msg){
                this.$message({type: "error", message: err.data.msg})
              }else {
                this.$message({type: "error", message: "检查是否制作简历失败，请稍后重试"})
              }
            })
          }
        }else if(id == 5) {
          if(item.type === 0){
            this.$router.push({ path: '/forbidden' })
          } else if(item.type === 1) {
            this.$router.push({ path: '/practiceEmployment'})
          }
        }
      }else {
        if(id == 1){
          this.$router.push({ path: '/' })
        }else {
          this.$store.commit("setShowLoginPage", true)
        }
      }
    },
    //购物车
    getCartCount(){
      this.$store.dispatch('CARTLIST').then(res => {
        // console.log(res)
        let count = res.data.cartListNormal.length || 0;
        this.$store.commit("setCartCount", count)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取模块权限
    getModuleList() {
      this.$store.dispatch('PAGE_MODULE').then(res => {
        this.moduleList = res.data
        this.moduleList.map(item => {
          if(item.id === 1){
            item.routerName = 'courselist'
            item.routerName2 = 'coursedetail'
          } else if(item.id === 2) {
            item.routerName = 'vocationCognize'
          } else if (item.id === 3) {
            item.routerName = 'termPlan'
            item.routerName2 = 'careerplan'
            item.routerName3 = 'planEntry'
            item.routerName4 = 'planList'
          } else if(item.id === 4) {
            item.routerName = 'resume'
            item.routerName2 = 'resumeBg'
          } else if(item.id === 5){
            item.routerName = 'practiceEmployment'
          }
        })
      }).catch(err => {
        if(err.data.msg){
          this.$message({type: 'error', message: err.data.msg})
          }else {
          this.$message({type: 'error', message: '获取模块权限失败，请稍后重试！'})
        }
      })
    },
    // 获取消息列表
    getNewsList() {
      this.$store.dispatch('MSG_LIST').then(res => {
        const newsList = res.data
        if(newsList.length) {
          this.isNews = true
        }
      })
    }
  },
  components: {
    login,
    register,
    forget
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.header {
  min-width: 100%;
  background-color: #fff;
  box-shadow: 8px 0px 20px rgba(163, 185, 235, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  a {
    float: left;
    color: @main-color-text;
  }
  .navbar {
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    .nav-left {
      float: left;
      margin-right: 40px;
      .logo {
        width: 93px;
        height: auto;
        margin-top: 3px;
      }
    }
    .nav-center {
      float: left;
      li {
        float: left;
        font-size: 16px;
        padding: 0 10px;
        margin: 0 10px;
        line-height: 58px;
        cursor: pointer;
        a {
          height: 58px;
          line-height: 58px;
          padding: 0 10px;
          display: inline-block;
        }
      }
      .router-link-active, .active {
        font-weight: 600;
        color: @main-color-blue;
        border-bottom: 2px solid @main-color-blue;
      }
    }
    .nav-right {
      float: right;
      height: 60px;
      .cart-btn, .order-btn {
        float: left;
        margin-right: 10px;
      }
      .order-btn {
        margin-top: 10px;
      }
      & /deep/ .icon-myorder {
        color: #999;
        margin-right: 2px;
      }
      .cart-btn {
        margin-top: 12px;
      }
      .icon-newslist {
        color: #999;
        font-size: 18px;
      }
      .news {
        float: left;
        margin: 0 10px;
        .el-badge {
          height: 25px;
          line-height: 20px;
          & /deep/ .el-badge__content.is-fixed.is-dot {
            top: 2px;
            right: 8px;
          }
        }
      }
      .username {
        float: left;
        margin-right: 10px;
        min-width: 90px;
        max-width: 174px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .el-dropdown {
        float: right;
      }
      .avatar {
        width: 30px;
        height: 30px;
        display: inline-block;
        padding: 0;
        border: none;
        background-color: #fff;
        .icon-user-outline {
          font-size: 22px;
          color: #5497d5;
          border-radius: 50%;
        }
        img,.avatar-img {
          width: 30px;
          height: 30px;
          border-radius: 30px;
          background-color: #eaeaea;
          display: inline-block;
        }
        .el-icon-arrow-down {
          font-size: 16px;
          color: #333;
          margin-left: 5px;
        }
      }
      .avatar:hover,
      .avatar:active,
      .avatar:visited {
        background-color: transparent;
        font-weight: bold;
      }
      .login {
        height: 60px;
        line-height:60px;
        display: inline-block;
      }
      .logout {
        float: right;
        height: 60px;
        li {
          float: left;
          .name {
            line-height: 60px;
            padding: 0 10px;
            display: inline-block;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 21;
}
</style>

