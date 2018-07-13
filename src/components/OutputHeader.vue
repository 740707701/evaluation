<template>
	<div class="output-header">
		<div class="header-content">
      <router-link to="/">
        <img src="../assets/images/logo.svg" alt="" class="logo">
      </router-link>
			<router-link class="template" v-if="!isPreview" :to="`/templateList/${resumeId}`">模板商城</router-link>
			<div class="output" v-if="!isPreview" @click="dialogVisible=true">
				<i class="iconfont icon-daochu"></i>
				<span>在线导出</span>
			</div>
		</div>
		<el-dialog
      title="导出简历"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="export-content">
          <div class="export-title">请选择导出格式</div>
          <div class="export-type">
            <div class="type" @click="exportType='word'">
              <input type="radio" :checked="exportType=='word'">Word文档
            </div>
            <div class="type" @click="exportType='pdf'">
              <input type="radio" :checked="exportType=='pdf'">PDF文档
            </div>
          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="output">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: 'outputHeader',
	data(){
		return{
			exportType: "pdf", //默认pdf
      isPreview: false,
      applicationType: "",
      dialogVisible: false
		}
  },
  props: ["resumeId","templateId", "resumeName", "org"],
	created() {
		if (this.org == "preview") {
			this.isPreview = true;
		}
	},
	methods: {
    //导出
    output: function() {
      let params = {
        resumeId: this.resumeId,
        format: this.exportType
      };
      if (this.exportType == "word") {
        this.applicationType = "msword";
        axios
          .get(`resume/export/${this.resumeId}/${this.exportType}`+'?templateId=' + this.templateId, {
            responseType: "arraybuffer"
          })
          .then(res => {})
          .catch(err => {
            // console.log("err", err);
            if(err.status == 200){
              let blob = new Blob([err.data], {
                type: `application/${this.applicationType}`
              });
              let objectUrl = URL.createObjectURL(blob);
              let link = document.createElement("a");
              let fname = this.resumeName || "个人简历";
              link.href = objectUrl;
              link.setAttribute("download", fname);
              document.body.appendChild(link);
              link.click();
              this.dialogVisible = false;
            }else {
              this.$message({
                type: "error",
                message: "导出失败"
              })
            }
          });
      } else {
        this.applicationType = "pdf";
        this.getPdf()
        this.dialogVisible = false;
      }
    },
    //弹框 关闭按钮
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>
<style lang="less" scoped>
	@import "../assets/css/colors.less";
	.output-header {
    width: 1020px;
    margin: 0 auto;
		.header-content {
      height: 60px;
      .logo {
        float: left;
        width: 181px;
        height: 60px;
        margin-right: 10px;
      }
      .template {
        float: right;
        line-height: 60px;
        color: @main-color-blue;
        margin-left: 10px;
        cursor: pointer;
      }
      .output {
        float: right;
        height: 60px;
        line-height: 60px;
        margin-right: 10px;
        cursor: pointer;
        .iconfont {
          float: left;
          font-size: 26px;
          margin-right: 4px;
        }
      }
    }
    .export-content {
    .export-title {
      color: @main-color-gray;
      line-height: 30px;
    }
    .export-type {
      height: 50px;
      line-height: 50px;
      .type {
        width: 120px;
        padding: 0 10px;
        display: inline-block;
        cursor: pointer;
        input[type="radio"] {
          margin-right: 10px;
          margin-top: -3px;
          display: inline-block;
        }
      }
    }
    .confirm {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 20px auto 0 auto;
      cursor: pointer;
      color: #fff;
      border-radius: 4px;
      background-color: @main-color-blue;
    }
  }
	}
</style>


