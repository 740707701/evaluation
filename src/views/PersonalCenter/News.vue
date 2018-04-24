<template>
  <div class="news-page">
    <el-tabs  v-model="activeName">
      <el-tab-pane label="消息通知" name="first">
        <div class="notice">
          <div class="item">
            <div class="logo">
              <img src="../../assets/images/demo/06.jpg" alt="">
            </div>
            <div class="content">
              <div class="title">
                <span>公告</span>
                <span class="time">04-16 10:34</span>
              </div>
              <div class="message">美的空调无风感创意海报设计大赛即将收官，速来挑战！如果你的画工够强，技术够硬，创意够炸，速来开启你的专属无风之旅！
                十万元现金大奖，28个获奖名额，只差一个你~</div>
            </div>
          </div>
           <div class="item">
            <div class="logo">
              <img src="../../assets/images/demo/06.jpg" alt="">
            </div>
            <div class="content">
              <div class="title">
                <span>公告</span>
                <span class="time">04-16 10:34</span>
              </div>
              <div class="message">美的空调无风感创意海报设计大赛即将收官，速来挑战！如果你的画工够强，技术够硬，创意够炸，速来开启你的专属无风之旅！
                十万元现金大奖，28个获奖名额，只差一个你~</div>
            </div>
          </div>
           <div class="item">
            <div class="logo">
              <img src="../../assets/images/demo/06.jpg" alt="">
            </div>
            <div class="content">
              <div class="title">
                <span>公告</span>
                <span class="time">04-16 10:34</span>
              </div>
              <div class="message">美的空调无风感创意海报设计大赛即将收官，速来挑战！如果你的画工够强，技术够硬，创意够炸，速来开启你的专属无风之旅！
                十万元现金大奖，28个获奖名额，只差一个你~</div>
            </div>
          </div>
        </div>
        <div class="share">
          <div class="item">
            <div class="logo">
              <img src="../../assets/images/demo/03.jpg" alt="">
            </div>
            <div class="content">
              <div class="title">
                <span>李某人</span>
                <span class="time">03-26 12:22</span>
              </div>
              <div class="message">推荐分享给你一份测评题目<a href="javascript:">《高考专业选择测评》</a></div>
            </div>
          </div>
        </div>
        <div class="system">
          <div class="item">
            <div class="logo">
              <img src="../../assets/images/demo/04.jpg" alt="">
            </div>
            <div class="content">
              <div class="title">
                <span>系统</span>
                <span class="time">03-30 11:20</span>
              </div>
              <div class="message">感谢你，在平台购买了以下测评题目 <a href="javascript:">《高考专业选择测评》</a>
                </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "news",
  data() {
    return {
      activeName: 'first'
    };
  }
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/colors.less');
.news-page {
  height: 100%;
  .notice {
    padding-bottom: 20px;
    border-bottom: 1px solid @main-color-border;
  }
  .notice, .share , .system {
    .item {
      padding-top: 10px;
      .logo {
        float: left;
        width: 40px;
        height: 40px;
        margin-top: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
      }
      .content {
        margin-left: 60px;
        .title {
          line-height: 30px;
          color: @main-color-gray;
          .time {
            margin-left: 90px;
          }
        }
        .message {
          line-height: 22px;
          color: @main-color-text;
          a {
            color: @main-color-blue;
          }
        }
      }
    }
  }
}
</style>

