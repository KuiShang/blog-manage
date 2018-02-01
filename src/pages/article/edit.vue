<<template>
  <div class="article-editor">
      <el-form :model="form" :rules="rules" ref="form" label-position="left">
        <div class="flexrow">
            <el-upload 
              class="flex-1"
              :action="uploadConfig.url"
              :name="uploadConfig.name"
              :on-success="uploadSuccess"
              :multiple="false"
              :headers="uploadConfig.header"
              :on-error="uploadError"
              :file-list="banner">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">上传文章的banner图</div>
            </el-upload>
            <div class="flex-1">
              <el-form-item label="文章标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="所属栏目" prop="title">
                <el-select v-model="form.catalog_id" placeholder="请选择栏目">
                  <el-option v-for="cata in catalogs" :key="cata._id" :label="cata.name" :value="cata._id"/>
                </el-select>
              </el-form-item>
              <el-form-item label="文章标签" prop="title">
                <el-select v-model="form.tag_ids" placeholder="请选择标签" :multiple=true :filterable=true :allow-create=true>
                  <el-option v-for="cata in tags" :key="cata._id" :label="cata.name" :value="cata._id"/>
                </el-select>
              </el-form-item>
            </div>
        </div>
        <div class="markdown-editor">
            <markdown-editor
            ref="editor"
            v-model="form.content"
            :upload="uploadConfig"
            :options="MarkdownOptions"
            @upload-error="uploadError"
            height="100%"
            @save-history="saveHistory"
            />
        </div>
        <el-form-item label="摘要" hidden></el-form-item>
        <div class="btn-container" >
            <el-button size="mini" type="text" v-if="isDraft" @click.prevent="saveDraft">保存</el-button>
            <el-button size="mini" type="text" native-type="submit" @click.prevent="saveAction">保存并发布</el-button>
        </div>
      </el-form>
  </div>
</template>
<<script>
// import Vue from 'vue'
import { MarkdownEditor } from 'markdown-it-editor'
import catalogMix from '@/mix/catalogMix'
import tagMix from '@/mix/tagMix'
import 'markdown-it-editor/lib/index.css'
import MarkdownMix from './MarkdownMix'
import {uploadPath, baseImgPath} from '@/config/env'
export default {
  name: 'edit',
  async created () {
    this.getCatalogs()
    this.getTags()
    console.log(this.editData)
  },
  data () {
    return {
      form: {content: '', title: '', summary: '', banner: '', catalog_id: null, status: 1, tag_ids: [], ...this.editData},
      rules: {
        title: {required: true}
      }
    }
  },
  components: {
    MarkdownEditor
  },
  props: {
    editData: Object
  },
  mixins: [MarkdownMix, catalogMix, tagMix],
  computed: {
    uploadConfig () {
      return {
        // url: Vue.globalOptions.uploadUrl,
        url: uploadPath,
        name: 'file',
        accept: 'image/jpg,image/jpeg,image/png,image/gif',
        header: this.mix_headers
      }
    },
    banner () {
      let array = []
      if (this.form.banner) {
        array = [{name: 'banner', url: this.form.banner}]
      }
      return array
    },
    isDraft () {
      return this.form.status === 1
    }
  },
  methods: {
    uploadError (e) {
      this.$message.error('upload error: ' + (e.responseText || e))
    },
    uploadSuccess (r) {
      this.form.banner = baseImgPath + r.image_path
    },
    generatorSummary () {
      this.form.summary = this.$refs.editor.getText().replace(/\n/g, ' ').substr(0, 300)
    },
    saveHistory () {
      if (this.isDraft) {
        // return this.$post('article/save/draft', this.form, { emulateJSON: false }).then(({data}) => {
        //   if (this.form.id !== data.id) this.form = {...this.form, id: data.id}
        // })
      }
    },
    saveDraft () {
      // this.saveHistory()
      this.$emit('close')
    },
    saveAction () {
      this.generatorSummary()
      this.form.status = 2
      this.$emit('save', this.form)
    }
  },
  watch: {
    'form.content' () {
      this.$nextTick(() => {
        this.generatorSummary()
      })
    },
    editData (newdata, old) {
      this.form = {...this.form, ...newdata}
      console.log(newdata, old)
    }
  },
  destroyed () {
    console.log(123)
  }
}
</script>
<style lang="scss" scoped>
.article-editor {
    // height: 80vh;
}
.markdown-editor{
   height: 68vh;
   // height: 100%;
}
.btn-container {
    position: absolute;
    top: 9px;
    right: 100px;

}

</style>

