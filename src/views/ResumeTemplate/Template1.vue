<template>
	<div class="template1-page">
		<output-header :resumeId="resumeId" :templateId="templateId" :resumeName="baseInfo.resumeName" :org="null"></output-header>
		<div class="container" id="pdfDom">
			<div class="aside">
				<div class="img-box">
					<img :src="baseInfo.headPicAll?baseInfo.headPicAll:require('../../assets/images/man.png')" alt="" class="avatar">
				</div>
				<div class="xuedianba">
					<p class="title">{{baseInfo.name}}</p>
					<p class="sub-title">XUEDIANBA</p>
				</div>
				<div class="personal">
					<div class="title">个人资料
						<span class="en">PERSOANL</span>
					</div>
					<ul class="base-info">
						<li>
							<span class="key">生日：</span>
							<span class="value">{{baseInfo.birth?baseInfo.birth.slice(0,10): ''}}</span>
						</li>
						<li>
							<span class="key">性别：</span>
							<span v-if="baseInfo.sex==1">男</span>
							<span v-if="baseInfo.sex==2">女</span>
						</li>
						<li v-if="baseInfo.nation">
							<span class="key">民族：</span>
							<span class="value">{{baseInfo.nation}}</span>
						</li>
						<li v-if="baseInfo.nativePlaceName">
							<span class="key">籍贯：</span>
							<span class="value">{{baseInfo.nativePlaceName}}</span>
						</li>
						<li v-if="baseInfo.politicalOutlookName">
							<span class="key">政治面貌：</span>
							<span  class="value">{{baseInfo.politicalOutlookName}}</span>
						</li>
						<li v-if="baseInfo.jobIntention">
							<span class="key">求职意向：</span>
							<span  class="value">{{baseInfo.jobIntention}}</span>
						</li>
					</ul>
				</div>
				<div class="personal">
					<div class="title">联系方式
						<span class="en">CONCAT</span>
					</div>
					<ul class="base-info">
						<li>
							<span class="key">手机：</span>
							<span class="value">{{baseInfo.phone}}</span>
						</li>
						<li>
							<span class="key">邮箱：</span>
							<span class="value">{{baseInfo.email}}</span>
						</li>
						<li>
							<span class="key">现居住：</span>
							<span class="address">{{baseInfo.address}}</span>
						</li>
					</ul>
				</div>
				<div class="personal" v-if="baseInfo.evaluate">
					<div class="title">自我评价
						<span class="en">SELF-EVALUATION</span>
					</div>
					<div class="evaluation">
						<pre>{{baseInfo.evaluate}}</pre>
					</div>
				</div>
			</div>
			<div class="right-content">
				<div class="module expect" v-if="baseInfo.resumeType===2&&expectInfo.expectPositionName">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-lingdai"></i>
						</div>
						<div class="title">求职意向</div>
					</div>
					<ul class="expect-list">
						<li>
							<span class="name">岗位：</span>
							<span>{{expectInfo.expectPositionName}}</span>
						</li>
						<li>
							<span class="name">城市：</span>
							<span>{{expectInfo.expectPlaceName}}</span>
						</li>
						<li>
							<span class="name">薪资：</span>
							<span>{{expectInfo.expectSalaryName}}元/月</span>
						</li>
					</ul>
					<ul class="expect-list">
						<li>
							<span class="name">工作类型：</span>
							<span>{{expectInfo.expectWorkTypeName}}</span>
						</li>
						<li>
							<span class="name">到岗时间：</span>
							<span>{{expectInfo.arriveTimeName}}</span>
						</li>
					</ul>
				</div>
				<div class="module edu" v-if="eduList.length">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-edu1"></i>
						</div>
						<div class="title">教育经历</div>
					</div>
					<div class="work-item" v-for="edu in eduList" :key="edu.id">
						<div class="title">
							<span>{{edu.startTime.slice(0,10)}} ~ {{edu.endTime.slice(0,10)}}</span>
							<span>{{edu.schoolName}}</span>
							<span>{{edu.eduMajor}}</span>
						</div>
						<div class="content" v-if="edu.eduDesc">
							<div class="title">学习课程：</div>
							<div class="work-content">
								<pre>{{edu.eduDesc}}</pre>
							</div>
						</div>
					</div>
				</div>
				<div class="module work internship" v-if="internshipList.length&&baseInfo.resumeType===1">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-work-exper"></i>
						</div>
						<div class="title">实习实践</div>
					</div>
					<div class="work-item"  v-for="internship in internshipList" :key="internship.id">
						<div class="title">
							<span>{{internship.startTime.slice(0,10)}} ~ {{internship.endTime.slice(0,10)}}</span>
							<span>{{internship.companyName}}</span>
							<span>{{internship.schoolWorkName}}</span>
						</div>
						<div class="content">
							<div class="title">实践内容：</div>
							<div class="work-content">
								<pre>{{internship.schoolWorkDesc}}</pre>
							</div>
						</div>
						<div class="content" v-if="internship.workResult">
							<div class="title">实践成果：</div>
							<div class="work-content">
								<pre>{{internship.workResult}}</pre>
							</div>
						</div>
						<div class="content" v-if="internship.growHarvest">
							<div class="title">成长收获：</div>
							<div class="work-content">
								<pre>{{internship.growHarvest}}</pre>
							</div>
						</div>
					</div>
				</div>
				
				<div class="module work" v-if="workExperList.length&&baseInfo.resumeType===2">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-work-exper"></i>
						</div>
						<div class="title">工作经验</div>
					</div>
					<div class="work-item"  v-for="exper in workExperList" :key="exper.id">
						<div class="title">
							<span>{{exper.startTime.slice(0,10)}} ~ {{exper.endTime.slice(0,10)}}</span>
							<span>{{exper.companyName}}</span>
							<span>{{exper.position}}</span>
						</div>
						<div class="content">
							<div class="title">工作内容：</div>
							<div class="work-content">
								<pre>{{exper.workDesc}}</pre>
							</div>
						</div>
					</div>
				</div>
				<div class="module school honor" v-if="honorList.length&&baseInfo.resumeType===1">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-honor-white"></i>
						</div>
						<div class="title">荣誉称号</div>
					</div>
					<div class="honor" v-if="honorList.length">
						<div class="honor-item item" v-for="honor in honorList" :key="honor.id">
							<span class="honor-time">{{honor.honorTime.slice(0, 10)}}</span>
							<span>{{honor.honorPrize}}</span>
						</div>
					</div>
				</div>
				<div class="module school work" v-if="(schoolHonorList.length || schoolWorkList.length)&&baseInfo.resumeType===2">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-book"></i>
						</div>
						<div class="title">在校情况</div>
					</div>
					<div class="schoolwork" v-if="schoolWorkList.length">
						<div class="title">校内实践</div>
						<div class="schoolwork-item" v-for="work in schoolWorkList" :key="work.id">
							<div class="work-title">
								<span>{{work.startTime.slice(0, 10)}} ~ {{work.endTime.slice(0, 10)}}</span>
								<span>{{work.schoolWorkName}}</span>
							</div>
							<div class="work-desc" v-if="work.schoolWorkDesc">
								<div class="desc-title">实践描述：</div>
								<div class="desc-content">
									<pre>{{work.schoolWorkDesc}}</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="honor" v-if="schoolHonorList.length">
						<div class="title">校内荣誉</div>
						<div class="honor-item item" v-for="honor in schoolHonorList" :key="honor.id">
							<span class="honor-time">{{honor.honorTime.slice(0, 10)}}</span>
							<span>{{honor.honorPrize}}</span>
						</div>
					</div>
				</div>
				<div class="module skill" v-if="skillList.length">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-skill1"></i>
						</div>
						<div class="title">技能证书</div>
					</div>
					<div class="skill-list">
						<div class="item" v-for="skill in skillList" :key="skill.id">
							<span class="date honor-time">{{skill.skillTime.slice(0,10)}}</span>
							<span>{{skill.name}}</span>
						</div>
					</div>
				</div>
				<div class="module skill hobby" v-if="baseInfo.hobby&&baseInfo.resumeType===1">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-hobby-white"></i>
						</div>
						<div class="title">兴趣爱好</div>
					</div>
					<div class="hobby">
						<pre>{{baseInfo.hobby}}</pre>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import outputHeader from '@/components/OutputHeader.vue'
export default {
	name: 'template1',
	data(){
		return {
			resumeId: '',
			templateId: '',
      resume: {},
      baseInfo: {},
      expectInfo: {},
      evaluateInfo: {},
      workExperList: [],
      eduList: [],
      schoolHonorList: [],
      schoolWorkList: [],
      skillList: [],

			internshipList: [],
			schoolJobExperList: [],
			honorList: [],
			hobbyInfo: {}
    };
	},
	created(){
		this.resumeId = this.$route.params.resumeId;
		this.templateId = this.$route.params.templateId;
		this.validBuy();
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

          this.internshipList = res.data.schoolPostList || [];
					this.schoolJobExperList = res.data.schoolJobexpList || [];
					this.honorList = res.data.schoolHonorList || [];
					this.hobbyInfo = res.data.resumeBaseInfo || {};
					//图片格式转base64
          if(this.baseInfo.headPicAll){
            var img = new Image();
            img.src = this.baseInfo.headPicAll;
            img.crossOrigin = "*";
            var that = this;
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
		//验证是否支付
		validBuy(){
			let params = {
				templateId: this.templateId
			}
			this.$store.dispatch('VALIDPURCHASE', params).then(res => {
				this.getResumeInfo();
			}).catch(err => {
				if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "验证未通过，获取简历信息失败"
            });
          }
			})
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
	components: {
		outputHeader
	}
}
</script>
<style lang="less" scoped>
	@import "../../assets/css/colors.less";
	.template1-page {
		.container {
			width: 1020px;
			margin: 0 auto;
			margin-bottom: 30px;
			background-color: #2D4662;
			.aside {
				float: left;
				width: 260px;
				background-color: #2D4662;
				color: #fff;
				.img-box {
					width: 100%;
					text-align: center;
					.avatar {
						width: 150px;
						height: auto;
						display: inline-block;
						margin: 20px 0;
						background-color: #fff;
					}
				}
				.xuedianba {
					text-align: center;
					margin-bottom: 20px;
					.title {
						font-size: 28px;
					}
					.sub-title {
						font-size: 22px;
					}
				}
				.personal {
					margin-bottom: 20px;
					padding-left: 20px;
					.title {
						font-size: 18px;
						line-height: 30px;
						.en {
							font-size: 14px;
							padding-left: 10px;
						}
					}
					.base-info {
						width: 100%;
						display: inline-block;
						li {
							line-height: 30px;
							span {
								display: inline-block;
								line-height: 22px;
							}
							.key {
								float: left;
								width: 70px;
								line-height: 30px;
							}
							.value {
								line-height: 30px;
							}
							.address {
								display: block;
								padding-left: 70px;
								padding-top: 6px;
								line-height: 22px;
							}
						}
					}
					.evaluation {
						line-height: 22px;
						margin-top: 10px;
						padding-right: 20px;
					}
				}
			}
			.right-content {
				min-height: 100vh;
				margin-left: 260px;
				padding: 20px 30px;
				color: #333;
				background-color: #fff;
				border: 1px solid @main-color-border;
				border-left: none;
				.module {
					width: 100%;
					margin-bottom: 10px;
					.top {
						width: 100%;
						display: inline-block;
						margin-bottom: 10px;
						.icon-box {
							float: left;
							width: 40px;
							height: 40px;
							line-height: 40px;
							text-align: center;
							color: #fff;
							border-radius: 20px;
							background-color: #2D4662;
							i {
								font-size: 20px;
							}
						}
						.title {
							font-size: 20px;
							line-height: 40px;
							margin-left: 60px;
							border-bottom: 1px solid #2D4662;
						}
					}
				}
				.expect {
					width: 100%;
					.expect-list {
						width: 100%;
						display: inline-block;
						li {
							width: 32%;
							display: inline-block;
							.name {
								color: #666;
							}
							span {
								line-height: 30px;
								display: inline-block;
							}
						}
					}
				}
				.work, .edu {
					.work-item {
						margin-bottom: 20px;
						.title {
							display: flex;
							display: -webkit-flex;
							flex-wrap: wrap;
							span {
								line-height: 30px;
								flex: 1 1 auto;
							}
						}
						.content {
							color: #666;
							.title {
								line-height: 30px;
							}
							.work-content {
								line-height: 22px;
							}
						}
					}
				}
				.school, .skill, .hobby {
					.item {
						display: flex;
						display: -webkit-flex;
						margin: 5px 0;
						.honor-time {
              min-width: 150px;
              max-width: 150px;
            }
						span {
							line-height: 24px;
							flex: 1 1 auto;
              text-align: left;
						}
					}
					.hobby {
						line-height: 22px;
					}
					.honor, .schoolwork {
						.title {
							width: 100%;
							height: 30px;
							line-height: 30px;
							padding-left: 20px;
							background-color: #F1F5FB;
						}
						.work-desc {
							margin-bottom: 10px;
						}
						.schoolwork-item {
							color: #666;
							margin: 10px 0;
							.work-title {
								width: 100%;
								display: flex;
								span {
									line-height: 24px;
									flex: 1 1 auto;
									text-align: left;
								}
							}
							.desc-title {
								line-height: 30px;
							}
							.desc-content {
								line-height: 22px;
							}
						}
					}
				}
			}
		}
	}
</style>


