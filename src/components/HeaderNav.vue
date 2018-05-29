<template>
  <el-container>
    <el-header class="header">
      <nav class="navbar">
        <div class="nav-left">
          <img src="../assets/images/demo/02.jpg" alt="" class="logo">
        </div>
        <ul class="nav-center">
          <li>
            <router-link to="/" exact>职业测评</router-link>
          </li>
          <li>
            <router-link to="/careerplan">大学规划与管理</router-link>
          </li>
          <li>
            <router-link to="/resume">我的简历</router-link>
          </li>
          <li>
            <router-link to="/industryintro">书籍库</router-link>
          </li>
        </ul>
        <div class="nav-right">
          <router-link to="cartDetail" v-if="isLogin"> 
            <el-button class="cart-btn" round size="small">
              <i class="el-icon-setting"></i>
              购物车
            </el-button>

          </router-link>
          <ul class="logout" v-if="!isLogin">
            <li>
              <div class="name" @click="login">登录</div>
              <!-- <router-link to="/login">登录</router-link> -->
            </li>
            <li>
              <div class="name" @click="register">注册</div>
              <!-- <router-link to="/register">注册</router-link> -->
            </li>
          </ul>
          <div class="login" v-if="isLogin">
            <el-badge is-dot class="badge">
              <router-link to="/news">
                <i class="el-icon-bell"></i>
              </router-link>
            </el-badge>
            <el-dropdown @command="dropdownEvent">
              <el-button class="avatar el-dropdown-link">
                <img src="../assets/images/demo/02.jpg" alt="">
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personalcenter">我的测评
                  <!-- <router-link to="/personalcenter"></router-link> -->
                </el-dropdown-item>
                <el-dropdown-item command="order">订单中心
                  <!-- <router-link to="/order"></router-link> -->
                  </el-dropdown-item>
                <el-dropdown-item command="setting">个人设置
                  <!-- <router-link to="/setting"></router-link> -->
                  </el-dropdown-item>
                <el-dropdown-item command="logout">退出账号</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </nav>
    </el-header>
    <div class="bg" v-if="showForgetPage || showLoginPage || showRegisterPage" @click.self="hide">
      <login v-if="showLoginPage" @showRegister="register" 
      @showForget="forget" @hideLogin="hideLogin" @click-self="showLoginPage=false"></login>
      <register v-if="showRegisterPage" @showLogin="login"></register>
      <forget v-if="showForgetPage" ></forget>
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
      showLoginPage: false,
      showRegisterPage: false,
      showForgetPage: false
    };
  },
  created() {
    // let isLogin = decodeURIComponent(this.$route.query.isLogin);
    // console.log('isLogin', isLogin)
    // if(!isLogin){
    //   this.showLoginPage = true
    // }
  },
  computed: {
    // isLogin (){
    //   return this.$store.state.isLogin
    // }, 等同于下面的写法
    ...mapState({
      isLogin(state){
        return state.isLogin
      }
    })
  },
  methods: {
    login: function() {
      this.showLoginPage = true;
      this.showRegisterPage = false;
      this.showForgetPage = false;
    },
    hideLogin: function() {
      this.showLoginPage = false;
    },
    register: function() {
      this.showRegisterPage = true;
      this.showLoginPage = false;
      this.showForgetPage = false;
    },
    forget: function() {
      this.showForgetPage = true;
      this.showRegisterPage = false;
      this.showLoginPage = false;
    },
    dropdownEvent: function(command){
      if(command == 'logout'){
        this.$store.commit("logout")
        this.$router.push({path: '/'})
      }else if(command == 'personalcenter'){
        this.$router.push({ path: '/personalcenter'})
      }else if(command == 'order'){
        this.$router.push({ path: '/order' })
      }else if(command == 'setting'){
        this.$router.push({ path: '/setting' })
      }
    },
    hide: function(){
      console.log('111')
      this.showLoginPage = false;
      this.showRegisterPage = false;
      this.showForgetPage = false;
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
  width: 100%;
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
        width: 140px;
        height: 48px;
        margin-top: 6px;
      }
    }
    .nav-center {
      display: inline-block;
      li {
        float: left;
        margin: 0 20px;
        a {
          height: 58px;
          line-height: 58px;
          padding: 0 10px;
          display: inline-block;
        }
        .router-link-active {
          color: @main-color-blue;
          border-bottom: 2px solid @main-color-blue;
        }
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
        img {
          width: 30px;
          height: 30px;
          border-radius: 30px;
          margin-top: 15px;
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

