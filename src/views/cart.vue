<template>
  <div class="cart-page">
    <p>{{msg}}</p>
  </div>
</template>
<script>
  export default {
    name: 'cart',
    data () {
      return {
        msg: 'this is cart page'
      }
    }

  }
</script>
<style lang="less" scoped>
  .cart-page {
    p {
      color: red;
    }
  }
</style>

