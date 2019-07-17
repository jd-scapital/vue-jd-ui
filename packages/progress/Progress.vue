<template>
  <div class="jd-progress" :class="{ 'aibank': aibank }">
    <ul>
      <li v-for="(item, i) in progress" :key="i">
        <div class="content" :class="{active: contentActive(i) }">
          <div v-if="contentActive(i)" class="icon">
            <!-- <i class="iconfont iconok"></i> -->
            <slot></slot>
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
    aibank: {
      type: Boolean,
      default: false
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
<style lang="scss" scoped>
.jd-progress {
  ul {
    display: flex;
    li {
      flex: 1;
      display: flex;
      align-items: center;
      padding-right: 20px;
      &:last-child {
        flex: initial;
      }
      .content {
        &.active {
          .name, .time {
            color: $black-shallow;
          }
          .iconok {
            color: $green;
            font-size: 54px;
          }
        }
        .icon {
          width: 54px;
          height: 54px;
          background: $gray-15;
          color: $white;
          border-radius: 50%;
          overflow: hidden;
          text-align: center;
          line-height: 54px;
          font-size: 34px;
          font-weight: 400;
          margin: 0 auto;
          margin-bottom: 16px;
        }
        .name, .time {
          color: $gray;
          font-size: 12px;
          text-align: center;
        }
        .time {
          min-height: 1.5em;
        }
      }
      .line {
        flex: 1;
        background-color: $gray-15;
        height: 2px;
        transform: translateY(-22px);
        margin-left: 16px;
        &.active {
          background-color: $green;
        }
      }
    }
  }
}
.jd-progress.aibank {
  ul li {
    .content {
      &.active {
        .iconok {
          color: $aibank-blue;
        }
      }
    }
    .line {
      &.active {
        background-color: $aibank-blue;
      }
    }
  }
}
</style>
