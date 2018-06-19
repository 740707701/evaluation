<template>
  <div class="courselist-page">
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="left-list">
            <el-tabs v-model="activeName" @tab-click="tabsClick" class="tabs-box">
              <el-tab-pane label="专业选择" name="first">
                <ul class="item">
                  <li v-for="item in evaluationList" :key="item.id" @click="toDetail(item.id)">
                    <img :src="item.picAll" alt="">
                    <div class="info">
                      <p class="title">{{item.cepingName}}</p>
                      <div class="gray">
                        <span>适应：{{item.peopleScope}}</span>
                        <span>难度： {{item.cepingLevel}}</span>
                      </div>
                      <div class="price" v-if="item.price">¥ {{item.price}}</div>
                    </div>
                    <div class="desc" :title="item.simpleRemark">
                      {{item.simpleRemark}}
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="自我认知" name="second">
                <ul class="item">
                  <li v-for="item in evaluationList" :key="item.id" @click="toDetail(item.id)">
                    <img :src="item.picAll" alt="">
                    <div class="info">
                      <p class="title">{{item.cepingName}}</p>
                      <div class="gray">
                        <span>适应：{{item.peopleScope}}</span>
                        <span>难度： {{item.cepingLevel}}</span>
                      </div>
                      <div class="price" v-if="item.price">¥ {{item.price}}</div>
                    </div>
                    <div class="desc" :title="item.simpleRemark">
                      {{item.simpleRemark}}
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="职业形象与风格" name="third">
                <ul class="item">
                  <li v-for="item in evaluationList" :key="item.id" @click="toDetail(item.id)">
                    <img :src="item.picAll" alt="">
                    <div class="info">
                      <p class="title">{{item.cepingName}}</p>
                      <div class="gray">
                        <span>适应：{{item.peopleScope}}</span>
                        <span>难度： {{item.cepingLevel}}</span>
                      </div>
                      <div class="price" v-if="item.price">¥ {{item.price}}</div>
                    </div>
                    <div class="desc" :title="item.simpleRemark">
                      {{item.simpleRemark}}
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="岗位分类" name="fourth">
                <ul class="item">
                  <li v-for="item in evaluationList" :key="item.id" @click="toDetail(item.id)">
                    <img :src="item.picAll" alt="">
                    <div class="info">
                      <p class="title">{{item.cepingName}}</p>
                      <div class="gray">
                        <span>适应：{{item.peopleScope}}</span>
                        <span>难度： {{item.cepingLevel}}</span>
                      </div>
                      <div class="price" v-if="item.price">¥ {{item.price}}</div>
                    </div>
                    <div class="desc" :title="item.simpleRemark">
                      {{item.simpleRemark}}
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <div class="nodata" v-if="!evaluationList.length">还没有任何数据~</div>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right-list">
            <p class="title">热门课程</p>
            <div class="nodata" v-if="!evaluationList.length">还没有热门课程哦~</div>
            <ul class="item-box">
              <li v-for="item of hotList" :key="item.id" @click="toDetail(item.id)">
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
import { mapState } from "vuex";
export default {
  name: "courselist",
  data() {
    return {
      activeName: "first",
      tabIndex: 0,
      evaluationList: [],
      hotList: []
    };
  },
  computed: {},
  created: function() {
    let isLogin = decodeURIComponent(this.$route.query.isLogin);
    this.getEvaluationList(0);
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
        .dispatch("HOT_LIST", { size: 10 })
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
    toDetail: function(id) {
      if (this.$store.state.isLogin) {
        this.$router.push({ name: `coursedetail`, params: { id: id } });
      } else {
        this.$store.commit("setShowLoginPage", true);
        this.$router.push({
          path: "/",
          query: { redirect: "/coursedetail/" + id }
        });
      }
    },
    tabsClick: function(tab, event) {
      this.tabIndex = Number(tab.index);
      this.getEvaluationList(this.tabIndex);
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.courselist-page {
  height: 100%;
  .nodata {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .container {
    height: calc(100% - 30px);
    .el-row,
    .el-col {
      height: 100%;
    }

    .left-list {
      background-color: #fff;
      height: calc(100% - 30px);
      border-radius: 10px;
      padding: 0 20px;
      .tabs-box {
        width: 100%;
        .item {
          display: flex;
          display: -webkit-flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            padding-bottom: 10px;
            width: 170px;
            img {
              width: 100%;
              height: 110px;
              border-radius: 10px;
              background-color: #fafafa;
              display: inline-block;
            }
            .info {
              padding: 0 5px;
              .gray {
                color: #a2a9b8;
                font-size: 12px;
                line-height: 1.5;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
              }
              .price {
                line-height: 1.5;
              }
              .title {
                // font-weight: bold;
              }
            }
            .desc {
              font-size: 12px;
              height: 32px;
              line-height: 18px;
              padding: 0 5px;
              color: #a2a9b8;
              overflow: hidden;
              text-overflow: ellipsis;
              // white-space: nowrap; //强制不换行
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
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
          .item {
            width: 100%;
            margin-bottom: 11px;
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
                font-size: 12px;
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


