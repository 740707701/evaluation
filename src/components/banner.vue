<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="200">
      <el-carousel-item v-for="banner in bannerList" :key="banner">
        <!-- <img style="border:1px solid red;" :src="banner" alt=""> -->
        <h3>{{banner}}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  export default {
    name: 'banner',
    data(){
      return {
        bannerList: [
          '../assets/images/demo/01.jpg',
          '../assets/images/demo/02.jpg',
          '../assets/images/demo/03.jpg',
          '../assets/images/demo/04.jpg',
          '../assets/images/demo/05.jpg',
          '../assets/images/demo/06.jpg',
        ]
      }
    }
  }
</script>
<style lang="less">
  .banner {
    padding: 0 50px;
    .el-carousel__item {
      img {
        width: 300px;
        height: auto;
        border: 1px solid red;
      }
      h3 {
        font-size: 30px;
        color: red;
      }
    }
  }
</style>

