<template>
  <div class="register-form">
    <h4>注册</h4>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="0" class="demo-ruleForm">
      <el-form-item label="" prop="number">
        <el-input v-model="registerForm.number" placeholder="学号" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="" prop="phone">
        <el-input v-model="registerForm.phone" placeholder="手机号" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="" prop="pwd">
        <el-input type="password" v-model="registerForm.pwd" placeholder="密码" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="" prop="pwd2">
        <el-input type="password" v-model="registerForm.pwd2" placeholder="确认密码" :maxlength="20"></el-input>
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
    const validatePwd2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value != this.registerForm.pwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {},
      rules: {
        number: [{ required: true, message: "学号不能为空", trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        pwd2: [{ validator: validatePwd2, trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    agreement: function() {
      this.$router.push("agreement");
    },
    login: function() {
      this.$emit("showLogin")
    },
    register: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let reg = {
            "mobile": this.registerForm.phone,
            "userNum": this.registerForm.number,
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
                  message: "注册失败",
                  type: "error"
                });
              }
            });
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
}
</style>


