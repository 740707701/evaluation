<template>
  <div class="register">
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  name: 'register',
  data() {
    return {
      msg: 'this is register page'
    }
  }
}
</script>
<style lang="less">
  .register-page {
    p {
      color: lightcoral
    }
  }
</style>


