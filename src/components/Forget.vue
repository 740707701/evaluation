<template>
  <div class="bg">
    <div class="forget-form" v-if="!showReset">
      <h4>忘记密码</h4>
      <el-form :model="forgetForm" :rules="forgetRules" ref="forgetForm" label-width="0" class="demo-ruleForm">
        <el-form-item label="" prop="phone">
          <el-input v-model="forgetForm.phone" placeholder="手机号" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="" prop="captcha" class="captcha-box">
          <el-input class="captcha-input" v-model="forgetForm.captcha" placeholder="验证码" :maxlength="6"></el-input>
          <div class="captcha-btn">获取验证码</div>
        </el-form-item>
        <el-form-item label="" prop="">
          <div class="next-btn" @click="next">下一步</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="reset-form" v-if="showReset">
      <h4>重置密码</h4>
      <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="0" class="demo-ruleForm">
        <el-form-item label="" prop="phone">
          <el-input v-model="resetForm.phone" placeholder="手机号" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="resetForm.password" placeholder="请设置新密码" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password2">
          <el-input v-model="resetForm.password2" placeholder="确认新密码" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <div class="next-btn" @click="post">提交</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'forget',
    data (){
      const validatePhone = (rule, value, callback) => {
        if(!value){
          callback(new Error("手机号码不能为空"))
        }else if(value.length == 11 
        && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value)){
          callback();
        }else {
          callback(new Error("请输入正确的手机号"));
        }
      };
       const validatePwd = (rule, value, callback) => {
        if(!value){
          callback(new Error("密码不能为空"));
        }else {
          callback();
        }
      };
      const validatePwd2 = (rule, value, callback) => {
        if(!value){
          callback(new Error("请再次输入密码"));
        }else if(value != this.registerForm.pwd2){
          callback(new Error("两次输入密码不一致"));
        }else {
          callback();
        }
      };
      return {
        showReset: false,
        forgetRules: {
          phone: [{valuator: validatePhone, trigger: 'blur'}]
        },
        resetRules: {
           phone: [{valuator: validatePhone, trigger: 'blur'}],
           password:[{valuator: validatePwd, trigger: 'blur'}],
           password2: [{valuator: validatePwd2, trigger: 'blur'}]
        },
        forgetForm: {},
        resetForm: {}
      }
    },
    created(){},
    methods: {
      next: function(){
        this.showReset = true;
      },
      post: function(){}
    }
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/colors.less');
  .bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
  }
  .forget-form, .reset-form {
    width: 420px;
    background-color: #fff;
    padding: 10px 30px;
    border-radius: 4px;
    box-shadow:6px 0px 10px rgba(255,255,255,0.3);
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
    .captcha-box {
      .captcha-input {
        position: relative;
        page-break-after: 100px;
      }
      .captcha-btn {
        position: absolute;
        top: 2px;
        right: 1px;
        width: 100px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border: 1px solid @main-color-border;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
        background-color: #eee;
      }
    }
    .next-btn {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: @main-color-blue;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }

  }
</style>


