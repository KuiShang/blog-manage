import urls from '@/config/urls'
export default {
  methods: {
    async publish () {
      const res = await this.axios.post(urls.articlePublish)
      if (res.data.status === 0) {
        console.log('haha')
      }
    }
  }
}
