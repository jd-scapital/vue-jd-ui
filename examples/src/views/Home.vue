<template>
  <div class="home">
    <vue-markdown :source="content"></vue-markdown>
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
import VueMarkdown from 'vue-markdown'
import mds from '../docs'

export default {
  name: 'home',
  data() {
    return {
      mds,
      content: ''
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
  components: {
    VueMarkdown
  },
  mounted() {
    this.init(this.menu)
  },
  methods: {
    init(menu) {
      this.content = mds[menu]
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  text-align: left;
  padding-left: 50px;
  padding-right: 30px;
}
</style>
