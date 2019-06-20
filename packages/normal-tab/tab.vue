<template>
  <div class="jd-normal-tab">
    <ul class="jd-normal-tab-titles">
      <li v-for="(label, key) in labels"
        :key="key"
        :class="{'active': label.active}"
        :style="`width: ${100/labels.length}%;`"
        @click="changeTab(label)">
        <slot :name="key">
          <div class="tab-default-title">
            {{label.label}}
          </div>
        </slot>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
<script>
/**
 * @file components/common/tab/tab.vue
 * @description tab标题
 * @createTime 2019年04月10日14:10:59
 */
export default {
  name: 'JdNormalTab',
  props: {
    // v-model绑定的值
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 标签列表
      labels: []
    }
  },
  mounted() {
    this.initLabels()
    this.initActiveLabel()
  },
  methods: {
    // 初始化label数据
    initLabels() {
      const slots = this.$slots.default
      if (slots) {
        const paneSlots = slots.filter(slot => slot.componentOptions && slot.componentOptions.tag === 'jd-normal-tab-pane')
        paneSlots.forEach((paneSlot, index) => {
          const data = paneSlot.componentOptions.propsData || {}
          this.labels.push({
            active: false,
            ...data
          })
        })
      }
    },
    // 初始化激活label
    initActiveLabel() {
      const value = this.value
      if (value) {
        this.labels.forEach(label => {
          label.active = label.name === value
        })
      }
      else {
        // default: set first label was active
        this.labels[0].active = true
      }
    },
    // tab切换
    changeTab(label) {
      this.labels.forEach(l => {
        l.active = l.name === label.name
        if (l.active) {
          this.$emit('input', l.name)
        }
      })
      this.$emit('change-tab', label)
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-normal-tab {
  &-titles {
    width: 100%;
    display: flex;
    li {
      &>:first-child {
        text-align: center;
        cursor: pointer;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      &:last-child {
        &>:first-child {
          border-right-width: 0;
        }
      }
    }
    .active {
      div {
        color: $black-shallow;
        background-color: $white;
        border-color: $bg-gray;
      }
    }
    .tab-default-title {
      flex: 1;
      padding: 13px 23px;
      color: $gray-2;
      background-color: $gray-deep;
      font-size: 16px;
      line-height: 20px;
      border-right: 2px solid $white;
    }
  }
}
</style>
