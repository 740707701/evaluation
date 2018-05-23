<template>
  <div class="expext-info">
    <div id="job" class="grid-content info-box" v-if="!showJobIntensionEdit">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-job"></i>
          <span>求职意向</span>
          <i class="iconfont icon-edit right-icon" v-if="expectInfo.expectSalary" @click="editJobIntension"></i>
        </div>
        <ul class="item-list" v-if="expectInfo.expectSalaryName">
          <li>
            <span class="item">
              <span class="name">期望工资： </span>{{expectInfo.expectSalaryName}}元/月
            </span>
            <span class="item">
              <span class="name">工作地点： </span>{{expectInfo.expectPlaceName}}
            </span>
          </li>
          <li>
            <span class="item">
              <span class="name">职能/职位： </span>{{expectInfo.expectPositionNmae}}
            </span>
            <span class="item">
              <span class="name">工作类型：  </span>{{expectInfo.expectWorkTypeName}}
            </span>
          </li>
          <li>
            <span class="item">
              <span class="name">行业： </span>{{expectInfo.expectIndustryName}}
            </span>
            <span class="item">
            <span class="name">到岗时间： </span>{{expectInfo.arriveTimeName}}
            </span>
          </li>
        </ul>
        <div class="imperfect" v-if="!expectInfo.expectSalaryName">
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
                    v-for="item in expectData.salaryRange"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作地点：" prop="expectPlace" class="input-box">
                 <!-- <el-select size="small" v-model="expect.expectPlace" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in expectData.cities"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select> -->
                  <el-cascader size="small" v-model="expect.expectPlace" @change="changePlace"
                    :options="expectData.cities"
                    :show-all-levels="false"
                    :props="cascaderProp"
                    ></el-cascader>
              </el-form-item>
              <el-form-item label="职能/职位：" prop="expectPosition" class="input-box">
                <!-- <el-select size="small" v-model="expect.expectPosition" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in expectData.funType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select> -->
                <el-cascader size="small" v-model="expect.expectPosition" @change="changePosition"
                    :options="expectData.funType"
                    :show-all-levels="false"
                    :props="cascaderProp"
                    ></el-cascader>
              </el-form-item>
              <el-form-item label="行业：" prop="expectIndustry" class="input-box">
                <!-- <el-select size="small" v-model="expect.expectIndustry" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in expectData.industryType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select> -->
                 <el-cascader size="small" v-model="expect.expectIndustry" @change="changeIndustry"
                    :options="expectData.industryType"
                    :show-all-levels="false"
                    :props="cascaderProp"
                    ></el-cascader>
              </el-form-item>
              <el-form-item label="工作类型：" prop="expectWorkType" class="input-box">
                <el-select size="small" v-model="expect.expectWorkType" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in expectData.workType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="到岗时间：" prop="arriveTime" class="input-box">
                <el-select size="small" v-model="expect.arriveTime" placeholder="请选择" class="select-box">
                    <el-option
                      v-for="item in expectData.arriveRange"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code">
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
export default {
  name: "expect",
  data() {
    return {
      expect: {},
      showJobIntensionEdit: false,
      cascaderProp: {
        label: "name",
        value: "code",
        children: 'childrens'
      },
      rules: {
        expectInfo: [
          {
            required: true,
            message: "请确认你所填写的期望薪资符合市场规律，没有过高/过低",
            trigger: "blur"
          }
        ],
        expectPlace: [
          {
            require: true,
            type: 'array',
            message: "请确认该期望地为单一城市",
            trigger: "blur"
          }
        ],
        expectPosition: [
          {
            require: true,
            type: 'array',
            message: "请确认你的期望职位符合你的工作年限及实习经历",
            trigger: "blur"
          }
        ],
        expectIndustry: [
          {
            require: true,
            type: 'array',
            message: "请选择行业",
            trigger: "blur"
          }
        ],
        expectWorkType: [
          {
            require: true,
            message: "请选择工作类型",
            trigger: "blur"
          }
        ],
        arriveTime: [
          {
            require: true,
            message: "请确认你的到岗时间是否在1周内。",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["expectInfo", "expectData", "baseParams"],
  methods: {
    changeIndustry: function(e){
      this.expect.expectIndustry = e;
    },
    changePosition: function(e){
      this.expect.expectPosition = e;
    },
    changePlace: function(e){
      this.expect.expectPlace = e;
    },
    editJobIntension: function() {
      this.showJobIntensionEdit = true;
      this.expect = this.expectInfo;
    },
    saveJobIntension: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SET_JOBINTENSION", this.expect)
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

