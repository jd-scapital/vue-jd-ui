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
<style lang="scss" scoped>
.jd-step-bar {
  .normal {
    display: flex;
    text-align: center;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 140px;
      align-items: center;
      &:first-child {
        width: 90px;
      }
      &:last-child {
        width: 100px;
        .dot {
          position: relative;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 1px;
            margin-top: -2px;
            width: 4px;
            height: 4px;
            border-right: 1px solid $gray;
            border-bottom: 1px solid $gray;
            transform: skew(45deg, -45deg);
          }
        }
      }
      &.step {
        .name {
          color: $black-deep;
        }
        .dot {
          i {
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            font-style: normal;
            text-align: center;
            background-color: $red;
            color: $white;
          }
        }
        .time {
          color: $black-deep;
        }
      }
      .name {
        color: $gray;
        font-size: 14px;
      }
      .dot {
        position: relative;
        /* width: 140px; */
        width: 100%;
        height: 2px;
        background-color: $gray;
        margin: 24px 0;
        i {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: $gray-10;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .time {
        color: $gray-2;
        font-size: 12px;
      }
    }
  }
  .profit {
    position: relative;
    display: flex;
    /* 默认时间轴线 */
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 2px;
      width: 100%;
      background-color: $border-gray;
      z-index: 1;
    }
    /* 时间轴的箭头 */
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 1px;
      margin-top: -2px;
      width: 4px;
      height: 4px;
      border-right: 1px solid $border-gray;
      border-bottom: 1px solid $border-gray;
      transform: skew(45deg, -45deg);
    }
    li {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      &:first-child {
        padding-left: 10px;
      }
      .name {
        color: $black-deep;
        font-size: 12px;
        margin-bottom: 6px;
      }
      .dot {
        position: relative;
        width: 100%;
        height: 40px;
        z-index: 2;
        &::before {
          content: '';
          position: absolute;
          /* width: 50%; */
          width: calc(50% + 10px);
          height: 2px;
          left: -10px;
          top: 50%;
          margin-top: -1px;
          background-color: $red;
        }
        &::after {
          content: '';
          position: absolute;
          width: 50%;
          height: 2px;
          right: 0;
          top: 50%;
          margin-top: -1px;
          background-color: $red;
        }
        i {
          position: absolute;
          width: 10px;
          height: 10px;
          /* background-color: $gray-10; */
          background-color: $red;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .time {
        color: $black-deep;
        font-size: 12px;
        margin-top: 6px;
      }
    }
    .amount-box {
      .amount {
        position: relative;
        text-align: center;
        height: 40px;
        padding-left: 200px;
        z-index: 2;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          top: 50%;
          margin-top: -1px;
          left: 0;
          background-color: $red;
          z-index: 1;
        }
        i {
          position: relative;
          z-index: 2;
          display: inline-block;
          font-style: normal;
          color: $white;
          font-size: 18px;
          background-color: $red;
          padding: 6px 10px;
        }
      }
      .name {
        padding-left: 200px;
      }
      .time {
        padding-left: 200px;
      }
    }
  }
}
</style>
