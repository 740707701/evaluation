<template>
  <div class="resume-page">
    <headerNav></headerNav>
    <div class="container">
      <el-row :gutter="10" class="el-content">
        <el-col :span="3" class="left-content">
          <div class="grid-content">
            <div class="name-box">
              <div class="title">小峰峰 <span class="resume-text">(简历)</span></div>
              <div class="time">时间: 2013-05-01</div>
              <div class="operation">
                <div class="icon-box refresh">
                  <i class="iconfont icon-refresh"></i>
                  <div class="icon-text">刷新</div>
                </div>
                <div class="icon-box preview">
                  <i class="iconfont icon-yulan"></i>
                  <div class="icon-text">预览</div>
                </div>
              </div>
            </div>
            <ul class="tabs">
              <li :class="{'active':tabIndex==0}" @click="tabIndex=0">
                <a href="#base">
                  <i class="iconfont icon-user"></i>
                  <span>基本信息</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==1}" @click="tabIndex=1">
                <a href="#job">
                  <i class="iconfont icon-job"></i>
                  <span>求职意向</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==2}" @click="tabIndex=2">
                <a href="#work">
                  <i class="iconfont icon-work"></i>
                  <span>工作经验</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==3}" @click="tabIndex=3">
                <a href="#education">
                  <i class="iconfont icon-edu"></i>
                  <span>教育经历</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==4}" @click="tabIndex=4">
                <a href="#school">
                  <i class="iconfont icon-school"></i>
                  <span>在校情况</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==5}" @click="tabIndex=5">
                <a href="#skill">
                  <i class="iconfont icon-skill"></i>
                  <span>技能证书</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
              <li :class="{'active':tabIndex==6}" @click="tabIndex=6">
                <a href="#evaluate">
                  <i class="iconfont icon-evaluate"></i>
                  <span>自我评价</span>
                  <i class="el-icon-check"></i>
                </a>
              </li>
            </ul>
            <!-- <div class="save-close">
              <i class="iconfont icon-star"></i>
              <span>保存关闭</span>
            </div> -->
          </div>
        </el-col>
        <el-col :span="15" class="center-content">
          <div id="base" class="grid-content info-box" v-if="!showBaseInfoEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-user"></i>
                <span>基本信息</span>
              </div>
              <div class="base-content">
                <div class="avtar">
                  <img src="../assets/images/demo/05.jpg" alt="">
                </div>
                <div class="info-list">
                  <div class="name">
                    <span>小峰峰</span>
                    <i class="iconfont icon-edit right-icon" @click="editBaseInfo"></i>
                  </div>
                  <div class="status">
                    <span>现居住：上海</span>
                    <span>1年工作经验</span>
                    <span>男</span>
                    <span>28岁 (1991/05-8)</span>
                    <span>目前正在找工作</span>
                  </div>
                  <div class="concat">
                    <span>
                      <i class="iconfont icon-email"></i>123456789@123.com
                    </span>
                    <span>
                      <i class="iconfont icon-phone"></i>12343546546899
                    </span>
                    <span class="more" @click="showMoreBase=!showMoreBase">
                      {{showMoreBase?'收起':'更多'}}
                      <i v-if="showMoreBase==false" class="el-icon-arrow-down"></i>
                      <i v-if="showMoreBase==true" class="el-icon-arrow-up"></i>
                    </span>
                  </div>
                </div>
                <div class="more-info" v-if="showMoreBase">
                  <span class="arrow-top"></span>
                  <span>户口/国籍：上海市</span>
                  <span>婚姻状态：未婚</span>
                </div>
              </div>
            </div>
          </div>
          <div class="grid-content info-box edit-border" v-if="showBaseInfoEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-user"></i>
                <span>基本信息</span>
              </div>
              <div class="base-content">
                <div class="avtar edit-avatar">
                  <img src="../assets/images/demo/05.jpg" alt="">
                  <div class="text">修改头像</div>
                </div>
                <div class="edit-content baseinfo-content">
                  <ul class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">姓名：</span>
                        <el-input size="small" v-model="name" placeholder="请输入姓名" maxlength="10"></el-input>
                      </div>
                      <div class="input-box">
                        <span class="name">性别：</span>
                        <div class="el-input sex-box">
                          <el-radio v-model="sex" label="0">男</el-radio>
                          <el-radio v-model="sex" label="1">女</el-radio>
                        </div>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">出生日期：</span>
                         <el-date-picker size="small" class="select-box"
                          v-model="birth"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">手机：</span>
                        <el-input size="small" v-model="phone" placeholder="请输入手机号码" maxlength="11"></el-input>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">邮箱：</span>
                        <el-input  size="small" v-model="email" placeholder="请输入邮箱" maxlength="20"></el-input>
                      </div>
                      <div class="input-box">
                        <span class="name">籍贯：</span>
                        <el-select size="small"  v-model="native_place" placeholder="请选择" class="select-box">
                          <el-option 
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">工作年份：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="work_year"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">求职状态：</span>
                        <el-select size="small" v-model="job_status" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in jobStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">职业类型：</span>
                        <el-select size="small" v-model="career_type" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in careerTpye"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="input-box">
                        <span class="name">婚姻状态：</span>
                        <el-select size="small" v-model="marriage_status" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in marriageStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box text-left">
                        <span class="name">现居住：</span>
                        <el-input size="small" v-model="address" placeholder="请输入现居住地址"></el-input>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveBaseInfo">保存</div>
                    <div class="edit-btn cancel-btn" @click="showBaseInfoEdit=false">取消</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="job" class="grid-content info-box" v-if="!showJobIntensionEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-job"></i>
                <span>求职意向</span>
                <i class="iconfont icon-edit right-icon" @click="editJobIntension"></i>
              </div>
              <ul class="item-list" style="display:none">
                <li>
                  <span class="item">
                    <span class="name">期望工资： </span>3500-5000元/月
                  </span>
                  <span class="item">
                    <span class="name">工作地点： </span>上海市
                  </span>
                </li>
                <li>
                  <span class="item">
                    <span class="name">职能/职位： </span>UI设计师/顾问
                  </span>
                  <span class="item">
                    <span class="name">工作类型：  </span>全职
                  </span>
                </li>
                <li>
                  <span class="item">
                    <span class="name">行业： </span>互联网/电子商务
                  </span>
                  <span class="item">
                    <span class="name">到岗时间： </span>一周之内
                  </span>
                </li>
              </ul>
              <div class="imperfect" v-if="!showJobIntensionEdit||true">
                <p class="perfect-text">完善求职意向，展现专业能力，让HR更了解你！</p>
                <el-button size="small" class="perfect-btn" @click="showJobIntensionEdit=true">开始完善</el-button>
              </div>
            </div>
          </div>
          <div class="grid-content info-box edit-border" v-if="showJobIntensionEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-job"></i>
                <span>求职意向</span>
              </div>
              <div class="base-content">
                <div class="edit-content">
                  <ul class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">期望薪资：</span>
                        <el-select size="small" v-model="expect_salary" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in salaryRange"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="input-box">
                        <span class="name">工作地点：</span>
                        <el-select size="small" v-model="expect_work_place" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">职能/职位：</span>
                        <el-select size="small" v-model="expect_position" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in positionType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="input-box">
                        <span class="name">行业：</span>
                        <el-select size="small" v-model="expect_industry" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in industryType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                     <li class="item">
                      <div class="input-box">
                        <span class="name">工作类型：</span>
                        <el-select size="small" v-model="expect_work_type" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in workType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="input-box">
                        <span class="name">到岗时间：</span>
                        <el-select size="small" v-model="arrive" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in arriveRange"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveJobIntension">保存</div>
                    <div class="edit-btn cancel-btn" @click="showJobIntensionEdit=false">取消</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="evaluate" class="grid-content info-box">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-evaluate"></i>
                <span>自我评价</span>
                <i class="iconfont icon-edit right-icon" v-if="!showEvaluateEdit" @click="editEvaluate"></i>
              </div>
              <div class="evaluate-box" v-if="!showEvaluateEdit" style="display:none">
                <div class="evaluate-text">1.HR可根据求职者经历过的公司来判断该求职者适合的工作氛围及已习得的工作方式，国企、上市公司、私企等的作息、工作饱和度均不同，若此公司为创业型公司，对一直在国企的员工求职也会考虑该求职者的抗压能力及稳定性。2.若公司全称不为人所熟知，但商标名称是大众所熟知的，可以使用商标名称，让HR可以对求职者所在行业能有一定的了解，以此判断该求职者是否为同行业或跨行业求职 </div>
              </div>
              <div class="evaluate-box edit-content" v-if="showEvaluateEdit">
                <textarea class="textarea edit-border" v-model="evaluate" placeholder="良好的自我评价，可以展现自身优势，让HR更了解你！">1.HR可根据求职者经历过的公司来判断该求职者适合的工作氛围及已习得的工作方式，国企、上市公司、私企等的作息、工作饱和度均不同，若此公司为创业型公司，对一直在国企的员工求职也会考虑该求职者的抗压能力及稳定性。2.若公司全称不为人所熟知，但商标名称是大众所熟知的，可以使用商标名称，让HR可以对求职者所在行业能有一定的了解，以此判断该求职者是否为同行业或跨行业求职  
                </textarea>
                <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveEvaluate">保存</div>
                    <div class="edit-btn cancel-btn" @click="showEvaluateEdit=false">取消</div>
                  </div>
              </div>
              <div class="imperfect" v-if="!showEvaluateEdit">
                <p class="perfect-text">完善自我评价，展现自身优势，让HR更了解你！</p>
                <el-button size="small" class="perfect-btn" @click="showEvaluateEdit=true">开始完善</el-button>
              </div>
            </div>
          </div>
          <div id="work" class="grid-content info-box" v-if="!showWorkExperiencedEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-work"></i>
                <span>工作经验</span>
                <div class="add-job" @click="showWorkExperiencedEdit=true">
                  <i class="iconfont icon-add"></i>新增工作
                </div>
              </div>
              <div class="job-item item-first" style="display:none">
                <div class="job-time">
                  <span class="gray">2018/3-2018/5</span>
                  <span>上海扶城金融公司</span>
                  <span>市场销售</span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit" @click="editWorkExper('0')"></i>
                    <i class="iconfont icon-delete" @click="deleteWorkExper('0')"></i>
                  </span>
                </div>
                <div class="job-type">
                  <span><span class="gray">公司类型：</span>互联网/教育</span>
                  <span><span class="gray">公司人数：</span>50-100人</span>
                  <span><span class="gray">公司性质：</span>民营企业</span>
                  <span><span class="gray">所属部门：</span>市场部</span>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">工作描述：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li class="desc-item">1、参与讨论对项目交互设计、界面结构、操作流程等撰写相关需求文档；</li>
                      <li class="desc-item">2、负责对App （B端＋C端）整体风格的定位，对用户视觉感受的整体把握和设计</li>
                      <li class="desc-item">3、负责好车伯乐web网站（前台＋后台）设计页面，整体表现风格的定位，对用户视觉感受的整体把握和设计</li>
                      <li class="desc-item">4、整理产品需求文档 撰写文档</li>
                      <li class="desc-item">5、制作各类活动广告设计（画册、单页、易拉宝、海报）</li>
                      <li class="desc-item">6、协助开发人员页面设计的调整与交互动画讨论</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="job-item" style="display:none">
                <div class="job-time">
                  <span class="gray">2018/3-2018/5</span>
                  <span>上海扶城金融公司</span>
                  <span>市场销售</span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit" @click="editWorkExper(1)"></i>
                    <i class="iconfont icon-delete" @click="deleteWorkExper(1)"></i>
                  </span>
                </div>
                <div class="job-type">
                  <span><span class="gray">公司类型：</span>互联网/教育</span>
                  <span><span class="gray">公司人数：</span>50-100人</span>
                  <span><span class="gray">公司性质：</span>民营企业</span>
                  <span><span class="gray">所属部门：</span>市场部</span>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">工作描述：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li class="desc-item">1、参与讨论对项目交互设计、界面结构、操作流程等撰写相关需求文档；</li>
                      <li class="desc-item">2、负责对App （B端＋C端）整体风格的定位，对用户视觉感受的整体把握和设计</li>
                      <li class="desc-item">3、负责好车伯乐web网站（前台＋后台）设计页面，整体表现风格的定位，对用户视觉感受的整体把握和设计</li>
                      <li class="desc-item">4、整理产品需求文档 撰写文档</li>
                      <li class="desc-item">5、制作各类活动广告设计（画册、单页、易拉宝、海报）</li>
                      <li class="desc-item">6、协助开发人员页面设计的调整与交互动画讨论</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="imperfect" v-if="!showWorkExperiencedEdit||true">
                <p class="perfect-text">完善工作经验，展现工作内容及能力，让HR更了解你！</p>
                <el-button size="small" class="perfect-btn" @click="showWorkExperiencedEdit=true">开始完善</el-button>
              </div>
            </div>
          </div>
          <div class="grid-content info-box edit-border" v-if="showWorkExperiencedEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-work"></i>
                <span>工作经验</span>
              </div>
              <div class="base-content">
                <div class="edit-content">
                  <ul class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">开始时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="work_start"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">结束时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="work_end"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">公司：</span>
                        <el-input size="small" v-model="company_name" placeholder="请输入公司" maxlength="30"></el-input>
                      </div>
                      <div class="input-box">
                        <span class="name">部门：</span>
                        <el-input size="small" v-model="department" placeholder="请输入部门" maxlenth="30"></el-input>
                      </div>
                    </li>
                     <li class="item">
                      <div class="input-box">
                        <span class="name">职能：</span>
                        <el-select size="small" v-model="fun" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in funType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="input-box">
                        <span class="name">行业：</span>
                        <el-select size="small" v-model="company_industry" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in industryType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                     <li class="item">
                      <div class="input-box">
                        <span class="name">职位：</span>
                        <el-input size="small" v-model="work_position" placeholder="所在职位" maxlenth="30"></el-input>
                      </div>
                      <div class="input-box">
                        <span class="name">公司规模：</span>
                        <el-select size="small" v-model="company_size" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in companySize"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">工作类型：</span>
                        <el-radio-group size="small" v-model="work_type">
                          <el-radio-button label="全职"></el-radio-button>
                          <el-radio-button label="兼职"></el-radio-button>
                        </el-radio-group>
                      </div>
                      <div class="input-box">
                        <span class="name">公司性质：</span>
                        <el-select size="small" v-model="company_nature" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in companyNature"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <li class="item work-desc-item">
                      <div class="input-box text-left">
                        <span class="name">工作描述：</span>
                        <div class="work-desc">
                          <textarea v-model="work_desc" maxlength="300" class="textarea" name="" id="" placeholder="描述你的职责范围、工作任务以及取得成绩"></textarea>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveWorkExper">保存</div>
                    <div class="edit-btn cancel-btn" @click="showWorkExperiencedEdit=false">取消</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="education" class="grid-content info-box" v-if="!showEducationEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-edu"></i>
                <span>教育经历</span>
                 <div class="add-job" @click="showEducationEdit=true">
                  <i class="iconfont icon-add"></i>新增教育
                </div>
              </div>
              <div class="job-item item-first" style="display: none">
                <div class="job-time">
                  <span class="gray">2012/9-2015/7</span>
                  <span>上海交通大学</span>
                  <span>视觉传达艺术设计（本科）</span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit" @click="editEducation('0')"></i>
                    <i class="iconfont icon-delete" @click="deleteEducation('0')"></i>
                  </span>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">专业描述：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li class="desc-item">运动学规律与制作 3D建模 动画制作等等，有绘画功底</li>
                    </ul>
                  </div>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">主修课程：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li class="desc-item">1.HR可根据求职者经历过的公司来判断该求职者适合的工作氛围及已习得的工作方式，国企、上市公司、私企等的作息、工作饱和度均不同，
                        若此公司为创业型公司，对一直在国企的员工求职也会考虑该求职者的抗压能力及稳定性。</li>
                      <li class="desc-item">2.若公司全称不为人所熟知，但商标名称是大众所熟知的，可以使用商标名称，让HR可以对求职者所在行业能有一定的了解，以此判断该求职者是否为同行业或跨行业求职</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="job-item" style="display: none">
                <div class="job-time">
                  <span class="gray">2012/9-2015/7</span>
                  <span>上海交通大学</span>
                  <span>视觉传达艺术设计（本科）</span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit" @click="editEducation('1')"></i>
                    <i class="iconfont icon-delete" @click="deleteEducation('1')"></i>
                  </span>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">专业描述：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li class="desc-item">运动学规律与制作 3D建模 动画制作等等，有绘画功底</li>
                    </ul>
                  </div>
                </div>
                <div class="job-desc">
                  <div class="desc-text gray">主修课程：</div>
                  <div class="desc-content">
                    <ul class="desc-list">
                      <li class="desc-item">1.HR可根据求职者经历过的公司来判断该求职者适合的工作氛围及已习得的工作方式，国企、上市公司、私企等的作息、工作饱和度均不同，
                        若此公司为创业型公司，对一直在国企的员工求职也会考虑该求职者的抗压能力及稳定性。</li>
                      <li class="desc-item">2.若公司全称不为人所熟知，但商标名称是大众所熟知的，可以使用商标名称，让HR可以对求职者所在行业能有一定的了解，以此判断该求职者是否为同行业或跨行业求职</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="imperfect" v-if="!showEducationEdit||true">
                <p class="perfect-text">完善教育经历，展现专业能力，让HR更了解你！</p>
                <el-button size="small" class="perfect-btn" @click="showEducationEdit=true">开始完善</el-button>
              </div>
            </div>
          </div>
          <div class="grid-content info-box edit-border" v-if="showEducationEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-edu"></i>
                <span>教育经历</span>
              </div>
              <div class="base-content">
                <div class="edit-content">
                  <ul class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">开始时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="edu_start"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">结束时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="edu_end"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box">
                        <span class="name">学校：</span>
                        <el-input size="small" v-model="school_name" placeholder="请输入学校" maxlength="30"></el-input>
                      </div>
                      <div class="input-box">
                        <span class="name">学历/学位：</span>
                        <el-select size="small" v-model="edu_degree" placeholder="请选择" class="select-box">
                          <el-option 
                          v-for="item in degreeType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          ></el-option>
                        </el-select>
                      </div>
                    </li>
                     <li class="item">
                      <div class="input-box">
                        <span class="name">专业：</span>
                        <el-select size="small" v-model="edu_major" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in majorType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="input-box">
                        <span class="name">学业性质：</span>
                        <el-select size="small" v-model="edu_nature" placeholder="请选择" class="select-box">
                          <el-option
                            v-for="item in eduNatureType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <li class="item work-desc-item">
                      <div class="input-box text-left">
                        <span class="name">主修课程：</span>
                        <div class="work-desc">
                          <textarea v-model="edu_desc" maxlength="300" class="textarea" name="" id="" placeholder="描述在校期间所学专业，主要包括课程内容，毕业设计等"></textarea>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveEducation">保存</div>
                    <div class="edit-btn cancel-btn" @click="showEducationEdit=false">取消</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="school" class="grid-content info-box" >
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-school"></i>
                <span>在校情况</span>
              </div>
              <div class="schoolwork">
                <div class="honor" v-if="!showSchoolHonorEdit">
                  <div class="school-type">
                    <span>校内荣誉</span>
                    <div class="add-job" @click="showSchoolHonorEdit=true">
                      <i class="iconfont icon-add"></i>新增荣誉
                    </div>
                  </div>
                  <ul class="honor-list job-item" style="display:none">
                    <li class="">
                      <div class="job-time">
                        <span class="gray">2013/4</span>
                        <span>微视频比赛</span>
                        <span>荣获全省“第二名”</span>
                        <span class="icon-box">
                          <i class="iconfont icon-edit"></i>
                          <i class="iconfont icon-delete"></i>
                        </span>
                      </div>
                    </li>
                    <li class="">
                      <div class="job-time">
                        <span class="gray">2013/4</span>
                        <span>微视频比赛2</span>
                        <span>荣获全省“第二名”</span>
                        <span class="icon-box">
                          <i class="iconfont icon-edit"></i>
                          <i class="iconfont icon-delete"></i>
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div class="imperfect" v-if="!showSchoolHonorEdit">
                    <p class="perfect-text">完善校内荣誉，展现学习能力，让HR更了解你！</p>
                    <el-button size="small" class="perfect-btn" @click="showSchoolHonorEdit=true">开始完善</el-button>
                  </div>
                </div>
                <div class="post" v-if="!showSchoolWorkEdit">
                  <div class="school-type">
                    <span>校内职务</span>
                    <div class="add-job" @click="showSchoolWorkEdit=true">
                      <i class="iconfont icon-add"></i>新增职务
                    </div>
                  </div>
                  <ul class="post-list" style="display:none">
                    <li class="job-item">
                      <div class="job-time">
                        <span class="gray">2013/4-2014/6</span>
                        <span>学生会主席</span>
                        <span></span>
                        <span></span>
                      </div>
                      <div class="job-desc">
                        <div class="desc-text gray">主修课程：</div>
                        <div class="desc-content">
                          <ul class="desc-list">
                            <li>1.HR可根据求职者经历过的公司来判断该求职者适合的工作氛围及已习得的工作方式，国企、上市公司、私企等的作息、工作饱和度均不同，
                              若此公司为创业型公司，对一直在国企的员工求职也会考虑该求职者的抗压能力及稳定性。</li>
                            <li>2.若公司全称不为人所熟知，但商标名称是大众所熟知的，可以使用商标名称，让HR可以对求职者所在行业能有一定的了解，
                              以此判断该求职者是否为同行业或跨行业求职</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li class="job-item">
                      <div class="job-time">
                        <span class="gray">2013/4-2014/6</span>
                        <span>学生会主席</span>
                        <span></span>
                        <span></span>
                      </div>
                      <div class="job-desc">
                        <div class="desc-text gray">主修课程：</div>
                        <div class="desc-content">
                          <ul class="desc-list">
                            <li>1.HR可根据求职者经历过的公司来判断该求职者适合的工作氛围及已习得的工作方式，国企、上市公司、私企等的作息、工作饱和度均不同，
                              若此公司为创业型公司，对一直在国企的员工求职也会考虑该求职者的抗压能力及稳定性。</li>
                            <li>2.若公司全称不为人所熟知，但商标名称是大众所熟知的，可以使用商标名称，让HR可以对求职者所在行业能有一定的了解，
                              以此判断该求职者是否为同行业或跨行业求职</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="imperfect" v-if="!showSchoolWorkEdit">
                    <p class="perfect-text">完善校内职务，展现校园活动经验，让HR更了解你！</p>
                    <el-button size="small" class="perfect-btn" @click="showSchoolWorkEdit=true">开始完善</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid-content info-box edit-border" v-if="showSchoolHonorEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-school"></i>
                <span>校内荣誉</span>
              </div>
              <div class="base-content">
                <div class="edit-content">
                  <ul  class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="honor_time"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">奖项：</span>
                        <el-input size="small" v-model="honor_prize" placeholder="请输入奖项"></el-input>
                      </div>
                    </li>
                    <li class="item">
                      <div class="input-box text-left">
                        <span class="name">级别：</span>
                        <el-input size="small" v-model="honor_level" placeholder="请输入级别"></el-input>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveSchoolHonor">保存</div>
                    <div class="edit-btn cancel-btn" @click="showSchoolHonorEdit=false">取消</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="grid-content info-box edit-border" v-if="showSchoolWorkEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-school"></i>
                <span>校内职务</span>
              </div>
              <div class="base-content">
                <div class="edit-content">
                  <ul  class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="school_work_time"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">职务：</span>
                        <el-input size="small" v-model="school_work_name" placeholder="请输入职务"></el-input>
                      </div>
                    </li>
                    <li class="item work-desc-item">
                      <div class="input-box text-left">
                        <span class="name">职务描述：</span>
                        <div class="work-desc">
                          <textarea v-model="school_work_desc" maxlength="300" class="textarea" name="" id="" placeholder="描述你的职责范围、工作任务以及取得成绩"></textarea>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveSchoolWork">保存</div>
                    <div class="edit-btn cancel-btn" @click="showSchoolWorkEdit=false">取消</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div id="skill" class="grid-content info-box" v-if="!showSkillEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-skill"></i>
                <span>技能证书</span>
                <div class="add-job" @click="showSkillEdit=true">
                  <i class="iconfont icon-add"></i>新增证书
                </div>
              </div>
              <ul class="skill" style="display: none">
                <li>
                  <span class="gray">2009/12</span>
                  <span>市场销售精英证</span>
                  <span>合格</span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit"></i>
                    <i class="iconfont icon-delete"></i>
                  </span>
                </li>
                <li>
                  <span class="gray">2013/12</span>
                  <span>市场销售高级证书</span>
                  <span>合格</span>
                  <span class="icon-box">
                    <i class="iconfont icon-edit"></i>
                    <i class="iconfont icon-delete"></i>
                  </span>
                </li>
              </ul>
              <div class="imperfect" v-if="!showSkillEdit">
                    <p class="perfect-text">完善所获证书，展现专业技能，让HR更了解你！</p>
                    <el-button size="small" class="perfect-btn" @click="showSkillEdit=true">开始完善</el-button>
                  </div>
            </div>
          </div>
          <div class="grid-content info-box edit-border" v-if="showSkillEdit">
            <div class="base-info">
              <div class="title">
                <i class="iconfont icon-skill"></i>
                <span>技能证书</span>
              </div>
              <div class="base-content">
                <div class="edit-content">
                  <ul  class="edit-item-list">
                    <li class="item">
                      <div class="input-box">
                        <span class="name">时间：</span>
                        <el-date-picker size="small" class="select-box"
                          v-model="skill_time"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <div class="input-box">
                        <span class="name">证书名称：</span>
                        <el-input size="small" v-model="skill_name" placeholder="请输入证书名称" maxlength="30"></el-input>
                      </div>
                    </li>
                    <li class="item work-desc-item">
                      <div class="input-box text-left">
                        <span class="name">成绩：</span>
                        <el-input size="small" v-model="skill_score" placeholder="请输入成绩" maxlength="30" ></el-input>
                      </div>
                    </li>
                  </ul>
                  <div class="edit-btn-box">
                    <div class="edit-btn save-btn" @click="saveSkill(id)">保存</div>
                    <div class="edit-btn cancel-btn" @click="showSkillEdit=false">取消</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="post-resume">
            <el-button size="small" class="resume-btn" @click="postResume">提交简历</el-button>
          </div>
        </el-col>
        <el-col :span="6" class="right-content">
          <div class="grid-content">
            <div class="hr-tag">
              <div class="title">
                <i class="iconfont icon-prompt"></i>
                <span>HR视角小提示</span>
              </div>
              <el-select size="small" v-model="tag" placeholder="请选择" class="tag">
                <el-option
                  v-for="item in tags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <div class="tag">基本信息</div> -->
              <div class="tag-box">
                <div class="tag-title">姓名</div>
                <div class="tag-split"></div>
                <div class="tag-content">姓名是HR发出面试邀约和offer所需要的重要信息，不可有误。</div>
              </div>
              <div class="tag-box">
                <div class="tag-title">性别</div>
                <div class="tag-split"></div>
                <div class="tag-content">部分工种对性别有要求，但不会明写在岗位描述中，（因劳动法有规定不能有性别歧视）但HR会根据面试者的性别去进行相应判断，
                  如果不适合则不会发出面试邀约，节省彼此的时间。</div>
              </div>
              <div class="tag-box">
                <div class="tag-title">出生日期(年龄)</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.根据年龄判断工作年限是否差异较大 
                  2.不乏有企业老板或者部门领导对面试者的星座、年龄等有所要   求。如果硬性要求不符合，可通过简历的初筛节省双方的时间。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">电话号码</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.电话号码是用人单位联系面试者的最常用工具，保持电话畅通才不会漏过每一个面试邀约。
                  2.HR拨打求职者的电话号码，一般用的是公司的座机，拨打归属地为本地的号码可直接拨通，拨打外地号码需要加拨“0”，若求职者电话为外地号码，可能会影响HR对该求职者电话邀约的可能性，HR也会考虑该求职者的稳定性等。
                  3.建议办理求职当地的手机号码，在一定程度上增大面试几率。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">联系邮箱</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.邮箱为用人单位（企业）发送面试信息、录取offer等文件资料的重要通讯工具，需要保证邮箱状态正常。
                  2.一般企业不会因为你的邮箱为QQ邮箱而放弃对你的面试邀请，所以不必为了面试专门申请邮箱，只需要保证邮箱常用且能正常收发邮件即可。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">现居地</div>
                <div class="tag-split"></div>
                <div class="tag-content">根据求职者现居地判断到公司路程远近，一般在北上深这样的城市单程1小时内是求职者可以接受的路程范围，
                  如果太远则求职者可能会不稳定。电话沟通时也会问求职者是自住房还是租房，如果路程较远是否考虑公司附近租房等。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">工作经验</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.一般情况下正式工作是以拿到毕业证起开始计算时间的，未取得毕业证学位证之前的实习或工作不计入工作经验中。
                  2.实习期间无法确保该员工的稳定性，一般实习生所承担的工作也不会是含金量高的内容，所以全职工作经验与实习/兼职通常不放在一起衡量。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">婚姻状况</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.女性求职者在适婚年龄会涉及到婚假、产假等带薪假期，会对企业造成一定的影响，包括企业的用人成本、工作的持续程度等
                  2.已婚者通常没有未婚者在工作上投入的精力多，事业家庭兼顾的情况势必会有侧重。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">期望薪资</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.期望薪资是求职者心里对该岗位及公司所能给到的待遇的一个预估及对自我情况的判断。
                  2.过高的期望薪资会给HR造成的印象是此求职者眼高手低，不能脚踏实地，降低电话邀约的概率；
                  3.过低的期望薪资会给HR造成的印象是此求职者对自己不自信，或者此求职者存在其他问题，也会有邀约的顾虑；
                  4.符合市场行情的期望薪资是最正常的和最安全的选择，具体薪资需等到面试通过再进行。一般情况用人单位会给到该岗位合理的薪资，在面试后谈薪资时请注意薪资的构成。
                  （底薪+绩效+补贴+年终奖+每年多少薪等）。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">到岗时间</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.若用人单位急需用人，则希望求职者立即到岗，筛选简历会看求职者的到岗时间来进行邀约判断，若选择到岗时间的周期较长，可能在简历初筛阶段就被淘汰掉了。
                  2.同一岗位的缺口是有限的，当同时有多个条件均等的候选人，则选择最快到岗的那一位；
                  3.用人单位的用人规划可能实时在调整，到岗时间越近则变数越小，减少出现面试到了合适的候选人，但由于候选人迟迟无法到岗，公司战略调整该岗位缩编不再需要补人的情况。
                  4.一般情况下，到岗时间选择1周内。
                </div>
              </div>
              <div class="tag-box">
                <div class="tag-title">工作类型</div>
                <div class="tag-split"></div>
                <div class="tag-content">1.全职一般指求职者为满足该岗位需求的可签署劳动合同的自然人，毕业生已取得学历证、学位证，且人事档案、组织关系等根据招聘方需求可选择转入该公司，公司为全职员工依法缴纳社保公积金等，正常情况下员工要保证每周不低于40小时的上班时间。
                  2.兼职一般为企业用工的补充形式，以固定的时间段或者固定的工作量来支付给劳动者报酬，但劳动者可同时服务于其他企业或公司，且该公司不用为劳动者缴纳社保、公积金等。
                  3.实习生指还未取得学位证、毕业证的学生劳动单位进行工作，但工作时间与全职员工一致，签署实习协议，如能留任则签署“三方协议”，等拿到毕业证、学位证之后签署正式劳动合同。实习期间不缴纳社保、公积金，报酬可按月计算，也可按出勤天数计算。
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 提交简历弹框 -->
    <div class="dialog" v-if="showSuccessDialog" @click.self="showSuccessDialog=false">
      <div class="post-box">
        <img src="../assets/images/resume_success.png" alt="" class="post-success">
        <div class="title">简历提交成功</div>
        <div class="date">2018-05-03 11:02</div>
        <el-button size="small" round class="back-btn">返回</el-button>
    
      </div>
    </div>
    <!-- dialog 删除弹框 -->
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>{{dialogMessage}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
import { mapState } from 'vuex'
export default {
  name: "resume",
  data() {
    return {
      showMoreBase: false,
      showBaseInfoEdit: false,
      showJobIntensionEdit: false,
      showEvaluateEdit: false,
      showWorkExperiencedEdit: false,
      showEducationEdit: false,
      showSchoolHonorEdit: false,
      showSchoolWorkEdit: false,
      showSkillEdit: false,

      showSuccessDialog: false,
      dialogVisible: false,
      dialogMessage: "",
      cities: [],
      tag: "",
      tabIndex: 0,
      //基本信息
      career_type: "",
      name: "",
      phone: "",
      email: "",
      sex: "",
      birth: "2018-02-01",
      native_place: "",
      work_year: "2013", //工作年份
      job_status: "", //求职状态
      marriage_status: "", //婚姻状态
      address: "", //现居住
      //自我评价
      evaluate: "",
      //求职意向
      expect_salary: "", //期望薪资
      expect_work_place: "", //工作地点
      expect_position: "", //职位
      expect_industry: "", //期望行业
      expect_work_type: "", //期望工作类型
      arrive: "", //到岗时间
      //工作经验
      work_start: "", //开始时间
      work_end: "", //结束时间
      company_name: "", //公司名称
      department: "", //部门
      fun: "", //职能
      company_industry: "", //公司行业
      work_position: "", //职位
      company_size: "", //公司规模
      work_type: "", //工作类型
      company_nature: "", // 公司性质
      work_desc: "", //工作描述
      //教育经历
      edu_start: "",
      edu_end: "",
      school_name: "",
      edu_degree: "", //学历/学位
      edu_major: "", //专业
      edu_nature: "", //学业性质
      edu_desc: "", //专业描述
      //在校情况
      //荣誉
      honor_time: "", //荣誉时间
      honor_prize: "", //荣誉奖项
      honor_level: "", //荣誉级别
      //职务
      school_work_time: "",
      school_work_name: "",
      school_work_desc: "",
      //技能证书
      skill_time: "",
      skill_name: "",
      skill_score: "",

      tags: [
        {
          value: 0,
          label: "基本信息"
        },
        {
          value: 1,
          label: "自我评价"
        },
        {
          value: 2,
          label: "求职意向"
        },
        {
          value: 3,
          label: "工作经验"
        },
        {
          value: 4,
          label: "教育经历"
        },
        {
          value: 5,
          label: "在校情况"
        },
        {
          value: 6,
          label: "技能证书"
        }
      ],
      careerTpye: [
        {
          value: "0",
          label: "全职"
        },
        {
          value: "1",
          label: "兼职"
        },
        {
          value: "2",
          label: "实习"
        }
      ],
      jobStatus: [
        {
          value: "0",
          label: "离职-随时到岗"
        },
        {
          value: "1",
          label: "在职-暂不考虑"
        },
        {
          value: "2",
          label: "在职-考虑机会"
        },
        {
          value: "3",
          label: "在职-月内到岗"
        }
      ],
      marriageStatus: [
        {
          value: "0",
          label: "未婚"
        },
        {
          value: "1",
          label: "已婚"
        },
        {
          value: "2",
          label: "保密"
        }
      ],
      salaryRange: [],
      workplaceList: [],
      positionType: [],
      industryType: [],
      workType: [],
      arriveRange: [],
      companySize: [],
      funType: [],
      companyNature: [],
      majorType: [], //专业
      eduNatureType: [], //专业性质
      degreeType: [] //学历/学位
    };
  },
  computed: {
    ...mapState({
      resumeInfo: state => state.resumeInfo
    })
  },
  methods: {
    //编辑基本信息
    editBaseInfo: function() {
      this.showBaseInfoEdit = true;
      this.$store.dispatch('RESUME_INFO', {})
      console.log(this)
    },
    //保存基本信息
    saveBaseInfo: function() {
      //保存数据....
      this.showBaseInfoEdit = false;
    },
    //编辑求职意向
    editJobIntension: function() {
      this.showJobIntensionEdit = true;
    },
    //保存求职意向
    saveJobIntension: function() {
      //保存数据....
      this.showJobIntensionEdit = false;
    },
    //编辑自我评价
    editEvaluate: function() {
      this.showEvaluateEdit = true;
    },
    //保存自我评价
    saveEvaluate: function() {
      //保存数据....
      this.showEvaluateEdit = false;
    },
    //新增,编辑工作经验
    editWorkExper: function(id) {
      if (id) {
        //编辑
        this.showWorkExperiencedEdit = true;
      } else {
        //新增
      }
    },
    //删除某一条工作经验
    deleteWorkExper: function(id) {},
    //保存工作经验
    saveWorkExper: function() {
      //保存数据....
      this.showWorkExperiencedEdit = false;
    },
    //新增,编辑教育经历
    editEducation: function(id) {
      if (id) {
        //编辑
        this.showEducationEdit = true;
      } else {
        //新增
      }
    },
    //保存教育经历
    saveEducation: function() {
      //保存数据...
      this.showEducationEdit = false;
    },
    //删除教育经历
    deleteEducation: function(id) {},
    //新增,编辑在校情况
    saveSchoolHonor: function() {},
    saveSchoolWork: function() {},
    //新增,编辑技能证书
    editSkill: function() {},
    saveSkill: function() {},

    //提交简历
    postResume: function() {
      this.showSuccessDialog = true;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(data => {
          done();
        })
        .catch(err => {});
    }
  },
  watch: {},
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/css/colors.less");
.resume-page {
  width: 100%;
  background-color: @main-color-bg;
  padding-bottom: 25px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  .container {
    width: 1200px;
    margin: 20px auto;
    position: absolute;
    top: 60px;
    left: 50%;
    bottom: 0;
    margin-left: -600px;
    .el-content {
      height: 100%;
    }
    .center-content,
    .right-content {
      position: absolute;
      top: 0;
      bottom: 0;
      overflow-y: auto;
    }
    .center-content {
      left: 12.5%;
    }
    .right-content {
      right: 0;
    }
    .right-icon {
      float: right;
      color: @main-color-yellow;
      cursor: pointer;
    }
    .gray {
      color: @main-color-gray;
    }
    .textarea {
      min-height: 150px;
    }
    textarea:-moz-placeholder,
    textarea::-webkit-input-placeholder {
      // color: @main-color-gray;
      color: red;
    }
    .info-box {
      margin-bottom: 10px;
    }
    .edit-border {
      border: 1px solid @main-color-yellow!important;
    }
    .grid-content {
      border-radius: 8px;
      min-height: 36px;
      background-color: #fff;
      box-shadow: RGBA(162, 169, 184, 0.15);
      box-shadow: 8px 0px 10px RGBA(162, 169, 184, 0.15);
      .name-box {
        padding: 10px;
        border-bottom: 1px solid @main-color-border;
        .title {
          font-weight: bold;
          line-height: 30px;
          .resume-text {
            font-size: 12px;
          }
        }
        .time {
          line-height: 22px;
        }
        .operation {
          display: flex;
          display: -webkit-flex;
          margin: 10px auto;
          .icon-box {
            display: inline-block;
            flex: 1;
            text-align: center;
            cursor: pointer;
            .icon-text {
              padding-top: 6px;
            }
            .icon-refresh {
              color: #6BD7B0;
            }
            .icon-yulan {
              color: @main-color-yellow;
            }
          }
          .preview {
            padding-left: 20px;
          }
        }
      }
      .tabs {
        width: 100%;
        display: inline-block;
        font-size: 14px;
        li {
          height: 20px;
          line-height: 20px;
          padding: 0 10px;
          margin: 20px 0;
          cursor: pointer;
          span {
            margin: 0 10px;
          }
          .el-icon-check {
            font-weight: bold;
          }
        }
        .active {
          border-left: 3px solid @main-color-blue;
          a {
            color: @main-color-blue;
          }
        }
      }
      .save-close {
        line-height: 30px;
        padding: 10px;
        span {
          margin: 0 10px;
        }
      }
      .edit-btn-box {
        padding: 15px 0;
        text-align: center;
        .edit-btn {
          width: 70px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          cursor: pointer;
          border-radius: 4px;
          display: inline-block;
        }
        .save-btn {
          background-color: @main-color-yellow;
          color: #fff;
        }
        .cancel-btn {
          border: 1px solid @main-color-border;
          color: @main-color-text;
          margin-left: 20px;
        }
      }
      .base-info {
        padding: 10px 0px;
        border-radius: 10px;
        .title {
          line-height: 30px;
          padding: 0 20px;
          i {
            color: @main-color-yellow;
          }
          .right-icon {
            color: @main-color-blue;
          }
          span {
            color: @main-color-gray;
            padding-left: 10px;
          }
        }
        .base-content {
          width: 100%;
          display: inline-block;
          padding: 5px 20px;
          // box-sizing: border-box;
          .avtar {
            float: left;
            width: 85px;
            img {
              width: 85px;
              height: 85px;
            }
            .text {
              text-align: center;
              line-height: 26px;
              cursor: pointer;
              color: @main-color-blue;
            }
          }
          .edit-avatar {
            cursor: pointer;
          }
          .info-list {
            margin-left: 105px;
            .name {
              line-height: 28px;
              .right-icon {
                color: @main-color-blue;
              }
            }
            .status {
              display: flex;
              display: -webkit-flex;
              line-height: 28px;
              span {
                flex: 1 1 auto;
              }
            }
            .concat {
              display: flex;
              display: -webkit-flex;
              line-height: 28px;
              span {
                flex: 1 1 auto;
              }
              i {
                margin-right: 5px;
              }
              .more {
                text-align: right;
                color: @main-color-blue;
                cursor: pointer;
                i {
                  padding-left: 5px;
                  color: @main-color-gray;
                }
              }
            }
          }
          .more-info {
            line-height: 40px;
            margin-top: 10px;
            padding: 0 15px;
            background-color: rgba(234, 240, 253, 1);
            display: flex;
            display: -webkit-flex;
            position: relative;
            span {
              flex: 1 1 auto;
            }
            .arrow-top {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid rgba(234, 240, 253, 1);
              position: absolute;
              top: -19px;
              right: 25px;
            }
          }
          .baseinfo-content {
            margin-left: 105px;
          }
          .edit-content {
            .edit-item-list {
              width: 100%;
              display: inline-block;
              li {
                display: flex;
                padding-bottom: 10px;
                .input-box {
                  flex: 1 1 auto;
                  .name {
                    width: 80px;
                    text-align: left;
                    display: inline-block;
                    color: gray;
                  }
                  .sex-box {
                    text-align: left;
                  }
                  .el-input {
                    width: 180px;
                  }
                  .el-select .el-input.is-focus .el-input__inner {
                    border-color: @main-color-yellow;
                  }
                  .select-box {
                    width: 180px;
                    .el-input {
                      border: 1px solid red; //?
                      .el-input__inner {
                        width: 180px !important;
                        height: 30px !important;
                      }
                    }
                  }
                  input {
                    width: 180px;
                    height: 30px;
                    line-height: 30px;
                    padding-left: 10px;
                    // box-sizing: border-box;
                  }
                }
                .input-box:last-child {
                  text-align: right;
                }
                .text-left {
                  text-align: left !important;
                }
                .work-desc {
                  margin-left: 80px;
                  margin-top: -20px;
                }
              }
              .work-desc-item {
                margin-top: 10px;
              }
            }
          }
        }
        .imperfect {
          padding: 10px 20px;
          text-align: center;
          .perfect-text {
            line-height: 32px;
            padding-bottom: 20px;
          }
          .perfect-btn {
            background-color: @main-color-graybtn;
            color: #fff;
          }
        }
        .item-list {
          width: 100%;
          display: inline-block;
          // box-sizing: border-box;
          padding: 0 20px;
          li {
            line-height: 30px;
            display: flex;
            display: -webkit-flex;
            .item {
              width: 50%;
            }
            .name {
              width: 90px;
              color: @main-color-gray;
              display: inline-block;
            }
          }
        }
        .job-item:last-child {
          border: none;
        }
        .item-first {
          margin-top: -10px;
        }
        .add-job {
          float: right;
          color: @main-color-blue;
          cursor: pointer;
          i {
            margin-right: 6px;
            color: @main-color-blue;
          }
        }
        .icon-box {
          color: @main-color-blue;
          text-align: right;
          i {
            cursor: pointer;
          }
          i:first-child {
            margin-right: 10px;
          }
        }
        .job-item {
          display: inline-block;
          padding: 10px 20px;
          border-bottom: 1px solid @main-color-border;
          .job-time,
          .job-type {
            display: flex;
            line-height: 30px;
            span {
              flex: 1 1 auto;
            }
          }
          .job-desc {
            width: 100%;
            display: inline-block;
            padding-top: 5px;
            .desc-text {
              float: left;
              width: 70px;
              line-height: 26px;
            }
            .desc-content {
              margin-left: 80px;
              .desc-list {
                li {
                  line-height: 26px;
                }
              }
            }
          }
        }
        .skill {
          width: 100%;
          display: inline-block;
          padding: 5px 20px;
          // box-sizing: border-box;
          li {
            width: 100%;
            display: flex;
            line-height: 30px;
            span {
              flex: 1 1 auto;
              max-width: 25%;
            }
          }
        }
        .schoolwork {
          padding-top: 10px;
        }
        .honor,
        .post {
          .imperfect {
            padding-top: 20px;
          }
          .school-type {
            padding: 0 20px;
            line-height: 30px;
            background-color: RGBA(247, 247, 247, 1);
          }
          .honor-list {
            width: 100%;
            // box-sizing: border-box;
          }
        }
        .evaluate-box {
          width: 100%;
          display: inline-block;
          padding: 10px 20px;
          // box-sizing: border-box;
          .evaluate-text {
            width: 100%;
            min-height: 150px;
            padding: 5px 20px;
            line-height: 26px;
            // box-sizing: border-box;
          }
        }
      }
      .hr-tag {
        padding: 15px;
        .title {
          color: #82B0FF;
          padding-bottom: 10px;
          span {
            padding-left: 10px;
          }
        }
        .tag input {
          border: 1px solid red;
        }
        .tag {
          width: 100%;
          margin-bottom: 5px;
          .el-input {
            input {
              height: 30px;
            }
          }
          .el-input__inner {
            border-radius: 20px;
          }
        }
        .tag-box {
          .tag-title {
            line-height: 26px;
            font-size: 13px;
          }
          .tag-split {
            width: 30px;
            height: 2px;
            background-color: RGBA(255, 77, 150, 1);
          }
          .tag-content {
            font-size: 12px;
            line-height: 1.3;
            color: @main-color-gray;
            padding: 5px 0;
          }
        }
      }
    }
    .post-resume {
      text-align: right;
      padding-top: 10px;
      .resume-btn {
        border: 1px solid @main-color-blue;
        color: @main-color-blue;
        // width: 150px;
        // height: 36px;
        // border-radius: 4px;
      }
    }
  }
  .dialog {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 11;
    position: absolute;
    top: 0;
    left: 0;
    .post-box {
      width: 650px;
      background-color: #fff;
      border-radius: 8px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -200px;
      margin-left: -325px;
      padding: 50px 0;
      .post-success {
        width: 370x;
        height: auto;
        margin: 0 auto;
      }
      .title {
        line-height: 30px;
        font-weight: 600;
        padding-top: 10px;
      }
      .date {
        font-size: 12px;
        color: @main-color-gray;
        margin-bottom: 20px;
      }
      .back-btn {
        width: 140px;
        height: 36px;
        color: #fff;
        text-align: center;
        background-color: @main-color-blue;
      }
    }
  }
}
</style>


