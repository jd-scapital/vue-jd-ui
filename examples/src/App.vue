<template>
  <div id="app">
    <div class="menus">
      <ex-menu></ex-menu>
    </div>
    <div class="contents">
      <router-view/>
    </div>
  </div>
</template>

<script>
/**
 * @file App.vue
 * @description 入口vue文件
 * @createTime 2019年05月29日18:39:09
 */
import ExMenu from '@/components/Menu.vue'

export default {
  name: 'App',
  components: {
    ExMenu
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1200px;
  margin: 0 auto;
  .menus {

  }
  .contents {

  }
}
</style>
