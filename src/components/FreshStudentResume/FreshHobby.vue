<template>
  <div class="evaluate-info">
    <div id="hobby" class="grid-content info-box">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-edit-hobby"></i>
          <span>兴趣爱好</span>
          <div class="icon-text-box" v-if="hobbyInfo.hobby" @click="editEvaluate">
            <i class="iconfont icon-edit right-icon"></i>
            <span class="icon-text">编辑&nbsp;</span>
          </div>
        </div>
        <div class="evaluate-box" v-if="hobbyInfo.hobby&&showEvaluateEdit==false">
          <div class="evaluate-text">
            <pre>{{hobbyInfo.hobby}}</pre>
          </div>
        </div>
        <div class="evaluate-box edit-content" v-if="showEvaluateEdit==true && hobbyInfo">
          <div class="textarea-box">
            <el-input type="textarea" v-model="hobby" :maxlength="120" placeholder="请用通俗简练的语言来进行概括，内容与应聘岗位有内在关联性、支撑性。"></el-input>
            <div class="msg" v-if="showEvaluateMsg">请输入兴趣爱好</div>
          </div>
          <div class="edit-btn-box">
            <div class="edit-btn save-btn" @click="saveEvaluate">保存</div>
            <div class="edit-btn cancel-btn" @click="showEvaluateEdit=false">取消</div>
          </div>
        </div>
         <div class="imperfect" v-if="showEvaluateEdit==false&&!hobbyInfo.hobby">
          <p class="perfect-text">良好的兴趣爱好，可以展现个人优势，让HR更了解你！</p>
          <el-button size="small" class="perfect-btn" @click="editEvaluate">开始完善</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "freshHobby",
  data() {
    return {
      hobby: '',
      showEvaluateEdit: false,
      showEvaluateMsg: false
    };
  },
  props: ["hobbyInfo", "baseParams"],
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
        this.hobby = this.hobbyInfo.hobby;
        this.showEvaluateEdit = true;
      }
    },
    saveEvaluate: function() {
      if(!this.hobby){
        this.showEvaluateMsg = true
        return
      }
			this.showhobbyInfo = false;
			this.hobbyInfo.hobby = this.hobby;
			let data = {
				hobby: this.hobbyInfo.hobby,
				id: this.baseParams.resumeId,
				resumeType: this.baseParams.resumeType
			}
      this.$store
        .dispatch("SET_HOBBY", data)
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

