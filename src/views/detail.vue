<template>
  <div class="detail-page">
    <p>{{msg}}</p>
  </div>
</template>
<script>
  export default {
    name: 'detail',
    data() {
      return {
        msg: 'this is detail page'
      }
    }
  }
</script>
<style lang="less" scoped>
  .detail-page {
    p {
      color: lightblue
    }
  }
</style>

