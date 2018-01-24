import urls from '@/config/urls'
import {
  mapGetters
} from 'vuex'
export default {
  methods: {
    async getCatalogs () {
      if (this.catalogs.length > 0) {
        return true
      }
      const res = await this.axios.get(urls.catalogList)
      if (res.data.status === 0) {
        this.$store.commit('saveCatalogs', res.data.data)
      }
    }
  },
  computed: {
    ...mapGetters([
      'catalogs'
    ])
  }
}
