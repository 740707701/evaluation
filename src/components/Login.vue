<template>
  <div class="login-form">
    <h4>登录</h4>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0" class="demo-ruleForm">
      <el-form-item label="" prop="number">
        <el-input v-model="loginForm.number" placeholder="学号/手机号" :maxlength="11"></el-input>
      </el-form-item>
    
      <el-form-item label="" prop="pwd">
        <el-input type="password" v-model="loginForm.pwd" placeholder="密码" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <p class="forget" @click="forget">忘记密码</p>
      </el-form-item>
      <el-form-item label="" prop="">
        <div class="login-btn" @click="login('loginForm')">登录</div>
      </el-form-item>
      <el-form-item label="" prop="">
        <div class="other">
          <i class="iconfont icon-qq-login"></i>
          <i class="iconfont icon-weixin-login"></i>
        </div>
        <div class="register">
          没有账号？<span @click="register">注册</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
        number: {
          resuired: true,
          message: "请输入手机号或学号",
          trigger: "blur"
        },
        password: [{ validator: validatePwd, trigger: "blur" }]
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
            data: this.loginForm.number,
            password: this.loginForm.pwd
          };
          this.$store
            .dispatch("LOGIN", loginInfo)
            .then(res => {
              // console.log(res.data.data)
              localStorage.userInfo = JSON.stringify(res.data.data);
              localStorage.isLogin = true;
              this.$store.commit("setUserInfo", res.data.data);
              
              //路由跳转 登录之前记录的路由
              console.log(this.redirect)
              this.$router.push({ path: this.redirect})
              this.$emit("hideLogin");
            })
            .catch(err => {
              console.log(err)
              // if (err.data.msg) {
              //   this.$message({
              //     message: err.data.msg,
              //     type: "error"
              //   });
              // } else {
              //   this.$message({
              //     message: "登录失败,请稍后重试",
              //     type: "error"
              //   });
              // }
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
    }
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
  top: 50px;
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
    text-align: right;
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


