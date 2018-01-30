import urls from '@/config/urls'
export default {
  methods: {
    // 这个方法 只是在article中用到了，没有必要提出来， 暂时没有删除，
    async save (article) {
      const res = await this.axios.post(urls.articleSave, article)
      if (res.data.status === 0) {
        console.log('haha')
      }
    }
  }
}
