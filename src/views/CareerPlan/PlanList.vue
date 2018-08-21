<template>
	<div class="planlist-page">
		<headerNav></headerNav>
		<div class="container">
			<div class="top">
				<span>规划表</span>
				<div class="btn-box">
					<el-button type="default" size="small" round @click="prevTerm" v-if="termIndex!=0">上学期</el-button>
					<el-button type="primary" size="small" round @click="nextTerm" v-if="termIndex!=planList.length-1">下学期</el-button>
				</div>
			</div>
			<div class="content">
				<div class="banner">
					<img src="../../assets/images/plan_bg.jpg" alt="">
					<div class="banner-text">
						<div class="term-title" v-for="term in termPlan" :key="term.stage" v-if="termIndex+1==term.stage">{{term.title}}</div>
						<div class="term-split"></div>
						<div class="sub-title">Freshman last semester planning</div>
					</div>
				</div>
				<div class="plan-list">
					<div class="options-item" v-for="(options,index) in infoOptions" :key="index" v-if="options.showPlanList">
						<div class="en">{{options.en}}</div>
						<div class="en-border"></div>
						<div class="options-title">{{options.optionsTitle}}</div>
						<div class="item" v-if="planInfoList[plan.type]?planInfoList[plan.type].length:''" v-for="(plan, subIndex) in options.planList" :key="subIndex">
							<div class="item-title">
								<span class="num">{{subIndex+1>=10?subIndex+1:'0'+(subIndex+1)}}</span>
								<span class="title">{{plan.title}}</span>
							</div>
							<div class="item-content" v-for="(item, idx) in planInfoList[plan.type]" :key="idx">
								<div class="item-plan">
									<div class="sign"></div>
									<div class="plan-box" v-if="plan.type=='requireds' || plan.type=='options' || plan.type=='selfs'">
										<div class="plan-top">
											<span class="name">{{item.courseName}}</span>
											<span class="score">计划分数：{{item.score}}分</span>
											<div class="operation" v-if="auth==1">
												<i class="iconfont icon-bianji" @click="perfect(item,plan.type)"></i>
												<!-- <i class="iconfont icon-yijiao" @click="transfer(item,plan.type)"></i> -->
												<el-dropdown trigger="click" >
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in termPlan" :key="term.stage" @click.native="transfer(term.stage,item,plan.type)">{{term.title}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" @click="deletePlan(item,plan.type)"></i>
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
											<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
												<div class="content-title">是否完成目标：</div>
												<div class="content-text red">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
											</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='profs'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation" v-if="auth==1">
												<i class="iconfont icon-bianji" @click="perfect(item,plan.type)"></i>
												<!-- <i class="iconfont icon-yijiao" @click="transfer(item,plan.type)"></i> -->
												<el-dropdown trigger="click" >
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in termPlan" :key="term.stage" @click.native="transfer(term.stage,item,plan.type)">{{term.title}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" @click="deletePlan(item,plan.type)"></i>
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
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">大赛总结：</div>
											<div class="content-text red">{{item.finish}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text red">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='pread'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation" v-if="auth==1">
												<i class="iconfont icon-bianji" @click="perfect(item,plan.type)"></i>
												<!-- <i class="iconfont icon-yijiao" @click="transfer(item,plan.type)"></i> -->
												<el-dropdown trigger="click" >
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in termPlan" :key="term.stage" @click.native="transfer(term.stage,item,plan.type)">{{term.title}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">阅读计划：</div>
											<div class="content-text">{{item.content}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">阅读感想：</div>
											<div class="content-text red">{{item.finish}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.progress">
											<div class="content-title">阅读进度：</div>
											<div class="content-text">
												<el-progress :percentage="Number(item.progress)"></el-progress>
											</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='officeSkills'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation" v-if="auth==1">
												<i class="iconfont icon-bianji" @click="perfect(item,plan.type)"></i>
												<!-- <i class="iconfont icon-yijiao" @click="transfer(item,plan.type)"></i> -->
												<el-dropdown trigger="click" >
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in termPlan" :key="term.stage" @click.native="transfer(term.stage,item,plan.type)">{{term.title}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.desc}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">计划总结：</div>
											<div class="content-text red">{{item.finish}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text red">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='vocations'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation" v-if="auth==1">
												<i class="iconfont icon-bianji" @click="perfect(item,plan.type)"></i>
												<!-- <i class="iconfont icon-yijiao" @click="transfer(item,plan.type)"></i> -->
												<el-dropdown trigger="click" >
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in termPlan" :key="term.stage" @click.native="transfer(term.stage,item,plan.type)">{{term.title}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>										
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.goal}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">计划总结：</div>
											<div class="content-text red">{{item.finish}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='internships'">
										<div class="plan-top">
											<div class="operation" v-if="auth==1">
												<i class="iconfont icon-bianji" @click="perfect(item,plan.type)"></i>
												<!-- <i class="iconfont icon-yijiao" @click="transfer(item,plan.type)"></i> -->
												<el-dropdown trigger="click" >
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in termPlan" :key="term.stage" @click.native="transfer(term.stage,item,plan.type)">{{term.title}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" @click="deletePlan(item,plan.type)"></i>
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
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">计划总结：</div>
											<div class="content-text red">{{item.finish}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='certificates'">
										<div class="plan-top">
											<span class="name">{{item.name}}</span>
											<div class="operation" v-if="auth==1">
												<i class="iconfont icon-bianji" @click="perfect(item,plan.type)"></i>
												<!-- <i class="iconfont icon-yijiao" @click="transfer(item,plan.type)"></i> -->
												<el-dropdown trigger="click" >
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in termPlan" :key="term.stage" @click.native="transfer(term.stage,item,plan.type)">{{term.title}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.content}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">计划总结：</div>
											<div class="content-text red">{{item.finish}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text red">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.pic">
											<div class="content-title" v-if="item.isEnd=='1'">证书图片：</div>
											<div class="content-title" v-if="item.isEnd!='1'">分数图片：</div>
											<div class="content-text">
												<img :src="item.pic" alt="">
											</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='additions'">
										<div class="plan-top">
											<span class="name">{{item.additionalName}}</span>
											<div class="operation" v-if="auth==1">
												<i class="iconfont icon-bianji" @click="perfect(item,plan.type)"></i>
												<!-- <i class="iconfont icon-yijiao" @click="transfer(item,plan.type)"></i> -->
												<el-dropdown trigger="click" >
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in termPlan" :key="term.stage" @click.native="transfer(term.stage,item,plan.type)">{{term.title}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content">
											<div class="content-title">计划目标：</div>
											<div class="content-text">{{item.additionalDesc}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">计划总结：</div>
											<div class="content-text red">{{item.finish}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text red">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
								</div>
								<div class="item-plan perfect" v-if="currentPlanId==item.id&&currentType==plan.type">
									<div class="plan-box" v-if="plan.type=='requireds'||plan.type=='options'||plan.type=='selfs'">
										<el-form :model="form" label-width="110px" label-position="left">
											<el-form-item label="实际分数：">
												<el-input v-model="form.sscore" size="small" placeholder="请输入分数" :maxlength="30" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="课程总结：">
												<el-input type="textarea" v-model="form.finish" size="small" placeholder="请输入总结(150个字以内)" :maxlength="150"></el-input>
											</el-form-item>
											<el-form-item label="是否完成目标：">
												<el-radio-group v-model="form.isEnd" size="small">
													<el-radio class="radio-end" label="1" border>已完成</el-radio>
													<el-radio class="radio-end" label="0" border >未完成</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type)">保存</el-button>
												<el-button size="small" @click="cancel()">取消</el-button>
											</el-form-item>
										</el-form>
									</div>
									<div class="plan-box" v-if="plan.type!='requireds'&&plan.type!='options'&&plan.type!='selfs'">
										<el-form :model="form" label-width="110px" label-position="left">
											<el-form-item label="计划总结：">
												<el-input type="textarea" v-model="form.finish" size="small" placeholder="请输入总结(150个字以内)" :maxlength="150"></el-input>
											</el-form-item>
											<el-form-item label="是否完成目标：" v-if="plan.type=='certificates'||plan.type=='officeSkills'">
												<el-radio-group v-model="form.isEnd" size="small">
													<el-radio class="radio-end" label="1" border>已完成</el-radio>
													<el-radio class="radio-end" label="0" border >未完成</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item label="阅读进度" class="progress-box" v-if="plan.type=='pread'">
												<el-input placeholder="请输入阅读进度(百分比)"  v-model="form.progress"></el-input>
												<el-progress :percentage="Number(form.progress)" color="#8e71c7"></el-progress>
											</el-form-item>
											<el-form-item :label="form.isEnd==1?'上传证书图片':'上传分数图片'" v-if="plan.type=='certificates'" class="upload-box">
												<el-upload
													class="avatar-uploader"
													:action="uploadUrl"
													:headers="uploadHeaders"
													:data="uploadData"
													:name="'multfile'"
													:show-file-list="false"
													:on-success="handleAvatarSuccess"
													>
													<img v-if="imageUrl" :src="imageUrl" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type)">保存</el-button>
												<el-button size="small" @click="cancel()">取消</el-button>
											</el-form-item>
										</el-form>
									</div>
								</div>
							</div>
						</div>
					</div>
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
	import axios from 'axios'
	import store from '../../store/index'
	export default {
		name: 'planList',
		data(){
			return {
				imageUrl: '',
				uploadUrl: axios.defaults.baseURL + '/file/headpic',
				uploadHeaders: {
					Authorization: store.getters.getToken
				},
				uploadData: {
					operaType: 'certificates'
				},
				userInfo: JSON.parse(localStorage.getItem("userInfo")),
				auth: '',
				planList: [],
				planInfoList: [],
				currentPlanInfo: {},
				currentType: '',
				currentPlanId: '',
				termIndex: 0,
				dialogVisible: false,
				showFormBox: false,
				form: {
					sscore: '',
					finish: '',
					isEnd: '',
					pic: '',
					progress: 0
				},
				infoOptions: [
					{
						optionsTitle: '专业学习计划',
						en: 'Professional learning plan',
						showPlanList: true,
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
						showPlanList: true,
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
						showPlanList: true,
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
						showPlanList: true,
						planList: [
							{
								type: "additions",
								title: "其他计划",
							}
						]
					},
				],
				termPlan: [
					{
						title: "大一上学期规划",
						stage: 1
					},
					{
						title: "大一下学期规划",
						stage: 2
					},
					{
						title: "大二上学期规划",
						stage: 3
					},
					{
						title: "大二下学期规划",
						stage: 4
					},
					{
						title: "大三上学期规划",
						stage: 5
					},
					{
						title: "大三下学期规划",
						stage: 6
					},
					{
						title: "大四上学期规划",
						stage: 7
					},
					{
						title: "大四下学期规划",
						stage: 8
					}
				],
			}
		},
		created(){
			this.getPlanList()
		},
		mounted(){},
		methods: {
			getPlanList(){
				let params = {
					userId: this.userInfo.id
				}
				this.$store.dispatch('PLANLIST', params).then(res => {
					this.planList = res.data;
					this.getPlanInfo(this.planList[this.termIndex].id);
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
				this.infoOptions.map(item => { item.showPlanList = true; })
        this.$store.dispatch('PLANINFO', params).then(res => {
					this.planInfoList = res.data;
					this.auth = res.data.auth;
					if(!this.planInfoList['requireds'].length && !this.planInfoList['options'].length && !this.planInfoList['selfs'].length && 
						!this.planInfoList['profs'].length && !this.planInfoList['pread'].length){
							this.infoOptions[0].showPlanList = false;
					}
					if(!this.planInfoList['officeSkills'].length && !this.planInfoList['vocations'].length && !this.planInfoList['internships'].length){
						this.infoOptions[1].showPlanList = false;
					}
					if(!this.planInfoList['certificates'].length){
						this.infoOptions[2].showPlanList = false;
					}
					if(!this.planInfoList['additions'].length){
						this.infoOptions[3].showPlanList = false;
					}
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
			//移交
			transfer(stage, item, type){
				this.currentPlanInfo = item;
				this.currentType = type;
				console.log(stage)
				let stageArr = []
				let currentTermId = ''
				this.planList.map(term => {
					stageArr.push(term.stage)
					if(term.stage == stage){
						currentTermId = term.id
					}
				})
				if(stageArr.indexOf(stage) == '-1'){
					this.$message({
						type: "error",
						message: "还未开启该学期计划，移交失败！"
					})
				}else {
					this.save(item, type, 'transfer', currentTermId)
				}
				
			},
			//完善编辑
			perfect(item, type){
				this.currentPlanInfo = item;
				this.currentType = type;
				this.currentPlanId = item.id;
				this.form = {
					sscore: '',
					finish: '',
					progress: '',
					isEnd: ''
				}
			},
			//保存
			save(item, type, org, planId){
				this.currentPlanInfo = item;
				this.currentType = type;
				let data = {}
				let errMessage = ''
				let successMessage = ''
				if(org == 'transfer'){
					data = {
						planId: planId,
						id: this.currentPlanInfo.id
					}
					errMessage = '移交失败！'
					successMessage = '移交成功！'
				}else {
					data = {
						id: this.currentPlanInfo.id,
						sscore: this.form.sscore,
						finish: this.form.finish,
						progress: this.form.progress,
						isEnd: this.form.isEnd
					}
					errMessage = '完善信息失败，请稍后重试！'
					successMessage = '修改信息成功！'
				}
				if(this.currentType == 'requireds' || this.currentType == 'selfs' || this.currentType == 'options' ){
					if(data.sscore == "" ) {
						this.$message({type: "error", message:"请输入实际分数！"})
						return;
					}else if(Number(data.sscore) != data.sscore || Number(data.sscore)>100 || Number(data.sscore)<0){
						this.$message({type: "error", message:"请输入0~100范围内的数字！"})
						return;
					}else if(data.finish == ""){
						this.$message({type: "error", message:"请输入课程总结！"})
						return;
					}else if(data.isEnd === ""){
						this.$message({type: "error", message:"请选择是否完成目标！"})
						return;
					}
				}
				if(this.currentType == 'requireds'){
					this.$store.dispatch('UPDATE_REQUIRED', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'selfs'){
					this.$store.dispatch('UPDATE_SELF', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'options'){
					this.$store.dispatch('UPDATE_OPTIONAL', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'profs'){
					if(data.finish == "" ) {
						this.$message({type: "error", message:"请输入计划总结！"})
						return;
					}
					this.$store.dispatch('UPDATE_PROF', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'pread'){
					if(data.finish == "" ) {
						this.$message({type: "error", message:"请输入计划总结！"})
						return;
					}else if(data.progress == ''){
						this.$message({type: "error", message:"请输入阅读进度！"})
						return;
					}else if(Number(data.progress) != data.progress || Number(data.progress)>100 || Number(data.progress)<0){
						this.$message({type: "error", message:"请输入0~100范围内的数字！"})
						return;
					}
					this.$store.dispatch('UPDATE_PREAD', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'officeSkills'){
					if(data.finish == ""){
						this.$message({type: "error", message:"请输入计划总结！"})
						return;
					}else if(data.isEnd === ""){
						this.$message({type: "error", message:"请选择是否完成目标！"})
						return;
					}
					this.$store.dispatch('UPDATE_OFFICE', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'vocations'){
					if(data.finish == ""){
						this.$message({type: "error", message:"请输入计划总结！"})
						return;
					}
					this.$store.dispatch('UPDATE_VOCATION', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'internships'){
					if(data.finish == ""){
						this.$message({type: "error", message:"请输入计划总结！"})
						return;
					}
					this.$store.dispatch('UPDATE_INTERNSHIP', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'certificates'){
					data.pic = this.imageUrl;
					if(data.finish == ""){
						this.$message({type: "error", message:"请输入计划总结！"})
						return;
					}else if(data.isEnd === ""){
						this.$message({type: "error", message:"请选择是否完成目标！"})
						return;
					}else if(data.pic == ''){
						this.$message({type: "error", message:"请上传证书或分数图片！"})
						return;
					}
					this.$store.dispatch('UPDATE_CERTIFICATE', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				else if(this.currentType == 'additions'){
					if(data.finish == ""){
						this.$message({type: "error", message:"请输入计划总结！"})
						return;
					}
					this.$store.dispatch('UPDATE_ADDITIONAL', data).then(res => {
						this.currentPlanId = '';
						this.getPlanList();
						this.$message({
							type: "success",
							message: successMessage
						})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({
								type: "error",
								message: err.data.msg
							});
						} else {
							this.$message({
								type: "error",
								message: errMessage
							});
						}
					})
				}
				
			},
			cancel(){
				this.currentPlanId = '';
			},
			deletePlan(item, type){
				this.currentPlanInfo = item;
				this.currentType = type;
				this.dialogVisible = true;
				console.log('info',this.currentPlanInfo)
			},
			confirmDeletePlan(){
				let data = {
					id: this.currentPlanInfo.id
				}
				if(this.currentType == 'requireds'){
					this.$store.dispatch('DELETE_REQUIRED', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'options'){
					this.$store.dispatch('DELETE_OPTIONAL', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'selfs'){
					this.$store.dispatch('DELETE_SELF', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'profs'){
					//专业大赛
					this.$store.dispatch('DELETE_PROF', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'pread'){
					//专业阅读
					this.$store.dispatch('DELETE_PREAD', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'officeSkills'){
					//办公技能
					this.$store.dispatch('DELETE_OFFICE', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'vocations'){
					//职业能力
					this.$store.dispatch('DELETE_VOCATION', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'internships'){
					//实习实践
					this.$store.dispatch('DELETE_INTERNSHIP', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'certificates'){
					//证书计划
					this.$store.dispatch('DELETE_CERTIFICATE', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
				else if(this.currentType == 'additions'){
					//其他计划
					this.$store.dispatch('DELETE_ADDITIONAL', data).then(res => {
						this.dialogVisible = false;
						this.getPlanList();
						this.$message({
							type: "success",
							message: "删除成功!"
						})
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
								message: "删除失败，请稍后重试！"
							});
						}
					})
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleAvatarSuccess(res, file) {
				console.log(res, file)
				this.imageUrl = res.data.rootPath + res.data.headPic
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
			nextTerm(){
				this.termIndex++;
				if(this.termIndex <= this.planList.length-1){
					this.getPlanInfo(this.planList[this.termIndex].id)
				}else {
					this.$message({
						type: "error",
						message: "没有了"
					})
				}
			},
			prevTerm(){
				this.termIndex--;
				if(this.termIndex == this.planList.length-1){
					this.$message({
						type: "error",
						message: "没有了"
					})
				}else {
					this.getPlanInfo(this.planList[this.termIndex].id)
				}
			}
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
				.btn-box {
					float: right;
					button {
						margin-left: 20px;
					}
				}
			}
			.content {
				width: 100%;
				background-color: #fff;
				.banner {
					width: 100%;
					height: 350px;
					background-color: lightblue;
					position: relative;
					img {
						width: 100%;
						height: 350px;
					}
					.banner-text {
						position: absolute;
						top: 110px;
						left: 230px;
						.term-title {
							font-size: 40px;
							margin-bottom: 20px;
						}
						.term-split {
							width: 60px;
							height: 4px;
							display: inline-block;
							border-bottom:4px solid @main-color-blue;
							margin-bottom: 20px;
						}
						.sub-title {
							font-size: 20px;
							color: #535A6C;
							line-height: 30px;
						}
					}
				}
				.plan-list {
					padding: 10px 50px;
					.red {
						color: red!important;
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
										.progress-box {
											.el-input {
												width: 200px;
											}
											.el-progress {
												width: 400px;
												margin-top: 20px;
												margin-left: 50px;
												display: inline-block;
											}
										}
										.upload-box {
											.avatar-uploader{
												width: 100px;
												height: 100px;
												border: 1px solid @main-color-border;
												.el-upload {
													border: 1px dashed #d9d9d9;
													border-radius: 6px;
													cursor: pointer;
													position: relative;
													overflow: hidden;
												}
												.el-upload:hover {
													border-color: #409EFF;
												}
												.avatar-uploader-icon {
													font-size: 28px;
													color: #8c939d;
													width: 100px;
													height: 100px;
													line-height: 100px;
													text-align: center;
												}
												.avatar {
													width: 100px;
													height: 100px;
													display: block;
												}

											} 
										}
									}
									.plan-top {
										margin-bottom: 5px;
										height: 26px;
										line-height: 26px;
										.name {
											font-weight: 600;
											color: @main-color-blue;
											margin-right: 40px;
											display: inline-block;
										}
										.score {
											font-weight: 600;
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
										width:100%;
										display: inline-block;
										.content-title {
											float: left;
											width: 110px;
											margin-top: 3px;
										}
										.content-text {
											color: #A2A9B8;
											margin-left: 110px;
											line-height: 22px;
											.el-progress {
												width: 400px;
												display: inline-block;
											}
											img {
												width: 200px;
												height: auto;
											}
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


