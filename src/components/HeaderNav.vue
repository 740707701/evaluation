<template>
  <el-container>
    <el-header class="header">
      <nav class="navbar">
        <div class="nav-left">
          <img src="../assets/images/demo/02.jpg" alt="" class="logo">
        </div>
        <ul class="nav-center">
          <li>
            <router-link to="/" exact>职业测评</router-link>
          </li>
          <li>
            <router-link to="/careerplan">大学规划与管理</router-link>
          </li>
          <li>
            <router-link to="/resume">我的简历</router-link>
          </li>
          <li>
            <router-link to="/industryintro">书籍库</router-link>
          </li>
        </ul>
        <div class="nav-right">
          <router-link to="cartDetail"> 
            <el-button class="cart-btn" round size="small">
              <i class="el-icon-setting"></i>
              购物车
            </el-button>

          </router-link>
          <ul class="logout">
            <li>
              <router-link to="/login">登录</router-link>
            </li>
            <li>
              <router-link to="/register">注册</router-link>
            </li>
          </ul>
          <div class="login">
            <el-badge is-dot class="badge">
              <router-link to="/news">
                <i class="el-icon-bell"></i>
              </router-link>
            </el-badge>
            <el-dropdown>
              <el-button class="avatar el-dropdown-link">
                <img src="../assets/images/demo/02.jpg" alt="">
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/personalcenter">我的测评</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/order">订单中心</router-link>
                  </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/setting">个人设置</router-link>
                  </el-dropdown-item>
                <el-dropdown-item>退出账号</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </nav>
    </el-header>
  </el-container>
</template>
<script>
import Vue from "vue";
import { Button, Select } from "element-ui";
export default {
  name: "headerNav",
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import '../assets/css/colors.less';
.header {
  width: 100%;
  background-color: #fff;
  box-shadow: 8px 0px 20px rgba(163, 185, 235, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  a {
    color: @main-color-text;
  }
  .navbar {
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    .nav-left {
      float: left;
      margin-right: 30px;
      .logo {
        width: 140px;
        height: 48px;
        margin-top: 6px;
      }
    }
    .nav-center {
      display: inline-block;
      li {
        float: left;
        margin: 0 20px;
        a {
          height: 58px;
          line-height: 58px;
          padding: 0 10px;
          display: inline-block;
        }
        .router-link-active {
          color: @main-color-blue;
          border-bottom: 2px solid @main-color-blue;
        }
      }
    }
    .nav-right {
      float: right;
      .cart-btn {
        float: left;
        margin-top: 15px;
        margin-right: 10px;
      }
      .badge {
        margin: -18px 20px 0 20px;
      }
      .el-icon-bell {
        font-size: 20px;
        margin-top: -2px;
      }
      .avatar {
        width: 30px;
        height: 30px;
        display: inline-block;
        padding: 0;
        border: none;
        background-color: #fff;
        img {
          width: 30px;
          height: 30px;
          border-radius: 30px;
          margin-top: 15px;
        }
      }
      .avatar:hover,
      .avatar:active,
      .avatar:visited {
        background-color: transparent;
        font-weight: bold;
      }
      .login,
      .logout {
        float: left;
      }
      .logout {
        li {
          float: left;
          a {
            line-height: 60px;
            padding: 0 10px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>

