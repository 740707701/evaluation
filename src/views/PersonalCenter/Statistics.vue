<template>
  <div class="statistics-page">
    {{msg}}
  </div>
</template>
<script>
export default {
  name: "statistics",
  data() {
    return {
      msg: "统计页面"
    };
  }
};
</script>
<style lang="less" scoped>
.statistics-page {
  color: hotpink;
}
</style>

