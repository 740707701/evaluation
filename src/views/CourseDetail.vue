<template>
  <div class="coursedetail-page">
    <div class="container">
      <div class="back">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
          <span>返回</span>
        </router-link>
      </div>
      <div class="content">
        <img src="../assets/images/demo/05.jpg" alt="">
        <div class="info-box">
          <p class="title">高考专业选择</p>
          <p class="gray">适应人群：高中生</p>
          <p class="gray">难度：高级</p>
          <p class="gray">数量：220题</p>
          <p class="red">价格： ¥9.80</p>
          <div class="btn-box">
            <el-button size="small" class="buy-btn" @click="showDialog=true">立即购买</el-button>
            <i class="iconfont icon-cart"></i>
            <!-- <el-button size="small" icon="el-icon-search" class="cart-btn"></el-button> -->
          </div>
        </div>
        <div class="intro">
          <p class="title">简介：</p>
          <div class="intro-text">
            人生路漫漫，要选择一条十分满意的道路，首先必须要了解自己，探索多种可能性，而选择专业可说是职业生涯发展的第一步。
            面对数百种专业，我们常常会无从选起，本报告力图从多个角度客观解析你的兴趣、性格、价值观，帮助你更充分地了解自己、了解专业。
            我们希望，通过这份报告，你会发现你平常从未知觉的自我，唤醒你对于自己职业生涯的重视。这个新的自我发现，将会为你的人生选择带来新的契机和启示。
          </div>
        </div>
        <div class="hot">热门测评</div>
        <el-table :data="hotList">
          <el-table-column prop="name"></el-table-column>
          <el-table-column prop="count"></el-table-column>
          <el-table-column prop="price">价格：</el-table-column>
          <el-table-column prop="people">人</el-table-column>
        </el-table>
      </div>
      <div class="dialog" v-if="showDialog" @click.self="showDialog=false" >
        <div class="success-box">
          <div class="header">
            <img src="../assets/images/buy_bg.png" alt="">
          </div>
          <div class="content">
            <p class="title">付款成功</p>
            <p class="gray">序列号：2375869784856869</p>
            <el-button round size="small" class="evaluation-btn" @click="toValuation()">进入测评</el-button>
            <div class="home-btn">
              <router-link to="/">返回首页</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "coursedetail",
  data() {
    return {
      showDialog: false,
      hotList: [
        {
          name: "大脑优势测试",
          count: 100,
          price: 9.8,
          people: 238
        },
        {
          name: "大脑优势测试",
          count: 100,
          price: 9.8,
          people: 238
        },
        {
          name: "大脑优势测试",
          count: 100,
          price: 9.8,
          people: 238
        },{
          name: "大脑优势测试",
          count: 100,
          price: 9.8,
          people: 238
        }
      ]
    };
  },
  methods: {
    toValuation(){
      this.$router.push('/evaluation')
    },
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.coursedetail-page {
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .back {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid @main-color-border;
      i {
        color: @main-color-blue;
      }
      span {
        margin-left: 5px;
        color: @main-color-text;
      }
    }
    .content {
      padding: 20px;
      img {
        float: left;
        width: 300px;
        height: 160px;
        border-radius: 10px;
      }
      .info-box {
        margin-left: 330px;
        .title {
          font-weight: bold;
        }
        p {
          line-height: 1.6;
          font-size: 14px;
        }
        .gray {
          color: @main-color-gray;
        }
        .red {
          color: @main-color-red;
        }
        .btn-box {
          margin-top: 10px;
          display: inline-block;
          .buy-btn {
            height: 30px;
            color: #fff;
            margin: 0;
            box-shadow: 0 0 0;
            border: none;
          }
          .buy-btn {
            float: left;
            background-color: #db3523;
            border-radius: 4px 0 0 4px;
          }
          .icon-cart {
            float: left;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background-color: #dc534d;
            cursor: pointer;
          }
        }
      }
      .intro {
        padding: 20px;
        color: @main-color-gray;
        .title {
          line-height: 30px;
        }
        .intro-text {
          line-height: 1.6;
        }
      }
      .hot {
        color: @main-color-blue;
        line-height: 40px;
      }
      .el-table {}
    }
    .dialog {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.3);
      border-radius: 10px;
      z-index: 11;
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
    }
  }
}
</style>