<template>
  <div class="view-resume">
    <div class="container">
      <div class="header">
        <img src="../assets/images/logo.svg" alt="" class="logo">
        <div class="output" v-if="!isPreview" @click="showExport=true">
          <i class="iconfont icon-daochu"></i>
          <span>导出</span>
        </div>
      </div>
      <div class="base-content">
        <div class="avatar" >
          <img :src="baseInfo.headPicAll?baseInfo.headPicAll:require('../assets/images/man.png')" >
        </div>
        <div class="info-list">
          <div class="name">
            <span>{{baseInfo.name}}</span>
          </div>
          <div class="status">
            <span>{{baseInfo.jobStatusName}}</span>
            <span>
              <i class="iconfont icon-phone"></i>{{baseInfo.phone}}
            </span>
            <span v-if="baseInfo.email">
              <i class="iconfont icon-email"></i>{{baseInfo.email}}
            </span>
          </div>
          <div class="concat">
            <span v-if="baseInfo.sex==1">男</span>
            <span v-if="baseInfo.sex==2">女</span>
            <span class="split">|</span>
            <span v-if="baseInfo.age">{{baseInfo.age}}岁</span>
            <span class="split">|</span>
            <span v-if="baseInfo.birth">({{baseInfo.birth?baseInfo.birth.slice(0,10): ''}})</span>
            <span class="split">|</span>
            <span v-if="baseInfo.workTime">{{baseInfo.workTime}}年工作经验</span>
            <span class="split">|</span>
            <span v-if="baseInfo.address">现居住：{{baseInfo.address}}</span>
          </div>
        </div>
      </div>
      <div class="work-box">
        <ul class="item-list">
          <li>
            <span class="item">
              <span class="item-title">最近工作</span>
            </span>
          </li>
          <li>
            <span class="item">
              <span class="name">职位： </span>
              <span v-if="workExperList.length">{{workExperList[0].position}}</span>
            </span>
          </li>
          <li>
            <span class="item">
              <span class="name">公司： </span>
              <span v-if="workExperList.length">{{workExperList[0].companyName}}</span>
              
            </span>
          </li>
          <li>
            <span class="item">
              <span class="name">行业： </span>
              <span v-if="workExperList.length">{{workExperList[0].industryName}}</span>
            </span>
          </li>
        </ul>
        <ul class="item-list">
          <li>
            <span class="item">
              <span class="item-title">最高学历/学位</span>
            </span>
          </li>
          <li>
            <span class="item">
              <span class="name">专业： </span>
              <span v-if="eduList.length">{{eduList[0].eduMajor}}</span>
            </span>
          </li>
          <li class="item">
            <span class="item">
              <span class="name">学校： </span>
              <span v-if="eduList.length">{{eduList[0].schoolName}}</span>
            </span>
          </li>
          <li class="item">
            <span class="item">
              <span class="name">学历/学位： </span>
              <span v-if="eduList.length">{{eduList[0].degreeName}}</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="expect item-content">
          <div class="item-title">求职意向</div>
          <ul class="item-list" v-if="expectInfo.expectSalaryName">
            <li>
              <span class="item">
                <span class="name">期望薪资： </span>{{expectInfo.expectSalaryName}}元/月
              </span>
              <span class="item">
                <span class="name">工作地点： </span>{{expectInfo.expectPlaceName}}
              </span>
            </li>
            <li>
              <span class="item">
                <span class="name">职能/职位： </span>{{expectInfo.expectPositionName}}
              </span>
              <span class="item">
                <span class="name">工作类型：  </span>{{expectInfo.expectWorkTypeName}}
              </span>
            </li>
            <li>
              <span class="item">
                <span class="name">行业： </span>{{expectInfo.expectIndustryName}}
              </span>
              <span class="item">
              <span class="name">到岗时间： </span>{{expectInfo.arriveTimeName}}
              </span>
            </li>
          </ul>
          <div class="evaluate-box">
            <span class="name">自我评价：</span> <div class="evaluate">{{baseInfo.evaluate}}</div>
          </div>
        </div>
        <div class="work-exper item-content" v-if="workExperList.length">
          <div class="item-title">工作经验</div>
          <div class="job-item" v-for="exper in workExperList" :key="exper.id">
            <div class="job-time">
              <span class="gray">{{exper.startTime.slice(0,10)}} - {{exper.endTime.slice(0,10)}}</span>
              <span>{{exper.position}}</span>&nbsp;|&nbsp;
              <span>{{exper.department}}</span>
            </div>
            <div class="job-time">
              <span>{{exper.companyName}}</span>
              <span class="gray">[{{exper.jobexpTime}}]</span>
            </div>
            <div class="job-type">
              <span>{{exper.industryName}}</span>&nbsp;|&nbsp;
              <span>{{exper.companySizeName}}</span>&nbsp;|&nbsp;
              <span>{{exper.companyNatureName}}</span>
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
        <div class="edu item-content">
          <div class="item-title">教育背景</div>
          <div class="job-item" v-for="edu in eduList" :key="edu.id">
            <div class="job-time">
              <span class="gray">{{edu.startTime.slice(0,10)}} - {{edu.endTime.slice(0,10)}}</span>
              <span>{{edu.schoolName}}</span>&nbsp;|&nbsp;
              <span>{{edu.eduMajor}}（{{edu.degreeName}}）</span>
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
              <div class="desc-text gray">主修课程：</div>
              <div class="desc-content">
                <ul class="desc-list">
                  <li class="desc-item">{{edu.eduDesc}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="school" v-if="schoolHonorList.length || schoolWorkList.length">
          <div class="item-title">在校情况</div>
          <div class="honor" v-if="schoolHonorList.length">
            <div class="school-type">
              <span>校内荣誉</span>
            </div>
            <ul class="honor-list">
              <li class="honor-item" v-for="honor in schoolHonorList" :key="honor.id">
                <span class="gray">{{honor.honorTime.slice(0, 10)}}</span>
                <span>{{honor.honorPrize}}</span>
                <span>{{honor.honorLevel}}</span>
              </li>
            </ul>
          </div>
          <div class="post" v-if="schoolWorkList.length">
            <div class="school-type">
              <span>校内职务</span>
            </div>
            <ul class="post-list">
              <li class="job-item" v-for="work in schoolWorkList" :key="work.id">
                <div class="job-time">
                  <span class="gray">{{work.startTime.slice(0, 10)}} - {{work.endTime.slice(0, 10)}}</span>
                  <span>{{work.schoolWorkName}}</span>
                  <span></span>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">职务描述：</div>
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
        <div class="skill item-content" v-if="skillList.length">
          <div class="item-title">技能证书</div>
            <ul>
              <li v-for="skill in skillList" :key="skill.id">
                <span class="gray">{{skill.skillTime.slice(0,10)}}</span>
                <span>{{skill.name}}</span>
                <span>{{skill.score}}</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
    <div class="bg" v-if="showExport" @click.self="showExport=false">
      <div class="export-box">
        <div class="top">
          <div class="title">导出简历</div>
          <div class="close" @click="showExport=false">×</div>
        </div>
        <div class="export-content">
          <div class="export-title">请选择导出格式</div>
          <div class="export-type">
            <div class="type" @click="exportType='word'">
              <input type="radio" :checked="exportType=='word'">Word文档
            </div>
            <div class="type" @click="exportType='pdf'">
              <input type="radio" :checked="exportType=='pdf'">PDF文档
            </div>
          </div>
          <div class="confirm" @click="output">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import time from "../api/time.js";
import axios from "axios";
export default {
  name: "viewResume",
  data() {
    return {
      resume: {},
      baseInfo: {},
      expectInfo: {},
      evaluateInfo: {},
      workExperList: [],
      eduList: [],
      schoolHonorList: [],
      schoolWorkList: [],
      skillList: [],
      exportType: "",
      showExport: false,
      isPreview: false,
      applicationType: ""
    };
  },
  created() {
    this.resumeId = this.$route.params.resumeId;
    this.org = this.$route.params.org;
    if (this.org == "preview") {
      this.isPreview = true;
    }
    this.getResumeInfo();
  },
  methods: {
    //获取简历信息
    getResumeInfo: function() {
      let params = {
        resumeId: this.resumeId
      };
      this.$store
        .dispatch("RESUME_INFO", params)
        .then(res => {
          this.resume = res.data;
          this.baseInfo = res.data.resumeBaseInfo || {};
          this.resumeId = res.data.resumeBaseInfo.id;
          this.evaluateInfo = res.data.resumeBaseInfo || {};
          this.expectInfo = res.data.resumeBaseInfo || {};
          this.workExperList = res.data.jobexpList || [];
          this.eduList = res.data.educationList || [];
          this.schoolHonorList = res.data.schoolHonorList || [];
          this.schoolWorkList = res.data.schoolPostList || [];
          this.skillList = res.data.skillsList || [];
          //计算工作时间
          for (var item of this.workExperList) {
            item.time_solt = time.getTime(item.startTime, item.endTime);
          }
        })
        .catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取简历失败"
            });
          }
        });
    },
    //导出
    output: function() {
      let params = {
        resumeId: this.resumeId,
        format: this.exportType
      };
      if (this.exportType == "word") {
        this.applicationType = "msword";
      } else {
        this.applicationType = "pdf";
      }
      axios
        .get(`resume/export/${this.resumeId}/${this.exportType}`, {
          responseType: "arraybuffer"
        })
        .then(res => {})
        .catch(err => {
          // console.log("err", err);
          if(err.status == 200){
            let blob = new Blob([err.data], {
              type: `application/${this.applicationType}`
            });
            let objectUrl = URL.createObjectURL(blob);
            let link = document.createElement("a");
            let fname = this.baseInfo.name || "个人简历";
            link.href = objectUrl;
            link.setAttribute("download", fname);
            document.body.appendChild(link);
            link.click();
            this.showExport = false;
          }else {
            this.$message({
              type: "error",
              message: "导出失败"
            })
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.view-resume {
  padding-bottom: 30px;
  .container {
    width: 1020px;
    margin: 0 auto;
    .header {
      height: 60px;
      .logo {
        float: left;
        width: 181px;
        height: 60px;
        margin-right: 10px;
      }
      .output {
        float: right;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        .iconfont {
          float: left;
          font-size: 26px;
          margin-right: 20px;
        }
      }
    }
    .item-content {
      padding: 0px 50px;
      padding-bottom: 10px;
      border-bottom: 1px solid @main-color-border;
    }
    .item-title {
      line-height: 40px;
      color: #818ba3;
      font-size: 16px;
    }
    .base-content {
      width: 100%;
      background-color: #3f415d;
      color: #fff;
      padding: 20px;
      display: inline-block;
      .avatar {
        float: left;
        width: 85px;
        height: 104px;
        margin-left: 27px;
        margin-right: 50px;
        img {
          width: 85px;
          height: 104px;
          border: none;
          display: inline-block;
        }
      }
      .info-list {
        margin-left: 162px;
        .name,
        .status,
        .concat {
          line-height: 30px;
        }
        .status {
          i {
            margin-right: 5px;
          }
          span {
            margin-right: 50px;
          }
        }
        .concat {
          .split {
            color: #808080;
            margin: 0 10px;
          }
        }
      }
    }
    .work-box {
      width: 100%;
      display: inline-block;
      background-color: #f5f6f7;
      padding: 0px 50px;
      .item-list {
        float: left;
        width: 50%;
        li {
          line-height: 30px;
          display: flex;
          display: -webkit-flex;
          .item {
            width: 100%;
            color: #1a1a1a;
          }
          .name {
            width: 90px;
            color: #666;
            display: inline-block;
          }
        }
      }
    }
    .content {
      border-left: 1px solid @main-color-border;
      border-right: 1px solid @main-color-border;
    }
    .expect {
      // padding: 10px 50px;
      // border-bottom: 1px solid @main-color-border;
      .item-list {
        width: 100%;
        display: inline-block;
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
          .evaluate {
            display: inline-block;
          }
        }
      }
      .evaluate-box {
        width: 100%;
        display: inline-block;
        .name {
          float: left;
          width: 90px;
          line-height: 30px;
          color: #94999e;
        }
        .evaluate {
          margin-left: 90px;
          line-height: 30px;
        }
      }
    }
    .work-exper,
    .edu,
    .school {
      .job-item {
        width: 100%;
        display: inline-block;
        padding-bottom: 10px;
        border-bottom: 1px solid @main-color-border;
        .job-time {
          line-height: 30px;
          .gray {
            color: #666;
            margin-right: 20px;
          }
        }
        .job-type {
          line-height: 30px;
          span {
            color: #666;
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
            color: #666;
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
      .job-item:last-child {
        border: none;
      }
    }
    .school {
      border-bottom: 1px solid @main-color-border;
    }
    .school {
      .item-title {
        padding-left: 50px;
      }
      .honor,
      .post {
        .school-type {
          padding-left: 50px;
          line-height: 40px;
          background-color: rgba(241, 245, 251, 1);
        }
        .honor-item {
          line-height: 40px;
          span {
            margin-right: 70px;
            max-width: 30%;
            line-height: 20px;
            vertical-align: middle;
            display: inline-block;
          }
        }
        .honor-list,
        .post-list {
          padding: 0 50px;
        }
      }
    }
    .skill {
      width: 100%;
      display: inline-block;
      li {
        width: 100%;
        line-height: 40px;
        span {
          margin-right: 70px;
          max-width: 25%;
          line-height: 20px;
          vertical-align: middle;
          display: inline-block;
        }
      }
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    .export-box {
      width: 500px;
      margin: 100px auto 0 auto;
      background-color: #fff;
      .top {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid @main-color-border;
        .title {
          font-size: 18px;
          font-weight: 500;
          display: inline-block;
        }
        .close {
          float: right;
          font-size: 20px;
          color: @main-color-gray;
          cursor: pointer;
        }
      }
      .export-content {
        padding: 20px;
        .export-title {
          color: @main-color-gray;
          line-height: 30px;
        }
        .export-type {
          height: 50px;
          line-height: 50px;
          .type {
            width: 120px;
            padding: 0 10px;
            display: inline-block;
            cursor: pointer;
            input[type="radio"] {
              margin-right: 10px;
              margin-top: -3px;
              display: inline-block;
            }
          }
        }
        .confirm {
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin: 20px auto 0 auto;
          cursor: pointer;
          color: #fff;
          border-radius: 4px;
          background-color: @main-color-blue;
        }
      }
    }
  }
}
</style>

