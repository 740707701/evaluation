<template>
  <div class="test-page">
    <iframe width="100%"  id="caichu" name="iframe" frameborder="0"  :src="`http://www.apesk.com/h/f.asp?u=5727234&l=${caichuCode}`"></iframe>
  </div>
</template>
<script>
export default {
  name: 'caichu',
  data(){
    return {
      caichuCode: ''
    }
  },
  created(){
    this.caichuCode = this.$route.params.caichuCode
  },
  methods: {}

}

</script>
<style lang="less">
.test-page {}
</style>

