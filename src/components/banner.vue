<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="150px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <a :href="item.url">
          <img class="carousel-img" :src="item.img">
        </a>
      </el-carousel-item>
    </el-carousel>
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
  margin-top: 15px;
  .carousel-img {
    width: 500px;
    height: 150px;
  }
}
</style>

