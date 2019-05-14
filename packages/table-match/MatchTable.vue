<template>
  <div class="jd-match-table">
    <el-table
      :data="tableData"
      stripe
      @cell-mouse-enter="cellMouseEnter"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName">
      <el-table-column
        v-for="(column, i) in columns"
        :key="i"
        :label="column.label"
        :prop="column.prop">
          <template slot="header" slot-scope="scope">
            <span class="table-head" :class="{'table-head-padding' : i === 0}">{{scope.column.label}}</span>
          </template>
          <template slot-scope="scope" >
            <div
              v-if="column.render"
              v-html="column.render(scope)"
              ></div>
            <template v-else-if="column.slot" >
              <slot :name="column.slot" :row="scope.row"></slot>
            </template>
            <!-- <div v-else-if="i === columns.length - 1">
              <router-link class="a" to="/">{{scope.row[column.prop]}}</router-link>
            </div> -->
            <div class="normal" v-else>
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
  name: 'JdMatchTable',
  components: {
    elTable,
    elTableColumn
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    hoverColumn: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      // 分页
      currentPage: 1
      // columns: [
      //   {
      //     label: '产品名称',
      //     prop: 'name'
      //     // render: (scope) => {
      //     //   return (`
      //     //     <p style="color:#333;font-size:14px;line-height:17px;">${scope.row['name']}</p>
      //     //   `)
      //     // }
      //   },
      //   {
      //     label: '总金额',
      //     prop: 'amount'
      //     // render: (scope) => {
      //     //   return (`
      //     //     <span style="font-size:14px;color:#333;">${scope.row['amount']}</span>
      //     //   `)
      //     // }
      //   },
      //   {
      //     label: '七日年化（1%）',
      //     prop: 'status',
      //     render: (scope) => {
      //       return (`
      //         <span style="font-size:12px;color:#333;">${scope.row['status']}</span>
      //       `)
      //     }
      //   },
      //   {
      //     label: '万份收益',
      //     prop: 'type'
      //     // render: (scope) => {
      //     //   return (`
      //     //     <span style="font-size:14px;color:#333;">${scope.row['type']}</span>
      //     //   `)
      //     // }
      //   },
      //   {
      //     label: '昨日收益',
      //     prop: 'balance'
      //     // render: (scope) => {
      //     //   return (`
      //     //     <span style="font-size:14px;"><router-link to="/">${scope.row['balance']}</router-link></span>
      //     //   `)
      //     // }
      //   }
      // ]
    }
  },
  methods: {
    // 选中行
    rowClassName({ row, rowIndex }) {
      if (rowIndex === this.hoverColumn) {
        return 'active'
      }
      else {
        return ''
      }
    },
    // hover方块样式
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'first'
      }
      else {
        return ''
      }
    },
    // 表格hover样式
    cellMouseEnter(row, column, cell, event) {
      const hoverColumn = this.tableData.findIndex(el => el.orderId === row.orderId)
      this.$emit('hover-change', hoverColumn)
    }
  }
}
</script>
