<template>
  <div class="careerplan-page">
    <div class="container">
      <el-container>
        <el-aside width="235px">
          <div class="left-content">
            <div class="title">
              <i class="iconfont icon-option"></i>规划选项
            </div>
            <div class="item-box">
              <div class="sub-title">专业学习计划</div>
              <div class="item-list">
                <el-checkbox-group v-model="plan_options" @change="checkPlan">
                  <el-checkbox v-for="(skill,index) in planOptions.slice(0,7)" :label="skill" :key="index">{{skill.title}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="item-box">
              <div class="sub-title">职业能力计划</div>
              <div class="item-list">
                <el-checkbox-group v-model="plan_options" @change="checkPlan">
                  <el-checkbox v-for="(skill,index) in planOptions.slice(7,9)" :label="skill" :key="index">{{skill.title}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="add-box" v-for="(other,index) in planOptions.slice(9)" :key="index">
              <div class="name">{{other.title}}</div>
              <div class="add-icon" v-if="!other.checked" @click="addPlanOption(other)">
                <i class="el-icon-plus"></i>
              </div>
              <div class="add-icon checked" v-if="other.checked" @click="deletePlanOption(other)">
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
                  <plan :plan="item" :termStage="termStage" :planId="planId" @prev="prev" @next="next" :noPrev="noPrev" :noNext="noNext"></plan>
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
  import plan from '@/components/Plan.vue';
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
            title: "必修课程",
            listTitle: "课程计划",
            suggest: `课程目标包括计划从该课程中掌握的知识与技能，以及具体的量化目标，如：考勤拿满分，通过该门课程的学习掌握证券分析的基本方法，了解股票投资的操作方式，注册模拟交易账号，进行模拟操作……`,
            inputBox: [
              {
                name: '课程名称',
                placeholder: '请输入课程名称',
                maxlength: 50,
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
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "options",
            title: "选修课程",
            listTitle: "选修课程计划",
            suggest: `课程目标包括计划从该课程中掌握的知识与技能，以及具体的量化目标，如：考勤拿满分，通过该门课程的学习掌握证券分析的基本方法，了解股票投资的操作方式，注册模拟交易账号，进行模拟操作……`,
            inputBox: [
              {
                name: '课程名称',
                placeholder: '请输入课程名称',
                maxlength: 50,
                options: []
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
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "selfs",
            title: "辅修课程",
            listTitle: "辅修课程计划",
            suggest: `课程目标包括计划从该课程中掌握的知识与技能，以及具体的量化目标，如：考勤拿满分，通过该门课程的学习掌握证券分析的基本方法，了解股票投资的操作方式，注册模拟交易账号，进行模拟操作……`,
            inputBox: [
              {
                name: '课程名称',
                placeholder: '请输入课程名称',
                maxlength: 50,
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
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "profs",
            title: "专业大赛",
            listTitle: "大赛计划",
            suggest: `计划内容包括大赛的名称，大赛目标，参赛计划等内容，比如：<br>
                      大赛名称：股票投资模拟大赛<br>
                      参赛目标：获得10%以上的总收益率，争取进入大赛前50名<br>
                      参赛计划：通过大赛学习股票投资的方法，包括基本面选股，技术分析方法，养成复盘习惯……`,
            inputBox: [
              {
                name: '大赛名称',
                placeholder: '请输入大赛名称',
                maxlength: 50,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '大赛目标',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
              {
                name: '参赛计划',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "thesiss", // thesises
            title: "专业论文",
            listTitle: "专业论文计划",
            suggest: `计划内容包括专业论文的研究方向，计划投的刊物类别，比如：计划研究方向上市公司兼并与收购的财富效应，计划发表在国家一级刊物。`,
            inputBox: [],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              }
            ]
          },
          {
            type: "internships",
            title: '课外专业实践',
            listTitle: "课外专业实践计划",
            suggest: `课外专业实践包括在专业课程之外参加的各类实训实践等，如：<br>
                      实践名称：外汇模拟操作练习<br>
                      计划内容：掌握外汇操作的基本操作方法和分析方法，注册模拟账户，本学期进行不少于100次的买进卖出的操作练习`,
            inputBox: [{
              name: '实践名称',
              placeholder: '请输入实践名称',
              maxlength: 50,
              options:  [],
            }],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              }
            ]
          },
          {
            type: "pread",
            title: "专业阅读",
            listTitle: "专业阅读计划",
            suggest: `阅读计划可分为图书阅读计划，及碎片化学习阅读计划。如：<br>
                      图书阅读计划：<br>
                      1、完成书籍《为什么？》的阅读，395页图书，一学期3个月，每个月读130页，每周六下午/晚上读45页，并进行练习。<br>
                      2、完成曼昆著《宏观经济学》的阅读与学习，完成配套练习册的相关练习。<br>
                      碎片化学习计划：每天利用空余时间进行微信公众号虎嗅、金融投行笔记、债券圈的学习，完成至少五篇专业文章的阅读笔记……`,
            inputBox: [],
            textareaBox: [
              {
                name: '图书阅读计划',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
              {
                name: '碎片化学习计划',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "officeSkills",
            title: "办公技能提升",
            listTitle: "办公技能提升计划",
            suggest: `各类办公软件的学习和使用是否足够娴熟，娴熟，娴熟，应届生就业竞争的关键能力之一。（word、PPT、excel大学教得太基础，距离职场要求很远，提高与强化是必须，自学为主），建议全员必选一二或全部。思维导图将帮助思维更加逻辑化，提高沟通与自我管理、项目管理能力。`,
            inputBox: [
              {
                name: '技能名称',
                placeholder: '请选择技能名称',
                maxlength: 50,
                options:  [],
              },
              {
                name: '',
                containsOtherOptions: true,
                placeholder: '请输入其他技能名称',
                maxlength: 50,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "vocations",
            title: "职业软实力提升计划",
            listTitle: "职业软实力提升计划",
            suggest: `职业软实力是一个人的综合素质体现，也是求职面试时候的重头戏，这些部分的提高，除了潜移默化的作用，更重要的是主观上有针对性地进行学习和锻炼，提高方式包括相关书籍的阅读，以及通过具体的实习实践来自我锻炼提高。`,
            inputBox: [
              {
                name: '技能名称',
                placeholder: '请选择技能名称',
                maxlength: 50,
                options:  [],
              },
              {
                name: '',
                containsOtherOptions: true,
                placeholder: '请输入其他技能名称',
                maxlength: 50,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
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
                maxlength: 50,
                options:  [],
              },
              {
                name: '',
                containsOtherOptions: true,
                placeholder: '请输入其他证书名称',
                maxlength: 50,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "lifes",
            title: "生活管理计划",
            listTitle: "生活管理计划",
            inputBox: [
              {
                name: '',
                placeholder: '请选择生活管理计划名称',
                options:  [],
              },
              {
                name: '',
                containsOtherOptions: true,
                placeholder: '请输入其他计划',
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "promotions",
            title: "背景提升计划",
            listTitle: "背景提升计划计划",
            suggest: `背景提升计划，是拼学历之外的重要，重要，重要竞争要素。`,
            inputBox: [
              {
                name: '',
                placeholder: '请选择背景提升计划名称',
                options:  [],
              },
              {
                name: '',
                containsOtherOptions: true,
                placeholder: '请输入其他计划',
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
                value: ''
              },
            ]
          },
          {
            type: "ships",
            title: "人际关系与社交管理计划",
            listTitle: "人际关系与社交管理计划",
            suggest: `情商的重要性不亚于智商，更是未来人生发展的重要素养；大学期间应重点自我学习和成长。其中对人际关系、人性与人心、情感与婚姻等方面的探索、认知，是年轻人成长的必经之路，与懵懂前行相比，理性地探索、学习、实践，将帮助我们少走弯路、多一些收获，距离幸福可以更近一些。其中一个很重要的一点是很多人忽视的，即，爱，是一种能力。爱，更是一种可以习得的能力，即，通过学习，我们将拥有更强的爱的能力，也能通过学习让自己在爱的领域表现更优秀，拥有更大的个人魅力。同样，这些能力的习得，也可以通过阅读（可参考学点吧推荐书目），以及实践来获得。`,
            inputBox: [
              {
                name: '',
                placeholder: '请选择人际关系与社交管理计划名称',
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
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
                placeholder: '请选择名称',
                maxlength: 50,
                options:  [],
              },
              {
                name: '',
                containsOtherOptions: true,
                placeholder: '请输入其他计划',
                maxlength: 50,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
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
                maxlength: 50,
                options:  [],
              }
            ],
            textareaBox: [
              {
                name: '计划内容',
                placeholder: '自定义填写(限制在500个字以内)',
                maxlength: 500,
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
    updated(){
      this.planItem = document.getElementsByClassName("plan-item");
      if(this.planItem.length==1){
        this.planItem[0].style.display = "block";
      }
    },
    methods: {
      checkPlan(){
        // console.log('plan_options',this.plan_options)
      },
      addPlanOption(plan) {
        plan.checked = true
        this.plan_options.push(plan)
      },
      deletePlanOption(plan) {
        plan.checked = false
        this.plan_options.map((item, index) => {
          if(item.type == plan.type){
            this.plan_options.splice(index,1)
            //页码减1
            if(this.planIndex+1 >= this.plan_options.length){
              this.planIndex = this.plan_options.length - 1
            }
            this.changePlan()
          }
        })
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
              item.checked = true
            })
          }
         
          this.planItem = document.getElementsByClassName("plan-item");
          // console.log(this.planItem)
          this.$nextTick(function(){
            if(this.planItem.length){
              this.planItem[0].style.display = "block";
            }
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
          // this.$store.dispatch("CERTIFICATE_DATA"), //证书列表
          // this.$store.dispatch("CATEGORY_DATA"), //书籍分类
          // this.$store.dispatch("BOOK_DATA"), //所有的书列表
          // this.$store.dispatch("OFFICE_DATA"), //所有的办公技能列表
          // this.$store.dispatch("VOCATION_DATA"), //所有职业能力列表
          this.$store.dispatch("PLAN_DICT_DATA", {dictCode: 'Foundation_Certificate'}), // 所有证书列表
          this.$store.dispatch("PLAN_DICT_DATA", {dictCode: 'Office_Skills_Improvement_Program'}), // 所有办公技能
          this.$store.dispatch("PLAN_DICT_DATA", {dictCode: 'Career_Soft_Power_Promotion_Program'}), // 所有职业软实力提升计划 列表
          this.$store.dispatch("PLAN_DICT_DATA", {dictCode: 'Interpersonal_Communication_and_Communication'}), // 所有人际沟通与交往
          this.$store.dispatch("PLAN_DICT_DATA", {dictCode: 'Life_Management_Plan'}), // 生活管理计划 
          this.$store.dispatch("PLAN_DICT_DATA", {dictCode: 'Background_Promotion_Programs'}), // 所有背景提升计划 
          this.$store.dispatch("PLAN_DICT_DATA", {dictCode: 'Ot_plan'}), // 其他计划
        ]).then(res => {
          this.planOptions.map(item => {
            if(item.type == 'certificates'){
              item.inputBox[0].options = res[0].data.contents
            }
            else if(item.type == 'officeSkills'){
              item.inputBox[0].options = res[1].data.contents
            }
            else if(item.type == 'vocations'){
              item.inputBox[0].options = res[2].data.contents
            }
            else if(item.type == 'ships'){
              item.inputBox[0].options = res[3].data.contents
            }
            else if(item.type == 'lifes'){
              item.inputBox[0].options = res[4].data.contents
            }
            else if(item.type == 'promotions'){
              item.inputBox[0].options = res[5].data.contents
            }
            else if(item.type == 'additions'){
              item.inputBox[0].options = res[6].data.contents
            }
          })
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
        // console.log(val, oldVal)
        if(val.length>=2){
          this.noNext = false
        }
        if(this.planIndex+1 >= oldVal.length && val.length<oldVal.length){
          this.planIndex = oldVal.length - 2
          this.planItem = document.getElementsByClassName("plan-item");
          if(this.planItem.length){
            this.planItem[this.planItem.length-2].style.display = "block";
          }
        }
        if(val.length == 1 ){
          this.noNext = true;
          this.noPrev = true;
        }
        if(this.planIndex == val.length-1){
           this.noNext = true;
        }
      }
    },
    components: {
      plan
    }
  };
</script>
<style lang="less">
@import "../../assets/css/colors.less";
.careerplan-page {
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: @main-color-bg;
  padding-bottom: 25px;
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-top: 20px;
    box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
    .left-content {
      height: 100%;
      padding: 15px;
      background-color: #fff;
      border-right: 1px solid @main-color-border;
      border-radius: 8px 0 0 8px;
      .title {
        line-height: 30px;
        margin-bottom: 10px;
        i {
          color: @main-color-blue;
          margin-right: 10px;
          font-size: 10px;
        }
      }
      .item-box {
        margin-bottom: 10px;
        .sub-title {
          font-size: 16px;
          color: @main-color-gray;
          line-height: 30px;
          margin-bottom: 10px;
        }
        .item-list {
          line-height: 20px;
          .el-checkbox {
            min-width: 80px;
            margin-left: 0!important;
            margin-bottom:10px;
          }
          .el-checkbox:nth-child(odd) {
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
      min-height: 600px;
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
        height: calc(100% - 40px);
        .plan-box {
          width: 100%;
          height: 100%;
          background-color: #fff;
          display: inline-block;
          overflow: hidden;
          position: relative;
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
            margin-top: -75px;
            margin-left: -240px;
            text-align: center;
            .icon-queshengyesvg {
              font-size: 100px;
              color: rgb(221,224,231);
            }
            .tips {
              font-size: 30px;
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

