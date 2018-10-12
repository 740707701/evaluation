<template>
  <div class="register-form">
    <h4>注册</h4>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="0" class="demo-ruleForm">
      <el-form-item label="" prop="phone">
        <el-input v-model="registerForm.phone" placeholder="手机号" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="" prop="authCode">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-input
              class="input-item auth-code-input"
              v-model="registerForm.authCode"
              placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="10">
            <el-button
              class="auth-code"
              :disabled="registerForm.authCodeBtnDisable"
              :class="{'auth-code-disable': registerForm.authCodeBtnDisable}"
              @click="getAuthCode">
              <div>{{registerForm.authCodeTxt}}</div>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="" prop="pwd">
        <el-input type="password" v-model="registerForm.pwd" placeholder="密码" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <p class="text">同意用户的
          <router-link target="_blank" to="/agreement">条款和条件</router-link>
          <!-- <span @click="agreement"></span> -->
        </p>
      </el-form-item>
      <el-form-item label="" prop="">
        <div class="register-btn" @click="register('registerForm')">注册</div>
        <p class="text login">已有账号? <span @click="login">去登录</span> </p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "register",
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
      registerForm: {
        authCode: '',
        authCodeTxt: '获取验证码',
        authCodeBtnDisable: false,
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        authCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    };
  },
  created() {},
  methods: {
    doLoginAction: function (params) {
      this.$store
        .dispatch("LOGIN", params)
        .then(res => {
          localStorage.setItem("userInfo",JSON.stringify(res.data.data));
          localStorage.setItem("isLogin", true);
          this.$store.commit("setUserInfo", res.data.data);
          
          //路由跳转 登录之前记录的路由
          console.log(this.redirect)
          this.$router.push({ path: this.redirect})
          this.$store.commit("setShowLoginPage", false);
        })
        .catch(err => {
          console.log(err)
          if (err.data.msg) {
            this.$message({
              message: err.data.msg,
              type: "error"
            });
          } else {
            this.$message({
              message: "登录失败，请稍后重试。",
              type: "error"
            });
          }
        });
    },
    getAuthCode: function () {
      if (!this.registerForm.phone) {
        this.$message({
          type: 'warning',
          message: '请填写手机号'
        })
        return
      }
      clearInterval(this.timer)
      this.registerForm.authCodeBtnDisable = true
      let time = 60 // 验证码1分钟倒计时
      this.timer = setInterval(() => {
        if (time <= 0) {
          this.registerForm.authCodeTxt = '重新发送'
          this.registerForm.authCodeBtnDisable = false
        } else {
          this.registerForm.authCodeBtnDisable = true
          this.registerForm.authCodeTxt = `(${time}s) 后重试`
          time = time - 1
        }
      }, 1000)
      const reg = {
        mobile: this.registerForm.phone
      }
      this.$store.dispatch("GETAUTHMSG", reg)
        .then(res => {
          this.$message({
            type: "success",
            message: "验证码发送成功，请注意查收！"
          })
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: "error",
            message: "验证码发送失败，请稍后重试！"
          })
        })
    },
    agreement: function() {
      this.$router.push("agreement");
    },
    login: function() {
      this.$emit("showLogin")
    },
    register: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("VALIDAUTHCODE", {
            "mobile": this.registerForm.phone, 
            "code": this.registerForm.authCode
          })
          .then(res => {
            this.$message({
              type: "success",
              message: "验证码校验通过"
            })
          })
          .then(() => {
            let reg = {
              "mobile": this.registerForm.phone,
              "password": this.registerForm.pwd
            };
            this.$store
              .dispatch("REGISTER", reg)
              .then(res => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "注册成功"
                })
                this.$emit("showLogin")
                let loginInfo = {
                  userNum: this.registerForm.phone,
                  password: this.registerForm.pwd
                };
                this.doLoginAction(loginInfo)
              })
              .catch(err => {
                console.log(err);
                if (err.data.msg) {
                  this.$message({
                    message: err.data.msg,
                    type: "error"
                  });
                } else {
                  this.$message({
                    message: "注册失败。",
                    type: "error"
                  });
                }
              })
          })
          .catch(error => {
            console.log(error)
            this.$message({
              type: "warning",
              message: "验证码校验未通过，请重新发送验证码！"
            })
          })
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/css/colors.less");
.register-form {
  width: 420px;
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
  .register-btn {
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
    i {
      font-size: 30px;
      margin-right: 20px;
      color: #a2a9b8;
    }
  }
  .text {
    text-align: left;
    cursor: pointer;
    color: rgba(162, 169, 184, 1);
    span, a {
      color: @main-color-blue;
    }
  }
  .login {
    text-align: right;
  }
  .auth-code {
    width: 100%;
  }
  .auth-code-disable {}
}
</style>


