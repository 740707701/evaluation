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
            <ul class="edit-item-list">
              <li class="item">
                <div class="input-box">
                  <span class="name">开始时间：</span>
                  <el-date-picker size="small" class="select-box"
                    v-model="workExperInfo.startTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <div class="input-box">
                  <span class="name">结束时间：</span>
                  <el-date-picker size="small" class="select-box"
                    v-model="workExperInfo.endTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
              </li>
              <li class="item">
                <div class="input-box">
                  <span class="name">公司：</span>
                  <el-input size="small" v-model="workExperInfo.companyName" placeholder="请输入公司" maxlength="30"></el-input>
                </div>
                <div class="input-box">
                  <span class="name">部门：</span>
                  <el-input size="small" v-model="workExperInfo.department" placeholder="请输入部门" maxlenth="30"></el-input>
                </div>
              </li>
                <li class="item">
                <div class="input-box">
                  <span class="name">职能：</span>
                  <el-select size="small" v-model="workExperInfo.fun" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in funType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="input-box">
                  <span class="name">行业：</span>
                  <el-select size="small" v-model="workExperInfo.industry" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in industryType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
                <li class="item">
                <div class="input-box">
                  <span class="name">职位：</span>
                  <el-input size="small" v-model="workExperInfo.position" placeholder="所在职位" maxlenth="30"></el-input>
                </div>
                <div class="input-box">
                  <span class="name">公司规模：</span>
                  <el-select size="small" v-model="workExperInfo.companySize" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in companySize"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li class="item">
                <div class="input-box">
                  <span class="name">工作类型：</span>
                  <el-radio-group size="small" v-model="workExperInfo.workType">
                    <el-radio-button label="全职"></el-radio-button>
                    <el-radio-button label="兼职"></el-radio-button>
                  </el-radio-group>
                </div>
                <div class="input-box">
                  <span class="name">公司性质：</span>
                  <el-select size="small" v-model="workExperInfo.companyNature" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in companyNature"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li class="item work-desc-item">
                <div class="input-box text-left">
                  <span class="name">工作描述：</span>
                  <div class="work-desc">
                    <textarea v-model="workExperInfo.workDesc" maxlength="300" class="textarea" name="" id="" placeholder="描述你的职责范围、工作任务以及取得成绩"></textarea>
                  </div>
                </div>
              </li>
            </ul>
            <div class="edit-btn-box">
              <div class="edit-btn save-btn" @click="saveWorkExper">保存</div>
              <div class="edit-btn cancel-btn" @click="showWorkExperiencedEdit=false">取消</div>
            </div>
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
      workExperInfo: {},
      showWorkExperiencedEdit: false,
      funType: metadata.funType,
      industryType: metadata.industryType,
      companySize: metadata.companySize,
      companyNature: metadata.companyNature
    };
  },
  props: ["workExperList"],
  computed: {},
  created() {},
  methods: {
    addWorkExper: function() {},
    editWorkExper: function(id) {
      if (id) {
        //编辑
        this.showWorkExperiencedEdit = true;
      } else {
        //新增
      }
    },
    deleteWorkExper: function() {},
    saveWorkExper: function() {
      //保存数据....
      this.showWorkExperiencedEdit = false;
    },
    cancel: function() {}
  },
  watch: {}
};
</script>
<style lang="less" scope>

</style>

