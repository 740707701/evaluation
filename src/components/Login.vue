<template>
  <div class="login-form">
    <h4>登录</h4>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0" class="demo-ruleForm">
      <el-form-item label="" prop="number">
        <el-input v-model="loginForm.number" placeholder="请输入用户名/手机号" :maxlength="30"></el-input>
      </el-form-item>
    
      <el-form-item label="" prop="pwd">
        <el-input type="password" v-model="loginForm.pwd" placeholder="请输入密码" :maxlength="20" @keyup.enter.native="login('loginForm')"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <p class="forget" @click="forget">忘记密码</p>
      </el-form-item>
      <el-form-item label="" prop="">
        <div class="login-btn" @click="login('loginForm')">登录</div>
      </el-form-item>
      <el-form-item label="" prop="">
        <!-- <div class="other">
          <i class="iconfont icon-qq-login"></i>
          <i class="iconfont icon-weixin-login"></i>
        </div> -->
        <!-- <div class="register">
          没有账号？<span @click="register">注册</span>
        </div> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { setLoginChannel } from '@/utils/login-channel'
export default {
  name: "login",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号码不能为空"));
      } else if (
        value.length == 11 &&
        /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value)
      ) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {},
      redirect: "",
      rules: {
        number: [{required: true, message: "请输入手机号或学号", trigger: "blur"}],
        pwd: [{ required: true, message: '密码不能为空', trigger: "blur" }]
      }
    };
  },
  created() {
     this.redirect = decodeURIComponent(this.$route.query.redirect || "/");
  },
  methods: {
    login: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let loginInfo = {
            userName: this.loginForm.number,
            userPassword: this.loginForm.pwd
          };
          this.$store
            .dispatch("SSO", loginInfo)
            .then(res => {
              const token = res.data.data.token
              this.$store.dispatch('GETUSERINFO', token).then(res => {
                localStorage.setItem("userInfo",JSON.stringify(res.data.data));
                localStorage.setItem("isLogin", true);
                this.$store.commit("setUserInfo", res.data.data);
                // 设置官方登录标识
                setLoginChannel(true)
                
                //路由跳转 登录之前记录的路由
                this.$router.push({ path: this.redirect})
                this.$emit("hideLogin");
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
        } else {
          return false;
        }
      });
    },
    forget: function() {
      this.$emit("showForget");
    },
    register: function() {
      this.$emit("showRegister");
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
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/css/colors.less");
.login-form {
  width: 420px;
  // height: 450px;
  background-color: #fff;
  padding: 10px 30px;
  border-radius: 4px;
  box-shadow: 6px 0px 10px rgba(255, 255, 255, 0.3);
  position: absolute;
  top: 25%;
  left: 50%;
  margin-left: -210px;
  h4 {
    line-height: 70px;
    text-align: center;
    font-size: 20px;
    color: @main-color-blue;
  }
  input {
    &&::placeholder {
      font-size: 14px;
      color: @main-color-gray;
    }
  }
  .login-btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: @main-color-blue;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .other {
    text-align: center;
    padding: 0 50px;
    .icon-qq-login {
      margin-right: 30px;
    }
    .icon-weixin-login {
      margin-left: 30px;
    }
    i {
      font-size: 30px;
      color: #a2a9b8;
    }
  }
  .forget {
    float: right;
    cursor: pointer;
    color: rgba(162, 169, 184, 1);
  }
  .register {
    text-align: center;
    color: rgba(162, 169, 184, 1);
    span {
      color: @main-color-text;
      cursor: pointer;
    }
  }
}
</style>


