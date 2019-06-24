<template>
  <div class="home">
    <div class="render-item" v-for="(render, key) in renders" :key="key">
      <md-code class="code-item" v-if="render.code"
        :code="render.code"
        :title="render.title">
        <div class="pre-code" v-if="render.code">
          <pre><code class="show-code">{{render.code}}</code></pre>
        </div>
      </md-code>
      <vue-markdown class="markdown" v-if="render.md"
        :source="render.md">
      </vue-markdown>
    </div>
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
import MdCode from '../components/Code'

export default {
  name: 'home',
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // md文档列表
      mds,
      // md字符串内容
      content: '',
      // 渲染列表
      renders: []
    }
  },
  computed: {
    ...mapGetters({
      'menu': 'menu',
      'router': 'router'
    })
  },
  watch: {
    // 菜单
    menu(val, oldVal) {
      if (val
        && oldVal
        && val !== oldVal) {
        this.init(val)
      }
    },
    // 内容
    content(val) {
      const renders = []
      if (val) {
        const arrays = val.split(':::')
        arrays.forEach(array => {
          const render = {}
          const codeStart = '```html'
          const codeLast = '```'
          const codeIndex = array.indexOf(codeStart)
          // 有代码块
          if (~codeIndex) {
            const title = array.substr(0, codeIndex)
            array = array.replace(title + codeStart, '')
            const codeLastIndex = array.indexOf(codeLast)
            const code = array.substr(0, codeLastIndex)
            array = array.replace(code + codeLast, '')
            render.title = title
            render.code = code ? code.trim() : code
            // console.log('render.code: \n', render.code)
            render.md = array
          }
          // 没有代码块
          else {
            render.md = array
          }
          // console.log('array: ', array)
          renders.push(render)
        })
      }
      this.renders = renders
    },
    // 路由变化
    router(val) {
      this.content = ''
      this.init(this.menu)
    }
  },
  components: {
    VueMarkdown,
    MdCode
  },
  created() {
    const defaultMenu = this.query
    if (defaultMenu) {
      this.$store.dispatch('setDefaultMenu', defaultMenu)
      this.$store.dispatch('setMenu', defaultMenu)
    }
  },
  mounted() {
    this.init(this.menu)
  },
  methods: {
    init(menu) {
      this.content = mds[menu]
      // console.log('this.content: ', this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  text-align: left;
  padding-left: 50px;
  padding-right: 30px;
  .render-item {
    .code-item {
      &:hover {
        box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
      }
    }
    // markdown文档样式
    /deep/ .markdown {
      ul {
        margin: 5px 0;
      }
    }
    // 代码块样式
    /deep/ .pre-code {
      padding: 10px;
      background-color: $bgColor;
      pre {
        border-width: 0;
        background-color: $bgColor;
      }
    }
  }
}
</style>
