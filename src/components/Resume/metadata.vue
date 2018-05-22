<template>
  
</template>
<script>
	export default {
		name: 'metadata',
		data(){
			return {
				metaData: {},
				// cities: [],
				// native: [],
				// careerType: [],
				// jobStatus: [],
				// marriageStatus: [],
				// salaryRange: [],
				// workplaceList: [],
				// positionType: [],
				// industryType: [],
				// workType: [],
				// arriveRange: [],
				// companySize: [],
				// funType: [],
				// companyNature: [],
				// majorType: [],
				// eduNatureType: [],
				// degreeType: []
			}
		},
		created: function(){
			this.getData()
		},
		methods: {
			getData: function(){
				Promise.all([
					this.$store.dispatch('TREEITEM', {dictCode: 'AREA'}), //行政区划
					this.$store.dispatch('TREEITEM', {dictCode: 'FUNCTION'}), //职能
					this.$store.dispatch('TREEITEM', {dictCode: 'INDUSTRY'}), //行业类别
					this.$store.dispatch('DICTITEM', {dictCode: 'COMPANY_NATURE'}), //公司范围
					this.$store.dispatch('DICTITEM', {dictCode: 'EDUCATION'}), //学历/学位
					this.$store.dispatch('DICTITEM', {dictCode: 'EXPECT_SALARY'}), //期望薪资
					this.$store.dispatch('DICTITEM', {dictCode: 'SCHOOLWORK_PROP'}), //学业性质
					this.$store.dispatch('DICTITEM', {dictCode: 'JOB_STATUS'}), //工作状态
					this.$store.dispatch('DICTITEM', {dictCode: 'MARRIAGE_STATUS'}), //婚姻状态
					this.$store.dispatch('DICTITEM', {dictCode: 'NATIVE'}), //籍贯
					this.$store.dispatch('DICTITEM', {dictCode: 'PROF_TYPE'}), //职业类型
					this.$store.dispatch('DICTITEM', {dictCode: 'SEX'}) //性别
					]).then(data => {
						this.metaData.cities = data[0].data
						this.metaData.funType = data[1].data
						this.metaData.industryType = data[2].data
						this.metaData.companyNature = data[3].data
						this.metaData.degreeType = data[4].data
						this.metaData.salaryRange = data[5].data
						this.metaData.schoolWorkType = data[6].data
						this.metaData.jobStatus = data[7].data
						this.metaData.marriageStatus = data[8].data
						this.metaData.native = data[9].data
						this.metaData.careerType = data[10].data
						this.metaData.sex = data[11].data

						this.$emit("metadata", this.metaData)
						console.log('调用次数显示')
							
					}).catch(err => {
						if(err.msg){
						this.$message({
								message: err.msg,
								type: "error"
						});
						}else {
						this.$message({
								message: "获取字典数据失败",
								type: "error"
						});
						}
					})
			},
		}
	}
</script>
