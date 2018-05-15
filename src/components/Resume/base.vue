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
            <i class="iconfont icon-edit right-icon" @click="editBaseInfo"></i>
          </div>
          <div class="status">
            <span>现居住：{{baseInfo.address}}</span>
            <span>{{baseInfo.workYear}}年工作经验</span>
            <span>{{baseInfo.sex==1?'女':'男'}}</span>
            <span>11岁 ({{baseInfo.birth}})</span>
            <span>{{baseInfo.jobStatus}}</span>
          </div>
          <div class="concat">
            <span>
              <i class="iconfont icon-email"></i>{{baseInfo.email}}
            </span>
            <span>
              <i class="iconfont icon-phone"></i>{{baseInfo.phone}}
            </span>
            <span class="more" @click="showMoreBase=!showMoreBase">
              {{showMoreBase?'收起':'更多'}}
              <i v-if="showMoreBase==false" class="el-icon-arrow-down"></i>
              <i v-if="showMoreBase==true" class="el-icon-arrow-up"></i>
            </span>
          </div>
        </div>
        <div class="more-info" v-if="showMoreBase">
          <span class="arrow-top"></span>
          <span>户口/国籍：上海市</span>
          <span>婚姻状态：未婚</span>
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
        <div class="avtar edit-avatar">
          <img src="../../assets/images/demo/05.jpg" alt="">
          <div class="text">修改头像</div>
        </div>
        <div class="edit-content baseinfo-content">
          <ul class="edit-item-list">
            <li class="item">
              <div class="input-box">
                <span class="name">姓名：</span>
                <el-input size="small" v-model="baseInfo.name" placeholder="请输入姓名" maxlength="20"></el-input>
              </div>
              <div class="input-box">
                <span class="name">性别：</span>
                <div class="el-input sex-box">
                  <el-radio v-model="baseInfo.sex" label="0">男</el-radio>
                  <el-radio v-model="baseInfo.sex" label="1">女</el-radio>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="input-box">
                <span class="name">出生日期：</span>
                  <el-date-picker size="small" class="select-box"
                  v-model="baseInfo.birth"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd">
                </el-date-picker>
              </div>
              <div class="input-box">
                <span class="name">手机：</span>
                <el-input size="small" v-model="baseInfo.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
              </div>
            </li>
            <li class="item">
              <div class="input-box">
                <span class="name">邮箱：</span>
                <el-input  size="small" v-model="baseInfo.email" placeholder="请输入邮箱" maxlength="20"></el-input>
              </div>
              <div class="input-box">
                <span class="name">籍贯：</span>
                <el-select size="small"  v-model="baseInfo.nativePlace" placeholder="请选择" class="select-box">
                  <el-option 
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="item">
              <div class="input-box">
                <span class="name">工作年份：</span>
                <el-date-picker size="small" class="select-box"
                  v-model="baseInfo.workYear"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy">
                </el-date-picker>
              </div>
              <div class="input-box">
                <span class="name">求职状态：</span>
                <el-select size="small" v-model="baseInfo.jobStatus" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in jobStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="item">
              <div class="input-box">
                <span class="name">职业类型：</span>
                <el-select size="small" v-model="baseInfo.careerType" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in careerTpye"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="input-box">
                <span class="name">婚姻状态：</span>
                <el-select size="small" v-model="baseInfo.marriageStatus" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in marriageStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="item">
              <div class="input-box text-left">
                <span class="name">现居住：</span>
                <el-input size="small" v-model="baseInfo.address" placeholder="请输入现居住地址"></el-input>
              </div>
            </li>
          </ul>
          <div class="edit-btn-box">
            <div class="edit-btn save-btn" @click="saveBaseInfo">保存</div>
            <div class="edit-btn cancel-btn" @click="showBaseInfoEdit=false">取消</div>
          </div>
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
      showMoreBase: false,
      showBaseInfoEdit: false,
      cities: metadata.cities,
      jobStatus: metadata.jobStatus,
      careerTpye: metadata.careerType,
      marriageStatus: metadata.marriageStatus
    };
  },
  props: ["baseInfo"],
  methods: {
    editBaseInfo: function() {
      this.showBaseInfoEdit = true;
    },
    saveBaseInfo: function() {
      this.$store
        .dispatch("SET_BASEINFO", base)
        .then(res => {
          console.log(res);
          this.showBaseInfoEdit = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scope>

</style>

