<template>
  <div class="courselist-page">
    <Banner :hideBanner="hideBanner"></Banner>
    <div class="container">
      <div class="category">
        <p class="title">
          <i class="iconfont icon-star"></i>
          测试分类</p>
      </div>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="left-list">
            <el-tabs v-model="activeName" @tab-click="tabsClick" class="tabs-box">
              <el-tab-pane :name="m.code" v-for="m in cepingItem" :key="m.id" :label="m.name">
                <ul class="item">
                  <li v-for="item in evaluationList" :key="item.cepingId" @click="toDetail(item.cepingId)">
                    <img :src="item.picAll" alt="">
                    <div class="info">
                      <p class="title">{{item.cepingName}}</p>
                      <div class="price" v-if="item.price">¥ {{item.price}}</div>
                    </div>
                    <div class="desc" :title="item.simpleRemark">
                      {{item.simpleRemark}}
                    </div>
                  </li>
                  <div class="clear"></div>
                </ul>
              </el-tab-pane>
              <div class="nodata" v-if="!evaluationList.length">还没有任何数据~</div>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right-list">
            <p class="title">热门测评</p>
            <div class="nodata" v-if="!hotList.length">还没有热门测评哦~</div>
            <ul class="item-box">
              <li v-for="item of hotList" :key="item.cepingId" @click="toDetail(item.cepingId)">
                  <div class="item">
                    <img :src="item.picAll" alt="">
                    <div class="item-center">
                      <p class="item-title">{{item.cepingName}}</p>
                      <p class="gray">难度：{{item.cepingLevel}}</p>
                    </div>
                    <el-button round size="small" class="price-btn" item.price>¥ {{item.price}}</el-button>
                  </div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Banner from "@/components/Banner.vue";
import { mapState } from "vuex";
export default {
  name: "courselist",
  data() {
    return {
      activeName: '',
      tabIndex: 0,
      hideBanner: false,
      evaluationList: [],
      hotList: [],
      cepingItem: []
    };
  },
  computed: {},
  created: function() {
    let isLogin = decodeURIComponent(this.$route.query.isLogin);
    this.getCepingItem()
    this.getHotList();
  },
  methods: {
    getEvaluationList: function(index) {
      this.$store
        .dispatch("EVALUATION_LIST", { cepingItem: index })
        .then(res => {
          this.evaluationList = res.data;
        })
        .catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取数据失败"
            });
          }
        });
    },
    getHotList: function() {
      this.$store
        .dispatch("HOT_LIST", { size: 9 })
        .then(res => {
          this.hotList = res.data;
        })
        .catch(err => {
          if (err.data.msg) {
            this.$message({
              type: "error",
              message: err.data.msg
            });
          } else {
            this.$message({
              type: "error",
              message: "获取热门测评失败"
            });
          }
        });
    },
    getCepingItem() {
      this.$store.dispatch('COURSE_ITEM').then(res => {
        this.cepingItem = res.data
        this.getEvaluationList(res.data[0].code - 0);
        this.activeName = this.cepingItem[0].code
      }).catch(err => {
        if(err.data.msg){
          this.$message({type: 'error', message: err.data.msg})
        }else {
          this.$message({type: 'error', message: '获取测评分类失败，请稍后重试！'})
        }
      })
    },
    toDetail: function(cepingId) {
      if (this.$store.state.isLogin) {
        this.$router.push({ name: `coursedetail`, params: { cepingId: cepingId } });
      } else {
        this.$store.commit("setShowLoginPage", true);
        this.$router.push({
          path: "/",
          query: { redirect: "/coursedetail/" + cepingId }
        });
      }
    },
    tabsClick: function(tab, event) {
      this.hideBanner = true
      this.getEvaluationList(this.cepingItem[tab.index - 0].code - 0);
    }
  },
  components: {
    Banner
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/colors.less";
.courselist-page {
  height: 100%;
  .clear {
    clear: both;
    height: 0; 
    line-height: 0; 
    font-size: 0;
  }
  .nodata {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .container {
    width: 1200px;
    height: calc(100% - 30px);
    margin: 0 auto;
    .el-row,
    .el-col {
      height: 100%;
    }
    .category {
      .title {
        font-size: 16px;
        line-height: 3;
        margin-bottom: 6px;
        i {
          color: @main-color-blue;
          margin-right: 10px;
        }
      }
    }
    .left-list {
      background-color: #fff;
      height: calc(100% - 30px);
      border-radius: 10px;
      padding: 0 20px;
      .tabs-box {
        width: 100%;
        .item {
          font-size: 0;
          li {
            float: left;
            width: 168px;
            height: 260px;
            overflow: hidden;
            font-size: 14px;
            margin-bottom: 10px;
            margin-right: 18px;
            img {
              width: 100%;
              height: 110px;
              border-radius: 10px;
              background-color: #fafafa;
              display: inline-block;
            }
            .info {
              padding: 5px;
              .title {
                line-height: 1.2;
                font-size: 15px;
                font-weight: 600;
              }
              // .gray {
              //   color: #a2a9b8;
              //   font-size: 12px;
              //   line-height: 1.5;
              //   display: flex;
              //   display: -webkit-flex;
              //   justify-content: space-between;
              // }
              .price {
                font-size: 15px;
                font-weight: 600;
                line-height: 1.5;
              }
            }
            .desc {
              font-size: 14px;
              // height: 45px;
              overflow: hidden;
              line-height: 1.5;
              padding: 0 5px;
              color: #333;
              text-overflow: ellipsis;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              word-break: break-all;
              display: -webkit-box;
            }
          }
        }
      }
    }
    .right-list {
      background-color: #fff;
      border-radius: 10px;
      padding-bottom: 4px;
      height: calc(100% - 30px);
      .title {
        font-size: 14px;
        font-weight: 600;
        color: @main-color-blue;
        line-height: 40px;
        border-bottom: 1px solid @main-color-border;
        padding-left: 20px;
        margin-bottom: 15px;
      }
      .item-box {
        padding: 0 20px;
        li {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          cursor: pointer;
          margin-bottom: 11px;
          .item {
            width: 100%;
            img {
              float: left;
              width: 50px;
              height: 50px;
              border-radius: 4px;
              background-color: #fafafa;
            }
            .item-center {
              float: left;
              margin-left: 20px;
              .item-title {
                font-weight: bold;
              }
              .gray {
                font-size: 14px;
                color: @main-color-gray;
              }
            }
            .price-btn {
              float: right;
              width: 65px;
              font-weight: bold;
              color: @main-color-blue;
              background-color: #f0f1f6;
            }
          }
        }
      }
    }
  }
}
</style>


