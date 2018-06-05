<template>
  <div class="evaluation-page">
    <headerNav></headerNav>
    <div class="banner-bg">
      <img src="../assets/images/bg_01.png" alt="">
    </div>
    <div class="container">
      <div class="intro-box">
        <img :src="detail.baseInfo.picAll" alt="">
        <div class="intro-top">
          <div class="intro-title">
            <p class="title">{{detail.baseInfo.cepingName}}</p>
            <ul class="tab">
              <li><span class="name">难度：</span><span class="value">{{detail.baseInfo.cepingLevel}}</span></li>
              <!-- <li><span class="name">时长：</span><span class="value">{{detail.baseInfo.timeLength}}</span></li> -->
              <li><span class="name">学习人数：</span><span class="value">{{detail.baseInfo.browseCount || 0}}</span></li>
              <li><span class="name">题目数量：</span><span class="value">{{detail.baseInfo.num || 0}}</span></li>
              <li><span class="name">适应人群：</span><span class="value">{{detail.baseInfo.peopleScope}}</span></li>
            </ul>
          </div>
          <div class="intro-text">
            <p>简介：</p>
            <div class="gray">{{detail.baseInfo.remark}}</div>
          </div>
        </div>
      </div>
      <div class="caichu-box">
        <!-- <iframe width="100%" height="500" id="caichu" name="iframe" frameborder="0" scrolling="no" :src="`http://www.apesk.com/h/f.asp?u=5727234&l=${detail.baseInfo.caichuCode}`"></iframe> -->
        <iframe width="100%" height="500" id="caichu" name="iframe" frameborder="0" scrolling="no" :src="`http://101.132.166.37:8080/cepingweb/toCaichuNotice`"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
import { mapState } from 'vuex'
export default {
  name: "evaluation",
  data() {
    return {
      detail: {}
    };
  },
  computed: {},
  created: function(){
    this.evaluationDetail()
  },
  methods: {
     evaluationDetail: function(){
      this.$store.dispatch('EVALUATION_DETAIL', {cepingId: this.$route.params.id})
      .then( res => {
        this.detail = res.data
      })
      .catch( err => {
        console.log(err)
        if(err.data.msg){
          this.$message({
            type: 'error',
            massage: err.data.msg
          })
        }else {
          this.$message({
            type: 'error',
            massage: '获取测评详情失败,请稍后重试。'
          })
        }
      })
    },
    toCaichu: function(){
      let data = {
        cepingId: this.$route.params.id,
        serialno: this.detail.baseInfo.caichuCode
      }
      this.$store.dispatch('TOCAICHU', data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        if(err.data.msg){
          this.$message({
            type: 'error',
            massage: err.data.msg
          })
        }else {
          this.$message({
            type: 'error',
            massage: '找不到相应测评数据,请稍后重试。'
          })
        }
      })
    }
  },
  components: {
    headerNav
  },
  mounted(){
   var iframe = document.getElementById("caichu"); //获取iframe标签
    var iwindow = iframe.contentWindow; //获取iframe的window对象
    var idoc = iwindow.document; //获取iframe的document对象
    console.log(idoc.documentElement); //获取iframe的html
    console.log("body",idoc.body);
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

