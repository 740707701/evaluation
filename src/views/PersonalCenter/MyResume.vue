<template>
  <div class="myresume-page">
    {{msg}}
  </div>
</template>
<script>
  export default {
    name: 'myresume',
    data(){
      return {
        msg: '我的简历页面'
      }
    }
  }
</script>
<style lang="less" scoped>
.myresume-page {
  color: hotpink;
}
</style>

