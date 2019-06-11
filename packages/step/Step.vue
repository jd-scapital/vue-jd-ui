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
    // 是否展示当前组件
    isShowCurrent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cSteps() {
      return this.steps.map((step, index) => {
        step.active = step.index <= this.step
        step.isActiveLast = step.index === this.step
        return step
      })
    }
  },
  data() {
    return {
      // 当前步骤
      currentStep: this.step
    }
  },
  methods: {
    stepClick(step) {
      if (step.index > this.step) {
        return
      }
      this.currentStep = step.index
      this.$emit('change', step)
    }
  }
}
</script>
