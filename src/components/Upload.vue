<template>
  <div class="avatar" :style="`width:${imgWidth};height:${imgHeight}`">
    <div class="bg" :style="`line-height:${imgHeight}`">点击上传</div>
    <input type="file" class="input-file" name="avatar" ref="avatarInput"
    @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
    <img :src="avatar" alt="" name="avatar">
    <div class="text" @click="upload" v-if="file">确定上传</div>
  </div>
</template>
<script>
export default {
  name: 'upload',
   data(){
     return{
       avatar: '',
       file: ''
     }
   },
   props: ["uploadType", "imgUrl", "imgWidth", "imgHeight", "radius"],
   created(){
     console.log(this.imgUrl)
     this.avatar = this.imgUrl
   },
   methods: {
     changeImage: function(e){
      let file = e.target.files[0];
      this.file = file
      // console.log(this.file)
      let reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload= function(e){
        that.avatar = this.result
      }
    },
    upload: function(){
      if(this.$refs.avatarInput.files[0].length !== 0){
        let data = new FormData()
        data.append('multfile', this.$refs.avatarInput.files[0])
        data.append('operaType', this.uploadType)
        this.$store.dispatch('UPLOAD_HEAD', data)
        .then(res => {
          console.log(res)
          this.file = '';
          let data = res.data.data;
          this.$emit("upload", data );
           this.$message({
              type: "success",
              message: "上传成功！"
            })
        }).catch(err => {
          console.log(err)
          if(err.data.msg){
            this.$message({
              type: "error",
              message: err.data.msg
            })
          }else {
            this.$message({
              type: "error",
              message: "上传失败"
            })
          }
        })
      }
    },
   }
}
</script>
<style lang="less" scope>
  @import "../assets/css/colors.less";
  .avatar {
    cursor: pointer;
    position: relative;
    .input-file {
      width: 100%;
      height: 100%;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    img {
      width: 100%;
      height: 100%;
      background-color: gray;
      display: inline-block;
    }
    .bg {
      width: 100%;
      height: 100%;
      text-align: center;
      vertical-align: middle;
      color: #fff;
      background-color: rgba(0,0,0,0.3);
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
    }
    .text {
      line-height: 30px;
      text-align: center;
      padding-top: 10px;
      color: @main-color-blue;
    }
  }
</style>


