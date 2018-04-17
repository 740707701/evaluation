<template>
<div class="home-page">
  <headerNav></headerNav>
  <Banner></Banner>
  <div class="container">
    <div class="category">
      <p class="title">测试分类</p>
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
  height: 100%;
  background-color: @main-color-bg;
  padding-bottom: 25px;
  .container {
    width: 1200px;
    margin: 0 auto;
    .category {
      .title {
        line-height: 2;
      }
    }
  }
}
</style>