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
						<li>
							<span class="key">籍贯：</span>
							<span class="value">{{baseInfo.nativePlaceName}}</span>
						</li>
						<li v-if="baseInfo.politicalOutlookName">
							<span class="key">政治面貌：</span>
							<span  class="value">{{baseInfo.politicalOutlookName}}</span>
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
							<span class="value">{{baseInfo.address}}</span>
						</li>
					</ul>
				</div>
				<div class="personal">
					<div class="title">自我评价
						<span class="en">SELF-EVALUATION</span>
					</div>
					<div class="evaluation">{{baseInfo.evaluate}}</div>
				</div>
			</div>
			<div class="right-content">
				<div class="module expect">
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
				<div class="module work" v-if="workExperList.length">
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
							<div class="work-content">{{exper.workDesc}}</div>
						</div>
					</div>
				</div>
				<div class="module edu" v-if="eduList.length">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-edu1"></i>
						</div>
						<div class="title">教育背景</div>
					</div>
					<div class="work-item" v-for="edu in eduList" :key="edu.id">
						<div class="title">
							<span>{{edu.startTime.slice(0,10)}} ~ {{edu.endTime.slice(0,10)}}</span>
							<span>{{edu.schoolName}}</span>
							<span>{{edu.eduMajor}}</span>
						</div>
						<div class="content">
							<div class="title">主修课程：</div>
							<div class="work-content">{{edu.eduDesc}}</div>
						</div>
					</div>
				</div>
				<div class="module school" v-if="schoolHonorList.length || schoolWorkList.length">
					<div class="top">
						<div class="icon-box">
							<i class="iconfont icon-book"></i>
						</div>
						<div class="title">在校情况</div>
					</div>
					<div class="honor" v-if="schoolHonorList.length">
						<div class="title">校内荣誉</div>
						<div class="honor-item item" v-for="honor in schoolHonorList" :key="honor.id">
							<span>{{honor.honorTime.slice(0, 10)}}</span>
							<span>{{honor.honorPrize}}</span>
							<span>{{honor.honorLevel}}</span>
						</div>
					</div>
					<div class="schoolwork" v-if="schoolWorkList.length">
						<div class="title">校内职务</div>
						<div class="schoolwork-item item" v-for="work in schoolWorkList" :key="work.id">
							<div class="">
								<span>{{work.startTime.slice(0, 10)}} ~ {{work.endTime.slice(0, 10)}}</span>
								<span>{{work.schoolWorkName}}</span>
							</div>
							<div class="work-desc">
								<div class="desc-title">职务描述：</div>
								<div class="desc-content">{{work.schoolWorkDesc}}</div>
							</div>
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
							<span class="date">{{skill.skillTime.slice(0,10)}}</span>
							<span>{{skill.name}} （{{skill.score}}）</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import outputHeader from '../../components/OutputHeader.vue'
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
      skillList: []
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
		}
	},
	components: {
		outputHeader
	}
}
</script>
<style lang="less" scoped>
	@import url("../../assets/css/colors.less");
	.template1-page {
		position: relative;
		.container {
			width: 1020px;
			position: absolute;
			top: 60px;
			left: 50%;
			margin-left: -510px;
			margin-bottom: 20px;
			background-color: #2D4662;
			overflow: auto;
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
						height: 170px;
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
								line-height: 30px;
							}
							.key {
								width: 70px;
								display: inline-block;
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
							width: 30%;
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
							span {
								margin-right: 20px;
								line-height: 30px;
								display: inline-block;
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
				.school, .skill {
					.item {
						span {
							width: 30%;
							line-height: 30px;
						}
					}
					.honor, .schoolwork {
						.title {
							width: 100%;
							height: 30px;
							line-height: 30px;
							padding-left: 20px;
							background-color: #F1F5FB;
						}
						
						.schoolwork-item {
							color: #666;
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


