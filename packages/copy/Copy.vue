<template>
  <div class="jd-copy">
    <div :id="`copyContent${_uid}`"
      class="content">
      <slot></slot>
    </div>
    <a
      href="javascript:void(0);"
      ref="copyBtn"
      title="点击复制内容"
      data-clipboard-action="copy"
      :data-clipboard-target="`#copyContent${_uid}`"
      @click="clickHandle">
      <i class="iconfont iconfuzhi" :style="styleContent"></i>
    </a>
  </div>
</template>
<script>
/**
 * @description 复制组件
 * @prop { String } style 需要修改的样式
 * @slot 要复制的内容
 */
import Clipboard from 'clipboard'
import ElMessage from 'vue-jd-ui/packages/el-message'

export default {
  name: 'JdCopy',
  props: {
    styleContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      $message: ElMessage,
      copyBtn: null,
      id: ''
    }
  },
  mounted() {
    const copyBtn = this.$refs.copyBtn
    this.copyBtn = new Clipboard(copyBtn)
  },
  methods: {
    clickHandle() {
      const self = this
      self.copyBtn.on('success', (e) => {
        self.$message.success({
          showClose: true,
          message: '成功复制到粘贴板',
          // type: 'success',
          duration: 1500
        })
      })
      self.copyBtn.on('error', (err) => {
        console.error('copy error', err)
        self.$message.error({
          showClose: true,
          message: '复制失败'
        })
      })
    }
  }
}
</script>
