<template>
  <div class="resume-page">
    <headerNav></headerNav>
    <div>这里是简历页面</div>
    <p>{{msg}}</p>
    <p>
      <el-button round>测试按钮</el-button>
    </p>
  </div>
</template>
<script>
  import headerNav from '../components/HeaderNav.vue'
  export default {
    name: 'resume',
    data() {
      return {
        msg: 'this is resume page'
      }
    },
    computed: {},
    methods: {},
    watch: {},
    components: {
      headerNav
    }
  }
</script>

