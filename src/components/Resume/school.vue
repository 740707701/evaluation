<template>
  <div class="sshool-info">
    <div id="school" class="grid-content info-box" >
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-school"></i>
          <span>在校情况</span>
        </div>
        <div class="schoolwork">
          <div class="honor" v-if="!showSchoolHonorEdit">
            <div class="school-type">
              <span>校内荣誉</span>
              <div class="add-job" @click="addHonor">
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
                    <i class="iconfont icon-edit" @click="editHonor(honor.id)"></i>
                    <i class="iconfont icon-delete" @click="deleteHonor(honor.id)"></i>
                  </span>
                </div>
              </li>
            </ul>
            <div class="imperfect" v-if="!showSchoolHonorEdit&&!schoolHonorList.length">
              <p class="perfect-text">完善校内荣誉，展现学习能力，让HR更了解你！</p>
              <el-button size="small" class="perfect-btn" @click="showSchoolHonorEdit=true">开始完善</el-button>
            </div>
          </div>
          <div class="post" v-if="!showSchoolWorkEdit">
            <div class="school-type">
              <span>校内职务</span>
              <div class="add-job" @click="addWork">
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
                    <i class="iconfont icon-edit" @click="editWork(work.id)"></i>
                    <i class="iconfont icon-delete" @click="deleteWork(work.id)"></i>
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
            <div class="imperfect" v-if="!showSchoolWorkEdit&&!schoolWorkList.length">
              <p class="perfect-text">完善校内职务，展现校园活动经验，让HR更了解你！</p>
              <el-button size="small" class="perfect-btn" @click="showSchoolWorkEdit=true">开始完善</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-content info-box edit-border" v-if="showSchoolHonorEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-school"></i>
          <span>校内荣誉</span>
        </div>
        <div class="base-content">
          <div class="edit-content">
            <ul  class="edit-item-list">
              <li class="item">
                <div class="input-box">
                  <span class="name">时间：</span>
                  <el-date-picker size="small" class="select-box"
                    v-model="honorInfo.honorTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <div class="input-box">
                  <span class="name">奖项：</span>
                  <el-input size="small" v-model="honorInfo.honorName" placeholder="请输入奖项"></el-input>
                </div>
              </li>
              <li class="item">
                <div class="input-box text-left">
                  <span class="name">级别：</span>
                  <el-input size="small" v-model="honorInfo.honorTitle" placeholder="请输入级别"></el-input>
                </div>
              </li>
            </ul>
            <div class="edit-btn-box">
              <div class="edit-btn save-btn" @click="saveSchoolHonor">保存</div>
              <div class="edit-btn cancel-btn" @click="showSchoolHonorEdit=false">取消</div>
            </div>

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
            <ul  class="edit-item-list">
              <li class="item">
                <div class="input-box">
                  <span class="name">时间：</span>
                  <el-date-picker size="small" class="select-box"
                    v-model="workInfo.startTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <div class="input-box">
                  <span class="name">职务：</span>
                  <el-input size="small" v-model="workInfo.schoolWorkName" placeholder="请输入职务"></el-input>
                </div>
              </li>
              <li class="item work-desc-item">
                <div class="input-box text-left">
                  <span class="name">职务描述：</span>
                  <div class="work-desc">
                    <textarea v-model="workInfo.schoolWorkDesc" maxlength="300" class="textarea" name="" id="" placeholder="描述你的职责范围、工作任务以及取得成绩"></textarea>
                  </div>
                </div>
              </li>
            </ul>
            <div class="edit-btn-box">
              <div class="edit-btn save-btn" @click="saveSchoolWork">保存</div>
              <div class="edit-btn cancel-btn" @click="showSchoolWorkEdit=false">取消</div>
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
      showSchoolWorkEdit: false,
      showSchoolHonorEdit: false,
      honorInfo: {},
      workInfo: {}
    };
  },
  props: ["schoolHonorList", "schoolWorkList"],
  computed: {},
  created() {},
  methods: {
    addHonor: function() {
      this.showSchoolHonorEdit = true;
    },
    editHonor: function(id) {},
    saveSchoolHonor: function() {},
    addWork: function() {
      this.showSchoolWorkEdit = true;
    },
    editWork: function(id) {},
    saveSchoolWork: function() {}
  },
  watch: {},
  components: {}
};
</script>
<style lang="less" scope>

</style>

