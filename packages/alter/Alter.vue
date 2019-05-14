<template>
  <el-dialog class="jd-alter"
    :class="{
      'jd-dialog': hasTitle || hasFooter,
      'no-header': !hasTitle,
      'no-footer': !hasFooter
    }"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :visible.sync="isShow"
    :show-close="false">
    <div slot="title" class="dialog-header">
      <div class="dialog-header-wrap" v-if="hasTitle">
        <p class="jd-alter-title">{{title}}</p>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn" v-if="hasCancelButton && showClose"
          @click="closeDialog">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
    </div>
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <div class="dialog-footer-wrap" v-if="hasFooter">
        <jd-button v-if="hasCancelButton"
          :classNames="'jd-alter-cancel'"
          :type="'text'"
          @click="cancelClick">
          {{cancelText}}
        </jd-button>
        <jd-button
          :classNames="'jd-alter-btn'"
          :type="'fill'"
          @click="btnClick">
          {{buttonText}}
        </jd-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
/**
 * @file components/common/Alter.vue
 * @emit click 底部工具栏按钮点击事件
 * @emit cancel 底部工具栏取消事件
 * @emit close-handle 关闭弹窗时触发的事件
 * @description 弹框通用组件
 * @createTime 2019年03月22日18:17:38
 */
import elDialog from '../el-dialog'
import jdButton from '../button'

export default {
  name: 'JdAlter',
  components: {
    elDialog,
    jdButton
  },
  props: {
    // 弹框展示与否
    show: {
      type: Boolean,
      default: false
    },
    // 弹框标题(左上角)
    title: {
      type: String,
      default: ''
    },
    // 是否有取消按钮
    hasCancelButton: {
      type: Boolean,
      default: true
    },
    // 取消文本
    cancelText: {
      type: String,
      default: '取消'
    },
    // 操作按钮文字
    buttonText: {
      type: String,
      default: ''
    },
    // 是否展示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 弹窗宽度
    width: {
      type: String,
      default: '50%'
    },
    // 是否通过点击modal关闭弹窗
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 是否有表头
    hasTitle() {
      return this.title
    },
    // 是否有底部工具栏
    hasFooter() {
      return this.buttonText
    }
  },
  data() {
    return {
      // 是否展示
      isShow: true
    }
  },
  watch: {
    show(val) {
      this.isShow = val
    },
    isShow(val) {
      if (!val) {
        this.close()
      }
    }
  },
  methods: {
    // 确定按钮点击事件
    btnClick(...args) {
      this.$emit('click', args)
    },
    // 取消
    cancelClick(...args) {
      this.$emit('cancel', args)
      this.close()
    },
    // 弹框关闭
    closeDialog(...args) {
      this.$emit('cancel', args)
      this.close()
    },
    close() {
      this.$emit('update:show', false)
      this.$emit('close-handle')
    }
  }
}
</script>
