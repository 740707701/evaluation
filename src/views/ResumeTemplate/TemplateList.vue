<template>
	<div class="templatelist-page">
		<div class="container">
			<div class="header">
        <img src="../../assets/images/logo.svg" alt="" class="logo">
				<div class="template">模板商城</div>
      </div>
			<div class="template-list">
				<div class="item" v-for="template in templateList" :key="template.templateId">
						<img :src="template.picAll" alt="">
						<div class="title-box">
							<div class="title">
								<span>{{template.templateName}}</span>
								<span class="price">¥ {{template.price}}</span>
							</div>
							<div class="buy-btn" v-if="!template.ispurchase" @click="buy(template)">购买模板</div>
							<div class="buy-btn" v-if="template.ispurchase" @click="toTemplate(template)">立即制作</div>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'templatelist',
	data(){
		return {
			resumeId: '',
			templateList: []
		}
	},
	created(){
		this.resumeId = this.$route.params.resumeId;
		this.getTemplateList()
	},
	methods: {
		getTemplateList(){
			let params = {}
			this.$store.dispatch('TEMPLATELIST', params).then(res =>{
				this.templateList = res.data || [];
			}).catch(err => {
				if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取模板失败，请稍后重试"
            });
          }
			})
		},
		buy(template){
			let cartData = {
				totalPrice: template.price
			}
			let list = [];
			template.id = template.templateId
			template.cepingName = template.templateName
			template.resumeId = this.resumeId
			template.purchaseNum = 1
			list.push(template)
      localStorage.setItem("cartList", JSON.stringify(list));
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.$router.push({ name: "settlement" });
		},
		toTemplate(template){
			this.$router.push({
				path: '/template' + template.templateId + '/' + this.resumeId + '-' + template.templateId
			})
		}
	}
}
</script>
<style lang="less" scoped>
	@import url("../../assets/css/colors.less");
	.templatelist-page {
		height: 100%;
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
						margin-right: 10px;
					}
				}
				.template {
					float: right;
					margin-left: 50px;
					color: @main-color-blue;
					height: 60px;
					line-height: 60px;
				}
			}
			.template-list {
				width: 100%;
				height: 100%;
				.item {
					width:230px;
					height: 395px;
					padding: 10px;
					background:rgba(255,255,255,1);
					// border: 1px solid @main-color-border;
					box-shadow:2px 5px 6px rgba(17,17,17,0.12);
					display: inline-block;
					margin-right: 20px;
					margin-bottom: 20px;
					img {
						width: 210px;
						height: 300px;
						display: inline-block;
					}
					.title-box {
						.title {
							line-height: 3;
							.price {
								float: right;
								color: @main-color-blue;
							}
						}
						.buy-btn {
							float: right;
							padding: 8px 15px;
							background:@main-color-blue;
							color: #fff;
							border-radius:4px;
							cursor: pointer;
							display: none;
						}
					}
				}
				.item:hover {
					border: 1px solid @main-color-blue;
					.buy-btn {
						display: inline-block;
					}
				}
			}
		}
	}
</style>


