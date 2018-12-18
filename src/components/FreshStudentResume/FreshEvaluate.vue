<template>
  <div class="evaluate-info">
    <div id="evaluate" class="grid-content info-box">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-evaluate"></i>
          <span>自我评价</span>
          <div class="icon-text-box" v-if="evaluateInfo.evaluate" @click="editEvaluate">
            <i class="iconfont icon-edit right-icon"></i>
            <span class="icon-text">编辑&nbsp;</span>
          </div>
        </div>
        <div class="evaluate-box" v-if="evaluateInfo.evaluate&&showEvaluateEdit==false">
          <div class="evaluate-text">{{evaluateInfo.evaluate}}</div>
        </div>
        <div class="evaluate-box edit-content" v-if="showEvaluateEdit==true && evaluateInfo">
          <div class="textarea-box">
						<div class="placeholder" v-if="!evaluateText">
							<p>注意：按照关键词+一句话描述进行书写，用词要精练简洁。</p>
							<div class="demo key-text">例如：</div>
							<div class="demo key-value">
								<p>逻辑思维缜密：擅长罗列思维导图进行课题分析；</p>
								<p>组织策划能力强：策划组织多场校级比赛/晚会，获得一致好评；</p>
								<p>语言表达能力强：多场晚会的主持及统筹经验；</p>
								<p>交往能力强：2年兼职播音主持培训老师的经验，被学员评委“最受欢迎教师”。</p>
							</div>
						</div>
            <el-input type="textarea" v-model="evaluateText" :maxlength="120" ></el-input>
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
  name: "freshEvaluate",
  data() {
    return {
      eva: {},
      showEvaluateEdit: false,
			showEvaluateMsg: false,
			evaluateText: ''
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
        this.evaluateText = this.evaluateInfo.evaluate;
        this.showEvaluateEdit = true;
      }
    },
    saveEvaluate: function() {
      if(!this.evaluateText){
        this.showEvaluateMsg = true
        return
      }
      this.showEvaluateInfo = false;
      this.evaluateInfo.evaluate = this.evaluateText;
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
.evaluate-box {
	.textarea-box {
		position: relative;
		min-height: 136px;
		.placeholder {
			color: #C8C8C8;
			padding: 6px 20px;
			// z-index: 1;
			.demo {
				display: inline-block
			}
			.key-text {
				float: left;
				width: 50px;
			}
		}
		.el-textarea {
			min-height: 136px;
			position: absolute;
			top: 0;
			// z-index: 2;
			textarea {
				min-height: 136px!important;
				background-color: transparent;
			}
		}
	}
}
</style>


