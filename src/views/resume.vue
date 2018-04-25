<template>
  <div class="resume-page">
    <headerNav></headerNav>
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="3">
          <div class="grid-content">
            <div class="name-box">
              <div class="title">小峰峰 <span class="resume-text">(简历)</span></div>
              <div class="time">时间: 2013-05-01</div>
              <div class="operation">
                <div class="icon-box refresh">
                  <i class="el-icon-service"></i>
                  <div class="icon-text">刷新</div>
                </div>
                <div class="icon-box preview">
                  <i class="el-icon-service"></i>
                  <div class="icon-text">预览</div>
                </div>
              </div>
            </div>
            <ul class="tabs">
              <li>
                <i class="el-icon-service"></i>
                <span>基本信息</span>
                <i class="el-icon-check"></i>
              </li>
              <li class="active">
                <i class="el-icon-service"></i>
                <span>求职意向</span>
                <i class="el-icon-check"></i>
              </li>
              <li>
                <i class="el-icon-service"></i>
                <span>工作经验</span>
                <i class="el-icon-check"></i>
              </li>
              <li>
                <i class="el-icon-service"></i>
                <span>教育经历</span>
                <i class="el-icon-check"></i>
              </li>
              <li>
                <i class="el-icon-service"></i>
                <span>在校情况</span>
                <i class="el-icon-check"></i>
              </li>
              <li>
                <i class="el-icon-service"></i>
                <span>技能证书</span>
                <i class="el-icon-check"></i>
              </li>
              <li>
                <i class="el-icon-service"></i>
                <span>自我评价</span>
                <i class="el-icon-check"></i>
              </li>
            </ul>
            <div class="save">
              <i class="el-icon-service"></i>
              <span>保存关闭</span>
            </div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content info-box">
            <div class="base-info">
              <div class="title">
                <i class="el-icon-bell"></i>
                <span>基本信息</span>
              </div>
              <div class="base-content">
                <div class="avtar">
                  <img src="../assets/images/demo/05.jpg" alt="">
                </div>
                <div class="info-list">
                  <div class="name">
                    <span>小峰峰</span>
                    <i class="el-icon-edit-outline right-icon"></i>
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
                      <i class="el-icon-bell"></i>123456789@123.com
                    </span>
                    <span>
                      <i class="el-icon-bell"></i>12343546546899
                    </span>
                    <span class="more">
                      更多<i class="el-icon-arrow-down"></i>
                    </span>
                  </div>
                </div>
                <div class="more-info">
                  <span class="arrow-top"></span>
                  <span>户口/国籍：上海市</span>
                  <span>婚姻状态：未婚</span>
                </div>
              </div>
            </div>
          </div>
          <div class="grid-content info-box">
            <div class="base-info">
              <div class="title">
                <i class="el-icon-bell"></i>
                <span>求职意向</span>
                <i class="el-icon-edit-outline right-icon"></i>
              </div>
              <ul class="item-list">
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
                    <span class="name">到岗时间  </span>一周之内
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid-content info-box">
            <div class="base-info">
              <div class="title">
                <i class="el-icon-bell"></i>
                <span>工作经验</span>
              </div>
            </div>
          </div>
          <div class="grid-content info-box">
            <div class="base-info">
              <div class="title">
                <i class="el-icon-bell"></i>
                <span>教育经历</span>
              </div>
            </div>
          </div>
          <div class="grid-content info-box">
            <div class="base-info">
              <div class="title">
                <i class="el-icon-bell"></i>
                <span>在校情况</span>
              </div>
            </div>
          </div>
          <div class="grid-content info-box">
            <div class="base-info">
              <div class="title">
                <i class="el-icon-bell"></i>
                <span>技能证书</span>
              </div>
              <div class="skill"></div>
            </div>
          </div>
          <div class="grid-content info-box">
            <div class="base-info">
              <div class="title">
                <i class="el-icon-bell"></i>
                <span>自我评价</span>
              </div>
              <div class="evaluate"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="hr-tag">
              <div class="title">
                <i class="el-icon-bell"></i>
                <span>HR视角小提示</span>
              </div>
              <div class="tag">基本信息</div>
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
  </div>
</template>
<script>
import headerNav from "../components/HeaderNav.vue";
export default {
  name: "resume",
  data() {
    return {
      msg: "this is resume page"
    };
  },
  computed: {},
  methods: {},
  watch: {},
  components: {
    headerNav
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/css/colors.less");
.resume-page {
  background-color: @main-color-bg;
  padding-bottom: 25px;
  .right-icon {
    float: right;
    padding-top: 7px;
    color: @main-color-yellow;
    cursor: pointer;
  }
  .container {
    width: 1200px;
    margin: 20px auto;
    .info-box {
      margin-bottom: 10px;
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
            .icon-text {
              padding-top: 6px;
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
        box-sizing: border-box;
        border-bottom: 1px solid @main-color-border;
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
          color: @main-color-blue;
        }
      }
      .save {
        line-height: 30px;
        padding: 10px;
        span {
          margin: 0 10px;
        }
      }
      .base-info {
        padding: 10px 20px;
        border-radius: 10px;
        .title {
          line-height: 30px;
          i {
            color: @main-color-yellow;
          }
          .right-icon {
            color: @main-color-blue;
          }
          span {
            color: @main-color-gray;
            padding-left: 20px;
          }
        }
        .base-content {
          width: 100%;
          display: inline-block;
          margin: 5px 0;
          .avtar {
            float: left;
            width:85px;
            height: 85px;
            img {
              width:85px;
              height: 85px;
            }
          }
          .info-list {
            margin-left: 105px;
            .name {
              line-height: 28px;
              .right-icon {
                color: @main-color-yellow;
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
            background-color: rgba(234,240,253,1);
            display: flex;
            display: -webkit-flex;
            position: relative;
            span {
              flex: 1 1 auto;
            }
            .arrow-top {
              width:0;
              height: 0;
              border-top: 10px solid transparent;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid rgba(234,240,253,1);
              position: absolute;
              top: -19px;
              right: 25px;
            }
          }
        }
        .item-list {
          width: 100%;
          display: inline-block;
          li {
            line-height: 30px;
            display: flex;
            display: -webkit-flex;
            .item {
              width: 50%;
            }
            .name {
              width: 90px;
              letter-spacing: 2px;
              color: @main-color-gray;
              display: inline-block;
            }
          }
        }
      }
      .hr-tag {
        padding: 15px;
        .title {
          color: @main-color-blue;
          span {
            padding-left: 10px;
          }
        }
        .tag {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          border: 1px solid @main-color-border;
          border-radius: 15px;
          padding-left: 30px;
          margin: 10px 0;
        }
        .tag-box {
          .tag-title {
            line-height: 26px;
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
  }
}
</style>


