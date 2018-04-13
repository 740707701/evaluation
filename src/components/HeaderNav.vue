<template>
  <div class="headernav">
      <header class="header">
        <nav class="wrapper">
            <router-link to="/" exact class="logo">
                <img src="../assets/images/logo.png" alt="">
            </router-link>
            <ul class="nav-list">
                <li>
                    <router-link to="/">测评</router-link>
                </li>
                <li>
                    <router-link to="resume">简历</router-link>
                </li>
            </ul>
        <div class="nav-right">
            <el-button round plain class="cart-btn" size="small" icon="el-icon-search">购物车</el-button>
            <div class="logout" >
              <router-link to="/login">登录</router-link>
              <span>/</span>
              <router-link to="/register">注册</router-link>
            </div>
            <div class="login">
              <i class="el-icon-bell"></i>
              <div class="avatar">
                <img src="" alt="">
              </div>
            </div>
            
        </div>
        </nav>
      </header>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Select } from "element-ui";
Vue.use(Button);
Vue.use(Select);
export default {
  name: "headerNav",
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less"  scoped>
.headernav {
  width: 100%;
  height: 60px;
  background-color: fuchsia;
  color: #333;
  a {
    color: #333;
  }
  .header {
    display: inline-block;
    width: 100%;
    nav {
      .logo {
        float: left;
        margin-left: 20px;
        img {
          width: 180px;
          height: 60px;
        }
      }
      .nav-list {
        float: left;
        margin-left: 60px;
        li {
          float: left;
          a {
            padding: 0 10px;
            height: 58px;
            line-height: 58px;
            text-align: center;
            color: #464c5b;
            display: inline-block;
          }
          .router-link-active {
            color: #387ef6;
            border-bottom: 2px solid #387ef6;
          }
        }
      }
      .nav-right {
        float: right;
        margin-right: 100px;
        .cart-btn {
          margin-right: 20px;
        }
        a {
          line-height: 60px;
          padding: 0 10px;
          display: inline-block;
        }
        .login , .logout{
          display: inline-block;
          .el-icon-bell {
            font-size: 20px;
            line-height: 52px;
            margin-left: 10px;
          }
          .avatar {
            display: inline-block;
            img {
              width: 24px;
              height: 24px;
              border-radius: 24px;
              background-color: lawngreen;
              display: inline-block;
              margin-bottom: -5px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

