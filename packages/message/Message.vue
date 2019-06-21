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
import JdAlter from '../alter'
import { MSG_TYPE_SUCCESS, MSG_TYPE_FAIL, MSG_TYPE_INFO } from 'vue-jd-ui/src/utils/constant'

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
      return this.type === MSG_TYPE_SUCCESS
    },
    isFail() {
      return this.type === MSG_TYPE_FAIL
    },
    isInfo() {
      return this.type === MSG_TYPE_INFO
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
<style lang="scss" scoped>
.jd-message {
  &-wrap {
    display: flex;
    padding-top: 51px;
    // 图标
    .icon-wrap {
      margin-right: 20px;
      width: 40px;
      height: 40px;
      .iconfont {
        font-size: 40px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
      }
    }
    // 信息
    .info-wrap {
      flex: 1;
      h2 {
        margin-top: 10px;
        margin-bottom: 20px;
        height: 24px;
        line-height: 24px;
        font-size: 24px;
        font-weight: 500;
      }
      p {
        color: $black;
      }
    }
    // 成功
    &.success {
      padding-bottom: 99px;
      .icon-wrap {
        .iconfont {
          color: $green;
        }
      }
      .info-wrap {
        h2 {
          color: $green;
        }
      }
    }
    // 失败
    &.fail {
      padding-bottom: 99px;
      .icon-wrap {
        .iconfont {
          color: $red-2;
        }
      }
      .info-wrap {
        h2 {
          color: $red-2;
        }
      }
    }
    // 信息
    &.info {
      padding-top: 32px;
      padding-bottom: 41px;
      .icon-wrap {
        width: 22px;
        height: 22px;
        .iconfont {
          height: 22px;
          font-size: 22px;
          color: $orange-deep;
        }
      }
      .info-wrap {
        h2 {
          padding: 0;
          margin-bottom: 12px;
          font-size: 16px;
          height: 24px;
          line-height: 24px;
          font-weight: 500;
          color: $black-solid;
        }
        p {
          color: rgba($black-solid, .65);
          line-height: 22px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
