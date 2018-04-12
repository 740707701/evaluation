<template>
  <div class="header">
     <nav>
      <div class="logo">
          <!-- <img src="./logo.png" alt=""> -->
      </div>
      <ul class="nav-list">
          <li><a href="javascript:">测评</a></li>
          <li><a href="javascript:">简历</a></li>
      </ul>
      <div class="nav-right">
          <el-row>
              <el-button round icon="el-icon-cart">购物车</el-button>
          </el-row>
      </div>

     </nav>
  </div>
</template>
<script>
    import Vue from 'vue'
    import { Button, Select} from 'element-ui'
    Vue.use(Button)
    Vue.use(Select)
    export default {
        name: 'header',
        props: {},
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style  scoped>
    .header {
        height: 80px;
        background-color: fuchsia;
    }
</style>

