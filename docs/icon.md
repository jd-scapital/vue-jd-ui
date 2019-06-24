# 图标

## 作用
- 图标

## 依赖
- 无

## 使用
```bash
# html
<i class="iconfont iconeditf"></i>
```

## 例子
- 基础示例
::: 基础使用示例
```html
<template>
  <ul>
    <li v-for="(icon, key) in icons"
      :key="key"
      :class="{'iconfont': 1, [icon]: 1}"
      style="display: inline;margin-right: 6px;">
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      icons: [
        'iconeditf',
        'iconduigou',
        'iconplus',
        'iconclock',
        'iconic_wrong',
        'iconrili',
        'iconsuishicunqu',
        'iconyouyiwen_hover',
        'icontixianzhong',
        'iconhuodongtixing',
        'iconzhuanchu',
        'iconzidingyibaobiao',
        'iconbox',
        'iconliudongxing',
        'iconyouyiwen',
        'iconyuebao',
        'iconzhuanzhang',
        'iconnote_hover',
        'iconok',
        'iconpop_hint',
        'iconnote',
        'iconkefu',
        'iconchangshayinhang',
        'iconzijinbuguozhang',
        'icondaibanshixiang',
        'iconpop_error',
        'iconlinghuodaozhang',
        'icongaoyuyinhang',
        'iconchanpinfuwuxuanzhong',
        'iconzhanghushezhixuanzhong',
        'iconbangzhuzhongxinxuanzhong',
        'iconzichanguanlixuanzhong',
        'iconbangzhuzhongxin',
        'iconchanpinfuwu',
        'iconzichanguanli',
        'iconzhanghushezhi',
        'iconarrowright',
        'iconarrowleft',
        'iconfuzhi',
        'iconeye_show',
        'iconerror',
        'icontongzhi',
        'iconeye-clouse',
        'iconweibo',
        'iconOK',
        'iconyiwen',
        'iconyiwen1',
        'iconanquan',
        'iconerror1',
        'iconxian',
        'iconbiaoge',
        'iconxian1',
        'iconbiaoge1'
      ]
    }
  }
}
</script>
```
