export default {
  url: {
    //metadata
    //dict code COMPANY_NATURE 公司性质/规模 "EDUCATION 学历学位 "EXPECT_SALARY 
    //期望薪资 "INDUSTRY 行业类别 "JOB_STATUS 求职状态 "MARRIAGE_STATUS 婚姻状态 "NATIVE 
    //籍贯 "PROF_TYPE 职业类型 "SCHOOLWORK_PROP 学业性质 "SEX 性别
    dictItem: 'dict/dictitem',
    //tree item
    //dictCode (行政区划AREA/职能FUNCTION/行业INDUSTRY数据)
    treeItem: 'dict/treeitem',
    schoolList: 'user/schoolList',
    classList: 'user/classList',

    //测评
    cepingList: 'index/cepinglist',
    hotList: 'index/hotlist',
    cepingInfo: 'ceping/cepinginfo',
    finished: 'ceping/finished',
    unfinished: 'ceping/unfinished',

    //立即购买
    cepingBuy: 'ceping/purchase',
    cepingFree: 'ceping/freepurchase',
    //测评完成之后记录测评报告
    seeReport: 'ceping/recordreport',
    //进入测试
    tocaichu: 'ceping/tocaichu/{cepingId}/{serialno}',

    //简历
    //基本信息
    baseInfo: 'resume/baseinfo',
    //评价 
    evaluate: 'resume/expect',
    //期望职位
    expect: 'resume/expect',
    //教育   保存,修改
    edu: 'resume/edu',
    deleteEdu: 'resume/edu/{id}',
    //荣誉
    schoolhonor: 'resume/honor',
    deleteSchoolhonor: 'resume/honor/{id}',
    //工作经验
    workExper: 'resume/jobexp',
    deleteWorkExper: 'resume/jobexp/{id}',
    //校内职务
    schoolwork: 'resume/schoolwork',
    deleteSchoolwork: 'resume/schoolwork/{id}',
    //技能证书
    skills: 'resume/skills',
    deleteSkills: 'resume/skills/{id}',

    //提交简历
    submitResume: 'resume/submit/{resumeId}', //提交个人简历
    resumeInfo: 'resume/info', //查看个人简历

    //上传简历头像
    headpic: 'file/headpic',
    //导出简历
    exportResume: 'resume/export/{resumeId}/{format}', //format: pdf/word
    //检查是否制作过简历
    checkResume: 'resume/checkresume',
    //简历列表
    resumeList: 'resume/list',
    //待修改简历列表
    modifyList: 'resume/updatelist',

    //系统信息
    listMsg: '/message/list',
    addMsg: '/message/addMsg',
    deleteMsg: '/message/deleteMsg',
    updateMsg: '/message/updateMsg',


    //大学规划与管理
    //附加计划
    insertAdditional: 'plan/insertAdditional',
    deleteAdditional: 'plan/deleteAdditional',
    updateAdditional: 'plan/updateAdditional',
    listAdditions: 'plan/listAddition',

    //证书
    insertCertificate: 'plan/insertCertificate',
    deleteCertificate: 'plan/deleteCertificate',
    updateCertificate: 'plan/updateCertificate',
    listCertificate: 'plan/listCertificate',

    //实习实践
    insertInternship: 'plan/insertInternship',
    deleteInternship: 'plan/deleteInternship',
    updateInternship: 'plan/updateInternship',
    listInternship: 'plan/listInternship',

    //办公技能
    insertOffice: 'plan/insertOffice',
    deleteOffice: 'plan/deleteOffice',
    updateOffice: 'plan/updateOffice',
    listOffice: 'plan/listOffice',

    //选修课
    insertOptional: 'plan/insertOptional',
    deleteOptional: 'plan/deleteOptional',
    updateOptional: 'plan/updateOptional',
    listOptional: 'plan/listOptional',

    //专业大赛
    insertProf: 'plan/insertProf',
    deleteProf: 'plan/deleteProf',
    updateProf: 'plan/updateProf',
    listProf: 'plan/listProf',

    //必修课
    insertRequired: 'plan/insertRequired',
    deleteRequired: 'plan/deleteRequired',
    updateRequired: 'plan/updateRequired',
    listReruired: 'plan/listRequired',

    //自学课
    insertSelf: 'plan/insertSelf',
    deleteSelf: 'plan/deleteSelf',
    updateSelf: 'plan/updateSelf',
    listSelf: 'plan/listSelf',

    //职业能力
    insertVocation: 'plan/insertVocation',
    deleteVocation: 'plan/deleteVocation',
    updateVocation: 'plan/updateVocation',
    listVocation: 'plan/listVocation',

    //获取其他计划列表
    otherPlans: 'plan/otherList',
    //获取所有办公列表
    officeList: 'plan/officeList',
    //获取所有证书列表
    certificateList: 'plan/certificateList',

    //获取规划内容
    planInfo: 'plan/planInfo',
    //根据用户获取规划列表
    planList: 'plan/planList',

    //用户
    login: 'user/login',
    register: 'user/register',
    captcha: 'user/sendMobileCode',
    forget: 'user/validCode',
    userInfo: 'user/complete',



  }
}