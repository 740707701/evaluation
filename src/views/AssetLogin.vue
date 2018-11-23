<template>
  <div class="asset-login-container" 
    :style="getBackgroundStyle">
    <div class="logo-container">
      <img 
        :src="configs.schoolLogo" 
        width="100%" 
        height="100%" 
        alt="">
    </div>
    <div class="title-container">
      <div class="main-title">
        {{configs.schoolTitle}}
      </div>
      <div class="sub-title">
        职业测评与大学规划管理系统
      </div>
    </div>
    <div class="login-container">
      <p class="welcome-title">Hello!</p>
      <p class="welcome-sub-title">
        欢迎您登录
        <span class="school-title">{{configs.schoolTitle}}</span>
        职业测评与大学规划管理系统
      </p>
      <el-form>
        <el-form-item
          label-width="50px">
          <div 
            slot="label" 
            class="item-title">账号</div>
          <br>
          <el-input 
            class="item-content" 
            type="text" 
            placeholder="请输入手机号/学号"  
            max="30" 
            size="small" 
            v-model="loginForm.account">
          <i 
            slot="suffix" 
            v-if="loginForm.account && loginForm.account.indexOf(' ') === -1" 
            style="color: #54cb9c;" 
            class="el-icon-success el-input__icon"></i>  
        </el-input>
        </el-form-item>
        <el-form-item 
          label-width="50px">
          <div 
            slot="label" 
            class="item-title">密码</div>
          <el-input 
            class="item-content" 
            type="password" 
            placeholder="请输入密码" 
            max="30" 
            size="small" 
            v-model="loginForm.password"
            @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-checkbox 
            v-model="loginForm.remember">记住密码</el-checkbox>
          <span class="forgot-pwd" @click="showForget">忘记密码?</span>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button 
            class="login-btn" 
            type="primary"  
            @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mask-bg" @click.self="showForgetPage = false" v-if="showForgetPage">
      <forget @hideLogin="hideForgot"></forget>
    </div>
  </div>
</template>

<script>
import{ setLoginChannel } from '@/utils/login-channel'
import Forget from "@/components/Forget.vue";
export default {
  name: 'AssetLogin',
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
        remember: false
      },
      showForgetPage: false,
      configs: {}
    }
  },
  computed: {
    getBackgroundStyle() {
      if (this.configs.schoolLoginbgpic) {
        return `background-image: url(${this.configs.schoolLoginbgpic})`;
      }
    }
  },
  created() {
    this.redirect = decodeURIComponent(this.$route.query.redirect || "/");
    // const isUwoPaiDomain = location.href.indexOf('uwopai') > -1 
    //                        ||
    //                        location.href.indexOf('localhost') > -1
    // if (isUwoPaiDomain) {
    //   this.$router.push('/')
    // }
    this.getConfigs()
  },
  methods: {
    hideForgot() {
      this.showForgetPage = false;
    },
    showForget() {
      this.showForgetPage = true
    },
    getConfigs() {
      this.$store.dispatch('SCHOOL_LOGIN_INFO').then(responseTxt => {
        this.configs = responseTxt.data.data
      })
    },
    trim(str,is_global) {
      var result;
      result = str.replace(/(^\s+)|(\s+$)/g,"");
      if(is_global.toLowerCase()==="g")
      {
        result = result.replace(/\s/g,"");
        }
      return result;
    },
    //购物车
    getCartCount(){
      this.$store.dispatch('CARTLIST').then(res => {
        let count = res.data.cartListNormal.length || 0;
        this.$store.commit("setCartCount", count)
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      if (!this.loginForm.account) {
        this.$message.warning('请输入账号！')
        return
      } 
      if (this.trim(this.loginForm.account, 'g') !== this.loginForm.account) {
        this.$message.warning('账号不能包含空格！')
        return
      }
      if (!this.loginForm.password) {
        this.$message.warning('请输入密码！')
        return
      }
      if (this.trim(this.loginForm.password, 'g') !== this.loginForm.password) {
        this.$message.warning('密码不能包含空格！')
        return
      }
      const loginInfo = {
        userName: this.loginForm.account,
        userPassword: this.loginForm.password
      };
      this.$store
        .dispatch("SSO", loginInfo)
        .then(res => {
          const token = res.data.data.token
          this.$store.dispatch('GETUSERINFO', token).then(res => {
            localStorage.setItem("userInfo",JSON.stringify(res.data.data));
            localStorage.setItem("isLogin", true);
            this.$store.commit("setUserInfo", res.data.data);
            // 设置非官方登录标识
            setLoginChannel(false)

            // this.getCartCount()
            //路由跳转 登录之前记录的路由
            this.$router.push({ path: this.redirect})
          }).catch(err => {
            if(err.data){
              this.$message({type: 'error', message: res.data.msg})
              } else {
              this.$message({type: 'error', message: '获取用户信息失败，请稍后重试！'})
            }
          })
        })
        .catch(err => {
          console.log(err)
          if (err.data.msg) {
            this.$message({type: "error", message: err.data.msg});
          } else {
            this.$message({type: "error",  message: "登录失败，请稍后重试！"});
          }
        });
    }
  },
  components: {
    Forget
  }
}
</script>

<style lang="less" scoped>
  .asset-login-container {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url('/static/assetLogin/bg.png');
    background-size: 100% 100%;
    overflow: auto;
    .logo-container {
      width: 120px;
      height: 120px;
      margin: 20px auto 0 auto;
    }
    .title-container {
      text-align: center;
      color: #333333;
      .main-title {
        font-size: 75px;
        font-weight: 800;
        margin-top: 20px;
        letter-spacing: 6px;
      }
      .sub-title {
        font-size: 30px;
        margin-top: 30px;
      }
    }
    .login-container {
      width: 380px;
      margin: 30px auto 20px auto;
      background:rgba(255,255,255,.8);
      padding: 10px 20px;
      border-radius: 4px;
      & /deep/ .el-form-item {
        margin-bottom: 0px;
      }
      & /deep/ .el-form-item__content {
        margin-left: 0 !important;
      }
      & /deep/ .el-form-item__label {
        text-align: left;
        color: #999999;
      }
      .welcome-title {
        color:#111A39;
      }
      .welcome-sub-title {
        color: #999999;
        .school-title {
          color: #318ef2;
        }
      }
      .forgot-pwd {
        float: right;
        color: #333;
        cursor: pointer;
      }
      .login-btn {
        margin-top: 10px;
        padding: 10px 40px;
      }
    }
    .mask-bg {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 21;
    }
  }
</style>