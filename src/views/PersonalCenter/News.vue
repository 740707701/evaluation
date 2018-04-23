<template>
  <div class="news-page">
    {{msg}}
  </div>
</template>
<script>
export default {
  name: "news",
  data() {
    return {
      msg: "消息通知页面"
    };
  }
};
</script>
<style lang="less" scoped>
.news-page {
  color: hotpink;
  height: 100%;
}
</style>

