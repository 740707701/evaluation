<template>
	<div class="templatelist-page">
		<div class="container">
			<div class="header">
        <img src="../../assets/images/logo.svg" alt="" class="logo">
				<div class="template">模板商城</div>
        <div class="output">
          <i class="iconfont icon-daochu"></i>
          <span>在线导出</span>
        </div>
      </div>
			<div class="template-list">
				<div class="item">
						<img src="../../assets/images/thumbnail_01.png" alt="">
						<div class="title-box">
							<div class="title">
								<span>简历模板</span>
								<span class="price">¥ 9.9</span>
							</div>
							<div class="buy-btn">购买模板</div>
						</div>
				</div>
				<div class="item">
						<img src="../../assets/images/thumbnail_02.png" alt="">
						<div class="title-box">
							<div class="title">
								<span>简历模板</span>
								<span class="price">¥ 9.9</span>
							</div>
							<div class="buy-btn">购买模板</div>
						</div>
				</div>
				<div class="item">
						<img src="../../assets/images/thumbnail_03.png" alt="">
						<div class="title-box">
							<div class="title">
								<span>简历模板</span>
								<span class="price">¥ 9.9</span>
							</div>
							<div class="buy-btn">购买模板</div>
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
		return {}
	},
	created(){},
	methods: {}
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


