<template>
  <div class="careerplan-page">
    <headerNav></headerNav>
    <div class="container">
      <el-row :gutter="20"></el-row>
        <el-col :span="4" class="left-content">
          <div class="title">
            <i class="iconfont icon-option"></i>规划选项
          </div>
          <div class="item-box">
            <div class="sub-title">专业技能</div>
            <div class="item-list">
              <el-checkbox-group 
                v-model="major_skills"
              >
                <el-checkbox v-for="skill in majorSkills" :label="skill.name" :key="skill.name" :checked="skill.checked">{{skill.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="item-box">
            <div class="sub-title">职业技能</div>
            <div class="item-list">
              <el-checkbox-group 
                v-model="occ_skills"
              >
                <el-checkbox v-for="skill in occSkills" :label="skill.name" :key="skill.name" :checked="skill.checked">{{skill.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="add-box">
            <div class="name">证书</div>
            <div class="add-icon">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="add-box">
            <div class="name">附加信息</div>
            <div class="add-icon">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right-content">
          <div class="top">
            <div class="title">大一上半学期计划</div>
            <div class="page-box">共6页</div>
          </div>
          <div class="right-container">
            <!-- 必修课 -->
            <!-- <div class="content one">
              <div class="title">
                <span>必修课</span>
              </div>
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
                    <textarea class="textarea" placeholder="仅限20字以内" maxlength="150"></textarea>
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
                    <div class="desc-text">巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦
                      巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦巴拉那两年贷款开始开发的结果公开部分国家的继父回家客户大部分控股是
                      巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦巴拉巴啦啦啦150</div>
                  </div>
                  <div class="item-del">
                    <i class="el-icon-delete"></i>
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
            </div> -->
            <!-- 专业大赛 -->
            <div class="content one">
              <div class="title">
                <span>专业大赛</span>
              </div>
              <div class="form">
                <div class="input-list">
                  <div class="input-box">
                    <div class="name">课程名称</div>
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
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
                    <textarea class="textarea" placeholder="仅限20字以内" maxlength="150"></textarea>
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
                    <div class="desc-text">巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦
                      巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦巴拉那两年贷款开始开发的结果公开部分国家的继父回家客户大部分控股是
                      巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦巴拉巴啦啦啦啦啦阿150</div>
                  </div>
                  <div class="item-del">
                    <i class="el-icon-delete"></i>
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
            <!-- 自学课 -->
            <!-- 选修课 -->
            <div class="content two"></div>
            <div class="content three"></div>
            <div class="pager">
              <i class="iconfont icon-arrow-right-line"></i>
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
      contents: ["111111111111", "2222222", "333333", "44444444"],
      occ_skills: [],
      major_skills: [],
      majorSkills: [
        {
          name: '必修课',
          checked: true
        },
        {
          name: '选修课',
          checked: false
        },
        {
          name: '自学课',
          checked: false
        },
        {
          name: '专业大赛',
          checked: true
        },
      ],
      occSkills: [
        {
          name: '办公技能',
          checked: true
        },
        {
          name: '职业能力',
          checked: false
        },
        {
          name: '实习计划',
          checked: false
        },
      ],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''

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
    box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
    .left-content,
    .right-content {
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
      .item-box {
        margin-bottom: 10px;
        .sub-title {
          font-size: 12px;
          color: @main-color-gray;
          line-height: 26px;
        }
        .item-list {
          line-height: 20px;
          .el-checkbox {
            margin-left: 0!important;
            margin-right: 10px!important;
          }
        }
      }
      .add-box {
        margin: 10px 0;
        .name {
          line-height: 30px;
          display: inline-block;
        }
        .add-icon {
          float: right;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 10px;
          background-color: #ddd;
          cursor: pointer;
          margin-top: 3px;
          i {
            color: #fff;
            font-size: 12px;
          }
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
        .page-box {
          float: right;
          line-height: 50px;
          padding-right: 20px;
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
          box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
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
          width: 100%;
          border-bottom: 1px solid @main-color-border;
          span {
            height: 20px;
            line-height: 20px;
            margin-top: 15px;
            padding-left: 10px;
            border-left: 2px solid @main-color-blue;
            display: inline-block;
          }
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
          box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
          .item {
            max-width: 25%;
            flex: 1 1 auto;
            border: 1px solid @main-color-border;
            border-radius: 4px;
            box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
            margin: 0 10px;
            padding: 0 10px 10px 10px;
            position: relative;
            .item-icon {
              text-align: right;
              line-height: 30px;
            }
            .item-title {
              height: 26px;
              .name {
                display: inline-block;
                line-height: 20px;
                font-weight: bold;
                font-size: 12px;
              }
              .score {
                float: right;
                font-size: 30px;
                color: RGBA(255, 116, 129, 1);
              }
            }
            .item-desc {
              color: @main-color-gray;
              font-size: 12px;
              .name {
                line-height: 20px;
              }
              .desc-text {
                line-height: 16px;
              }
            }
            .item-del {
              width: 26px;
              height: 26px;
              line-height: 26px;
              text-align: center;
              border-radius: 15px;
              background-color: RGBA(250, 169, 174, 1);
              color: #fff;
              cursor: pointer;
              display: none;
              position: absolute;
              bottom: 10px;
              right: 10px;
            }
          }
          .item:hover {
            .item-del {
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>

