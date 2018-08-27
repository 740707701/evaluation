<template>
  <div class="myplan-page">
		<el-tabs v-model="activeName" >
			<el-tab-pane label="职业规划" name="first">
				<div class="plan-list">
					<div class="nodata" v-if="!planList.length">还没有任何数据~</div> 
          <div class="item modify-item" v-for="plan in planList" :key="plan.stage">
            <img src="../../assets/images/term.png" alt="">
            <div class="item-content">
              <div class="name">{{plan.stageName}}</div>
              <div class="name">{{plan.updateDate.slice(0,10)}}</div>
              <div class="status">状态：
                <span class="red" v-if="plan.state == '-1'">待提交</span>
                <span class="red" v-if="plan.state == 10">待审核</span>
                <span class="red" v-if="plan.auditScore">{{plan.auditScore}}分</span>
              </div>
              <div class="btn-box">
                <div class="operation-btn view-btn" @click="viewPlan(plan.stage)">查看</div>
              </div>
            </div>
            <div class="comment" v-if="plan.auditContent">评语：{{plan.auditContent}}</div>
          </div>
				</div>
			</el-tab-pane>
		</el-tabs>
  </div>
</template>
<script>
export default {
  name: "myplan",
  data() {
    return {
      activeName: "first",
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      planList: [],
    }
  },
  created(){
    this.getPlanList()
  },
  methods: {
    getPlanList(){
      let params = {
        userId: this.userInfo.id
      }
      this.$store.dispatch('PLANLIST', params).then(res => {
        this.planList = res.data;
      }).catch(err => {
        this.$message({
          type: "error",
          message: "获取规划列表失败，请稍后重试！"
        })
      })
    },
    viewPlan(stage){
      this.$router.push({name: 'planList', query: {stage: stage}})
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/colors.less");
.myplan-page {
  .nodata {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
  }
  .plan-list {
    width: 100%;
    font-size: 13px;
    padding:10px 20px;
    display: flex;
    -webkit-display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    
    .green {
      color: #5EBD96;
    }
    .red {
      color: #EB6A68;
    }
    .modify-item {
      width: 298px;
    }
    .item {
      padding: 10px;
      border-radius: 4px;
      box-shadow: 2px 0px 10px rgba(56, 127, 246, 0.15);
      margin-bottom: 10px;
      margin-right: 12px;
      display: inline-block;
      img {
        float: left;
        width: 50px;
        height: 55px;
      }
      .item-content {
        margin-left: 65px;
        line-height: 20px;
        padding-bottom: 32px;
        position: relative;
        .name {
          line-height: 24px;
        }
        .time {
          color: #DCDFE6;
        }
        .commont-title {
          color: #A2A9B8;
        }
        .comment {
          line-height: 20px;
          color: #A2A9B8;
        }
        .btn-box {
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .edit-btn {
          border: 1px solid @main-color-blue;
          color: @main-color-blue;
          margin-right: 10px;
        }
        .view-btn {
          background-color: @main-color-blue;
          color: #fff;
        }
        .operation-btn {
          padding: 0 15px;
          height: 26px;
          line-height: 27px;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
          display: inline-block;
          a {
            width: 100%;
            line-height: 30px;
            display: inline-block;
            color: #fff;
          }
        }
      }
      .comment {
        margin-top: 10px;
        padding-top: 10px;
        line-height: 20px;
        color: #A2A9B8;
        border-top: 1px solid @main-color-border;
      }
    }
  }
}
</style>

