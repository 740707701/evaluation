<template>
  <div class="evaluation-page">
    <headerNav></headerNav>
    <div class="banner-bg">
      <img src="../assets/images/bg_01.png" alt="">
    </div>
    <div class="container">
      <div class="intro-box">
        <img src="../assets/images/demo/06.jpg" alt="">
        <div class="intro-top">
          <div class="intro-title">
            <p class="title">高中生高考选择</p>
            <ul class="tab">
              <li><span class="name">难度：</span><span class="value">高级</span></li>
              <li><span class="name">时长：</span><span class="value">1小时25分钟</span></li>
              <li><span class="name">学习人数：</span><span class="value">26578</span></li>
              <li><span class="name">题目数量：</span><span class="value">225</span></li>
              <li><span class="name">适应人群：</span><span class="value">高中生</span></li>
            </ul>
          </div>
          <div class="intro-text">
            <p>简介：</p>
            <div class="gray">
              人生路漫漫，要选择一条十分满意的道路，首先必须要了解自己，探索多种可能性，而选择专业可说是职业生涯发展的第一步。
            面对数百种专业，我们常常会无从选起，本报告力图从多个角度客观解析你的兴趣、性格、价值观，帮助你更充分地了解自己、了解专业。
            我们希望，通过这份报告，你会发现你平常从未知觉的自我，唤醒你对于自己职业生涯的重视。这个新的自我发现，将会为你的人生选择带来新的契机和启示。
            </div>
          </div>
        </div>
      </div>
      <div class="caichu-box">
        <iframe width="100%" height="500" frameborder="0" scrolling="no" src="http://www.apesk.com/h/f.asp?u=5727234&l=MBTI-STEP-II-112"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
export default {
  name: "evaluation",
  data() {
    return {
      msg: "测评页面"
    };
  },
  computed: {},
  created: {},
  components: {
    headerNav
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/colors.less';
.evaluation-page {
  background-color: @main-color-bg;
  padding-top: 60px;
  padding-bottom: 25px;
  position: relative;
  z-index: 1;
  .banner-bg {
    width: 100%;
    margin-top: 0;
    position: absolute;
    // top: 50px;
    z-index: -1;
    img {
      width: 100%;
      height: 150px;
    }
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    margin-top: 70px;
    .intro-box {
      img {
        float: left;
        width: 300px;
        height: 160px;
        border-radius: 10px;
      }
      .intro-top {
        margin-left: 320px;
        .intro-title {
          height: 80px;
          .title {
            font-weight: bold;
            color: #fff;
            padding: 10px 0;
          }
          .tab {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            li {
              float: left;
              margin-right: 10px;
              .name {
                color: #A2A9B8;
              }
              .value {
                color: #fff;
              }
            }
          }
        }
        .intro-text {
          line-height: 1.6;
          font-size: 12px;
        }
      }
    }
    .caichu-box {
      background-color: #fff;
      border-radius: 10px;
      margin-top: 20px;
    }
  }
}
</style>

