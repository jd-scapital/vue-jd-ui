<template>
  <div class="jd-progress">
    <ul>
      <li v-for="(item, i) in progress" :key="i">
        <div class="content" :class="{active: contentActive(i) }">
          <div v-if="contentActive(i)" class="icon">
            <i class="iconfont iconok"></i>
          </div>
          <div v-else class="icon">{{ i + 1 }}</div>
          <p class="name">{{item.name}}</p>
          <p class="time">{{item.time}}</p>
        </div>
        <div
          class="line"
          v-if="i != progress.length - 1"
          :class="{active: i + 2 <= value }"></div>
      </li>
    </ul>
  </div>
</template>
<script>
/**
 * @prop { Number: required } value 当前到第几步
 * @prop { Array: required } progress 进度条 @property { String } name 显示文字 @property { String } time 显示时间
 */
export default {
  name: 'JdProgress',
  props: {
    value: {
      type: Number,
      default: 1,
      required: true
    },
    progress: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    contentActive(i) {
      const active = i + 1 <= this.value
      return active
    }
  }
}
</script>
