<template>
  <div class="mybook-page">
      <el-tabs>
          <el-tab-pane label="书籍库">
              <div class="book-content">
                  功能正在开发中~
              </div>
          </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
    export default {
        name: 'mybook',
        data(){
            return {
            }
        },
        methods: {}
    }
</script>
<style lang="less" scoped>
@import url("../../assets/css/colors.less");
.mybook-page {
    .book-content {
        padding: 10px 20px;
    }
}
</style>

