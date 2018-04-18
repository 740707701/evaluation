<template>
  <div class="banner">
    <div class="container">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <a :href="item.url">
            <img class="carousel-img" :src="item.img">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: "banner",
  data() {
    return {
      bannerList: [
        {
          url: "#",
          id: 0,
          img: require("../assets/images/demo/01.jpg")
        },
        {
          url: "#",
          id: 1,
          img: require("../assets/images/demo/02.jpg")
        },
        {
          url: "#",
          id: 2,
          img: require("../assets/images/demo/03.jpg")
        },
        {
          url: "#",
          id: 3,
          img: require("../assets/images/demo/04.jpg")
        },
        {
          url: "#",
          id: 4,
          img: require("../assets/images/demo/05.jpg")
        },
        {
          url: "#",
          id: 5,
          img: require("../assets/images/demo/06.jpg")
        }
      ]
    };
  }
};
</script>
<style lang="less">
.banner {
  margin-top: 12px;
  .container {
    width: 1200px;
    margin: 0 auto;
    .carousel-img {
      width: 600px;
      height: 300px;
      border-radius: 15px;
    }
  }
}
</style>

