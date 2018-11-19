<template>
  <div class="asset-login-container" :style="getBackgroundStyle">
    <div class="logo-container">
      <img :src="configs.schoolLogo" width="100%" height="100%" alt="">
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
        职业与性格测评系统
      </p>

      <div class="item-container">
        <p class="item-title">账号</p>
        <el-input 
          class="item-content"
          type="text" 
          max="30"
          v-model="loginForm.account">
          <i slot="suffix" v-if="loginForm.account && loginForm.account.indexOf(' ') === -1" style="color: #54cb9c;" class="el-icon-success el-input__icon"></i>  
        </el-input>
      </div>

      <div class="item-container">
        <p class="item-title">密码</p>
        <el-input 
          class="item-content"
          type="text"
          max="30"
          v-model="loginForm.password"></el-input>
      </div>

      <div class="item-container">
        <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
      </div>

      <div class="item-container">
        <el-button 
          class="login-btn"
          type="primary" 
          @click="submitForm">登录</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import{ setLoginChannel } from '@/utils/login-channel'
export default {
  name: 'AssetLogin',
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
        remember: true
      },
      configs: {}
    }
  },
  computed: {
    getBackgroundStyle() {
      if (this.configs.schoolLoginbgpic) {
        return `background: url(${this.configs.schoolLoginbgpic}) cover`;
      }
    }
  },
  created() {
    this.redirect = decodeURIComponent(this.$route.query.redirect || "/");
    this.getConfigs()
  },
  methods: {
    getConfigs() {
      this.$store.dispatch('ASSET_LOGIN_CONFIG').then(responseTxt => {
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

            this.getCartCount()
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
  }
}
</script>

<style lang="less" scoped>
  .asset-login-container {
    width: 100%;
    height: 100%;
    position: fixed;
    background: url('/static/assetLogin/bg.png');
    background-size: cover;
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
      }
      .sub-title {
        font-size: 30px;
        margin-top: 30px;
      }
    }
    .login-container {
      width: 380px;
      margin: 30px auto 0 auto;
      background:rgba(255,255,255,.8);
      padding: 10px 20px;
      border-radius: 4px;
      .welcome-title {
        color:#111A39;
      }
      .welcome-sub-title {
        color: #999999;
        .school-title {
          color: #318ef2;
        }
      }
      .item-container {
        margin-top: 14px;
        .item-title {
          color: #999999;
          margin-bottom: 10px;
        }
        .item-content {
          & /deep/ .el-input__inner {
            height: 36px;
          }
        }
        .login-btn {
          margin-top: 20px;
          padding: 10px 40px;
        }
      }
    }
  }
</style>