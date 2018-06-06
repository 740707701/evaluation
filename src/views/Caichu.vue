<template>
  <div class="caichu-page">
    <div class="caichu-form">
      <el-form :model="caichu" ref="expect" label-width="100px">
        <el-form-item label="量表版本：" prop="">
          <el-input size="small" v-model="caichuCode" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="序列号：" prop="">
          <el-input size="small" v-model="serialNumber" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="" prop="">
            <button @click="test">立即测试</button>
          <!-- <a target="_blank" :href="`http://www.apesk.com/h/go_zy_dingzhi.asp?checkcode=${serialNumber}&hruserid=18702192580&I=${detail.baseInfo.caichuCode}`">
          </a> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        caichuCode: '',
        serialNumber: '',
        caichu: {}
      }
    },
    created(){},
    methods: {
      test: function(){}
    }
  }
</script>
<style lang="less" scoped>
  .caichu-page {
    .caichu-form {
        width: 500px;
        margin: 0 auto;
        padding: 30px 0;
      }
  }
</style>

