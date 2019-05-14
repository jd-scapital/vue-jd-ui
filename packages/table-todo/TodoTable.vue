<template>
  <div class="todo-table">
    <el-table :data="data" stripe :row-class-name="rowClassName">
      <el-table-column type="expand">
        <template slot-scope="props">
          <expand-table :data="props.row.expandData.data" :columns="props.row.expandData.columns"></expand-table>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(column, i) in columns"
        :key="i"
        :label="column.label"
        :prop="column.prop">
          <template slot="header" slot-scope="scope">
            <span class="table-head">{{scope.column.label}}</span>
          </template>
          <template slot-scope="scope" >
            <div v-if="column.render" v-html="column.render(scope)"></div>
            <div v-else>
              {{scope.row[column.prop]}}
            </div>
          </template>
        </el-table-column>
      <el-table-column label="操作" width="344" align="left">
        <template slot="header" slot-scope="scope">
          <span class="table-head operate">{{scope.column.label}}</span>
        </template>
        <template slot-scope="scope" >
          <div v-if="scope.row.status === '待确认'" style="padding-right: 30px;">
            <jd-button type="fill" class="button button-s" @click="console.log(scope)">确认</jd-button>
            <jd-button class="button button-s" @click="console.log(scope)">取消</jd-button>
            <router-link class="a" to="/">订单详情</router-link>
          </div>
          <div v-else style="padding-right: 30px;">
            <jd-button type="fill" class="button button-m" @click="console.log(scope)">支付完成</jd-button>
            <router-link class="a" to="/">订单详情</router-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import elTable from '../el-table'
import elTableColumn from '../el-table-column'
import ExpandTable from '../table-expand'
import JdButton from '../button'
import { timeFormat } from 'vue-jd-ui/src/utils/tools'

export default {
  name: 'JdTodoTable',
  components: {
    ExpandTable,
    elTable,
    elTableColumn,
    JdButton
  },
  props: {
    data: {
      type: Array,
      default: () => ([
        {
          name: '活期T+0',
          type: '代客到期处理',
          amount: '30,003,323.00',
          status: '待确认',
          time: '2019-01-20 10:53',
          orderId: 'SG17112759459',
          // 是否有拓展
          expand: true,
          // 拓展的数据
          expandData: {
            columns: [
              {
                label: '到期处理方式',
                prop: 'methods'
              },
              {
                label: '交易项',
                prop: 'type'
              },
              {
                label: '金额（元）',
                prop: 'amount'
              },
              {
                label: '备注',
                prop: 'remark'
              }
            ],
            data: [
              {
                methods: '存续同类产品',
                type: '定期一个月',
                amount: '10,007,275.00',
                remark: '起息日 2018-09-30 | 到期日 2018-10-30 | 回款日 2018-10-31'
              },
              {
                methods: '存续同类产品',
                type: '定期一个月',
                amount: '10,007,275.00',
                remark: '起息日 2018-09-30 | 到期日 2018-10-30 | 回款日 2018-10-31'
              },
              {
                methods: '存续同类产品',
                type: '定期一个月',
                amount: '10,007,275.00',
                remark: '起息日 2018-09-30 | 到期日 2018-10-30 | 回款日 2018-10-31'
              }
            ]
          }
        },
        {
          name: '活期T+0',
          type: '代客申购',
          amount: '30,003,323.00',
          status: '待确认',
          time: '2019-01-20 10:53',
          orderId: 'SG17112759459'
        },
        {
          name: '活期T+0',
          type: '代客申购',
          amount: '30,003,323.00',
          status: '未支付',
          time: '2019-01-20 10:53',
          orderId: 'SG17112759459'
        }
      ])
    },
    columns: {
      type: Array,
      default: () => ([
        {
          label: '待办订单',
          prop: 'orderNum',
          render: (scope) => {
            return (`
              <p style="color:#333;font-size:14px;line-height:17px;">${scope.row['name']}</p>
              <span style="color:#9B9B9B;font-size:12px;">编号 ${scope.row['orderNum']}</span>
            `)
          }
        },
        {
          label: '订单类型',
          prop: 'orderType',
          render: (scope) => {
            return (`
              <span style="color:#999;font-size:12px;">${scope.row['orderType']}</span>
            `)
          }
        },
        {
          label: '交易金额',
          prop: 'amount',
          render: (scope) => {
            return (`
              <span style="font-size:14px;color:#333;">${scope.row['amount']}</span>
            `)
          }
        },
        // {
        //   label: '状态',
        //   prop: 'status',
        //   render: (scope) => {
        //     return (`
        //       <span style="font-size:12px;color:#333;">${scope.row['status']}</span>
        //     `)
        //   }
        // },
        {
          label: '交易时间',
          prop: 'opDate',
          render: (scope) => {
            const time = timeFormat(scope.row['opDate'])
            return (`
              <span style="font-size:12px;color:#999;">${time}</span>
            `)
          }
        },
        {
          label: '待办备注',
          prop: 'createTime',
          render: (scope) => {
            return (`
              <span style="font-size:12px;color:#333;">${scope.row['createTime']}</span>
            `)
          }
        }
      ])
    }
  },
  data() {
    return {
      // 数据
      // tableData: [
      //   {
      //     name: '活期T+0',
      //     type: '代客到期处理',
      //     amount: '30,003,323.00',
      //     status: '待确认',
      //     time: '2019-01-20 10:53',
      //     orderId: 'SG17112759459',
      //     // 是否有拓展
      //     expand: true,
      //     // 拓展的数据
      //     expandData: {
      //       columns: [
      //         {
      //           label: '到期处理方式',
      //           prop: 'methods'
      //         },
      //         {
      //           label: '交易项',
      //           prop: 'type'
      //         },
      //         {
      //           label: '金额（元）',
      //           prop: 'amount'
      //         },
      //         {
      //           label: '备注',
      //           prop: 'remark'
      //         }
      //       ],
      //       data: [
      //         {
      //           methods: '存续同类产品',
      //           type: '定期一个月',
      //           amount: '10,007,275.00',
      //           remark: '起息日 2018-09-30 | 到期日 2018-10-30 | 回款日 2018-10-31'
      //         },
      //         {
      //           methods: '存续同类产品',
      //           type: '定期一个月',
      //           amount: '10,007,275.00',
      //           remark: '起息日 2018-09-30 | 到期日 2018-10-30 | 回款日 2018-10-31'
      //         },
      //         {
      //           methods: '存续同类产品',
      //           type: '定期一个月',
      //           amount: '10,007,275.00',
      //           remark: '起息日 2018-09-30 | 到期日 2018-10-30 | 回款日 2018-10-31'
      //         }
      //       ]
      //     }
      //   },
      //   {
      //     name: '活期T+0',
      //     type: '代客申购',
      //     amount: '30,003,323.00',
      //     status: '待确认',
      //     time: '2019-01-20 10:53',
      //     orderId: 'SG17112759459'
      //   },
      //   {
      //     name: '活期T+0',
      //     type: '代客申购',
      //     amount: '30,003,323.00',
      //     status: '未支付',
      //     time: '2019-01-20 10:53',
      //     orderId: 'SG17112759459'
      //   }
      // ],
      // columns: [
      //   {
      //     label: '全部产品',
      //     prop: 'name',
      //     render: (scope) => {
      //       return (`
      //         <p style="color:#333;font-size:14px;line-height:17px;">${scope.row['name']}</p>
      //         <span style="color:#9B9B9B;font-size:12px;">编号 ${scope.row['orderId']}</span>
      //       `)
      //     }
      //   },
      //   {
      //     label: '业务类型',
      //     prop: 'type',
      //     render: (scope) => {
      //       return (`
      //         <span style="color:#999;font-size:12px;">${scope.row['type']}</span>
      //       `)
      //     }
      //   },
      //   {
      //     label: '交易金额',
      //     prop: 'amount',
      //     render: (scope) => {
      //       return (`
      //         <span style="font-size:14px;color:#333;">${scope.row['amount']}</span>
      //       `)
      //     }
      //   },
      //   {
      //     label: '状态',
      //     prop: 'status',
      //     render: (scope) => {
      //       return (`
      //         <span style="font-size:12px;color:#333;">${scope.row['status']}</span>
      //       `)
      //     }
      //   },
      //   {
      //     label: '交易时间',
      //     prop: 'time',
      //     render: (scope) => {
      //       return (`
      //         <span style="font-size:12px;color:#999;">${scope.row['time']}</span>
      //       `)
      //     }
      //   }
      // ]
    }
  },
  methods: {
    // 不需要expand的处理样式
    rowClassName({ row, rowIndex }) {
      if (row.expand) {
        return ''
      }
      else {
        return 'hide-expand'
      }
    }
  }
}
</script>
