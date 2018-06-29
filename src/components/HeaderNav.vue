<template>
  <el-container>
    <el-header class="header">
      <nav class="navbar">
        <div class="nav-left">
          <img src="../assets/images/logo.svg" alt="" class="logo">
        </div>
        <ul class="nav-center">
          <li @click="changeLogin(1, '/')" v-bind:class="{'active':$route.path=='/'}">职业测评</li>
          <!-- <li @click="changeLogin(2, '/careerplan')" v-bind:class="{'active':$route.path=='/careerplan'}">大学规划与管理</li> -->
          <li @click="changeLogin(3, '/resume')" v-bind:class="{'active':$route.path=='/resume'}">我的简历</li>
          <!-- <li @click="changeLogin(4, '/industryintro')" v-bind:class="{'active':$route.path=='/industryintro'}">书籍库</li> -->
        </ul>
        <div class="nav-right">
          <router-link to="/cartDetail" v-if="isLogin"> 
            <el-button class="cart-btn" round size="small">
              <i class="el-icon-setting"></i>
              购物车
            </el-button>
          </router-link>
          <ul class="logout" v-if="!isLogin">
            <li>
              <div class="name" @click="login">登录</div>
            </li>
            <li>
              <div class="name" @click="register">注册</div>
            </li>
          </ul>
          <div class="login" v-if="isLogin">
            <el-badge class="badge">
              <router-link to="/news">
                <i class="el-icon-bell"></i>
              </router-link>
            </el-badge>
            <el-dropdown @command="dropdownEvent">
              <el-button class="avatar el-dropdown-link">
                <img class="avatar-img" :src="userInfo.avatar" alt="">
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personalcenter">我的测评</el-dropdown-item>
                <el-dropdown-item command="myresume">我的简历</el-dropdown-item>
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
export default {
  name: "headerNav",
  props: {},
  data() {
    return { 
      showRegisterPage: false,
      showForgetPage: false
    };
  },
  created() {},
  computed: {
    // isLogin (){
    //   return this.$store.state.isLogin
    // }, 等同于下面的写法
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.userInfo,
      showLoginPage: state => state.showLoginPage
    })
  },
  methods: {
    login: function() {
      this.$store.commit("setShowLoginPage", true);
      this.showRegisterPage = false;
      this.showForgetPage = false;
    },
    hideLogin: function() {
      console.log('hide')
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
        this.$router.push({path: '/'})
      }else if(command == 'personalcenter'){
        this.$router.push({ path: '/personalcenter'})
      }else if(command == 'myresume'){
        this.$router.push({path: '/myresume'})
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
    changeLogin: function(id, router){
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if(userInfo){
        if(id == 1){
          this.$router.push({ path: '/' })
        }else if(id == 2){
          this.$router.push({ path: '/careerplan' })
        }else if (id == 3){
          this.$store.dispatch('CHECK_RESUME').then(res => {
            if(res.data == 0){
              this.$router.push({ path: '/resumeBg'})
            }else {
              this.$router.push({ path: '/resume' })
            }
          }).catch(err => {
            if(err.data.msg){
              this.$message({
                type: "error",
                message: err.data.msg
              })
            }else {
              this.$message({
                type: "error",
                message: "检查是否制作简历失败，请稍后重试"
              })
            }
          })
        }else if(id == 4){
          this.$router.push({ path: '/industryintro' })
        }
      }else {
        if(id == 1){
          this.$router.push({ path: '/' })
        }else {
          this.$router.push({ path: '/' , query: {redirect: router}})
          this.$store.commit("setShowLoginPage", true)
        }
      }
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
    color: @main-color-text;
  }
  .navbar {
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    .nav-left {
      float: left;
      margin-right: 30px;
      .logo {
        width: 181px;
        height: 60px;
      }
    }
    .nav-center {
      display: inline-block;
      li {
        float: left;
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
        color: @main-color-blue;
        border-bottom: 2px solid @main-color-blue;
      }
    }
    .nav-right {
      float: right;
      .cart-btn {
        float: left;
        margin-top: 15px;
        margin-right: 10px;
      }
      .badge {
        margin: -18px 20px 0 20px;
      }
      .el-icon-bell {
        font-size: 20px;
        margin-top: -2px;
      }
      .avatar {
        width: 30px;
        height: 30px;
        display: inline-block;
        padding: 0;
        border: none;
        background-color: #fff;
        img,.avatar-img {
          width: 30px;
          height: 30px;
          border-radius: 30px;
          margin-top: 15px;
          background-color: #eaeaea;
          display: inline-block;
        }
      }
      .avatar:hover,
      .avatar:active,
      .avatar:visited {
        background-color: transparent;
        font-weight: bold;
      }
      .login,
      .logout {
        float: left;
      }
      .logout {
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

