<template>
	<div class="planlist-page">
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
						<div class="term-title" v-for="term in planList" :key="term.stage" v-if="planList[termIndex].stage==term.stage">{{term.stageName}}</div>
					</div>
				</div>
				<div class="edit-box" v-if="auth!==3">
					<span @click="editPlan()">
						<i class="iconfont icon-bianji" title="编辑"></i>编辑
					</span>
				</div>
				<div class="plan-list">
					<div class="options-item" v-for="(options,index) in infoOptions" :key="index" v-if="options.showPlanList">
						<div class="en">{{options.en}}</div>
						<div class="en-border"></div>
						<div class="options-title">{{options.optionsTitle}}</div>
						<div class="item" v-if="planInfoList[plan.type]?planInfoList[plan.type].length:''" v-for="(plan, subIndex) in options.planList" :key="subIndex">
							<div class="item-title" v-if="!plan.hideTitleNum">
								<span class="num">{{subIndex+1>=10?subIndex+1:'0'+(subIndex+1)}}</span>
								<span class="title">{{plan.title}}</span>
							</div>
							<div class="item-content" v-for="(item, idx) in planInfoList[plan.type]" :key="idx">
								<div class="item-plan">
									<div class="sign"></div>
									<div class="plan-box" v-if="plan.type=='requireds' || plan.type=='options' || plan.type=='selfs'">
										<div class="plan-top" v-if="!item.edit">
											<span class="name">{{item.courseName}}</span>
											<span class="score">计划分数：{{item.score}}分</span>
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">课程目标：</div>
											<div class="content-text">
												<pre>{{item.goal}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.sscore">
											<div class="content-title">实际分数：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.sscore}}分</div>
											<div class="plan-content perfect-content" v-if="item.finish">
												<div class="content-title">课程总结：</div>
												<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
													<pre>{{item.finish}}</pre>
												</div>
											</div>
											<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
												<div class="content-title">是否完成目标：</div>
												<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
											</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='profs'">
										<div class="plan-top" v-if="!item.edit">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">大赛目标：</div>
											<div class="content-text">
												<pre>{{item.goal}}</pre>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">参赛计划：</div>
											<div class="content-text">
												<pre>{{item.desc}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">大赛总结：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
												<pre>{{item.finish}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='thesiss'">
										<div class="plan-top" v-if="!item.edit">
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">计划内容：</div>
											<div class="content-text">
												<pre>{{item.content}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">实施总结：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
												<pre>{{item.finish}}</pre>
												</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='internships'">
										<div class="plan-top" v-if="!item.edit">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click"  v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">计划内容：</div>
											<div class="content-text">
												<pre>{{item.content}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">实施总结：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
												<pre>{{item.finish}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='pread'">
										<div class="plan-top" v-if="!item.edit">
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">图书阅读计划：</div>
											<div class="content-text">
												<pre>{{item.name}}</pre>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">碎片化学习计划：</div>
											<div class="content-text">
												<pre>{{item.content}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">阅读感想：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
												<pre>{{item.finish}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.progress">
											<div class="content-title">阅读进度：</div>
											<div class="content-text">
												<el-progress :percentage="Number(item.progress)"></el-progress>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='officeSkills'">
										<div class="plan-top" v-if="!item.edit">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">计划内容：</div>
											<div class="content-text">
												<pre>{{item.desc}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">实施总结：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
												<pre>{{item.finish}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='vocations'">
										<div class="plan-top" v-if="!item.edit">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>										
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">计划目标：</div>
											<div class="content-text">
												<pre>{{item.goal}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">实施总结：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
												<pre>{{item.finish}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									
									<div class="plan-box" v-if="plan.type=='certificates'">
										<div class="plan-top" v-if="!item.edit">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">计划内容：</div>
											<div class="content-text">
												<pre>{{item.content}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '考试通过': item.isEnd == '2'? '未参加考试': '考试未通过'}}</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.pic&&(item.isEnd==1||item.isEnd==0)">
											<div class="content-title" v-if="item.isEnd=='1'">证书图片：</div>
											<div class="content-title" v-if="item.isEnd=='0'">分数图片：</div>
											<div class="content-text">
												<img :src="item.pic" alt="">
											</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='lifes' || plan.type=='ships' || plan.type=='promotions'">
										<div class="plan-top" v-if="!item.edit">
											<span class="name">{{item.name}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">计划内容：</div>
											<div class="content-text">
												<pre>{{item.content}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">实施总结：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
												<pre>{{item.finish}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
									<div class="plan-box" v-if="plan.type=='additions'">
										<div class="plan-top" v-if="!item.edit">
											<span class="name">{{item.additionalName}}</span>
											<div class="operation">
												<i class="iconfont icon-bianji" title="编辑" v-if="auth!=3" @click="editPlan(item,plan.type)"></i>
												<i class="iconfont icon-perfect" title="实施总结" v-if="auth==1" @click="perfect(item,plan.type)"></i>
												<el-dropdown trigger="click" v-if="auth==1">
													<span class="el-dropdown-link">
														<i class="iconfont icon-yijiao" title="移交"></i>
													</span>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-for="term in planList" :key="term.stage" @click.native="transfer(term,item,plan.type)">{{term.stageName}}</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
												<i class="iconfont icon-delete" title="删除" v-if="auth==1" @click="deletePlan(item,plan.type)"></i>
											</div>
										</div>
										<div class="plan-content" v-if="!item.edit">
											<div class="content-title">计划内容：</div>
											<div class="content-text">
												<pre>{{item.additionalDesc}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.finish">
											<div class="content-title">实施总结：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">
												<pre>{{item.finish}}</pre>
											</div>
										</div>
										<div class="plan-content perfect-content" v-if="item.isEnd===0 || item.isEnd===1">
											<div class="content-title">是否完成目标：</div>
											<div class="content-text" :class="item.isEnd===1?'finish':'unfinish'">{{item.isEnd == '1'? '已完成':'未完成'}}</div>
										</div>
									</div>
								</div>
								<!--完善弹窗 -->
								<div class="item-plan perfect" v-if="!item.edit&&currentPlanId==item.id&&currentType==plan.type">
									<div class="plan-box" v-if="plan.type=='requireds'||plan.type=='options'||plan.type=='selfs'">
										<el-form :model="form" label-width="150px" label-position="left">
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
												<el-button size="small" type="primary" @click="save(item,plan.type,'prefect')">保存</el-button>
												<el-button size="small" @click="cancel()">取消</el-button>
											</el-form-item>
										</el-form>
									</div>
									<div class="plan-box" v-if="plan.type!='requireds'&&plan.type!='options'&&plan.type!='selfs'">
										<el-form :model="form" label-width="150px" label-position="left">
											<el-form-item label="实施总结：" v-if="plan.type!='profs'&&plan.type!='pread'&&plan.type!='certificates'">
												<el-input type="textarea" v-model="form.finish" size="small" placeholder="请输入总结(150个字以内)" :maxlength="150"></el-input>
											</el-form-item>
											<el-form-item label="大赛总结：" v-if="plan.type=='profs'">
												<el-input type="textarea" v-model="form.finish" size="small" placeholder="请输入总结(150个字以内)" :maxlength="150"></el-input>
											</el-form-item>
											<el-form-item label="阅读感想：" v-if="plan.type=='pread'">
												<el-input type="textarea" v-model="form.finish" size="small" placeholder="请输入总结(150个字以内)" :maxlength="150"></el-input>
											</el-form-item>
											<el-form-item label="阅读进度" class="progress-box" v-if="plan.type=='pread'">
												<el-input placeholder="请输入阅读进度(百分比)"  v-model="form.progress"></el-input>
												<el-progress :percentage="Number(form.progress)" color="#8e71c7"></el-progress>
											</el-form-item>
											
											<el-form-item label="是否完成目标：" v-if="plan.type!='certificates'">
												<el-radio-group v-model="form.isEnd" size="small">
													<el-radio class="radio-end" label="1" border>已完成</el-radio>
													<el-radio class="radio-end" label="0" border >未完成</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item label="是否完成目标：" v-if="plan.type==='certificates'">
												<el-radio-group v-model="form.isEnd" size="small">
													<el-radio class="radio-end" label="1" border>考试通过</el-radio>
													<el-radio class="radio-end" label="0" border >考试未通过</el-radio>
													<el-radio class="radio-end" label="2" border >未参加考试</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item :label="form.isEnd==1?'上传证书图片':'上传分数图片'" v-if="plan.type=='certificates'&&(form.isEnd==='1'||form.isEnd==='0')" class="upload-box">
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
												<el-button size="small" type="primary" @click="save(item,plan.type,'prefect')">保存</el-button>
												<el-button size="small" @click="cancel()">取消</el-button>
											</el-form-item>
										</el-form>
									</div>
								</div>
								<!--编辑弹窗 -->
								<!-- <div class="item-plan perfect" v-if="item.edit&&currentPlanId==item.id&&currentType==plan.type">
									<div class="plan-box">
										<el-form :model="item" label-width="110px" label-position="left" v-if="plan.type=='requireds'||plan.type=='options'||plan.type=='selfs'">
											<el-form-item label="课程名称：">
												<el-input v-model="curEditPlanInfo.courseName" size="small" placeholder="请输入课程名称" :maxlength="50" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="计划分数：">
												<el-input v-model="curEditPlanInfo.score" size="small" placeholder="请输入计划分数" :maxlength="10" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="课程目标：">
												<el-input type="textarea" v-model="curEditPlanInfo.goal" size="small" placeholder="请输入课程目标(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type,'edit')">保存</el-button>
												<el-button size="small" @click="editCancel(item)">取消</el-button>
											</el-form-item>
										</el-form>
										<el-form :model="item" label-width="150px" label-position="left" v-if="plan.type=='profs'">
											<el-form-item label="大赛名称：">
												<el-input v-model="curEditPlanInfo.name" size="small" placeholder="请输入大赛名称" :maxlength="50" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="大赛目标：">
												<el-input type="textarea" v-model="curEditPlanInfo.goal" size="small" placeholder="请输入大赛目标(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item label="参赛计划：">
												<el-input type="textarea" v-model="item.desc" size="small" placeholder="请输入大赛计划(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type,'edit')">保存</el-button>
												<el-button size="small" @click="cancel()">取消</el-button>
											</el-form-item>
										</el-form>
										<el-form :model="item" label-width="150px" label-position="left" v-if="plan.type=='pread'">
											<el-form-item label="书籍名称：">
												<el-input v-model="curEditPlanInfo.name" size="small" placeholder="请输入书籍名称" :maxlength="50" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="书籍类型：">
												<el-input v-model="curEditPlanInfo.type" size="small" placeholder="请输入书籍类型" :maxlength="30" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="阅读计划：">
												<el-input type="textarea" v-model="curEditPlanInfo.content" size="small" placeholder="请输入阅读计划(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type,'edit')">保存</el-button>
												<el-button size="small" @click="editCancel(item)">取消</el-button>
											</el-form-item>
										</el-form>
										<el-form :model="item" label-width="150px" label-position="left" v-if="plan.type=='officeSkills'">
											<el-form-item label="技能名称：">
												<el-input v-model="curEditPlanInfo.name" disabled size="small" placeholder="请输入技能名称" :maxlength="50" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="计划内容：">
												<el-input type="textarea" v-model="curEditPlanInfo.desc" size="small" placeholder="请输入计划内容(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type,'edit')">保存</el-button>
												<el-button size="small" @click="editCancel(item)">取消</el-button>
											</el-form-item>
										</el-form>
										<el-form :model="item" label-width="150px" label-position="left" v-if="plan.type=='vocations'">
											<el-form-item label="职业技能名称：">
												<el-input v-model="curEditPlanInfo.name" disabled size="small" placeholder="请输入职业技能名称" :maxlength="50" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="计划内容：">
												<el-input type="textarea" v-model="curEditPlanInfo.goal" size="small" placeholder="请输入计划内容(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type,'edit')">保存</el-button>
												<el-button size="small" @click="editCancel(item)">取消</el-button>
											</el-form-item>
										</el-form>
										<el-form :model="item" label-width="150px" label-position="left" v-if="plan.type=='internships'">
											<el-form-item label="计划内容：">
												<el-input type="textarea" v-model="curEditPlanInfo.content" size="small" placeholder="请输入计划内容(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item label="实习实践目标：">
												<el-input type="textarea" v-model="curEditPlanInfo.score" size="small" placeholder="请输入实习实践目标(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type,'edit')">保存</el-button>
												<el-button size="small" @click="editCancel(item)">取消</el-button>
											</el-form-item>
										</el-form>
										<el-form :model="item" label-width="150px" label-position="left" v-if="plan.type=='certificates'">
											<el-form-item label="证书名称：">
												<el-input v-model="curEditPlanInfo.name" disabled size="small" placeholder="请输入证书名称" :maxlength="50" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="计划内容：">
												<el-input type="textarea" v-model="curEditPlanInfo.content" size="small" placeholder="请输入计划内容(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type,'edit')">保存</el-button>
												<el-button size="small" @click="editCancel(item)">取消</el-button>
											</el-form-item>
										</el-form>
										<el-form :model="item" label-width="150px" label-position="left" v-if="plan.type=='additions'">
											<el-form-item label="计划名称：">
												<el-input v-model="curEditPlanInfo.additionalName" size="small" placeholder="请输入计划名称" :maxlength="50" class="form-input"></el-input>
											</el-form-item>
											<el-form-item label="计划内容：">
												<el-input type="textarea" v-model="curEditPlanInfo.additionalDesc" size="small" placeholder="请输入计划内容(500个字以内)" :maxlength="500"></el-input>
											</el-form-item>
											<el-form-item class="btn-box">
												<el-button size="small" type="primary" @click="save(item,plan.type,'edit')">保存</el-button>
												<el-button size="small" @click="editCancel(item)">取消</el-button>
											</el-form-item>
										</el-form>
									</div>
									<div class="plan-box" v-if="plan.type!='requireds'&&plan.type!='options'&&plan.type!='selfs'">
									</div>
								</div> -->
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
		<el-dialog
			title="提示"
			:visible.sync="transferDialog"
			width="30%"
			:before-close="handleClose">
			<span>是否确认移交？</span>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="transferDialog = false">取 消</el-button>
				<el-button size="small" type="primary" @click="confirmTransfer">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import { sysbelong } from '@/utils/index'
	import axios from 'axios'
	import store from '@/store/index'
	export default {
		name: 'planList',
		data(){
			return {
				imageUrl: '',
				uploadUrl: axios.defaults.baseURL + '/file/headpic',
				uploadHeaders: {
					Authorization: store.getters.getToken,
					plat: 'uwopai',
					sysbelong: sysbelong()
				},
				uploadData: {
					operaType: 'certificates'
				},
				userInfo: JSON.parse(localStorage.getItem("userInfo")),
				auth: '',
				cerficatesData: [],
				officeData: [],
				vocationsData: [],
				planList: [],
				planInfoList: [],
				currentPlanInfo: {},
				curEditPlanInfo: {},
				currentType: '',
				currentPlanId: '',
				currentStage: '',
				termIndex: 0,
				stage: 1,
				currentTerm: '',
				dialogVisible: false,
				showFormBox: false,
				transferDialog: false,
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
								title: "辅修课程"
							},
							{
								type: "profs",
								title: "专业大赛",
							},
							{
								type: "thesiss",
								title: "专业论文",
							},
							{
								type: "internships",
								title: "课外专业实践",
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
								title: "办公技能提升",
							},
							{
								type: "vocations",
								title: "职业软实力",
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
								hideTitleNum: true
							}
						]
					},
					{
						optionsTitle: '生活管理计划',
						en: 'Life Management plan',
						showPlanList: true,
						planList: [
							{
								type: "lifes",
								title: "生活管理计划",
								hideTitleNum: true
							}
						]
					},
					{
						optionsTitle: '背景提升计划',
						en: 'Background Upgrading Program',
						showPlanList: true,
						planList: [
							{
								type: "promotions",
								title: "背景提升计划",
								hideTitleNum: true
							}
						]
					},
					{
						optionsTitle: '人际关系与社交管理计划',
						en: 'Interpersonal relationship and social management plan',
						showPlanList: true,
						planList: [
							{
								type: "ships",
								title: "人际关系与社交管理计划",
								hideTitleNum: true
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
								hideTitleNum: true
							}
						]
					},
				]
			}
		},
		created(){
			this.stage = this.$route.query.stage
			this.getPlanList()
		},
		mounted(){},
		methods: {
			sysbelong() {
				return sysbelong()
			},
			getPlanList(){
				let params = {
					userId: this.userInfo.id
				}
				this.$store.dispatch('PLANLIST', params).then(res => {
					this.planList = res.data;
					this.planList.map((item,index)=>{
						if(item.stage == this.stage){
							this.termIndex = index
						}
					})
					this.getPlanInfo(this.planList[this.termIndex].id);
				}).catch(err => {
					if(res.data) {
						this.$message.error(res.data.msg)
					} else {
						this.$message.error('获取规划列表失败，请稍后重试！')
					}
				})
			},
			getPlanInfo(planId, stage){
				this.currentPlanId = planId
				this.currentStage = stage
        let params = {
          id: planId
				}
				this.infoOptions.map(item => { item.showPlanList = true; })
        this.$store.dispatch('PLANINFO', params).then(res => {
					this.planInfoList = res.data;
					// auth 1:可完善、移交 3：不可编辑
					this.auth = res.data.auth;
					if(!this.planInfoList['requireds'] && !this.planInfoList['options'] && !this.planInfoList['selfs'] && 
						!this.planInfoList['profs'] && !this.planInfoList['pread'] && !this.planInfoList['thesiss'] 
						&& !this.planInfoList['internships']){
							this.infoOptions[0].showPlanList = false;
					}
					if(!this.planInfoList['officeSkills'] && !this.planInfoList['vocations'] ){
						this.infoOptions[1].showPlanList = false;
					}
					if(!this.planInfoList['certificates']){
						this.infoOptions[2].showPlanList = false;
					}
					if(!this.planInfoList['lifes']){
						this.infoOptions[3].showPlanList = false;
					}
					if(!this.planInfoList['promotions']){
						this.infoOptions[4].showPlanList = false;
					}
					if(!this.planInfoList['ships']){
						this.infoOptions[5].showPlanList = false;
					}
					if(!this.planInfoList['additions']){
						this.infoOptions[6].showPlanList = false;
					}
        }).catch(err => {
          if (err.data) {
            this.$message({type: "error", message: err.data.msg});
          } else {
            this.$message({type: "error", message: "获取规划信息失败！"});
          }
        })
			},
			editPlan(item, type) {
				let planId, stage
				planId = item ? item.planId : '' || this.currentPlanId
				stage = this.currentStage || this.stage
				this.$router.push({path: '/careerplan', query: {planId: planId, termStage: stage}})
			},
			//编辑
			edit(item, type){
				this.$set(item, 'edit', true)
				for(let k in item){
					this.curEditPlanInfo[k] = item[k]
				}
				this.currentType = type;
				this.currentPlanId = item.id;
			},
			//移交
			transfer(term, item, type){
				this.currentTerm = term;
				this.currentPlanInfo = item;
				this.currentType = type;
				this.transferDialog = true;
			},
			confirmTransfer(){
				this.save(this.currentPlanInfo, this.currentType, 'transfer', this.currentTerm.id)
			},
			//完善编辑
			perfect(item, type){
				this.currentPlanInfo = item;
				this.currentType = type;
				this.currentPlanId = item.id;
				console.log(type)
				this.imageUrl = '';
				this.form = {
					sscore: '',
					finish: '',
					progress: '',
					isEnd: ''
				}
			},
			//保存
			save(item, type, org, planId){
				this.currentType = type;
				
				let data = {}
				let errMessage = ''
				let successMessage = ''
				if(org == 'transfer'){
					data = {
						planId: planId,
						id: item.id
					}
					errMessage = '移交失败，请稍后重试！'
					successMessage = '移交成功！'
				}else if(org == 'edit'){
					data = this.curEditPlanInfo
					errMessage = '更新信息失败，请稍后重试！'
					successMessage = '更新信息成功！'
				}else if(org == 'prefect'){
					data = {
						id: item.id,
						sscore: this.form.sscore,
						finish: this.form.finish,
						progress: this.form.progress,
						isEnd: Number(this.form.isEnd)
					}
					errMessage = '完善信息失败，请稍后重试！'
					successMessage = '完善信息成功！'
				}
				
				if(this.currentType == 'requireds' || this.currentType == 'selfs' || this.currentType == 'options' ){
					if(org == 'prefect'){
						if(data.sscore == "" ) {
							this.$message({type: "error", message:"请输入实际分数！"})
							return false;
						}else if(Number(data.sscore) != data.sscore || Number(data.sscore)>100 || Number(data.sscore)<0){
							this.$message({type: "error", message:"请输入0~100范围内的数字！"})
							return false;
						}else if(data.finish == ""){
							this.$message({type: "error", message:"请输入课程总结！"})
							return false;
						}else if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}else if(org == 'edit'){
						if(data.courseName == ""){
							this.$message({type: "error", message:"请输入课程名称！"})
							return false;
						}else if(data.score == ""){
							this.$message({type: "error", message:"请输入计划分数！"})
							return false;
						}else if(Number(data.score) != data.score || Number(data.score)>100 || Number(data.score)<0){
							this.$message({type: "error", message:"计划分数，请输入0~100范围内的数字！"})
							return false;
						}
					}
				}
				
				if(this.currentType == 'requireds'){
					this.$store.dispatch('UPDATE_REQUIRED', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'selfs'){
					this.$store.dispatch('UPDATE_SELF', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'options'){
					this.$store.dispatch('UPDATE_OPTIONAL', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'profs'){
					if(org == 'prefect'){
						if(data.finish == "" ) {
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						}
						if(data.isEnd === "" ) {
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}else if(org == 'edit'){
						if(data.name == ""){
							this.$message({type: "error", message:"请输入大赛名称！"})
							return false;
						}else if(data.goal == ""){
							this.$message({type: "error", message:"请输入大赛目标！"})
							return false;
						}else if(data.desc == ""){
							this.$message({type: "error", message:"请输入参赛计划！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_PROF', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'pread'){
					if(org == 'prefect'){
						if(data.finish == "" ) {
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						}else if(data.progress == ''){
							this.$message({type: "error", message:"请输入阅读进度！"})
							return false;
						}else if(Number(data.progress) != data.progress || Number(data.progress)>100 || Number(data.progress)<0){
							this.$message({type: "error", message:"请输入0~100范围内的数字！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_PREAD', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'thesiss') {
					this.$store.dispatch('UPDATE_PROFTHESIS', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}

				else if(this.currentType == 'officeSkills'){
					console.log(this.currentType)
					if(org == 'prefect'){
						if(data.finish == ""){
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						} else if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}else if(org == 'edit'){
						if(data.name == ""){
							this.$message({type: "error", message:"请选择技能名称！"})
							return false;
						}else if(data.desc == ""){
							this.$message({type: "error", message:"请输入计划内容！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_OFFICE', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'vocations'){
					if(org == 'prefect'){
						if(data.finish == ""){
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						} else if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}else if(org == 'edit'){
						if(data.name == ""){
							this.$message({type: "error", message:"请选择职业技能名称！"})
							return false;
						}else if(data.goal == ""){
							this.$message({type: "error", message:"请输入计划内容！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_VOCATION', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'internships'){
					if(org == 'prefect') {
						if(data.finish == ""){
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						} else if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}else if(org == 'edit'){
						if(data.content == ""){
							this.$message({type: "error", message:"请输入计划内容！"})
							return false;
						}else if(data.score == ""){
							this.$message({type: "error", message:"请输入实习实践目标！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_INTERNSHIP', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'certificates'){
					if(org == 'prefect'){
						data.pic = data.isEnd === 2 ? '' : this.imageUrl;
						if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}else if(data.pic == '' && data.isEnd !== 2){
							this.$message({type: "error", message:"请上传证书或分数图片！"})
							return false;
						}
					}else if(org == 'edit'){
						if(data.name == ""){
							this.$message({type: "error", message:"请选择证书名称！"})
							return false;
						}else if(data.content == ""){
							this.$message({type: "error", message:"请输入计划内容！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_CERTIFICATE', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'lifes'){
					if(org == 'prefect') {
						if(data.finish == ""){
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						} else if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_LIFEMANAGEMENT', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'ships'){
					if(org == 'prefect') {
						if(data.finish == ""){
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						} else if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_INTERPERSONALRELATIONSHIP', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'promotions'){
					if(org == 'prefect') {
						if(data.finish == ""){
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						} else if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_BGPROMOTION', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				else if(this.currentType == 'additions'){
					if(org == 'prefect') {
						if(data.finish == ""){
							this.$message({type: "error", message:"请输入实施总结！"})
							return false;
						} else if(data.isEnd === ""){
							this.$message({type: "error", message:"请选择是否完成目标！"})
							return false;
						}
					}
					this.$store.dispatch('UPDATE_ADDITIONAL', data).then(res => {
						this.currentPlanId = '';
						this.transferDialog = false;
						this.getPlanInfo(this.planList[this.termIndex].id);
						this.$message({type: "success", message: successMessage})
					}).catch(err => {
						if (err.data.msg) {
							this.$message({type: "error", message: err.data.msg});
						} else {
							this.$message({type: "error", message: errMessage});
						}
					})
				}
				
			},
			cancel(){
				this.currentPlanId = '';
			},
			editCancel(item){
				item.edit = false;
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
				let methodName = ''
				if(this.currentType == 'requireds') { methodName = 'DELETE_REQUIRED'}
				else if(this.currentType == 'options') { methodName = 'DELETE_OPTIONAL' }
				else if(this.currentType == 'selfs') { methodName = 'DELETE_SELF' }
				else if(this.currentType == 'profs') { methodName = 'DELETE_PROF' }
				else if(this.currentType == 'pread') { methodName = 'DELETE_PREAD' }
				else if(this.currentType == 'officeSkills') { methodName = 'DELETE_OFFICE' }
				else if(this.currentType == 'vocations') { methodName = 'DELETE_VOCATION' }
				else if(this.currentType == 'internships') { methodName = 'DELETE_INTERNSHIP' }
				else if(this.currentType == 'certificates') { methodName = 'DELETE_CERTIFICATE' }
				else if(this.currentType == 'thesiss') { methodName = 'DELETE_PROFTHESIS' }
				else if(this.currentType == 'lifes') { methodName = 'DELETE_LIFEMANAGEMENT' }
				else if(this.currentType == 'ships') { methodName = 'DELETE_INTERPERSONALRELATIONSHIP' }
				else if(this.currentType == 'promotions') { methodName = 'DELETE_BGPROMOTION' }
				else if(this.currentType == 'additions') { methodName = 'DELETE_ADDITIONAL' }
				// 调用删除方法
				this.$store.dispatch(methodName, data).then(res => {
					this.dialogVisible = false;
					this.getPlanList();
					this.$message({type: "success", message: "删除成功!"})
				}).catch(err =>{
					console.log(err)
					if (err.data.msg) {
						this.$message({type: "error", message: err.data.msg});
					} else {
						this.$message({type: "error", message: "删除失败，请稍后重试！"});
					}
				})
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
				if(this.termIndex <= this.planList.length-1){
					this.termIndex++
					this.getPlanInfo(this.planList[this.termIndex].id, this.planList[this.termIndex].stage)
				}else {
					this.$message({type: "error", message: "没有了"})
				}
			},
			prevTerm(){
				this.termIndex--
				if(this.termIndex == this.planList.length-1){
					this.$message({type: "error", message: "没有了"})
				}else {
					this.getPlanInfo(this.planList[this.termIndex].id, this.planList[this.termIndex].stage)
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "../../assets/css/colors.less";
	.planlist-page {
		width: 100%;
		min-height: calc(100vh - 60px);
		padding-bottom: 25px;
		background-color: @main-color-bg;
		.container {
			width: 1200px;
			margin: 0 auto;
			padding-top: 20px;
			.top {
				width: 100%;
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				border-left: 2px solid @main-color-blue;
				margin-bottom: 20px;
				background-color: #fff;
				.btn-box {
					float: right;
					button {
						margin-left: 20px;
					}
				}
			}
			.unfinish {
				color: red!important;
			}
			.finish {
				color: #A2A9B8!important;
			}
			.content {
				width: 100%;
				background-color: #fff;
				.banner {
					width: 100%;
					height: 350px;
					position: relative;
					img {
						width: 100%;
						height: 350px;
					}
					.banner-text {
						position: absolute;
						top: 150px;
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
				.edit-box {
					line-height: 30px;
					border-top: 10px solid @main-color-bg;
					text-align: right;
					padding-right: 50px;
					span {
						line-height: 30px;
						padding: 0 10px;
						cursor: pointer;
						display: inline-block;
					}
					i {
						color: @main-color-blue;
						margin-right: 5px;
					}
				}
				.plan-list {
					height: 100%;
					padding: 0 50px;
					margin-top: 10px;
					.red {
						color: red!important;
					}
					.options-item {
						margin-bottom: 30px;
						.en {
							font-size: 18px;
							font-weight: 600;
							line-height: 30px;
						}
						.en-border {
							width:20px;
							height: 2px;
							border-bottom: 1px solid @main-color-blue;
						}
						.options-title {
							font-size: 16px;
							line-height: 40px;
						}
						.item {
							margin-bottom: 10px;
							.item-title {
								margin-bottom: 10px;
								.num {
									font-size: 30px;
								}
								.title {
									width: 68px;
									line-height: 18px;
									font-size: 14px;
									font-weight: bold;
									display: inline-block;
								}
							}
							.item-content:last-child {
								.item-plan {
									border: none!important;
								}
							}
							.item-content {
								margin-left: 9px;
								.item-plan {
									border-left: 1px dotted @main-color-blue;
									position: relative;
									.sign {
										width: 16px;
										height: 16px;
										background-color:#fff;
										border-radius: 10px;
										background-color: #fff;
										border: 4px solid #F09D3D;
										position: absolute;
										top: 0px;
										left: -8px;
									}
									.plan-box {
										padding: 0px 30px 10px 30px;
										position: relative;
										.operation {
											position: absolute;
											top: 0;
											right: 0;
											.icon-bianji {
												color: #3477f6;
											}
											.icon-perfect {
												color: goldenrod;
											}
											.icon-delete {
												color: #db3529;
											}
											.icon-yijiao {
												color: #f09d3d;
											}
											i {
												font-size: 18px;
												margin-right: 10px;
												cursor: pointer;
											}
										}
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
										span {
											display: inline-block;
											height: 30px;
											line-height: 24px;
										}
										.name {
											min-width: 140px;
											max-width: 85%;
											font-weight: 600;
											color: @main-color-blue;
											margin-right: 10px;
										}
										.score {
											font-weight: 600;
										}
										
									}
									.plan-content {
										width:100%;
										display: inline-block;
										.content-title {
											float: left;
											width: 150px;
											margin-top: 5px;
										}
										.content-text {
											color: #A2A9B8;
											margin-left: 150px;
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


