<template>
  <div class="resume-bg">
    <div class="img-bg" v-if="permission!='forbidden'">
      <div class="btn-box">
        <div class="btn student" @click="toResume(1)">
          <i class="iconfont icon-freshstudent"></i>
          在校生/应届毕业生
        </div>
        <div class="btn work" @click="toResume(2)">
          <i class="iconfont icon-workplace"></i>
          职场人士
        </div>
      </div>
    </div>
    <forbidden v-if="permission=='forbidden'"></forbidden>
  </div>
</template>
<script>
import forbidden from '@/components/Forbidden.vue'
  export default {
    name: 'resumeBg',
    data() {
      return {
        permission: ''
      }
    },
    created(){
      this.permission = this.$route.query.permission
    },
    methods: {
      toResume(resumeType) {
        // resumeType 简历类型（1：应届毕业生 2：职场人士）
        if(resumeType === 1) {
          this.$router.push({ path: '/freshStudentResume' })
        } else if(resumeType === 2) {
          this.$router.push({ path: '/resume' })
        }
      }
    },
    components: {
      forbidden
    }
  }
</script>
<style lang="less" scoped>
  @import "../../assets/css/colors.less";
  .resume-bg {
    width: 100%;
    height: calc(100vh - 60px);
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
      .btn-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .student {
        color: #999;
        i {
          color: #999;
          font-size: 20px;
        }
      }
      .work {
        color: @main-color-blue;
        i {
          color: #027EFE;
        }
      }
      .btn {
        width: 190px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #fff;
        border-radius: 4px;
        cursor: pointer;
        display: inline-block;
        &:first-child {
          margin-right: 30px;
        }
        i {
          margin-right: 5px;
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

