<template>
	<div class="template31-page">
		<output-header :resumeId="resumeId" :templateId="templateId" :resumeName="baseInfo.resumeName" :org="null"></output-header>
		<div class="container" id="pdfDom">
			<div class="head">
				<div class="head-img">
					<img src="../../assets/images/resume_head.png" alt="">
				</div>
				<div class="head-content">
					<div class="title">细心从每一个小细节开始</div>
					<div class="en">Carefully start width every little detail</div>
				</div>
				<div class="head-icon">
					<div class="icon-box">
						<i class="iconfont icon-edu"></i>
					</div>
					<div class="icon-box">
						<i class="iconfont icon-book"></i>
					</div>
				</div>
				<img class="bottom_bg" src="../../assets/images/resume_head_bot.png" alt="">
			</div>
			<div class="module-content">
				<div class="module">
					<div class="top">
						<div class="title">基本信息</div>
					</div>
					<ul class="base-list">
						<li>
							<div class="item">
								<span class="name">姓名：</span><span>{{baseInfo.name}}</span>
							</div>
							<div class="item">
								<span class="name">出生年月：</span><span>{{baseInfo.birth?baseInfo.birth.slice(0,10): ''}}</span>
							</div>
						</li>
						<li>
							<div class="item">
								<span class="name">性别：</span>
								<span v-if="baseInfo.sex==1">男</span>
            		<span v-if="baseInfo.sex==2">女</span>
							</div>
							<div class="item">
								<span class="name">籍贯：</span><span>{{baseInfo.nativePlaceName}}</span>
							</div>
						</li>
						<li v-if="baseInfo.politicalOutlookName || baseInfo.nation">
							<div class="item">
								<span class="name">民族：</span><span>{{baseInfo.nation}}</span>
							</div>
							<div class="item" v-if="baseInfo.politicalOutlookName">
								<span class="name">政治面貌：</span>
								<span>{{baseInfo.politicalOutlookName}}</span>
							</div>
						</li>
						<li>
							<div class="item">
								<span class="name">电话：</span><span>{{baseInfo.phone}}</span>
							</div>
							<div class="item">
								<span class="name" v-if="eduList.length">学历：</span><span v-if="eduList.length">{{eduList[0].degreeName}}</span>
							</div>
						</li>
						<li>
							<div class="item">
								<span class="name">现居住：</span><span>{{baseInfo.address}}</span>
							</div>
							<div class="item">
								<span class="name">毕业院校：</span><span v-if="eduList.length">{{eduList[0].schoolName}}</span>
							</div>
						</li>
					</ul>
					<div class="avatar">
						<img :src="baseInfo.headPicAll?baseInfo.headPicAll:require('../../assets/images/man.png')" alt="">
					</div>
				</div>
				<div class="module work">
					<div class="top">
						<div class="title">工作经验</div>
					</div>
					<div class="work-item" v-for="exper in workExperList" :key="exper.id">
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
				<div class="module school" v-if="schoolHonorList.length || schoolWorkList.length">
					<div class="top">
						<div class="title">在校情况</div>
					</div>
					<div class="honor">
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
						<div class="title">技能证书</div>
					</div>
					<div class="skill-list">
						<div class="item" v-for="skill in skillList" :key="skill.id">
							<span class="date">{{skill.skillTime.slice(0,10)}}</span>
							<span>{{skill.name}} （{{skill.score}}）</span>
						</div>
					</div>
				</div>
				<div class="module edu">
					<div class="top">
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
				<div class="module eva">
					<div class="top">
						<div class="title">自我评价</div>
					</div>
					<div class="item ">{{baseInfo.evaluate}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import outputHeader from '../../components/OutputHeader.vue'
export default {
	name: 'template31',
	data() {
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
  created() {
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
              message: "获取简历信息失败"
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
	.template31-page {
		.container {
			width: 1020px;
			margin: 20px auto;
			.head {
				width: 100%;
				height: 100px;
				padding-top: 10px;
				position: relative;
				.head-img {
					float: left;
					width: 200px;
					img {
						width: 184px;
					}
				}
				.head-content {
					color: #4D7181;
					margin-left: 20px;
					padding-left: 30px;
					border-left: 2px solid #506E7F;
					display: inline-block;
					.title {
						font-size: 20px;
						line-height: 40px;
					}
					.en {
						font-size: 16px;
					}
				}
				.head-icon {
					float: right;
					line-height: 70px;
					.icon-box {
						width: 30px;
						height: 30px;
						line-height: 30px;
						border-radius: 15px;
						text-align: center;
						color: #fff;
						background-color: #B8955F;
						margin-right: 20px;
						display: inline-block;
						i {
							font-size: 20px;
						}
					}
				}
				.bottom_bg {
					width: 100%;
					height: 11px;
					position: absolute;
					bottom: 0;
					left: 0;
				}
			}
			.module-content {
				margin: 0 20px;
				padding: 20px 0;
				height: 100%;
				border-left: 2px solid #4D7181;
				.module {
					.top {
						width: 100%;
						height: 30px;
						border-bottom: 2px solid #4D7181;
						margin-bottom: 12px;
						.title {
							width: 130px;
							height: 45px;
							line-height: 30px;
							background: url("../../assets/images/module_title.png") no-repeat;
							background-size: 100% 100%;
							color: #fff;
							padding-left: 20px;
							margin-left: -10px;
						}
					}
					.base-list {
						width: 80%;
						display: inline-block;
						padding-left: 20px;
						li {
							width: 100%;
							display: inline-block;
							.item {
								float: left;
								width: 50%;
								line-height: 30px;
							}
							.name {
								width: 100px;
								display: inline-block;
							}
						}
					}
					.avatar {
						float: right;
						img {
							width: 150px;
							height: 145px;
							display: inline-block;
						}
					}
				}
				.work, .edu {
					.work-item {
						padding: 0 20px;
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
						padding: 0 20px;
						span {
							width: 30%;
							line-height: 30px;
							display: inline-block;
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
							margin-bottom: 20px;
							.desc-title {
								line-height: 30px;
							}
							.desc-content {
								line-height: 22px;
							}
						}
					}
				}
				.eva {
					.item {
						padding: 0 20px;
						line-height: 24px;
					}
				}
			}
		}
	}
</style>


