<template>
  <div class="evaluation-page">
    <headerNav></headerNav>
    <div class="banner-bg">
      <img src="../assets/images/bg_01.png" alt="">
    </div>
    <div class="container" v-if="detail.baseInfo">
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
        <p class="warn" v-if="!showCaichuBox">请注意：若你现在不打算完成测试请不要使用序列号登陆，一旦登陆就会消耗掉序列号使用限额。	序列号只有一次使用机会。</p>
        <div class="caichu-form" v-if="!showCaichuBox">
          <el-form label-width="100px">
            <el-form-item label="量表版本：" prop="">
              <el-input size="small" v-model="caichuCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="序列号：" prop="serialNumber">
              <el-input size="small" v-model="serialNumber" placeholder="请输入序列号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="">
                <div class="test-btn" :class="{disabled: !caichuCode}" @click="test()">立即测试</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="iframe" v-if="showCaichuBox">
          <iframe width="100%" height="500"  frameborder="0" scrolling="yes" 
          :src="`http://www.apesk.com/h/go_zy_dingzhi.asp?checkcode=${serialNumber}&hruserid=18702192580&l=${detail.baseInfo.caichuCode}&test_name=${test_name}&test_email=${test_email}`"></iframe>
        </div>
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
      caichuCode: '',
      serialNumber: '',
      test_email: '',
      test_name: '',
      showCaichuBox: false,
      detail: {},
      caichu: {},
    };
  },
  computed: {},
  created: function(){
    this.serialNumber = this.$route.params.serialNo
    this.evaluationDetail()
  },
  methods: {
    evaluationDetail: function(){
      this.$store.dispatch('EVALUATION_DETAIL', {cepingId: this.$route.params.cepingId})
      .then( res => {
        this.detail = res.data;
        // this.caichuCode = String(this.detail.baseInfo.caichuCode) + '测试' ;
        this.caichuCode =this.detail.baseInfo.caichuCode;
      })
      .catch( err => {
        console.log(err)
        if(err.data.msg){
          this.$message({
            type: 'error',
            message: err.data.msg
          })
        }else {
          this.$message({
            type: 'error',
            message: '获取测评详情失败,请稍后重试。'
          })
        }
      })
    },
    test: function(){
      if(!this.caichuCode){
        this.$message({
          type: 'error',
          message: "未查找到量表版本，请稍后重试"
        })
        return
      }
      if(this.serialNumber){
        let data = {
          cepingId: this.$route.params.cepingId,
          serialno: this.serialNumber
        }
        this.$store.dispatch('TOCAICHU', data).then(res => {
          this.test_name = res.data.data.test_name,
          this.test_email = res.data.data.test_email
          console.log('name',this.test_name, this.test_email)
          this.showCaichuBox = true;
        }).catch(err => {
          console.log(err)
          if(err.data.msg){
            this.$message({
              type: 'error',
              message: err.data.msg
            })
          }
        })
      }else {
        this.$message({
          type: "error",
          message:"请输入序列号",
          trigger: "blur"
        })
      }
    }
  },
  components: {
    headerNav
  },
  mounted(){}
}
</script>
<style lang="less" scoped>
@import '../assets/css/colors.less';
.evaluation-page {
  // height: 100%;
  min-height: 100%;
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
    height: calc(100% - 70px);
    .disabled {
      cursor: no-drop!important;
    }
    .intro-box {
      min-height: 160px;
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
      height: calc(100% - 180px);
      .warn {
        line-height: 30px;
        text-align: center;
        color: red;
        padding-top: 30px;
        font-weight: bold;
      }
      .caichu-form {
        width: 500px;
        margin: 0 auto;
        padding: 10px 0 30px 0;
        .test-btn {
          line-height: 28px;
          padding: 0 15px;
          border: 1px solid @main-color-border;
          background-color: #eaeaea;
          display: inline-block;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

