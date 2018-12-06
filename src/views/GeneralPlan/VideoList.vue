<template>
	<div class="videolist-page">
		<div class="container">
			<div class="top">学习课程</div>
			<div class="course-list">
				<div class="video-box" v-for="video in videoList" :key="video.id">
					<div class="video-player" @click="showPlayer(video)">
						<img :src="video.module" alt="">
					</div>
					<div class="name">{{video.videoName}}</div>
					<div class="time">时长：{{video.videoLong}}</div>
				</div>
			</div>
			<div class="btn-box">
				<div class="open-btn" @click="openGeneralPlan">制定总规划</div>
			</div>
		</div>
		<div class="bg" v-if="showPlayerBigger">
			<div class="video-box">
				<video-player class="video-player" 
				:options="getVideoOptions(currentVideo.videoUrl, currentVideo.module)"
				@play="onPlayerPlay(currentVideo, $event)"
				:playsinline="true" ></video-player>
				<div class="close" @click="close">×</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'videolist',
	data() {
		return {
			videoList: [],
			isOpenVideo: false,
			videoName: '',
			currentVideo: {},
			showPlayerBigger: false
		}
	},
	created() {
		this.getVideoList()
		this.findVideoOpen()
	},
	methods: {
		showPlayer(video) {
			this.currentVideo = video
			this.showPlayerBigger = true
		},
		getVideoList() {
			this.$store.dispatch('VIDEO_LIST').then(res => {
				this.videoList = res.data
				this.videoName = this.videoList[0].videoName
			}).catch(err => {
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('获取视频失败，请稍后重试！')
				}
			})
		},
		onPlayerPlay(video, e) {
			if(video.id === 1) {
				// 查询是否查看过该视频
				if(!this.isOpenVideo) {
					this.openVideo()
				}
			}
		},
		openVideo() {
			this.$store.dispatch('INSERT_VIDEO_OPEN').then(res => {
				// console.log(res)
			}).catch(err =>{
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('记录播放视频失败，请稍后重新播放！')
				}
			})
		},
		findVideoOpen() {
			this.$store.dispatch('FIND_VIDEO_OPEN').then(res => {
				if(res.data.state === '1') {
					this.isOpenVideo = true
				}
			}).catch(err =>{
				if(err.data) {
					this.$message.error(err.data.msg)
				} else {
					this.$message.error('查询是否播放过该视频失败，请稍后重试！')
				}
			})
		},
		getVideoOptions(url, poster) {
			let playOptions = {
				muted: false, // 默认情况下音频音量静音状态
				language: 'zh-CN',
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				sources: [{
					type: 'video/mp4',
					src: url
				}],
				poster: poster, // 封面地址
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
			}
			return playOptions
		},
		openGeneralPlan() {
			if(this.isOpenVideo) {
				this.$router.push({ path: '/generalPlanDetail'})
			} else {
				this.$message.error(`请先查看${this.videoName}视频之后再来制定总规划吧！`)
			}
		},
		close() {
			this.showPlayerBigger = false
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.videolist-page {
	width: 100%;
	padding: 30px 0;
	min-height: calc(100vh - 60px);
	background-color: @main-color-bg;
	.container {
		width: 1200px;
		margin: 0 auto;
		.top {
			height: 40px;
			line-height: 40px;
			padding-left: 15px;
			border-left: 3px solid @main-color-blue;
			background-color: #fff;
		}
		.course-list {
			padding: 20px 0;
			display: flex;
			justify-content: space-between;
			.video-box {
				width: 280px;
				.video-player {
					margin-bottom: 15px;
					img {
						width: 100%;
						height: auto;
					}
				}
				.name,.time {
					text-align: center;
					line-height: 20px;
				}
				.time {
					color: #666;
				}
			}
		}
		.btn-box {
			margin-top: 50px;
			text-align: center;
			.open-btn {
				width: 120px;
				height: 38px;
				line-height: 38px;
				text-align: center;
				color: #fff;
				border-radius: 4px;
				background-color: @main-color-blue;
				cursor: pointer;
				display: inline-block;
			}
		}
	}
	.bg {
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		left: 0;
		.video-box {
			width: 50%;
			background-color: #fff;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			.video-player {
				width: 100%;
				& /deep/ .video-js .vjs-big-play-button {
					width: 36px;
					height: 36px;
					line-height: 32px;
					border-radius: 50%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					.vjs-icon-placeholder {
						font-size: 24px;
					}
				}
				&:hover {
					background-color: rgba(0,0,0,0.3);
					// & /deep/ .video-js .vjs-big-play-button {
					// 	background-color: red;
					// }
				}
			}
			.close {
				width: 30px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				cursor: pointer;
				font-size: 26px;
				position: absolute;
				right: 10px;
				top: 10px;
			}
		}

	}
}
</style>


