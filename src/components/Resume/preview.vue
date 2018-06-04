<template>
    <div>
      <div class="base-info">
        <div id="base" class="grid-content info-box">
          <div class="base-info">
            <div class="title">
              <i class="iconfont icon-user"></i>
              <span>基本信息</span>
            </div>
            <div class="base-content">
              <div class="avatar">
                <img :src="baseInfo.headPicAll" alt="">
              </div>
              <div class="info-list">
                <div class="name">
                  <span>{{baseInfo.name}}</span>
                </div>
                <div class="status">
                  <span>现居住：{{baseInfo.address}}</span>
                  <span v-if="baseInfo.workTime">{{baseInfo.workTime}}年工作经验</span>
                  <span>{{baseInfo.sex==1?'男':'女'}}</span>
                  <span v-if="baseInfo.age">{{baseInfo.age}}岁 ({{baseInfo.birth?baseInfo.birth.slice(0,10): ''}})</span>
                  <span>{{baseInfo.jobStatusName}}</span>
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
              <div class="more-info" v-if="baseInfo.nativePlaceName || baseInfo.marriageStatusName">
                <span v-if="baseInfo.nativePlaceName">户口/国籍：{{baseInfo.nativePlaceName}}</span>
                <span v-if="baseInfo.marriageStatusName">婚姻状态：{{baseInfo.marriageStatusName}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="expext-info" v-if="expectInfo.expectSalaryName">
        <div id="job" class="grid-content info-box">
          <div class="base-info">
            <div class="title">
              <i class="iconfont icon-job"></i>
              <span>求职意向</span>
            </div>
            <ul class="item-list">
              <li>
                <span class="item">
                  <span class="name">期望工资： </span>{{expectInfo.expectSalaryName}}元/月
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
          </div>
        </div>
      </div>
      <div class="evaluate-info" v-if="evaluateInfo.evaluate">
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
      <div class="work-exper" v-if="workExperList">
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
              </div>
              <div class="job-type">
                <span><span class="gray">公司类型：</span>{{exper.industryName}}</span>
                <span><span class="gray">公司人数：</span>{{exper.companySizeName}}人</span>
                <span><span class="gray">公司性质：</span>{{exper.companyNatureName}}</span>
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
      <div class="edu-info" v-if="eduList">
        <div id="education" class="grid-content info-box">
          <div class="base-info">
            <div class="title">
              <i class="iconfont icon-edu"></i>
              <span>教育经历</span>
            </div>
            <div class="job-item" v-for="edu in eduList" :key="edu.id">
              <div class="job-time">
                <span class="gray">{{edu.startTime.slice(0,10)}} - {{edu.endTime.slice(0,10)}}</span>
                <span>{{edu.schoolName}}</span>
                <span>{{edu.eduMajorName}}（{{edu.degreeName}}）</span>
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
        </div>
      </div>
      <div class="school-info" v-if="schoolHonorList || schoolWorkList">
        <div id="school" class="grid-content info-box">
          <div class="base-info">
            <div class="title">
              <i class="iconfont icon-school"></i>
              <span>在校情况</span>
            </div>
            <div class="schoolwork">
              <div class="honor" v-if="schoolHonorList">
                <div class="school-type">
                  <span>校内荣誉</span>
                </div>
                <ul class="honor-list job-item">
                  <li v-for="honor in schoolHonorList" :key="honor.id">
                    <div class="job-time">
                      <span class="gray">{{honor.honorTime.slice(0, 10)}}</span>
                      <span>{{honor.honorPrize}}</span>
                      <span>{{honor.honorLevel}}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="post" v-if="schoolWorkList">
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
          </div>
        </div>
      </div>
      <div class="skill-info" v-if="skillList">
        <div id="skill" class="grid-content info-box">
          <div class="base-info">
            <div class="title">
              <i class="iconfont icon-skill"></i>
              <span>技能证书</span>
            </div>
            <ul class="skill">
              <li v-for="skill in skillList" :key="skill.id">
                <span class="gray">{{skill.skillTime.slice(0,10)}}</span>
                <span>{{skill.name}}</span>
                <span>{{skill.score}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "preview",
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
  props: ["baseParams"],
  created: function() {
    this.getResumeInfo();
  },
  methods: {
    //获取简历信息
    getResumeInfo: function() {
      let params = {
        updator: this.baseParams.updator,
        creator: this.baseParams.creator,
        resumeId: this.baseParams.resumeId,
      }
      this.$store
        .dispatch("RESUME_INFO", params)
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
  }
};
</script>
<style lang="less" scope>
</style>


