<template>
  <div class="jd-expand-table" >
    <el-table :data="data">
      <!-- 序号 -->
      <el-table-column type="index">
        <!-- 序号表头 -->
        <template slot="header">
          <span class="expand-table-head">序号</span>
        </template>
        <!-- 序号内容 -->
        <template slot-scope="scope" >
          <div class="expand-table-content">
            {{scope.$index + 1}}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-for="(column, i) in columns"
        :key="i"
        :label="column.label"
        :prop="column.prop"
        :width="i === columns.length - 1 ? '400' : ''">
        <!-- 表头 -->
        <template slot="header" slot-scope="scope">
          <span class="expand-table-head">{{scope.column.label}}</span>
        </template>
        <!-- 内容 -->
        <template slot-scope="scope" >
          <div class="expand-table-content">
            {{scope.row[column.prop]}}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import elTable from '../el-table'
import elTableColumn from '../el-table-column'

export default {
  name: 'JdExpandTable',
  components: {
    elTable,
    elTableColumn
  },
  props: {
    // 数据
    data: {
      type: Array,
      default: () => []
    },
    // 表头
    columns: {
      type: Array,
      default: () => []
    }
  }
}
</script>
