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
              <el-select size="small" v-model="tag" placeholder="请选择" class="tag">
                <el-option
                  v-for="item in tags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <div class="tag">基本信息</div> -->
              <div class="tag-box">
                <div class="tag-title">姓名</div>
                <div class="tag-split"></div>
                <div class="tag-content">姓名是HR发出面试邀约和offer所需要的重要信息，不可有误。</div>
              </div>
              <div class="tag-box">
                <div class="tag-title">性别</div>
                <div class="tag-split"></div>
                <div class="tag-content">部分工种对性别有要求，但不会明写在岗位描述中，（因劳动法有规定不能有性别歧视）但HR会根据面试者的性别去进行相应判断，
                  如果不适合则不会发出面试邀约，节省彼此的时间。</div>
              </div>
              <div class="tag-box">
                <div class="tag-title">出生日期(年龄)</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.根据年龄判断工作年限是否差异较大 
                  2.不乏有企业老板或者部门领导对面试者的星座、年龄等有所要   求。如果硬性要求不符合，可通过简历的初筛节省双方的时间。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">电话号码</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.电话号码是用人单位联系面试者的最常用工具，保持电话畅通才不会漏过每一个面试邀约。
                  2.HR拨打求职者的电话号码，一般用的是公司的座机，拨打归属地为本地的号码可直接拨通，拨打外地号码需要加拨“0”，若求职者电话为外地号码，可能会影响HR对该求职者电话邀约的可能性，HR也会考虑该求职者的稳定性等。
                  3.建议办理求职当地的手机号码，在一定程度上增大面试几率。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">联系邮箱</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.邮箱为用人单位（企业）发送面试信息、录取offer等文件资料的重要通讯工具，需要保证邮箱状态正常。
                  2.一般企业不会因为你的邮箱为QQ邮箱而放弃对你的面试邀请，所以不必为了面试专门申请邮箱，只需要保证邮箱常用且能正常收发邮件即可。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">现居地</div>
                <div class="tag-split"></div>
                <div class="tag-content">根据求职者现居地判断到公司路程远近，一般在北上深这样的城市单程1小时内是求职者可以接受的路程范围，
                  如果太远则求职者可能会不稳定。电话沟通时也会问求职者是自住房还是租房，如果路程较远是否考虑公司附近租房等。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">工作经验</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.一般情况下正式工作是以拿到毕业证起开始计算时间的，未取得毕业证学位证之前的实习或工作不计入工作经验中。
                  2.实习期间无法确保该员工的稳定性，一般实习生所承担的工作也不会是含金量高的内容，所以全职工作经验与实习/兼职通常不放在一起衡量。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">婚姻状况</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.女性求职者在适婚年龄会涉及到婚假、产假等带薪假期，会对企业造成一定的影响，包括企业的用人成本、工作的持续程度等
                  2.已婚者通常没有未婚者在工作上投入的精力多，事业家庭兼顾的情况势必会有侧重。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">期望薪资</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.期望薪资是求职者心里对该岗位及公司所能给到的待遇的一个预估及对自我情况的判断。
                  2.过高的期望薪资会给HR造成的印象是此求职者眼高手低，不能脚踏实地，降低电话邀约的概率；
                  3.过低的期望薪资会给HR造成的印象是此求职者对自己不自信，或者此求职者存在其他问题，也会有邀约的顾虑；
                  4.符合市场行情的期望薪资是最正常的和最安全的选择，具体薪资需等到面试通过再进行。一般情况用人单位会给到该岗位合理的薪资，在面试后谈薪资时请注意薪资的构成。
                  （底薪+绩效+补贴+年终奖+每年多少薪等）。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">到岗时间</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.若用人单位急需用人，则希望求职者立即到岗，筛选简历会看求职者的到岗时间来进行邀约判断，若选择到岗时间的周期较长，可能在简历初筛阶段就被淘汰掉了。
                  2.同一岗位的缺口是有限的，当同时有多个条件均等的候选人，则选择最快到岗的那一位；
                  3.用人单位的用人规划可能实时在调整，到岗时间越近则变数越小，减少出现面试到了合适的候选人，但由于候选人迟迟无法到岗，公司战略调整该岗位缩编不再需要补人的情况。
                  4.一般情况下，到岗时间选择1周内。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">工作类型</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.全职一般指求职者为满足该岗位需求的可签署劳动合同的自然人，毕业生已取得学历证、学位证，且人事档案、组织关系等根据招聘方需求可选择转入该公司，公司为全职员工依法缴纳社保公积金等，正常情况下员工要保证每周不低于40小时的上班时间。
                  2.兼职一般为企业用工的补充形式，以固定的时间段或者固定的工作量来支付给劳动者报酬，但劳动者可同时服务于其他企业或公司，且该公司不用为劳动者缴纳社保、公积金等。
                  3.实习生指还未取得学位证、毕业证的学生劳动单位进行工作，但工作时间与全职员工一致，签署实习协议，如能留任则签署“三方协议”，等拿到毕业证、学位证之后签署正式劳动合同。实习期间不缴纳社保、公积金，报酬可按月计算，也可按出勤天数计算。
                </div>
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
        <div class="date">2018-05-03 11:02</div>
        <el-button size="small" round class="back-btn">返回</el-button>
      </div>
    </div>
    <!-- 简历预览弹框 -->
    <div class="dialog" v-if="showPreview" @click.self="showPreview=false">
      <div class="resume-preview">
        <div class="preview-container">
          <el-row :gutter="10" class="el-content">
            <el-col :span="24" class="preview-center-content">
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
    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
import baseBox from '../components/Resume/base.vue';
import expectBox from '../components/Resume/expect.vue';
import evaluateBox from '../components/Resume/evaluate.vue';
import workExperBox from '../components/Resume/workexper.vue';
import eduBox from '../components/Resume/edu.vue';
import schoolBox from '../components/Resume/school.vue';
import skillBox from '../components/Resume/skills.vue';
import { mapState } from "vuex";
export default {
  name: "resume",
  data() {
    return {
      showSuccessDialog: false,
      showPreview:false,
      tag: "",
      tabIndex: 0,
      tags: [
        {
          value: 0,
          label: "基本信息"
        },
        {
          value: 1,
          label: "自我评价"
        },
        {
          value: 2,
          label: "求职意向"
        },
        {
          value: 3,
          label: "工作经验"
        },
        {
          value: 4,
          label: "教育经历"
        },
        {
          value: 5,
          label: "在校情况"
        },
        {
          value: 6,
          label: "技能证书"
        }
      ],
      resume: {},

      //数据对象
      //基本信息
      baseInfo: {
        name: '',
        sex: 0,
        birth: '',
        phone: '',
        email: '',
        nativePlace: '',
        workYear: '',
        jobStatus: 0,
        careerType: 0,
        marriageStatus: 0,
        address: ''
      },
      //求职意向
      expectInfo: {
        expect_salary: 0,
        expect_work_place: '',
        expect_position: 0,
        expect_industry: 0,
        expect_work_type: 0,
        arrive_time: ''
      },
      //自我评价
      evaluateInfo: {},
      //工作经验
      workExperList: [],
      eduList: [],
      schoolHonorList: [],
      schoolWorkList: [],
      skillList: [],

    };
  },
  computed: {},
  beforeCreate: function() {},
  created: function() {
    this.getResumeInfo();
  },
  mounted: function() {},
  updated: function(){},
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
    },
    //更新数据
    updateInfo: function(){
      this.getResumeInfo()
    },
    //提交简历
    postResume: function() {
      this.showSuccessDialog = true;
    },
    //预览
    preview: function(){
      this.showPreview = true;
      //跳页面 预览
      // this.$router.push('ResumePreview');
    }
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
    skillBox
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
  .container, .preview-container {
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
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
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
      .save-close {
        line-height: 30px;
        padding: 10px;
        span {
          margin: 0 10px;
        }
      }
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
              .el-radio__input.is-checked+.el-radio__label {
                color: @main-color-text;
              }
              .select-box {
                width: 180px;
              }
              input {
                width: 180px;
                height: 30px;
                line-height: 30px;
                // box-sizing: border-box;
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


