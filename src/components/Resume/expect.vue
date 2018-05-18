<template>
  <div class="expext-info">
    <div id="job" class="grid-content info-box" v-if="!showJobIntensionEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-job"></i>
          <span>求职意向</span>
          <i class="iconfont icon-edit right-icon" @click="editJobIntension" v-if="!preview"></i>
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
          <el-button size="small" class="perfect-btn" @click="editJobIntension">开始完善</el-button>
        </div>
      </div>
    </div>
    <div class="grid-content info-box edit-border" v-if="showJobIntensionEdit==true">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-job"></i>
          <span>求职意向</span>
        </div>
        <div class="base-content">
          <div class="edit-content">
            <el-form :inline="true" :model="expect" :rules="rules" ref="expect" label-width="100px" class="form-box">
              <el-form-item label="期望薪资：" prop="expectSalary" class="input-box">
                <el-select size="small" v-model="expect.expectSalary" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in salaryRange"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作地点：" prop="expectPlace" class="input-box">
                 <el-select size="small" v-model="expect.expectPlace" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in cities"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="职能/职位：" prop="expectPosition" class="input-box">
                <el-select size="small" v-model="expect.expectPosition" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in positionType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="行业：" prop="expectIndustry" class="input-box">
                <el-select size="small" v-model="expect.expectIndustry" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in industryType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="工作类型：" prop="expectWorkType" class="input-box">
                <el-select size="small" v-model="expect.expectWorkType" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in workType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="到岗时间：" prop="arriveTime" class="input-box">
                <el-select size="small" v-model="expect.arriveTime" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in arriveRange"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item size="small" class="edit-btn-box">
                <el-button class="save-btn" @click="saveJobIntension('expect')">保存</el-button>
                <el-button class="cancel-btn" @click="cancel('expect')">取消</el-button>
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
  name: "expect",
  data() {
    return {
      salaryRange: metadata.salaryRange,
      cities: metadata.cities,
      positionType: metadata.positionType,
      industryType: metadata.industryType,
      workType: metadata.workType,
      arriveRange: metadata.arriveRange,

      expect: {},
      showJobIntensionEdit: false,
      rules: {
        expectInfo: [
          {
            required: true,
            message: "请确认你所填写的期望薪资符合市场规律，没有过高/过低",
            trigger: "change"
          }
        ],
        expectPlace: [
          {
            require: true,
            message: "请确认该期望地为单一城市",
            trigger: "change"
          }
        ],
        expectPosition: [
          {
            require: true,
            message: "请确认你的期望职位符合你的工作年限及实习经历",
            trigger: "change"
          }
        ],
        expectIndustry: [
          {
            require: true,
            message: "请选择行业",
            trigger: "change"
          }
        ],
        expectWorkType: [
          {
            require: true,
            message: "请选择工作类型",
            trigger: "change"
          }
        ],
        arriveTime: [
          {
            require: true,
            message: "请确认你的到岗时间是否在1周内。",
            trigger: "click"
          }
        ]
      }
    };
  },
  props: ["expectInfo", "preview"],
  methods: {
    editJobIntension: function() {
      this.showJobIntensionEdit = true;
      this.expect = this.expectInfo;
    },
    saveJobIntension: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_BASEINFO", this.expect)
            .then(res => {
              this.$emit('saved');
              this.showJobIntensionEdit = false;
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
      this.showJobIntensionEdit = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scope></style>

