<template>
  <el-dialog class="jd-alter"
    :class="{
      'jd-dialog': hasTitle || hasFooter,
      'no-header': !hasTitle,
      'no-footer': !hasFooter
    }"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :visible="isShow"
    :show-close="false"
    @open="alterOpen"
    @close="alterClose">
    <div slot="title" class="dialog-header">
      <slot name="alter-header">
        <div class="dialog-header-wrap" v-if="hasTitle">
          <p class="jd-alter-title">{{title}}</p>
          <button type="button" aria-label="Close" class="el-dialog__headerbtn" v-if="hasCancelButton && showClose"
            @click="closeDialog">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
      </slot>
    </div>
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <slot name="alter-footer">
        <div class="dialog-footer-wrap" v-if="hasFooter">
          <jd-button v-if="hasCancelButton"
            class="jd-alter-cancel"
            :type="'text'"
            @click="cancelClick">
            {{cancelText}}
          </jd-button>
          <jd-button class="jd-alter-btn"
            :type="'fill'"
            @click="btnClick">
            {{buttonText}}
          </jd-button>
        </div>
      </slot>
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
      isShow: this.show
    }
  },
  watch: {
    show(val = false) {
      console.log('show val: ', val)
      this.isShow = val
    }
    // ,
    // isShow(val = false) {
    //   console.log('isShow val: ', val)
    //   if (!val) {
    //     this.close()
    //   }
    // }
  },
  methods: {
    // 确定按钮点击事件
    btnClick(...args) {
      this.$emit('click', args)
    },
    // 取消
    cancelClick(...args) {
      this.cancel(args)
    },
    // 弹框关闭
    closeDialog(...args) {
      this.cancel(args)
    },
    cancel(args) {
      this.$emit('cancel', args)
      this.close()
    },
    close() {
      this.$emit('update:show', false)
      this.$emit('close-handle')
    },
    // 弹框打开事件监听
    alterOpen() {

    },
    // 弹框关闭事件监听
    alterClose() {
      this.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-alter {
  // 有header或footer
  &.jd-dialog {
    /deep/ .el-dialog__body {
      padding: 0 40px;
    }
  }
  // 没有header和footer
  &.no-header {
    /deep/ .el-dialog__header {
      border-width: 0;
    }
    // TODO: 有待进一步验证
    // /deep/ .el-dialog {
    //   background: transparent;
    //   box-shadow: none;
    // }
  }
  &.no-footer {
    /deep/ .el-dialog__footer {
      border-width: 0;
    }
  }
  .dialog-header {
    .dialog-header-wrap {
      padding: 16px 26px 15px 24px;
    }
  }
  /deep/ .el-dialog {
    border-radius: 10px;
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid $gray-11;
    padding: 0;
    .el-dialog__title {
      color: rgba($black-solid, .85);
      height: 24px;
      line-height: 24px;
      font-weight: 500;
      font-size: 16px;
    }
    .el-dialog__headerbtn {
      right: 22px;
      top: 18px;
    }
  }
  /deep/ .el-dialog__body {
    padding: 0;
  }
  /deep/ .el-dialog__footer {
    padding: 0;
    border-top: 1px solid $gray-11;
    .dialog-footer {
      .dialog-footer-wrap {
        padding: 15px 0;
      }
    }
  }
  &-title {

  }
  &-cancel {
    border-width: 0;
    margin-right: 30px;
    height: 32px;
    line-height: 32px;
  }
  &-btn {
    height: 32px;
    line-height: 32px;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 40px;
  }
}
</style>
