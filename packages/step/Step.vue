<template>
  <ul class="jd-step"
    :class="`${type}`">
    <li v-for="(step, key) in cSteps"
      :key="key"
      :class="{
        'active': step.active,
        'active-last': step.isActiveLast
      }"
      @click="stepClick">
      <div class="j-s-circle">
        <i>{{step.index}}</i>
      </div>
      <span class="line"></span>
      <div class="j-s-info">
        <jd-scale :text="step.text" :multiple="10/12" v-if="!step.active"></jd-scale>
        <span v-else>{{step.text}}</span>
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
  methods: {
    stepClick() {

    }
  }
}
</script>
