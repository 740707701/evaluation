<template>
  <div class="forget">
    <div class="forget-form" v-show="!showReset">
      <h4>忘记密码</h4>
      <el-form :model="forgetForm" :rules="forgetRules" ref="forgetForm" label-width="0" class="demo-ruleForm">
        <el-form-item label="" prop="phone">
          <el-input v-model="forgetForm.phone" placeholder="请输入手机号" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="" prop="captcha" class="captcha-box">
          <el-input class="captcha-input" v-model="forgetForm.captcha" placeholder="请输入验证码" :maxlength="6"></el-input>
          <div class="captcha-btn" @click="getCaptcha">
            <span  class="tip" v-if="!sendMsgDisabled && !reGet">发送验证码</span>
            <span  class="tip" v-if="!sendMsgDisabled && reGet">重新获取</span>
            <span  class="tip" v-if="sendMsgDisabled">{{rTime+'秒后重新获取'}}</span>
          </div>
        </el-form-item>
        <el-form-item label="" prop="">
          <div class="next-btn" @click.self="next('forgetForm')">下一步</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="reset-form" v-show="showReset">
      <h4>重置密码</h4>
      <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="0" class="demo-ruleForm">
        <el-form-item label="" prop="mobile">
          <el-input v-model="resetForm.mobile" placeholder="请输入手机号" :maxlength="11" disabled></el-input>
        </el-form-item>
        <el-form-item label="" prop="pwd">
          <el-input type="password" v-model="resetForm.pwd" placeholder="请设置新密码" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="" prop="repwd">
          <el-input type="password" v-model="resetForm.repwd" placeholder="确认新密码" :maxlength="20" @keyup.enter.native="post('resetForm')"></el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <div class="next-btn" @click="post('resetForm')">提交</div>
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
      const validateRepwd = (rule, value, callback) => {
        if(!value){
          callback(new Error("请再次输入密码"));
        }else if(value != this.resetForm.pwd){
          callback(new Error("两次输入密码不一致"));
        }else {
          callback();
        }
      };
      return {
        reGet: false, // 重新获取
        rTime: 60, // 发送验证码倒计时
        sendMsgDisabled: false, // 发送验证码按钮状态
        showReset: false,
        forgetForm: {},
        resetForm: {},
        forgetRules: {
          phone: [{validator: validatePhone, trigger: "blur"}],
          captcha: [{required: true, message: "验证码不能为空", trigger: "blur"}],
        },
        resetRules: {
          mobile: [{validator: validatePhone, trigger: "blur"}],
          pwd: [{validator: validatePwd, trigger: "blur"}],
          repwd: [{validator: validateRepwd, trigger: "blur"}]
        },
        
      }
    },
    created(){},
    methods: {
      getCaptcha: function(){
        let reg = /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
        if(!this.forgetForm.phone){
          this.$message({type: "error", message: "请输入手机号"})
          return
        }
        if(reg.test(this.forgetForm.phone)){
          let data = {
            phoneNum: this.forgetForm.phone
          }
          this.$store.dispatch('VERIFICATION_CODE', data).then(res => {
             // 倒计时
            let that = this;
            that.sendMsgDisabled = true;
            let rTime = that.rTime;
            let interval = window.setInterval(() => {
              if (--that.rTime <= 0) {
                that.rTime = rTime;
                that.sendMsgDisabled = false;
                that.reGet = true; // 重新获取按钮
                window.clearInterval(interval);
              }
            }, 1000);
            this.$message({message: "获取验证码成功！", type: "success"})
          }).catch(err => {
            if(err.data.msg){
                this.$message({message: err.data.msg, type: "error"})
              }else {
                this.$message({message: "获取验证码失败,请稍后重试！", type: "error"})
              }
          })
        }
      },
      next: function(formName){
        this.resetForm.mobile = this.forgetForm.phone
        this.$refs[formName].validate(valid => {
          if(valid){
            this.$store.dispatch("VERIFY_CODE", {
              "phoneNum": this.forgetForm.phone, 
              "code": this.forgetForm.captcha
            })
            .then(res => {
              this.$message({type: "success", message: "验证码校验通过！"})
              this.showReset = true;
            }).catch(error => {
              this.$message({type: "warning", message: "验证码错误！"})
            })
          }
        })
      },
      post: function(formName){
        this.$refs[formName].validate(valid => {
          if(valid){
            let resetInfo = {
              phoneNum: this.resetForm.mobile,
              userPassword: this.resetForm.pwd,
              code: this.forgetForm.captcha
            }
            this.$store.dispatch('UPDATE_PASSWORD', resetInfo).then(res => {
              this.$message({message: "修改成功！", type: "success"})
              this.$emit("hideLogin")
              this.$store.commit("logout")
              // 根据域名判断 退出之后跳转的页面
              // if (location.href.indexOf('www.uwopai') === -1) {
              //   this.$router.push({path: '/AssetLogin'})
              // }else {
              //   this.$router.push({path: '/'})
              // }
            }).catch(err => {
              if(err.data.msg){
                this.$message({message: err.data.msg, type: "error"})
              }else {
                this.$message({message: "修改密码失败,请稍后重试！", type: "error"})
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/colors.less');
  .forget-form, .reset-form {
    width: 420px;
    background-color: #fff;
    padding: 10px 30px;
    border-radius: 4px;
    box-shadow:6px 0px 10px rgba(255,255,255,0.3);
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
        .tip {
          font-size: 12px;
        }
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


