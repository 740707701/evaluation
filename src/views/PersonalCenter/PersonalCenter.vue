<template>
  <div class="personalcenter-page">
    <headerNav></headerNav>
    <div class="container">
      <div class="personal-info">
          <el-container class="content">
            <el-aside width="150px">
              <div class="aside-box">
                <div class="user-info">
                  <upload :uploadType="`person_head`" :imgWidth="`80px`" :imgHeight="`80px`" :radius="`40px`" :imgUrl="userInfo.avatar" @upload="getImgUrl"></upload>
                  <!-- <img class="avatar" :src="userInfo.avatar?userInfo.avatar: '../../assets/images/demo/04.jpg'" alt=""> -->
                  <div class="name">{{userInfo.userName?userInfo.userName: userInfo.userNum}}</div>
                  <div class="school">内蒙古财经民族大学
                    <div>2016级</div>
                  </div>
                  <div class="upload-btn" @click="upload">上传头像</div>
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
                  <li>
                    <span class="point" v-if="$route.name==`mybook`"></span>
                    <router-link to="/mybook">书籍库</router-link>
                  </li>
                  <!-- <li>
                    <span class="point" v-if="$route.name==`order`"></span>
                    <router-link to="/order">我的订单</router-link>
                  </li>
                  <li>
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
import headerNav from "../../components/HeaderNav";
import upload from "../../components/Upload"
export default {
  name: "personalcenter",
  data() {
    return {
      userInfo: {}
    }
  },
  created(){
    this.userInfo = this.$store.state.userInfo
  },
  methods: {
    getImgUrl: function(data){
      this.userInfo.avatar = data.rootPath + data.headPic;
    },
    upload: function(){
      this.$emit("changeImage")
    }
  },
  components: {
    headerNav,
    upload
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
          background-color: #fff;
          border-radius: 4px;
          padding: 15px 0;
          .avatar {
            width: 80px;
            height: 80px;
            margin-left: 25px;
            display: inline-block;
            img {
              border-radius: 40px;
              
            }
          }
          .name {
            font-size: 16px;
            text-align: center;
            font-weight: 500;
          }
          .school,.class {
            font-size: 12px;
            padding: 0 5px;
            line-height: 20px;
            color: @main-color-gray;
            text-align: center;
          }
          .upload-btn {
            width: 80px;
            height: 26px;
            line-height: 26px;
            border-radius: 4px;
            text-align: center;
            margin-left: 25px;
            margin-top: 5px;
            font-size: 12px;
            background-color: @main-color-blue;
            color: #fff;
            cursor: pointer;
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

