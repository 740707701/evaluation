<template>
  <div class="expext-info">
    <div id="job" class="grid-content info-box" v-if="!showJobIntensionEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-job"></i>
          <span>求职意向</span>
          <i class="iconfont icon-edit right-icon" @click="editJobIntension"></i>
        </div>
        <ul class="item-list">
          <li>
            <span class="item">
              <span class="name">期望工资： </span>{{expectInfo.expectSalary}}元/月
            </span>
            <span class="item">
              <span class="name">工作地点： </span>{{expectInfo.expectPlace}}
            </span>
          </li>
          <li>
            <span class="item">
              <span class="name">职能/职位： </span>{{expectInfo.expectPosition}}
            </span>
            <span class="item">
              <span class="name">工作类型：  </span>{{expectInfo.expectWorkType}}
            </span>
          </li>
          <li>
            <span class="item">
              <span class="name">行业： </span>{{expectInfo.expectIndustry}}
            </span>
            <span class="item">
            <span class="name">到岗时间： </span>{{expectInfo.arriveTime}}
            </span>
          </li>
        </ul>
        <div class="imperfect" v-if="!expectInfo">
          <p class="perfect-text">完善求职意向，展现专业能力，让HR更了解你！</p>
          <el-button size="small" class="perfect-btn" @click="showJobIntensionEdit=true">开始完善</el-button>
        </div>
      </div>
    </div>
    <div class="grid-content info-box edit-border" v-if="expectInfo&&showJobIntensionEdit==true">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-job"></i>
          <span>求职意向</span>
        </div>
        <div class="base-content">
          <div class="edit-content">
            <ul class="edit-item-list">
              <li class="item">
                <div class="input-box">
                  <span class="name">期望薪资：</span>
                  <el-select size="small" v-model="expectInfo.expectSalary" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in salaryRange"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="input-box">
                  <span class="name">工作地点：</span>
                  <el-select size="small" v-model="expectInfo.expectWorkPlace" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in cities"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li class="item">
                <div class="input-box">
                  <span class="name">职能/职位：</span>
                  <el-select size="small" v-model="expectInfo.expectPosition" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in positionType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="input-box">
                  <span class="name">行业：</span>
                  <el-select size="small" v-model="expectInfo.expectIndustry" placeholder="请选择" class="select-box">
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
                  <span class="name">工作类型：</span>
                  <el-select size="small" v-model="expectInfo.expectWorkType" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in workType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="input-box">
                  <span class="name">到岗时间：</span>
                  <el-select size="small" v-model="expectInfo.arriveTime" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in arriveRange"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
            </ul>
            <div class="edit-btn-box">
              <div class="edit-btn save-btn" @click="saveJobIntension">保存</div>
              <div class="edit-btn cancel-btn" @click="cancel">取消</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import metadata from '../../api/metadata'
  export default {
    name: 'expect',
    data(){
      return {
        salaryRange: metadata.salaryRange,
        cities: metadata.cities,
        positionType: metadata.positionType,
        industryType: metadata.industryType,
        workType: metadata.workType,
        arriveRange: metadata.arriveRange,

        showJobIntensionEdit: false,
      }
    },
    props: ['expectInfo'],
   
    methods: {
      editJobIntension: function(){
        this.showJobIntensionEdit = true;
      },
      saveJobIntension: function(){},
      cancel: function(){
        this.showJobIntensionEdit = false
      }
    },
    
  }
</script>
<style lang="less" scope></style>

