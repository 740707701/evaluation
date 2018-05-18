<template>
  <div class="resume-preview">
    <div class="container">
      <el-row :gutter="10" class="el-content">
        <el-col :span="24" class="center-content">
          <baseBox :baseInfo="baseInfo" preview="true"></baseBox>
          <expectBox :expectInfo="expectInfo" preview="true"></expectBox>
          <evaluateBox :evaluateInfo="evaluateInfo" preview="true"></evaluateBox>
          <workExperBox :workExperList="workExperList" preview="true"></workExperBox>
          <eduBox :eduList="eduList" preview="true"></eduBox>
          <schoolBox :schoolHonorList="schoolHonorList" :schoolWorkList="schoolWorkList" preview="true"></schoolBox>
          <skillBox :skillList="skillList" preview="true"></skillBox>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import baseBox from '../components/Resume/base.vue';
import expectBox from '../components/Resume/expect.vue';
import evaluateBox from '../components/Resume/evaluate.vue';
import workExperBox from '../components/Resume/workexper.vue';
import eduBox from '../components/Resume/edu.vue';
import schoolBox from '../components/Resume/school.vue';
import skillBox from '../components/Resume/skills.vue';
export default {
  name: "resumePreview",
  data() {
    return {
      baseInfo: {},
      expectInfo: {},
      evaluateInfo: {},
      workExperList: [],
      eduList: [],
      schoolHonorList: [],
      schoolWorkList: [],
      skillList: []
    };
  },
  created: function() {
    this.getResumeInfo();
  },
  methods: {
    //获取简历信息
    getResumeInfo: function() {
      this.$store
        .dispatch("RESUME_INFO", { creator: "cc" })
        .then(res => {
          this.resume = res.data;
          this.baseInfo =res.data.resumeBaseInfo;
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
    }
  },
  components: {
    baseBox,
    expectBox,
    evaluateBox,
    workExperBox,
    eduBox,
    schoolBox,
    skillBox
  }
};
</script>
<style lang="less" scope>
@import url("../assets/css/colors.less");
.resume-preview {
  width: 100%;
  background-color: @main-color-bg;
  padding: 25px;
  .container {
    width: 1200px;
    margin: 0 auto;
    .el-content {
      height: 100%;
    }
    .right-icon {
      float: right;
      color: @main-color-yellow;
      cursor: pointer;
    }
    .gray {
      color: @main-color-gray;
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
    .grid-content {
      border-radius: 8px;
      min-height: 36px;
      background-color: #fff;
      box-shadow: RGBA(162, 169, 184, 0.15);
      box-shadow: 8px 0px 10px RGBA(162, 169, 184, 0.15);
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
              .el-radio__input.is-checked+.el-radio__label {
                color: @main-color-text;
              }
              .select-box {
                width: 180px;
              }
              input[type='text'] {
                width: 180px;
              }
            }
            .input-box:last-child {
              text-align: right;
            }
            .text-left {
              text-align: left !important;
            }
            .work-desc {
              width:100%;
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
          width: 100%;;
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
            padding: 5px 20px;
            line-height: 26px;
          }
        }
      }
    }
  }
}
</style>


