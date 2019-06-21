<template>
  <div
    class="el-select"
    :class="[selectSize ? 'el-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose">
    <div
      class="el-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
      <span v-if="collapseTags && selected.length">
        <el-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions>
          <span class="el-select__tags-text">{{ selected[0].currentLabel }}</span>
        </el-tag>
        <el-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions>
          <span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
        </el-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <el-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          type="info"
          @close="deleteTag($event, item)"
          disable-transitions>
          <span class="el-select__tags-text">{{ item.currentLabel }}</span>
        </el-tag>
      </transition-group>

      <input
        type="text"
        class="el-select__input"
        :class="[selectSize ? `is-${ selectSize }` : '']"
        :disabled="selectDisabled"
        :autocomplete="autoComplete || autocomplete"
        @focus="handleFocus"
        @blur="softFocus = false"
        @click.stop
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        v-model="query"
        @input="debouncedQueryChange"
        v-if="filterable"
        :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }"
        ref="input">
    </div>
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autoComplete || autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.down.stop.prevent="navigateOptions('next')"
      @keydown.native.up.stop.prevent="navigateOptions('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false">
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
        <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </el-input>
    <transition
      name="el-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false">
        <el-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          ref="scrollbar"
          :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
          v-show="options.length > 0 && !loading">
          <el-option
            :value="query"
            created
            v-if="showNewOption">
          </el-option>
          <slot></slot>
        </el-scrollbar>
        <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.length === 0 ))">
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="el-select-dropdown__empty" v-else>
            {{ emptyText }}
          </p>
        </template>
      </el-select-menu>
    </transition>
  </div>
</template>

<script type="text/babel">
import Emitter from 'vue-jd-ui/src/mixins/emitter'
import Focus from 'vue-jd-ui/src/mixins/focus'
import Locale from 'vue-jd-ui/src/mixins/locale'
import ElInput from 'vue-jd-ui/packages/el-input'
import ElSelectMenu from './select-dropdown.vue'
import ElOption from './option.vue'
import ElTag from 'vue-jd-ui/packages/el-tag'
import ElScrollbar from 'vue-jd-ui/packages/el-scrollbar'
import { debounce } from 'throttle-debounce'
import Clickoutside from 'vue-jd-ui/src/utils/clickoutside'
import { addResizeListener, removeResizeListener } from 'vue-jd-ui/src/utils/resize-event'
import { t } from 'vue-jd-ui/src/locale'
import scrollIntoView from 'vue-jd-ui/src/utils/scroll-into-view'
import { valueEquals, isIE, isEdge, getValueByPath } from 'vue-jd-ui/src/utils/util'
import NavigationMixin from './navigation-mixin'
import { isKorean } from 'vue-jd-ui/src/utils/shared'

export default {
  mixins: [Emitter, Locale, Focus('reference'), NavigationMixin],

  name: 'ElSelect',

  componentName: 'ElSelect',

  inject: {
    elForm: {
      default: ''
    },

    elFormItem: {
      default: ''
    }
  },

  provide() {
    return {
      'select': this
    }
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },

    readonly() {
      return !this.filterable || this.multiple || (!isIE() && !isEdge() && !this.visible)
    },

    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== ''
      let criteria = this.clearable
        && !this.selectDisabled
        && this.inputHovering
        && hasValue
      return criteria
    },

    iconClass() {
      return this.remote && this.filterable ? '' : (this.visible ? 'arrow-up is-reverse' : 'arrow-up')
    },

    debounce() {
      return this.remote ? 300 : 0
    },

    emptyText() {
      if (this.loading) {
        return this.loadingText || this.t('el.select.loading')
      }
      else {
        if (this.remote && this.query === '' && this.options.length === 0) return false
        if (this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || this.t('el.select.noMatch')
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t('el.select.noData')
        }
      }
      return null
    },

    showNewOption() {
      let hasExistingOption = this.options.filter(option => !option.created)
        .some(option => option.currentLabel === this.query)
      return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption
    },

    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },

    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },

    collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1
        ? 'mini'
        : 'small'
    }
  },

  components: {
    ElInput,
    ElSelectMenu,
    ElOption,
    ElTag,
    ElScrollbar
  },

  directives: { Clickoutside },

  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production'
          && console.warn('[Element Warn][Select]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.')
        return true
      }
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default() {
        return t('el.select.placeholder')
      }
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    }
  },

  watch: {
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight()
      })
    },

    placeholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val
    },

    value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight()
        if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
          this.currentPlaceholder = ''
        }
        else {
          this.currentPlaceholder = this.cachedPlaceHolder
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = ''
          this.handleQueryChange(this.query)
        }
      }
      this.setSelected()
      if (this.filterable && !this.multiple) {
        this.inputLength = 20
      }
      if (!valueEquals(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val)
      }
    },

    visible(val) {
      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper')
        if (this.$refs.input) {
          this.$refs.input.blur()
        }
        this.query = ''
        this.previousQuery = null
        this.selectedLabel = ''
        this.inputLength = 20
        this.menuVisibleOnFocus = false
        this.resetHoverIndex()
        this.$nextTick(() => {
          if (this.$refs.input
            && this.$refs.input.value === ''
            && this.selected.length === 0) {
            this.currentPlaceholder = this.cachedPlaceHolder
          }
        })
        if (!this.multiple) {
          if (this.selected) {
            if (this.filterable && this.allowCreate
              && this.createdSelected && this.createdLabel) {
              this.selectedLabel = this.createdLabel
            }
            else {
              this.selectedLabel = this.selected.currentLabel
            }
            if (this.filterable) this.query = this.selectedLabel
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder
          }
        }
      }
      else {
        this.broadcast('ElSelectDropdown', 'updatePopper')
        if (this.filterable) {
          this.query = this.remote ? '' : this.selectedLabel
          this.handleQueryChange(this.query)
          if (this.multiple) {
            this.$refs.input.focus()
          }
          else {
            if (!this.remote) {
              this.broadcast('ElOption', 'queryChange', '')
              this.broadcast('ElOptionGroup', 'queryChange')
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel
              this.selectedLabel = ''
            }
          }
        }
      }
      this.$emit('visible-change', val)
    },

    options() {
      if (this.$isServer) return
      this.$nextTick(() => {
        this.broadcast('ElSelectDropdown', 'updatePopper')
      })
      if (this.multiple) {
        this.resetInputHeight()
      }
      let inputs = this.$el.querySelectorAll('input')
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected()
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption()
      }
    }
  },

  methods: {
    handleComposition(event) {
      const text = event.target.value
      if (event.type === 'compositionend') {
        this.isOnComposition = false
        this.handleQueryChange(text)
      }
      else {
        const lastCharacter = text[text.length - 1] || ''
        this.isOnComposition = !isKorean(lastCharacter)
      }
    },
    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) return
      if (
        this.previousQuery === null
        && (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')
      ) {
        this.previousQuery = val
        return
      }
      this.previousQuery = val
      this.$nextTick(() => {
        if (this.visible) this.broadcast('ElSelectDropdown', 'updatePopper')
      })
      this.hoverIndex = -1
      if (this.multiple && this.filterable) {
        const length = this.$refs.input.value.length * 15 + 20
        this.inputLength = this.collapseTags ? Math.min(50, length) : length
        this.managePlaceholder()
        this.resetInputHeight()
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1
        this.remoteMethod(val)
      }
      else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val)
        this.broadcast('ElOptionGroup', 'queryChange')
      }
      else {
        this.filteredOptionsCount = this.optionsCount
        this.broadcast('ElOption', 'queryChange', val)
        this.broadcast('ElOptionGroup', 'queryChange')
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption()
      }
    },

    scrollToOption(option) {
      const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el
      if (this.$refs.popper && target) {
        const menu = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap')
        scrollIntoView(menu, target)
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll()
    },

    handleMenuEnter() {
      this.$nextTick(() => this.scrollToOption(this.selected))
    },

    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val)
      }
    },

    getOption(value) {
      let option
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]'
      const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]'

      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i]
        const isEqual = isObject
          ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
          : cachedOption.value === value
        if (isEqual) {
          option = cachedOption
          break
        }
      }
      if (option) return option
      const label = (!isObject && !isNull)
        ? value : ''
      let newOption = {
        value: value,
        currentLabel: label
      }
      if (this.multiple) {
        newOption.hitState = false
      }
      return newOption
    },

    setSelected() {
      if (!this.multiple) {
        let option = this.getOption(this.value)
        if (option.created) {
          this.createdLabel = option.currentLabel
          this.createdSelected = true
        }
        else {
          this.createdSelected = false
        }
        this.selectedLabel = option.currentLabel
        this.selected = option
        if (this.filterable) this.query = this.selectedLabel
        return
      }
      let result = []
      if (Array.isArray(this.value)) {
        this.value.forEach(value => {
          result.push(this.getOption(value))
        })
      }
      this.selected = result
      this.$nextTick(() => {
        this.resetInputHeight()
      })
    },

    handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.filterable) {
          this.visible = true
          this.menuVisibleOnFocus = true
        }
        this.$emit('focus', event)
      }
      else {
        this.softFocus = false
      }
    },

    blur() {
      this.visible = false
      this.$refs.reference.blur()
    },

    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false
        }
        else {
          this.$emit('blur', event)
        }
      }, 50)
      this.softFocus = false
    },

    handleClearClick(event) {
      this.deleteSelected(event)
    },

    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy()
    },

    handleClose() {
      this.visible = false
    },

    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return
      const option = this.selected[this.selected.length - 1]
      if (!option) return

      if (hit === true || hit === false) {
        option.hitState = hit
        return hit
      }

      option.hitState = !option.hitState
      return option.hitState
    },

    deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        const value = this.value.slice()
        value.pop()
        this.$emit('input', value)
        this.emitChange(value)
      }
    },

    managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder
      }
    },

    resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false)
      this.inputLength = this.$refs.input.value.length * 15 + 20
      this.resetInputHeight()
    },

    resetInputHeight() {
      if (this.collapseTags && !this.filterable) return
      this.$nextTick(() => {
        if (!this.$refs.reference) return
        let inputChildNodes = this.$refs.reference.$el.childNodes
        let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
        const tags = this.$refs.tags
        const sizeInMap = this.initialInputHeight || 40
        input.style.height = this.selected.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px'
        if (this.visible && this.emptyText !== false) {
          this.broadcast('ElSelectDropdown', 'updatePopper')
        }
      })
    },

    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.options.indexOf(this.selected)
        }
        else {
          if (this.selected.length > 0) {
            this.hoverIndex = Math.min.apply(null, this.selected.map(item => this.options.indexOf(item)))
          }
          else {
            this.hoverIndex = -1
          }
        }
      }, 300)
    },

    handleOptionSelect(option, byClick) {
      if (this.multiple) {
        const value = (this.value || []).slice()
        const optionIndex = this.getValueIndex(value, option.value)
        if (optionIndex > -1) {
          value.splice(optionIndex, 1)
        }
        else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value)
        }
        this.$emit('input', value)
        this.emitChange(value)
        if (option.created) {
          this.query = ''
          this.handleQueryChange('')
          this.inputLength = 20
        }
        if (this.filterable) this.$refs.input.focus()
      }
      else {
        this.$emit('input', option.value)
        this.emitChange(option.value)
        this.visible = false
      }
      this.isSilentBlur = byClick
      this.setSoftFocus()
      if (this.visible) return
      this.$nextTick(() => {
        this.scrollToOption(option)
      })
    },

    setSoftFocus() {
      this.softFocus = true
      const input = this.$refs.input || this.$refs.reference
      if (input) {
        input.focus()
      }
    },

    getValueIndex(arr = [], value) {
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]'
      if (!isObject) {
        return arr.indexOf(value)
      }
      else {
        const valueKey = this.valueKey
        let index = -1
        arr.some((item, i) => {
          if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
            index = i
            return true
          }
          return false
        })
        return index
      }
    },

    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false
        }
        else {
          this.visible = !this.visible
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus()
        }
      }
    },

    selectOption() {
      if (!this.visible) {
        this.toggleMenu()
      }
      else {
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex])
        }
      }
    },

    deleteSelected(event) {
      event.stopPropagation()
      const value = this.multiple ? [] : null
      this.$emit('input', value)
      this.emitChange(value)
      this.visible = false
      this.$emit('clear')
    },

    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag)
      if (index > -1 && !this.selectDisabled) {
        const value = this.value.slice()
        value.splice(index, 1)
        this.$emit('input', value)
        this.emitChange(value)
        this.$emit('remove-tag', tag.value)
      }
      event.stopPropagation()
    },

    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel
        this.handleQueryChange(this.query)
      }
    },

    onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--
        this.filteredOptionsCount--
        this.options.splice(index, 1)
      }
    },

    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
    },

    handleResize() {
      this.resetInputWidth()
      if (this.multiple) this.resetInputHeight()
    },

    checkDefaultFirstOption() {
      this.hoverIndex = -1
      // highlight the created option
      let hasCreated = false
      for (let i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true
          this.hoverIndex = i
          break
        }
      }
      if (hasCreated) return
      for (let i = 0; i !== this.options.length; ++i) {
        const option = this.options[i]
        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = i
            break
          }
        }
        else {
          // highlight currently selected option
          if (option.itemSelected) {
            this.hoverIndex = i
            break
          }
        }
      }
    },

    getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value
      }
      else {
        return getValueByPath(item.value, this.valueKey)
      }
    }
  },

  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', [])
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '')
    }

    this.debouncedOnInputChange = debounce(this.debounce, () => {
      this.onInputChange()
    })

    this.debouncedQueryChange = debounce(this.debounce, (e) => {
      this.handleQueryChange(e.target.value)
    })

    this.$on('handleOptionClick', this.handleOptionSelect)
    this.$on('setSelected', this.setSelected)
  },

  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = ''
    }
    addResizeListener(this.$el, this.handleResize)

    const reference = this.$refs.reference
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      }
      this.initialInputHeight = reference.$el.getBoundingClientRect().height || sizeMap[this.selectSize]
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight()
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width
      }
    })
    this.setSelected()
  },

  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize)
  }
}
</script>
<style lang="scss">
.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.el-popper .popper__arrow {
  border-width: 6px;
  -webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
.el-popper .popper__arrow::after {
  content: ' ';
  border-width: 6px;
}
.el-popper[x-placement^='top'] {
  margin-bottom: 12px;
}
.el-popper[x-placement^='top'] .popper__arrow {
  bottom: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-color: #ebeef5;
  border-bottom-width: 0;
}
.el-popper[x-placement^='top'] .popper__arrow::after {
  bottom: 1px;
  margin-left: -6px;
  border-top-color: #fff;
  border-bottom-width: 0;
}
.el-popper[x-placement^='bottom'] {
  margin-top: 12px;
}
.el-popper[x-placement^='bottom'] .popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
.el-popper[x-placement^='bottom'] .popper__arrow::after {
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.el-popper[x-placement^='right'] {
  margin-left: 12px;
}
.el-popper[x-placement^='right'] .popper__arrow {
  top: 50%;
  left: -6px;
  margin-bottom: 3px;
  border-right-color: #ebeef5;
  border-left-width: 0;
}
.el-popper[x-placement^='right'] .popper__arrow::after {
  bottom: -6px;
  left: 1px;
  border-right-color: #fff;
  border-left-width: 0;
}
.el-popper[x-placement^='left'] {
  margin-right: 12px;
}
.el-popper[x-placement^='left'] .popper__arrow {
  top: 50%;
  right: -6px;
  margin-bottom: 3px;
  border-right-width: 0;
  border-left-color: #ebeef5;
}
.el-popper[x-placement^='left'] .popper__arrow::after {
  right: 1px;
  bottom: -6px;
  margin-left: -6px;
  border-right-width: 0;
  border-left-color: #fff;
}
.el-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 5px 0;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #409eff;
  background-color: #fff;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: #f5f7fa;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  position: absolute;
  right: 20px;
  font-family: element-icons;
  content: '\e6da';
  font-size: 12px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-select-dropdown .el-scrollbar.is-empty .el-select-dropdown__list {
  padding: 0;
}
.el-select-dropdown__empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.el-select-dropdown__wrap {
  max-height: 274px;
}
.el-select-dropdown__list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-textarea {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
}
.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-textarea__inner::-webkit-input-placeholder {
  color: #c0c4cc;
}
.el-textarea__inner::-moz-placeholder {
  color: #c0c4cc;
}
.el-textarea__inner:-ms-input-placeholder {
  color: #c0c4cc;
}
.el-textarea__inner::-ms-input-placeholder {
  color: #c0c4cc;
}
.el-textarea__inner::placeholder {
  color: #c0c4cc;
}
.el-textarea__inner:hover {
  border-color: #c0c4cc;
}
.el-textarea__inner:focus {
  outline: 0;
  border-color: #409eff;
}
.el-textarea .el-input__count {
  color: #909399;
  background: #fff;
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  right: 10px;
}
.el-textarea.is-disabled .el-textarea__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.el-textarea.is-disabled .el-textarea__inner::-webkit-input-placeholder {
  color: #c0c4cc;
}
.el-textarea.is-disabled .el-textarea__inner::-moz-placeholder {
  color: #c0c4cc;
}
.el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder {
  color: #c0c4cc;
}
.el-textarea.is-disabled .el-textarea__inner::-ms-input-placeholder {
  color: #c0c4cc;
}
.el-textarea.is-disabled .el-textarea__inner::placeholder {
  color: #c0c4cc;
}
.el-textarea.is-exceed .el-textarea__inner {
  border-color: #f56c6c;
}
.el-textarea.is-exceed .el-input__count {
  color: #f56c6c;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.el-input::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}
.el-input::-webkit-scrollbar:horizontal {
  height: 6px;
}
.el-input::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #b4bccc;
}
.el-input::-webkit-scrollbar-corner {
  background: #fff;
}
.el-input::-webkit-scrollbar-track {
  background: #fff;
}
.el-input::-webkit-scrollbar-track-piece {
  background: #fff;
  width: 6px;
}
.el-input .el-input__clear {
  color: #c0c4cc;
  font-size: 14px;
  cursor: pointer;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-input .el-input__clear:hover {
  color: #909399;
}
.el-input .el-input__count {
  height: 100%;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #909399;
  font-size: 12px;
}
.el-input .el-input__count .el-input__count-inner {
  background: #fff;
  display: inline-block;
  padding: 0 5px;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.el-select-dropdown__item,
.el-tag {
  white-space: nowrap;
  -webkit-box-sizing: border-box;
}
.el-input__prefix,
.el-input__suffix {
  position: absolute;
  top: 0;
  -webkit-transition: all 0.3s;
  height: 100%;
  color: #c0c4cc;
  text-align: center;
}
.el-input__inner::-webkit-input-placeholder {
  color: #c0c4cc;
}
.el-input__inner::-moz-placeholder {
  color: #c0c4cc;
}
.el-input__inner:-ms-input-placeholder {
  color: #c0c4cc;
}
.el-input__inner::-ms-input-placeholder {
  color: #c0c4cc;
}
.el-input__inner::placeholder {
  color: #c0c4cc;
}
.el-input__inner:hover {
  border-color: #c0c4cc;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #409eff;
  outline: 0;
}
.el-input__suffix {
  right: 5px;
  transition: all 0.3s;
  pointer-events: none;
}
.el-input__suffix-inner {
  pointer-events: all;
}
.el-input__prefix {
  left: 5px;
  transition: all 0.3s;
}
.el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 40px;
}
.el-input__icon:after {
  content: '';
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
.el-input__validateIcon {
  pointer-events: none;
}
.el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.el-input.is-disabled .el-input__inner::-webkit-input-placeholder {
  color: #c0c4cc;
}
.el-input.is-disabled .el-input__inner::-moz-placeholder {
  color: #c0c4cc;
}
.el-input.is-disabled .el-input__inner:-ms-input-placeholder {
  color: #c0c4cc;
}
.el-input.is-disabled .el-input__inner::-ms-input-placeholder {
  color: #c0c4cc;
}
.el-input.is-disabled .el-input__inner::placeholder {
  color: #c0c4cc;
}
.el-input.is-disabled .el-input__icon {
  cursor: not-allowed;
}
.el-input.is-exceed .el-input__inner {
  border-color: #f56c6c;
}
.el-input.is-exceed .el-input__suffix .el-input__count {
  color: #f56c6c;
}
.el-input--suffix .el-input__inner {
  padding-right: 30px;
}
.el-input--prefix .el-input__inner {
  padding-left: 30px;
}
.el-input--medium {
  font-size: 14px;
}
.el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
}
.el-input--medium .el-input__icon {
  line-height: 36px;
}
.el-input--small {
  font-size: 13px;
}
.el-input--small .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.el-input--small .el-input__icon {
  line-height: 32px;
}
.el-input--mini {
  font-size: 12px;
}
.el-input--mini .el-input__inner {
  height: 28px;
  line-height: 28px;
}
.el-input--mini .el-input__icon {
  line-height: 28px;
}
.el-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.el-input-group > .el-input__inner {
  vertical-align: middle;
  display: table-cell;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
.el-input-group--prepend .el-input__inner,
.el-input-group__append {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.el-input-group--append .el-input__inner,
.el-input-group__prepend {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.el-input-group__append:focus,
.el-input-group__prepend:focus {
  outline: 0;
}
.el-input-group__append .el-button,
.el-input-group__append .el-select,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-select {
  display: inline-block;
  margin: -10px -20px;
}
.el-input-group__append button.el-button,
.el-input-group__append div.el-select .el-input__inner,
.el-input-group__append div.el-select:hover .el-input__inner,
.el-input-group__prepend button.el-button,
.el-input-group__prepend div.el-select .el-input__inner,
.el-input-group__prepend div.el-select:hover .el-input__inner {
  border-color: transparent;
  background-color: transparent;
  color: inherit;
  border-top: 0;
  border-bottom: 0;
}
.el-input-group__append .el-button,
.el-input-group__append .el-input,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-input {
  font-size: inherit;
}
.el-input-group__prepend {
  border-right: 0;
}
.el-input-group__append {
  border-left: 0;
}
.el-input-group--append .el-select .el-input.is-focus .el-input__inner,
.el-input-group--prepend .el-select .el-input.is-focus .el-input__inner {
  border-color: transparent;
}
.el-input__inner::-ms-clear {
  display: none;
  width: 0;
  height: 0;
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
.el-select-dropdown__item {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}
.el-select-dropdown__item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
.el-select-dropdown__item.is-disabled:hover {
  background-color: #fff;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #f5f7fa;
}
.el-select-dropdown__item.selected {
  color: #409eff;
  font-weight: 700;
}
.el-select-group {
  margin: 0;
  padding: 0;
}
.el-select-group__wrap {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.el-select-group__wrap:not(:last-of-type) {
  padding-bottom: 24px;
}
.el-select-group__wrap:not(:last-of-type)::after {
  content: '';
  position: absolute;
  display: block;
  left: 20px;
  right: 20px;
  bottom: 12px;
  height: 1px;
  background: #e4e7ed;
}
.el-select-group__title {
  padding-left: 20px;
  font-size: 12px;
  color: #909399;
  line-height: 30px;
}
.el-select-group .el-select-dropdown__item {
  padding-left: 20px;
}
.el-scrollbar {
  overflow: hidden;
  position: relative;
}
.el-scrollbar:active > .el-scrollbar__bar,
.el-scrollbar:focus > .el-scrollbar__bar,
.el-scrollbar:hover > .el-scrollbar__bar {
  opacity: 1;
  -webkit-transition: opacity 340ms ease-out;
  transition: opacity 340ms ease-out;
}
.el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}
.el-scrollbar__wrap--hidden-default::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(144, 147, 153, 0.3);
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.el-scrollbar__thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}
.el-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  -webkit-transition: opacity 120ms ease-out;
  transition: opacity 120ms ease-out;
}
.el-scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}
.el-scrollbar__bar.is-vertical > div {
  width: 100%;
}
.el-scrollbar__bar.is-horizontal {
  height: 6px;
  left: 2px;
}
.el-scrollbar__bar.is-horizontal > div {
  height: 100%;
}
.el-select {
  display: inline-block;
  position: relative;
}
.el-select .el-select__tags > span {
  display: contents;
}
.el-select:hover .el-input__inner {
  border-color: #c0c4cc;
}
.el-select .el-input__inner {
  cursor: pointer;
  padding-right: 35px;
}
.el-select .el-input__inner:focus {
  border-color: #409eff;
}
.el-select .el-input .el-select__caret {
  color: #c0c4cc;
  font-size: 14px;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg);
  cursor: pointer;
}
.el-select .el-input .el-select__caret.is-reverse {
  -webkit-transform: rotateZ(0);
  transform: rotateZ(0);
}
.el-select .el-input .el-select__caret.is-show-close {
  font-size: 14px;
  text-align: center;
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg);
  border-radius: 100%;
  color: #c0c4cc;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-select .el-input .el-select__caret.is-show-close:hover {
  color: #909399;
}
.el-select .el-input.is-disabled .el-input__inner {
  cursor: not-allowed;
}
.el-select .el-input.is-disabled .el-input__inner:hover {
  border-color: #e4e7ed;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #409eff;
}
.el-select > .el-input {
  display: block;
}
.el-select__input {
  border: none;
  outline: 0;
  padding: 0;
  margin-left: 15px;
  color: #666;
  font-size: 14px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 28px;
  background-color: transparent;
}
.el-select__input.is-mini {
  height: 14px;
}
.el-select__close {
  cursor: pointer;
  position: absolute;
  top: 8px;
  z-index: 1000;
  right: 25px;
  color: #c0c4cc;
  line-height: 18px;
  font-size: 14px;
}
.el-select__close:hover {
  color: #909399;
}
.el-select__tags {
  position: absolute;
  line-height: normal;
  white-space: normal;
  z-index: 1;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.el-select .el-tag__close {
  margin-top: -2px;
}
.el-select .el-tag {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-color: transparent;
  margin: 2px 0 2px 6px;
  background-color: #f0f2f5;
}
.el-select .el-tag__close.el-icon-close {
  background-color: #c0c4cc;
  right: -7px;
  top: 0;
  color: #fff;
}
.el-select .el-tag__close.el-icon-close:hover {
  background-color: #909399;
}
.el-select .el-tag__close.el-icon-close::before {
  display: block;
  -webkit-transform: translate(0, 0.5px);
  transform: translate(0, 0.5px);
}
</style>
