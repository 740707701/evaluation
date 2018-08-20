<template>
    <div class="plan-content">
      <div class="title">
        <span>{{plan.title}}</span>
      </div>
      <div class="form">
        <div class="input-list">
          <div class="input-box" v-for="(item,index) in plan.inputBox" :key="item.name">
            <div class="name">{{item.name}}</div>
            <el-input size="small" v-if="!(item.options?item.options.length:item.options)" :placeholder="item.placeholder" v-model="form.input[index]"></el-input>
            <el-select size="small" v-if="item.options?item.options.length:item.options" v-model="form.input[index]" :placeholder="item.placeholder">
              <el-option
                v-for="item in item.options"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="desc-box" v-for="(item, index) in plan.textareaBox" :key="item.name">
          <div class="name">{{item.name}}</div>
          <div class="desc">
            <textarea class="textarea" v-model="form.textarea[index]" :placeholder="item.placeholder" :maxlength="item.maxlength"></textarea>
          </div>
        </div>
        <div class="post-btn">
          <div class="pager-btn left-btn" @click="prev" :class="noPrev?'disabled':''">
            <i class="iconfont icon-arrow-left-line"></i>
          </div>
          <el-button size="small" class="complete-btn btn" @click="post()">保存</el-button>
          <el-button size="small" class="complete-btn btn" type="primary" v-if="curPageIndex==planOptionsLen" @click="submit()">提交</el-button>
          <div class="pager-btn right-btn" @click="next" :class="curPageIndex==planOptionsLen?'disabled':''">
            <i class="iconfont icon-arrow-right-line"></i>
          </div>
        </div>
      </div>
      <div class="list-title">{{plan.listTitle}}</div>
      <ul class="item-list">
        <li class="item" v-if="plan.type=='requireds'" v-for="(item,index) in requiredsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.courseName}}</div>
            <div class="score">{{item.score}}<span>分</span></div>
          </div>
          <div class="item-desc">
            <div class="name">课程目标</div>
            <div class="desc-text">{{item.goal}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='options'" v-for="(item,index) in optionsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.courseName}}</div>
            <div class="score">{{item.score}}
              <span>分</span>
            </div>
          </div>
          <div class="item-desc">
            <div class="name">课程目标：</div>
            <div class="desc-text">{{item.goal}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='selfs'" v-for="(item,index) in selfsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.courseName}}</div>
            <div class="score">{{item.score}}
              <span>分</span>
            </div>
          </div>
          <div class="item-desc">
            <div class="name">课程目标：</div>
            <div class="desc-text">{{item.goal}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='profs'" v-for="(item,index) in profsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="item-desc">
            <div class="name">大赛目标：</div>
            <div class="desc-text">{{item.goal}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='pread'" v-for="(item,index) in preadList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="item-desc">
            <div class="name">阅读计划：</div>
            <div class="desc-text">{{item.content}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item office" v-if="plan.type=='officeSkills'" v-for="(item,index) in officeSkillsList" :key="index">
          <div class="item-icon">
            <!-- <img src="../assets/images/plan-arrow-icon.png" alt=""> -->
            <img v-if="item.name=='word能力'" src="../assets/images/word-arrow-icon.png" alt="">
            <img v-if="item.name=='ppt能力'" src="../assets/images/ppt-arrow-icon.png" alt="">
            <img v-if="item.name=='excel能力'" src="../assets/images/excel-arrow-icon.png" alt="">
            <img v-if="item.name=='xmind能力'" src="../assets/images/xmind-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
            <div class="icon-box">
              <img v-if="item.name=='word能力'" src="../assets/images/word-icon.png" alt="">
              <img v-if="item.name=='ppt能力'" src="../assets/images/ppt-icon.png" alt="">
              <img v-if="item.name=='excel能力'" src="../assets/images/excel-icon.png" alt="">
              <img v-if="item.name=='xmind能力'" src="../assets/images/xmind-icon.png" alt="">
            </div>
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text">{{item.desc}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='vocations'" v-for="(item,index) in vocationsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text">{{item.goal}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='internships'" v-for="(item,index) in internshipsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text">{{item.content}}</div>
          </div>
          <div class="item-desc">
            <div class="name">实习实践目标：</div>
            <div class="desc-text">{{item.score}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item certificates" v-if="plan.type=='certificates'" v-for="(item,index) in certificatesList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
            <i class="iconfont icon-skill"></i>
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text">{{item.content}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='additions'" v-for="(item,index) in additionsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.additionalName}}</div>
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text">{{item.additionalDesc}}</div>
          </div>
          <div class="item-del" @click="confirmDeletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
      </ul>
      <!-- <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <span>是否确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDeletePlan">确 定</el-button>
        </span>
      </el-dialog> -->
    </div>
</template>
<script>
import api from '../api/index'
import config from '../api/config'
export default {
  name: 'plan',
  props: ["plan", "planId", "noNext", "noPrev", "planOptionsLen", "curPageIndex"],
  data(){
    return { 
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      dialogVisible: false,
      planIndex: 0,
      form: {
        input: [],
        textarea: []
      },
      optionsInfo: {}, //当前选项信息
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
  created(){},
  mounted(){
    this[this.plan.type+'List'] = this.plan[this.plan.type+'List']
  },
  methods: {
    post(){
      if(this.plan.type == 'requireds'){
        let data = {
          courseName: this.form.input[0],
          score: this.form.input[1],
          goal: this.form.textarea[0],
          planId: this.planId
        }
        if(data.courseName == undefined){
          this.$message({type: "error", message:"请输入课程名称！"})
          return;
        }else if(data.score === undefined){
          this.$message({type: "error", message:"请输入计划分数！"})
          return;
        }else if(data.goal === undefined){
          this.$message({type: "error", message:"请输入课程目标！"})
          return;
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
          courseName: this.form.input[0],
          score: this.form.input[1],
          goal: this.form.textarea[0],
          planId: this.planId
        }
        if(data.courseName == undefined){
          this.$message({type: "error", message:"请输入课程名称！"})
          return;
        }else if(data.score === undefined){
          this.$message({type: "error", message:"请输入计划分数！"})
          return;
        }else if(data.goal === undefined){
          this.$message({type: "error", message:"请输入课程目标！"})
          return;
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
          courseName: this.form.input[0],
          score: this.form.input[1],
          goal: this.form.textarea[0],
          planId: this.planId
        }
        if(data.courseName == undefined){
          this.$message({type: "error", message:"请输入课程名称！"})
          return;
        }else if(data.score === undefined){
          this.$message({type: "error", message:"请输入计划分数！"})
          return;
        }else if(data.goal === undefined){
          this.$message({type: "error", message:"请输入课程目标！"})
          return;
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
        let data = {
          name: this.form.input[0],
          goal: this.form.textarea[0],
          desc: this.form.textarea[1],
          planId: this.planId
        }
        if(data.name == undefined){
          this.$message({type: "error", message:"请输入大赛名称！"})
          return;
        }else if(data.goal === undefined){
          this.$message({type: "error", message:"请输入大赛目标！"})
          return;
        }else if(data.desc === undefined){
          this.$message({type: "error", message:"请输入参赛计划！"})
          return;
        }
        //专业大赛
        this.$store.dispatch('INSERT_PROF', data).then(res => {
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
      else if(this.plan.type == 'pread'){
        let data = {
          name: this.form.input[0],
          type: this.form.input[1],
          content: this.form.textarea[0],
          mode: 0,
          planId: this.planId
        }
        if(data.name === undefined){
          this.$message({type: "error", message:"请选择书籍名称！"})
          return;
        }else if(data.type === undefined){
          this.$message({type: "error", message:"请选择书籍类型！"})
          return;
        }else if(data.content === undefined){
          this.$message({type: "error", message:"请输入阅读计划！"})
          return;
        }
        //专业阅读
        this.$store.dispatch('INSERT_PREAD', data).then(res => {
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
      else if(this.plan.type == 'officeSkills'){
        let data = {
          name: this.form.input[0],
          desc: this.form.textarea[0],
          planId: this.planId
        }
        if(data.name === undefined){
          this.$message({type: "error", message:"请选择技能名称！"})
          return;
        }else if(data.desc === undefined){
          this.$message({type: "error", message:"请输入计划内容！"})
          return;
        }
        //办公技能
        this.$store.dispatch('INSERT_OFFICE', data).then(res => {
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
      else if(this.plan.type == 'vocations'){
        let data = {
          name: this.form.input[0],
          goal: this.form.textarea[0],
          planId: this.planId
        }
        if(data.name === undefined){
          this.$message({type: "error", message:"请选择职业技能名称！"})
          return;
        }else if(data.goal === undefined){
          this.$message({type: "error", message:"请输入计划内容！"})
          return;
        }
        //职业能力
        this.$store.dispatch('INSERT_VOCATION', data).then(res => {
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
      else if(this.plan.type == 'internships'){
        let data = {
          content: this.form.textarea[0],
          score: this.form.textarea[1],
          planId: this.planId
        }
        if(data.content === undefined){
          this.$message({type: "error", message:"请输入计划内容！"})
          return;
        }else if(data.score === undefined){
          this.$message({type: "error", message:"请输入实习实践目标！"})
          return;
        }
        //实习实践
        this.$store.dispatch('INSERT_INTERNSHIP', data).then(res => {
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
      else if(this.plan.type == 'certificates'){
        let data = {
          name: this.form.input[0],
          content: this.form.textarea[0],
          planId: this.planId
        }
        if(data.name === undefined){
          this.$message({type: "error", message:"请选择证书名称！"})
          return;
        }else if(data.content === undefined){
          this.$message({type: "error", message:"请输入计划内容！"})
          return;
        }
        //证书计划
        this.$store.dispatch('INSERT_CERTIFICATE', data).then(res => {
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
      else if(this.plan.type == 'additions'){
        let data = {
          additionalName: this.form.input[0],
          additionalDesc: this.form.textarea[0],
          planId: this.planId
        }
        console.log(data)
        if(data.additionalName === undefined){
          this.$message({type: "error", message:"请输入计划名称！"})
          return;
        }else if(data.additionalDesc === undefined){
          this.$message({type: "error", message:"请输入计划内容！"})
          return;
        }
        //其他计划
        this.$store.dispatch('INSERT_ADDITIONAL', data).then(res => {
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
    },
    submit() {
      let data = {
        id: this.planId
      }
      this.$store.dispatch('SUBMITPLAN', data).then(res => {
        this.$message({
          type: "success",
          message: "提交成功！"
        })
        this.$router.push({
          name: 'planList'
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
            message: "保存失败！"
          });
        }
      })
    },
    getPlanList(){
      //additions,certificates,internships,officeSkills,
      //options,otherPlans,profs,pread,jread,selfs,required,vocations
      //清空表单数据
      this.form.input = []
      this.form.textarea = []
      let data = {
        id: this.planId,
        data: this.plan.type
      }
      this.$store.dispatch('PLANINFO', data).then(res => {
        this[this.plan.type+'List'] = res.data[this.plan.type];
        // console.log(this[this.plan.type+'List'])
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
    },
    deletePlan(item){
      this.optionsInfo = item;
      this.dialogVisible = true;
    },
    confirmDeletePlan(item){
      this.optionsInfo = item;
      let data = {
        id: this.optionsInfo.id
      }
      if(this.plan.type == 'requireds'){
        this.$store.dispatch('DELETE_REQUIRED', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'options'){
        this.$store.dispatch('DELETE_OPTIONAL', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'selfs'){
        this.$store.dispatch('DELETE_SELF', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'profs'){
        //专业大赛
        this.$store.dispatch('DELETE_PROF', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'pread'){
        //专业阅读
        this.$store.dispatch('DELETE_PREAD', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'officeSkills'){
        //办公技能
        this.$store.dispatch('DELETE_OFFICE', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'vocations'){
        //职业能力
        this.$store.dispatch('DELETE_VOCATION', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'internships'){
        //实习实践
        this.$store.dispatch('DELETE_INTERNSHIP', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'certificates'){
        //证书计划
        this.$store.dispatch('DELETE_CERTIFICATE', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'additions'){
        //其他计划
        this.$store.dispatch('DELETE_ADDITIONAL', data).then(res => {
          this.getPlanList()
        }).catch(err =>{
          console.log(err)
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
      else if(this.plan.type == 'otherPlans'){
        //附加计划
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    prev(){
      this.$emit("prev")
    },
    next(){
      this.$emit("next")
    },
  },
  watch: {
    noNext(val, oldVal){
      console.log('noNext', val, oldVal)
    },
    noPrev(val, oldVal){
      console.log('noPrev', val, oldVal)
    },
  }
}
</script>
<style lang="less" scope>
  @import "../assets/css/colors.less";
  .plan-content {
    width: 100%;
    height: 100%;
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
          min-height: 90px;
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
    .list-title {
      width: 100%;
      height: 22px;
      line-height: 22px;
      padding-left: 10px;
      margin-bottom: 15px;
      border-left: 2px solid @main-color-blue;
    }
    .item-list {
      width: 100%;
      display: inline-block;
      // display: flex;
      // box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
      .item {
        float: left;
        width: 22%;
        height: 200px;
        // flex: 1 1 auto;
        border: 1px solid @main-color-border;
        border-radius: 4px;
        box-shadow: 8px 0px 10px rgba(162, 169, 184, 0.15);
        margin: 0 10px 20px 10px;
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
          .icon-box {
            float: right;
            width: 22px;
            height: 22px;
          }
          .score {
            float: right;
            font-size: 30px;
            color: RGBA(255, 116, 129, 1);
            span {
              font-size: 14px;
            }
          }
        }
        .item-desc:last-child {
          margin-bottom: 0;
        }
        .item-desc {
          color: @main-color-gray;
          font-size: 12px;
          margin-bottom: 10px;
          .name {
            line-height: 20px;
            margin-bottom: 6px;
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
          background-color: @main-color-blue;
          color: #fff;
          cursor: pointer;
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
      .certificates {
        .icon-skill {
          float: right;
          color: @main-color-blue;
          font-size: 30px;
        }
      }
    }
  }
</style>

