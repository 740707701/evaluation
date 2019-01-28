<template>
  <div class="vocation-list">
    <div class="banner">
      <img src="../../assets/images/industry_banner.png" alt="">
    </div>
    <div class="container">
      <div class="course-list">
        <div class="item" v-for="course in courseList" :key="course.id" @click="toVocationDetail(course.id)">
          <img :src="course.pic" alt="">
          <div class="course-info">
            <div class="name">{{course.cognitionName}}</div>
            <div class="desc" :title="course.desc">{{course.desc}}</div>
            <div class="tag">
              <span class="price" v-if="course.cognitionMode===1">¥ {{course.price}}</span>
              <span class="price" v-if="course.cognitionMode===0">免费</span>
              <span class="rate">
                <el-rate v-model="course.star" disabled :max="5" :allow-half="false"></el-rate>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vocationList',
  data() {
    return {
      permission: '',
      value: 3.7,
      courseList: []
    }
  },
  created() {
    this.getCourseList()
  },
  methods: {
    getCourseList() {
      this.$store
        .dispatch("VOCATION_COURSE_LIST")
        .then(res => {
          this.courseList = res.data
        })
        .catch(err => {
          if (err.data) {
            this.$message({type: "error", message: err.data.msg})
          } else {
            this.$message({type: "error", message: "获取数据失败，请稍后重试！"})
          }
        })
		},
		toVocationDetail(courseId) {
			this.$router.push({ path: '/vocationDetail', query: {courseId: courseId} })
		}
  }
}
</script>

<style lang="less">
@import "../../assets/css/colors.less";
  .vocation-list {
    width: 100%;
    min-height: 100%;
    background-color: @main-color-bg;
    padding-bottom: 25px;
    .banner {
      width: 100%;
      img {
        width:100%;
        height: auto;
        border: none;
      }
    }
    .container {
      width: 1200px;
      margin: 20px auto;
      .course-list {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        .item {
          width: 224px;
          background-color: #fff;
          box-shadow:0px 0px 9px 0px rgba(209,209,209,0.63);
          border-radius:4px;
          margin-bottom: 20px;
          margin-right: 16px;
          cursor: pointer;
          img {
            width: 100%;
            height: 110px;
            display: inline-block;
          }
          .course-info {
            padding: 0 10px 10px 10px;
            .name {
              color: #000;
              line-height: 22px;
              padding-bottom: 6px;
            }
            .desc {
              font-size: 12px;
              line-height: 1.3;
              color: #666666;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break: break-all;
              display: -webkit-box;
            }
            .tag {
              width: 100%;
              display: inline-block;
              padding-top: 10px;
              .price {
                float: left;
                color: #FF4C4C;
                font-weight: 600;
              }
              .rate {
                float: right;
                font-size: 14px;
                /deep/ .el-rate__icon {
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>