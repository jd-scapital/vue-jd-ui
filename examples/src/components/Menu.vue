<template>
  <div class="menu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultMenu"
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
import { mapGetters } from 'vuex'

import components from '../../../components.json'
import { toHump } from '../utils/tools'

export default {
  name: 'Menu',
  data() {
    return {
      // defaultMenu: '',
      menus: Object.keys(components).map(key => toHump(key))
    }
  },
  computed: {
    ...mapGetters({
      'defaultMenu': 'defaultMenu'
    })
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const defaultMenu = this.menus[0]
      if (defaultMenu) {
        this.$store.dispatch('setDefaultMenu', defaultMenu)
        this.$store.dispatch('setMenu', defaultMenu)
      }
    },
    handleOpen() {
      console.log('open')
    },
    handleClose() {
      console.log('close')
    },
    select(menu) {
      this.$router.replace({
        name: 'home',
        query: {
          q: menu
        }
      })
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
