<template>
  <div class="careerplan-page">
    <headerNav></headerNav>
    <div class="container">
      <el-row :gutter="20"></el-row>
        <el-col :span="4" class="left-content">
          <div class="title">
            <i class="el-icon-bell"></i>规划选项
          </div>
        </el-col>
        <el-col :span="20" class="right-content">
          <div class="top">
            <div class="title">大一上半学期计划</div>
          </div>
          <div class="right-container">
            <div class="content one">
              <div class="title">必修课</div>
              <div class="form">
                <div class="input-list">
                  <div class="input-box">
                    <div class="name">课程名称</div>
                    <el-input size="small" placeholder="请输入课程名称"></el-input>
                  </div>
                  <div class="input-box">
                    <div class="name">完成时间</div>
                    <el-input size="small" placeholder="选择性填写"></el-input>
                  </div>
                  <div class="input-box">
                    <div class="name">目标分数</div>
                    <el-input size="small" placeholder="请输入分数"></el-input>
                  </div>
                </div>
                <div class="desc-box">
                  <div class="name">描述</div>
                  <div class="desc">
                    <textarea class="textarea" placeholder="仅限20字以内" maxlength="20"></textarea>
                  </div>
                </div>
                <div class="post-btn">
                  <el-button size="small" class="complete-btn btn">完成</el-button>
                  <el-button size="small" class="reset-btn btn">重置</el-button>
                </div>
              </div>
              <ul class="item-list">
                <li class="item">
                  <div class="item-icon">
                    <i class="el-icon-bell"></i>
                  </div>
                  <div class="item-title">
                    <div class="name">会计</div>
                    <div class="score">80</div>
                  </div>
                  <div class="item-desc">
                    <div class="name">描述</div>
                    <div class="desc-text">hjvfblnsdbnodaboi</div>
                  </div>
                </li>
               <li class="item">
                  <div class="item-icon">
                    <i class="el-icon-bell"></i>
                  </div>
                  <div class="item-title">
                    <div class="name">会计</div>
                    <div class="score">80</div>
                  </div>
                  <div class="item-desc">
                    <div class="name">描述</div>
                    <div class="desc-text">hjvfblnsdbnodaboi</div>
                  </div>
                </li>
                <li class="item">
                  <div class="item-icon">
                    <i class="el-icon-bell"></i>
                  </div>
                  <div class="item-title">
                    <div class="name">会计</div>
                    <div class="score">80</div>
                  </div>
                  <div class="item-desc">
                    <div class="name">描述</div>
                    <div class="desc-text">hjvfblnsdbnodaboi</div>
                  </div>
                </li>
                <li class="item">
                  <div class="item-icon">
                    <i class="el-icon-bell"></i>
                  </div>
                  <div class="item-title">
                    <div class="name">会计</div>
                    <div class="score">80</div>
                  </div>
                  <div class="item-desc">
                    <div class="name">描述</div>
                    <div class="desc-text">hjvfblnsdbnodaboi</div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content two"></div>
            <div class="content three"></div>
            <div class="pager">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </el-col>

    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
export default {
  name: "careerplan",
  data() {
    return {
      contents: ['111111111111','2222222','333333','44444444']
    };
  },
  methods: {},
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.careerplan-page {
  height: 100%;
  background-color: @main-color-bg;
  padding-top: 60px;
  padding-bottom: 25px;
  .container {
    width: 1200px;
    height: calc(100% - 20px);
    margin: 0 auto;
    margin-top: 20px;
    box-shadow:8px 0px 10px rgba(162,169,184,0.15);
    .left-content,.right-content {
      height: 100%;
    }
    .left-content {
      padding: 10px;
      background-color: #fff;
      border-right: 1px solid @main-color-border;
      border-radius: 8px 0 0 8px;
      .title {
        line-height: 30px;
        i {
          color: @main-color-blue;
          margin-right: 10px;
        }
      }
    }
    .right-content {
      .top {
        padding-left: 20px;
        height: 50px;
        background-color: #fff;
        .title {
          line-height: 50px;
          display: inline-block;
          border-bottom: 2px solid @main-color-blue;
        }
      }
      .right-container {
        height: calc(100% - 50px);
        padding: 20px;
        position: relative;
        .content {
          width: calc(100% - 40px);
          // height: calc(100% - 40px);
          background-color: #fff;
          border-radius: 8px;
          box-shadow:8px 0px 10px rgba(162,169,184,0.15);
          position: absolute;
        }
        .one {
          height: calc(100% - 40px);
          top: 20px;
          left: 20px;
          z-index: 10;
        }
        .two {
          height: calc(100% - 50px);
          left: 25px;
          top: 25px;
          z-index: 9;
        }
        .three {
          height: calc(100% - 60px);
          left: 30px;
          top: 30px;
          z-index: 8;
        }
        .pager {
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          text-align: center;
          color: #fff;
          background-color: @main-color-blue;
          cursor: pointer;
          position: absolute;
          bottom: 40px;
          right: 16px;
          z-index: 11;
        }
        .title {
          height: 50px;
          line-height: 50px;
          width: 100%;
          border-bottom: 1px solid @main-color-border;
          padding-left: 10px;
        }
        .form {
          padding: 10px;
          .input-list {
            display: flex;
            .input-box {
              flex: 1 1 auto;
              padding-right: 30px;
              .name {
                line-height: 30px;
                padding-left: 10px;
              }
            }
          }
          .desc-box {
            padding: 10px 0;
            .name {
              line-height: 30px;
              padding-left: 10px;
            }
            .textarea {
              width: calc(100% - 30px);
              min-height: 10px;
              border: 1px solid @main-color-border;
              border-radius: 8px;
              padding: 15px;
            }
          }
          .post-btn {
            padding: 10px;
            text-align: center;
            .btn {
              width: 85px;
              height: 30px;
            }
            .complete-btn {
              background-color: @main-color-blue;
              color: #fff;
              margin: 0 50px 0 -20px;
            }

          }
        }
        .item-list {
          width: 100%;
          display: flex;
          box-shadow: 8px 0px 10px rgba(162,169,184,0.15);
          .item {
            flex: 1 1 auto;
            border: 1px solid red;
            margin: 0 10px;
            .item-icon {
              text-align: right;
              line-height: 30px;
              i {
                padding-right: 10px;
              }
            }
            .item-title {
              .name {
                display: inline-block;
              }
              .score {
                display: inline-block;
                font-size: 30px;
                color: RGBA(255, 116, 129, 1);
              }
            }
            .desc {
              color: @main-color-gray;
              .name {
                padding-bottom: 10px;
              }
            }
          }
          
        }
      }
    }
  }
}
</style>

