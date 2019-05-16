<template>
  <div class="jd-message">
    <jd-alter v-if="value"
      :show="value"
      :showClose="showClose"
      :hasCancelButton="hasCancelButton"
      :buttonText="buttonText"
      width="580px"
      @click="submitHandle"
      @close-handle="closeHandle">
      <div class="jd-message-wrap"
        :class="{
          'success': isSuccess,
          'fail': isFail,
          'info': isInfo
        }">
        <div class="icon-wrap">
          <i class="iconfont"
            :class="{
              'iconduigou': isSuccess,
              'iconerror1': isFail,
              'iconic_wrong': isInfo
            }"></i>
        </div>
        <slot>
          <div class="info-wrap">
            <h2>{{title}}</h2>
            <p>{{subTitle}}</p>
          </div>
        </slot>
      </div>
    </jd-alter>
  </div>
</template>
<script>
/**
 * @file components/common/Message.vue
 * @description 消息弹框
 *  成功
 *  失败
 *  信息(叹号)
 * @emit submit
 */
// import { MSG_TYPE_SUCCESS, MSG_TYPE_FAIL, MSG_TYPE_INFO } from '@/utils/constant'
import JdAlter from '../alter'

export default {
  name: 'JdMessage',
  components: {
    JdAlter
  },
  props: {
    // 是否展示
    value: {
      type: Boolean,
      default: false
    },
    // 消息类型
    type: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 副标题
    subTitle: {
      type: String,
      default: ''
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
    // 是否有取消按钮
    hasCancelButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isSuccess() {
      return this.type === this.$msg.MSG_TYPE_SUCCESS
    },
    isFail() {
      return this.type === this.$msg.MSG_TYPE_FAIL
    },
    isInfo() {
      return this.type === this.$msg.MSG_TYPE_INFO
    }
  },
  data() {
    return {
      // MSG_TYPE_SUCCESS,
      // MSG_TYPE_FAIL,
      // MSG_TYPE_INFO,
      // isShow: this.value
    }
  },
  methods: {
    // 提交处理
    submitHandle() {
      this.$emit('submit')
    },
    // 关闭处理
    closeHandle() {
      this.$emit('input', false)
    }
  }
}
</script>
