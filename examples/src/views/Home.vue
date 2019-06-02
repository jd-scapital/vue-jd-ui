<template>
  <div class="home">
    11
  </div>
</template>

<script>
/**
 * @file views/Home.vue
 * @description 主页面
 *  TODO: 读取readme.md中并按照格式渲染出
 * @createTime 2019年05月31日13:42:32
 */
import { mapGetters } from 'vuex'
import mds from '../docs'

export default {
  name: 'home',
  data() {
    return {
      mds
    }
  },
  computed: {
    ...mapGetters({
      'menu': 'menu'
    })
  },
  watch: {
    menu(val, oldVal) {
      if (val
        && oldVal
        && val !== oldVal) {
        this.init(val)
      }
    }
  },
  methods: {
    init(menu) {
      console.log('init menu: ', menu)
    }
  }
}
</script>
