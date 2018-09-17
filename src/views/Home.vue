<template>
<div class="home-page">
  <headerNav></headerNav>
  <router-view></router-view>
</div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
// import Banner from "../components/Banner.vue";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    headerNav,
    // Banner
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
}
</style>