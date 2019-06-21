<template>
  <div class="jd-collapse-box">
    <div v-if="type === 'title'" class="collapse-title">
      <div class="collapse">
        <p @click="toggle()">
          <span>{{title}}</span>
          <i class="iconfont iconarrowleft" :class="{active: active}"></i>
        </p>
      </div>
      <collapse-transition>
        <div v-show="active">
          <slot></slot>
        </div>
      </collapse-transition>
    </div>
    <div v-else class="no-collapse-title">
      <collapse-transition>
        <div v-show="active">
          <slot></slot>
        </div>
      </collapse-transition>
      <div class="collapse">
        <p @click="toggle()">
          <span v-show="active">收起详情</span><i class="iconfont iconarrowleft" :class="{active: active}" ></i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @prop { String } type noTitle(无标题) title(有标题)
 * @prop { Boolean } open 是否默认展开
 * @prop { String } title 标题（当 type 为 title 时）
 */
import CollapseTransition from 'vue-jd-ui/src/transitions/collapse-transition'

export default {
  name: 'JdCollapse',
  components: {
    CollapseTransition
  },
  props: {
    type: {
      type: String,
      default: 'noTitle'
    },
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: this.open
    }
  },
  methods: {
    toggle() {
      this.active = !this.active
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-collapse-box {
  .collapse {
    padding-bottom: 16px;
    padding-top: 6px;
    p {
      cursor: pointer;
      font-size: 14px;
      color: $black-deep;
      span {
        margin-right: 10px;
      }
    }
    .iconfont {
      display: inline-block;
      color: $gray-9;
      font-size: 12px;
      transform: rotateZ(-90deg);
      cursor: pointer;
      &.active {
        transform: rotateZ(90deg);
      }
    }
  }
  /* 有标题 */
  .collapse-title {
    .collapse {
      padding-bottom: 10px;
      border-bottom: 1px solid rgba($color: $gray-10, $alpha: 0.5);
      p {
        display: inline-block;
      }
    }
  }
  /* 无标题 */
  .no-collapse-title {
    .collapse {
      text-align: center;
    }
  }
}
</style>
