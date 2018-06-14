<template>
  <div class="evaluate-info">
    <div id="evaluate" class="grid-content info-box">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-evaluate"></i>
          <span>自我评价</span>
          <i class="iconfont icon-edit right-icon" v-if="evaluateInfo.evaluate" @click="editEvaluate"></i>
        </div>
        <div class="evaluate-box" v-if="evaluateInfo.evaluate&&showEvaluateEdit==false">
          <div class="evaluate-text">{{evaluateInfo.evaluate}}</div>
        </div>
        <div class="evaluate-box edit-content" v-if="showEvaluateEdit==true && evaluateInfo">
          <div class="textarea-box">
            <el-input type="textarea" v-model="eva.evaluate" :maxlength="120" placeholder="请确认自我评价语言洗练、内容与应聘岗位有内在关联性、支撑性。"></el-input>
            <div class="msg" v-if="showEvaluateMsg">请输入自我评价</div>
          </div>
          <div class="edit-btn-box">
            <div class="edit-btn save-btn" @click="saveEvaluate">保存</div>
            <div class="edit-btn cancel-btn" @click="showEvaluateEdit=false">取消</div>
          </div>
        </div>
         <div class="imperfect" v-if="showEvaluateEdit==false&&!evaluateInfo.evaluate">
          <p class="perfect-text">良好的自我评价，可以展现个人优势，让HR更了解你！</p>
          <el-button size="small" class="perfect-btn" @click="editEvaluate">开始完善</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "evaluate",
  data() {
    return {
      eva: {},
      showEvaluateEdit: false,
      showEvaluateMsg: false
    };
  },
  props: ["evaluateInfo", "baseParams"],
  methods: {
    editEvaluate: function() {
      this.showEvaluateMsg = false;
      if(!this.baseParams.resumeId){
        this.$message({
          type: "error",
          message: "请先完善简历基本信息！"
        })
        return
      }else {
        this.eva.evaluate = this.evaluateInfo.evaluate;
        this.showEvaluateEdit = true;
      }
    },
    saveEvaluate: function() {
      if(!this.eva.evaluate){
        this.showEvaluateMsg = true
        return
      }
      this.showEvaluateInfo = false;
      this.evaluateInfo.evaluate = this.eva.evaluate;
      this.$store
        .dispatch("SET_EVALUATE", this.evaluateInfo)
        .then(res => {
          this.$emit("saved", this.baseParams.resumeId);
          this.showEvaluateEdit = false;
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
    }
  }
};
</script>
<style lang="less" scope>

</style>

