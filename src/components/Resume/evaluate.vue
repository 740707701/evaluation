<template>
  <div class="evaluate-info">
    <div id="evaluate" class="grid-content info-box" v-if="evaluateInfo.evaluate">
      <div class="base-info">
        <div class="title">
          <i class="iconfont icon-evaluate"></i>
          <span>自我评价</span>
          <i class="iconfont icon-edit right-icon" v-if="!showEvaluateEdit" @click="editEvaluate"></i>
        </div>
        <div class="evaluate-box" v-if="showEvaluateEdit==false&&evaluateInfo">
          <div class="evaluate-text">{{evaluateInfo.evaluate}}</div>
        </div>
        <div class="evaluate-box edit-content" v-if="showEvaluateEdit==true && evaluateInfo">
          <textarea class="textarea edit-border" v-model="eva.evaluate" placeholder="良好的自我评价，可以展现自身优势，让HR更了解你！"> 
          </textarea>
          <div class="edit-btn-box">
            <div class="edit-btn save-btn" @click="saveEvaluate">保存</div>
            <div class="edit-btn cancel-btn" @click="showEvaluateEdit=false">取消</div>
          </div>
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
    };
  },
  props: ['evaluateInfo'],
  computed: {},
  created() {},
  methods: {
    editEvaluate: function(){
      this.eva.evaluate = this.evaluateInfo.evaluate;
      this.showEvaluateEdit = true;
    },
    saveEvaluate: function(){
      this.showEvaluateInfo = false;
      this.evaluateInfo.evaluate = this.eva.evaluate;
      this.$store.dispatch('SET_BASEINFO',  this.evaluateInfo).then(res => {
        this.showEvaluateEdit = false;
      }).catch(err => {
        console.log(err)
      })
    },
  },
  watch: {},
  components: {}
};
</script>
<style lang="less" scope>

</style>

