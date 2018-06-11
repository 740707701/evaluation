<template>
  <div class="setting-page">
    <el-tabs>
      <el-tab-pane label="实名认证">
        <div class="setting-content">
          <el-form v-if="!userInfo.email" :model="userInfo" :rules="infoRules" ref="userInfo" label-width="100px" class="info-form">
            <div class="title">基本资料</div>
            <el-form-item label="姓名：" prop="userName">
              <el-input size="small" v-model="userInfo.userName" placeholder="请输入真实姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <div class="el-input sex-box" >
                  <input type="radio" name="sex" :checked="userInfo.sex==1" value="1" @click="userInfo.sex=1"/>
                  <label>男</label>  
                  <input type="radio" name="sex" :checked="userInfo.sex==2" value="2" @click="userInfo.sex=2"/>
                  <label>女</label> 
              </div>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
              <el-input size="small" v-model="userInfo.mobile" placeholder="请输入手机号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input size="small" v-model="userInfo.email" placeholder="请输入真实邮箱" :maxlength="20"></el-input>
              <div class="tag">请保证邮箱真实有效,以便接收测评报告。</div>
            </el-form-item>
            <el-form-item label="学号：" prop="userNum">
              <div>{{userInfo.userNum}}</div>
            </el-form-item>
            <div class="title">教育背景</div>
            <el-form-item label="学校名称：" prop="school" class="inline-box">
              <el-select size="small" v-model="userInfo.school" @change="chooseSchool" placeholder="请选择学校名称" >
                <el-option 
                v-for="item in schoolList"
                :key="item.id"
                :label="item.schoolName"
                :value="item.schoolName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业名称：" prop="classes" class="inline-box">
              <el-select size="small" v-model="userInfo.classes" @change="chooseClass" placeholder="请选择所在班级">
                <el-option 
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.className"></el-option>
              </el-select>
            </el-form-item>
            <div class="post-btn" @click="post('userInfo')">保存</div>
          </el-form>
          <el-form v-if="userInfo.email" :model="userInfo" :rules="infoRules"  label-width="100px" class="info-form">
            <div class="title">基本资料</div>
            <el-form-item label="姓名：" prop="userName">
              <div>{{userInfo.userName}}</div>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <div class="el-input sex-box" >
                  <label v-if="userInfo.sex==1">男</label>  
                  <label v-if="userInfo.sex==2">女</label> 
              </div>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
              <div>{{userInfo.mobile}}</div>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <div>{{userInfo.email}}</div>
            </el-form-item>
            <el-form-item label="学号：" prop="userNum">
              <div>{{userInfo.userNum}}</div>
            </el-form-item>
            <div class="title">教育背景</div>
            <el-form-item label="学校名称：" prop="school">
              {{userInfo.school}}
            </el-form-item>
            <el-form-item label="专业名称：" prop="classes">
              {{userInfo.classes}}
            </el-form-item>
          </el-form>
          <div class="account-form">
            <div class="title">账号安全</div>
            <div class="pwd">登录密码 <span class="modify" @click="showForget">修改</span></div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="bg" v-if="showForgetPage" @click.self="showForgetPage=false">
      <forget></forget>
    </div>
  </div>
</template>
<script>
  import forget from '../../components/Forget.vue'
  export default {
    name: 'setting',
    data(){
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
      const validateEmail = (rule, value, callback) => {
        if(!value){
          callback(new Error("邮箱不能为空"));
        }else if(/^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)){
          callback()
        }else {
          callback(new Error("请输入正确的真实邮箱"))
        }
      };
      return {
        userInfo: {},
        showForgetPage: false,
        schoolList: [],
        classList: [],
        school: '',
        classes: '',
        school_id: '',
        class_id: '',
        userInfo: {},
        infoRules: {
          userName: [{
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }],
          sex: [{
            required: true,
            message: "请选择性别",
            trigger: "blur"
          }],
          email: [{
            required: true,
            validator: validateEmail,
            trigger: "blur"
          }],
          mobile: [{
            required: true,
            validator: validatePhone,
            trigger: "blur"
          }],
          userNum: [{
            required: true,
          }],
          school: [{
            required: true,
            message: "请选择所在学校",
            trigger: "blur"
          }],
          classes: [{
            required: true,
            message: "请选择所在年级",
            trigger: "blur"
          }]
        },
      }
    },
    created(){
      this.userInfo = this.$store.state.userInfo;
      this.getSchoolList()
    },
    methods: {
      getSchoolList(){
        this.$store.dispatch('SCHOOL_LIST').then(res => {
          this.schoolList = res.data
        }).catch(err => {
          if(err.data.msg){
            this.$message({
              type: "error",
              message: err.data.message
            })
          }else {
            this.$message({
              type: "error",
              message: "获取个人资料信息失败,请稍后重试"
            })
          }
        })
      },
      chooseSchool(e){
        console.log(e)
        this.school = e;
        let schoolArr = this.schoolList.filter(item => {
          return item.schoolName == e
        });
        this.school_id = schoolArr[0].id
        console.log(this.school_id)
        this.getClassList()
      },
      chooseClass(e){
        this.class_id = e.id;
        this.class = e.className;
      },
      getClassList(){
        let params = {
          id: this.school_id
        }
        this.$store.dispatch('CLASS_LIST', params).then(res => {
          this.classList = res.data
        }).catch(err => {
          if(err.data.msg){
            this.$message({
              type: "error",
              message: err.data.message
            })
          }else {
            this.$message({
              type: "error",
              message: "获取个人资料信息失败,请稍后重试"
            })
          }
        })

      },
      post(formName){
        this.$refs[formName].validate(valid => {
          if(valid){
            this.$store.dispatch('USERINFO', this.userInfo).then(res => {
              localStorage.setItem("userInfo", JSON.stringify(res.data.data))
              this.$store.state.userInfo = res.data.data
              this.$message({
                type: "success",
                message: "个人资料信息保存成功!"
              })
            }).catch(err => {
              console.log(err)
              if(err.data.msg){
                this.$message({
                  type: "error",
                  message: err.data.message
                })
              }else {
                this.$message({
                  type: "error",
                  message: "提交个人资料信息失败,请稍后重试"
                })
              }
            })
          }else {
            return false
          }
        })
      },
      showForget(){
        this.showForgetPage = true;
      }
    },
    components: {
      forget
    }
  }
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.setting-page {
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0,0,0,0.3);
    top: 0;
    left: 0;
    z-index: 2;
  }
  .el-form-item__label {
    color: #bbb;
    text-align: left;
  }
  .title {
    font-size: 14px;
    line-height: 30px;
    font-weight: 500;
  }
  .info-form {
    border-bottom: 1px solid @main-color-border;
    padding: 0px 20px;
    .el-input {
      width: 280px;
    }
    .inline-box {
      display: inline-block;
    }
    .tag {
      line-height: 32px;
      margin-left: 10px;
      color: red;
      display: inline-block;
    }
    .sex-box {
      label {
        margin-right: 10px;
      }
      input[type="radio"] {
        margin-right: 5px;
      }
    }
    .post-btn {
      width:70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background-color: @main-color-blue;
      border-radius: 4px;
      margin-left: 20px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
  .account-form {
    padding: 10px 20px;
    .pwd {
      line-height: 30px;
      color: @main-color-gray;
      span {
        margin-left: 20px;
        cursor: pointer;
        color: @main-color-blue;
      }
    }
  }
  
}
</style>

