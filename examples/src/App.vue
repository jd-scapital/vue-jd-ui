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
$width: 200px;
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
  width: 100%;
  margin: 0;
  display: flex;
  .menus {
    width: $width;
    position: fixed;
    left: 0;
    overflow-y: scroll;
    height: 100%;
  }
  .contents {
    // position: fixed;
    left: $width;
    height: 100%;
    width: calc(100% - #{$width});
    margin-left: $width;
    overflow-y: scroll;
  }
}
</style>
