<template>
  <div class="view-freshstudent-resume">
    <div class="container">
      <output-header :resumeId="resumeId" :templateId="''" :resumeName="baseInfo.resumeName"></output-header>
      <div class="pdf-content" id="pdfDom">
				<div class="header-bg">
					<img class="img-bg" src="../../assets/images/student-bg.png" alt="">
					<img class="avatar" :src="baseInfo.headPicAll?baseInfo.headPicAll:require('../../assets/images/man.png')" >
				</div>
				<div class="item base">
					<div class="title-box">
						<svg class="svg-icon" aria-hidden="true">
							<use xlink:href="#icon-view-base"></use>
						</svg>
						<span class="en">About Me</span>
						<span class="cn">基本信息</span>
					</div>
					<div class="item-content">
						<div class="row">
							<div class="row-item">
								<span class="name">姓名：</span>
								<span class="value">{{baseInfo.name}}</span>
							</div>
							<div class="row-item">
								<span class="name">手机号码：</span>
								<span class="value">{{baseInfo.phone}}</span>
							</div><div class="row-item">
								<span class="name">政治面貌：</span>
								<span class="value">{{baseInfo.politicalOutlookName}}</span>
							</div>
						</div>
						<div class="row">
							<div class="row-item">
								<span class="name">籍贯：</span>
								<span class="value">{{baseInfo.nativePlaceName}}</span>
							</div>
							<div class="row-item">
								<span class="name">出生日期：</span>
								<span class="value">{{baseInfo.birth?baseInfo.birth.slice(0,10): ''}}</span>
							</div><div class="row-item">
								<span class="name">求职意向：</span>
								<span class="value">{{baseInfo.jobIntention}}</span>
							</div>
						</div>
						<div class="row">
							<div class="row-item">
								<span class="name">性别：</span>
								<span class="value">{{baseInfo.sex===1?'男':'女'}}</span>
							</div>
							<div class="row-item">
								<span class="name">邮箱地址：</span>
								<span class="value">{{baseInfo.email}}</span>
							</div><div class="row-item">
								<span class="name">婚姻状态：</span>
								<span class="value">{{baseInfo.marriageStatusName}}</span>
							</div>
						</div>
						<div class="row">
							<div class="row-item">
								<span class="name">民族：</span>
								<span class="value">{{baseInfo.nation}}</span>
							</div>
							<div class="row-item">
								<span class="name">现居住地：</span>
								<span class="value">{{baseInfo.address}}</span>
							</div>
							<div class="row-item"></div>
						</div>
					</div>
				</div>
				<div class="item eva" v-if="baseInfo.evaluate">
					<div class="title-box">
						<svg class="svg-icon" aria-hidden="true">
							<use xlink:href="#icon-view-eva"></use>
						</svg>
						<span class="en">Self evaluation</span>
						<span class="cn">自我评价</span>
					</div>
					<div class="item-content">
						<div class="eva">{{baseInfo.evaluate}}</div>
					</div>
				</div>
				<div class="item edu" v-if="eduList.length">
					<div class="title-box">
						<svg class="svg-icon" aria-hidden="true">
							<use xlink:href="#icon-view-edu"></use>
						</svg>
						<span class="en">Education experience</span>
						<span class="cn">教育经历</span>
					</div>
					<div class="item-content">
						<div v-for="(edu,index) in eduList" :key="index">
							<div class="row">
								<div class="row-item">
									<span class="value">{{edu.startTime.slice(0,7)}}至{{edu.endTime.slice(0,7)}}</span>
								</div>
								<div class="row-item">
									<span class="value">{{edu.schoolName}}</span>
								</div>
								<div class="row-item">
									<span class="value">{{edu.eduMajor}}（{{edu.degreeName}}）</span>
								</div>
							</div>
							<div class="job-desc" v-if="edu.eduDesc">
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
				<div class="item intership" v-if="internshipList.length">
					<div class="title-box">
						<svg class="svg-icon" aria-hidden="true">
							<use xlink:href="#icon-view-intership"></use>
						</svg>
						<span class="en">Internship practice</span>
						<span class="cn">实习实践</span>
					</div>
					<div class="item-content">
						<div v-for="(intership,index) in internshipList" :key="index">
							<div class="row">
								<div class="row-item">
									<span class="value">{{intership.startTime.slice(0,7)}}至{{intership.endTime.slice(0,7)}}</span>
								</div>
								<div class="row-item">
									<span class="value">{{intership.companyName}}</span>
								</div>
								<div class="row-item">
									<span class="value">{{intership.schoolWorkName}}</span>
								</div>
							</div>
							<div class="job-desc" v-if="intership.schoolWorkDesc">
                <div class="desc-text gray">主修内容：</div>
                <div class="desc-content">
                  <ul class="desc-list">
                    <li class="desc-item">{{intership.schoolWorkDesc}}</li>
                  </ul>
                </div>
              </div>
							<div class="job-desc" v-if="intership.workResult">
                <div class="desc-text gray">实践成果：</div>
                <div class="desc-content">
                  <ul class="desc-list">
                    <li class="desc-item">{{intership.workResult}}</li>
                  </ul>
                </div>
              </div>
							<div class="job-desc" v-if="intership.growHarvest">
                <div class="desc-text gray">成长收获：</div>
                <div class="desc-content">
                  <ul class="desc-list">
                    <li class="desc-item">{{intership.growHarvest}}</li>
                  </ul>
                </div>
              </div>
						</div>
					</div>
				</div>
				<div class="item schoolexper" v-if="schoolJobExperList.length">
					<div class="title-box">
						<svg class="svg-icon" aria-hidden="true">
							<use xlink:href="#icon-view-edu"></use>
						</svg>
						<span class="en">Campus experience</span>
						<span class="cn">校园经历</span>
					</div>
					<div class="item-content">
						<div v-for="(school,index) in schoolJobExperList" :key="index">
							<div class="row">
								<div class="row-item">
									<span class="value">{{school.startTime.slice(0,7)}}至{{school.endTime.slice(0,7)}}</span>
								</div>
								<div class="row-item">
									<span class="value">{{school.clubName}}</span>
								</div>
								<div class="row-item">
									<span class="value">{{school.schoolWorkName}}</span>
								</div>
							</div>
							<div class="job-desc" v-if="school.responsibleContent">
                <div class="desc-text gray">实践内容：</div>
                <div class="desc-content">
                  <ul class="desc-list">
                    <li class="desc-item">{{school.responsibleContent}}</li>
                  </ul>
                </div>
              </div>
							<div class="job-desc" v-if="school.workResult">
                <div class="desc-text gray">实践成果：</div>
                <div class="desc-content">
                  <ul class="desc-list">
                    <li class="desc-item">{{school.workResult}}</li>
                  </ul>
                </div>
              </div>
							<div class="job-desc" v-if="school.growHarvest">
                <div class="desc-text gray">成长收获：</div>
                <div class="desc-content">
                  <ul class="desc-list">
                    <li class="desc-item">{{school.growHarvest}}</li>
                  </ul>
                </div>
              </div>
						</div>
					</div>
				</div>
				<div class="item honor" v-if="honorList.length">
					<div class="title-box">
						<svg class="svg-icon" aria-hidden="true">
							<use xlink:href="#icon-view-honor"></use>
						</svg>
						<span class="en">Honorary title</span>
						<span class="cn">荣誉称号</span>
					</div>
					<div class="item-content">
						<div v-for="(honor,index) in honorList" :key="index">
							<div class="row">
								<div class="row-item">
									<span class="value">{{honor.honorTime.slice(0,7)}}</span>
								</div>
								<div class="row-item">
									<span class="value">{{honor.honorPrize}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="item skill" v-if="skillList.length">
					<div class="title-box">
						<svg class="svg-icon" aria-hidden="true">
							<use xlink:href="#icon-view-skill"></use>
						</svg>
						<span class="en">Skill certificate</span>
						<span class="cn">技能证书</span>
					</div>
					<div class="item-content">
						<div v-for="(skill,index) in skillList" :key="index">
							<div class="row">
								<div class="row-item">
									<span class="value">{{skill.skillTime.slice(0,7)}}</span>
								</div>
								<div class="row-item">
									<span class="value">{{skill.name}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="item hobby" v-if="baseInfo.hobby">
					<div class="title-box">
						<svg class="svg-icon" aria-hidden="true">
							<use xlink:href="#icon-view-hobby"></use>
						</svg>
						<span class="en">Hobby</span>
						<span class="cn">兴趣爱好</span>
					</div>
					<div class="item-content">
						<div class="eva">{{baseInfo.hobby}}</div>
					</div>
				</div>
      </div>
    </div>
  </div>
</template>
<script>
import time from "@/api/time.js";
import outputHeader from '@/components/OutputHeader.vue'
export default {
  name: "viewFreshStudentResume",
  data() {
    return {
      resume: {},
      baseInfo: {},
      expectInfo: {},
			evaluateInfo: {},
			eduList: [],
      internshipList: [],
      schoolJobExperList: [],
			honorList: [],
			skillList: [],
			hobbyInfo: {},
    };
  },
  created() {
    this.resumeId = this.$route.query.resumeId;
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
          this.internshipList = res.data.schoolPostList || [];
          this.eduList = res.data.educationList || [];
          this.honorList = res.data.schoolHonorList || [];
          this.schoolJobExperList = res.data.schoolJobexpList || [];
          this.skillList = res.data.skillsList || [];
          this.hobbyInfo = res.data.resumeBaseInfo || {};
          //计算工作时间
          // for (var item of this.workExperList) {
          //   item.time_solt = time.getTime(item.startTime, item.endTime);
          // }
          //图片格式转base64
          if(this.baseInfo.headPicAll){
            var img = new Image();
            img.src = this.baseInfo.headPicAll
            img.crossOrigin = "*";
            var that = this
            img.onload = function(){
              that.baseInfo.headPicAll = that.getBase64Image(img)
            }
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
    //图片转换为base64格式(用于PDF导出)
    getBase64Image(img){
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
      var dataURL = canvas.toDataURL("image/"+ext);
      return dataURL;
    }
  },
  components :{
    outputHeader
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.view-freshstudent-resume {
  padding-bottom: 30px;
  .container {
    width: 1020px;
		margin: 0 auto;
		background-color: #F9F9F9;
		.header-bg {
			width: 100%;
			position: relative;
			margin-bottom: 75px;
			.img-bg {
				width: 100%;
				height: auto;
			}
			.avatar {
				width: 150px;
				height: 150px;
				border-radius: 50%;
				position: absolute;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.item {
			padding: 10px 30px;
			&:last-child {
				padding-bottom: 50px;
			}
			.title-box {
				line-height: 40px;
				border-bottom: 1px solid #CDCDCD;
				margin-bottom: 10px;
				.svg-icon {
					font-size: 24px;
					margin-right: 5px;
				}
				.en {
					font-family: DINCondensed-Bold;
					font-size: 20px;
					color: #555C70;
					margin-right: 10px;
				}
				.cn {
					font-size: 20px;
					color: #666;
				}
			}
			.name {
				color: #666;
			}
			.value {
				color: #999;
				line-height: 20px;
			}
			.row{
				display: flex;
				.row-item {
					flex: 3;
					margin: 10px 0;
				}
			}
			.eva {
				color: #999;
				line-height: 26px;
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
							line-height: 22px;
							color: #999;
						}
					}
				}
			}
		}
		.edu {

		}




    
  }
}
</style>

