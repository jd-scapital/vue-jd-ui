<template>
  <div class="jd-table"
    :class="{'frist-at-one': firstAtOne, 'aibank': aibank}">
    <el-table stripe
      :data="tableData"
      :class="hasFilter"
      :show-header="showHeader">
      <el-table-column
        v-for="(column, i) in columns"
        :key="i"
        :label="column.label"
        :prop="column.prop"
        :width="column.width">
          <template slot="header" slot-scope="scope">
            <slot :name="column.filter" :column="scope.column">
              <span class="table-head" :class="{'table-head-padding' : i === 0}">{{scope.column.label}}</span>
            </slot>
          </template>
          <template slot-scope="scope" >
            <div
              v-if="column.render"
              v-html="column.render(scope)"
              :class="{'table-head-padding' : i === 0}"></div>
            <template v-else-if="column.slot" >
              <slot :name="column.slot" :row="scope.row"></slot>
            </template>
            <div v-else>
              <span class="normal-content">{{scope.row[column.prop]}}</span>
            </div>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :page-size="pageSize"
      :pager-count="5"
      :current-page="currentPage"
      @current-change="currentChange"
      background
      layout="->, total, slot, prev, pager, next, jumper"
      :total="total"
      v-if="isShowPage">
      <span class="size">{{totalPage}}页 {{pageSize}}/页</span>
    </el-pagination>
  </div>
</template>
<script>
/**
 * @event current-change 页码变化，参数为改变后的页数
 * @prop { Boolean } aibank 是否是aibank
 * @prop { Array } tableData 表格数据
 * @prop { Boolean } isShowPage 是否展示分页
 * @prop { Boolean } firstAtOne 是否显示展示第一行
 * @prop { Boolean } showHeader 是否展示表头
 * @prop { Number } currentPage 当前页码
 * @prop { Number } total 总条数
 * @prop { Number } pageSize 一页多少条
 * @prop { Array } columns 表头及内容格式定义
 * @extends columns
 *    @property { String } label 表头
 *    @property { String } prop 对应的字段
 *    @property { [String, Number] } width 当前列宽度
 *    @property { Function(scope) } render 自定义渲染数据的格式
 *    @property { String } slot 最后操作项自定义组件或者html， slot的值就是slot的name @augments { Object } row 当前列的数据
 *    @property { String } filter 具有筛选功能，filter的值就是slot的name，@augments { Object } slotProps 当前表头的数据参数
 */
import elTable from '../el-table'
import elTableColumn from '../el-table-column'
import elPagination from '../el-pagination'

export default {
  name: 'JdTable',
  components: {
    elTable,
    elTableColumn,
    elPagination
  },
  props: {
    // 数据
    tableData: {
      type: Array,
      default: () => ([])
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页多少条
    pageSize: {
      type: Number,
      default: 10
    },
    // 总条数
    total: {
      type: Number,
      default: 1
    },
    // 是否展示分页组件
    isShowPage: {
      type: Boolean,
      default: true
    },
    // 第一行是否显示(激活色)展示
    firstAtOne: {
      type: Boolean,
      default: false
    },
    // 是否展示表头
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 判断当前列是否具有过滤查询功能
    hasFilter() {
      const filterArray = this.columns.filter(el => {
        return el.filter
      })
      if (filterArray.length !== 0) {
        return 'header-filter'
      }
      return ''
    },
    // 总页数
    totalPage() {
      const { total, pageSize } = this
      return Math.ceil(total / pageSize) || 1
    }
  },
  methods: {
    // 不需要expand的处理样式
    rowClassName({ row, rowIndex }) {
      if (this.firstAtOne) {
        return rowIndex % 2 === 0 ? 'table-active' : ''
      }
      else {
        return ''
      }
    },
    // 页码改变
    currentChange(page) {
      this.$emit('current-change', page)
    }
  }
}
</script>
<style lang="scss" scoped>
.frist-at-one {
  // TODO: 找到能不用!important的方式去修改，不然会引起样式冲突
  // /deep/ .el-table__row--striped {
  //   td {
  //     background: $white !important;
  //   }
  // }
  /deep/ .table-active {
    td {
      background: $table-active;
    }
  }
  /deep/ .hover-row {
    td {
      background: $table-hover !important;
    }
  }
  // padding-left: 48px;
}
.jd-table {
  background-color: $white;
  .table-head {
    font-size: 12px;
    font-weight: 400;
    color: $black;
    &.operate {
      margin-right: 30px;
    }
  }
  .table-head-padding {
    /* margin-left: 48px; */
    margin-left: 36px;
  }
  /* 默认内容样式 */
  .normal-content {}
  .pagination {
    padding: 24px 30px 43px 0;
    .size {
      color: $black;
      font-size: 13px;
      font-weight: 400;
      margin-right: 100px;
    }
  }
  // 方块背景色
  /deep/ .el-pagination.is-background .btn-next,
  /deep/ .el-pagination.is-background .btn-prev,
  /deep/ .el-pagination.is-background .el-pager li {
    background-color: $white;
    border: 1px solid $border-gray;
    border-radius: 4px;
    font-weight: 400;
  }
  // 当前页样式
  /deep/ .el-pagination.is-background .el-pager .active {
    background-color: $button-fill!important;
    border-color: $button-fill!important;
  }
  // 跳至样式
  /deep/ .el-pagination.is-background .el-pagination__jump {
    font-size: 12px;
  }
  // 过滤查询弹窗无法显示
  /deep/ .header-filter {
    overflow: initial;
    .cell, div, .el-table__header-wrapper, th {
      overflow: initial;
    }
  }
}
.jd-table.aibank {
  // 当前页样式
  /deep/ .el-pagination.is-background .el-pager .active {
    background-color: $aibank-blue!important;
    border-color: $aibank-blue!important;
  }
}
</style>
