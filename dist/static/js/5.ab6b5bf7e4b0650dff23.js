webpackJsonp([5],{MpC5:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),r=a("exGp"),o=a.n(r),s=a("uzjF"),l=a("Dd8w"),c=a.n(l),u={name:"edit",data:function(){return{form:{name:""},rules:{name:{required:!0}}}},props:["editData","isNew"],methods:{saveAction:function(){this.isNew?this.$emit("save",this.form):this.$emit("modify",this.form)}},watch:{editData:function(t,e){if(this.form=c()({},this.form,t),this.isNew)for(var a in this.form)this.form[a]="";console.log(t,e)}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"edit"},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[a("el-form-item",{attrs:{label:"标签名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"标签名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{on:{click:function(e){t.$emit("cancel")}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){e.preventDefault(),t.saveAction(e)}}},[t._v("确认")])],1)],1)],1)},staticRenderFns:[]},f="/v1/tag/",m={name:"tag",components:{edit:a("VU/8")(u,d,!1,null,null,null).exports},created:function(){this.getTags()},data:function(){return{isNew:!0,editData:{},pageData:{},editDialog:!1,currentPage:1}},mixins:[s.a],methods:{pageChange:function(){},edit:function(t){var e=this;return o()(i.a.mark(function a(){var n;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(t),e.editDialog=!0,e.isNew=!1,a.next=5,e.axios.get(f+t);case 5:0===(n=a.sent).data.status&&(e.editData=n.data.data),console.log(n);case 8:case"end":return a.stop()}},a,e)}))()},remove:function(t){},save:function(t){var e=this;return o()(i.a.mark(function a(){var n;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log("save"),a.next=3,e.axios.post(f,t);case 3:n=a.sent,console.log(n),e.editDialog=!1,0===n.data.status&&e.getTags();case 7:case"end":return a.stop()}},a,e)}))()},modify:function(t){var e=this;return o()(i.a.mark(function a(){var n;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log("modify"),a.next=3,e.axios.put(f+t._id,t);case 3:n=a.sent,console.log(n),e.editDialog=!1,0===n.data.status&&e.getTags();case 7:case"end":return a.stop()}},a,e)}))()},dialogClose:function(){this.editData={},this.isNew=!0}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tag"},[a("div",{staticClass:"action"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.editDialog=!0}}},[t._v("新增标签")])],1),t._v(" "),a("el-table",{attrs:{data:t.tags}},[a("el-table-column",{attrs:{label:"名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{label:"文章数量",prop:"articleCount"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.edit(e.row._id)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.remove(e.row._id)}}},[t._v("删除")])],1)]}}])})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{total:t.pageData.total,"current-page":t.pageData.pageSize,"page-size":t.currentPage,layout:"prev, pager, next"},on:{"current-change":t.pageChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"新增",visible:t.editDialog},on:{"update:visible":function(e){t.editDialog=e},close:t.dialogClose}},[a("edit",{attrs:{editData:t.editData,isNew:t.isNew},on:{save:t.save,modify:t.modify,cancel:function(e){t.editDialog=!1}}})],1)],1)},staticRenderFns:[]},g=a("VU/8")(m,p,!1,null,null,null);e.default=g.exports},uzjF:function(t,e,a){"use strict";var n=a("Xxa5"),i=a.n(n),r=a("exGp"),o=a.n(r);e.a={data:function(){return{tags:[]}},methods:{getTags:function(){var t=this;return o()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/v1/tag");case 2:0===(a=e.sent).data.status&&(t.tags=a.data.data);case 4:case"end":return e.stop()}},e,t)}))()}}}}});
//# sourceMappingURL=5.ab6b5bf7e4b0650dff23.js.map