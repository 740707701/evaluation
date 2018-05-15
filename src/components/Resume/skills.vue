<template>
  <div class="skill-info">
    <div id="skill" class="grid-content info-box" v-if="!showSkillEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-skill"></i>
                <span>技能证书</span>
                <div class="add-job" @click="showSkillEdit=true">
                  <i class="iconfont icon-add"></i>新增证书
                </div>
              </div>
              <ul class="skill">
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
                    <el-button size="small" class="perfect-btn" @click="showSkillEdit=true">开始完善</el-button>
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
                  <ul  class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="skillInfo.skillTime"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">证书名称：</span>
                        <el-input size="small" v-model="skillInfo.name" placeholder="请输入证书名称" maxlength="30"></el-input>
                      </div>
                    </li>
                    <li class="item work-desc-item">
                      <div class="input-box text-left">
                        <span class="name">成绩：</span>
                        <el-input size="small" v-model="skillInfo.score" placeholder="请输入成绩" maxlength="30" ></el-input>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveSkill(id)">保存</div>
                    <div class="edit-btn cancel-btn" @click="showSkillEdit=false">取消</div>
                  </div>

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
      showSkillEdit: false
    };
  },
  props: ["skillList"],
  computed: {},
  created() {},
  methods: {
    editSkill: function(id) {},
    deleteSkill: function(id) {},
    saveSkill: function(id) {},
    cancel: function() {}
  },
  watch: {},
  components: {}
};
</script>
<style lang="less" scope>

</style>

