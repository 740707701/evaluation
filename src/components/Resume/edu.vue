<template>
  <div class="edu-info">
    <div id="education" class="grid-content info-box" v-if="!showEducationEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-edu"></i>
          <span>教育经历</span>
            <div class="add-job" @click="addEdu" v-if="eduList.length">
            <i class="iconfont icon-add"></i>新增教育
          </div>
        </div>
        <div class="job-item" v-for="edu in eduList" :key="edu.id">
          <div class="job-time">
            <span class="gray">{{edu.startTime.slice(0,10)}} - {{edu.endTime.slice(0,10)}}</span>
            <span>{{edu.schoolName}}</span>
            <span>{{edu.eduMajor}}（{{edu.degreeName}}）</span>
            <span class="icon-box">
              <i class="iconfont icon-edit" @click="editEdu(edu.id)"></i>
              <i class="iconfont icon-delete" @click="deleteEdu(edu.id)"></i>
            </span>
          </div>
          <div class="job-desc">
            <div class="desc-text gray">专业描述：</div>
            <div class="desc-content">
              <ul class="desc-list">
                <li class="desc-item">{{edu.majorDesc}}</li>
              </ul>
            </div>
          </div>
          <div class="job-desc">
            <div class="desc-text gray">主修课程：</div>
            <div class="desc-content">
              <ul class="desc-list">
                <li class="desc-item">{{edu.eduDesc}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="imperfect" v-if="!showEducationEdit&&!eduList.length">
          <p class="perfect-text">完善教育经历，展现专业能力，让HR更了解你！</p>
          <el-button size="small" class="perfect-btn" @click="addEdu">开始完善</el-button>
        </div>
      </div>
    </div>
    <div class="grid-content info-box edit-border" v-if="showEducationEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-edu"></i>
          <span>教育经历</span>
        </div>
        <div class="base-content">
          <div class="edit-content">
            <el-form :inline="true" :model="eduInfo" :rules="rules" ref="eduInfo" label-width="100px" class="form-box">
              <el-form-item label="开始时间：" prop="startTime" class="input-box">
                <el-date-picker size="small" class="select-box"
                    v-model="eduInfo.startTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间：" prop="endTime" class="input-box">
                <el-date-picker size="small" class="select-box"
                    v-model="eduInfo.endTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="学校：" prop="schoolName" class="input-box">
                <el-input size="small" v-model="eduInfo.schoolName" placeholder="请输入学校" :maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="学历/学位：" prop="degree" class="input-box">
                <el-select size="small" v-model="eduInfo.degree" placeholder="请选择" class="select-box">
                    <el-option 
                    v-for="item in eduData.degreeType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                    ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="专业：" prop="eduMajor" class="input-box">
                <el-input size="small" v-model="eduInfo.eduMajor" placeholder="请输入专业" :maxlength="30"></el-input>
                <!-- <el-select size="small" v-model="eduInfo.eduMajor" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in eduData.majorType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="学业性质：" prop="eduNature" class="input-box">
                <el-select size="small" v-model="eduInfo.eduNature" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in eduData.eduNatureType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="专业描述：" prop="eduDesc" class="input-box desc-box">
                <div class="work-desc">
                    <textarea v-model="eduInfo.majorDesc" :maxlength="300" class="textarea" name="" id="" placeholder="简单描述下所学专业"></textarea>
                  </div>
              </el-form-item>
              <el-form-item label="主修课程：" prop="eduDesc" class="input-box desc-box">
                <div class="work-desc">
                    <textarea v-model="eduInfo.eduDesc" :maxlength="300" class="textarea" name="" id="" placeholder="描述在校期间所学专业，主要包括课程内容，毕业设计等"></textarea>
                  </div>
              </el-form-item>
              <el-form-item size="small" class="edit-btn-box">
                <el-button class="save-btn" @click="saveEdu('eduInfo')">保存</el-button>
                <el-button class="cancel-btn" @click="cancel('eduInfo')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "edu",
  data() {
    return {
      showEducationEdit: false,
      eduInfo: {},
      currentEdu: [],
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
        schoolName: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 50,
            message: "请确认你的学校名称为该学校的全称",
            trigger: "blur"
          }
        ],
        degree: [
          {
            required: true,
            message: "请选择学历或学位",
            trigger: "change"
          }
        ],
        eduMajor: [
          {
            required: true,
            message: "请选择专业",
            trigger: "change"
          }
        ],
        eduNature: [
          {
            required: true,
            message: "请选择学业性质",
            trigger: "change"
          }
        ],
        eduDesc: [
          {
            required: true,
            message: "请填写主修课程",
            trigger: "blur"
          },
          {
            min: 2,
            max: 300,
            message: "请确认主修课程罗列与意向岗位的匹配度",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["eduList", "eduData", "baseParams"],
  methods: {
    addEdu: function() {
      if(!this.baseParams.resumeId){
        this.$message({
          type: "error",
          message: "请先完善简历基本信息！"
        })
        return
      }
      this.eduInfo = {
        resumeId: this.baseParams.resumeId
      };
      this.showEducationEdit = true;
    },
    editEdu: function(id) {
      this.currentEdu = this.eduList.filter(function(item) {
        return item.id == id;
      });
      this.eduInfo = this.currentEdu[0];
      this.showEducationEdit = true;
    },
    saveEdu: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_EDU", this.eduInfo)
            .then(resporesnse => {
              this.$emit('saved', this.baseParams.resumeId);
              this.showEducationEdit = false;
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
      this.showEducationEdit = false;
      this.$refs[formName].resetFields();
    },
    deleteEdu: function(id) {
      this.$confirm("是否确认删除？")
        .then(response => {
          this.$store
            .dispatch("DELETE_EDU", id)
            .then(res => {
              this.$emit('saved', this.baseParams.resumeId);
              console.log("删除成功", res);
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

