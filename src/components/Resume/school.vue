<template>
  <div class="sshool-info">
    <div id="school" class="grid-content info-box" >
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
                <el-date-picker size="small" class="select-box"
                    v-model="honorInfo.honorTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="奖项：" prop="honorName" class="input-box">
                <el-input size="small" v-model="honorInfo.honorName" placeholder="请输入奖项"></el-input>
              </el-form-item>
              <el-form-item label="级别：" prop="honorTitle" class="input-box">
                <el-input size="small" v-model="honorInfo.honorTitle" placeholder="请输入级别"></el-input>
              </el-form-item>
              <el-form-item label="" prop="" class="input-box"></el-form-item>
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
          <span>校内职务</span>
        </div>
        <div class="base-content">
          <div class="edit-content">
            <el-form :inline="true" :model="workInfo" :rules="workRules" ref="workInfo" label-width="100px" class="form-box">
              <el-form-item label="开始时间：" prop="startTime" class="input-box">
                <el-date-picker size="small" class="select-box"
                    v-model="workInfo.startTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间：" prop="endTime" class="input-box">
                <el-date-picker size="small" class="select-box"
                    v-model="workInfo.endTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="职务：" prop="schoolWorkName" class="input-box">
                <el-input size="small" v-model="workInfo.schoolWorkName" placeholder="请输入职务"></el-input>
              </el-form-item>
              <el-form-item label="职务描述：" prop="schoolWorkDesc" class="input-box desc-box">
                <div class="work-desc">
                    <textarea v-model="workInfo.schoolWorkDesc" maxlength="300" class="textarea" name="" id="" placeholder="描述你的职责范围、工作任务以及取得成绩"></textarea>
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
              <div class="add-job" @click="addSchoolHonor">
                <i class="iconfont icon-add" ></i>新增荣誉
              </div>
            </div>
            <ul class="honor-list job-item">
              <li v-for="honor in schoolHonorList" :key="honor.id">
                <div class="job-time">
                  <span class="gray">{{honor.honorName.slice(0, 10)}}</span>
                  <span>{{honor.honorName}}</span>
                  <span>{{honor.honorTitle}}</span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit" @click="editSchoolHonor(honor.id)"></i>
                    <i class="iconfont icon-delete" @click="deleteSchoolHonor(honor.id)"></i>
                  </span>
                </div>
              </li>
            </ul>
            <div class="imperfect" v-if="!showSchoolHonorEdit&&!schoolHonorList">
              <p class="perfect-text">完善校内荣誉，展现学习能力，让HR更了解你！</p>
              <el-button size="small" class="perfect-btn" @click="showSchoolHonorEdit=true">开始完善</el-button>
            </div>
          </div>
          <div class="post" v-if="!showSchoolWorkEdit">
            <div class="school-type">
              <span>校内职务</span>
              <div class="add-job" @click="addSchoolWork">
                <i class="iconfont icon-add"></i>新增职务
              </div>
            </div>
            <ul class="post-list ">
              <li class="job-item" v-for="work in schoolWorkList" :key="work.id">
                <div class="job-time">
                  <span class="gray">{{work.startTime.slice(0, 10)}} - {{work.endTime.slice(0, 10)}}</span>
                  <span>{{work.schoolWorkName}}</span>
                  <span></span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit" @click="editSchoolWork(work.id)"></i>
                    <i class="iconfont icon-delete" @click="deleteSchoolWork(work.id)"></i>
                  </span>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">主修课程：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      {{work.schoolWorkDesc}}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <div class="imperfect" v-if="!showSchoolWorkEdit&&!schoolWorkList">
              <p class="perfect-text">完善校内职务，展现校园活动经验，让HR更了解你！</p>
              <el-button size="small" class="perfect-btn" @click="showSchoolWorkEdit=true">开始完善</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "school",
  data() {
    return {
      updator: "cc",
      creator: "cc",
      resumeId: "ad3db208de4e450b9c759b35af141410",
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
        honorName: [
          {
            required: true,
            message: "请确认荣誉名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "请确认该荣誉含金量高",
            trigger: "blur"
          }
        ],
        honorTitle: [
          {
            required: true,
            message: "请输入荣誉级别",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "请确认该荣誉含金量高",
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
          },
          {
            min: 2,
            max: 30,
            message: "请确认此职务对求职有帮助",
            trigger: "blur"
          }
        ],
        schoolWorkDesc: [
          {
            required: true,
            message: "请输入职务描述",
            trigger: "blur"
          },
          {
            min: 2,
            max: 100,
            message: "请确认此职务对求职有帮助",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["schoolHonorList", "schoolWorkList"],
  methods: {
    addSchoolHonor: function() {
      this.honorInfo = {
        updator: this.updator,
        creator: this.creator,
        resumeId: this.resumeId
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
              this.$emit("saved", this.base);
              this.showSchoolHonorEdit = false;
            })
            .catch(err => {
              console.log(err);
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
              this.$emit("saved", this.base);
              console.log("删除成功", response);
            })
            .catch(error => {
              console.log("删除失败", error);
            });
        })
        .catch(err => {
          console.log("取消了删除");
        });
    },

    addSchoolWork: function() {
      this.workInfo = {
        updator: this.updator,
        creator: this.creator,
        resumeId: this.resumeId
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_SCHOOLWORK", this.workInfo)
            .then(res => {
              this.$emit("saved", this.base);
              this.showSchoolWorkEdit = false;
            })
            .catch(err => {
              console.log(err);
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
        .then(res => {
          this.$store
          .dispatch("DELETE_SCHOOLWORK", id)
          .then(response => {
            this.$emit("saved");
            console.log("删除成功", response);
          });
        })
        .catch(err => {
          console.log("取消了删除");
        });
    }
  }
};
</script>
<style lang="less" scope>
</style>

