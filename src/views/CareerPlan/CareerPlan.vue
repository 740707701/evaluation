<template>
  <div class="careerplan-page">
    <headerNav></headerNav>
    <div class="container">
      <el-container>
        <el-aside width="205px">
          <div class="left-content">
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
          </div>
        </el-aside>
        <el-container>
          <div class="main">
            <div class="top">
              <div class="title" v-if="termStage == term.stage" v-for="term in termPlan" :key="term.stage">{{term.title}}</div>
              <div class="page-box">共{{plan_options.length}}页</div>
              <div class="page-box">第{{planIndex+1}}页</div>
            </div>
            <div class="right-container">
              <div class="plan-box">
                <div class="icon-bg" v-if="!plan_options.length">
                  <i class="iconfont icon-queshengyesvg"></i>
                  <div class="tips">请在左侧列表勾选所需要的规划计划</div>
                </div>
                <div class="plan-item" v-for="(item,index) in plan_options" :key="index">
                  <plan :plan="item" :planId="planId" @prev="prev" @next="next" :noPrev="noPrev" :noNext="noNext"></plan>
                </div>
              </div>
            </div>
          </div>
        </el-container>
      </el-container>
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
        planItemHeight: '',
        planId: '',
        termStage:'',
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
                maxlength: 30,
                options:  [],
              },
              {
                name: '计划分数',
                placeholder: '请输入计划分数',
                maxlength: 10,
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
                maxlength: 30,
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
                maxlength: 30,
                options:  [],
              },
              {
                name: '计划分数',
                placeholder: '请输入计划分数',
                maxlength: 10,
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
                maxlength: 30,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '大赛目标',
                placeholder: '限制在100个字以内',
                maxlength: 100,
                value: ''
              },
              {
                name: '参赛计划',
                placeholder: '限制在100个字以内',
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
                maxlength: 30,
                options:  [],
              },
              {
                name: '书籍类型',
                placeholder: '请选择书籍类型',
                maxlength: 30,
                options: []
              }
            ],
            textareaBox: [
              {
                name: '阅读计划',
                placeholder: '限制在100个字以内',
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
                maxlength: 30,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '限制在100个字以内',
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
                maxlength: 30,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '限制在100个字以内',
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
                placeholder: '限制在100个字以内',
                maxlength: 100,
                value: ''
              },
              {
                name: '实习实践目标',
                placeholder: '限制在100个字以内',
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
                maxlength: 30,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '限制在100个字以内',
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
                maxlength: 30,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '限制在100个字以内',
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
                maxlength: 30,
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
        termPlan: [
					{
						title: "大一上学期规划",
						stage: 1
					},
					{
						title: "大一下学期规划",
						stage: 2
					},
					{
						title: "大二上学期规划",
						stage: 3
					},
					{
						title: "大二下学期规划",
						stage: 4
					},
					{
						title: "大三上学期规划",
						stage: 5
					},
					{
						title: "大三下学期规划",
						stage: 6
					},
					{
						title: "大四上学期规划",
						stage: 7
					},
					{
						title: "大四下学期规划",
						stage: 8
					}
				],
        noNext: true,
        noPrev: true
      };
    },
    created() {
      this.planId = this.$route.query.planId;
      this.termStage = this.$route.query.termStage;
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
      checkPlan(){
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
        // console.log(this.plan_options)
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
          this.$nextTick(function(){
            this.planItem[0].style.display = "block";
          })
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
          // this.$store.dispatch("CATEGORY_DATA"), //书籍分类
          // this.$store.dispatch("BOOK_DATA"), //所有的书列表
          this.$store.dispatch("OFFICE_DATA"), //所有的办公技能列表
          this.$store.dispatch("VOCATION_DATA"), //所有职业能力列表
        ]).then(res => {
          this.planOptions.map(item => {
            if(item.type == 'certificates'){
              item.inputBox[0].options = res[0].data
            }
            // else if(item.type == 'pread'){
            //   item.inputBox[0].options = res[2].data
            //   item.inputBox[1].options = res[1].data
            // }
            else if(item.type == 'officeSkills'){
              item.inputBox[0].options = res[1].data
            }else if(item.type == 'vocations'){
              item.inputBox[0].options = res[2].data
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
            this.noNext = false
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
            this.noPrev = false
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
        if(val.length>=2){
          this.noNext = false
        }
        if(this.planIndex+1 >= oldVal.length && val.length<oldVal.length){
          this.planIndex = val.length - 1
        }
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
  min-height: 100%;
  background-color: @main-color-bg;
  padding-top: 60px;
  padding-bottom: 25px;
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    margin-top: 20px;
    box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
    .left-content {
      height: 100%;
      padding: 15px;
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
    .main {
      width: 100%;
      background-color: @main-color-bg;
      border-radius: 10px;
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
        padding: 20px;
        .plan-box {
          width: 100%;
          height: 100%;
          background-color: #fff;
          display: inline-block;
          overflow: hidden;
          .plan-item {
            width: 100%;
            height: 100%;
            display: none;
            // position: absolute;
            .disabled {
              cursor: no-drop;
              background-color: #ddd!important;
            }
          }
          .icon-bg {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -100px;
            .icon-queshengyesvg {
              font-size: 100px;
              color: rgb(221,224,231);
            }
            .tips {
              text-align: center;
              margin-top: 20px;
              color: #ddd;
            }
          }
        }
      }
      
    }
  }
}
</style>

