<template>
	<div class="template2-page">
    <output-header :resumeId="resumeId" :templateId="templateId" :resumeName="baseInfo.resumeName" :org="null"></output-header>
		<div class="container" id="pdfDom">
			<div class="base-content">
				<div class="base">
					<div class="avatar">
						<img :src="baseInfo.headPicAll?baseInfo.headPicAll:require('../../assets/images/man.png')" alt="">
					</div>
					<div class="base-info">
						<div class="title">{{baseInfo.name}}</div>
						<div class="info">
							<span>{{baseInfo.jobStatusName}}</span>
							<span class="split">|</span>
							<span>{{baseInfo.phone}}</span>
							<span class="split">|</span>
							<span>{{baseInfo.email}}</span>
						</div>
						<div class="info">
							<span>{{baseInfo.age}}岁&nbsp;&nbsp;({{baseInfo.birth?baseInfo.birth.slice(0,10): ''}})</span>
							<span class="split">|</span>
							<span v-if="baseInfo.sex==1">男</span>
							<span v-if="baseInfo.sex==2">女</span>
							<span class="split">|</span>
							<span>现居住{{baseInfo.address}}</span>
							<span class="split" v-if="baseInfo.workTime>0">|</span>
							<span v-if="baseInfo.workTime>0">{{baseInfo.workTime}}年工作经验</span>
						</div>
					</div>
				</div>
			</div>
			<div class="evaluate">{{baseInfo.evaluate}}</div>
			<div class="module-content">
				<div class="module expect">
					<div class="top">
						<div class="title">求职意向</div>
						<div class="icon-box">
							<i class="iconfont icon-menu"></i>
						</div>
					</div>
					<ul class="expect-list">
						<li><span class="name">岗位：</span><span>{{expectInfo.expectPositionName}}</span></li>
						<li><span class="name">城市：</span><span>{{expectInfo.expectPlaceName}}</span></li>
						<li><span class="name">薪资：</span><span>{{expectInfo.expectSalaryName}}元/月</span></li>
						<li><span class="name">到岗时间：</span><span>{{expectInfo.arriveTimeName}}</span></li>
						<li><span class="name">工作类型：</span><span>{{expectInfo.expectWorkTypeName}}</span></li>
					</ul>
				</div>
				<div class="module work" v-if="workExperList.length">
					<div class="top">
						<div class="title">工作经验</div>
						<div class="icon-box">
							<i class="iconfont icon-menu"></i>
						</div>
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
				<div class="module edu" v-if="eduList.length">
					<div class="top">
						<div class="title">教育背景</div>
						<div class="icon-box">
							<i class="iconfont icon-menu"></i>
						</div>
					</div>
					<div class="work-item" v-for="edu in eduList" :key="edu.id">
						<div class="title">
							<span>{{edu.startTime.slice(0,10)}} ~ {{edu.endTime.slice(0,10)}}</span>
							<span>{{edu.schoolName}}</span>
							<span>{{edu.eduMajor}}</span>
						</div>
            <div class="content" v-if="edu.majorDesc">
							<div class="title">专业描述：</div>
							<div class="work-content">{{edu.majorDesc}}</div>
						</div>
						<div class="content" v-if="edu.eduDesc">
							<div class="title">主修课程：</div>
							<div class="work-content">{{edu.eduDesc}}</div>
						</div>
					</div>
				</div>
				<div class="module school" v-if="schoolHonorList.length || schoolWorkList.length">
					<div class="top">
						<div class="title">在校情况</div>
						<div class="icon-box">
							<i class="iconfont icon-menu"></i>
						</div>
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
						<div class="title">校内实践</div>
						<div class="schoolwork-item item" v-for="work in schoolWorkList" :key="work.id">
							<div class="">
								<span>{{work.startTime.slice(0, 10)}} ~ {{work.endTime.slice(0, 10)}}</span>
								<span>{{work.schoolWorkName}}</span>
							</div>
							<div class="work-desc">
								<div class="desc-title">实践描述：</div>
								<div class="desc-content">{{work.schoolWorkDesc}}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="module skill" v-if="skillList.length">
					<div class="top">
						<div class="title">技能证书</div>
						<div class="icon-box">
							<i class="iconfont icon-menu"></i>
						</div>
					</div>
					<div class="skill-list">
						<div class="item" v-for="skill in skillList" :key="skill.id">
							<span class="date">{{skill.skillTime.slice(0,10)}}</span>
              <span>{{skill.name}}</span>
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
  name: "template2",
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
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/colors.less");
.template2-page {
  .container {
    width: 1020px;
    margin: 0px auto;
    margin-bottom: 20px;
    .base-content {
      width: 100%;
      height: 200px;
      background: url("../../assets/images/base_bg.jpg") no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      .base {
        height: 100%;
        padding: 30px 30px 0 50px;
        .avatar {
          float: left;
          width: 120px;
          height: 120px;
          border-radius: 60px;
          img {
            width: 120px;
            height: 120px;
            border-radius: 60px;
          }
        }
        .base-info {
          color: #fff;
          margin-left: 150px;
          padding-top: 10px;
          .title {
            font-size: 22px;
            line-height: 40px;
          }
          .info {
            width: 100%;
            display: inline-block;
            span {
              line-height: 30px;
            }
            .split {
              margin: 0 5px;
            }
          }
        }
      }
    }
    .evaluate {
      padding: 20px;
      line-height: 30px;
      color: #666;
			border: 1px solid @main-color-border;
			border-top: none;
		}
		.module-content {
			border: 1px solid @main-color-border;
			border-top: none;
			padding: 0 20px;
		}
    .module {
      width: 100%;
      margin-bottom: 10px;
      .top {
        width: 100%;
        display: inline-block;
        margin: 10px 0;
        .title {
          line-height: 30px;
          font-size: 20px;
          display: inline-block;
        }
        .icon-box {
          display: inline-block;
          i {
            font-size: 20px;
            color: #3674b4;
          }
        }
      }
    }
    .expect-list {
      display: inline-block;
      width: 100%;
      li {
        width: 22%;
        display: inline-block;
        .name {
          color: #666;
        }
        span {
          line-height: 30px;
        }
      }
    }
    .work,
    .edu {
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
    .school,
    .skill {
      .item {
        span {
          width: 30%;
					line-height: 30px;
					display: inline-block;
        }
      }
      .honor,
      .schoolwork {
        .title {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
          background-color: #f1f5fb;
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
</style>


