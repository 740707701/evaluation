<template>
<div class="home-page">
  <headerNav></headerNav>
  <Banner></Banner>
  <div class="container">
    <div class="category">
      <p class="title">
        <i class="iconfont icon-star"></i>
        测试分类</p>
    </div>

    <router-view></router-view>
  </div>
</div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
import Banner from "../components/Banner.vue";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    headerNav,
    Banner
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.home-page {
  background-color: @main-color-bg;
  padding-top: 60px;
  padding-bottom: 25px;
  min-height: 100%;
  .container {
    width: 1200px;
    margin: 0 auto;
    // height: calc(100vh - 400px);
    .category {
      .title {
        line-height: 2;
        margin-bottom: 6px;
        i {
          color: @main-color-blue;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>