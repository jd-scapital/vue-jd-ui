<template>
  <div class="el-table"
    :class="[{
      'el-table--fit': fit,
      'el-table--striped': stripe,
      'el-table--border': border || isGroup,
      'el-table--hidden': isHidden,
      'el-table--group': isGroup,
      'el-table--fluid-height': maxHeight,
      'el-table--scrollable-x': layout.scrollX,
      'el-table--scrollable-y': layout.scrollY,
      'el-table--enable-row-hover': !store.states.isComplex,
      'el-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
    }, tableSize ? `el-table--${ tableSize }` : '']"
    @mouseleave="handleMouseLeave($event)">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div
      v-if="showHeader"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__header-wrapper"
      ref="headerWrapper">
      <table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-header>
    </div>
    <div
      class="el-table__body-wrapper"
      ref="bodyWrapper"
      :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
      :style="[bodyHeight]">
      <table-body
        :context="context"
        :store="store"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{
           width: bodyWidth
        }">
      </table-body>
      <div
        v-if="!data || data.length === 0"
        class="el-table__empty-block"
        ref="emptyBlock"
        :style="{
          width: bodyWidth
        }">
        <span class="el-table__empty-text">
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        class="el-table__append-wrapper"
        ref="appendWrapper">
        <slot name="append"></slot>
      </div>
    </div>
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__footer-wrapper"
      ref="footerWrapper">
      <table-footer
        :store="store"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-footer>
    </div>
    <div
      v-if="fixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="el-table__fixed"
      ref="fixedWrapper"
      :style="[{
        width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
      },
      fixedHeight]">
      <div
        v-if="showHeader"
        class="el-table__fixed-header-wrapper"
        ref="fixedHeaderWrapper" >
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
        class="el-table__fixed-body-wrapper"
        ref="fixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{
            width: bodyWidth
          }">
        </table-body>
        <div
          v-if="$slots.append"
          class="el-table__append-gutter"
          :style="{
            height: layout.appendHeight + 'px'
          }"></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="el-table__fixed-footer-wrapper"
        ref="fixedFooterWrapper">
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="el-table__fixed-right"
      ref="rightFixedWrapper"
      :style="[{
        width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
        right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
      },
      fixedHeight]">
      <div v-if="showHeader"
        class="el-table__fixed-header-wrapper"
        ref="rightFixedHeaderWrapper">
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
        class="el-table__fixed-body-wrapper"
        ref="rightFixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{
            width: bodyWidth
          }">
        </table-body>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="el-table__fixed-footer-wrapper"
        ref="rightFixedFooterWrapper">
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      class="el-table__fixed-right-patch"
      ref="rightFixedPatch"
      :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }"></div>
    <div class="el-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</template>

<script type="text/babel">
import { debounce } from 'throttle-debounce'
import { addResizeListener, removeResizeListener } from 'vue-jd-ui/src/utils/resize-event'
import Mousewheel from 'vue-jd-ui/src/directives/mousewheel'
import Locale from 'vue-jd-ui/src/mixins/locale'
import Migrating from 'vue-jd-ui/src/mixins/migrating'
import TableStore from './table-store'
import TableLayout from './table-layout'
import TableBody from './table-body'
import TableHeader from './table-header'
import TableFooter from './table-footer'
import { getRowIdentity } from './util'

const flattenData = function(data) {
  if (!data) return data
  let newData = []
  const flatten = arr => {
    arr.forEach((item) => {
      newData.push(item)
      if (Array.isArray(item.children)) {
        flatten(item.children)
      }
    })
  }
  flatten(data)
  if (data.length === newData.length) {
    return data
  }
  else {
    return newData
  }
}

let tableIdSeed = 1

export default {
  name: 'ElTable',

  mixins: [Locale, Migrating],

  directives: {
    Mousewheel
  },

  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },

    indent: {
      type: Number,
      default: 16
    },

    lazy: Boolean,

    load: Function
  },

  components: {
    TableHeader,
    TableFooter,
    TableBody
  },

  methods: {
    getMigratingConfig() {
      return {
        events: {
          expand: 'expand is renamed to expand-change'
        }
      }
    },

    setCurrentRow(row) {
      this.store.commit('setCurrentRow', row)
    },

    toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected)
      this.store.updateAllSelected()
    },

    toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansion(row, expanded)
    },

    clearSelection() {
      this.store.clearSelection()
    },

    clearFilter(columnKeys) {
      this.store.clearFilter(columnKeys)
    },

    clearSort() {
      this.store.clearSort()
    },

    handleMouseLeave() {
      this.store.commit('setHoverRow', null)
      if (this.hoverState) this.hoverState = null
    },

    updateScrollY() {
      this.layout.updateScrollY()
      this.layout.updateColumnsWidth()
    },

    handleFixedMousewheel(event, data) {
      const bodyWrapper = this.bodyWrapper
      if (Math.abs(data.spinY) > 0) {
        const currentScrollTop = bodyWrapper.scrollTop
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault()
        }
        if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
          event.preventDefault()
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5)
      }
      else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5)
      }
    },

    handleHeaderFooterMousewheel(event, data) {
      const { pixelX, pixelY } = data
      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        event.preventDefault()
        this.bodyWrapper.scrollLeft += data.pixelX / 5
      }
    },

    bindEvents() {
      const { headerWrapper, footerWrapper } = this.$refs
      const refs = this.$refs
      let self = this

      this.bodyWrapper.addEventListener('scroll', function() {
        if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft
        if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft
        if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop
        if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop
        const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1
        const scrollLeft = this.scrollLeft
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = 'right'
        }
        else if (scrollLeft === 0) {
          self.scrollPosition = 'left'
        }
        else {
          self.scrollPosition = 'middle'
        }
      })

      if (this.fit) {
        addResizeListener(this.$el, this.resizeListener)
      }
    },

    resizeListener() {
      if (!this.$ready) return
      let shouldUpdateLayout = false
      const el = this.$el
      const { width: oldWidth, height: oldHeight } = this.resizeState

      const width = el.offsetWidth
      if (oldWidth !== width) {
        shouldUpdateLayout = true
      }

      const height = el.offsetHeight
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width
        this.resizeState.height = height
        this.doLayout()
      }
    },

    doLayout() {
      this.layout.updateColumnsWidth()
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight()
      }
    },

    sort(prop, order) {
      this.store.commit('sort', { prop, order })
    },

    toggleAllSelection() {
      this.store.commit('toggleAllSelection')
    },

    getRowKey(row) {
      const rowKey = getRowIdentity(row, this.store.states.rowKey)
      if (!rowKey) {
        throw new Error('if there\'s nested data, rowKey is required.')
      }
      return rowKey
    },

    getTableTreeData(data) {
      const treeData = {}
      const traverse = (children, parentData, level) => {
        children.forEach(item => {
          const rowKey = this.getRowKey(item)
          treeData[rowKey] = {
            display: false,
            level
          }
          parentData.children.push(rowKey)
          if (Array.isArray(item.children) && item.children.length) {
            treeData[rowKey].children = []
            treeData[rowKey].expanded = false
            traverse(item.children, treeData[rowKey], level + 1)
          }
        })
      }
      if (data) {
        data.forEach(item => {
          const containChildren = Array.isArray(item.children) && item.children.length
          if (!(containChildren || item.hasChildren)) return
          const rowKey = this.getRowKey(item)
          const treeNode = {
            level: 0,
            expanded: false,
            display: true,
            children: []
          }
          if (containChildren) {
            treeData[rowKey] = treeNode
            traverse(item.children, treeData[rowKey], 1)
          }
          else if (item.hasChildren && this.lazy) {
            treeNode.hasChildren = true
            treeNode.loaded = false
            treeData[rowKey] = treeNode
          }
        })
      }
      return treeData
    }
  },

  created() {
    this.tableId = 'el-table_' + tableIdSeed++
    this.debouncedUpdateLayout = debounce(50, () => this.doLayout())
  },

  computed: {
    tableSize() {
      return this.size || (this.$ELEMENT || {}).size
    },

    bodyWrapper() {
      return this.$refs.bodyWrapper
    },

    shouldUpdateHeight() {
      return this.height
        || this.maxHeight
        || this.fixedColumns.length > 0
        || this.rightFixedColumns.length > 0
    },

    selection() {
      return this.store.states.selection
    },

    columns() {
      return this.store.states.columns
    },

    tableData() {
      return this.store.states.data
    },

    fixedColumns() {
      return this.store.states.fixedColumns
    },

    rightFixedColumns() {
      return this.store.states.rightFixedColumns
    },

    bodyWidth() {
      const { bodyWidth, scrollY, gutterWidth } = this.layout
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : ''
    },

    bodyHeight() {
      if (this.height) {
        return {
          height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
        }
      }
      else if (this.maxHeight) {
        return {
          'max-height': this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
        }
      }
      return {}
    },

    fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        }
      }
      else if (this.maxHeight) {
        let maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight

        if (this.showHeader) {
          maxHeight -= this.layout.headerHeight
        }

        maxHeight -= this.layout.footerHeight

        return {
          'max-height': maxHeight + 'px'
        }
      }

      return {}
    },

    fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          }
        }
        return {
          bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
        }
      }
      else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
          }
        }
        return {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
        }
      }
    }
  },

  watch: {
    height: {
      immediate: true,
      handler(value) {
        this.layout.setHeight(value)
      }
    },

    maxHeight: {
      immediate: true,
      handler(value) {
        this.layout.setMaxHeight(value)
      }
    },

    currentRowKey(newVal) {
      this.store.setCurrentRowKey(newVal)
    },

    data: {
      immediate: true,
      handler(value) {
        this.store.states.treeData = this.getTableTreeData(value)
        value = flattenData(value)
        this.store.commit('setData', value)
        if (this.$ready) {
          this.$nextTick(() => {
            this.doLayout()
          })
        }
      }
    },

    expandRowKeys: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.store.setExpandRowKeys(newVal)
        }
      }
    }
  },

  destroyed() {
    if (this.resizeListener) removeResizeListener(this.$el, this.resizeListener)
  },

  mounted() {
    this.bindEvents()
    this.store.updateColumns()
    this.doLayout()

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    }

    // init filters
    this.store.states.columns.forEach(column => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit('filterChange', {
          column,
          values: column.filteredValue,
          silent: true
        })
      }
    })

    this.$ready = true
  },

  data() {
    const store = new TableStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      indent: this.indent,
      lazy: this.lazy
    })
    const layout = new TableLayout({
      store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    })
    return {
      layout,
      store,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left'
    }
  }
}
</script>
<style lang="scss">
@charset "UTF-8";
.el-checkbox,
.el-checkbox__input {
  display: inline-block;
  position: relative;
}
.el-table td.is-hidden > *,
.el-table th.is-hidden > *,
.el-table--hidden {
  visibility: hidden;
}
.el-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 30px;
}
.el-checkbox-button__inner,
.el-table th {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  white-space: nowrap;
}
.el-checkbox.is-bordered {
  padding: 9px 20px 9px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: normal;
  height: 40px;
}
.el-checkbox.is-bordered.is-checked {
  border-color: #409eff;
}
.el-checkbox.is-bordered.is-disabled {
  border-color: #ebeef5;
  cursor: not-allowed;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 10px;
}
.el-checkbox.is-bordered.el-checkbox--medium {
  padding: 7px 20px 7px 10px;
  border-radius: 4px;
  height: 36px;
}
.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__label {
  line-height: 17px;
  font-size: 14px;
}
.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__inner {
  height: 14px;
  width: 14px;
}
.el-checkbox.is-bordered.el-checkbox--small {
  padding: 5px 15px 5px 10px;
  border-radius: 3px;
  height: 32px;
}
.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label {
  line-height: 15px;
  font-size: 12px;
}
.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner {
  height: 12px;
  width: 12px;
}
.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner::after {
  height: 6px;
  width: 2px;
}
.el-checkbox.is-bordered.el-checkbox--mini {
  padding: 3px 15px 3px 10px;
  border-radius: 3px;
  height: 28px;
}
.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__label {
  line-height: 12px;
  font-size: 12px;
}
.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner {
  height: 12px;
  width: 12px;
}
.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner::after {
  height: 6px;
  width: 2px;
}
.el-checkbox__input {
  white-space: nowrap;
  cursor: pointer;
  outline: 0;
  line-height: 1;
  vertical-align: middle;
}
.el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #edf2fc;
  border-color: #dcdfe6;
  cursor: not-allowed;
}
.el-checkbox__input.is-disabled .el-checkbox__inner::after {
  cursor: not-allowed;
  border-color: #c0c4cc;
}
.el-checkbox__input.is-disabled .el-checkbox__inner + .el-checkbox__label {
  cursor: not-allowed;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #dcdfe6;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #c0c4cc;
}
.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #dcdfe6;
}
.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
  background-color: #c0c4cc;
  border-color: #c0c4cc;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #c0c4cc;
  cursor: not-allowed;
}
.el-checkbox__input.is-checked .el-checkbox__inner::after {
  -webkit-transform: rotate(45deg) scaleY(1);
  transform: rotate(45deg) scaleY(1);
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #409eff;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #409eff;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  content: '';
  position: absolute;
  display: block;
  background-color: #fff;
  height: 2px;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 5px;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner::after {
  display: none;
}
.el-checkbox__inner {
  display: inline-block;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #fff;
  z-index: 1;
  -webkit-transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
.el-checkbox__inner:hover {
  border-color: #409eff;
}
.el-checkbox__inner::after {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  content: '';
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 7px;
  left: 4px;
  position: absolute;
  top: 1px;
  -webkit-transform: rotate(45deg) scaleY(0);
  transform: rotate(45deg) scaleY(0);
  width: 3px;
  -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
  transition: -webkit-transform 0.15s ease-in 0.05s;
  transition: transform 0.15s ease-in 0.05s;
  transition: transform 0.15s ease-in 0.05s,
    -webkit-transform 0.15s ease-in 0.05s;
  -webkit-transform-origin: center;
  transform-origin: center;
}
.el-checkbox__original {
  opacity: 0;
  outline: 0;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  z-index: -1;
}
.el-checkbox-button,
.el-checkbox-button__inner {
  position: relative;
  display: inline-block;
}
.el-checkbox__label {
  display: inline-block;
  padding-left: 10px;
  line-height: 19px;
  font-size: 14px;
}
.el-checkbox:last-child {
  margin-right: 0;
}
.el-checkbox-button__inner {
  line-height: 1;
  font-weight: 500;
  vertical-align: middle;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-left: 0;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 0;
}
.el-table,
.el-tag {
  -webkit-box-sizing: border-box;
}
.el-checkbox-button__inner.is-round {
  padding: 12px 20px;
}
.el-checkbox-button__inner:hover {
  color: #409eff;
}
.el-checkbox-button__inner [class*='el-icon-'] {
  line-height: 0.9;
}
.el-checkbox-button__inner [class*='el-icon-'] + span {
  margin-left: 5px;
}
.el-checkbox-button__original {
  opacity: 0;
  outline: 0;
  position: absolute;
  margin: 0;
  z-index: -1;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  -webkit-box-shadow: -1px 0 0 0 #8cc5ff;
  box-shadow: -1px 0 0 0 #8cc5ff;
}
.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner {
  border-left-color: #409eff;
}
.el-checkbox-button.is-disabled .el-checkbox-button__inner {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.el-checkbox-button.is-disabled:first-child .el-checkbox-button__inner {
  border-left-color: #ebeef5;
}
.el-checkbox-button:first-child .el-checkbox-button__inner {
  border-left: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.el-checkbox-button.is-focus .el-checkbox-button__inner {
  border-color: #409eff;
}
.el-checkbox-button:last-child .el-checkbox-button__inner {
  border-radius: 0 4px 4px 0;
}
.el-checkbox-button--medium .el-checkbox-button__inner {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 0;
}
.el-checkbox-button--medium .el-checkbox-button__inner.is-round {
  padding: 10px 20px;
}
.el-checkbox-button--small .el-checkbox-button__inner {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 0;
}
.el-checkbox-button--small .el-checkbox-button__inner.is-round {
  padding: 9px 15px;
}
.el-checkbox-button--mini .el-checkbox-button__inner {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 0;
}
.el-checkbox-button--mini .el-checkbox-button__inner.is-round {
  padding: 7px 15px;
}
.el-checkbox-group {
  font-size: 0;
}
.el-tag {
  background-color: rgba(64, 158, 255, 0.1);
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
  white-space: nowrap;
}
.el-tag .el-icon-close {
  border-radius: 50%;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  vertical-align: middle;
  top: -1px;
  right: -5px;
  color: #409eff;
}
.el-tag .el-icon-close::before {
  display: block;
}
.el-tag .el-icon-close:hover {
  background-color: #409eff;
  color: #fff;
}
.el-tag--info,
.el-tag--info .el-tag__close {
  color: #909399;
}
.el-tag--info {
  background-color: rgba(144, 147, 153, 0.1);
  border-color: rgba(144, 147, 153, 0.2);
}
.el-tag--info.is-hit {
  border-color: #909399;
}
.el-tag--info .el-tag__close:hover {
  background-color: #909399;
  color: #fff;
}
.el-tag--success {
  background-color: rgba(103, 194, 58, 0.1);
  border-color: rgba(103, 194, 58, 0.2);
  color: #67c23a;
}
.el-tag--success.is-hit {
  border-color: #67c23a;
}
.el-tag--success .el-tag__close {
  color: #67c23a;
}
.el-tag--success .el-tag__close:hover {
  background-color: #67c23a;
  color: #fff;
}
.el-tag--warning {
  background-color: rgba(230, 162, 60, 0.1);
  border-color: rgba(230, 162, 60, 0.2);
  color: #e6a23c;
}
.el-tag--warning.is-hit {
  border-color: #e6a23c;
}
.el-tag--warning .el-tag__close {
  color: #e6a23c;
}
.el-tag--warning .el-tag__close:hover {
  background-color: #e6a23c;
  color: #fff;
}
.el-tag--danger {
  background-color: rgba(245, 108, 108, 0.1);
  border-color: rgba(245, 108, 108, 0.2);
  color: #f56c6c;
}
.el-tag--danger.is-hit {
  border-color: #f56c6c;
}
.el-tag--danger .el-tag__close {
  color: #f56c6c;
}
.el-tag--danger .el-tag__close:hover {
  background-color: #f56c6c;
  color: #fff;
}
.el-tag--medium {
  height: 28px;
  line-height: 26px;
}
.el-tag--medium .el-icon-close {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
.el-tag--small {
  height: 24px;
  padding: 0 8px;
  line-height: 22px;
}
.el-tag--small .el-icon-close {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
.el-tag--mini {
  height: 20px;
  padding: 0 5px;
  line-height: 19px;
}
.el-tag--mini .el-icon-close {
  margin-left: -3px;
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
}
.el-tooltip:focus:hover,
.el-tooltip:focus:not(.focusing) {
  outline-width: 0;
}
.el-tooltip__popper {
  position: absolute;
  border-radius: 4px;
  padding: 10px;
  z-index: 2000;
  font-size: 12px;
  line-height: 1.2;
  min-width: 10px;
  word-wrap: break-word;
}
.el-tooltip__popper .popper__arrow,
.el-tooltip__popper .popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.el-tooltip__popper .popper__arrow {
  border-width: 6px;
}
.el-tooltip__popper .popper__arrow::after {
  content: ' ';
  border-width: 5px;
}
.el-tooltip__popper[x-placement^='top'] {
  margin-bottom: 12px;
}
.el-tooltip__popper[x-placement^='top'] .popper__arrow {
  bottom: -6px;
  border-top-color: #303133;
  border-bottom-width: 0;
}
.el-tooltip__popper[x-placement^='top'] .popper__arrow::after {
  bottom: 1px;
  margin-left: -5px;
  border-top-color: #303133;
  border-bottom-width: 0;
}
.el-tooltip__popper[x-placement^='bottom'] {
  margin-top: 12px;
}
.el-tooltip__popper[x-placement^='bottom'] .popper__arrow {
  top: -6px;
  border-top-width: 0;
  border-bottom-color: #303133;
}
.el-tooltip__popper[x-placement^='bottom'] .popper__arrow::after {
  top: 1px;
  margin-left: -5px;
  border-top-width: 0;
  border-bottom-color: #303133;
}
.el-tooltip__popper[x-placement^='right'] {
  margin-left: 12px;
}
.el-tooltip__popper[x-placement^='right'] .popper__arrow {
  left: -6px;
  border-right-color: #303133;
  border-left-width: 0;
}
.el-tooltip__popper[x-placement^='right'] .popper__arrow::after {
  bottom: -5px;
  left: 1px;
  border-right-color: #303133;
  border-left-width: 0;
}
.el-tooltip__popper[x-placement^='left'] {
  margin-right: 12px;
}
.el-tooltip__popper[x-placement^='left'] .popper__arrow {
  right: -6px;
  border-right-width: 0;
  border-left-color: #303133;
}
.el-tooltip__popper[x-placement^='left'] .popper__arrow::after {
  right: 1px;
  bottom: -5px;
  margin-left: -5px;
  border-right-width: 0;
  border-left-color: #303133;
}
.el-tooltip__popper.is-dark {
  background: #303133;
  color: #fff;
}
.el-table,
.el-table__expanded-cell {
  background-color: #fff;
}
.el-tooltip__popper.is-light {
  background: #fff;
  border: 1px solid #303133;
}
.el-tooltip__popper.is-light[x-placement^='top'] .popper__arrow {
  border-top-color: #303133;
}
.el-tooltip__popper.is-light[x-placement^='top'] .popper__arrow::after {
  border-top-color: #fff;
}
.el-tooltip__popper.is-light[x-placement^='bottom'] .popper__arrow {
  border-bottom-color: #303133;
}
.el-tooltip__popper.is-light[x-placement^='bottom'] .popper__arrow::after {
  border-bottom-color: #fff;
}
.el-tooltip__popper.is-light[x-placement^='left'] .popper__arrow {
  border-left-color: #303133;
}
.el-tooltip__popper.is-light[x-placement^='left'] .popper__arrow::after {
  border-left-color: #fff;
}
.el-tooltip__popper.is-light[x-placement^='right'] .popper__arrow {
  border-right-color: #303133;
}
.el-tooltip__popper.is-light[x-placement^='right'] .popper__arrow::after {
  border-right-color: #fff;
}
.el-table {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  color: #606266;
}
.el-table--mini,
.el-table--small,
.el-table__expand-icon {
  font-size: 12px;
}
.el-table__empty-block {
  min-height: 60px;
  text-align: center;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.el-table__empty-text {
  line-height: 60px;
  width: 50%;
  color: #909399;
}
.el-table__expand-column .cell {
  padding: 0;
  text-align: center;
}
.el-table__expand-icon {
  position: relative;
  cursor: pointer;
  color: #666;
  -webkit-transition: -webkit-transform 0.2s ease-in-out;
  transition: -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
  height: 20px;
}
.el-table__expand-icon--expanded {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.el-table__expand-icon > .el-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -5px;
  margin-top: -5px;
}
.el-table__expanded-cell[class*='cell'] {
  padding: 20px 50px;
}
.el-table__expanded-cell:hover {
  background-color: transparent !important;
}
.el-table__placeholder {
  display: inline-block;
  width: 20px;
}
.el-table--fit {
  border-right: 0;
  border-bottom: 0;
}
.el-table--fit td.gutter,
.el-table--fit th.gutter {
  border-right-width: 1px;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: auto;
}
.el-table--scrollable-y .el-table__body-wrapper {
  overflow-y: auto;
}
.el-table thead {
  color: #909399;
  font-weight: 500;
}
.el-table thead.is-group th {
  background: #f5f7fa;
}
.el-table th,
.el-table tr {
  background-color: #fff;
}
.el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
.el-table td.is-center,
.el-table th.is-center {
  text-align: center;
}
.el-table td.is-right,
.el-table th.is-right {
  text-align: right;
}
.el-table td.gutter,
.el-table th.gutter {
  width: 15px;
  border-right-width: 0;
  border-bottom-width: 0;
  padding: 0;
}
.el-table--medium td,
.el-table--medium th {
  padding: 10px 0;
}
.el-table--small td,
.el-table--small th {
  padding: 8px 0;
}
.el-table--mini td,
.el-table--mini th {
  padding: 6px 0;
}
.el-table .cell,
.el-table th div {
  text-overflow: ellipsis;
  padding-right: 10px;
  overflow: hidden;
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 10px;
}
.el-table tr input[type='checkbox'] {
  margin: 0;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
}
.el-table th.is-sortable {
  cursor: pointer;
}
.el-table th {
  overflow: hidden;
  user-select: none;
}
.el-table th div {
  display: inline-block;
  line-height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}
.el-table th > .cell {
  position: relative;
  word-wrap: normal;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-table th > .cell.highlight {
  color: #409eff;
}
.el-table th.required > div::before {
  display: inline-block;
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff4d51;
  margin-right: 5px;
  vertical-align: middle;
}
.el-table td div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-table td.gutter {
  width: 0;
}
.el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
}
.el-table .cell.el-tooltip {
  white-space: nowrap;
  min-width: 50px;
}
.el-table--border,
.el-table--group {
  border: 1px solid #ebeef5;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: '';
  position: absolute;
  background-color: #ebeef5;
  z-index: 1;
}
.el-table--border::after,
.el-table--group::after {
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
}
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
}
.el-table--border {
  border-right: none;
  border-bottom: none;
}
.el-table--border.el-loading-parent--relative {
  border-color: transparent;
}
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #ebeef5;
}
.el-table--border th.gutter:last-of-type {
  border-bottom: 1px solid #ebeef5;
  border-bottom-width: 1px;
}
.el-table--border th,
.el-table__fixed-right-patch {
  border-bottom: 1px solid #ebeef5;
}
.el-table__fixed,
.el-table__fixed-right {
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
}
.el-table__fixed-right::before,
.el-table__fixed::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #ebeef5;
  z-index: 4;
}
.el-table__fixed-right-patch {
  position: absolute;
  top: -1px;
  right: 0;
  background-color: #fff;
}
.el-table__fixed-right {
  top: 0;
  left: auto;
  right: 0;
}
.el-table__fixed-right .el-table__fixed-body-wrapper,
.el-table__fixed-right .el-table__fixed-footer-wrapper,
.el-table__fixed-right .el-table__fixed-header-wrapper {
  left: auto;
  right: 0;
}
.el-table__fixed-header-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
}
.el-table__fixed-footer-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
}
.el-table__fixed-footer-wrapper tbody td {
  border-top: 1px solid #ebeef5;
  background-color: #f5f7fa;
  color: #606266;
}
.el-table__fixed-body-wrapper {
  position: absolute;
  left: 0;
  top: 37px;
  overflow: hidden;
  z-index: 3;
}
.el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  width: 100%;
}
.el-table__footer-wrapper {
  margin-top: -1px;
}
.el-table__footer-wrapper td {
  border-top: 1px solid #ebeef5;
}
.el-table__body,
.el-table__footer,
.el-table__header {
  table-layout: fixed;
  border-collapse: separate;
}
.el-table__footer-wrapper,
.el-table__header-wrapper {
  overflow: hidden;
}
.el-table__footer-wrapper tbody td,
.el-table__header-wrapper tbody td {
  background-color: #f5f7fa;
  color: #606266;
}
.el-table__body-wrapper {
  overflow: hidden;
  position: relative;
}
.el-table__body-wrapper.is-scrolling-left ~ .el-table__fixed,
.el-table__body-wrapper.is-scrolling-none ~ .el-table__fixed,
.el-table__body-wrapper.is-scrolling-none ~ .el-table__fixed-right,
.el-table__body-wrapper.is-scrolling-right ~ .el-table__fixed-right {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.el-table__body-wrapper
  .el-table--border.is-scrolling-right
  ~ .el-table__fixed-right {
  border-left: 1px solid #ebeef5;
}
.el-table .caret-wrapper {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}
.el-table .sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}
.el-table .sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: 5px;
}
.el-table .sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: 7px;
}
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: #409eff;
}
.el-table .descending .sort-caret.descending {
  border-top-color: #409eff;
}
.el-table .hidden-columns {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #fafafa;
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td,
.el-table__body tr.hover-row.current-row > td,
.el-table__body tr.hover-row.el-table__row--striped.current-row > td,
.el-table__body tr.hover-row.el-table__row--striped > td,
.el-table__body tr.hover-row > td {
  background-color: #ecf5ff;
}
.el-table__column-resize-proxy {
  position: absolute;
  left: 200px;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px solid #ebeef5;
  z-index: 10;
}
.el-table__column-filter-trigger {
  display: inline-block;
  line-height: 34px;
  cursor: pointer;
}
.el-table__column-filter-trigger i {
  color: #909399;
  font-size: 12px;
  -webkit-transform: scale(0.75);
  transform: scale(0.75);
}
.el-table--enable-row-transition .el-table__body td {
  -webkit-transition: background-color 0.25s ease;
  transition: background-color 0.25s ease;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f5f7fa;
}
.el-table--fluid-height .el-table__fixed,
.el-table--fluid-height .el-table__fixed-right {
  bottom: 0;
  overflow: hidden;
}
.el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: inline-block;
  width: 14px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
