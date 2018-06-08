<template>
  <div class="avatar">
    <div @mouseover="showBg=true" @mouseleave="showBg=false">
      <div class="bg" v-if="showBg" >点击上传</div>
      <input type="file" class="input-file" name="avatar" ref="avatarInput"
      @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
      <img :src="avatar?avatar:require('../assets/images/man.png')" alt="" >
    </div>
    <div class="text" @click="upload" v-if="file">确定上传</div>
  </div>
</template>
<script>
export default {
  name: 'upload',
   data(){
     return{
       avatar: '',
       file: '',
       showBg: false
     }
   },
   props: ["uploadType", "imgUrl"],
   created(){
     console.log(this.imgUrl)
     this.avatar = this.imgUrl
   },
   methods: {
     changeImage: function(e){
      let file = e.target.files[0];
      this.file = file
      console.log(this.file)
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
  .avatar {
    cursor: pointer;
    position: relative;
    .input-file {
      width: 85px;
      height: 104px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: 80px;
      height: 80px;
      background-color: #eaeaea;
    }
    .bg {
      width: 100%;
      height: 100%;
      line-height: 80px;
      color: #fff;
      background-color: rgba(0,0,0,0.3);
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;

    }
  }
</style>


