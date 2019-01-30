export default {
	tagList: [
		{
			value: 1,
			label: "基本信息",
			type: "base"
		},
		{
			value: 2,
			label: "自我评价",
			type: "evaluate"
		},
		{
			value: 3,
			label: "教育经历",
			type: "edu"
		},
		{
			value: 4,
			label: "实习实践",
			type: "internship"
		},
		{
			value: 5,
			label: "校园经历",
			type: "school"
		},
		
		{
			value: 6,
			label: "荣誉称号",
			type: "honor"
		},
		{
			value: 7,
			label: "技能证书",
			type: "skill"
		},
		{
			value: 8,
			label: "兴趣爱好",
			type: "hobby"
		},
	],
	tagInfoList: [
		{
			type: `base`,
			name: `姓名`,
			msg: `除非在职高管或特殊岗位，或避免在职公司获悉求职动态，否则以真实姓名示人是一种坦诚的态度。`
		},
		{
			type: `base`,
			name: `性别`,
			msg: `部分工种对性别有要求，但不会明写在岗位描述中，（因劳动法有规定不能有性别歧视）。`
		},
		{
			type: `base`,
			name: `出生日期(年龄)`,
			msg: `1.根据年龄判断工作年限是否差异较大。<br>
						2.不乏有领导或HR对面试者的星座、年龄等有所要求。如果硬性要求不符合，可通过简历的初筛节省双方的时间。`
		},
		{
			type: `base`,
			name: `电话号码`,
			msg: `1.电话号码是用人单位联系面试者的最常用工具，保持电话畅通才不会漏过每一个面试邀约。<br>
						2.电话为外地号码，可能会影响HR对该求职者电话邀约的可能性，HR也会顾虑面试成本、该求职者的稳定性等。<br>
						3.如果获得HR短信通知面试，请查询官网电话，予以确认，以防上当受骗。`
		},
		{
			type: `base`,
			name: `联系邮箱`,
			msg: `1.请每天查阅邮箱，请确保邮箱服务器没有爆满。<br>
						2.不必为了面试专门申请邮箱，自己常用的QQ、163、新浪、139等主流邮箱都可以。`
		},
		{
			type: `base`,
			name: `户籍所在地`,
			msg: `请确认与你身份证信息保持一致。`
		},
		{
			type: `base`,
			name: `现居地`,
			msg: `居住地距离单位地址过远，可能影响员工稳定性和工作投入度。`
		},
		
		{
			type: `base`,
			name: `婚姻状况`,
			msg: `1.女性求职者在适婚年龄可能会涉及到婚假、产假等带薪假期，会对企业工作连续性、用工成本造成一定的影响。<br>
						2.女性已婚者通常没有未婚者在工作上投入的精力多，事业家庭兼顾的情况势必会有侧重。`
		},
		//自我评价
		{
			type: `evaluate`,
			name: `自我评价`,
			msg: `请选择自我评价从性格特征、人际处事与沟通风格、职业价值观、工作能力、实践经验等多角度描述自我，突出与应聘岗位相关的重点与特长。<br>
						1.高度凝练的表达，有助于HR快速了解应聘者的全貌。<br>
						2.突出重点与特长，有助于强化简历竞争力。<br>
						建议按照关键词+一句话描述进行书写。<br>
						例如：<br>
						逻辑思维缜密：擅长罗列思维导图进行课题分析；<br>
						组织策划能力强：策划组织多场校级比赛/晚会，获得一致好评；<br>
						语言表达能力强：多场晚会的主持及统筹经验；<br>
						交往能力强：2年兼职播音主持培训老师的经验，被学员评委“最受欢迎教师”。。`
		},
		// 教育经历
		{
			type: `edu`,
			name: `就读时间`,
			msg: `未毕业在校生的教育经历结束日期应填写预计毕业年月。HR会根据你的就读时间段来判断你是本科还是专科。`
		},
		{
			type: `edu`,
			name: `学校名称`,
			msg: `HR会根据学校名称去初步判断求职者的学习能力。`
		},
		{
			type: `edu`,
			name: `专业名称`,
			msg: `岗位与大学所学专业的匹配度是HR考虑求职者心态的一个重要因素。`
		},
		{
			type: `edu`,
			name: `学历/学位`,
			msg: `学历/学位是个敲门砖，也是某些岗位的硬性条件。若应届毕业生还未拿到毕业证学位证，可填写即将取得的学历。`
		},
		{
			type: `edu`,
			name: `学习课程`,
			msg: `学习课程只写与申请岗位相关的即可，相关性强的写在前面。亦可不罗列学习课程。`
		},
		{
			type: `edu`,
			name: `培训经历`,
			msg: `如有相关培训经历，建议填写，为加分项。`
		},
		// 实习实践
		{
			type: `internship`,
			name: `实习/实践内容`,
			msg: `实习经验的描述与目标岗位的招聘要求尽量匹配,用词精准,注意不要出现大段大段的文字呈现,要写成一条一条的，用1、2、3这样的数字进行标示。例如：<br>
						1、进行市场调研，在潜客聚集地进行线下传单的发放;<br>
						2、潜客信息的收集与汇总,并进行数据分析。`
		},
		{
			type: `internship`,
			name: `实习/实践成果`,
			msg: `实习成果尽量以数据来呈现，突出个人成果以及做出的贡献。<br>
						例如：<br>
						单日发放传单600张，收集有效信息100个，部门绩效排名3/60。`
		},
		{
			type: `internship`,
			name: `实习/实践的成长收获`,
			msg: `根据实习实践具体内容，进行某能力提升的说明。<br>
						例如：<br>
						通过本次实习，使我的沟通表达能力和统计分析能力得到了提升。`
		},
		// 校园经历
		{
			type: `school`,
			name: `校园经历的主要负责内容`,
			msg: `担任职务具体负责哪些工作，是策划/执行/统筹/协调还是什么，面向的群体是谁，要具体说明。<br>
						例如（学生会文艺部部长）：<br>
						1、根据学期安排，协助老师进行校园文化活动的策划、宣传、统筹与实施；<br>
						2、部分成员的值班安排、团建活动、带教等部门管理工作。`
		},
		{
			type: `school`,
			name: `校园经历的实习/实践成果`,
			msg: `实习成果尽量以数据来呈现，突出个人成果以及做出的贡献。<br>
						例如：<br>
						策划并组织校园歌手大赛、主持人大赛、演讲比赛、迎新晚会等共计10余场校级活动，参与学生人数达3000+；以上活动均取得良好的效果，团队获得老师及同学的一致好评。`
		},
		{
			type: `school`,
			name: `校园经历的成长收获`,
			msg: `根据校园经历的具体内容，进行某能力提升的说明。<br>
						例如：<br>
						锻炼了我的组织协调能力及统筹策划能力，大大提升了我的抗压能力及应变能力。`
		},
		
		// 荣誉称号
		{
			type: `honor`,
			name: `荣誉称号`,
			msg: `大学期间所获得的国家级、省级、市级、校级、班级的荣誉证书及称号（若荣誉较多，则列举含金量高的证书，无关紧要的如“某次校园宿舍卫生评比大赛优秀宿舍称号”这样的奖项不用填写；若高中有国家级/省级的荣誉或称号也可填写）`
		},
		// 技能证书
		{
			type: `skill`,
			name: `技能证书`,
			msg: `拥有专业证书，是提高求职竞争力的重要筹码，如有继续学习考试的计划，也可弥补证书不够的短板。<br>
						1.与岗位匹配度较高的国家认可的证书。<br>
						2.语言能力成绩/证书（国家）。<br>
						3.与岗位相关联的含金量高的证书等。`
		},
		// 兴趣爱好
		{
			type: `hobby`,
			name: `兴趣爱好`,
			msg: `兴趣爱好是能够反映一个人的做事态度、性格类型等的综合情况的，也是用人单位考量岗位匹配度的一个因素。如：喜欢长跑的人大多数能吃苦耐劳、有坚忍不拔、持之以恒的品格；喜欢旅行的人大多不愿意被束缚，不喜欢循规蹈矩等。在填写自己的兴趣爱好时，需要思考一下，你的兴趣爱好能够体现出哪些和用人单位及求职岗位匹配的特点。`
		}
		
	]
}