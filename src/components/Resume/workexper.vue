<template>
  <div class="work-exper">
    <div id="work" class="grid-content info-box" v-if="!showWorkExperiencedEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-work"></i>
          <span>工作经验</span>
          <div class="add-job" @click="addWorkExper">
            <i class="iconfont icon-add"></i>新增工作
          </div>
        </div>
        <div class="job-item item-first" v-for="exper in workExperList" :key="exper.id">
          <div class="job-time">
            <span class="gray">{{exper.startTime.slice(0,10)}} - {{exper.endTime.slice(0,10)}}</span>
            <span>{{exper.companyName}}</span>
            <span>{{exper.deparment}}</span>
            <span class="icon-box">
              <i class="iconfont icon-edit" @click="editWorkExper(exper.id)"></i>
              <i class="iconfont icon-delete" @click="deleteWorkExper(exper.id)"></i>
            </span>
          </div>
          <div class="job-type">
            <span><span class="gray">公司类型：</span>{{exper.industry}}</span>
            <span><span class="gray">公司人数：</span>{{exper.companySize}}人</span>
            <span><span class="gray">公司性质：</span>{{exper.companyNature}}</span>
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
          <el-button size="small" class="perfect-btn" @click="showWorkExperiencedEdit=true">开始完善</el-button>
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
                <el-date-picker size="small" class="select-box"
                    v-model="workExperInfo.startTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间：" prop="endTime" class="input-box">
                <el-date-picker size="small" class="select-box"
                    v-model="workExperInfo.endTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="公司：" prop="companyName" class="input-box">
                <el-input size="small" v-model="workExperInfo.companyName" placeholder="请输入公司" maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="部门：" prop="department" class="input-box">
                <el-input size="small" v-model="workExperInfo.department" placeholder="请输入部门" maxlenth="30"></el-input>
              </el-form-item>
              <el-form-item label="职能：" prop="fun" class="input-box">
                <el-select size="small" v-model="workExperInfo.fun" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in funType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="行业：" prop="industry" class="input-box">
                <el-select size="small" v-model="workExperInfo.industry" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in industryType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="职位：" prop="position" class="input-box">
                <el-input size="small" v-model="workExperInfo.position" placeholder="所在职位" maxlenth="30"></el-input>
              </el-form-item>
              <el-form-item label="公司规模：" prop="companySize" class="input-box">
                <el-select size="small" v-model="workExperInfo.companySize" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in companySize"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作类型：" prop="workType" class="input-box">
                <el-radio-group size="small" v-model="workExperInfo.workType">
                  <el-radio-button label="全职"></el-radio-button>
                  <el-radio-button label="兼职"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="公司性质：" prop="companyNature" class="input-box">
                <el-select size="small" v-model="workExperInfo.companyNature" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in companyNature"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作描述：" prop="workDesc" class="input-box desc-box">
                <div class="work-desc">
                    <textarea v-model="workExperInfo.workDesc" maxlength="300" class="textarea" name="" id="" placeholder="描述你的职责范围、工作任务以及取得成绩"></textarea>
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
import metadata from "../../api/metadata";
export default {
  name: "workExper",
  data() {
    return {
      updator: "cc",
      creator: "cc",
      resumeId: "ad3db208de4e450b9c759b35af141410",
      showWorkExperiencedEdit: false,
      funType: metadata.funType,
      industryType: metadata.industryType,
      companySize: metadata.companySize,
      companyNature: metadata.companyNature,

      workExperInfo: {},
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
          },
          {
            min: 2,
            max: 30,
            message: "请确认为公司全称，或为知名商标（如“招商证券”）",
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
        fun: [
          {
            required: true,
            message: "请选择职能",
            trigger: "change"
          }
        ],
        industry: [
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
          },
          {
            min: 2,
            max: 30,
            message: "请确认你的期望职位符合你的工作年限及实习经历",
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
          },
          {
            min: 2,
            max: 300,
            message:
              "请确认整个工作经验、实习经验描述部分，整体段落排版清楚，表达逻辑清晰、重点突出，张弛有度。",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["workExperList"],
  methods: {
    addWorkExper: function() {
      this.workExperInfo = {
        updator: this.updator,
        creator: this.creator,
        resumeId: this.resumeId
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_WORKEXPER", this.workExperInfo)
            .then(res => {
              this.$emit('saved');
              this.showWorkExperiencedEdit = false;
            })
            .catch(err => {
              console.log(err);
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
        .then(res => {
          this.$store
            .dispatch("DELETE_WORKEXPER", id)
            .then(response => {
              this.$emit('saved');
              console.log("删除成功", response);
            })
            .catch(error => {
              console.log("删除失败", error);
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

