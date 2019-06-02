<template>
  <div class="menu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="select">
          <el-menu-item v-for="(menu, key) in menus" class="menu-item"
            :key="key"
            :index="menu">
            <i class="el-icon-menu"></i>
            <span slot="title">{{menu}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/**
 * @file components/views/Menu.vue
 * @description 菜单
 * @createTime 2019年05月29日18:28:52
 */
import components from '../../../components.json'

export default {
  name: 'Menu',
  data() {
    return {
      menus: Object.keys(components)
    }
  },
  methods: {
    handleOpen() {
      console.log('open')
    },
    handleClose() {
      console.log('close')
    },
    select(menu) {
      this.$store.dispatch('setMenu', menu)
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {
  .menu-item {
    text-align: left;
  }
}
</style>
