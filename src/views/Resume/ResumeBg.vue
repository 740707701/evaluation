<template>
  <div class="resume-bg">
    <headerNav></headerNav>
    <div class="img-bg" v-if="permission!='forbidden'">
      <div class="btn" @click="toResume">
        <i class="iconfont icon-qianbi"></i>
        免费创建简历
      </div>
    </div>
    <forbidden v-if="permission=='forbidden'"></forbidden>
  </div>
</template>
<script>
import forbidden from '@/components/Forbidden.vue'
import headerNav from '../../components/HeaderNav'
  export default {
    name: 'resumeBg',
    data(){
      return {
        permission: ''
      }
    },
    created(){
      this.permission = this.$route.query.permission
    },
    methods: {
      toResume(){
        this.$router.push({
          path: '/resume'
        })
      }
    },
    components: {
      headerNav,
      forbidden
    }
  }
</script>
<style lang="less" scoped>
  @import "../../assets/css/colors.less";
  .resume-bg {
    width: 100%;
    height: 100%;
    padding-top: 60px;
    background-color: #f8fafc;
    .img-bg {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/images/resume_bg.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      // background-attachment:fixed;
      position: relative;
      .btn {
        width: 190px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #fff;
        border-radius: 4px;
        color: @main-color-blue;
        cursor: pointer;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -95px;
        margin-top: -30px;
        i {
          color: @main-color-blue;
          margin-right: 20px;
        }
      }
    }
    .img-box {
      width: 100%;
      height: calc(100% - 60px);
      position: absolute;
      top: 60px;
      left: 0;
      z-index: -1;
      img {
        width: 100%;
        height: 100%;
        border: 0;
        display: block; //防止3px的空白出现
      }
    }
  }
</style>

