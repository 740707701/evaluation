<template>
  <div class="personalcenter-page">
    <headerNav></headerNav>
    <div class="container">
      <div class="personal-info">
          <el-container class="content">
            <el-aside width="230px">
              <div class="aside-box">
                <div class="user-info">
                  <div class="img-box">
                    <img class="avatar" :src="avatar" alt="">
                    <input type="file" class="img-input-file" name="avatar" ref="imgInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
                  </div>
                  <div class="name">{{userInfo.userName?userInfo.userName: userInfo.userNum}}</div>
                  <div class="school">{{userInfo.school}}
                    <div>{{userInfo.classes}}</div>
                  </div>
                  <div class="upload-box" v-show="!file">
                    <input type="file" class="input-file" name="avatar" ref="btnInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
                    <div class="upload-btn">上传头像</div>
                  </div>
                  <div class="upload-box" v-if="file">
                    <div class="upload-btn" @click="upload">确定上传</div>
                  </div>
                </div>
                <ul class="tabs">
                  <li>
                      <span class="point" v-if="$route.name==`myevaluation`"></span>
                      <router-link to="/personalcenter">我的测评</router-link>
                  </li>
                  <li>
                    <span class="point" v-if="$route.name==`myresume`"></span>
                    <router-link to="/myresume">我的简历</router-link>
                  </li>
                  <li>
                    <span class="point" v-if="$route.name==`news`"></span>
                    <!-- <el-badge class="badge" is-dot></el-badge> -->
                    <router-link to="/news">消息通知</router-link>
                  </li>
                  <li>
                    <span class="point" v-if="$route.name==`myplan`"></span>
                    <router-link to="/myplan">职业规划</router-link>
                  </li>
                  <!-- <li>
                    <span class="point" v-if="$route.name==`mybook`"></span>
                    <router-link to="/mybook">书籍库</router-link>
                  </li> -->
                  <li>
                    <span class="point" v-if="$route.name==`order`"></span>
                    <router-link to="/order">我的订单</router-link>
                  </li>
                  <!-- <li>
                    <span class="point" v-if="$route.name==`statistics`"></span>
                    <router-link to="/statistics">我的统计</router-link>
                  </li> -->
                  <li>
                    <span class="point" v-if="$route.name==`setting`"></span>
                    <router-link to="/setting">个人资料</router-link>
                  </li>
                </ul>
              </div>
            </el-aside>
            <el-container>
              <div class="main">
                <router-view></router-view>
              </div>
            </el-container>
          </el-container>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from "@/components/HeaderNav"
export default {
  name: "personalcenter",
  data() {
    return {
      userInfo: {},
      file: '',
      avatar: '',
      uploadType: "person-head"
    }
  },
  created(){
    this.userInfo = this.$store.state.userInfo
    this.avatar = this.userInfo.personHead
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
        reader.onload= function(e){
          that.avatar = this.result
        }
      }
    },
    upload: function(){
      let fileData = {}
      let imgInputFiles = this.$refs.imgInput.files
      let btnInputFiles = this.$refs.btnInput.files
      let files = imgInputFiles.length ? imgInputFiles : btnInputFiles
      if(files instanceof Array) {
        fileData = files[0]
      } else {
        fileData = this.file
      }
      let data = new FormData()
      data.append('multfile', fileData)
      data.append('operaType', this.uploadType)
      this.$store.dispatch('UPLOAD_HEAD', data)
      .then(res => {
        // console.log(res)
        this.file = '';
        let data = res.data.data;
        this.userInfo.personHead = data.headPic;
        this.$store.dispatch("UPDATE_HEADE", this.userInfo).then(res => {
          localStorage.setItem("userInfo", JSON.stringify(res.data.data))
          this.$store.state.userInfo = res.data.data
          this.$message({type: "success",message: "保存个人头像成功"})
        }).catch(err => {
          if(err.data.msg){
            this.$message({type: "error", message: err.data.msg})
          }else {
            this.$message({type: "error" ,message: "保存个人头像失败"})
          }
        })
        console.log(this.userInfo)
      }).catch(err => {
        console.log(err)
        if(err.data.msg){
          this.$message({type: "error", message: err.data.msg})
        }else {
          this.$message({type: "error", message: "上传失败！"})
        }
      })
    }
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.personalcenter-page {
  min-height: 100%;
  background-color: @main-color-bg;
  padding-top: 60px;  
  padding-bottom: 25px;
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-top: 10px;
    .personal-info {
      width: 100%;
      height: 100%;
      .content {
        height: calc(100% - 116px);
      }
      .aside-box {
        margin-right: 20px;
        .user-info {
          font-size: 14px;
          background-color: #fff;
          border-radius: 4px;
          padding: 15px 0;
          text-align: center;
          .img-box {
            position: relative;
            display: inline-block;
            border-radius: 40px;
            background-color: @main-color-imgbg;
            .img-input-file {
              width: 80px;
              height: 80px;
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0;
            }
          }
          .avatar {
            width: 80px;
            height: 80px;
            border-radius: 40px;
            display: inline-block;
          }
          .text {
            text-align: center;
            line-height: 30px;
            color: @main-color-blue;
            cursor: pointer;
          }
          .name {
            font-size: 16px;
            text-align: center;
            line-height: 22px;
          }
          .school,.class {
            font-size: 12px;
            padding: 0 5px;
            line-height: 20px;
            color: @main-color-gray;
            text-align: center;
          }
          .upload-box {
            position: relative;
            text-align: center;
            width: 80%;
            margin: 10px auto 0 auto;
            .input-file {
              width: 100%;
              height: 30px;
              cursor: pointer;
              opacity: 0;
              position: absolute;
              top: 0;
              left: 0;
            }
            .upload-btn {
              width: 100%;
              height: 30px;
              line-height: 30px;
              border-radius: 4px;
              text-align: center;
              font-size: 12px;
              background-color: @main-color-blue;
              display: inline-block;
              color: #fff;
              margin: 0 auto;
              cursor: pointer;
            }
          }
        }
        .tabs {
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          background-color: #fff;
          border-radius: 4px;
          display: inline-block;
          .router-link-active {
            color: @main-color-blue;
          }
          li {
            position: relative;
            width: 100%;
            height: 44px;
            .point {
              width: 8px;
              height: 8px;
              border-radius: 8px;
              background-color: @main-color-blue;
              display: inline-block;
              margin-right: 6px;
              position: absolute;
              top: 15px; 
              left: 0;
            }
            .badge {
              position: absolute;
              top: 8px;
              left: 72px;
            }
            a {
              width: 100%;
              line-height: 40px;
              padding-left: 20px;
              display: inline-block;
              color: @main-color-gray;
            }
          }
        }
      }
      .main {
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow:8px 0px 10px rgba(56,127,246,0.15) ;
        
      }
    }
  }
}
</style>

