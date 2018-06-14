<template>
<div class="base-info">
  <div id="base" class="grid-content info-box" v-if="!showBaseInfoEdit">
    <div class="base-info">
      <div class="title">
        <i class="iconfont icon-user"></i>
        <span>基本信息</span>
      </div>
      <div class="base-content">
        <div class="avatar" >
          <img :src="baseInfo.headPicAll?baseInfo.headPicAll:require('../../assets/images/man.png')" >
        </div>
        <div class="info-list">
          <div class="name">
            <span>{{baseInfo.name}}</span>
            <i class="iconfont icon-edit right-icon" @click="editBaseInfo"></i>
          </div>
          <div class="status">
            <span v-if="baseInfo.address">现居住：{{baseInfo.address}}</span>
            <span v-if="baseInfo.workTime">{{baseInfo.workTime}}年工作经验</span>
            <span v-if="baseInfo.sex==1">男</span>
            <span v-if="baseInfo.sex==2">女</span>
            <span v-if="baseInfo.birth">{{baseInfo.age}}岁 ({{baseInfo.birth?baseInfo.birth.slice(0,10): ''}})</span>
            <span>{{baseInfo.jobStatusName}}</span>
          </div>
          <div class="concat">
            <span v-if="baseInfo.email">
              <i class="iconfont icon-email"></i>{{baseInfo.email}}
            </span>
            <span >
              <i class="iconfont icon-phone"></i>{{baseInfo.phone?baseInfo.phone:phone}}
            </span>
            <span class="more" @click="showMoreBase=!showMoreBase" v-if="baseInfo.nativePlaceName">
              {{showMoreBase?'收起':'更多'}}
              <i v-if="showMoreBase==false" class="el-icon-arrow-down"></i>
              <i v-if="showMoreBase==true" class="el-icon-arrow-up"></i>
            </span>
          </div>
        </div>
        <div class="more-info" v-if="showMoreBase">
          <span class="arrow-top"></span>
          <span>户口/国籍：{{baseInfo.nativePlaceName}}</span>
          <span>婚姻状态：{{baseInfo.marriageStatusName}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="grid-content info-box edit-border" v-if="showBaseInfoEdit">
    <div class="base-info">
      <div class="title">
        <i class="iconfont icon-user"></i>
        <span>基本信息</span>
      </div>
      <div class="base-content">
        <upload :uploadType="`resume_head`" :imgWidth="`85px`" :imgHeight="`104px`" :imgUrl="imgUrl" @upload="getImgUrl"></upload>
        <!-- <div class="avatar edit-avatar">
          <input type="file" class="input-file" name="avatar" ref="avatarInput"
          @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
          <img :src="avatar" alt="" >
          <div class="text" @click="upload" v-if="file">确定上传</div>
        </div> -->
        <div class="edit-content baseinfo-content">
          <el-form :inline="true" :model="base" :rules="rules" ref="base" label-width="100px" class="form-box">
            <el-form-item label="姓名：" prop="name" class="input-box">
              <el-input size="small" v-model="base.name" placeholder="请输入姓名" :maxlength="10" @focus="showNameMsg=true" @blur="showNameMsg=false" @input="showNameMsg=false"></el-input>
              <div class="msg" v-if="showNameMsg">请确认姓名与身份证保持信息一致。</div>
            </el-form-item>
            <el-form-item label="性别：" prop="sex" class="input-box">
              <div class="el-input sex-box" >
                <input type="radio" name="sex" :checked="base.sex==1" value="1" @click="base.sex=1"/>
                <label>男</label>  
                <input type="radio" name="sex" :checked="base.sex==2" value="2" @click="base.sex=2"/>
                <label>女</label> 
                <div class="msg" v-if="showSexMsg">请确认性别与身份证保持信息一致。</div>
              </div>
            </el-form-item>
            <el-form-item label="出生日期：" prop="birth" class="input-box">
               <el-date-picker size="small" class="select-box"
                  v-model="base.birth"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="手机：" prop="phone" class="input-box">
              <el-input size="small" v-model="base.phone" placeholder="请输入手机号码" :maxlength="11"></el-input>
              <div class="msg" v-if="showPhoneMsg">请确认电话号码保持畅通，尽量让电话号码归属为求职所在地。</div>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email" class="input-box">
              <el-input  size="small" v-model="base.email" placeholder="请输入邮箱" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="籍贯：" prop="nativePlaceList" class="input-box">
              <!-- <el-select size="small"  v-model="base.nativePlace" placeholder="请选择" class="select-box">
                <el-option 
                  v-for="item in baseData.cities"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                  >
                </el-option>
              </el-select> -->
              <el-cascader size="small" v-model="base.nativePlaceList" @change="changeNativePlace"
                :options="baseData.cities"
                :show-all-levels="false"
                :props="cascaderProp"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="工作年份：" prop="workYear" class="input-box">
              <el-date-picker size="small" class="select-box"
                  v-model="base.workYear"
                  type="year"
                  placeholder="选择日期"
                  value-format="yyyy">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="求职状态：" prop="jobStatus" class="input-box">
              <el-select size="small" v-model="base.jobStatus" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in baseData.jobStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职业类型：" prop="careerType" class="input-box">
              <el-select size="small" v-model="base.careerType" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in baseData.careerType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="婚姻状态：" prop="marriageStatus" class="input-box">
              <el-select size="small" v-model="base.marriageStatus" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in baseData.marriageStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="现居住：" prop="address" class="input-box">
              <el-input size="small" v-model="base.address" placeholder="请输入现居住地址" :maxlength="40"></el-input>
            </el-form-item>
            <el-form-item size="small" class="edit-btn-box">
              <el-button class="save-btn" @click="saveBaseInfo('base')">保存</el-button>
              <el-button class="cancel" @click="cancel('base')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import upload from '../Upload'
export default {
  name: "baseInfo",
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
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("邮箱不能为空"));
      } else if (
        /^([a-zA-Z0-9]+[\-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\-|_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)
      ) {
        callback();
      } else {
        callback(new Error("请输入正确的真实邮箱"));
      }
    };
    return {
      phone: '',
      showNameMsg: false,
      showSexMsg: false,
      showPhoneMsg: false,
      showEmailMsg: false,
      showAddressMsg: false,

      base: {},
      imgUrl: '',
      showMoreBase: false,
      showBaseInfoEdit: false,
      cascaderProp: {
        label: "name",
        value: "code",
        children: 'childrens'
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "请确认姓名与身份证保持信息一致",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别并确认性别与身份证保持信息一致。",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true, 
            message: "请输入手机号", 
            trigger: "blur" 
          },
          {
            max: 11,
            message: "请输入正确的手机号",
            trigger: "blur"
          },
          {
            trigger: 'click',
            message: '请确认电话号码保持畅通，尽量让电话号码归属为求职所在地。'
          }
        ],
        email: [
          { required: true, message: "请输入联系邮箱", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "请确认邮箱地址可正常收发邮件，且未设置陌生邮箱黑名单等。",
            trigger: "blur"
          }
        ],
        birth: [
          {
            required: true,
            message: "请确认出生日期与身份证保持信息一致。",
            trigger: "blur"
          }
        ],
        nativePlaceList: [
          {
            required: true,
            type: 'array',
            message: "请确认户籍地与你身份证信息保持一致。",
            trigger: "change"
          }
        ],
        workYear: [
          { required: true, message: "请选择工作时间", trigger: "change" }
        ],
        jobStatus: [
          { required: true, message: "请选择求职状态", trigger: "change" }
        ],
        careerType: [
          { required: true, message: "请选择职业类型", trigger: "change" }
        ],
        marriageStatus: [
          {
            required: true,
            message: "请确认你的婚姻状况属实",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            min: 1,
            max: 40,
            message: "请确认居住地与求职所在城市一致",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["baseInfo", "baseData", "baseParams"],
  created: function(){ 
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))
    this.phone = userInfo.mobile
  },
  updated(){
    // console.log(this.baseInfo.headPicAll)
    this.imgUrl = this.baseInfo.headPicAll

  },
  methods: {
    /*
    changeImage: function(e){
      let file = e.target.files[0];
      this.file = file
      console.log(this.file)
      let reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload= function(e){
        that.avatar = this.result
      }
    },
    upload: function(){
      if(this.$refs.avatarInput.files[0].length !== 0){
        let data = new FormData()
        data.append('multfile', this.$refs.avatarInput.files[0])
        data.append('operaType', 'resume_head')
        data.append('resumeId', this.baseParams.resumeId)
        this.$store.dispatch('UPLOAD_HEAD', data)
        .then(res => {
          console.log(res)
          this.file = '';
        }).catch(err => {
          console.log(err)
          if(err.data.msg){
            this.$message({
              type: "error",
              message: err.data.msg
            })
          }else {
            this.$message({
              type: "error",
              message: "上传失败"
            })
          }
        })
      }
    },
    */
    changeNativePlace: function(e){
      this.base.nativePlaceList = e;
    },
    editBaseInfo: function() {
      console.log(this.baseInfo)
      this.showBaseInfoEdit = true;
      this.base = {
        name: this.baseInfo.name,
        birth: this.baseInfo.birth,
        phone: this.baseInfo.phone,
        email: this.baseInfo.email,
        sex: this.baseInfo.sex,
        nativePlaceList: this.baseInfo.nativePlaceList,
        workYear: this.baseInfo.workYear,
        jobStatus: this.baseInfo.jobStatus,
        careerType: this.baseInfo.careerType,
        marriageStatus: this.baseInfo.marriageStatus,
        address: this.baseInfo.address,
        creator: this.baseInfo.creator,
        updator: this.baseInfo.updator,
        id: this.baseInfo.id
      };
    },
    saveBaseInfo: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_BASEINFO", this.base)
            .then(res => {
              this.showBaseInfoEdit = false;
              // console.log('base', res)
              this.$emit("saved", res.data.data);
            })
            .catch(err => {
              if(err.data.msg){
                this.$message({
                type: "error",
                message: err.data.msg
              })
              }else{
                this.$message({
                  type: "error",
                  message: "保存简历基本信息失败"
                })
              }
            });
        } else {
          return false;
        }
      });
    },
    cancel: function(formName) {
      this.showBaseInfoEdit = false;
      this.$refs[formName].resetFields();
    },
    getImgUrl: function(data){
      this.base.headPicAll = data.rootPath + data.headPic;
      this.base.headPic = data.headPic;
    },
  },
  components: {
    upload
  }
};
</script>
<style lang="less" scope>
</style>

