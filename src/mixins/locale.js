import { t } from 'vue-jd-ui/src/locale'

export default {
  methods: {
    t(...args) {
      return t.apply(this, args)
    }
  }
}
