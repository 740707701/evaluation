<template>
  <div class="login-page">
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      msg: 'this is login page'
    }
  }
}
</script>
<style lang="less">
  .login-page {
     p {
       color: lightgreen
     }
  }
</style>


