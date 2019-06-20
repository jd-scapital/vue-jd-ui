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
  name: 'JdTableExpand',
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
<style lang="scss" scoped>
// hover背景色
.jd-expand-table {
  & /deep/ .el-table {
    background-color: $gray-5;
  }
  /* & /deep/ .el-table th, .el-table tr {
    background-color: transparent;
  } */
  & /deep/ th, & /deep/ tr {
    background-color: transparent;
  }
  & /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: transparent;
  }
  /* 字体 */
  .expand-table-head, .expand-table-content {
    color: $gray;
    font-size: 12px;
  }
}
</style>
