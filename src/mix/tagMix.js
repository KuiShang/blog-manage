import urls from '@/config/urls'
import {
  mapGetters
} from 'vuex'
export default {
  methods: {
    async getTags () {
      if (this.tags.length > 0) {
        return true
      }
      const res = await this.axios.get(urls.tagList)
      if (res.data.status === 0) {
        this.$store.commit('saveTags', res.data.data)
      }
    }
  },
  computed: {
    ...mapGetters([
      'tags'
    ])
  }
}
