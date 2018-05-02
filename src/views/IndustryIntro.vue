<template>
  <div class="industryintro-page">
    <headerNav></headerNav>
    <div class="container">
      <p>行业与岗位介绍</p>

    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
export default {
  name: "industryintro",
  data() {
    return {};
  },
  methods: {},
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.industryintro-page {
  height: 100%;
  background-color: @main-color-bg;
  padding-bottom: 25px;
  .container {
    width: 1200px;
    margin: 0 auto;
    p {
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>

