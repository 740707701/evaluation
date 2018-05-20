<template>
<div class="base-info">
  <div id="base" class="grid-content info-box" v-if="!showBaseInfoEdit">
    <div class="base-info">
      <div class="title">
        <i class="iconfont icon-user"></i>
        <span>基本信息</span>
      </div>
      <div class="base-content">
        <div class="avtar">
          <img src="../../assets/images/demo/05.jpg" alt="">
        </div>
        <div class="info-list">
          <div class="name">
            <span>{{baseInfo.name}}</span>
            <i class="iconfont icon-edit right-icon" v-if="!preview" @click="editBaseInfo"></i>
          </div>
          <div class="status">
            <span>现居住：{{baseInfo.address}}</span>
            <!-- <span>{{baseInfo.workYear}}年工作经验</span> -->
            <span>0年工作经验</span>
            <span>{{baseInfo.sex==1?'女':'男'}}</span>
            <span>11岁 ({{baseInfo.birth?baseInfo.birth.slice(0,10): ''}})</span>
            <span>{{baseInfo.jobStatus}}</span>
          </div>
          <div class="concat">
            <span>
              <i class="iconfont icon-email"></i>{{baseInfo.email}}
            </span>
            <span>
              <i class="iconfont icon-phone"></i>{{baseInfo.phone}}
            </span>
            <span class="more" @click="showMoreBase=!showMoreBase" v-if="!preview">
              {{showMoreBase?'收起':'更多'}}
              <i v-if="showMoreBase==false" class="el-icon-arrow-down"></i>
              <i v-if="showMoreBase==true" class="el-icon-arrow-up"></i>
            </span>
          </div>
        </div>
        <div class="more-info" v-if="showMoreBase || preview">
          <span class="arrow-top"></span>
          <span>户口/国籍：{{baseInfo.address}}</span>
          <span>婚姻状态：{{baseInfo.marriageStatus}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="grid-content info-box edit-border" v-if="showBaseInfoEdit&&!preview">
    <div class="base-info">
      <div class="title">
        <i class="iconfont icon-user"></i>
        <span>基本信息</span>
      </div>
      <div class="base-content">
        <div class="avtar edit-avatar">
          <img src="../../assets/images/demo/05.jpg" alt="">
          <div class="text">修改头像</div>
        </div>
        <div class="edit-content baseinfo-content">
          <el-form :inline="true" :model="base" :rules="rules" ref="base" label-width="100px" class="form-box">
            <el-form-item label="姓名：" prop="name" class="input-box">
              <el-input size="small" v-model="base.name" placeholder="请输入姓名" maxlength="30" @focus="showNameMsg=true" @blur="showNameMsg=false" @input="showNameMsg=false"></el-input>
              <div class="msg" v-if="showNameMsg">请确认姓名与身份证保持信息一致。</div>
            </el-form-item>
            <el-form-item label="性别：" prop="sex" class="input-box">
              <div class="el-input sex-box" >
                <input type="radio" name="sex" :checked="base.sex==0" value="0" @click="base.sex=0"/>
                <label>男</label>  
                <input type="radio" name="sex" :checked="base.sex==1" value="1" @click="base.sex=1"/>
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
              <el-input size="small" v-model="base.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
              <div class="msg" v-if="showPhoneMsg">请确认电话号码保持畅通，尽量让电话号码归属为求职所在地。</div>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email" class="input-box">
              <el-input  size="small" v-model="base.email" placeholder="请输入邮箱" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="籍贯：" prop="nativePlace" class="input-box">
              <el-select size="small"  v-model="base.nativePlace" placeholder="请选择" class="select-box">
                  <el-option 
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
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
                    v-for="item in jobStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职业类型：" prop="careerType" class="input-box">
              <el-select size="small" v-model="base.careerType" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in careerType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="婚姻状态：" prop="marriageStatus" class="input-box">
              <el-select size="small" v-model="base.marriageStatus" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in marriageStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="现居住：" prop="address" class="input-box">
              <el-input size="small" v-model="base.address" placeholder="请输入现居住地址" maxlength="30"></el-input>
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
import metadata from "../../api/metadata";
export default {
  name: "baseInfo",
  data() {
    return {
      cities: metadata.cities,
      jobStatus: metadata.jobStatus,
      careerType: metadata.careerType,
      marriageStatus: metadata.marriageStatus,

      showNameMsg: false,
      showSexMsg: false,
      showPhoneMsg: false,
      showEmailMsg: false,
      showAddressMsg: false,

      base: {},
      showMoreBase: false,
      showBaseInfoEdit: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
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
            min: 0,
            max: 14,
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
        nativePlace: [
          {
            required: true,
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
            min: 0,
            max: 10,
            message: "请确认居住地与求职所在城市一致",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["baseInfo", "preview"],
  methods: {
    editBaseInfo: function() {
      this.showBaseInfoEdit = true;
      this.base = {
        name: this.baseInfo.name,
        birth: this.baseInfo.birth,
        phone: this.baseInfo.phone,
        email: this.baseInfo.email,
        sex: this.baseInfo.sex,
        nativePlace: this.baseInfo.nativePlace,
        workYear: this.baseInfo.workYear,
        jobStatus: this.baseInfo.jobStatus,
        careerType: this.baseInfo.careerType,
        marriageStatus: this.baseInfo.marriageStatus,
        address: this.baseInfo.address,
        creator: this.baseInfo.creator,
        updator: this.baseInfo.updator
      };
    },
    saveBaseInfo: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_BASEINFO", this.base)
            .then(res => {
              this.showBaseInfoEdit = false;
              this.$emit("saved", this.base);
            })
            .catch(err => {
              console.log(err.data.msg);
            });
        } else {
          return false;
        }
      });
    },
    cancel: function(formName) {
      this.showBaseInfoEdit = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scope>
</style>

