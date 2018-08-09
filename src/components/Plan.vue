<template>
    <div class="plan-content">
      <div class="title">
        <span>{{plan.title}}</span>
      </div>
      <div class="form">
        <div class="input-list">
          <div class="input-box" v-for="(item,index) in plan.inputBox" :key="item.name">
            <div class="name">{{item.name}}</div>
            <el-input size="small" v-if="!(item.options?item.options.length:item.options)" :placeholder="item.placeholder" v-model="input[index]"></el-input>
            <el-select size="small" v-if="item.options?item.options.length:item.options" v-model="input[index]" :placeholder="item.placeholder">
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="desc-box" v-for="(item, index) in plan.textareaBox" :key="item.name">
          <div class="name">{{item.name}}</div>
          <div class="desc">
            <textarea class="textarea" v-model="textarea[index]" :placeholder="item.placeholder" :maxlength="item.maxlength"></textarea>
          </div>
        </div>
        <div class="post-btn">
          <!-- <div class="pager-btn left-btn">
            <i class="iconfont icon-arrow-left-line"></i>
          </div> -->
          <el-button size="small" class="complete-btn btn" @click="post()">完成</el-button>
          <!-- <div class="pager-btn right-btn">
            <i class="iconfont icon-arrow-right-line"></i>
          </div> -->
        </div>
      </div>
      <ul class="item-list">
        <li class="item" v-if="plan.type=='requireds'" v-for="(item,index) in plan.requiredsList" :key="index">
          <div class="item-icon">
            <i class="el-icon-bell"></i>
          </div>
          <div class="item-title">
            <div class="name">{{item.courseName}}</div>
            <div class="score">{{item.score}}</div>
          </div>
          <div class="item-desc">
            <div class="name">描述</div>
            <div class="desc-text">{{item.goal}}</div>
          </div>
          <div class="item-del" @click="deletePlan(item.id)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
import api from '../api/index'
import config from '../api/config'
export default {
  name: 'plan',
  // props: ['title', 'inputBox', 'textareaBox', 'target', "type", "planList", "planId"],
  props: ["plan", "planId"],
  data(){
    return { 
      input:[],
      select: [],
      textarea: [],
      requiredsList: [],
      optionsList: [],
      selfsList: [],
      profsList: [],
      preadList: [],
      officeSkillsList: [],
      vocationsList: [],
      internshipsList: [],
      certificatesList: [],
      otherPlansList: [],
      additionsList: []
    }
  },
  created(){
  },
  methods: {
    post(){
      console.log(this.inputBox)
      if(this.plan.type == 'requireds'){
        let data = {
          courseName: this.input[0],
          score: this.input[1],
          goal: this.textarea[0],
          planId: this.planId
        }
        this.$store.dispatch('INSERT_REQUIRED', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "保存失败！"
            });
          }
        })
      }
      else if(this.plan.type == 'options'){
        let data = {
          courseName: this.input[0],
          score: this.input[1],
          goal: this.textarea[0],
          planId: this.planId
        }
        //选修课
        this.$store.dispatch('INSERT_OPTIONAL', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "保存失败！"
            });
          }
        })
      }
      else if(this.plan.type == 'selfs'){
        let data = {
          courseName: this.input[0],
          score: this.input[1],
          goal: this.textarea[0],
          planId: this.planId
        }
        //自学课
        this.$store.dispatch('INSERT_SELF', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "保存失败！"
            });
          }
        })
      }
      else if(this.plan.type == 'profs'){
        //专业大赛
      }
      else if(this.plan.type == 'pread'){
        //专业阅读
      }
      else if(this.plan.type == 'officeSkills'){
        //办公技能
      }
      else if(this.plan.type == 'vocations'){
        //职业能力
      }
      else if(this.plan.type == 'internships'){
        //实习实践
      }
      else if(this.plan.type == 'certificates'){
        //证书计划
      }
      else if(this.plan.type == 'otherPlans'){
        //其他计划
      }
      else if(this.plan.type == 'additions'){
        //附加计划
      }
    },
    getPlanList(){
      //additions,certificates,internships,officeSkills,
      //options,otherPlans,profs,pread,jread,selfs,required,vocations
      let data = {
        id: this.planId,
        data: this.plan.type
      }
      this.$store.dispatch('PLANINFO', data).then(res => {
        this.plan[this.plan.type+'List'] = res.data[this.plan.type];
        console.log(this.plan[this.plan.type+'List'])
      }).catch(err => {
        if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取计划列表失败！"
            });
          }
      })
    }
  },
}
</script>
<style lang="less" scope>
  @import "../assets/css/colors.less";
  .plan-content {
    width: 100%;
    // height: 100%;
    background-color: #fff;
    border-radius: 8px;
    // box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
    display: inline-block;
    .title {
      width: 100%;
      height: 50px;
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
          max-width: 33.33%;
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
        margin: 15px 0;
        .btn {
          width: 85px;
          height: 30px;
          box-shadow: 4px 0px 6px rgba(0, 0, 0, 0.15);
          border: none;
        }
        .pager-btn {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 20px;
          cursor: pointer;
          background-color: @main-color-blue;
          color: #fff;
        }
        .disabled {
          background-color: #303133 !important;
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
      // box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
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
</style>

