
export default {
  data () {
    return {
      tags: []
    }
  },
  methods: {
    async getTags () {
      const res = await this.axios.get('/v1/tag')
      if (res.data.status === 0) {
        this.tags = res.data.data
      }
    }
  }
}
