<template>
  <div class="avatar">
    <input type="file" class="input-file" name="avatar" ref="avatarInput"
    @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
    <img :src="avatar" alt="" >
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
      height: 85px;
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
  }
</style>


