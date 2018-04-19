<template>
  <div class="setting-page">
    {{msg}}
  </div>
</template>
<script>
  export default {
    name: 'setting',
    data(){
      return {
        msg: '设置页面'
      }
    }
  }
</script>
<style lang="less" scoped>
.setting-page {
  color: green;
}
</style>

