webpackJsonp([6],{"4/hc":function(t,e,a){"use strict";var n=a("Xxa5"),o=a.n(n),i=a("exGp"),s=a.n(i);e.a={data:function(){return{catalogs:[]}},methods:{getCatalogs:function(){var t=this;return s()(o.a.mark(function e(){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/v1/catalog");case 2:0===(a=e.sent).data.status&&(t.catalogs=a.data.data);case 4:case"end":return e.stop()}},e,t)}))()}}}},pXR6:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),o=a.n(n),i=a("exGp"),s=a.n(i),r=a("Dd8w"),l=a.n(r),c={name:"edit",data:function(){return{form:{name:"",des:""},rules:{name:{required:!0}}}},props:["editData","isNew"],methods:{saveAction:function(){this.isNew?this.$emit("save",this.form):this.$emit("modify",this.form)}},watch:{editData:function(t,e){if(this.form=l()({},this.form,t),this.isNew)for(var a in this.form)this.form[a]="";console.log(t,e)}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"edit"},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[a("el-form-item",{attrs:{label:"栏目名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"栏目名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"栏目描述",prop:"des"}},[a("el-input",{attrs:{placeholder:"栏目描述"},model:{value:t.form.des,callback:function(e){t.$set(t.form,"des",e)},expression:"form.des"}})],1),t._v(" "),a("el-form-item",[a("el-button",{on:{click:function(e){t.$emit("cancel")}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){e.preventDefault(),t.saveAction(e)}}},[t._v("确认")])],1)],1)],1)},staticRenderFns:[]},d="/v1/catalog/",f={name:"catalog",components:{edit:a("VU/8")(c,u,!1,null,null,null).exports},data:function(){return{editData:{},pageData:{},editDialog:!1,isNew:!0,currentPage:1}},created:function(){this.getCatalogs()},mixins:[a("4/hc").a],methods:{pageChange:function(){},edit:function(t){var e=this;return s()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(t),e.editDialog=!0,e.isNew=!1,a.next=5,e.axios.get(d+t);case 5:0===(n=a.sent).data.status&&(e.editData=n.data.data),console.log(n);case 8:case"end":return a.stop()}},a,e)}))()},remove:function(t){},save:function(t){var e=this;return s()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log("save"),a.next=3,e.axios.post(d,t);case 3:n=a.sent,console.log(n),e.editDialog=!1,0===n.data.status&&e.getCatalogs();case 7:case"end":return a.stop()}},a,e)}))()},modify:function(t){var e=this;return s()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log("modify"),a.next=3,e.axios.put(d+t._id,t);case 3:n=a.sent,console.log(n),e.editDialog=!1,0===n.data.status&&e.getCatalogs();case 7:case"end":return a.stop()}},a,e)}))()},dialogClose:function(){this.editData={},this.isNew=!0}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"catlog"},[a("div",{staticClass:"action"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.editDialog=!0}}},[t._v("新增目录")])],1),t._v(" "),a("el-table",{attrs:{data:t.catalogs}},[a("el-table-column",{attrs:{label:"名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{label:"描述",prop:"des"}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("datetime")(e.row.create_time)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"修改时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("datetime")(e.row.modify_time)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.edit(e.row._id)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.remove(e.row._id)}}},[t._v("删除")])],1)]}}])})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{total:t.pageData.total,"current-page":t.pageData.pageSize,"page-size":t.currentPage,layout:"prev, pager, next"},on:{"current-change":t.pageChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"新增",visible:t.editDialog},on:{"update:visible":function(e){t.editDialog=e},close:t.dialogClose}},[a("edit",{attrs:{isNew:t.isNew,editData:t.editData},on:{save:t.save,modify:t.modify,cancel:function(e){t.editDialog=!1}}})],1)],1)},staticRenderFns:[]},p=a("VU/8")(f,m,!1,null,null,null);e.default=p.exports}});
//# sourceMappingURL=6.630e5fc8079c9aa9ed7b.js.map