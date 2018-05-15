<template>
  
</template>
<script>
  export default {
    data(){
      return {
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
        salaryRange: [
          {
            value: "0",
            label: "6-8k"
          },
          {
            value: "1",
            label: "8-10k"
          },
          {
            value: "2",
            label: "10-15k"
          },
          {
            value: "3",
            label: "15-20k"
          },
          {
            value: "4",
            label: "20k-25k"
          },
          {
            value: "5",
            label: "25k以上"
          },
        ],
        workplaceList: [
          {
            value: "0",
            label: "上海"
          },
          {
            value: "1",
            label: "北京"
          },
          {
            value: "2",
            label: "深圳"
          },
          {
            value: "3",
            label: "杭州"
          },
          {
            value: "4",
            label: "苏州"
          },
        ],
        positionType: [
          {
            value: "0",
            label: "前端开发"
          },
          {
            value: "1",
            label: "后端开发"
          },
          {
            value: "2",
            label: "研发经理"
          }
        ],
        industryType: [
          {
            value: "0",
            label: "金融"
          },
          {
            value: "1",
            label: "经济"
          },
          {
            value: "2",
            label: "电商"
          },
          {
            value: "3",
            label: "教育"
          }
        ],
        workType: [
          {
            value: "0",
            label: "work0"
          },
          {
            value: "1",
            label: "work1"
          },
          {
            value: "2",
            label: "work2"
          },
          {
            value: "3",
            label: "work2"
          },
          {
            value: "4",
            label: "work4"
          },
        ],
        arriveRange: [
          {
            value: "0",
            label: "随时到岗"
          },
          {
            value: "1",
            label: "一周内"
          },
          {
            value: "2",
            label: "月内到岗"
          },
          {
            value: "3",
            label: "其他"
          }
        ],
        companySize: [
          {
            value: "0",
            label: "0-20人"
          },
          {
            value: "1",
            label: "20-50人"
          },
          {
            value: "2",
            label: "50-100人"
          },
          {
            value: "3",
            label: "100-300人"
          },
          {
            value: "4",
            label: "300以上"
          },
        ],
        funType: [
          {
            value: "0",
            label: "fun0"
          },
          {
            value: "1",
            label: "fun1"
          },
          {
            value: "2",
            label: "fun2"
          },
          {
            value: "3",
            label: "fun3"
          },
          {
            value: "4",
            label: "fun4"
          },
        ],
        companyNature: [
          {
            value: "0",
            label: "company0"
          },
          {
            value: "1",
            label: "company1"
          },
          {
            value: "2",
            label: "company2"
          },
          {
            value: "3",
            label: "company3"
          },
          {
            value: "4",
            label: "company4"
          },
        ],
        majorType: [
          {
            value: "0",
            label: "major0"
          },
          {
            value: "1",
            label: "major1"
          },
          {
            value: "2",
            label: "major2"
          },
          {
            value: "3",
            label: "major3"
          },
          {
            value: "4",
            label: "major4"
          },
        ], //专业
        eduNatureType: [
          {
            value: "0",
            label: "edu0"
          },
          {
            value: "1",
            label: "edu1"
          },
          {
            value: "2",
            label: "edu2"
          },
          {
            value: "3",
            label: "edu3"
          },
          {
            value: "4",
            label: "edu4"
          },
        ], //专业性质
        degreeType: [
          {
            value: "0",
            label: "中专"
          },
          {
            value: "1",
            label: "大专"
          },
          {
            value: "2",
            label: "本科"
          },
          {
            value: "3",
            label: "本科以上"
          }
        ], //学历/学位
      }
    },
    methods: {

    }
  }
</script>
