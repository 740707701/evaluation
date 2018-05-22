<template>
  <div class="resume-page">
    <headerNav></headerNav>
    <div class="container">
      <el-row :gutter="10" class="el-content">
        <el-col :span="3" class="left-content">
          <div class="grid-content">
            <div class="name-box" v-if="baseInfo.name">
              <div class="title">{{baseInfo.name}} <span class="resume-text">(简历)</span></div>
              <div class="time">时间: {{baseInfo.updateDate.slice(0,10)}}</div>
              <div class="operation">
                <div class="icon-box refresh" @click="getResumeInfo">
                  <i class="iconfont icon-refresh"></i>
                  <div class="icon-text">刷新</div>
                </div>
                <div class="icon-box preview" @click="preview">
                  <i class="iconfont icon-yulan"></i>
                  <div class="icon-text">预览</div>
                </div>
              </div>
            </div>
            <ul class="tabs">
              <li :class="{'active':tabIndex==0}" @click="tabIndex=0">
                <a href="#base">
                  <i class="iconfont icon-user"></i>
                  <span>基本信息</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==1}" @click="tabIndex=1">
                <a href="#job">
                  <i class="iconfont icon-job"></i>
                  <span>求职意向</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==2}" @click="tabIndex=2">
                <a href="#work">
                  <i class="iconfont icon-work"></i>
                  <span>工作经验</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==3}" @click="tabIndex=3">
                <a href="#education">
                  <i class="iconfont icon-edu"></i>
                  <span>教育经历</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==4}" @click="tabIndex=4">
                <a href="#school">
                  <i class="iconfont icon-school"></i>
                  <span>在校情况</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==5}" @click="tabIndex=5">
                <a href="#skill">
                  <i class="iconfont icon-skill"></i>
                  <span>技能证书</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==6}" @click="tabIndex=6">
                <a href="#evaluate">
                  <i class="iconfont icon-evaluate"></i>
                  <span>自我评价</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="15" class="center-content">
          <baseBox :baseInfo="baseInfo" @saved="updateInfo"></baseBox>
          <expectBox :expectInfo="expectInfo" @saved="updateInfo"></expectBox>
          <evaluateBox :evaluateInfo="evaluateInfo" @saved="updateInfo"></evaluateBox>
          <workExperBox :workExperList="workExperList" @saved="updateInfo"></workExperBox>
          <eduBox :eduList="eduList" @saved="updateInfo"></eduBox>
          <schoolBox :schoolHonorList="schoolHonorList" :schoolWorkList="schoolWorkList" @saved="updateInfo"></schoolBox>
          <skillBox :skillList="skillList" @saved="updateInfo"></skillBox>
          
          <div class="post-resume">
            <el-button size="small" class="resume-btn" @click="postResume">提交简历</el-button>
          </div>
        </el-col>
        <el-col :span="6" class="right-content">
          <div class="grid-content">
            <div class="hr-tag">
              <div class="title">
                <i class="iconfont icon-prompt"></i>
                <span>HR视角小提示</span>
              </div>
              <el-select size="small" v-model="tag" filterable :filter-method="filterTag(tag)" readonly placeholder="基本信息" class="tag">
                <el-option
                  v-for="item in tags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="tag-box" v-for="item in tagList" :key="item.name" v-if="item.type == tagType">
                <div class="tag-title">{{item.name}}</div>
                <div class="tag-split"></div>
                <div class="tag-content">{{item.msg}}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 提交简历弹框 -->
    <div class="dialog" v-if="showSuccessDialog" @click.self="showSuccessDialog=false">
      <div class="post-box">
        <img src="../assets/images/resume_success.png" alt="" class="post-success">
        <div class="title">简历提交成功</div>
        <div class="date">{{date}}</div>
        <el-button size="small" round class="back-btn">返回</el-button>
      </div>
    </div>
    <!-- 简历预览弹框 -->
    <div class="dialog" v-if="showPreview" @click.self="showPreview=false">
      <div class="resume-preview">
        <div class="preview-container">
          <el-row :gutter="10" class="el-content">
            <el-col :span="24" class="preview-center-content">
              <preview></preview>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
import baseBox from "../components/Resume/base.vue";
import expectBox from "../components/Resume/expect.vue";
import evaluateBox from "../components/Resume/evaluate.vue";
import workExperBox from "../components/Resume/workexper.vue";
import eduBox from "../components/Resume/edu.vue";
import schoolBox from "../components/Resume/school.vue";
import skillBox from "../components/Resume/skills.vue";
import preview from '../components/Resume/preview.vue';
import { mapState } from "vuex";
import tags from "../api/tags";

export default {
  name: "resume",
  data() {
    return {
      updator: "cc",
      creator: "cc",
      resumeId: "ad3db208de4e450b9c759b35af141410",
      date: new Date().toLocaleString().slice(0,20),
      showSuccessDialog: false,
      showPreview: false,
      tag: "",
      tagType: "base",
      tabIndex: 0,
      tags: tags.tagList,
      tagList: tags.tagInfoList,
      resume: {},
      postInfo: {},
      //数据对象
      baseInfo: {},
      expectInfo: {},
      evaluateInfo: {},
      workExperList: [],
      eduList: [],
      schoolHonorList: [],
      schoolWorkList: [],
      skillList: [],

      citiesList: [],
      funList: [],
      industryList: [],
    };
  },
  computed: {},
  beforeCreate: function() {},
  created: function() {
    this.getData();
    this.getResumeInfo();
  },
  mounted: function() {},
  updated: function() {},
  methods: {
    //获取简历信息
    getResumeInfo: function() {
      this.$store
        .dispatch("RESUME_INFO", { creator: "cc" })
        .then(res => {
          this.resume = res.data;
          this.baseInfo = res.data.resumeBaseInfo;
          this.evaluateInfo = res.data.resumeBaseInfo;
          this.expectInfo = res.data.resumeBaseInfo;
          this.workExperList = res.data.jobexpList;
          this.eduList = res.data.educationList;
          this.schoolHonorList = res.data.schoolHonorList;
          this.schoolWorkList = res.data.schoolPostList;
          this.skillList = res.data.skillsList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //更新数据
    updateInfo: function() {
      this.getResumeInfo();
    },
    //提交简历
    postResume: function() {
      this.postInfo = {
        updator: this.updator,
        creator: this.creator,
        resumeId: this.resumeId
      };
      this.$store
        .dispatch("SUBMIT_RESUME", this.postInfo)
        .then(res => {
          this.showSuccessDialog = true;
        })
        .catch(err => {
          console.log(err, "提交简历失败");
        });
    },
    //预览
    preview: function() {
      this.showPreview = true;
      //跳页面 预览
      // this.$router.push('ResumePreview');
    },
    //HR小提示 前端搜索
    filterTag: function(value) {
      if (value) {
        let tag = this.tags.filter(item => {
          return item.value == value;
        });
        this.tagType = tag[0].type;
      }
    },
    //获取字典数据
    getDictItem: function(dictCode, list){
      this.$store.dispatch('DICTITEM', {dictCode: dictCode})
      .then(res => {
        console.log('111',res)
        // list = res.data
      })
      .catch(err => {
        if(err.msg){
          this.$message({
            message: err.msg,
            type: "error"
          });
        }else {
          this.$message({
            message: "获取字典数据失败",
            type: "success"
          });
        }
      })
    },
    //dictCode (行政区划AREA/职能FUNCTION/行业INDUSTRY数据)
    getTreeItem: function(dictCode){
      this.$store.dispatch('TREEITEM', {dictCode: dictCode})
      .then(res => {
        console.log('list',res)
        // list = res
      }).catch(err => {
        console.log(err)
        if(err.msg){
          this.$message({
            message: err.msg,
            type: "error"
          });
        }else {
          this.$message({
            message: "获取字典数据失败",
            type: "error"
          });
        }
      })
    },
    getData: function(){
      Promise.all([
        this.$store.dispatch('TREEITEM', {dictCode: 'AREA'}), //行政区划
        this.$store.dispatch('TREEITEM', {dictCode: 'FUNCTION'}), //职能
        this.$store.dispatch('TREEITEM', {dictCode: 'INDUSTRY'}), //行业
        this.$store.dispatch('DICTITEM', {dictCode: 'COMPANY_NATURE'}), //公司范围
        this.$store.dispatch('DICTITEM', {dictCode: 'EDUCATION'}), //学历/学位
        this.$store.dispatch('DICTITEM', {dictCode: 'EXPECT_SALARY'}), //期望薪资
        this.$store.dispatch('DICTITEM', {dictCode: 'INDUSTRY'}), //行业类别
        this.$store.dispatch('DICTITEM', {dictCode: 'JOB_STATUS'}), //工作状态
        this.$store.dispatch('DICTITEM', {dictCode: 'MARRIAGE_STATUS'}), //婚姻状态
        this.$store.dispatch('DICTITEM', {dictCode: 'NATIVE'}), //籍贯
        this.$store.dispatch('DICTITEM', {dictCode: 'PROF_TYPE'}), //职业类型
        this.$store.dispatch('DICTITEM', {dictCode: 'SCHOOLWORK_PROP'}), //学业性质
        this.$store.dispatch('DICTITEM', {dictCode: 'SEX'}) //性别
        ]).then(data => {
        console.log('resssss',data)
      }).catch(err => {
        if(err.msg){
          this.$message({
            message: err.msg,
            type: "error"
          });
        }else {
          this.$message({
            message: "获取字典数据失败",
            type: "error"
          });
        }
      })
      // Promise.all([
      //   this.getTreeItem('AREA'),
      //   this.getTreeItem('FUNCTION')
      //   ]).then(data => {
      //   console.log('resssss',data)
      // }).catch(err => {
      //   console.log('wwwww',err)
      // })
    },
  },
  watch: {},
  components: {
    headerNav,
    baseBox,
    expectBox,
    evaluateBox,
    workExperBox,
    eduBox,
    schoolBox,
    skillBox,
    preview
  }
};
</script>
<style lang="less" scope>
@import url("../assets/css/colors.less");
.resume-page {
  width: 100%;
  background-color: @main-color-bg;
  padding-bottom: 25px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  .container {
    width: 1200px;
    margin: 20px auto;
    position: absolute;
    top: 60px;
    left: 50%;
    bottom: 0;
    margin-left: -600px;
  }
  .container,
  .preview-container {
    .el-content {
      height: 100%;
    }
    .center-content,
    .right-content {
      position: absolute;
      top: 0;
      bottom: 0;
      overflow-y: auto;
    }
    .center-content {
      left: 12.5%;
    }
    .right-content {
      right: 0;
    }
    .right-icon {
      float: right;
      color: @main-color-yellow;
      cursor: pointer;
    }
    .gray {
      color: @main-color-gray;
    }
    .msg {
      font-size: 12px;
      line-height: 1;
      color: @main-color-red;
      position: absolute;
      top: 100%;
      left: 0;
    }
    .textarea {
      min-height: 90px;
    }
    textarea:-moz-placeholder,
    textarea::-webkit-input-placeholder {
      color: @main-color-gray;
    }
    .info-box {
      margin-bottom: 10px;
    }
    .edit-border {
      border: 1px solid @main-color-yellow!important;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .form-box {
      .el-form-item:nth-of-type(even) {
        float: right;
      }
    }
    .desc-box {
      width: 100%;
      .el-form-item__content {
        width: calc(100% - 110px);
      }
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background-color: @main-color-yellow;
      border-color: @main-color-yellow;
      box-shadow: -1px 0 0 0 @main-color-yellow;
      color: #fff;
    }

    .el-radio-button__inner:hover {
      color: @main-color-yellow;
    }
    .grid-content {
      border-radius: 8px;
      min-height: 36px;
      background-color: #fff;
      box-shadow: RGBA(162, 169, 184, 0.15);
      box-shadow: 8px 0px 10px RGBA(162, 169, 184, 0.15);
      .name-box {
        padding: 10px;
        border-bottom: 1px solid @main-color-border;
        .title {
          font-weight: bold;
          line-height: 30px;
          .resume-text {
            font-size: 12px;
          }
        }
        .time {
          line-height: 22px;
        }
        .operation {
          display: flex;
          display: -webkit-flex;
          margin: 10px auto;
          .icon-box {
            display: inline-block;
            flex: 1;
            text-align: center;
            cursor: pointer;
            .icon-text {
              padding-top: 6px;
            }
            .icon-refresh {
              color: #6bd7b0;
            }
            .icon-yulan {
              color: @main-color-yellow;
            }
          }
          .preview {
            padding-left: 20px;
          }
        }
      }
      .tabs {
        width: 100%;
        display: inline-block;
        font-size: 14px;
        li {
          height: 20px;
          line-height: 20px;
          padding: 0 10px;
          margin: 20px 0;
          cursor: pointer;
          span {
            margin: 0 10px;
          }
          .el-icon-check {
            font-weight: bold;
          }
        }
        .active {
          border-left: 3px solid @main-color-blue;
          a {
            color: @main-color-blue;
          }
        }
      }
      // .save-close {
      //   line-height: 30px;
      //   padding: 10px;
      //   span {
      //     margin: 0 10px;
      //   }
      // }
      .edit-btn-box {
        width: 100%;
        padding: 15px 0;
        text-align: center;
        .edit-btn {
          width: 70px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          cursor: pointer;
          border-radius: 4px;
          display: inline-block;
        }
        .save-btn {
          background-color: @main-color-yellow;
          color: #fff;
        }
        .cancel-btn {
          border: 1px solid @main-color-border;
          color: @main-color-text;
          margin-left: 20px;
        }
      }
      .base-info {
        padding: 10px 0px;
        border-radius: 10px;
        .title {
          line-height: 30px;
          padding: 0 20px;
          i {
            color: @main-color-yellow;
          }
          .right-icon {
            color: @main-color-blue;
          }
          span {
            color: @main-color-gray;
            padding-left: 10px;
          }
        }
        .base-content {
          width: 100%;
          display: inline-block;
          padding: 10px 20px;
          .avtar {
            float: left;
            width: 85px;
            img {
              width: 85px;
              height: 85px;
            }
            .text {
              text-align: center;
              line-height: 26px;
              cursor: pointer;
              color: @main-color-blue;
            }
          }
          .edit-avatar {
            cursor: pointer;
          }
          .info-list {
            margin-left: 105px;
            .name {
              line-height: 28px;
              .right-icon {
                color: @main-color-blue;
              }
            }
            .status {
              display: flex;
              display: -webkit-flex;
              line-height: 28px;
              span {
                flex: 1 1 auto;
              }
            }
            .concat {
              display: flex;
              display: -webkit-flex;
              line-height: 28px;
              span {
                flex: 1 1 auto;
              }
              i {
                margin-right: 5px;
              }
              .more {
                text-align: right;
                color: @main-color-blue;
                cursor: pointer;
                i {
                  padding-left: 5px;
                  color: @main-color-gray;
                }
              }
            }
          }
          .more-info {
            line-height: 40px;
            margin-top: 10px;
            padding: 0 15px;
            background-color: rgba(234, 240, 253, 1);
            display: flex;
            display: -webkit-flex;
            position: relative;
            span {
              flex: 1 1 auto;
            }
            .arrow-top {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid rgba(234, 240, 253, 1);
              position: absolute;
              top: -19px;
              right: 25px;
            }
          }
          .baseinfo-content {
            margin-left: 105px;
          }
          .edit-content {
            .input-box {
              flex: 1 1 auto;
              .name {
                width: 80px;
                text-align: left;
                display: inline-block;
                color: gray;
              }
              .sex-box {
                text-align: left;
              }
              .el-input {
                width: 180px;
              }
              .el-select .el-input.is-focus .el-input__inner,
              .el-radio__input.is-checked .el-radio__inner {
                border-color: @main-color-yellow;
              }
              .el-radio__input.is-checked .el-radio__inner {
                background-color: @main-color-yellow;
              }
              .el-radio__input.is-checked + .el-radio__label {
                color: @main-color-text;
              }
              .select-box {
                width: 180px;
              }
              input[type="text"] {
                width: 180px;
              }
              input[type="radio"] {
                width: 20px;
              }
            }
            .input-box:last-child {
              text-align: right;
            }
            .text-left {
              text-align: left !important;
            }
            .work-desc {
              width: 100%;
            }
            .work-desc-item {
              margin-top: 10px;
            }
            .edit-item-list {
              width: 100%;
              display: inline-block;
              li {
                display: flex;
                padding-bottom: 10px;
              }
            }
          }
        }
        .imperfect {
          padding: 10px 20px;
          text-align: center;
          .perfect-text {
            line-height: 32px;
            padding-bottom: 20px;
          }
          .perfect-btn {
            background-color: @main-color-graybtn;
            color: #fff;
          }
        }
        .item-list {
          width: 100%;
          display: inline-block;
          padding: 10px 20px;
          li {
            line-height: 30px;
            display: flex;
            display: -webkit-flex;
            .item {
              width: 50%;
            }
            .name {
              width: 90px;
              color: @main-color-gray;
              display: inline-block;
            }
          }
        }
        .job-item:last-child {
          border: none;
        }
        .add-job {
          float: right;
          color: @main-color-blue;
          cursor: pointer;
          i {
            margin-right: 6px;
            color: @main-color-blue;
          }
        }
        .icon-box {
          color: @main-color-blue;
          text-align: right;
          i {
            cursor: pointer;
          }
          i:first-child {
            margin-right: 10px;
          }
        }
        .job-item {
          width: 100%;
          display: inline-block;
          padding: 10px 20px;
          border-bottom: 1px solid @main-color-border;
          .job-time,
          .job-type {
            display: flex;
            line-height: 30px;
            span {
              flex: 1 1 auto;
            }
          }
          .job-desc {
            width: 100%;
            display: inline-block;
            padding-top: 5px;
            .desc-text {
              float: left;
              width: 70px;
              line-height: 26px;
            }
            .desc-content {
              margin-left: 80px;
              line-height: 24px;
              .desc-list {
                li {
                  line-height: 26px;
                }
              }
            }
          }
        }
        .skill {
          width: 100%;
          display: inline-block;
          padding: 10px 20px;
          li {
            width: 100%;
            display: flex;
            line-height: 30px;
            span {
              flex: 1 1 auto;
              max-width: 25%;
            }
          }
        }
        .schoolwork {
          padding-top: 10px;
        }
        .honor,
        .post {
          .imperfect {
            padding-top: 20px;
          }
          .school-type {
            padding: 0 20px;
            line-height: 30px;
            background-color: RGBA(247, 247, 247, 1);
          }
          .honor-list {
            width: 100%;
            // box-sizing: border-box;
          }
        }
        .evaluate-box {
          width: 100%;
          display: inline-block;
          padding: 10px 20px;
          .evaluate-text {
            width: 100%;
            padding: 0px 20px;
            line-height: 26px;
          }
        }
      }
      .hr-tag {
        padding: 15px;
        .title {
          color: #82b0ff;
          padding-bottom: 10px;
          span {
            padding-left: 10px;
          }
        }
        .tag input {
          border: 1px solid @main-color-border;
        }
        .tag {
          width: 100%;
          margin-bottom: 5px;
          .el-input {
            input {
              height: 30px;
            }
            input::placeholder {
              color: @main-color-text;
            }
          }
          .el-input__inner {
            border-radius: 20px;
          }
        }
        .tag-box {
          .tag-title {
            line-height: 26px;
            font-size: 13px;
          }
          .tag-split {
            width: 30px;
            height: 2px;
            background-color: RGBA(255, 77, 150, 1);
          }
          .tag-content {
            font-size: 12px;
            line-height: 1.3;
            color: @main-color-gray;
            padding: 5px 0;
          }
        }
      }
    }
    .post-resume {
      text-align: right;
      padding-top: 10px;
      .resume-btn {
        border: 1px solid @main-color-blue;
        color: @main-color-blue;
      }
    }
  }
  .dialog {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 21;
    position: absolute;
    top: 0;
    left: 0;
    .post-box {
      width: 650px;
      background-color: #fff;
      border-radius: 8px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -200px;
      margin-left: -325px;
      padding: 50px 0;
      .post-success {
        width: 370x;
        height: auto;
        margin: 0 auto;
      }
      .title {
        line-height: 30px;
        font-weight: 600;
        padding-top: 10px;
      }
      .date {
        font-size: 12px;
        color: @main-color-gray;
        margin-bottom: 20px;
      }
      .back-btn {
        width: 140px;
        height: 36px;
        color: #fff;
        text-align: center;
        background-color: @main-color-blue;
      }
    }
  }
  .resume-preview {
    width: 1200px;
    height: calc(100% - 40px);
    margin: 20px auto;
    background-color: @main-color-bg;
    padding-bottom: 25px;
    overflow-y: auto;
    .preview-container {
      padding: 40px;
      .preview-center-content {
        left: 0;
      }
    }
  }
}
</style>


