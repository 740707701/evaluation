<template>
<div class="home-page">
  <!-- <headerNav></headerNav> -->
  <div>qweasdsfdfdlkvjfdl;jgf bmfgnmdfljgslj;</div>
  <!-- <div class="msg">{{msg}}</div> -->
</div>
</template>
<script>
  // import headerNav from '../components/Header.vue'
  export default {
    name: 'Home',
    data() {
      return {
        msg: 'this is home page'
      }
    },
    computed: {},
    methods: {},
    components: {
      headerNav
    }
  }
</script>
<style lang="less" scoped>
.home-page {
  font-size: 1.6rem;
  .msg {
    font-size: 16px;
    color: green;
    border: 1px solid red;
  }

}
</style>