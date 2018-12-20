<template>
<div class="base-info">
  <div id="base" class="grid-content info-box" v-if="!showBaseInfoEdit">
    <div class="base-info">
      <div class="title">
        <i class="iconfont icon-user-outline"></i>
        <span>基本信息</span>
        <span class="red-tag"></span>
      </div>
      <div class="base-content">
        <div class="avatar" >
          <img :src="baseInfo.headPicAll?baseInfo.headPicAll:require('../../assets/images/man.png')" >
        </div>
        <div class="info-list">
          <div class="name">
            <span>{{baseInfo.name}}</span>
            <div class="icon-text-box" @click="editBaseInfo">
              <span class="icon-text">编辑&nbsp;</span>
              <i class="iconfont icon-edit right-icon"></i>
            </div>
          </div>
          <div class="status">
            <span v-if="baseInfo.address">现居住：{{baseInfo.address}}</span>
            <span v-if="baseInfo.workTime">{{baseInfo.workTime}}年工作经验</span>
            <span v-if="baseInfo.sex==1">男</span>
            <span v-if="baseInfo.sex==2">女</span>
            <span v-if="baseInfo.birth">{{baseInfo.age}}岁 ({{baseInfo.birth?baseInfo.birth.slice(0,10): ''}})</span>
            <span>{{baseInfo.jobStatusName}}</span>
          </div>
          <div class="status">
            <span v-if="baseInfo.nation">{{baseInfo.nation}}</span>
            <span v-if="baseInfo.politicalOutlookName">{{baseInfo.politicalOutlookName}}</span>
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
        <i class="iconfont icon-user-outline"></i>
        <span>基本信息</span>
      </div>
      <div class="base-content">
        <upload :uploadType="`resume_head`" :imgWidth="`85px`" :imgHeight="`104px`" :imgUrl="imgUrl" @upload="getImgUrl"></upload>
        <div class="edit-content baseinfo-content">
          <el-form :inline="true" :model="base" :rules="rules" ref="base" label-width="100px" class="form-box">
            <el-form-item label="姓名：" prop="name" class="input-box">
              <el-input size="small" v-model="base.name" placeholder="请输入姓名" :maxlength="10"
              @focus="inputFocus('base','showNameMsg')" @blur="showNameMsg=false" @input="showNameMsg=false"></el-input>
              <div class="msg" v-if="showNameMsg">请确认姓名与身份证保持信息一致。</div>
            </el-form-item>
            <el-form-item label="性别：" prop="sex" class="input-box">
              <div class="el-input sex-box" >
                <el-radio v-model="base.sex" :label="'1'">男</el-radio>
								<el-radio v-model="base.sex" :label="'2'">女</el-radio>
                <!-- <input type="radio" name="sex" :checked="base.sex==1" value="1" @click="base.sex=1"/>
                <label>男</label>  
                <input type="radio" name="sex" :checked="base.sex==2" value="2" @click="base.sex=2"/>
                <label>女</label>  -->
                <div class="msg" v-if="showSexMsg">请确认性别与身份证保持信息一致。</div>
              </div>
            </el-form-item>
            <el-form-item label="出生日期：" prop="birth" class="input-box">
               <el-date-picker size="small" :editable="false" :clearable="false" class="select-box"
                  v-model="base.birth"
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="手机：" prop="phone" class="input-box">
              <el-input size="small" v-model="base.phone" placeholder="请输入手机号码" :maxlength="11"
              @focus="inputFocus('base','showPhoneMsg')" @blur="showPhoneMsg=false" @input="showPhoneMsg=false"></el-input>
              <div class="msg" v-if="showPhoneMsg">请确认电话号码保持畅通，尽量让电话号码归属为求职所在地。</div>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email" class="input-box">
              <el-input  size="small" v-model="base.email" placeholder="请输入邮箱" :maxlength="50"
              @focus="inputFocus('base','showEmailMsg')" @blur="showEmailMsg=false"></el-input>
              <div class="msg" v-if="showEmailMsg">请确认邮箱地址可正常收发邮件，且未设置陌生邮箱黑名单等。</div>
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
              <el-date-picker size="small" :editable="false" :clearable="false" class="select-box"
                  v-model="base.workYear"
                  type="year"
                  :picker-options="pickerOptions"
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
             <el-form-item label="政治面貌：" prop="politicalOutlook" class="input-box">
              <el-select size="small" v-model="base.politicalOutlook" placeholder="请选择政治面貌" class="select-box">
                <el-option
                  v-for="item in baseData.politicalOutlook"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族：" prop="nation" class="input-box">
              <el-input size="small" v-model="base.nation" placeholder="请输入民族" :maxlength="40"
              @focus="inputFocus('base','showNationMsg')" @blur="showNationMsg=false"></el-input>
              <div class="msg" v-if="showNationMsg">请确认民族信息与身份证保持一致</div>
            </el-form-item>
            <el-form-item label="现居住：" prop="address" class="input-box">
              <el-input size="small" v-model="base.address" placeholder="请输入现居住地址" :maxlength="40"
              @focus="inputFocus('base','showAddressMsg')" @blur="showAddressMsg=false"></el-input>
              <div class="msg" v-if="showAddressMsg">请确认与求职所在城市一致</div>
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
      // 选中时间大于等于今天 不可选
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      phone: '',
      showNameMsg: false,
      showSexMsg: false,
      showPhoneMsg: false,
      showEmailMsg: false,
      showAddressMsg: false,
      showNationMsg: false,

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
        politicalOutlook: [
          {
            required: true,
            message: "请选择政治面貌",
            trigger: "change"
          }
        ],
        nation: [
          {
            required: true,
            message: "请输入民族",
            trigger: "blur"
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
    inputFocus(formName, msg) {
			this.$refs[formName].clearValidate()
			this[msg] = true
		},
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
        politicalOutlook: this.baseInfo.politicalOutlook,
        nation: this.baseInfo.nation,
        address: this.baseInfo.address,
        creator: this.baseInfo.creator,
        updator: this.baseInfo.updator,
        id: this.baseInfo.id,
        resumeType: this.baseInfo.resumeType || this.baseParams.resumeType
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
    }
  },
  components: {
    upload
  }
};
</script>
<style lang="less" scope>
</style>

