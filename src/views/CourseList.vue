<template>
  <div class="courselist-page">
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="left-list">
            <el-tabs v-model="activeName" class="tabs-box">
              <el-tab-pane label="专业选择" name="first">
                <ul class="item">
                  <li v-for="item in majorChoice" :key="item.id" @click="toDetail(item.id)">
                    <img :src="item.img" alt="">
                    <div class="info">
                      <p class="title">{{item.name}}</p>
                      <div class="gray">
                        <span>适应：{{item.range}}</span>
                        <span>难度： {{item.difficulty}}</span>
                      </div>
                      <div class="price">¥ {{item.price}}</div>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="自我认知" name="second">
                <ul class="item">
                  <li v-for="item in selfCognition" :key="item.id" @click="toDetail(item.id)">
                    <img :src="item.img" alt="">
                    <div class="info">
                      <p class="title">{{item.name}}</p>
                      <div class="gray">
                        <span>适应：{{item.range}}</span>
                        <span>难度： {{item.difficulty}}</span>
                      </div>
                      <div class="price">¥ {{item.price}}</div>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="职业形象与风格" name="third">
                <ul class="item">
                  <li v-for="item in occupationStyle" :key="item.id" @click="toDetail(item.id)">
                    <img :src="item.img" alt="">
                    <div class="info">
                      <p class="title">{{item.name}}</p>
                      <div class="gray">
                        <span>适应：{{item.range}}</span>
                        <span>难度： {{item.difficulty}}</span>
                      </div>
                      <div class="price">¥ {{item.price}}</div>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="岗位分类" name="fourth">
                <ul class="item">
                  <li v-for="item in postClassification" :key="item.id" @click="toDetail(item.id)">
                    <img :src="item.img" alt="">
                    <div class="info">
                      <p class="title">{{item.name}}</p>
                      <div class="gray">
                        <span>适应：{{item.range}}</span>
                        <span>难度： {{item.difficulty}}</span>
                      </div>
                      <div class="price">¥ {{item.price}}</div>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right-list">
            <p class="title">热门课程</p>
            <ul class="item-box">
              <li v-for="item of majorChoice" :key="item.id" @click="toDetail(item.id)">
                  <div class="item">
                    <img :src="item.img" alt="">
                    <div class="item-center">
                      <p class="item-title">{{item.name}}</p>
                      <p class="gray">难度：{{item.difficulty}}</p>
                    </div>
                    <el-button round size="small" class="price-btn">¥ {{item.price}}</el-button>
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
export default {
  name: "courselist",
  data() {
    return {
      msg: "this id course list page",
      activeName: "third",
      majorChoice: [
        {
          id: "00",
          name: "高考专业选择",
          img: require("../assets/images/demo/01.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "01",
          name: "高考专业选择",
          img: require("../assets/images/demo/01.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "02",
          name: "高考专业选择",
          img: require("../assets/images/demo/01.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "03",
          name: "高考专业选择",
          img: require("../assets/images/demo/01.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "04",
          name: "高考专业选择",
          img: require("../assets/images/demo/01.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "05",
          name: "高考专业选择",
          img: require("../assets/images/demo/01.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        }
      ],
      selfCognition: [
        {
          id: "10",
          name: "自我认知",
          img: require("../assets/images/demo/02.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "11",
          name: "自我认知",
          img: require("../assets/images/demo/02.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "12",
          name: "自我认知",
          img: require("../assets/images/demo/02.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "13",
          name: "自我认知",
          img: require("../assets/images/demo/02.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "14",
          name: "自我认知",
          img: require("../assets/images/demo/02.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        }
      ],
      occupationStyle: [
        {
          id: "20",
          name: "职业形象与风格",
          img: require("../assets/images/demo/03.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "21",
          name: "职业形象与风格",
          img: require("../assets/images/demo/03.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "22",
          name: "职业形象与风格",
          img: require("../assets/images/demo/03.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "23",
          name: "职业形象与风格",
          img: require("../assets/images/demo/03.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "24",
          name: "职业形象与风格",
          img: require("../assets/images/demo/03.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        }
      ],
      postClassification: [
        {
          id: "30",
          name: "岗位分类",
          img: require("../assets/images/demo/04.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "31",
          name: "岗位分类",
          img: require("../assets/images/demo/04.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "32",
          name: "岗位分类",
          img: require("../assets/images/demo/04.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "33",
          name: "岗位分类",
          img: require("../assets/images/demo/04.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        },
        {
          id: "34",
          name: "岗位分类",
          img: require("../assets/images/demo/04.jpg"),
          difficulty: "高级", // 难度
          range: "高中生", // 适应范围
          price: "9.80"
        }
      ]
    };
  },
  methods: {
    toDetail: function(id) {
      console.log(id);
      this.$router.push({ name: `coursedetail`, params: { id: id } });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../assets/css/colors.less";
.courselist-page {
  .container {
    .left-list {
      background-color: #fff;
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
            order: 4;
            padding-bottom: 10px;
            img {
              width: 180px;
              height: 110px;
              border-radius: 10px;
            }
            .info {
              padding: 0 5px;
              .gray {
                color: @main-color-gray;
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
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .right-list {
      background-color: #fff;
      border-radius: 10px;
      padding-bottom: 4px;
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


