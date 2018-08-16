<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>
 
<style lang="less" >
@import "./assets/css/colors.less";
@import "./assets/icon/iconfont.css";
#app {
  font-family: "Arial", "Hiragino Sans GB", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 14px;
  height: 100%;
  min-height: 100%;
  .page {
    padding-top: 60px;
  }
  textarea, .textarea {
    width: 100%;
    padding: 10px 15px;
    border-radius: 4px;
    border: 1px solid @main-color-border;
    color: @main-color-text;
    font-family: "微软雅黑";
  }
  textarea:-moz-placeholder,
  textarea::-webkit-input-placeholder {
    // color: @main-color-gray;
    color: red;
  }
  //element-ui input边线
  .el-input__inner {
    // border: 1px solid @main-color-border;
    color: @main-color-text;
    background-color: #fff;
  }
  .el-tabs__item.is-active,.el-tabs__item:hover {
    color: @main-color-blue;
  }
  .el-tabs__active-bar {
    background-color: @main-color-blue;
  }
  .el-tabs__nav-wrap {
    padding-left: 15px;
  }
  //checkbox label字体大小
  .el-checkbox__label {
    font-size: 12px;
  }
  //element-ui input日期框的图标
  /*8
  .el-input__prefix {
    right: 5px; //右侧有关闭按钮
  }
  */
  .el-carousel {
    // overflow-y: hidden;
  }
  .el-carousel__indicators {
    bottom: 20px;
  }
  .el-carousel__indicator {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    padding: 0;
    margin: 0;
    background-color: #fff;
    margin-right: 20px;
  }
   .el-carousel__indicator.is-active {
    border: 2px solid #fff;
    padding: 2px;
    background-color: transparent;
    border-radius: 10px;
   }

  .el-carousel__button {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    display: inline-block;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }
  .dropdown-badge {
    .el-badge__content.is-fixed.is-dot {
      right: 0px!important;
      top: 8px!important;
    }
  }
}
</style>
