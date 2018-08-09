<template>
	<div class="plan-item">
		<div class="title">
        <span>必修课程</span>
      </div>
      <div class="form">
        <div class="input-list">
          <div class="input-box">
            <div class="name">课程名称</div>
            <el-input size="small" placeholder="请输入课程名称"></el-input>
            <el-select size="small" placeholder="item.placeholder">
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="desc-box" v-for="item in textareaBox" :key="item.name">
          <div class="name">{{item.name}}</div>
          <div class="desc">
            <textarea class="textarea" :placeholder="item.placeholder" :maxlength="item.maxlength"></textarea>
          </div>
        </div>
        <div class="post-btn">
          <div class="pager-btn left-btn">
            <i class="iconfont icon-arrow-left-line"></i>
          </div>
          <el-button size="small" class="complete-btn btn" @click="post()">完成</el-button>
          <div class="pager-btn right-btn">
            <i class="iconfont icon-arrow-right-line"></i>
          </div>
        </div>
      </div>
      <ul class="item-list">
        <li class="item">
          <div class="item-icon">
            <i class="el-icon-bell"></i>
          </div>
          <div class="item-title">
            <div class="name">会计</div>
            <div class="score">80</div>
          </div>
          <div class="item-desc">
            <div class="name">描述</div>
            <div class="desc-text">巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦
              巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦巴拉那两年贷款开始开发的结果公开部分国家的继父回家客户大部分控股是
              巴拉巴啦啦啦啦啦阿拉啦啦啦啦巴啦啦巴拉巴啦啦啦啦啦阿150</div>
          </div>
          <div class="item-del">
            <i class="el-icon-delete"></i>
          </div>
        </li>
        <li class="item">
          <div class="item-icon">
            <i class="el-icon-bell"></i>
          </div>
          <div class="item-title">
            <div class="name">会计</div>
            <div class="score">80</div>
          </div>
          <div class="item-desc">
            <div class="name">描述</div>
            <div class="desc-text">hjvfblnsdbnodaboi</div>
          </div>
        </li>
        <li class="item">
          <div class="item-icon">
            <i class="el-icon-bell"></i>
          </div>
          <div class="item-title">
            <div class="name">会计</div>
            <div class="score">80</div>
          </div>
          <div class="item-desc">
            <div class="name">描述</div>
            <div class="desc-text">hjvfblnsdbnodaboi</div>
          </div>
        </li>
        <li class="item">
          <div class="item-icon">
            <i class="el-icon-bell"></i>
          </div>
          <div class="item-title">
            <div class="name">会计</div>
            <div class="score">80</div>
          </div>
          <div class="item-desc">
            <div class="name">描述</div>
            <div class="desc-text">hjvfblnsdbnodaboi</div>
          </div>
        </li>
      </ul>
    </div>
	</div>
</template>
<script>
export default {
	name: 'planItem',
	data(){
		return {}
	},
	created(){},
	methods: {

	}
}
</script>
<style lang="less" scoped>
	.plan-item {
		width: 100%;
		height: 100%;
		background-color: #fff;
		overflow: hidden;
	}
</style>


