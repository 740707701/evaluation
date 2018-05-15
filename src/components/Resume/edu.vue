<template>
  <div class="edu-info">
    <div id="education" class="grid-content info-box" v-if="!showEducationEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-edu"></i>
                <span>教育经历</span>
                 <div class="add-job" @click="showEducationEdit=true">
                  <i class="iconfont icon-add"></i>新增教育
                </div>
              </div>
              <div class="job-item item-first" v-for="edu in eduList" :key="edu.id">
                <div class="job-time">
                  <span class="gray">{{edu.startTime.slice(0,10)}} - {{edu.endTime.slice(0,10)}}</span>
                  <span>{{edu.schoolName}}</span>
                  <span>{{edu.eduMajor}}（{{edu.degree}}）</span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit" @click="editEdu(edu.id)"></i>
                    <i class="iconfont icon-delete" @click="deleteEdu(edu.id)"></i>
                  </span>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">专业描述：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li class="desc-item">{{edu.eduDesc}}</li>
                    </ul>
                  </div>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">主修课程：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li class="desc-item">{{edu.Desc}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="imperfect" v-if="!showEducationEdit&&!eduList.length">
                <p class="perfect-text">完善教育经历，展现专业能力，让HR更了解你！</p>
                <el-button size="small" class="perfect-btn" @click="showEducationEdit=true">开始完善</el-button>
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
                  <ul class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">开始时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="eduInfo.startTime"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">结束时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="eduInfo.endTime"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">学校：</span>
                        <el-input size="small" v-model="eduInfo.schoolName" placeholder="请输入学校" maxlength="30"></el-input>
                      </div>
                      <div class="input-box">
                        <span class="name">学历/学位：</span>
                        <el-select size="small" v-model="eduInfo.degree" placeholder="请选择" class="select-box">
                          <el-option 
                          v-for="item in degreeType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          ></el-option>
                        </el-select>
                      </div>
                    </li>
                     <li class="item">
                      <div class="input-box">
                        <span class="name">专业：</span>
                        <el-select size="small" v-model="eduInfo.eduMajor" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in majorType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="input-box">
                        <span class="name">学业性质：</span>
                        <el-select size="small" v-model="eduInfo.eduNature" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in eduNatureType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <li class="item work-desc-item">
                      <div class="input-box text-left">
                        <span class="name">主修课程：</span>
                        <div class="work-desc">
                          <textarea v-model="eduInfo.eduDesc" maxlength="300" class="textarea" name="" id="" placeholder="描述在校期间所学专业，主要包括课程内容，毕业设计等"></textarea>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveEdu">保存</div>
                    <div class="edit-btn cancel-btn" @click="showEducationEdit=false">取消</div>
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
  name: "edu",
  data() {
    return {
      eduInfo: {},
      showEducationEdit: false,
      degreeType: metadata.degreeType,
      majorType: metadata.majorType,
      eduNatureType: metadata.eduNatureType
    };
  },
  props: ["eduList"],
  computed: {},
  created() {},
  methods: {
    editEdu: function(id) {
      this.showEducationEdit = true;
    },
    deleteEdu: function(id) {},
    saveEdu: function() {},
    cancel: function() {}
  },
  watch: {},
  components: {}
};
</script>
<style lang="less" scope>

</style>

