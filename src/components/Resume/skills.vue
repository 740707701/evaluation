<template>
  <div class="skill-info">
    <div id="skill" class="grid-content info-box" v-if="!showSkillEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-skill"></i>
          <span>技能证书</span>
          <div class="add-job" @click="addSkill" v-if="skillList.length">
            <i class="iconfont icon-add"></i>新增证书
          </div>
        </div>
        <ul class="skill" v-if="skillList.length">
          <li v-for="skill in skillList" :key="skill.id">
            <span class="gray">{{skill.skillTime.slice(0,10)}}</span>
            <span>{{skill.name}}</span>
            <span>{{skill.score}}</span>
            <span class="icon-box">
              <i class="iconfont icon-edit" @click="editSkill(skill.id)"></i>
              <i class="iconfont icon-delete" @click="deleteSkill(skill.id)"></i>
            </span>
          </li>
        </ul>
        <div class="imperfect" v-if="!showSkillEdit&&!skillList.length">
          <p class="perfect-text">完善所获证书，展现专业技能，让HR更了解你！</p>
          <el-button size="small" class="perfect-btn" @click="addSkill">开始完善</el-button>
        </div>
      </div>
    </div>
    <div class="grid-content info-box edit-border" v-if="showSkillEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-skill"></i>
          <span>技能证书</span>
        </div>
        <div class="base-content">
          <div class="edit-content">
            <el-form :inline="true" :model="skillInfo" :rules="rules" ref="skillInfo" label-width="100px" class="form-box">
              <el-form-item label="时间：" prop="skillTime" class="input-box">
                <el-date-picker size="small" class="select-box"
                    v-model="skillInfo.skillTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="证书名称：" prop="name" class="input-box">
                <el-input size="small" v-model="skillInfo.name" placeholder="请输入证书名称" maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="成绩：" prop="score" class="input-box">
                <el-input size="small" v-model="skillInfo.score" placeholder="请输入成绩" maxlength="30" ></el-input>
              </el-form-item>
              <el-form-item size="small" class="edit-btn-box">
                <el-button class="save-btn" @click="saveSkillInfo('skillInfo')">保存</el-button>
                <el-button class="cancel" @click="cancel('skillInfo')">取消</el-button>
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
  name: "skill",
  data() {
    return {
      skillInfo: {},
      currentSkill: [],
      showSkillEdit: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入证书名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "请确认你的技能证书均有官网可查",
            trigger: "blur"
          }
        ],
        skillTime: [
          {
            required: true,
            message: "请填入证书时间",
            trigger: "blur"
          }
        ],
        score: [
          {
            required: true,
            message: "请输入证书分数",
            trigger: "blur"
          },
          {
            min: 2,
            max: 8,
            message: "请确认你的技能证书均有官网可查",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["skillList", "baseParams"],
  methods: {
    addSkill: function() {
      if(!this.baseParams.resumeId){
        this.$message({
          type: "error",
          message: "请先完善简历基本信息！"
        })
        return
      }
      this.skillInfo = {
        resumeId: this.baseParams.resumeId
      };
      this.showSkillEdit = true;
    },
    editSkill: function(id) {
      this.currentSkill = this.skillList.filter(function(item) {
        return item.id == id;
      });
      this.skillInfo = this.currentSkill[0];
      console.log("this.skillInfo", this.skillInfo);
      this.showSkillEdit = true;
    },
    saveSkillInfo: function(formName) {
      console.log("this.skillInfo", this.skillInfo);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_SKILL", this.skillInfo)
            .then(res => {
              this.showSkillEdit = false;
              this.$emit("saved", this.baseParams.resumeId);
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
      this.showSkillEdit = false;
      this.$refs[formName].resetFields();
    },
    deleteSkill: function(id) {
      this.$confirm("是否确认删除？")
        .then(response => {
          this.$store
            .dispatch("DELETE_SKILL", id)
            .then(res => {
              this.$emit("saved", this.baseParams.resumeId);
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

