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
              <el-checkbox-group v-model="plan_options" @change="checkPlan">
                <el-checkbox v-for="(skill,index) in planOptions.slice(0,5)" :label="skill" :key="index">{{skill.title}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="item-box">
            <div class="sub-title">职业能力计划</div>
            <div class="item-list">
              <el-checkbox-group v-model="plan_options" @change="checkPlan">
                <el-checkbox v-for="(skill,index) in planOptions.slice(5,8)" :label="skill" :key="index">{{skill.title}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="add-box" v-for="(other,index) in planOptions.slice(8)" :key="index">
            <div class="name">{{other.title}}</div>
            <div class="add-icon" v-if="!hasCertificatePlan&&other.type=='certificates'" @click="addPlanOption(other)">
              <i class="el-icon-plus"></i>
            </div>
            <div class="add-icon" v-if="!hasAdditionPlan&&other.type=='additions'" @click="addPlanOption(other)">
              <i class="el-icon-plus"></i>
            </div>
            <div class="add-icon checked" v-if="hasCertificatePlan&&other.type=='certificates'" @click="deletePlanOption(other)">
              <i class="el-icon-minus"></i>
            </div>
            <div class="add-icon checked" v-if="hasAdditionPlan&&other.type=='additions'" @click="deletePlanOption(other)">
              <i class="el-icon-minus"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right-content">
          <div class="top">
            <div class="title">大一上半学期计划</div>
            <div class="page-box">共{{plan_options.length}}页</div>
            <div class="page-box">第{{planIndex+1}}页</div>
          </div>
          <div class="right-container">
            <!-- <el-carousel height="100%" :autoplay="false" arrow="always" indicator-position="none">
              <el-carousel-item v-for="(item,index) in plan_options" :key="index">
                <plan :plan="item" :planId="planId" @updateList="postPlan"></plan>
              </el-carousel-item>
            </el-carousel> -->
            <div class="plan-box">
              <div class="plan-item" v-for="(item,index) in plan_options" :key="index">
                <plan :plan="item" :planId="planId" @prev="prev" @next="next" :noPrev="noPrev" :noNext="noNext"></plan>
              </div>
            </div>
          </div>
        </el-col>
    </div>
  </div>
</template>
<script>
  import headerNav from "../../components/HeaderNav.vue";
  import plan from '../../components/Plan.vue';
  export default {
    name: "careerplan",
    data() {
      return {
        planId: '',
        planIndex: 0,
        allPlanList: [],
        plan_options: [],
        hasAdditionPlan: false,
        hasCertificatePlan: false,
        planOptions: [
          {
            type: "requireds",
            title: "必修课",
            listTitle: "课程计划",
            inputBox: [
              {
                name: '课程名称',
                placeholder: '请输入课程名称',
                selectValue: '',
                options:  [],
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
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "options",
            name: '选修课',
            title: "选修课程",
            listTitle: "选修课程计划",
            inputBox: [
              {
                name: '课程名称',
                placeholder: '请输入课程名称',
                selectValue: '',
                options:  [],
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
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "selfs",
            title: "自学课",
            listTitle: "自学课程计划",
            inputBox: [
              {
                name: '课程名称',
                placeholder: '请输入课程名称',
                selectValue: '',
                options:  [],
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
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "profs",
            title: "专业大赛",
            listTitle: "大赛计划",
            inputBox: [
              {
                name: '大赛名称',
                placeholder: '请输入课程名称',
                selectValue: '',
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '大赛目标',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
              {
                name: '参赛计划',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "pread",
            title: "专业阅读",
            listTitle: "阅读计划",
            inputBox: [
              {
                name: '书籍名称',
                placeholder: '请选择书籍名称',
                selectValue: '',
                options:  [],
              },
              {
                name: '书籍类型',
                placeholder: '请选择书籍类型',
                selectValue: '',
                options: []
              }
            ],
            textareaBox: [
              {
                name: '阅读计划',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "officeSkills",
            title: "办公技能",
            listTitle: "办公技能计划",
            inputBox: [
              {
                name: '技能名称',
                placeholder: '请选择技能名称',
                selectValue: '',
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "vocations",
            title: "职业能力",
            listTitle: "职业能力计划",
            inputBox: [
              {
                name: '职业技能名称',
                placeholder: '请选择职业技能名称',
                selectValue: '',
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "internships",
            title: '实习实践计划',
            listTitle: "实习实践计划",
            inputBox: [],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
              {
                name: '实习实践目标',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "certificates",
            title: "考证计划",
            listTitle: "证书计划",
            inputBox: [
              {
                name: '证书名称',
                placeholder: '请选择证书名称',
                note: '建议：大二上学期开始考虑',
                selectValue: '',
                options:  [
                  {
                    value: '选项1',
                    label: '黄金糕'
                  }, {
                    value: '选项2',
                    label: '双皮奶'
                  }
                ],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
          {
            type: "additions",
            title: "其他计划",
            listTitle: "其他计划",
            inputBox: [
              {
                name: '计划名称',
                placeholder: '请输入名称',
                selectValue: '',
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
        /*
          {
            type: "otherPlans",
            title: "其他计划",
            listTitle: "其他计划",
            inputBox: [
              {
                name: '计划名称',
                placeholder: '请选择证书名称',
                note: '建议：大二上学期开始考虑',
                selectValue: '',
                options:  [
                  {
                    value: '选项1',
                    label: '黄金糕'
                  }, {
                    value: '选项2',
                    label: '双皮奶'
                  }
                ],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在100个字以内)',
                maxlength: 100,
                value: ''
              },
            ]
          },
        */
        ],
        planItem: [],
        noNext: false,
        noPrev: true
      };
    },
    created() {
      this.planId = this.$route.query.planId;
      this.getPlanInfo()
      this.getMetaData()
    },
    mounted(){
      this.planItem = document.getElementsByClassName("plan-item");
      if(this.planItem.length == 1){
        this.noNext = true
        this.noPrev = true
      }
    },
    methods: {
      checkPlan: function(){
        console.log('plan_options',this.plan_options)
      },
      addPlanOption(plan){
        if(this.plan_options.length){
          this.plan_options.map(item => {
            if(item.type == plan.type){
              return
            }else {
              console.log(item.type)
              if(plan.type == "certificates"){
                if(!this.hasCertificatePlan){
                  this.plan_options.push(plan)
                  this.hasCertificatePlan = true
                }
              }else if(plan.type == "additions"){
                if(!this.hasAdditionPlan){
                  this.plan_options.push(plan)
                  this.hasAdditionPlan = true
                }
              }
            }
          })
        }else {
          if(plan.type == "certificates"){
            this.hasCertificatePlan = true
          }else if(plan.type == 'additions'){
            this.hasAdditionPlan = true;
          }
          this.plan_options.push(plan)
        }
        // console.log(this.plan_options)
      },
      deletePlanOption(plan){
        this.plan_options.map((item, index) => {
          if(item.type == plan.type){
            if(plan.type =="certificates"){
              this.hasCertificatePlan = false;
            }else if(plan.type == 'additions'){
              this.hasAdditionPlan = false;
            }
            this.plan_options.splice(index,1)
          }
        })
        console.log(this.plan_options)
      },
      getPlanInfo(){
        let params = {
          id: this.planId
        }
        this.$store.dispatch('PLANINFO', params).then(res => {
          this.allPlanList = res.data
          for(let plan in this.allPlanList){
            for(let i=0;i<this.planOptions.length;i++){
              if(this.allPlanList[plan].length&&plan == this.planOptions[i].type){
                this.planOptions[i][this.planOptions[i].type+`List`] = this.allPlanList[plan]
                this.plan_options.push(this.planOptions[i])
              }
            }
            this.plan_options.map(item => {
              if(item.type == "certificates"){
                this.hasCertificatePlan = true;
              }else if(item.type == "additions"){
                this.hasAdditionPlan = true;
              }
            })
          }
          this.planItem = document.getElementsByClassName("plan-item");
          console.log(this.planItem.length)
          if(this.planItem.length == 1){
            this.noNext = true
            this.noPrev = true
          }
        }).catch(err => {
          console.log(err)
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取规划信息失败！"
            });
          }
        })
      },
      getMetaData(){
        Promise.all([
          this.$store.dispatch("CERTIFICATE_DATA"), //证书列表
          this.$store.dispatch("CATEGORY_DATA"), //书籍分类
          this.$store.dispatch("BOOK_DATA"), //所有的书列表
          this.$store.dispatch("OFFICE_DATA"), //所有的办公技能列表
          this.$store.dispatch("VOCATION_DATA"), //所有职业能力列表
        ]).then(res => {
          this.planOptions.map(item => {
            if(item.type == 'certificates'){
              item.inputBox[0].options = res[0].data
            }else if(item.type == 'pread'){
              item.inputBox[0].options = res[2].data
              item.inputBox[1].options = res[1].data
            }else if(item.type == 'officeSkills'){
              item.inputBox[0].options = res[3].data
            }else if(item.type == 'vocations'){
              item.inputBox[0].options = res[4].data
            }
          })
        }).catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取字典数据失败！"
            });
          }
        })
      },
      prev(){
        if(this.planIndex == 0){
          console.log("没有上一页了")
          return
        }else {
          this.planIndex--
          if(this.planIndex == 0){
            this.noPrev = true
          }else {
            this.noNext = false
            this.noPrev = false
          }
        }
        this.changePlan()
      },
      next(){
        if(this.planIndex == this.planItem.length-1){
          console.log("没有下一页了")
          return
        }else {
          this.planIndex++
          if(this.planIndex == this.planItem.length-1){
            this.noNext = true
          }else {
            this.noNext = false
            this.noPrev = false
          }
        }
        this.changePlan()
      },
      changePlan(){
        for(let i = 0; i<this.planItem.length; i++){
          this.planItem[i].style.display = "none";
        }
        this.planItem[this.planIndex].style.display = "block"
      }
    },
    watch: {
      plan_options(val, oldVal){
        console.log(val, oldVal)
      }
    },
    components: {
      headerNav,
      plan
    }
  };
</script>
<style lang="less">
@import "../../assets/css/colors.less";
.careerplan-page {
  width: 100%;
  height: 100vh;
  display: inline-block;
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
    overflow: hidden;
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
        .checked {
          background-color: @main-color-blue!important;
          color: #ffff!important;
        }
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
          letter-spacing: 2px;
        }
      }
      .right-container {
        height: calc(100% - 50px);
        padding: 20px;
        position: relative;
        .plan-box {
          width: 100%;
          height: 100%;
          background-color: #fff;
          .plan-item {
            width: calc(100% - 40px);
            height: 100%;
            position: absolute;
            .disabled {
              cursor: no-drop;
              background-color: #ddd!important;
            }
          }
        }
        /*
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
        */
      }
    }
  }
}
</style>

