<template>
  <div class="jd-select-box">
    <el-select
      class="select"
      size="size"
      placeholder="请选择"
      :value="value"
      @change="changeHandle"
      @clear="clearHandle">
      <el-option
        v-for="(item, i) in selectOptions"
        :key="i"
        :label="item.label"
        :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
/**
 * @name jd-select
 * @description 下拉选择器
 * @param { String } value 选中的值
 * @param { Array } selectOptions 下拉选择项
 */
import elSelect from '../el-select'
import elOption from '../el-option'

export default {
  name: 'JdSelect',
  components: {
    elSelect,
    elOption
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    selectOptions: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    changeHandle(val) {
      this.$emit('input', val)
    },
    clearHandle() {
      this.$emit('input', '')
    }
  }
}
</script>
