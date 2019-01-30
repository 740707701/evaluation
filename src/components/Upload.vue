<template>
  <div class="avatar" :style="`width:${imgWidth};height:${imgHeight}`">
    <div class="bg" :style="`line-height:${imgHeight}`">点击上传</div>
    <img :src="avatar" alt="" name="avatar">
    <input type="file" class="input-file" name="avatar" ref="avatarInput"
    @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
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
        option: {
          img: '',                         //裁剪图片的地址
          info: true,                      //裁剪框的大小信息
          outputSize: 1,                   // 裁剪生成图片的质量
          outputType: 'jpeg',              //裁剪生成图片的格式
          canScale: false,                 // 图片是否允许滚轮缩放
          autoCrop: true,                  // 是否默认生成截图框
          autoCropWidth: 150,              // 默认生成截图框宽度
          autoCropHeight: 150,             // 默认生成截图框高度
          fixed: false,                    //是否开启截图框宽高固定比例
          fixedNumber: [4, 4]              //截图框的宽高比例
        },
        isShowCropper: true,            //是否显示截图框
        fileUpload: null,
        fileinfo: {},
        form: {},
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
      if(file) {
        this.file = file
        // console.log(this.file)
        let reader = new FileReader()
        let that = this
        reader.readAsDataURL(file)
        reader.onload = function(e){
          // 这里的this 指向reader
          that.avatar = this.result
          that.option.img = this.result
          console.log('option', that.option)
        }
      }
    },
    upload: function(){
      let files = this.$refs.avatarInput.files
      let fileData = {}
      if(files instanceof Array) {
        fileData = files[0]
      } else {
        fileData = this.file
      }
      // console.log('fileData', typeof fileData, fileData)
      let data = new FormData()
      data.append('multfile', fileData)
      data.append('operaType', this.uploadType)
      this.$store.dispatch('UPLOAD_HEAD', data)
      .then(res => {
        this.file = '';
        let data = res.data.data;
        this.$emit("upload", data );
          this.$message.success('上传成功！')
      }).catch(err => {
        if(err.data){
          this.$message.error(err.data.msg)
        }else {
          this.$message.error('上传失败！')
        }
      })
    }
   }
}
</script>
<style lang="less" scope>
  @import "../assets/css/colors.less";
  .avatar {
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
    .vue-cropper-box {
      border: 1px solid red;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
</style>


