<template>
  <div id="app">
    <headerNav></headerNav>
    <div class="banner-box">
      <banner></banner>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import headerNav from './components/HeaderNav'
import banner from './components/Banner'
export default {
  name: 'App',
  components: {
    headerNav,
    banner
  }
}
</script>
 
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
