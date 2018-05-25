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
            <div class="sub-title">专业学习计划</div>
            <div class="item-list">
              <el-checkbox-group 
                v-model="major_skills"
              >
                <el-checkbox v-for="skill in majorSkills" :label="skill.name" :key="skill.name" :checked="skill.checked">{{skill.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="item-box">
            <div class="sub-title">职业能力计划</div>
            <div class="item-list">
              <el-checkbox-group v-model="occ_skills">
                <el-checkbox v-for="skill in occSkills" :label="skill.name" 
                :key="skill.name" :checked="skill.checked" @change="checkPlan">{{skill.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="add-box">
            <div class="name">练习实践计划</div>
            <div class="add-icon">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="add-box">
            <div class="name">考证计划</div>
            <div class="add-icon">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="add-box">
            <div class="name">其他计划</div>
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
            <div class="page-box">共{{planList.length}}页</div>
          </div>
          <div class="right-container">
            <div v-for="plan in planList" :key="plan.title">
              <plan :title="plan.title" :inputBox="plan.inputBox" :textareaBox="plan.textareaBox"
              :target="plan.target" :planList="plan.planList" @postPlan="postPlan"
              ></plan>
            </div>
          </div>
        </el-col>
    </div>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
import plan from '../components/Plan.vue';
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
         {
          name: '专业阅读',
          checked: false
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
     planList: [
       {
         title: '专业大赛',
         planContent: '我有一个计划吧啦吧啦吧啦吧啦啊啊啊、、、、',
         target: '我的目标是巴拉巴拉巴蓝思科技方式贷款购房打算把科技、、、、',
         inputBox: [
          {
            name: '大赛名称',
            placeholder: '请输入大赛名称',
            value: '第四届扶诚金融股票大赛即将开始'
          }
         ],
         textareaBox: [
           {
             name: '大赛目标',
             placeholder: '仅限30个字',
             maxlength: 30,
             value: ''
           },
            {
             name: '参赛计划',
             placeholder: '仅限30个字',
             maxlength: 30,
             value: ''
           },
         ],
         planList: [],
         post: function(){
           console.log(this.title)
         }
       },
       {
         title: '专业课程',
         planContent: '我有一个专业课程计划吧啦吧啦吧啦吧啦啊啊啊、、、、',
         target: '我的专业课程目标是巴拉巴拉巴蓝思科技方式贷款购房打算把科技、、、、',
         inputBox: [
          {
            name: '课程名称',
            placeholder: '请输入课程名称',
            selectValue: '',
            options:  [
              {
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
              }
            ],
          },
          {
            name: '计划分数',
            placeholder: '请输入计划分数',
            selectValue: '',
            options: []
          }
         ],
         textareaBox: [
           {
             name: '课程目标',
             placeholder: '仅限30个字',
             maxlength: 30,
             value: ''
           },
         ],
        planList: [],
        post: function(){
          console.log(this.title)
        }
       },
     ]

    };
  },
  created() {
    let params = {
      planId: '1',
      additionalName: '名字巴拉',
      additionalDesc: '描述巴拉'
    }
    this.$store.dispatch('ADDITIONAL_LIST', params).then(res => {
      console.log('res');
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    postPlan: function(data){
      console.log('adddata',data)
    },
    checkPlan: function(value){
      console.log(value)
    },
  },
  components: {
    headerNav,
    plan
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.careerplan-page {
  min-height: 100%;
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
          font-size: 10px;
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
        .add-icon:hover {
          color: #fff;
          background-color: @main-color-blue;
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
          letter-spacing: 2px;
        }
      }
      .right-container {
        height: calc(100% - 50px);
        padding: 20px;
        position: relative;
        .content {
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
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
                box-shadow:4px 0px 6px rgba(0,0,0,0.15);
                border: none;
              }
              .pager-btn {
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 20px;
                background-color: @main-color-blue;
                color: #fff;
              }
              .disabled {
                background-color: #303133!important;
              }
              .left-btn {
                float: left;
              }
              .right-btn {
                float: right;
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
}
</style>

