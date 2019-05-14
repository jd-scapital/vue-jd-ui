<template>
  <div class="jd-step-bar">
    <ul v-if="!isProfit" class="normal">
      <li v-for="(item, i) in list" :key="i" :class="{step: item.step}">
        <div class="name">{{item.name}}</div>
        <div class="dot"><i>{{item.step}}</i></div>
        <div class="time">{{item.time}}</div>
      </li>
    </ul>
    <ul v-else class="profit">
      <li v-for="(item, i) in list" :key="i" :class="{'amount-box' : isAmount(item.profit)}">
        <div class="name">{{item.name}}</div>
        <div :class="isAmount(item.profit) ? 'amount' : 'dot'"><i>{{item.profit}}{{isAmount(item.profit) ? '（元）' : ''}}</i></div>
        <div class="time">{{item.time}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
/**
 * @prop { Array } list
 *    @property { String: required } name 显示文字
 *    @property { String: required } time 显示时间
 *    @property { Number } step 主要步骤 type 为 'normal'时生效
 *    @property { String } profit 当前收益 type 为 'profit'时生效
 * @prop { String } type 当前组件类型 'normal'(默认) 'profit'(收益时间轴)
 */
export default {
  name: 'JdStepBar',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    isProfit() {
      return this.type === 'profit'
    }
  },
  methods: {
    isAmount(profit) {
      return profit
    }
  }
}
</script>
