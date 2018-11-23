<template>
  <div class="forbidden-container">
    <div class="container">
      <div class="forbidden-box">
        <img class="forbidden-img" src="../assets/images/no-open.png" alt="">
        <div class="forbidden-text">本模块暂未开放~</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'forbidden',
	data() {
		return {}
	}
}
</script>

<style lang="less">
@import "../assets/css/colors.less";
  .forbidden-container {
    // width: 100%;
    // min-height: 100%;
    // background-color: @main-color-bg;
    // padding-top: 60px;
    // padding-bottom: 25px;
    width: 1200px;
    margin: 0 auto;
    .container {
      width: 1200px;
      min-height: calc(100vh - 165px); // 80+60+25
      margin-top: 40px;
      margin-bottom: 40px;
      box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
      text-align: center;
      border-radius: 10px;
      background-color: #fff;
      position: relative;
      .forbidden-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .forbidden-img {
          width: 200px;
          height: auto;
        }
        .forbidden-text {
          font-size: 24px;
          text-align: center;
          margin-top: 30px;
        }
      }
    }
  }
</style>
