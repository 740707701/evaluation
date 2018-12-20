<template>
  <div class="work-exper">
    <div id="work" class="grid-content info-box" v-if="!showWorkExperiencedEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-work"></i>
          <span>工作经验</span>
          <div class="add-job" @click="addWorkExper" v-if="workExperList.length">
            <i class="iconfont icon-add"></i>新增工作
          </div>
        </div>
        <div class="job-item" v-for="exper in workExperList" :key="exper.id">
          <div class="job-time">
            <span class="gray">{{exper.startTime.slice(0,7)}} ~ {{exper.endTime.slice(0,7)}}</span>
            <span>{{exper.companyName}}</span>
            <span>{{exper.position}}</span>
            <span class="icon-box">
              <span @click="editWorkExper(exper.id)">
                编辑&nbsp;<i class="iconfont icon-edit"></i>
              </span>
              <span @click="deleteWorkExper(exper.id)">
                删除&nbsp;<i class="iconfont icon-delete"></i>
              </span>
            </span>
          </div>
          <div class="job-type">
            <span><span class="gray">公司类型：</span>{{exper.industryName}}</span>
            <span><span class="gray">公司人数：</span>{{exper.companySizeName}}</span>
            <span><span class="gray">公司性质：</span>{{exper.companyNatureName}}</span>
            <span><span class="gray">所属部门：</span>{{exper.department}}</span>
          </div>
          <div class="job-desc">
            <div class="desc-text gray">工作描述：</div>
            <div class="desc-content">
              <ul class="desc-list">
                <li class="desc-item">{{exper.workDesc}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="imperfect" v-if="!showWorkExperiencedEdit&&!workExperList.length">
          <p class="perfect-text">完善工作经验，展现工作内容及能力，让HR更了解你！</p>
          <el-button size="small" class="perfect-btn" @click="addWorkExper">开始完善</el-button>
        </div>
      </div>
    </div>
    <div class="grid-content info-box edit-border" v-if="showWorkExperiencedEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-work"></i>
          <span>工作经验</span>
        </div>
        <div class="base-content">
          <div class="edit-content">
            <el-form :inline="true" :model="workExperInfo" :rules="rules" ref="workExperInfo" label-width="100px" class="form-box">
              <el-form-item label="开始时间：" prop="startTime" class="input-box">
                <el-date-picker size="small" :editable="false" :clearable="false" class="select-box"
                    v-model="workExperInfo.startTime"
                    type="month"
                    placeholder="选择日期"
                    value-format="yyyy-MM">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间：" prop="endTime" class="input-box">
                <el-date-picker size="small" :editable="false" :clearable="false" class="select-box"
                    v-model="workExperInfo.endTime"
                    type="month"
                    placeholder="选择日期"
                    value-format="yyyy-MM">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="公司：" prop="companyName" class="input-box">
                <el-input size="small" v-model="workExperInfo.companyName" placeholder="请输入公司" :maxlength="30" 
                @focus="inputFocus('workExperInfo','showCompanyMsg')" @blur="showCompanyMsg=false"></el-input>
                <div class="msg" v-if="showCompanyMsg">请确认为公司全称，或为知名商标（如“招商证券”）</div>
              </el-form-item>
              <el-form-item label="部门：" prop="department" class="input-box">
                <el-input size="small" v-model="workExperInfo.department" placeholder="请输入部门" :maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="职能：" prop="funList" class="input-box" >
                <!-- <el-select size="small" v-model="workExperInfo.fun" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in workExperData.funType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select> -->
                <el-cascader size="small" v-model="workExperInfo.funList" @change="changeFun"
                  :options="workExperData.funType"
                  :show-all-levels="false"
                  :props="cascaderProp"
                  ></el-cascader>
              </el-form-item>
              <el-form-item label="行业：" prop="industryList" class="input-box">
                <!-- <el-select size="small" v-model="workExperInfo.industryList" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in workExperData.industryType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select> -->
                  <el-cascader size="small" v-model="workExperInfo.industryList" @change="changeIndustry"
                  :options="workExperData.industryType"
                  :show-all-levels="false"
                  :props="cascaderProp"
                  ></el-cascader>
              </el-form-item>
              <el-form-item label="职位：" prop="position" class="input-box">
                <el-input size="small" v-model="workExperInfo.position" placeholder="所在职位" :maxlength="30" 
                @focus="inputFocus('workExperInfo','showPositionMsg')" @blur="showPositionMsg=false"></el-input>
                <div class="msg" v-if="showPositionMsg">请确认清晰罗列职位，且属实</div>
              </el-form-item>
              <el-form-item label="公司规模：" prop="companySize" class="input-box">
                <el-select size="small" v-model="workExperInfo.companySize" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in workExperData.companySize"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作类型：" prop="workType" class="input-box">
                <el-radio-group size="small" v-model="workExperInfo.workType">
                  <el-radio-button v-for="item in workExperData.workType" :key="item.id" :label="item.name"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="公司性质：" prop="companyNature" class="input-box">
                <el-select size="small" v-model="workExperInfo.companyNature" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in workExperData.companyNature"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作描述：" prop="workDesc" class="input-box desc-box">
                <div class="work-desc">
                  <el-input class="desc-input" type="textarea" v-model="workExperInfo.workDesc" :maxlength="200" placeholder="描述你的职责范围、工作任务以及取得成绩" 
                  @focus="inputFocus('workExperInfo','showWorkDescMsg')" @blur="showWorkDescMsg=false"></el-input>
                  <div class="msg" v-if="showWorkDescMsg">请确认按工作职责的条款，描述自己的工作职责范围、工作成果与经验。</div>
                </div>
              </el-form-item>
              <el-form-item size="small" class="edit-btn-box">
                <el-button class="save-btn" @click="saveWorkExper('workExperInfo')">保存</el-button>
                <el-button class="cancel-btn" @click="cancel('workExperInfo')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { compareDate } from '@/utils/index'
export default {
  name: "workExper",
  data() {
    return {
      showCompanyMsg: false,
      showPositionMsg: false,
      showWorkDescMsg: false,
      showWorkExperiencedEdit: false,
      cascaderProp: {
        label: "name",
        value: "code",
        children: 'childrens'
      },
      workExperInfo: {
        endTime: ''
      },
      currentExper: [],
      rules: {
        startTime: [
          {
            required: true,
            message: "请选择输入时间",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        companyName: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur"
          }
        ],
        department: [
          {
            required: true,
            message: "请输入所在部门",
            trigger: "blur"
          }
        ],
        funList: [
          {
            required: true,
            message: "请选择职能",
            trigger: "change"
          }
        ],
        industryList: [
          {
            required: true,
            message: "请选择行业",
            trigger: "change"
          }
        ],
        position: [
          {
            required: true,
            message: "请填写所在职位",
            trigger: "blur"
          }
        ],
        companySize: [
          {
            required: true,
            message: "请选择公司规模",
            trigger: "change"
          }
        ],
        workType: [
          {
            required: true,
            message: "请选择工作类型",
            trigger: "change"
          }
        ],
        companyNature: [
          {
            required: true,
            message: "请选择公司性质",
            trigger: "change"
          }
        ],
        workDesc: [
          {
            required: true,
            message: "请输入工作描述",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["workExperList", "workExperData", "baseParams"],
  methods: {
    compareDate(arg1, arg2) {
      return compareDate(arg1, arg2)
    },
    inputFocus(formName, msg) {
			this.$refs[formName].clearValidate()
			this[msg] = true
		},
    changeFun: function(e){
      this.workExperInfo.funList = e;
    },
    changeIndustry: function(e){
      this.workExperInfo.industryList = e;
    },
    addWorkExper: function() {
      if(!this.baseParams.resumeId){
        this.$message({
          type: "error",
          message: "请先完善简历基本信息！"
        })
        return
      }
      this.workExperInfo = {
        resumeId: this.baseParams.resumeId,
      };
      this.showWorkExperiencedEdit = true;
    },
    editWorkExper: function(id) {
      this.currentExper = this.workExperList.filter(function(item) {
        return item.id == id;
      });
      this.workExperInfo = this.currentExper[0];
      this.showWorkExperiencedEdit = true;
    },
    saveWorkExper: function(formName) {
      let startTime = this.workExperInfo.startTime
      let endTime = this.workExperInfo.endTime
      if(compareDate(startTime, endTime)) {
        this.workExperInfo.startTime = endTime
        this.workExperInfo.endTime = startTime
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_WORKEXPER", this.workExperInfo)
            .then(res => {
              this.$emit('saved', this.baseParams.resumeId);
              this.showWorkExperiencedEdit = false;
            })
            .catch(err => {
              if(err.data.msg){
                this.$message({
                type: "error",
                message: err.data.msg
              })
              }else{
                this.$message({
                  type: "error",
                  message: "保存失败"
                })
              }
            });
        } else {
          return false;
        }
      });
    },
    cancel: function(formName) {
      this.showWorkExperiencedEdit = false;
      this.$refs[formName].resetFields();
    },
    deleteWorkExper: function(id) {
      this.$confirm("是否确认删除？")
        .then(response => {
          this.$store
            .dispatch("DELETE_WORKEXPER", id)
            .then(res => {
              this.$emit('saved', this.baseParams.resumeId);
              console.log("删除成功", res);
            })
            .catch(err=> {
              if(err.data.msg){
                this.$message({
                type: "error",
                message: err.data.msg
              })
              }else{
                this.$message({
                  type: "error",
                  message: "删除失败"
                })
              }
            });
        })
        .catch(error => {
          console.log("取消了删除");
        });
    }
  }
};
</script>
<style lang="less" scope>
</style>

