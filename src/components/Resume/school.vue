<template>
  <div class="school-info">
    <div id="school" class="grid-content info-box">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-school"></i>
          <span>在校情况</span>
        </div>
        <div class="grid-content info-box edit-border" v-if="showSchoolHonorEdit">
          <div class="base-info">
            <div class="title">
              <i class="iconfont icon-school"></i>
              <span>校内荣誉</span>
            </div>
            <div class="base-content">
              <div class="edit-content">
                <el-form :inline="true" :model="honorInfo" :rules="honorRules" ref="honorInfo" label-width="100px" class="form-box">
                  <el-form-item label="时间：" prop="honorTime" class="input-box">
                    <el-date-picker size="small" :editable="false" :clearable="false" class="select-box"
                        v-model="honorInfo.honorTime"
                        type="month"
                        placeholder="选择日期"
                        value-format="yyyy-MM">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="奖项：" prop="honorPrize" class="input-box">
                    <el-input size="small" v-model="honorInfo.honorPrize" placeholder="请输入奖项" :maxlength="10" 
                    @focus="inputFocus('honorInfo','showHonorMsg')" @blur="showHonorMsg=false"></el-input>
                    <div class="msg" v-if="showHonorMsg">请确认该荣誉含金量高</div>
                  </el-form-item>
                  <el-form-item label="级别" prop="honorLevel" class="input-box">
                    <el-input size="small" v-model="honorInfo.honorLevel" placeholder="请输入级别" :maxlength="10"></el-input>
                  </el-form-item>
                  <el-form-item size="small" class="edit-btn-box">
                    <el-button class="save-btn" @click="saveSchoolHonor('honorInfo')">保存</el-button>
                    <el-button class="cancel" @click="cancelSchoolHonor('honorInfo')">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-content info-box edit-border" v-if="showSchoolWorkEdit">
          <div class="base-info">
            <div class="title">
              <i class="iconfont icon-school"></i>
              <span>校内实践</span>
            </div>
            <div class="base-content">
              <div class="edit-content">
                <el-form :inline="true" :model="workInfo" :rules="workRules" ref="workInfo" label-width="100px" class="form-box">
                  <el-form-item label="开始时间：" prop="startTime" class="input-box">
                    <el-date-picker size="small" :editable="false" :clearable="false" class="select-box"
                        v-model="workInfo.startTime"
                        type="month"
                        placeholder="选择日期"
                        value-format="yyyy-MM">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间：" prop="endTime" class="input-box">
                    <el-date-picker size="small" :editable="false" :clearable="false" class="select-box"
                        v-model="workInfo.endTime"
                        type="month"
                        placeholder="选择日期"
                        value-format="yyyy-MM">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="职务：" prop="schoolWorkName" class="input-box">
                    <el-input size="small" v-model="workInfo.schoolWorkName" placeholder="请输入职务" :maxlength="30" 
                    @focus="inputFocus('workInfo','showWorkMsg')" @blur="showWorkMsg=false"></el-input>
                    <div class="msg" v-if="showWorkMsg">请确认此职务对求职有帮助</div>
                  </el-form-item>
                  <el-form-item label="实践描述：" prop="schoolWorkDesc" class="input-box desc-box">
                    <div class="work-desc">
                      <el-input class="desc-input" type="textarea" v-model="workInfo.schoolWorkDesc" :maxlength="200" placeholder="描述你的职责范围、工作任务以及取得成绩"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item size="small" class="edit-btn-box">
                    <el-button class="save-btn" @click="saveSchoolWork('workInfo')">保存</el-button>
                    <el-button class="cancel" @click="cancelSchoolWork('workInfo')">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div class="schoolwork">
          <div class="honor" v-if="!showSchoolHonorEdit">
            <div class="school-type">
              <span>校内荣誉</span>
              <div class="add-job" @click="addSchoolHonor" v-if="schoolHonorList.length">
                <i class="iconfont icon-add" ></i>新增荣誉
              </div>
            </div>
            <ul class="honor-list job-item" v-if="schoolHonorList.length">
              <li v-for="honor in schoolHonorList" :key="honor.id">
                <div class="job-time">
                  <span class="honor-time gray">{{honor.honorTime.slice(0, 7)}}</span>
                  <span class="honor-prize">{{honor.honorPrize}}</span>
                  <span >{{honor.honorLevel}}</span>
                  <span class="icon-box">
                    <span @click="editSchoolHonor(honor.id)">
                      编辑&nbsp;<i class="iconfont icon-edit"></i>
                    </span>
                    <span @click="deleteSchoolHonor(honor.id)">
                      删除&nbsp;<i class="iconfont icon-delete"></i>
                    </span>
                  </span>
                </div>
              </li>
            </ul>
            <div class="imperfect" v-if="!showSchoolHonorEdit&&!schoolHonorList.length">
              <p class="perfect-text">完善校内荣誉，展现学习能力，让HR更了解你！</p>
              <el-button size="small" class="perfect-btn" @click="addSchoolHonor">开始完善</el-button>
            </div>
          </div>
          <div class="post" v-if="!showSchoolWorkEdit">
            <div class="school-type">
              <span>校内实践</span>
              <div class="add-job" @click="addSchoolWork" v-if="schoolWorkList.length">
                <i class="iconfont icon-add"></i>新增实践
              </div>
            </div>
            <ul class="post-list" v-if="schoolWorkList.length">
              <li class="job-item" v-for="work in schoolWorkList" :key="work.id">
                <div class="job-time">
                  <span class="gray">{{work.startTime.slice(0, 7)}} - {{work.endTime.slice(0, 7)}}</span>
                  <span>{{work.schoolWorkName}}</span>
                  <span></span>
                  <span class="icon-box">
                    <span @click="editSchoolWork(work.id)">
                      编辑&nbsp;<i class="iconfont icon-edit"></i>
                    </span>
                    <span @click="deleteSchoolWork(work.id)">
                      删除&nbsp;<i class="iconfont icon-delete"></i>
                    </span>
                  </span>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">实践描述：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li>
                        <pre>{{work.schoolWorkDesc}}</pre>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <div class="imperfect" v-if="!showSchoolWorkEdit&&!schoolWorkList.length">
              <p class="perfect-text">完善校内实践，展现校园活动经验，让HR更了解你！</p>
              <el-button size="small" class="perfect-btn" @click="addSchoolWork">开始完善</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { compareDate } from '@/utils/index' 
export default {
  name: "school",
  data() {
    return {
      showHonorMsg: false,
      showWorkMsg: false,
      showSchoolHonorEdit: false,
      showSchoolWorkEdit: false,
      honorInfo: {},
      currentHonor: [],
      workInfo: {},
      currentWork: [],
      honorRules: {
        honorTime: [
          {
            required: true,
            message: "请选择获得荣誉时间",
            trigger: "blur"
          }
        ],
        honorPrize: [
          {
            required: true,
            message: "请输入奖项名称",
            trigger: "blur"
          }
        ],
        honorLevel: [
          {
            required: true,
            message: "请输入奖项级别",
            trigger: "blur"
          }
        ]
      },
      workRules: {
        startTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "blur"
          }
        ],
        endTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "blur"
          }
        ],
        schoolWorkName: [
          {
            required: true,
            message: "请输入职务名称",
            trigger: "blur"
          }
        ],
        schoolWorkDesc: [
          {
            required: true,
            message: "请输入实践描述",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["schoolHonorList", "schoolWorkList", "baseParams"],
  methods: {
    compareDate(arg1, arg2) {
      return compareDate(arg1, arg2)
    },
    inputFocus(formName, msg) {
			this.$refs[formName].clearValidate()
			this[msg] = true
		},
    addSchoolHonor: function() {
      if (!this.baseParams.resumeId) {
        this.$message({
          type: "error",
          message: "请先完善简历基本信息！"
        });
        return;
      }
      this.honorInfo = {
        resumeId: this.baseParams.resumeId
      };
      this.showSchoolHonorEdit = true;
    },
    editSchoolHonor: function(id) {
      this.currentHonor = this.schoolHonorList.filter(function(item) {
        return item.id == id;
      });
      this.honorInfo = this.currentHonor[0];
      this.showSchoolHonorEdit = true;
    },
    saveSchoolHonor: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_SCHOOLHONOR", this.honorInfo)
            .then(res => {
              this.$emit("saved", this.baseParams.resumeId);
              this.showSchoolHonorEdit = false;
            })
            .catch(err => {
              if (err.data.msg) {
                this.$message({
                  type: "error",
                  message: err.data.msg
                });
              } else {
                this.$message({
                  type: "error",
                  message: "保存失败"
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    cancelSchoolHonor: function(formName) {
      this.showSchoolHonorEdit = false;
      this.$refs[formName].resetFields();
    },
    deleteSchoolHonor: function(id) {
      this.$confirm("是否确认删除？")
        .then(res => {
          this.$store
            .dispatch("DELETE_SCHOOLHONOR", id)
            .then(response => {
              this.$emit("saved", this.baseParams.resumeId);
              console.log("删除成功", response);
            })
            .catch(err => {
              if (err.data.msg) {
                this.$message({
                  type: "error",
                  message: err.data.msg
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            });
        })
        .catch(err => {
          console.log("取消了删除");
        });
    },

    addSchoolWork: function() {
      if (!this.baseParams.resumeId) {
        this.$message({
          type: "error",
          message: "请先完善个人基本信息！"
        });
        return;
      }
      this.workInfo = {
        resumeId: this.baseParams.resumeId
      };
      this.showSchoolWorkEdit = true;
    },
    editSchoolWork: function(id) {
      this.currentWork = this.schoolWorkList.filter(function(item) {
        return item.id == id;
      });
      this.workInfo = this.currentWork[0];
      this.showSchoolWorkEdit = true;
    },
    saveSchoolWork: function(formName) {
      let startTime = this.workInfo.startTime
      let endTime = this.workInfo.endTime
      if(compareDate(startTime, endTime)) {
        this.workInfo.startTime = endTime
        this.workInfo.endTime = startTime
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_SCHOOLWORK", this.workInfo)
            .then(res => {
              this.$emit("saved", this.baseParams.resumeId);
              this.showSchoolWorkEdit = false;
            })
            .catch(err => {
              if (err.data.msg) {
                this.$message({
                  type: "error",
                  message: err.data.msg
                });
              } else {
                this.$message({
                  type: "error",
                  message: "保存失败"
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    cancelSchoolWork: function(formName) {
      this.showSchoolWorkEdit = false;
      this.$refs[formName].resetFields();
    },
    deleteSchoolWork: function(id) {
      this.$confirm("是否确认删除？")
        .then(response => {
          this.$store
            .dispatch("DELETE_SCHOOLWORK", id)
            .then(res => {
              this.$emit("saved");
              console.log("删除成功", res);
            })
            .catch(err => {
              if (err.data.msg) {
                this.$message({
                  type: "error",
                  message: err.data.msg
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
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

