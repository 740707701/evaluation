<template>
  <div class="completed-page">
    {{msg}}
  </div>
</template>
<script>
  export default {
    name: 'completed',
    data(){
      return {
        msg: '已完成测评页面'
      }
    }
  }
</script>
<style lang="less" scoped>
.completed-page {
  color: hotpink;
}
</style>

