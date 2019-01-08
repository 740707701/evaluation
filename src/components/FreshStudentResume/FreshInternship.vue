<template>
  <div class="school-info internship-info">
    <div id="internship" class="grid-content info-box" v-if="!showSchoolWorkEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-work"></i>
          <span>实习实践</span>
					<div class="add-job" @click="addSchoolWork" v-if="internshipList.length">
						<i class="iconfont icon-add"></i>新增实习实践
					</div>
        </div>
				<div class="post" v-if="!showSchoolWorkEdit">
					<ul class="post-list" v-if="internshipList.length">
						<li class="job-item" v-for="work in internshipList" :key="work.id">
							<div class="job-time">
								<span class="gray">{{work.startTime.slice(0, 7)}} - {{work.endTime.slice(0, 7)}}</span>
								<span>{{work.companyName}}</span>
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
							<div class="job-desc" v-if="work.schoolWorkDesc">
								<div class="desc-text gray">实践内容：</div>
								<div class="desc-content">
									<ul class="desc-list">
                    <li>
                      <pre>{{work.schoolWorkDesc}}</pre>
                    </li>
									</ul>
								</div>
							</div>
							<div class="job-desc" v-if="work.workResult">
								<div class="desc-text gray">实践成果：</div>
								<div class="desc-content">
									<ul class="desc-list">
										<li>
                      <pre>{{work.workResult}}</pre>
                    </li>
									</ul>
								</div>
							</div>
							<div class="job-desc" v-if="work.growHarvest">
								<div class="desc-text gray">成长收获：</div>
								<div class="desc-content">
									<ul class="desc-list">
										<li>
                      <pre>{{work.growHarvest}}</pre>
                    </li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
					<div class="imperfect" v-if="!showSchoolWorkEdit&&!internshipList.length">
						<p class="perfect-text">完善实习实践，让HR更了解你！</p>
						<el-button size="small" class="perfect-btn" @click="addSchoolWork">开始完善</el-button>
					</div>
				</div>
      </div>
    </div>
		<div class="grid-content info-box edit-border" v-if="showSchoolWorkEdit">
			<div class="base-info">
				<div class="title">
					<i class="iconfont icon-work"></i>
					<span>实习实践</span>
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
							<el-form-item label="实习公司名称/活动名称：" prop="companyName" class="input-box long">
								<el-input size="small" v-model="workInfo.companyName" placeholder="请输入公司/活动名称" :maxlength="30"
								@focus="inputFocus('workInfo','showCompanyNameMsg')" @blur="showCompanyNameMsg=false"></el-input>
								<div class="msg" v-if="showCompanyNameMsg">请确认此公司或活动真实可靠</div>
							</el-form-item>
							<el-form-item label="岗位：" prop="schoolWorkName" class="input-box">
								<el-input size="small" v-model="workInfo.schoolWorkName" placeholder="请输入岗位" :maxlength="30"
								@focus="inputFocus('workInfo','showWorkNameMsg')" @blur="showWorkNameMsg=false"></el-input>
								<div class="msg" v-if="showWorkNameMsg">请确认此岗位对求职有帮助</div>
							</el-form-item>
							<el-form-item label="实践内容：" prop="schoolWorkDesc" class="input-box desc-box">
								<div class="work-desc">
									<el-input class="desc-input" type="textarea" v-model="workInfo.schoolWorkDesc" :maxlength="200" 
									placeholder="注意：实习经验的描述与目标岗位的招聘要求尽量匹配，用词精准，注意不要大段大段文字呈现，要写成一条一条的，用“1、2、3、”来进行标示。例如：1、进行市场调研，在潜客聚集地进行线下传单的发放；2、潜客信息的收集与汇总，并进行数据分析。"></el-input>
								</div>
							</el-form-item>
							<el-form-item label="实践成果：" prop="workResult" class="input-box desc-box">
								<div class="work-desc">
									<el-input class="desc-input" type="textarea" v-model="workInfo.workResult" :maxlength="200" 
									placeholder="注意：实习成果尽量以数据来呈现，突出个人成果以及做出的贡献。例如：单日发放传单600张，收集有效信息100个，部门绩效排名3/60。"></el-input>
								</div>
							</el-form-item>
							<el-form-item label="成长收获：" prop="growHarvest" class="input-box desc-box">
								<div class="work-desc">
									<el-input class="desc-input" type="textarea" v-model="workInfo.growHarvest" :maxlength="200" 
									placeholder="注意：根据实习实践具体内容，进行某能力提升的说明。例如：通过本次实习，使我的沟通表达能力和统计分析能力得到了提升。"></el-input>
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
  </div>
</template>
<script>
import { compareDate } from '@/utils/index' 
export default {
  name: "freshInternship",
  data() {
    return {
      showWorkNameMsg: false,
      showCompanyNameMsg: false,
      showSchoolWorkEdit: false,
      workInfo: {},
      currentWork: [],
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
        companyName: [
          {
            required: true,
            message: "请输入公司/活动名称",
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
            message: "请输入实践内容",
            trigger: "blur"
          }
        ],
        workResult: [
          {
            message: "请输入实践成果",
            trigger: "blur"
          }
        ],
        growHarvest: [
          {
            message: "请输入成长收获",
            trigger: "blur"
          }
        ],
      }
    };
  },
  props: ["internshipList", "baseParams"],
  methods: {
    compareDate(arg1, arg2) {
      return compareDate(arg1, arg2)
    },
    inputFocus(formName, msg) {
			this.$refs[formName].clearValidate()
			this[msg] = true
		},
    addSchoolWork: function() {
      this.$emit('changeTag', 4)
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
      this.$emit('changeTag', 4)
      this.currentWork = this.internshipList.filter(function(item) {
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
<style lang="less" scoped>
.internship-info {
	.desc-input {
    min-height: 100px!important;
    & /deep/ .el-textarea__inner {
      min-height: 100px!important
    }
	}
	.long {
		& /deep/ .el-form-item__label {
      line-height: 22px;
    }
	}
}
</style>


