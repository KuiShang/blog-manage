export default {
  data () {
    return {
      catalogs: []
    }
  },
  methods: {
    async getCatalogs () {
      const res = await this.axios.get('/v1/catalog')
      if (res.data.status === 0) {
        this.catalogs = res.data.data
      }
    }
  }
}
