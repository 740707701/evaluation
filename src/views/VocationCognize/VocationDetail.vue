<template>
  <div class="vocation-page">
    <div class="container">
      <div class="back">
        <router-link to="/vocationCognize">
          <i class="el-icon-arrow-left"></i>
          <span>返回</span>
        </router-link>
      </div>
      <div class="content">
        <img class="detail-img" :src="courseDetail.picAll" alt="">
        <div class="info-box">
          <div class="title">{{courseDetail.cognitionName}} 
            <span class="hot" v-if="courseDetail.cognitionMode===1">会员免费学</span>
          </div>
          <p>浏览次数：{{courseDetail.num}}</p>
          <p class="rate">评价打分：
						<el-rate v-model="courseDetail.star" :show-score="true" :score-template="'{value}分'" disabled ></el-rate>
					</p>
          <p>讲师：{{courseDetail.lecturer}}</p>
          <p class="red" v-if="courseDetail.cognitionMode===1">价格： ¥ {{courseDetail.price}}</p>
          <p class="red" v-if="courseDetail.cognitionMode===0">免费</p>
          <div class="btn-box">
            <!-- <div class="operation-btn test-btn">会员免费学</div> -->
            <div class="operation-btn buy-btn" @click="buy" v-if="userInfo.ismember!=1&&courseDetail.cognitionMode===1">购买课程</div>
          </div>
        </div>
        <div class="intro">
          <p class="title">课程简介：</p>
          <div class="intro-text">{{courseDetail.remark}}</div>
        </div>
        <div class="sub-title">课程目录</div>
        <div class="nodata" v-if="!videoList.length">还未上传任何课程，快去通知老师上传吧！</div>
        <table class="course-table" v-if="videoList.length">
          <tr v-for="(video,index) in videoList" :key="index">
            <td class="index">{{index+1}}</td>
            <td>
							<div class="course-img" @click="showPlayer(video, $event)">
								<img v-if="video.fileType === 'video'" :src="video.coverUrl?video.coverUrl:require('../../assets/images/video-poster.jpg')" alt="">
								<img v-if="video.fileType === 'pdf'" :src="require('../../assets/images/pdf.png')" alt="">
								<div class="lock-bg" v-if="!video.isOpen">
									<i class="iconfont icon-lock"></i>
								</div>
							</div>
						</td>
            <td class="name">{{video.title}}</td>
            <td>{{video.videoTime}}</td>
            <td>
							<div class="btn study-btn" :class="video.isOpen===true?'':'disabled'" @click="showPlayer(video, index)">学习课程</div>
              <div class="btn practice-btn" :class="video.isOpen===true?'':'disabled'" @click="practice(video, index)">做练习</div>
						</td>
            <td style="width: 366px;padding: 0;text-align: left;">
							<span class="tag" v-if="userInfo.ismember!==1&&index===0&&isBuy===0&&courseDetail.cognitionMode===1">成为会员或者购买课程才可学习。</span>
							<span class="tag" v-if="userInfo.ismember===1&&Object.keys(openQuestions).length===index">学完一个课程，练习全对，才能解锁下一个课程。</span>
							<span class="tag" v-if="video.showMsg">您还没有完成上一课程的练习，请先完成才能解锁此课程。</span>
            </td>
          </tr>
        </table>
				<div class="sub-title">评论区
					<div class="publish" @click="showPublishComment=!showPublishComment"> <i class="iconfont icon-bianji"></i> 发表评论</div>
				</div>
				<div class="publish-comment" v-if="showPublishComment">
					<div class="rate">
						评分打分 <el-rate v-model="commentStar" :min="1" :allow-half="true" :score-template="'{value}分'" :show-score="true"></el-rate>
					</div>
					<textarea placeholder="说点什么" v-model="publishCommentText" :maxlength="300"></textarea>
					<div class="btn right" :class="publishCommentText.length?'high-btn':'disabled'" @click="publishComment">发表</div>
				</div>
				<div class="comment-box">
          <div class="nodata" v-if="!commentList.length">还没有任何评论，快去查看课程发表评论吧(*￣︶￣)</div>
					<div class="item" v-for="comment in commentList" :key="comment.id">
						<img :src="comment.userHead" alt="" class="avatar">
						<div class="item-content">
							<div class="name">
								<span>{{comment.userName}}</span>
								<span>{{comment.createDate}}</span>
							</div>
							<div class="rate" v-if="comment.isReturn!==1">
								<el-rate v-model="comment.commentStar" disabled></el-rate>
							</div>
							<div class="comment-text">
                <pre>{{comment.commentContent}}</pre>
              </div>
              <div class="reply-text" v-if="comment.lastComment">
                <pre>{{comment.lastComment}}</pre>
              </div>
							<div class="operation-btn">
								<i class="iconfont icon-comment" :class="comment.showReplyComment?'high':''" @click="showReplayBox(comment)"></i>
								<i class="iconfont icon-liked" :class="comment.liked?'high':''" @click="like(comment)"></i> 
                <span v-if="comment.num">{{comment.num}}</span>
							</div>
							<div class="reply" v-if="comment.showReplyComment">
								<textarea :placeholder="`回复${comment.userName}：`" v-model="comment.replyCommentText" :maxlength="300"></textarea>
								<div class="btn reply-btn right" :class="comment.replyCommentText?'high-btn':'disabled'" @click="replyComment(comment)">回复</div>
							</div>
						</div>
					</div>
          <div class="page-box" v-if="commentList.length">
            <el-pagination layout="prev, pager, next" :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
				</div>
      </div>
    </div>
		<div class="bg" v-if="showPlayerBigger">
			<div class="video-box">
				<video-player class="video-player" 
				:options="getVideoOptions(currentVideo.fileUrl, currentVideo.coverUrl)"
				:playsinline="true" ></video-player>
				<div class="close" @click="showPlayerBigger=false">×</div>
			</div>
		</div>
  </div>
</template>
<script>
import { showPrice } from '@/utils/index'
export default {
  name: "vocation",
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      courseId: '',
      courseDetail: {},
      commentList: [],
      currentComment: {},
      isBuy: 0, //非会员是否已购买
      openQuestions: {},
      pageIndex: 1,
      pageSize: 10,
      currentPage: 1,
      total: 0,

			videoList:[],
			currentVideo: {},
			showPlayerBigger: false,
			commentStar: 0,
      publishCommentText: '',
      replyCommentText: '',
      showPublishComment: false,
      showReplyComment: false

    };
  },
  created: function() {
    this.courseId = this.$route.query.courseId
    this.getCourseDetail()
    
    this.getCommentList()
  },
  methods: {
    showPrice() {
      return showPrice()
		},
    // 获取课程详情
    getCourseDetail(type) {
      this.$store
        .dispatch('VOCATION_COURSE_DETAIL', { id: this.courseId })
        .then(res => {
          this.courseDetail = res.data;
          this.isBuy = res.data.flag // 1:已购买，0：未购买
          if(!type) {
            this.getVideoList()
          }
        })
        .catch(err => {
          if(err.data.msg){
            this.$message({type: 'error', message: err.data.msg})
          }else{
            this.$message({type: 'error', message: '获取课程详情失败，请稍后重试！'})
          }
        });
    },
    // 获取课程目录
		getVideoList() {
			this.$store.dispatch('VOCATION_VIDEO_LIST', this.courseId).then(res => {
        this.videoList = res.data.object
        this.findOpen(this.courseId)
        this.videoList.map((item, index) => {
          if(index === 0 && (this.userInfo.ismember === 1 || this.isBuy === 1 || this.courseDetail.cognitionMode===0)) {
            this.$set(item, 'isOpen', true)
          }
        })
			}).catch(err => {
        this.$message.error('获取课程目录失败，请稍后重试！')
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
    // 播放视频 或弹出pdf
		showPlayer(video, index) {
     // todo 如果已购买可播放     
     if(video.isOpen && (this.userInfo.ismember === 1 || this.isBuy === 1 || this.courseDetail.cognitionMode===0)) {
        if(video.fileType === 'video') {
          this.currentVideo = video
          this.showPlayerBigger = true
        } else {
          let a = document.createElement('a')
          a.href = video.fileUrl
          a.target = '_blank'
          a.click()
        }
        this.insertViews()
     } else {
       if(this.userInfo.ismember === 1 || this.isBuy === 1 || this.courseDetail.cognitionMode===0) {
        // this.$message.error('您还没有完成上一课程的练习，请先完成才能解锁此课程。')
        this.$set(video, 'showMsg', true)
       }
     }
    },
    // 查询是否开启课程
    findOpen(video) {
      let params = {
        id: this.courseId
      }
      this.$store.dispatch('VOCATION_VIDEO_STATUS', params).then(res => {
        // data为空 表示没权限
        this.openQuestions = res.data
        let obj = res.data
        if(Object.keys(obj).length) {
          this.videoList.map((item, index) => {
            for(let k in obj) {
              if(Number(k) === item.questionId) {
                this.$set(item, 'isOpen', true)
              }
            }
          })
        }
      }).catch(err => {
        if(err.data) {
          this.$message.error(err.data.msg)
        } else {
          this.$message.error('查询是否开启课程失败，请稍后重试！')
        }
      })
    },
    // 做练习
    practice(video, index) {
      if(video.isOpen && (this.userInfo.ismember === 1 || this.isBuy === 1 || this.courseDetail.cognitionMode===0)) {
        localStorage.setItem('questionContent', video.content)
        localStorage.setItem('videoName', video.title)
        this.$router.push({ path: '/vocationPractice', query: { courseId: this.courseId, questionId: video.questionId} })
      } else {
        if(this.userInfo.ismember === 1 || this.isBuy === 1 || this.courseDetail.cognitionMode===0) {
          // this.$message.error('您还没有完成上一课程的练习，请先完成才能解锁此课程。')
          this.$set(video, 'showMsg', true)
        }
      }
    },
    // 点击视频 记录浏览次数
    insertViews() {
      let data = {
        id: this.courseId
      }
      this.$store.dispatch('VOCATION_INSERT_VIEWS', data).then(res => {}).catch(err => {
        if(err.data) {
          this.$message.error(err.data.msg)
        } else {
          this.$message.error('增加浏览次数失败！')
        }
      })
    },
    // 获取评论列表
    getCommentList() {
      let params = {
        id: this.courseId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.$store
      .dispatch("VOCATION_COMMENT_LIST", params)
      .then(res => {
        this.commentList = res.data.list
        this.total = res.data.total
      })
      .catch(err => {
        if (err.data) {
          this.$message({type: "error", message: err.data.msg})
        } else {
          this.$message({type: "error", message: "获取评论失败，请稍后重试！"})
        }
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getCommentList()
    },
    // 发表评论
    publishComment() {
      if(!this.commentStar) {
        this.$message.error('请给课程打分！')
        return false
      }
      if(!this.publishCommentText) {
        this.$message.error('请输入评论文字！')
        return false
      }
      let data = {
        cognitionId: this.courseId,
        commentStar: this.commentStar,
        commentContent: this.publishCommentText
      }
      this.$store.dispatch('PUBLISH_COMMENT', data).then(res => {
        this.showPublishComment = false
        this.$message.success('发表评论成功！')
        this.getCommentList()
        // 更新详情平均打分
        this.getCourseDetail('update')
      }).catch(err => {
        if(err.data) {
          this.$message.error(err.data.msg)
        } else {
          this.$message.error('评论发表失败，请稍后重试！')
        }
      })
    },
    // 显示回复评论框
    showReplayBox(comment) {
      this.$set(comment, 'showReplyComment', !comment.showReplyComment)
    },
    // 回复评论
    replyComment(comment) {
      if(!comment.replyCommentText) {
        this.$message.error('请输入回复评论文字！')
        return false
      }
      let data = {
        isReturn: 1,
        cognitionId: this.courseId,
        lastComment: comment.commentContent,
        commentContent: comment.replyCommentText
      }
      this.$store.dispatch('PUBLISH_COMMENT', data).then(res => {
        this.$set(comment, 'showReplyComment', false)
        this.getCommentList()
        this.$message.success('回复评论成功！')
      }).catch(err => {
        if(err.data) {
          this.$message.error(err.data.msg)
        } else {
          this.$message.error('评论回复失败，请稍后重试！')
        }
      })
    },
    // 点赞 
    like(comment) {
      let params = {
        id: comment.id
      }
      this.$store.dispatch('VOCATION_LIKE', params).then(res => {
        this.$set(comment, 'num', res.data)
        this.$set(comment, 'liked', res.msg === '1')
      }).catch(err => {
        if(err.data) {
          this.$message.error(err.data.msg)
        } else {
          this.$message.error('点赞失败，请稍后重试！')
        }
      })
    },
    // 立即购买
    buy(){
      let cartData = {
        rootPath: '',
        totalPrice: this.courseDetail.price
      };
      let cartList = []
      this.courseDetail.purchaseNum = 1; // 购物车默认数量为1
      this.courseDetail.productType = 3; // 行业与职业认知 类型：3
      cartList.push(this.courseDetail)
      localStorage.setItem('cartList', JSON.stringify(cartList));
      localStorage.setItem('cartData', JSON.stringify(cartData));
      this.$router.push({ path: '/settlement', query: {productType: 3} });
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.vocation-page {
	padding: 20px;
  .container {
    width: 1200px;
    height: 100%;
    min-height: calc(100vh - 95px);
    margin: 0 auto;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .back {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid @main-color-border;
      a {
        display: inline-block;
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
		.right {
			float: right;
    }
    .high {
      color: @main-color-blue;
      font-weight: bold;
    }
		.btn {
			width: 100px;
			height: 30px;
			line-height: 30px;
			text-align:center;
			border-radius: 4px;
			cursor: pointer; 
			margin: 10px;
      display: inline-block;
    }
		.high-btn {
			background-color: @main-color-blue;
			color:#fff;
		}
		.disabled {
			cursor: no-drop!important;
			background-color: #E6E6E6!important;
      color: #999999!important;
      border: none!important;
    }
    .nodata {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .content {
      padding: 20px;
      .detail-img {
        float: left;
        width: 260px;
        height: 170px;
        border-radius: 10px;
        background-color: #fafafa;
      }
      .info-box {
        margin-left: 290px;
        height: 170px;
        position: relative;
        padding-bottom: 35px;
        .title {
          height: 28px;
          line-height: 28px;
          font-size: 16px;
          font-weight: bold;
          display: inline-block;
          position: relative;
          .hot {
            padding: 2px 6px;
            font-size: 12px;
            line-height: 20px;
            font-weight: normal;
            background-color: #C84430;
            color: #fff;
            border-radius: 5px;
            position: absolute;
            top: -12px;
            right: -77px;
          }
          .hot:after {
            content: '';   
              width: 0;    
              height: 0;    
              position: absolute;    
              top: 11px;    
              left: -12px;    
              border: solid 8px;    
              border-color: transparent #C84430 transparent transparent;    
              font-size: 0;  
              transform: rotate(-25deg);
          }
        }
        p {
          line-height: 1.9;
					font-size: 14px;
        }
				.rate {
					display: inline-block;
					/deep/ .el-rate {
						display: inline-block;
						.el-rate__icon {
							font-size:14px;
						}
					} 
				}
        .gray {
          color: @main-color-gray;
        }
        .red {
          color: @main-color-red;
        }
        .disabled {
          background-color: #ddd!important;
          cursor: no-drop!important;
        }
        .btn-box {
          position: absolute;
          left: 0;
          bottom: 0;
          .operation-btn {
            float: left;
            width: 112px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin: 0;
            font-size: 12px;
            border-radius: 4px;
            box-shadow: 0 0 0;
            cursor: pointer;
            border: none;
          }
          .buy-btn {
            color: #666;
            background-color: #E2E2E2;
          }
          .test-btn {
            background-color: #C84430;
            color: #fff;
            margin-right: 32px;
          }
          .eva-btn {
            border-radius: 4px;
          }
          .icon-cart {
            float: left;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 20px;
            color: #fff;
            background-color: #dc534d;
            cursor: pointer;
          }
        }
      }
      .intro {
        padding: 20px;
        color: @main-color-text;
        .title {
          line-height: 30px;
        }
        .intro-text {
          line-height: 1.6;
        }
      }
      .sub-title {
        font-size: 16px;
        color: @main-color-blue;
        line-height: 40px;
				font-weight: 600;
				.publish {
					float: right;
					font-size: 14px;
					cursor: pointer;
					color: #C5C5C5;
					font-weight: normal;
				}
      }
      .course-table {
        width: 100%;
        font-family: "微软雅黑";
				margin-bottom: 20px;
				.index {
					font-weight: bold;
					color: #666;
				}
        tr {
          cursor: pointer;
          td {
            padding: 10px;
						color: @main-color-text;
						text-align: center;
						vertical-align: middle;
						.course-img {
              width: 148px;
              height: 84px;
							position: relative;
							display: inline-block;
							img {
								width: 148px;
                height: 84px;
                display: inline-block;
              }
              .pdf-box {
                width: 148px;
                height: 84px;
                display: inline-block;
              }
							.lock-bg {
								width: 100%;
								display: inline-block;
								background-color: rgba(0, 0, 0, 0.2);
								cursor: no-drop;
								position: absolute;
								top: 0;
								bottom: 0;
								right: 0;
								left: 0;
								.icon-lock {
									font-size: 20px;
									color: #fff;
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
								}
							}
						}
						.tag {
							color: @main-color-red;
						}
						.btn {
							width: 80px;
							height: 30px;
							line-height: 30px;
							text-align: center;
							cursor: pointer;
							border-radius: 4px;
							display: inline-block;
							margin-right: 10px;
						}
						.study-btn {
							border: 1px solid @main-color-blue;
							color: @main-color-blue;
            }
            .practice-btn {
              background-color: @main-color-blue;
              color: #fff;
            }
						.study-disabled {
							cursor: no-drop!important;
							color: #D7D7D7!important;
							border: 1px solid #D7D7D7!important;
            }
            .practice-disabled {
              cursor: no-drop!important;
              color: #fff!important;
              background-color: #D7D7D7!important;
            }
						.tag {
							color:@main-color-red;
						}
          }
        }
			}
			.publish-comment {
				margin-bottom: 20px;
				.rate {
					margin: 10px 10px 10px 0;
					.el-rate {
						display: inline-block;
						margin-left: 10px;
					}
				}
			}
			.comment-box {
        width: 100%;
        display: inline-block;
				.item:last-child {
					border: none;
				}
				.item {
					margin-bottom: 20px;
					border-bottom: 1px solid @main-color-border;
					.avatar {
						float: left;
						width: 50px;
						height: 50px;
            border-radius: 50%;
            background-color: #eaeaea;
					}
					.item-content {
						margin-left: 80px;
						color: #939393;
						.name {
							line-height: 1.5;
							span {
								margin-right: 20px;
							}
						}
						.rate {
							margin: 6px 0;
							/deep/ .el-rate__icon {
								font-size: 14px;
							}
						}
						.comment-text,.reply-text {
							line-height: 1.5;
            }
            .reply-text {
              padding: 10px;
              background-color: #F4F4F4;
              color: #939393;
              border-radius: 4px;
              margin-top: 15px;
              position: relative;
            }
            .reply-text:after {
              content: '';   
              width: 0;    
              height: 0;    
              position: absolute;    
              top: -16px;    
              left: 20px;    
              border: solid 8px;    
              border-color: transparent transparent #f4f4f4 transparent;    
              font-size: 0;  
            }
						.operation-btn {
							margin: 10px 0 20px 0;
							text-align: right;
							i {
								font-size: 18px;
								margin: 0 10px;
								cursor: pointer;
							}
						}
						.reply {
							width: 100%;
							display: inline-block;
						}
					}
        }
        .page-box {
          float: right;
        }
			}
    }
    .success-dialog {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      z-index: 21;
      position: absolute;
      top: 0;
      left: 0;
      .success-box {
        width: 250px;
        background-color: #fff;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -125px;
        .header {
          width: 100%;
          height: 110px;
          border-radius: 10px 10px 0 0;
          img {
            width: 100%;
            height: auto;
            margin-top: -1px;
          }
        }
        .content {
          text-align: center;
          padding: 20px 10px;
          .title {
            font-weight: bold;
            line-height: 2;
          }
          .gray {
            color: @main-color-gray;
            line-height: 3;
          }
          .evaluation-btn {
            width: 100px;
            background-color: @main-color-blue;
            color: #fff;
          }
          .home-btn {
            a {
              color: @main-color-gray;
              line-height: 4;
            }
          }
        }
      }
      .back-box {
        width: 300px;
        height: 135px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -67px;
        margin-left: -150px;
        text-align: center;
        .header {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid @main-color-border;
          .title {
            float: left;
            padding-left: 20px;
          }
          .close {
            font-size: 20px;
            color: @main-color-gray;
            float: right;
            margin-right: 10px;
            cursor: pointer;
          }
        }
        .back-content {
          padding: 30px;
          .text {
            line-height: 50px;
          }
          .back-btn {
            padding: 10px;
            cursor: pointer;
            border: 1px solid @main-color-border;
            border-radius: 4px;
            display: inline-block;
          }
          .success-btn {
            margin-right: 20px;
          }
        }
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
      width: 80%;
      max-height: 55%;
			background-color: #fff;
			position: absolute;
			top: 30%;
			left: 50%;
      transform: translate(-50%,-40%);
      z-index: 0;
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
        }
        & /deep/ .video-js.vjs-fluid {
          padding-top: 50%;
        }
      }
			.close {
				width: 24px;
				height: 24px;
				line-height: 24px;
				text-align: center;
				background-color: #b9b9b9;
				border-radius: 50%;
				color: #fff;
				cursor: pointer;
				font-size: 26px;
				position: absolute;
				right: 10px;
        top: 10px;
        z-index: 1;
			}
		}

	}
}
</style>