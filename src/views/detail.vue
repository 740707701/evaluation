<template>
  <div class="detail-page">
    <headerNav></headerNav>
    <Banner></Banner>
    <div class="container">
      <p>{{msg}}</p>
    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
import Banner from "../components/Banner.vue";
export default {
  name: "detail",
  data() {
    return {
      msg: "this is detail page"
    };
  },
  method: {},
  components: {
    headerNav,
    Banner
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.detail-page {
  width: 100%;
  height: 100%;
  background-color: @main-color-bg;
  p {
    color: lightblue;
  }
}
</style>

