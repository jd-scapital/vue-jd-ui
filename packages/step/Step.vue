<template>
  <ul class="jd-step"
    :class="`${type}`">
    <li v-for="(cStep, key) in cSteps"
      :key="key"
      :class="{
        'active': cStep.active,
        'active-last': cStep.isActiveLast
      }"
      @click="stepClick(cStep)">
      <div class="j-s-circle">
        <i class="current" :style="color && cStep.active ? `background-color: ${color}` : ''" v-if="isShowCurrent && cStep.index === currentStep">...</i>
        <i :style="color && cStep.active ? `background-color: ${color}` : ''" v-else>{{cStep.index}}</i>
      </div>
      <span class="line" :style="color && cStep.index < step ? `border-color: ${color}` : ''"></span>
      <div class="j-s-info">
        <jd-scale v-if="!cStep.active"
          :text="cStep.text"
          :multiple="10/12"
          :color="cStep.active ? color : ''">
        </jd-scale>
        <span v-else
          :style="color && cStep.active ? `color: ${color}` : ''">
          {{cStep.text}}
        </span>
      </div>
    </li>
  </ul>
</template>
<script>
/**
 * @file components/common/Step.vue
 * @description 步骤组件
 * @createTime 2019年03月25日15:00:37
 */
import JdScale from '../scale'

export default {
  name: 'JdStep',
  components: {
    JdScale
  },
  props: {
    /**
     * @desc
     * 组件类型:
     *  small 小的
     *  middle 中类型
     */
    type: {
      type: String,
      default: 'small'
    },
    // 步骤
    steps: {
      type: Array,
      default() {
        return []
      }
    },
    // 当前的step
    step: {
      type: Number,
      default: 0
    },
    // 组件激活色
    color: {
      type: String,
      default: ''
    },
    // 当前步骤
    currentStep: {
      type: Number,
      default: null
    }
  },
  computed: {
    // 是否展示当前组件
    isShowCurrent() {
      return this.currentStep !== null
    },
    cSteps() {
      return this.steps.map((step, index) => {
        step.active = step.index <= this.step
        step.isActiveLast = step.index === this.step
        return step
      })
    }
  },
  methods: {
    stepClick(step) {
      if (step.index > this.step) {
        return
      }
      this.$emit('update:currentStep', step.index)
      this.$emit('change', step)
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-step {
  display: inline-block;
  &.small {
    li {
      padding-right: 34px;
      .j-s-circle {
        i {
          width: 20px;
          height: 20px;
          line-height: 20px;
          font-size: 13px;
          font-weight: 400;
        }
      }
      .line {
        width: 40px;
        top: 10px;
        right: -2px;
      }
    }
  }
  &.middle {
    li {
      padding-right: 274px;
      .j-s-circle {
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 25px;
      }
      .line {
        width: 260px;
        top: 20px;
        right: 12px;
      }
    }
  }
  li {
    float: left;
    position: relative;
    cursor: pointer;
    &.active {
      .j-s-circle {
        font-weight: 400;
        margin-left: auto;
        margin-right: auto;
        i {
          background-color: $red;
        }
      }
      .line {
        border-color: $red;
      }
      .j-s-info {
        color: $red;
        font-size: 12px;
      }
    }
    &.active-last {
      .line {
        border-color: $gray-c9;
      }
    }
    &:last-child {
      padding-right: 0;
      ::after {
        clear: both;
      }
      .line {
        display: none;
      }
    }
    .j-s-circle {
      margin-bottom: 7px;
      i {
        font-style: normal;
        display: block;
        margin: 0 auto;
        text-align: center;
        border-radius: 50%;
        background-color: $gray-15;
        color: $white;
        text-align: center;
        &.current {
          line-height: 12px;
          font-size: 18px;
        }
      }
    }
    .line {
      position: absolute;
      height: 1px;
      border-bottom: 1px dashed $gray-c9;
    }
    .j-s-info {
      color: $gray;
      font-weight: 400;
      line-height: 14px;
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>
