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
			label: "求职意向",
			type: "expect"
		},
		{
			value: 4,
			label: "工作经验",
			type: "workexper"
		},
		{
			value: 5,
			label: "教育经历",
			type: "edu"
		},
		{
			value: 6,
			label: "在校情况",
			type: "school"
		},
		{
			value: 7,
			label: "技能证书",
			type: "skill"
		}
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
		//求职意向
		{
			type: `expect`,
			name: `期望薪资`,
			msg: `1.期望薪资是求职者心里对该岗位及公司所能给到的待遇的一个预估及对自我情况的判断。<br>
						2.过高的期望薪资会给HR造成的印象是此求职者眼高手低，不能脚踏实地，降低电话邀约的概率；<br>
						3.过低的期望薪资会给HR造成的印象是此求职者对自己不自信，或者此求职者存在其他问题，也会有邀约的顾虑；<br>
						4.符合市场行情的期望薪资是最正常的和最安全的选择，具体薪资需等到面试通过再进行。一般情况用人单位会给到该岗位合理的薪资，在面试后谈薪资时请注意薪资的构成。
							（底薪+绩效+补贴+年终奖+每年多少薪等）。`
		},
		{
			type: `expect`,
			name: `期望工作地点`,
			msg: `1.期望工作地点有多地点，可能求职者职业稳定性不够，会有迁移到另一个城市的可能。`
		},
		{
			type: `expect`,
			name: `期望职能/职位`,
			msg: `1.期望的职位最好与实习经历有一定内在关联性，这可能意味着你有更丰富的相关工作经验。期望薪资是求职者心里对该岗位及公司所能给到的待遇的一个预估及对自我情况的判断。<br>
						2.期望的职位最好与本人的实际能力匹配，提前了解HR对该岗位的基本要求，包括工作年限，工作经验等。<br>
						3.期望的职位可以是多个，但应该属于同一类型，例如，市场专员，销售助理；如果多类型同时出现，意味着您对自己职业方向的迷茫，由此可能存在职业不稳定性，例如，销售代表，会计，这两个期望职位放在一起。`
		},
		{
			type: `expect`,
			name: `期望行业`,
			msg: `1.如果不匹配，可能意味着职业规划方向不清晰，或者工作习惯不严谨。`
		},
		{
			type: `expect`,
			name: `到岗时间`,
			msg: `1.若用人单位急需用人，则希望求职者立即到岗，筛选简历会看求职者的到岗时间来进行邀约判断，若选择到岗时间的周期较长，可能在简历初筛阶段就被淘汰掉了。<br>
						2.同一岗位的缺口是有限的，当同时有多个条件均等的候选人，则选择最快到岗的那一位；<br>
						3.用人单位的用人规划可能实时在调整，到岗时间越近则变数越小，减少出现面试到了合适的候选人，但由于候选人迟迟无法到岗，公司战略调整该岗位缩编不再需要补人的情况。<br>
						4.一般情况下，到岗时间选择随时到岗，或1周内为佳。`
		},
		{
			type: `evaluate`,
			name: `自我评价`,
			msg: `请选择自我评价从性格特征、人际处事与沟通风格、职业价值观、工作能力、实践经验等多角度描述自我，突出与应聘岗位相关的重点与特长。<br>
						1.高度凝练的表达，有助于HR快速了解应聘者的全貌。<br>
						2.突出重点与特长，有助于强化简历竞争力。`
		},
		{
			type: `workexper`,
			name: `工作经验/社会实习实践/校内实践`,
			msg: `工作经验与实习经历，是应届生简历中的重点中的重点，资深HR能够通过简历这个部分描述情况，初步判断出应聘者的职业规划能力、实践能力、逻辑思维能力、对工作的整体把握能力、是否具备主动推进工作的素质等。`
		},
		{
			type: `workexper`,
			name: `工作时间`,
			msg: `1.请确认实习实践的描述按倒叙进行。<br>
						2.最近一次的工作经验，往往代表了过往多次实习实践后的成果。`
		},
		{
			type: `workexper`,
			name: `公司名称`,
			msg: `1.HR可根据求职者经历过的公司来判断该求职者适合的工作氛围及已习得的工作方式，国企、上市公司、私企等的作息、工作饱和度均不同，若此公司为创业型公司，对一直在国企的员工求职也会考虑该求职者的工作主动性、抗压能力及稳定性。<br>
						2.若公司全称不为人所熟知，但商标名称是大众所熟知的，可以使用商标名称，让HR可以对求职者所在行业能有一定的了解，以此判断该求职者是否为同行业或跨行业求职。`
		},
		{
			type: `workexper`,
			name: `工作类型`,
			msg: `1.全职一般指求职者为满足该岗位需求的可签署劳动合同的自然人，毕业生已取得学历证、学位证，且人事档案、组织关系等根据招聘方需求可选择转入该公司，公司为全职员工依法缴纳社保公积金等，正常情况下员工要保证每周不低于40小时的上班时间。<br>
						2.兼职一般为企业用工的补充形式，以固定的时间段或者固定的工作量来支付给劳动者报酬，但劳动者可同时服务于其他企业或公司，且该公司不用为劳动者缴纳社保、公积金等。<br>
						3.全职实习指还未取得学位证、毕业证的学生劳动单位进行工作，但工作时间与全职员工一致，签署实习协议，如能留任则签署“三方协议”，等拿到毕业证、学位证之后签署正式劳动合同。实习期间不缴纳社保、公积金，报酬可按月计算，也可按出勤天数计算。<br>
						4.兼职实习一般要求学生保证每周上班时间最少为2~3天，也有要求一周5天，报酬按天计算。`
		},
		{
			type: `workexper`,
			name: `职位`,
			msg: `判断求职者是否有过求职岗位的工作经验，部分大公司对部分岗位可能会进行背景调查。`
		},
		{
			type: `workexper`,
			name: `工作描述`,
			msg: `1.工作经验的描述，建议站在HR的绩效考核的角度，全面描述在该单位的全程工作过程，参与多工种、多岗位的，宜重点突出，繁简有度。如校内实践成果突出，亦可在此罗列。<br>
						2.描述内容应包括在职期间，具体负责什么，协助什么，参与什么，讲清楚自己的职业边界在哪里。<br>
						3.描述内容还应包括在职期间取得怎样的重大工作成果，或获得哪方面的具体经验。<br>
						4.能否做到上述几点，在一定程度上显示了结识了求职者在工作中是否全面了解自己的工作职责，是否具有全局观，了解自己所负责的工作对公司整体的影响，也从侧面反应了求职者是否具有主动开展工作的意识。HR可从这些细节中，可以获悉求职者在职场中的全局观、工作主动意识、工作思维方式等。`
		},
		{
			type: `workexper`,
			name: `工作成果`,
			msg: `工作成果尽量以清晰的数据来呈现，突出个人成果以及做出的贡献；无法用数据表达的成绩说服力较弱，如“获得领导嘉奖/表扬”之类。获得的具体经验宜清晰、接地气，避免假大空。`
		},
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
			name: `主修课程`,
			msg: `主修课程只写与申请岗位相关的即可，相关性强的写在前面。亦可不罗列主修课程。`
		},
		{
			type: `edu`,
			name: `培训经历`,
			msg: `如有相关培训经历，建议填写，为加分项。`
		},

		{
			type: `school`,
			name: `校内职务与荣誉`,
			msg: `1.校级、院级的职务和班长等职务均能一定程度体现该求职者的团队合作、协调能力。<br>
						2.填写顺序有规律，可按照校级顺序、院级顺序、班级顺序进行。若奖项过多，则罗列与岗位匹配且含金量高的2~3项即可。`
		},
		{
			type: `skill`,
			name: `技能证书`,
			msg: `拥有专业证书，是提高求职竞争力的重要筹码，如有继续学习考试的计划，也可弥补证书不够的短板。<br>
						1.与岗位匹配度较高的国家认可的证书。<br>
						2.语言能力成绩/证书（国家）。<br>
						3.与岗位相关联的含金量高的证书等。`
		}
	]
}


