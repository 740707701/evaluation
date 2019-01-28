<template>
	<div class="vocation-practice">
		<div class="banner-bg">
      <img src="../../assets/images/bg_01.png" alt="">
    </div>
    <div class="container">
			<div class="content">
				<div class="top">
					<div class="title">做练习</div>
				</div>
				<div class="intro-box">
					<div class="back" @click="gotoStudy">
						<div class="back-box">
							<i class="el-icon-arrow-left"></i>
							<span>返回</span>
						</div>
					</div>
					<div class="item-list">
						<div class="item-box" v-if="questionContent.questionTypeId===7">
							<div class="item-title">案例分析题</div>
							<div class="ques-title">{{questionContent.title}}</div>
							<div class="item-content"  v-for="(item, index) in questionContent.subtitleList" :key="index">
								<div class="checkbox-title">{{index+1}}、{{item.title}}</div>
								<div class="item-checkbox" v-if="item.questionTypeId===1">
									<el-radio v-model="fxAnswer[index]" v-for="(choice, key) in item.choiceList" :key="key" :label="key">{{key}}、{{choice}}</el-radio>
								</div>
								<div class="item-checkbox" v-if="item.questionTypeId===2">
									<el-checkbox-group v-model="fxAnswer[index]">
										<el-checkbox v-for="(choice,key) in item.choiceList" :key="key" :label="key">{{key}}、{{choice}}</el-checkbox>
									</el-checkbox-group>
								</div>
								<div class="item-checkbox" v-if="item.questionTypeId===3">
									<el-radio v-model="fxAnswer[index]" :label="'T'">正确</el-radio>
									<el-radio v-model="fxAnswer[index]" :label="'F'">错误</el-radio>
								</div>
								<div class="item-checkbox" v-if="item.questionTypeId===4">
									<textarea class="textarea" v-model="fxAnswer[index]" :maxlength="500"></textarea>
								</div>
								<div class="item-checkbox" v-if="item.questionTypeId===5">
									<textarea class="textarea" v-model="fxAnswer[index]" :maxlength="500"></textarea>
								</div>
								<div class="item-checkbox" v-if="item.questionTypeId===6">
									<textarea class="textarea" v-model="fxAnswer[index]" :maxlength="500"></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="post-btn" @click="post">提交</div>
				</div>
			</div>
    </div>
		<div class="dialog" v-if="showSuccessDialog">
			<div class="dialog-content">
				<div class="title">{{successMsg}}</div>
				<img src="../../assets/images/vocation_success.png" alt="">
				<p class="tips" v-if="!hideNextText">已为你解锁下一课程</p>
				<div class="study-btn" @click="gotoStudy">继续学习</div>
			</div>
		</div>
		<div class="dialog" v-if="showFailDialog">
			<div class="dialog-content">
				<div class="title">很遗憾，你没有全部答对！</div>
				<img src="../../assets/images/vocation_fail.png" alt="">
				<p class="tips">未能解锁下一课程</p>
				<div class="study-btn" @click="gotoStudy">继续学习</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'vocationPractice',
	data() {
		return {
			showSuccessDialog: false,
			showFailDialog: false,
			successMsg: '恭喜你全部答对了！',
			hideNextText: false,
			courseId: '',
			questionId: '',
			questionContent: {},
			videoName: '',
			fxAnswer: []
		}
	},
	created() {
		this.courseId = this.$route.query.courseId
		this.questionId = this.$route.query.questionId
		this.questionContent = JSON.parse(localStorage.getItem('questionContent'))
		this.videoName = localStorage.getItem('videoName')
		console.log('answer', this.questionContent, this.videoName)
		// questionType 1：单选， 2：多选，3：判断，4：填空，5:简答，6：论述题，7：案例分析题
		let subtitleList = this.questionContent.subtitleList
		subtitleList.map((item, index) => {
			if(item.questionTypeId === 2) {
				this.fxAnswer[index] = !this.fxAnswer[index] === true ? [] : this.fxAnswer[index] instanceof Array === true ? this.fxAnswer[index] : this.fxAnswer[index].split('')
			}
		})
	},
	methods: {
		post() {
			// console.log('fxAnswer', this.fxAnswer)
			let subtitleList = this.questionContent.subtitleList
			let answer = []
			subtitleList.map((item, index) => {
				this.fxAnswer.map((ans, idx) => {
					if(index === idx) {
						let answ = ans instanceof Array === true ? ans.join('') : ans
						answer.push({subtitleId: item.subtitleId, answer: answ})
					}
				})
			})
			// console.log('answer', answer)
			let data = {
				examPaperId: this.courseId,
				answerSheetItems: [
					{
						questionId: this.questionId,
						comment: this.videoName,
						questionTypeId: this.questionContent.questionTypeId,
						fxanswer: answer
					}
				]
			}
			// console.log('data', data)
			this.$store.dispatch('VERIFY_ANSWER', data).then(res => {
				// console.log('res', res)
				if(res.data.result === 'success') {
					let nextQuestionId = res.data.object
					// 开启下一题
					if(nextQuestionId) {
						this.openNext(nextQuestionId)
					} else {
						// 提示做完练习
						this.successMsg = '恭喜您！已完成全部练习！'
						this.hideNextText = true
						this.showSuccessDialog = true
					}
				}
			}).catch(err => {
				// console.log('err', err)
				if(err.data.result === 'error') {
					this.showFailDialog = true
				}
			})
		},
		// 开启下一题
		openNext(nextQuestionId) {
			let data = {
				questionId: nextQuestionId,
				cognitionId: this.courseId,
				lastquestionId: this.questionId
			}
			this.$store.dispatch('OPEN_NEXT_QUESTION', data).then(res => {
				this.showSuccessDialog = true
			}).catch(err => {
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('开启下一课程失败，请稍后重试！')
				}
			})
		},
		gotoStudy() {
			this.$router.push({path: '/vocationDetail', query: { courseId: this.courseId }})
		},
		goBack() {

		}
	}
}
</script>
<style lang="less" scoped>
@import '../../assets/css/colors.less';
.vocation-practice {
  width: 100%;
  min-height: 100%;
  background-color: @main-color-bg;
  position: relative;
  .banner-bg {
    width: 100%;
    height: 150px;
    img {
      width: 100%;
      height: 150px;
    }
  }
  .container {
    width: 1200px;
		margin: 0 auto;
		position: relative;
		.content {
			width: 100%;
			position: absolute;
			top: -110px;
			left: 50%;
			margin-left: -50%;
			.top {
				margin-bottom: 50px;
				.title {
					font-size: 24px;
					color:#fff;
				}
			}
			.intro-box {
				background-color: #fff;
				border-radius: 8px;
				min-height: calc(100vh - 200px);
				.back {
					padding-left: 20px;
					line-height: 40px;
					border-bottom: 1px solid @main-color-border;
					.back-box {
						display: inline-block;
						cursor: pointer;
					}
					i {
						color: @main-color-blue;
						font-size: 16px;
						font-weight: 600;
					}
					span {
						font-weight: bold;
						margin-left: 5px;
						color: @main-color-text;
					}
				}
				.item-list {
					padding: 15px;
					.item-box {
						margin-bottom: 10px;
						& /deep/ .el-popover {
							color: #666;
							background-color: #F7F7F7;
						}
						.ques-title {
							line-height: 24px;
							padding-top: 10px;
							padding-left: 20px;
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
				}
				.post-btn {
					width: 120px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					color: #fff;
					background-color: @main-color-blue;
					border-radius: 4px;
					cursor: pointer;
					margin: 20px auto;
				}
			}
		}
	}
	.dialog {
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		.dialog-content {
			width: 600px;
			padding: 30px;
			background-color: #fff;
			border-radius: 8px;
			text-align: center;
			position: absolute;
			top: 25%;
			left: 50%;
			margin-left: -300px;
			.title {
				line-height: 30px;
			}
			img {
				width: 253px;
				height: auto;
				margin: 20px auto;
			}
			.tips {
				color: @main-color-blue;
			}
			.study-btn {
				width: 110px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				cursor: pointer;
				color: #fff;
				background-color: @main-color-blue;
				border-radius: 4px;
				margin: 20px auto 0 auto;
			}
		}

	}
}
</style>

