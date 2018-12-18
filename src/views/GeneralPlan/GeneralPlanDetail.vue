<template>
	<div class="generalplan-detail">
		<img src="../../assets/images/generalplan-banner.png" alt="" class="img-banner">
		<div class="content">
			<div class="container">
				<div class="title">大学四年总规划</div>
				<div class="item-list">
					<div class="item-box" v-for="(item,index) in generalPlanPaper" :key="index">
						<div class="item-title">
							<span class="bold">{{item.title}}</span>
							<span class="red" v-if="item.required">*</span>
							<span>{{item.tip}}</span>
							<el-popover trigger="hover" width="400" :content="item.remark">
								<span v-if="item.remark" class="tag" slot="reference">说明与建议</span>
							</el-popover>
						</div>
						<div class="item-content" v-if="item.subtitleList" v-for="(sub,index) in item.subtitleList" :key="index">
							<div class="checkbox-title">
								<span>{{index+1}}.{{sub.title}}</span>
								<span v-if="sub.required" class="red">*</span>
								{{sub.tip}}
								<el-popover trigger="hover" width="400" :content="sub.remark">
									<span v-if="sub.remark" class="tag" slot="reference">说明与建议</span>
								</el-popover>
							</div>
							<div class="item-checkbox" v-if="sub.choiceList&&sub.questionTypeId!==1">
								<el-checkbox-group v-model="sub.value" :max="sub.questionTypeId===1?1:Object.keys(sub.choiceList).length">
									<el-checkbox v-for="(label,index) in sub.choiceList" :key="index" :label="label"></el-checkbox>
								</el-checkbox-group>
							</div>
							<div class="item-checkbox" v-if="sub.choiceList&&sub.questionTypeId===1">
								<el-radio v-model="sub.value[0]"  v-for="(label,index) in sub.choiceList" :key="index" :label="label">{{label}}</el-radio>
							</div>
							<div class="textarea-box" v-if="sub.inputChoiceList">
								<div class="item-checkbox">
									<el-checkbox-group v-model="sub.value" >
										<el-checkbox v-for="(choice,index) in sub.inputChoiceList" :key="index" :label="choice.name"></el-checkbox>
									</el-checkbox-group>
								</div>
								<!-- 
									sub.value.indexOf(sub.inputChoiceList[sub.inputChoiceList.length-1].name)!='-1'
									总规划选项 根据是否勾选最后一项来显示最后一项下面的多行文本框
									（当出现有多个选项下面都有多行文本框时候 此段代码不兼容
								-->
								<div v-for="(s,index) in sub.inputChoiceList" :key="index" v-if="sub.value.indexOf(sub.inputChoiceList[sub.inputChoiceList.length-1].name)!='-1'">
									<div v-if="s.subchoiceInput" v-for="(subInput,index) in s.subchoiceInput" :key="index">
										<div class="textarea-title">{{subInput.title}}</div>
										<textarea :placeholder="subInput.placeholder"  v-model="subInput.value" :maxlength="500"></textarea>
									</div>
								</div>
							</div>
							<textarea v-if="sub.placeholder" :placeholder="sub.placeholder"  v-model="sub.value" :maxlength="500"></textarea>
						</div>
						<div class="item-content" v-if="item.inputChoiceList">
							<div class="item-checkbox">
								<el-checkbox-group v-model="item.value">
									<el-checkbox v-for="(choice,index) in item.inputChoiceList" :key="index" :label="choice.name"></el-checkbox>
								</el-checkbox-group>
							</div>
							<!-- 
									item.value.indexOf(item.inputChoiceList[item.inputChoiceList.length-1].name)!='-1'
									总规划选项 根据是否勾选最后一项来显示最后一项下面的多行文本框
									（当出现有多个选项下面都有多行文本框时候 此段代码不兼容
								-->
							<div class="textarea-box" v-if="item.value.indexOf(item.inputChoiceList[item.inputChoiceList.length-1].name)!='-1'">
									<div v-for="(s,index) in item.inputChoiceList" :key="index">
										<div v-if="s.subchoiceInput" v-for="(subInput,index) in s.subchoiceInput" :key="index">
											<textarea :placeholder="subInput.placeholder" v-model="subInput.value" :maxlength="500"></textarea>
										</div>
									</div>
								</div>
						</div>
					</div>
					<div class="btn-box">
						<div class="complete-btn" @click="post">完成</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'generalPlanDetail',
	data() {
		return {
			// questionTypeId   1 单选，2 多选，5 简答题，7 分析题，8 多选分析题
			generalPlanId: '',
			generalPlanPaper: [],
		}
	},
	created() {
		this.generalPlanId = this.$route.query.planId
		if(this.generalPlanId) {
			this.getGeneralPlanInfo()
		} else {
			this.getGeneralPlanPaper()
		}
	},
	methods: {
		getGeneralPlanPaper() {
			this.$store.dispatch('GENERALPLAN_PAPER').then(res => {
				this.generalPlanPaper = JSON.parse(res.data.content)
				console.log(this.generalPlanPaper)
			}).catch(err => {
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('获取总规划字典失败，请稍后重试！')
				}
			})
		},
		getGeneralPlanInfo() {
			this.$store.dispatch('GENERALPLAN_INFO').then(res => {
				this.generalPlanPaper = JSON.parse(res.data.content)
				// console.log(this.generalPlanPaper)
			}).catch(err => {
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('获取总规划信息失败，请稍后重试！')
				}
			})
		},
		post() {
			for(let i = 0;i < this.generalPlanPaper.length;i++) {
				let item = this.generalPlanPaper[i]
				if(item.required === 1){
					if(!item.value.length){
						if(item.value instanceof Array) {
							this.$message.error(`请选择${item.title.slice(2)}`)
							return false
						} else if(typeof item.value === 'string') {
							this.$message.error(`请输入${item.title.slice(2)}`)
							return false
						}
					}
				}
				if(item.subtitleList) {
					let subPaper= item.subtitleList
					for(let j=0; j<subPaper.length;j++) {
						let subItem = subPaper[j]
						if(subItem.required === 1) {
							if(!subItem.value.length) {
								if(subItem.value instanceof Array) {
									this.$message.error(`请选择${subItem.title.indexOf('：')===-1?subItem.title:subItem.title.slice(0,subItem.title.length-1)}`)
									return false
								} else if(typeof subItem.value === 'string') {
									this.$message.error(`请输入${subItem.title.indexOf('：')===-1?subItem.title:subItem.title.slice(0,subItem.title.length-1)}`)
									return false
								}
							}
						}
					}
				}
			}
			const data = {
				id: this.generalPlanId,
				content: JSON.stringify(this.generalPlanPaper)
			}
			this.$store.dispatch('SAVE_GENERALPLAN', data).then(res => {
				this.$message.success(res.data.msg || '保存成功！')
				this.$router.replace({path: '/generalPlanInfo'})
			}).catch(err => {
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('提交失败，请稍后重试！')
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.generalplan-detail {
	.img-banner {
		width: 100%;
		height: auto;
	}
	.content {
		width: 1200px;
		margin: 0 auto;
		position: relative;
		.container {
			width: 100%;
			padding: 30px;
			background-color: #fff;
			border-radius: 18px;
			box-shadow:0px 4px 24px 0px rgba(181,181,181,0.2);
			position: absolute;
			left: 50%;
			margin-left: -50%;
			margin-top: -50px;
			margin-bottom: 40px;
			.title {
				font-size: 20px;
				font-weight: 600;
				text-align: center;
				line-height: 28px;
			}
			.bold {
				color: #333;
				font-weight: 600;
			}
			.red {
				color: #F70000;
			}
			.tag {
				display: inline-block;
				padding: 0 15px;
				background-color: #FFEDED;
				margin-left: 15px;
			}
			.item-list {
				padding: 15px;
				.item-box {
					margin-bottom: 10px;
					& /deep/ .el-popover {
						color: #666;
						background-color: #F7F7F7;
					}
					.item-title {
						width: 100%;
						height: 33px;
						line-height: 33px;
						padding-left: 10px;
						background-color: #EDF6FF;
					}
					.item-content {
						padding: 0 20px;
						.checkbox-title {
							color: #666;
							line-height: 38px;
							.tag {
								line-height: 30px;
							}
						}
						.item-checkbox {
							margin-top: 5px;
							& /deep/ .el-checkbox, .el-radio {
								min-width: 210px;
								margin-left: 0;
								margin-bottom: 10px;
							}
						}
						.textarea-box {
							margin-bottom: 10px;
							.textarea-title {
								line-height: 32px;
							}
						}
					}
				}
				.btn-box {
					margin: 30px auto;
					text-align: center;
					.complete-btn {
						width: 110px;
						height: 33px;
						line-height: 33px;
						text-align: center;
						cursor: pointer;
						background-color: @main-color-blue;
						color: #fff;
						border-radius: 4px;
						display: inline-block;
					}
				}
			}
		}
	}
}
</style>


