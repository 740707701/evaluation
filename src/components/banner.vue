<template>
  <div class="banner">
    <div class="default-box">
      <img src="../assets/images/default_banner.jpg" alt="" ref="defaultImg" class="default-img img">
    </div>
    <el-carousel :interval="4000" :height="defaultImgHeight">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <div class="img-box">
          <img :src="item.pictureUrl" class="img">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "banner",
  data() {
    return {
      bannerList: [],
      defaultImgHeight: ''
    }
  },
  created(){
    this.getBannerList()
  },
  methods: {
    getBannerList(){
      let params = {}
      this.$store.dispatch("BANNERLIST", params).then(res => {
        this.bannerList = res.data;
        this.defaultImgHeight = this.$refs.defaultImg.height + 'px';
      }).catch(err => {
        if(err.data.msg){
          this.$message({
            type: "error",
            message: errdata.msg
          })
        }else {
          this.$message({
            type: "error",
            message: "获取banner失败"
          })
        }
      })
    }
  }
};
</script>
<style lang="less">
.banner {
  position: relative;
  .img-box{  
    width: 100%;  
    z-index: 1;  
    .img{  
        position:absolute;  
        top:0;  
        bottom:0;  
        left:0;  
        right:0;  
        width:100%;
        height: 100%;  
        margin: 0;  
    }  
  }  
  .img-box:before {  
      content: "";  
      display: inline-block;  
      padding-bottom: 100%;  
      width: 0.1px;   //必须要有数值，否则无法把高度撑起来 
      vertical-align: top;  
  }
  .default-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    img {
      width: 100%;
      height: auto;
      border: none;
    }
  }
}
</style>

