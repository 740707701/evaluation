<template>
    <div class="plan-content">
      <div class="title">
        <span>{{plan.title}}</span>
      </div>
      <div class="form">
        <div class="suggest-box" v-if="plan.suggest">
          <div class="suggest-title">说明与建议</div>
          <div class="suggest-content" v-html="plan.suggest"></div>
        </div>
        <div class="input-list" v-if="plan.inputBox.length">
          <div class="input-box" v-for="(item,index) in plan.inputBox" :key="index" v-show="!item.containsOtherOptions">
            <div class="name">{{item.name}}</div>
            <el-input size="small" v-if="!(item.options?item.options.length:item.options)" :placeholder="item.placeholder" v-model="form.input[index]" :maxlength="item.maxlength"></el-input>
            <el-select size="small" v-if="item.options?item.options.length:item.options" v-model="form.input[index]" 
            :placeholder="item.placeholder" @change="selectChange($event,item)">
              <el-option
                v-for="item in item.options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="desc-box" v-for="(item, index) in plan.textareaBox" :key="index">
          <div class="name">{{item.name}}</div>
          <div class="desc">
            <textarea class="textarea" v-model="form.textarea[index]" :placeholder="item.placeholder" :maxlength="item.maxlength"></textarea>
          </div>
        </div>
        <div class="post-btn">
          <el-button size="small" class="complete-btn btn" @click="post()">保存</el-button>
          <el-button size="small" class="complete-btn btn" type="primary" v-if="noNext" @click="submit()">提交</el-button>
          <div class="pager-btn right-btn" @click="next" :class="noNext?'disabled':''">
            <i class="iconfont icon-arrow-right-line"></i>
          </div>
          <div class="pager-btn left-btn" @click="prev" :class="noPrev?'disabled':''">
            <i class="iconfont icon-arrow-left-line"></i>
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
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="show-more" v-if="item.goal.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
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
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="show-more" v-if="item.goal.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
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
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="show-more" v-if="item.goal.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
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
          <div class="item-desc item-goal">
            <div class="name">大赛目标：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="show-more" v-if="item.goal.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-desc">
            <div class="name">大赛计划：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.desc}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.desc}}</pre>
            </div>
            <div class="show-more" v-if="item.desc.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='pread'" v-for="(item,index) in preadList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-desc">
            <div class="name">图书阅读计划：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.name}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.name}}</pre>
            </div>
            <div class="show-more" v-if="item.name.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-desc">
            <div class="name">碎片化学习计划：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="show-more" v-if="item.content.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='officeSkills'" v-for="(item,index) in officeSkillsList" :key="index">
          <div class="item-icon">
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
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.desc}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.desc}}</pre>
            </div>
            <div class="show-more" v-if="item.desc.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
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
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.goal}}</pre>
            </div>
            <div class="show-more" v-if="item.goal.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='internships'" v-for="(item,index) in internshipsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="show-more" v-if="item.content.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
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
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="show-more" v-if="item.content.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
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
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.additionalDesc}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.additionalDesc}}</pre>
            </div>
            <div class="show-more" v-if="item.additionalDesc.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='thesiss'" v-for="(item,index) in thesissList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="show-more" v-if="item.content.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='lifes'" v-for="(item,index) in lifesList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="show-more" v-if="item.content.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='ships'" v-for="(item,index) in shipsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="show-more" v-if="item.content.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item" v-if="plan.type=='promotions'" v-for="(item,index) in promotionsList" :key="index">
          <div class="item-icon">
            <img src="../assets/images/plan-arrow-icon.png" alt="">
          </div>
          <div class="item-title">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="item-desc">
            <div class="name">计划内容：</div>
            <div class="desc-text" v-if="!item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="desc-all-text" v-if="item.showMore">
              <pre>{{item.content}}</pre>
            </div>
            <div class="show-more" v-if="item.content.length>30">
              <i class="iconfont icon-down" v-if="!item.showMore" @click="showMoreText(item)"></i>
              <i class="iconfont icon-up" v-if="item.showMore" @click="showMoreText(item)"></i>
            </div>
          </div>
          <div class="item-del" @click="deletePlan(item)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
      </ul>
      <el-dialog width="30%"
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <span>是否确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="confirmDeletePlan">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog width="30%"
        title="提示"
        :visible.sync="submitDialog"
        :before-close="handleClose">
        <span>请确认你的【专业学习计划】、【职业能力计划】、【考证计划】、【其他计划】均已填写完毕且均点击保存！</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="submitDialog = false">取 消</el-button>
          <el-button size="small" type="primary" @click="confirmSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import api from '../api/index'
import config from '../api/config'
export default {
  name: 'plan',
  props: ["plan", "planId", "termStage", "noNext", "noPrev"],
  data(){
    return { 
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      dialogVisible: false,
      submitDialog: false,
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
      additionsList: [],
      thesissList: [],
      lifesList: [],
      shipsList: [],
      promotionsList: []
    }
  },
  created(){},
  mounted(){
    this[this.plan.type+'List'] = this.plan[this.plan.type+'List']
  },
  methods: {
    selectChange(e) {
      if(e.indexOf('其他') !== -1) {
        this.plan.inputBox.map(i => {
          if(!i.name&&!i.options.length) {
            this.$set(i, 'containsOtherOptions', false)
          }
        })
      } else {
        this.plan.inputBox.map(i => {
          if(!i.name&&!i.options.length) {
            this.$set(i, 'containsOtherOptions', true)
          }
        })
      }
      // 根据下拉选项获取placeholder提示文字
      this.$store.dispatch('FIND_PLACEHOLDER', {name: e}).then(res => {
        this.$set(this.plan.textareaBox[0], 'placeholder', res.data.length ? res.data : this.plan.textareaBox[0].placeholder)
      })
    },
    showMoreText(item) {
      this.$set(item, 'showMore', !item.showMore)
    },
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
          return false;
        }else if(data.score === undefined){
          this.$message({type: "error", message:"请输入计划分数！"})
          return false;
        }else if(Number(data.score) != data.score || Number(data.score)>100 || Number(data.score)<0){
          this.$message({type: "error", message:"计划分数，请输入0~100范围内的数字！"})
          return false;
        }
        // else if(data.goal === undefined){
        //   this.$message({type: "error", message:"请输入课程目标！"})
        //   return false;
        // }
        this.$store.dispatch('INSERT_REQUIRED', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
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
          return false;
        }else if(data.score === undefined){
          this.$message({type: "error", message:"请输入计划分数！"})
          return false;
        }else if(Number(data.score) != data.score || Number(data.score)>100 || Number(data.score)<0){
          this.$message({type: "error", message:"计划分数，请输入0~100范围内的数字！"})
          return false;
        }
        // else if(data.goal === undefined){
        //   this.$message({type: "error", message:"请输入课程目标！"})
        //   return false;
        // }
        //选修课
        this.$store.dispatch('INSERT_OPTIONAL', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
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
          return false;
        }else if(data.score === undefined){
          this.$message({type: "error", message:"请输入计划分数！"})
          return false;
        }else if(Number(data.score) != data.score || Number(data.score)>100 || Number(data.score)<0){
          this.$message({type: "error", message:"计划分数，请输入0~100范围内的数字！"})
          return false;
        }
        // else if(data.goal === undefined){
        //   this.$message({type: "error", message:"请输入课程目标！"})
        //   return false;
        // }
        //自学课
        this.$store.dispatch('INSERT_SELF', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
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
          return false;
        }else if(data.goal === undefined){
          this.$message({type: "error", message:"请输入大赛目标！"})
          return false;
        }else if(data.desc === undefined){
          this.$message({type: "error", message:"请输入参赛计划！"})
          return false;
        }
        //专业大赛
        this.$store.dispatch('INSERT_PROF', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'pread'){
        let data = {
          name: this.form.textarea[0],
          content: this.form.textarea[1],
          // mode: 0,
          planId: this.planId
        }
         if(!data.name){
          this.$message({type: "error", message:"请输入图书阅读计划！"})
          return false;
        }else if(!data.content){
          this.$message({type: "error", message:"请输入碎片化学习计划！"})
          return false;
        }
        //专业阅读
        this.$store.dispatch('INSERT_PREAD', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'officeSkills'){
        let name = ''
        if(this.form.input.length&&this.form.input[0].indexOf('其他') != -1) {
          name = this.form.input[1]
        } else {
          name = this.form.input[0]
        }
        let data = {
          name: name,
          desc: this.form.textarea[0],
          planId: this.planId
        }
        if(!data.name){
          this.$message({type: "error", message:"请选择或输入技能名称！"})
          return false;
        }else if(data.desc === undefined){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        //办公技能
        this.$store.dispatch('INSERT_OFFICE', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'vocations'){
        let name = ''
        if(this.form.input.length&&this.form.input[0].indexOf('其他') != -1) {
          name = this.form.input[1]
        } else {
          name = this.form.input[0]
        }
        let data = {
          name: name,
          goal: this.form.textarea[0],
          planId: this.planId
        }
        if(!data.name){
          this.$message({type: "error", message:"请选择或输入职业软实力提升计划名称！"})
          return false;
        }else if(data.goal === undefined){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        //职业能力
        this.$store.dispatch('INSERT_VOCATION', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'internships'){
        let data = {
          name: this.form.input[0],
          content: this.form.textarea[0],
          planId: this.planId
        }
        if(!data.name){
          this.$message({type: "error", message:"请输入实践名称！"})
          return false;
        }else if(!data.content){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        //实习实践
        this.$store.dispatch('INSERT_INTERNSHIP', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'certificates'){
        let name = ''
        if(this.form.input.length&&this.form.input[0].indexOf('其他') != -1) {
          name = this.form.input[1]
        } else {
          name = this.form.input[0]
        }
        let data = {
          name: name,
          content: this.form.textarea[0],
          planId: this.planId
        }
        if(!data.name){
          this.$message({type: "error", message:"请选择或输入证书名称！"})
          return false;
        }else if(!data.content){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        //证书计划
        this.$store.dispatch('INSERT_CERTIFICATE', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'additions'){
        let name = ''
        if(this.form.input.length&&this.form.input[0].indexOf('其他') != -1) {
          name = this.form.input[1]
        } else {
          name = this.form.input[0]
        }
        let data = {
          additionalName: name,
          additionalDesc: this.form.textarea[0],
          planId: this.planId
        }
        if(data.additionalName === undefined){
          this.$message({type: "error", message:"请输入或选择计划名称！"})
          return false;
        }else if(data.additionalDesc === undefined){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        //其他计划
        this.$store.dispatch('INSERT_ADDITIONAL', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      // 添加专业论文
      else if(this.plan.type == 'thesiss') {
        let data = {
          content: this.form.textarea[0],
          planId: this.planId
        }
        if(!data.content){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        this.$store.dispatch('INSERT_PROFTHESIS', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'ships') {
        let data = {
          name: this.form.input[0],
          content: this.form.textarea[0],
          planId: this.planId
        }
        if(!data.name){
          this.$message({type: "error", message:"请选择人际关系与社交管理计划名称！"})
          return false;
        }
        if(!data.content){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        this.$store.dispatch('INSERT_INTERPERSONALRELATIONSHIP', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'lifes') {
        let name = ''
        if(this.form.input.length&&this.form.input[0].indexOf('其他') != -1) {
          name = this.form.input[1]
        } else {
          name = this.form.input[0]
        }
        let data = {
          name: name,
          content: this.form.textarea[0],
          planId: this.planId
        }
        if(!data.name){
          this.$message({type: "error", message:"请输入或选择生活管理计划名称！"})
          return false;
        }
        if(!data.content){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        this.$store.dispatch('INSERT_LIFEMANAGEMENT', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'promotions') {
        let name = ''
        if(this.form.input.length&&this.form.input[0].indexOf('其他') != -1) {
          name = this.form.input[1]
        } else {
          name = this.form.input[0]
        }
        let data = {
          name: name,
          content: this.form.textarea[0],
          planId: this.planId
        }
        if(!data.name){
          this.$message({type: "error", message:"请输入或选择计划名称！"})
          return false;
        }
        if(!data.content){
          this.$message({type: "error", message:"请输入计划内容！"})
          return false;
        }
        this.$store.dispatch('INSERT_BGPROMOTION', data).then(res => {
          this.getPlanList()
        }).catch(err => {
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('保存失败，请稍后重试！')
          }
        })
      }
    },
    submit() {
      this.submitDialog = true;
    },
    confirmSubmit() {
      let data = {
        id: this.planId
      }
      this.$store.dispatch('SUBMITPLAN', data).then(res => {
        this.submitDialog = false;
        this.$message({type: "success", message: "提交成功！"})
        this.$router.push({name: 'planList', query: {stage: this.termStage}})
      }).catch(err => {
        if (err.data.msg) {
          this.$message.error(err.data.msg)
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
      }).catch(err => {
        if (err.data.msg) {
          this.$message.error(err.data.msg)
        } else {
          this.$message.error('获取计划列表失败，请稍后重试！');
        }
      })
    },
    deletePlan(item){
      this.optionsInfo = item;
      this.dialogVisible = true;
    },
    confirmDeletePlan(){
      let data = {
        id: this.optionsInfo.id
      }
      if(this.plan.type == 'requireds'){
        this.$store.dispatch('DELETE_REQUIRED', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'options'){
        this.$store.dispatch('DELETE_OPTIONAL', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'selfs'){
        this.$store.dispatch('DELETE_SELF', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'profs'){
        //专业大赛
        this.$store.dispatch('DELETE_PROF', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'pread'){
        //专业阅读
        this.$store.dispatch('DELETE_PREAD', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'officeSkills'){
        //办公技能
        this.$store.dispatch('DELETE_OFFICE', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'vocations'){
        //职业能力
        this.$store.dispatch('DELETE_VOCATION', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'internships'){
        //实习实践
        this.$store.dispatch('DELETE_INTERNSHIP', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'certificates'){
        //证书计划
        this.$store.dispatch('DELETE_CERTIFICATE', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'additions'){
        //其他计划
        this.$store.dispatch('DELETE_ADDITIONAL', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'otherPlans'){
        //附加计划 已删除此选项
      }
      else if(this.plan.type == 'thesiss') {
        this.$store.dispatch('DELETE_PROFTHESIS', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'lifes') {
        this.$store.dispatch('DELETE_LIFEMANAGEMENT', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'ships') {
        this.$store.dispatch('DELETE_INTERPERSONALRELATIONSHIP', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
      }
      else if(this.plan.type == 'promotions') {
        this.$store.dispatch('DELETE_BGPROMOTION', data).then(res => {
          this.getPlanList();
          this.dialogVisible = false;
        }).catch(err =>{
          if (err.data.msg) {
            this.$message.error(err.data.msg)
          } else {
            this.$message.error('删除失败，请稍后重试！')
          }
        })
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
      // console.log('noNext', val)
    },
    noPrev(val, oldVal){
      // console.log('noPrev', val)
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
      .suggest-box {
        .suggest-title {
          font-size: 14px;
          line-height: 30px;
        }
        .suggest-content {
          color: #999;
          line-height: 22px;
        }
      }
      .input-list {
        display: flex;
        .input-box {
          flex: 1 1 auto;
          padding-right: 30px;
          max-width: 33.33%;
          .name {
            height: 30px;
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
          width: calc(100% - 30px)!important;
          min-height: 120px!important;
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
          float: right;
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
          margin-right: 20px;
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
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .item {
        width: 22%;
        min-height: 200px;
        border: 1px solid @main-color-border;
        border-radius: 4px;
        box-shadow: 8px 0px 10px rgba(32, 35, 41, 0.15);
        margin: 0 12px 20px 12px;
        padding: 10px 12px 12px 12px;
        display: inline-block;
        position: relative;
        .item-icon {
          text-align: right;
          line-height: 30px;
        }
        .item-title {
          line-height: 26px;
          .name {
            max-width: 145px;
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
        .item-goal {
          margin-bottom: 10px!important;
        }
        .item-desc {
          color: @main-color-gray;
          font-size: 12px;
          margin-bottom: 30px;
          .name {
            line-height: 20px;
            margin-bottom: 6px;
            color: #A2A9B8;
          }
          .desc-text, .desc-all-text {
            line-height: 16px;
            color: #B4BFD1;
          }
          .desc-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
          .show-more {
            width: 100%;
            text-align: center;
            margin-top: 5px;
            i {
              cursor: pointer;
            }
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

