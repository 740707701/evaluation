<template>
<div class="home-page">
  <headerNav @showLogin="login" @showRegister="register"></headerNav>
  <Banner></Banner>
  <div class="container">
    <div class="category">
      <p class="title">
        <i class="iconfont icon-star"></i>
        测试分类</p>
    </div>

    <router-view></router-view>
    <login v-if="showLogin" @showRegister="register" @showForget="forget" @hideLogin="hideLogin"></login>
    <register v-if="showRegister" @showLogin="login"></register>
    <forget v-if="showForget" ></forget>
  </div>
</div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
import Banner from "../components/Banner.vue";
import login from '../components/Login.vue';
import register from '../components/Register.vue';
import forget from '../components/Forget.vue';
export default {
  name: "home",
  data() {
    return {
      showLogin: false,
      showRegister: false,
      showForget: false
    };
  },
  computed: {},
  methods: {
    login: function(){
      this.showLogin = true;
      this.showRegister = false;
      this.showForget = false;
    },
    hideLogin: function(){
      this.showLogin = false;
    },
    register: function(){
      this.showRegister = true;
      this.showLogin = false;
      this.showForget = false;
    },
    forget: function(){
      this.showForget = true;
      this.showRegister = false;
      this.showLogin = false;
    },
  },
  components: {
    headerNav,
    Banner,
    login,
    register,
    forget
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
    height: calc(100% - 345px);
    .category {
      .title {
        line-height: 2;
        i {
          color: @main-color-blue;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>