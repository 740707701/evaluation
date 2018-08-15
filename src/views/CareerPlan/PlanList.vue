<template>
	<div class="planlist-page">
		<headerNav></headerNav>
		<div class="container">
			<div class="top">
				<span>规划表</span>
			</div>
			<div class="content">
				<div class="banner">
					<img src="../../assets/images/resume_bg.jpg" alt="">
				</div>
				<div class="plan-list">
					<div class="options-item" v-for="(options,index) in infoOptions" :key="index">
						<div class="en">{{options.en}}</div>
						<div class="en-border"></div>
						<div class="options-title">{{options.optionsTitle}}</div>
						<div class="item" v-if="planInfoList[plan.type]?planInfoList[plan.type].length:''" v-for="(plan, subIndex) in options.planList" :key="subIndex">
							<div class="item-title">
								<span class="num">0{{subIndex+1}}</span>
								<span class="title">{{plan.title}}</span>
							</div>
							<div class="item-content" v-for="(item, idx) in planInfoList[plan.type]" :key="idx">
								<div class="item-plan">
									<div class="sign"></div>
									<div class="plan-box" v-if="plan.type=='requireds' || plan.type=='options' || plan.type=='selfs'">
										<div class="plan-top">
											<span class="name">{{item.courseName}}</span>
											<span class="score">计划分数：{{item.score}}分</span>
											<div class="operation">
												<i class="iconfont icon-bianji" @click="perfect(item)"></i>
												<i class="iconfont icon-yijiao" @click="transfer(item)"></i>
												<i class="iconfont icon-delete" @click="deletePlan(item)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">课程目标：</div>
											<div class="content-text">{{item.goal}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.sscore">
											<div class="content-title">实际分数：</div>
											<div class="content-text red">{{item.sscore}}分</div>
											<div class="plan-content perfect-content" v-if="item.finish">
												<div class="content-title">课程总结：</div>
												<div class="content-text red">{{item.finish}}</div>
											</div>
											<div class="plan-content perfect-content" v-if="item.isEnd">
												<div class="content-title">是否完成目标：</div>
												<div class="content-text red">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
											</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='profs'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" @click="perfect(item)"></i>
												<i class="iconfont icon-yijiao" @click="transfer(item)"></i>
												<i class="iconfont icon-delete" @click="deletePlan(item)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">大赛目标：</div>
											<div class="content-text">{{item.goal}}</div>
										</div>
										<div class="plan-content">
											<div class="content-title">参赛计划：</div>
											<div class="content-text">{{item.desc}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='pread'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" @click="perfect(item)"></i>
												<i class="iconfont icon-yijiao" @click="transfer(item)"></i>
												<i class="iconfont icon-delete" @click="deletePlan(item)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">阅读计划：</div>
											<div class="content-text">{{item.content}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='officeSkills'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" @click="perfect(item)"></i>
												<i class="iconfont icon-yijiao" @click="transfer(item)"></i>
												<i class="iconfont icon-delete" @click="deletePlan(item)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.desc}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='vocations'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" @click="perfect(item)"></i>
												<i class="iconfont icon-yijiao" @click="transfer(item)"></i>
												<i class="iconfont icon-delete" @click="deletePlan(item)"></i>
											</div>
										</div>										
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.desc}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='internships'">
										<div class="plan-top">
											<div class="operation">
												<i class="iconfont icon-bianji" @click="perfect(item)"></i>
												<i class="iconfont icon-yijiao" @click="transfer(item)"></i>
												<i class="iconfont icon-delete" @click="deletePlan(item)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">实践内容：</div>
											<div class="content-text">{{item.content}}</div>
										</div>
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.score}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='certificates'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" @click="perfect(item)"></i>
												<i class="iconfont icon-yijiao" @click="transfer(item)"></i>
												<i class="iconfont icon-delete" @click="deletePlan(item)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.content}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='additions'">
										<div class="plan-top">
											<span class="name">{{item.additionalName}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" @click="perfect(item)"></i>
												<i class="iconfont icon-yijiao" @click="transfer(item)"></i>
												<i class="iconfont icon-delete" @click="deletePlan(item)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.additionalDesc}}</div>
										</div>
									</div>
								</div>
								<div class="item-plan perfect" v-if="showFormBox">
									<div class="plan-box" v-if="plan.type=='requireds'||plan.type=='options'||plan.type=='selfs'">
										<el-form :model="form" label-width="110px" label-position="left">
											<el-form-item label="实际分数：">
												<el-input v-model="form.score" size="small" placeholder="请输入分数" :maxlength="30" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="课程总结：">
												<el-input type="textarea" v-model="form.finish" size="small" placeholder="请输入总结(150个字以内)" :maxlength="150"></el-input>
											</el-form-item>
											<el-form-item label="是否完成目标：">
												<el-radio-group v-model="form.end" size="small">
													<el-radio class="radio-end" label="1" border>已完成</el-radio>
													<el-radio class="radio-end" label="2" border >未完成</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save">保存</el-button>
											</el-form-item>
										</el-form>
									</div>
								</div>
								<div class="item-plan perfect" v-if="showFormBox">
									<div class="plan-box" v-if="plan.type!='requireds'&&plan.type!='options'&&plan.type!='selfs'">
										<el-form :model="form" label-width="110px" label-position="left">
											<el-form-item label="计划总结：">
												<el-input type="textarea" v-model="form.finish" size="small" placeholder="请输入总结(150个字以内)" :maxlength="150"></el-input>
											</el-form-item>
											<el-form-item label="是否完成目标：">
												<el-radio-group v-model="form.end" size="small">
													<el-radio class="radio-end" label="1" border>已完成</el-radio>
													<el-radio class="radio-end" label="2" border >未完成</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save">保存</el-button>
											</el-form-item>
										</el-form>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="options-item">
						<div class="en">Professional learning plan</div>
						<div class="en-border"></div>
						<div class="options-title">专业学习计划</div>
						<div class="item">
							<div class="item-title">
								<span class="num">01</span>
								<span class="title">专业课程</span>
							</div>
							<div class="item-content">
								<div class="item-plan">
									<div class="sign"></div>
									<div class="plan-box">
										<div class="plan-top">
											<span class="name">金融分析师概念课</span>
											<span class="score">计划分数：80分</span>
											<div class="operation">
												<i class="iconfont icon-delete"></i>
												<i class="iconfont icon-yijiao"></i>
												<i class="iconfont icon-delete"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">课程目标：</div>
											<div class="content-text">不知道要经历多少苦难，才能走上正常的生活轨迹，光是追求普通生活已经是这么困难。
												我现在所谈论的只是对于一般大学生，那种出类拔萃，或者他是富二代的免谈，毕竟没什么可比性，也没有谈论的价值。</div>
										</div>
										<div class="plan-content perfect-content">
											<div class="content-title">实际分数：</div>
											<div class="content-text red">80分</div>
											<div class="plan-content perfect-content">
												<div class="content-title">课程目标：</div>
												<div class="content-text red">不知道要经历多少苦难，才能走上正常的生活轨迹，光是追求普通生活已经是这么困难。
													我现在所谈论的只是对于一般大学生，那种出类拔萃，或者他是富二代的免谈，毕竟没什么可比性，也没有谈论的价值。
												</div>
											</div>
											<div class="plan-content perfect-content">
												<div class="content-title">是否完成目标：</div>
												<div class="content-text red">已完成</div>
											</div>
										</div>
									</div>
								</div>
								<div class="item-plan perfect">
									<div class="sign"></div>
									<div class="plan-box">
										<div class="plan-top">
											<span class="name">金融分析师概念课</span>
											<span class="score">计划分数：80分</span>
										</div>
										<el-form :model="form" label-width="110px">
											<el-form-item label="实际分数：">
												<el-input v-model="form.score" size="small"></el-input>
											</el-form-item>
											<el-form-item label="课程总结：">
												<el-input type="textarea" v-model="form.finish" size="small"></el-input>
											</el-form-item>
											<el-form-item label="是否完成目标：">
												<el-radio-group v-model="form.end" size="small">
													<el-radio class="radio-end" label="1" border>已完成</el-radio>
													<el-radio class="radio-end" label="2" border >未完成</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item>
												<el-button size="small" type="primary" @click="save">保存</el-button>
											</el-form-item>
										</el-form>
									</div>
								</div>
							</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<span>是否确认删除？</span>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="confirmDeletePlan">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import headerNav from '../../components/HeaderNav.vue'
	export default {
		name: 'planList',
		data(){
			return {
				userInfo: JSON.parse(localStorage.getItem("userInfo")),
				planList: [],
				planInfoList: [],
				currentPlanInfo: {},
				dialogVisible: false,
				showFormBox: false,
				form: {
					score: '',
					finsish: '',
					end: '1'
				},
				infoOptions: [
					{
						optionsTitle: '专业学习计划',
						en: 'Professional learning plan',
						planList: [
							{
								type: "requireds",
								title: "必修课程"
							},
							{
								type: "options",
								title: "选修课程"
							},
							{
								type: "selfs",
								title: "自学课程"
							},
							{
								type: "profs",
								title: "专业大赛",
							},
							{
								type: "pread",
								title: "专业阅读",
							},
						]
					},
					{
						optionsTitle: '职业能力计划',
						en: 'Vocational ability plan',
						planList: [
							{
								type: "officeSkills",
								title: "办公技能",
							},
							{
								type: "vocations",
								title: "职业能力",
							},
							{
								type: "internships",
								title: "实习实践",
							}
						]
					},
					{
						optionsTitle: '考证计划',
						en: 'Textual research plan',
						planList: [
							{
								type: "certificates",
								title: "考证计划",
							}
						]
					},
					{
						optionsTitle: '其他计划',
						en: 'Others plans',
						planList: [
							{
								type: "additions",
								title: "其他计划",
							}
						]
					},
				],
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
					this.planList = res.data
					this.getPlanInfo(this.planList[0].id)
					// this.planList.map((item, index) => {
					// 	this.getPlanInfo(item.id)
					// })
				}).catch(err => {
					this.$message({
						type: "error",
						message: "获取规划列表失败，请稍后重试！"
					})
				})
			},
			getPlanInfo(planId){
        let params = {
          id: planId
        }
        this.$store.dispatch('PLANINFO', params).then(res => {
          this.planInfoList = res.data;
					//合并自定义数据
					/*
					for(let plan in this.planInfoList){
						this.infoOptions.map((options, index) => {
							let planList = options.planList;
							planList.map((item, subIndex) => {
								if(this.planInfoList[plan].length &&
								 plan == planList[subIndex].type){
									 item[item.type+'List'] = this.planInfoList[plan]
								 }
							})
						})
					}
					*/
          console.log(this.infoOptions)
        }).catch(err => {
          console.log(err)
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取规划信息失败！"
            });
          }
        })
      },
			save(plan){},
			perfect(plan){
				this['showFormBox'+plan.id] = true;
			},
			transfer(plan){
				if(this.showFormBox){
					this.showFormBox = false
				}else {
					this.form.sscore = ''
					this.form.finish = ''
					this.showFormBox = true
				}
				let data = {
					sscore: this.form.sscore,
					finish: this.form.finish
				}
				if(plan.type == 'requireds'){
					this.$store.dispatch('UPDATE_REQUIRED', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				else if(plan.type == 'selfs'){
					this.$store.dispatch('UPDATE_SELFS', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				else if(plan.type == 'profs'){
					this.$store.dispatch('UPDATE_PROFS', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				else if(plan.type == 'pread'){
					this.$store.dispatch('UPDATE_PREAD', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				else if(plan.type == 'officeSkills'){
					this.$store.dispatch('UPDATE_OFFICE', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				else if(plan.type == 'vocations'){
					this.$store.dispatch('UPDATE_VOCATION', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				else if(plan.type == 'internships'){
					this.$store.dispatch('UPDATE_INTERNSHIP', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				else if(plan.type == 'certificates'){
					this.$store.dispatch('UPDATE_CERTIFICATE', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				else if(plan.type == 'additions'){
					this.$store.dispatch('UPDATE_ADDITIONAL', data).then(res => {
						this.showFormBox = false
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "信息失败，请稍后重试！"
							});
						}
					})
				}
				
			},
			deletePlan(item){
				this.currentPlanInfo = item;
				this.dialogVisible = true;
			},
			confirmDeletePlan(item){
				this.currentPlanInfo = item;
				let data = {
					id: this.currentPlanInfo.id
				}
				if(this.plan.type == 'requireds'){
					this.$store.dispatch('DELETE_REQUIRED', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'options'){
					this.$store.dispatch('DELETE_OPTIONAL', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'selfs'){
					this.$store.dispatch('DELETE_SELF', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'profs'){
					//专业大赛
					this.$store.dispatch('DELETE_PROF', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'pread'){
					//专业阅读
					this.$store.dispatch('DELETE_PREAD', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'officeSkills'){
					//办公技能
					this.$store.dispatch('DELETE_OFFICE', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'vocations'){
					//职业能力
					this.$store.dispatch('DELETE_VOCATION', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'internships'){
					//实习实践
					this.$store.dispatch('DELETE_INTERNSHIP', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'certificates'){
					//证书计划
					this.$store.dispatch('DELETE_CERTIFICATE', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'additions'){
					//其他计划
					this.$store.dispatch('DELETE_ADDITIONAL', data).then(res => {
						this.getPlanList()
					}).catch(err =>{
						console.log(err)
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: "获取计划列表失败！"
							});
						}
					})
				}
				else if(this.plan.type == 'otherPlans'){
					//附加计划
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
		},
		components: {
			headerNav
		}
	}
</script>
<style lang="less" scoped>
	@import url("../../assets/css/colors.less");
	.planlist-page {
		width: 100%;
		min-height: 100%;
		padding-top: 60px;
		background-color: @main-color-bg;
		.container {
			width: 1200px;
			margin: 0 auto;
			.top {
				width: 100%;
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				border-left: 2px solid @main-color-blue;
				margin: 20px 0;
				background-color: #fff;
			}
			.content {
				width: 100%;
				background-color: #fff;
				.banner {
					width: 100%;
					height: 290px;
					background-color: lightblue;
					img {
						width: 100%;
						height: 290px;
					}
				}
				.plan-list {
					padding: 10px 50px;
					.red {
						color: red;
					}
					.options-item {
						margin-bottom: 30px;
						.en {
							font-size: 20px;
							font-weight: 600;
							line-height: 30px;
						}
						.en-border {
							width:20px;
							height: 2px;
							border-bottom: 1px solid @main-color-blue;
							margin-bottom: 10px;
						}
						.options-title {
							font-size: 20px;
							line-height: 40px;
						}
						.item {
							margin-bottom: 20px;
							.item-title {
								margin-bottom: 10px;
								.num {
									font-size: 30px;
								}
								.title {
									width: 40px;
									line-height: 18px;
									font-size: 14px;
									font-weight: bold;
									display: inline-block;
								}
							}
							.item-content {
								margin-left: 9px;
								.item-plan {
									border-left: 1px dotted @main-color-blue;
									.sign {
										float: left;
										width: 16px;
										height: 16px;
										border-radius: 10px;
										background-color: #fff;
										border: 4px solid #F09D3D;
										margin-left: -9px;
									}
									.plan-box {
										padding: 0px 30px 10px 30px;
										.btn-box {
											text-align: center;
										}
										.form-input {
											width: 150px;
										}
									}
									.plan-top {
										margin-bottom: 5px;
										height: 26px;
										line-height: 26px;
										.name {
											color: @main-color-blue;
											margin-right: 40px;
											display: inline-block;
										}
										.score {
											font-weight: 500;
										}
										.operation {
											float: right;
											line-height: 30px;
											.icon-bianji {
												color: #3477f6;
											}
											.icon-delete {
												color: #db3529;
											}
											.icon-yijiao {
												color: #f09d3d;
											}
											i {
												font-size: 18px;
												margin-right: 15px;
												cursor: pointer;
											}
										}
									}
									.plan-content {
										.content-title {
											float: left;
											width: 110px;
											margin-top: 3px;
										}
										.content-text {
											margin-left: 130px;
											line-height: 22px;
										}
										
									}
									.perfect-content {
										padding: 5px 0;
									}
									.radio-end {
										span:first-child {
											display: none;
										}
										.el-radio__input, input[type='radio'] {
											display: none!important;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>


