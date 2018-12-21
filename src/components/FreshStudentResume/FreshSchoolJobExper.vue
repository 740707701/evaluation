<template>
  <div class="school-info schooljobexper-info">
    <div id="schooljobexper" class="grid-content info-box" v-if="!showSchoolWorkEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-school"></i>
          <span>校园经历</span>
					<div class="add-job" @click="addSchoolWork" v-if="schoolJobExperList.length">
						<i class="iconfont icon-add"></i>新增校园经历
					</div>
        </div>
				<div class="post" v-if="!showSchoolWorkEdit">
					<ul class="post-list" v-if="schoolJobExperList.length">
						<li class="job-item" v-for="work in schoolJobExperList" :key="work.id">
							<div class="job-time">
								<span class="gray">{{work.startTime.slice(0, 7)}} - {{work.endTime.slice(0, 7)}}</span>
								<span>{{work.clubName}}</span>
								<span>{{work.schoolWorkName}}</span>
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
								<div class="desc-text gray">负责内容：</div>
								<div class="desc-content">
									<ul class="desc-list">
                    <li>
                      <pre>{{work.responsibleContent}}</pre>
                    </li>
									</ul>
								</div>
							</div>
							<div class="job-desc">
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
					<div class="imperfect" v-if="!showSchoolWorkEdit&&!schoolJobExperList.length">
						<p class="perfect-text">完善校园经历，让HR更了解你！</p>
						<el-button size="small" class="perfect-btn" @click="addSchoolWork">开始完善</el-button>
					</div>
				</div>
      </div>
    </div>
		<div class="grid-content info-box edit-border" v-if="showSchoolWorkEdit">
			<div class="base-info">
				<div class="title">
					<i class="iconfont icon-school"></i>
					<span>校园经历</span>
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
							<el-form-item label="组织名称/校园名称：" prop="clubName" class="input-box long">
								<el-input size="small" v-model="workInfo.clubName" placeholder="请输入组织/校园名称" :maxlength="30"
								@focus="inputFocus('workInfo','showClubNameMsg')" @blur="showClubNameMsg=false"></el-input>
								<div class="msg" v-if="showClubNameMsg">请确认此组织活动真实可靠</div>
							</el-form-item>
							<el-form-item label="担任职务：" prop="schoolWorkName" class="input-box">
								<el-input size="small" v-model="workInfo.schoolWorkName" placeholder="请输入职务" :maxlength="30"
								@focus="inputFocus('workInfo','showWorkNameMsg')" @blur="showWorkNameMsg=false"></el-input>
								<div class="msg" v-if="showWorkNameMsg">请确认此职务对求职有帮助</div>
							</el-form-item>
							<el-form-item label="负责内容：" prop="responsibleContent" class="input-box desc-box">
								<div class="work-desc">
									<el-input class="desc-input" type="textarea" v-model="workInfo.responsibleContent" :maxlength="200" 
									placeholder="注意：担任职务具体负责哪些工作，是策划/执行/统筹/协调还是什么，面向的群体是谁，要具体说明，注意不要大段大段文字呈现，要写成一条一条的，用“1、2、3、”来进行标示。例如（学生会文艺部部长）：1、根据学期安排，协助老师进行校园文化活动的策划、宣传、统筹与实施；2、部分成员的值班安排、团建活动、带教等部门管理工作。"></el-input>
								</div>
							</el-form-item>
							<el-form-item label="实践成果：" prop="workResult" class="input-box desc-box">
								<div class="work-desc">
									<el-input class="desc-input" type="textarea" v-model="workInfo.workResult" :maxlength="200" 
									placeholder="注意：实习成果尽量以数据来呈现，突出个人成果以及做出的贡献。例如：策划并组织校园歌手大赛、主持人大赛、演讲比赛、迎新晚会等共计10余场校级活动，参与学生人数达3000+；以上活动均取得良好的效果，团队获得老师及同学的一致好评。"></el-input>
								</div>
							</el-form-item>
							<el-form-item label="成长收获：" prop="growHarvest" class="input-box desc-box">
								<div class="work-desc">
									<el-input class="desc-input" type="textarea" v-model="workInfo.growHarvest" :maxlength="200" 
									placeholder="注意：根据校园经历的具体内容，进行某能力提升的说明。例如：锻炼了我的组织协调能力及统筹策划能力，大大提升了我的抗压能力及应变能力。"></el-input>
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
  name: "freshSchoolJobExper",
  data() {
    return {
      showWorkNameMsg: false,
      showClubNameMsg: false,
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
        clubName: [
          {
            required: true,
            message: "请输入组织/校园名称",
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
        responsibleContent: [
          {
            required: true,
            message: "请输入负责内容",
            trigger: "blur"
          }
        ],
        workResult: [
          {
            required: true,
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
  props: ["schoolJobExperList", "baseParams"],
  methods: {
    compareDate(arg1, arg2) {
      return compareDate(arg1, arg2)
    },
    inputFocus(formName, msg) {
			this.$refs[formName].clearValidate()
			this[msg] = true
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
      this.currentWork = this.schoolJobExperList.filter(function(item) {
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
            .dispatch("SAVE_SCHOOLJOBEXPER", this.workInfo)
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
            .dispatch("DELETE_SCHOOLJOBEXPER", id)
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
.schooljobexper-info {
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


