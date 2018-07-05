<template>
	<div class="template-cover3">
		<div class="container">
			<img class="title-img" src="../../assets/images/resume_head.png" alt="">
			<div class="bg">
				<div class="img-box">
					<img :src="baseInfo.headPicAll?baseInfo.headPicAll:require('../../assets/images/man.png')" alt="">
				</div>
				<div class="text-content">
					<div class="title">{{baseInfo.name}}</div>
					<div class="expect">求职意向：{{baseInfo.expectPositionName}}</div>
				</div>
			</div>
			<div class="bottom">
				<div class="info">
					<i class="iconfont icon-phoe"></i>{{baseInfo.phone}}
				</div>
				<div class="info">
					<i class="iconfont icon-email"></i>{{baseInfo.email}}
				</div><div class="info">
					<i class="iconfont icon-pos"></i>{{baseInfo.nativePlaceName}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'templateCover3',
	data(){
		return {
      resume: {},
			baseInfo: {}
    };
	},
	created(){
		this.resumeId = this.$route.params.resumeId;
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
	}
}
</script>
<style lang="less" scoped>
	.template-cover3 {
		width: 100%;
		height: 100%;
		padding: 30px 0;
		position: relative;
		.container {
			height: calc(100% - 60px);
			.title-img {
				width: 350px;
				margin: 0 auto;
				margin-bottom: 120px;
				display: block;
			}
			.bg {
				width: 100%;
				height: 220px;
				padding-top: 100px;
				background-color: #4D7281;
				position: absolute;
				.img-box {
					width: 180px;
					height: 180px;
					border-radius: 90px;
					border: 2px solid #4D7281;
					background-color: #fff;
					text-align: center;
					position: absolute;
					top: 0;
					left: 50%;
					margin-top: -90px;
					margin-left: -90px;
					img {
						width: 140px;
						height: 140px;
						border-radius: 70px;
						display: inline-block;
						position: absolute;
						top: 50%;
						left: 50%;
						margin-left: -70px;
						margin-top: -70px;
					}
				}
				.text-content {
					text-align: center;
					.title {
						font-size: 30px;
						color: #fff;
						line-height: 40px;
					}
					.expect {
						font-size: 20px;
						color: #000;
						line-height: 40px;
					}
				}
			}
			.bottom {
				width: 100%;
				position: absolute;
				bottom: 20px;
				left: 0;
				color: #4D7281;
				.info {
					width: 33%;
					line-height: 50px;
					text-align: center;
					display: inline-block;
				}
			}
		}
	}
</style>


