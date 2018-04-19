<template>
  <div class="unfinished-page">
    {{msg}}
  </div>
</template>
<script>
  export default {
    name: 'unfinished',
    data(){
      return {
        msg: '未完成测评页面'
      }
    }
  }
</script>
<style lang="less" scoped>
.unfinished-page {
  color: hotpink;
}
</style>

