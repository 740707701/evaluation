<template>
  <el-container>
    <el-header class="header">
      <nav class="navbar">
        <div class="nav-left">
          <img src="../assets/images/logo.svg" alt="" class="logo">
        </div>
        <ul class="nav-center">
          <!-- <li @click="changeLogin(1, '/')" v-bind:class="{'active':$route.path=='/'||$route.name=='coursedetail'}">职业测评</li>
          <li @click="changeLogin(2, '/termPlan')" v-bind:class="{'active':$route.path=='/careerplan'||$route.path=='/termPlan'||$route.path=='/planEntry'}">大学规划与管理</li>
          <li @click="changeLogin(3, '/resume')" v-bind:class="{'active':$route.path=='/resume'}">我的简历</li> -->
          <!-- <li @click="changeLogin(4, '/industryintro')" v-bind:class="{'active':$route.path=='/industryintro'}">书籍库</li> -->
          <!-- <li @click="changeLogin(5, '/vocationCognize')" v-bind:class="{'active':$route.path=='/vocationCognize'}">行业与职业认知</li>
          <li @click="changeLogin(6, '/practiceEmployment')" v-bind:class="{'active':$route.path=='/practiceEmployment'}">实习与就业</li> -->
          <li v-for="m in moduleList" :key="m.id" @click="changeLogin(m.id, m.routerPath)" v-bind:class="{'active':$route.name==m.routerName}">{{m.moduleName}}</li>
        </ul>
        <div class="nav-right">
          <router-link to="/cartDetail" v-if="isLogin" class="cart">
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
            <router-link to="/news" class="news">
              <el-badge :is-dot="isNews">
                消息&nbsp;<i class="el-icon-bell"></i>
              </el-badge>
            </router-link>
            <div class="username">你好！{{userInfo.userName||userInfo.mobile}}</div>
            <el-dropdown @command="dropdownEvent">
              <el-button class="avatar el-dropdown-link">
                <el-badge :is-dot="isBuyed" >
                  <i class="iconfont icon-user" v-if="!userInfo.avatar"></i>
                  <img class="avatar-img" v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
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
    this.getModuleList()
    this.isBuyed =this.updateBuyed || false;
    this.isNews =this.updateNews || false;
    this.getCartCount();
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
    changeLogin: function(id, router){
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if(userInfo){
        if(id == 1){
          this.$router.push({ path: '/' })
        }else if(id == 2) {
          this.$router.push({ path: '/vocationCognize'})
        }else if(id == 3){
          let params = {
            userId: userInfo.id
          }
          this.$store.dispatch('PLANLIST', params).then(res => {
            console.log(res)
            if(res.data.length){
              this.$router.push({ path: '/termPlan' })
            }else {
              this.$router.push({ path: '/planEntry' })
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
                message: "检查是否添加过规划失败，请稍后重试！"
              })
            }
          })
        }else if (id == 4){
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
        }else if(id == 5) {
          this.$router.push({ path: '/practiceEmployment'})
        }
      }else {
        if(id == 1){
          this.$router.push({ path: '/' })
        }else {
          this.$router.push({ path: '/' , query: {redirect: router}})
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
          } else if(item.id === 2) {
            item.routerName = 'vocationCognize'
          } else if (item.id === 3) {
            item.routerName = 'termPlan'
          } else if(item.id === 4) {
            item.routerName = 'resume'
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
    display: inline-block;
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
      .cart {
        float: left;
        margin-top: 12px;
        margin-right: 10px;
      }
      .el-icon-bell {
        font-size: 20px;
      }
      .news {
        height: 30px;
        line-height: 30px;
        margin: 0 20px;
      }
      .username {
        line-height: 40px;
        margin-right: 20px;
        display: inline-block;
      }
      .avatar {
        width: 30px;
        height: 30px;
        display: inline-block;
        padding: 0;
        border: none;
        background-color: #fff;
        .icon-user {
          font-size: 28px;
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
        padding-top: 14px;
        display: inline-block;
      }
      .logout {
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

