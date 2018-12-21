<template>
  <div class="resume-preview">
    <div class="container">
      <el-row :gutter="10" class="el-content">
        <el-col :span="24" class="center-content">
          <div class="base-info">
            <div id="base" class="grid-content info-box">
              <div class="base-info">
                <div class="title">
                  <i class="iconfont icon-user"></i>
                  <span>基本信息</span>
                </div>
                <div class="base-content">
                  <div class="avtar">
                    <img src="../../assets/images/man.png" alt="">
                  </div>
                  <div class="info-list">
                    <div class="name">
                      <span>{{baseInfo.name}}</span>
                      <i class="iconfont icon-edit right-icon"></i>
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
                      
                    </div>
                  </div>
                  <div class="more-info">
                    <span class="arrow-top"></span>
                    <span>户口/国籍：{{baseInfo.address}}</span>
                    <span>婚姻状态：{{baseInfo.marriageStatusName}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="expext-info">
            <div id="job" class="grid-content info-box">
              <div class="base-info">
                <div class="title">
                  <i class="iconfont icon-job"></i>
                  <span>求职意向</span>
                </div>
                <ul class="item-list">
                  <li>
                    <span class="item">
                      <span class="name">期望工资： </span>{{expectInfo.expectSalary}}元/月
                    </span>
                    <span class="item">
                      <span class="name">工作地点： </span>{{expectInfo.expectPlace}}
                    </span>
                  </li>
                  <li>
                    <span class="item">
                      <span class="name">职能/职位： </span>{{expectInfo.expectPosition}}
                    </span>
                    <span class="item">
                      <span class="name">工作类型：  </span>{{expectInfo.expectWorkType}}
                    </span>
                  </li>
                  <li>
                    <span class="item">
                      <span class="name">行业： </span>{{expectInfo.expectIndustry}}
                    </span>
                    <span class="item">
                    <span class="name">到岗时间： </span>{{expectInfo.arriveTime}}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="evaluate-info">
            <div id="evaluate" class="grid-content info-box">
              <div class="base-info">
                <div class="title">
                  <i class="iconfont icon-evaluate"></i>
                  <span>自我评价</span>
                </div>
                <div class="evaluate-box" v-if="evaluateInfo.evaluate">
                  <div class="evaluate-text">{{evaluateInfo.evaluate}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="work-exper" v-if="workExperList.length">
            <div id="work" class="grid-content info-box">
              <div class="base-info">
                <div class="title">
                  <i class="iconfont icon-work"></i>
                  <span>工作经验</span>
                </div>
                <div class="job-item" v-for="exper in workExperList" :key="exper.id">
                  <div class="job-time">
                    <span class="gray">{{exper.startTime.slice(0,10)}} - {{exper.endTime.slice(0,10)}}</span>
                    <span>{{exper.companyName}}</span>
                    <span>{{exper.deparment}}</span>
                    <span class="icon-box" v-if="!preview">
                      <i class="iconfont icon-edit" @click="editWorkExper(exper.id)"></i>
                      <i class="iconfont icon-delete" @click="deleteWorkExper(exper.id)"></i>
                    </span>
                  </div>
                  <div class="job-type">
                    <span><span class="gray">公司类型：</span>{{exper.industry}}</span>
                    <span><span class="gray">公司人数：</span>{{exper.companySize}}人</span>
                    <span><span class="gray">公司性质：</span>{{exper.companyNature}}</span>
                    <span><span class="gray">所属部门：</span>{{exper.department}}</span>
                  </div>
                  <div class="job-desc">
                    <div class="desc-text gray">工作描述：</div>
                    <div class="desc-content">
                      <ul class="desc-list">
                        <li class="desc-item">{{exper.workDesc}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="edu-info" v-if="eduList.length">
            <div id="education" class="grid-content info-box">
              <div class="base-info">
                <div class="title">
                  <i class="iconfont icon-edu"></i>
                  <span>教育经历111</span>
                </div>
                <div class="job-item" v-for="edu in eduList" :key="edu.id">
                  <div class="job-time">
                    <span class="gray">{{edu.startTime.slice(0,10)}} - {{edu.endTime.slice(0,10)}}</span>
                    <span>{{edu.schoolName}}</span>
                    <span>{{edu.eduMajor}}（{{edu.degree}}）</span>
                    <span class="icon-box" v-if="!preview">
                      <i class="iconfont icon-edit" @click="editEdu(edu.id)"></i>
                      <i class="iconfont icon-delete" @click="deleteEdu(edu.id)"></i>
                    </span>
                  </div>
                  <div class="job-desc">
                    <div class="desc-text gray">专业描述：</div>
                    <div class="desc-content">
                      <ul class="desc-list">
                        <li class="desc-item">{{edu.majorDesc}}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="job-desc">
                    <div class="desc-text gray">学习课程：</div>
                    <div class="desc-content">
                      <ul class="desc-list">
                        <li class="desc-item">{{edu.eduDesc}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="school-info">
            <div id="school" class="grid-content info-box">
              <div class="base-info">
                <div class="title">
                  <i class="iconfont icon-school"></i>
                  <span>在校情况</span>
                </div>
                <div class="schoolwork">
                  <div class="honor">
                    <div class="school-type">
                      <span>校内荣誉</span>
                    </div>
                    <ul class="honor-list job-item" v-if="schoolHonorList">
                      <li v-for="honor in schoolHonorList" :key="honor.id">
                        <div class="job-time">
                          <span class="gray">{{honor.honorName.slice(0, 10)}}</span>
                          <span>{{honor.honorName}}</span>
                          <span>{{honor.honorTitle}}</span>
                          <span class="icon-box"  v-if="!preview">
                            <i class="iconfont icon-edit" @click="editSchoolHonor(honor.id)"></i>
                            <i class="iconfont icon-delete" @click="deleteSchoolHonor(honor.id)"></i>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="post">
                    <div class="school-type">
                      <span>校内职务</span>
                    </div>
                    <ul class="post-list" v-if="schoolWorkList">
                      <li class="job-item" v-for="work in schoolWorkList" :key="work.id">
                        <div class="job-time">
                          <span class="gray">{{work.startTime.slice(0, 10)}} - {{work.endTime.slice(0, 10)}}</span>
                          <span>{{work.schoolWorkName}}</span>
                          <span></span>
                          <span class="icon-box" v-if="!preview">
                            <i class="iconfont icon-edit" @click="editSchoolWork(work.id)"></i>
                            <i class="iconfont icon-delete" @click="deleteSchoolWork(work.id)"></i>
                          </span>
                        </div>
                        <div class="job-desc">
                          <div class="desc-text gray">学习课程：</div>
                          <div class="desc-content">
                            <ul class="desc-list">
                              {{work.schoolWorkDesc}}
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="skill-info">
            <div id="skill" class="grid-content info-box">
              <div class="base-info">
                <div class="title">
                  <i class="iconfont icon-skill"></i>
                  <span>技能证书</span>
                </div>
                <ul class="skill" v-if="skillList">
                  <li v-for="skill in skillList" :key="skill.id">
                    <span class="gray">{{skill.skillTime.slice(0,10)}}</span>
                    <span>{{skill.name}}</span>
                    <span>{{skill.score}}</span>
                    <span class="icon-box" v-if="!preview">
                      <i class="iconfont icon-edit" @click="editSkill(skill.id)"></i>
                      <i class="iconfont icon-delete" @click="deleteSkill(skill.id)"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
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
    }
  },
  components: {}
};
</script>
<style lang="less" scope>
@import "../../assets/css/colors.less";
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
              .el-radio__input.is-checked + .el-radio__label {
                color: @main-color-text;
              }
              .select-box {
                width: 180px;
              }
              input[type="text"] {
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
            padding: 5px 20px;
            line-height: 26px;
          }
        }
      }
    }
  }
}
</style>


