(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{382:function(t,e,n){var content=n(444);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("e8bc2500",content,!0,{sourceMap:!1})},443:function(t,e,n){"use strict";var l=n(382);n.n(l).a},444:function(t,e,n){(e=n(12)(!1)).push([t.i,".short-textfilds.v-text-field.v-text-field--enclosed .v-input__slot{padding:0!important;width:60px;margin:0 auto;border:1px solid #b4b4b4}.short-textfilds.v-text-field.v-text-field--enclosed .v-input__slot input{text-align:center}.short-textfilds.v-text-field.v-text-field--enclosed .v-input__slot .long-little{width:60px}.menuable__content__active .v-autocomplete__content{background:red}.v-autocomplete__content{border-radius:5px!important}.v-autocomplete__content::-webkit-scrollbar{width:5px}.v-autocomplete__content::-webkit-scrollbar-thumb{background-color:#a1a1a1;border-radius:10px}.v-autocomplete__content::-webkit-scrollbar-track{background:#fff;border-radius:10px}",""]),t.exports=e},532:function(t,e,n){"use strict";n.r(e);n(17);var l={data:function(){return{count:1,loading:!1,items:[],search:null,value:null,drug:[{name:"kkkk",type:"เม็ด"},{name:"www",type:"น้ำ"},{name:"kkss",type:"เม็ด"},{name:"kwkkk",type:"เม็ด"},{name:"wfww",type:"น้ำ"},{name:"kwkss",type:"เม็ด"},{name:"kkfkk",type:"เม็ด"},{name:"wwww",type:"น้ำ"},{name:"kfkss",type:"เม็ด"},{name:"kwkkk",type:"เม็ด"},{name:"wfww",type:"น้ำ"},{name:"kwkss",type:"เม็ด"}],assignModal:!1,addData:{nameList:"",type:"",num:"",price:"",instr:"",dose:"",freq:"",caution:""}}},watch:{search:function(t){t&&t!==this.value&&this.querySelections(t)},assignModal:function(){!1===this.assignModal&&(this.count=1)}},methods:{showModal:function(){null!=this.value&&(this.assignModal=!0,this.addData.nameList=this.value.name,this.addData.type=this.value.type)},querySelections:function(t){var e=this;this.loading=!0,setTimeout((function(){e.items=e.drug,e.loading=!1}),500)}}},o=(n(443),n(53)),c=n(99),r=n.n(c),d=n(445),v=n(143),m=n(353),f=n(343),h=n(519),x=n(434),_=n(376),k=n(138),X=n(54),w=n(520),y=n(430),D=n(388),C=n(422),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{color:"grey lighten-4",flat:"",tile:""}},[n("v-row",{staticClass:"second-nav cusblue1",attrs:{height:"55",align:"center",justify:"center",dense:"",flat:""}},[n("h1",{staticClass:"font-weight-medium col-sm-4 col-12"},[t._v("POS")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-subheader",{directives:[{name:"show",rawName:"v-show",value:!this.$vuetify.breakpoint.smAndDown,expression:"!this.$vuetify.breakpoint.smAndDown"}],staticClass:"cus-subhead"},[t._v("ค้นหารายการ :\n    ")]),t._v(" "),n("v-autocomplete",{staticClass:"rounded-lg cus-longfield",attrs:{"background-color":"cusblue3",items:t.items,"item-text":"name","item-value":"name","item-color":"cusblue2","search-input":t.search,loading:t.loading,"return-object":"",dark:"",filled:"",rounded:"","single-line":"",dense:"",flat:"","hide-details":"","hide-no-data":""},on:{"update:searchInput":function(e){t.search=e},"update:search-input":function(e){t.search=e},change:t.showModal,focus:function(e){t.value=null}},scopedSlots:t._u([{key:"append",fn:function(){return[n("v-icon",[t._v("mdi-magnify")])]},proxy:!0},{key:"selection",fn:function(data){return[n("span",[t._v(t._s(data.item.name))])]}},{key:"item",fn:function(data){return[[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(data.item.name)}})],1)]]}}]),model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),t._v(" "),n("v-text-field",{staticClass:"ml-2 rounded-lg text-navs",staticStyle:{"max-width":"100px"},attrs:{"prepend-icon":"mdi-close","background-color":"cusblue3",dark:"",filled:"",rounded:"","single-line":"",dense:"",flat:"","hide-details":""},model:{value:t.count,callback:function(e){t.count=e},expression:"count"}})],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"600",scrollable:""},model:{value:t.assignModal,callback:function(e){t.assignModal=e},expression:"assignModal"}},[n("v-card",[n("h2",{staticClass:"pa-5 pb-2"},[t._v("เพิ่มรายการ")]),t._v(" "),n("v-divider"),t._v(" "),n("div",{staticClass:"pa-8"},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{attrs:{cols:"6"}},[t._v("รายการ : "+t._s(t.addData.nameList))]),t._v(" "),n("v-col",{attrs:{cols:"6"}},[t._v("ประเภท : "+t._s(t.addData.type))]),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{attrs:{cols:"3"}},[n("span",[t._v("จำนวน")])]),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{staticClass:"short-textfilds",attrs:{solo:"",dense:"","hide-details":"",flat:""},model:{value:t.addData.num,callback:function(e){t.$set(t.addData,"num",e)},expression:"addData.num"}})],1),t._v(" "),n("v-col",{attrs:{cols:"3"}},[n("span",[t._v("เม็ด")])])],1)],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-row",{attrs:{align:"center",justify:"center","no-gutters":""}},[n("v-col",{attrs:{cols:"5"}},[n("span",[t._v("ราคาต่อหน่วย")])]),t._v(" "),n("v-col",{attrs:{cols:"5"}},[n("v-text-field",{staticClass:"short-textfilds",attrs:{solo:"",dense:"","hide-details":"",flat:""},model:{value:t.addData.num,callback:function(e){t.$set(t.addData,"num",e)},expression:"addData.num"}})],1),t._v(" "),n("v-col",{attrs:{cols:"2"}},[n("span",[t._v("บาท")])])],1)],1)],1),t._v(" "),n("v-row",[n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{label:"Instruction",color:"cusblue2"},model:{value:t.addData.instr,callback:function(e){t.$set(t.addData,"instr",e)},expression:"addData.instr"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{label:"Dose",color:"cusblue2"},model:{value:t.addData.dose,callback:function(e){t.$set(t.addData,"dose",e)},expression:"addData.dose"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{label:"Frequency",color:"cusblue2"},model:{value:t.addData.freq,callback:function(e){t.$set(t.addData,"freq",e)},expression:"addData.freq"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{label:"Caution",color:"cusblue2"},model:{value:t.addData.caution,callback:function(e){t.$set(t.addData,"caution",e)},expression:"addData.caution"}})],1)],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:function(e){t.assignModal=!1}}},[t._v("ยกเลิก")]),t._v(" "),n("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:function(e){t.assignModal=!1}}},[t._v("บันทึก")])],1)],1)],1)],1)}),[],!1,null,null,null),V=component.exports;r()(component,{VAutocomplete:d.a,VBtn:v.a,VCard:m.a,VCardActions:f.a,VCol:h.a,VDialog:x.a,VDivider:_.a,VIcon:k.a,VListItemContent:X.a,VListItemTitle:X.c,VRow:w.a,VSpacer:y.a,VSubheader:D.a,VTextField:C.a});var $={data:function(){return{confirmDel:!1,checkout:!1,headers:[{text:"ลำดับ",value:"id",align:"center",width:"150",sortable:!1,class:"font-weight-bold"},{text:"ชื่อรายการ",value:"nameList",align:"left",width:"400",sortable:!1},{text:"ประเภท",value:"type",align:"center",width:"",sortable:!1},{text:"จำนวน",value:"num",align:"center",width:"",sortable:!1},{text:"ราคา / หน่วย",value:"price",align:"center",width:"",sortable:!1},{text:"Action",value:"action",align:"center",width:"",sortable:!1}],headersDialog:[{text:"ลำดับ",align:"center",sortable:!1,value:"id",class:"font-weight-bold"},{text:"ชื่อรายการ",value:"nameList",sortable:!1},{text:"ประเภท",value:"type",sortable:!1},{text:"ราคา / หน่วย",value:"price",align:"center",sortable:!1},{text:"Action",value:"action",align:"center",sortable:!1}],desserts:[{id:"1",nameList:"XXXXXXXXXXXXXXXX",type:"ยา",num:"10",price:"50"},{id:"2",nameList:"XXXXXXXXXXXXXXXX",type:"ยา",num:"10",price:"50"},{id:"3",nameList:"XXXXXXXXXXXXXXXX",type:"ยา",num:"10",price:"50"},{id:"4",nameList:"XXXXXXXXXXXXXXXX",type:"ยา",num:"10",price:"50"},{id:"5",nameList:"XXXXXXXXXXXXXXXX",type:"ยา",num:"10",price:"50"}]}}},S=n(424),L=n(536),M=n(474),j=Object(o.a)($,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-data-table",{staticClass:"elevation-4 overflow-y-auto",attrs:{headers:t.headers,items:t.desserts,"disable-pagination":"","hide-default-footer":"",height:"calc(100vh - 210px)","fixed-header":""},scopedSlots:t._u([{key:"item.num",fn:function(e){return[n("v-edit-dialog",{attrs:{"return-value":e.item.num},on:{"update:returnValue":function(n){return t.$set(e.item,"num",n)},"update:return-value":function(n){return t.$set(e.item,"num",n)}},scopedSlots:t._u([{key:"input",fn:function(){return[n("v-text-field",{attrs:{label:"Edit","single-line":"",counter:""},model:{value:e.item.num,callback:function(n){t.$set(e.item,"num",n)},expression:"props.item.num"}})]},proxy:!0}],null,!0)},[n("span",{staticClass:"cusblue--text"},[t._v("\n          "+t._s(e.item.num)+"\n        ")])])]}},{key:"item.price",fn:function(e){return[n("v-edit-dialog",{attrs:{"return-value":e.item.price},on:{"update:returnValue":function(n){return t.$set(e.item,"price",n)},"update:return-value":function(n){return t.$set(e.item,"price",n)}},scopedSlots:t._u([{key:"input",fn:function(){return[n("v-text-field",{attrs:{label:"Edit","single-line":"",counter:""},model:{value:e.item.price,callback:function(n){t.$set(e.item,"price",n)},expression:"props.item.price"}})]},proxy:!0}],null,!0)},[n("span",{staticClass:"cusblue--text"},[t._v("\n          "+t._s(e.item.price)+"\n        ")])])]}},{key:"item.action",fn:function(){return[n("v-btn",{attrs:{icon:"",depressed:""},on:{click:function(e){t.confirmDel=!0}}},[n("v-icon",[t._v("mdi-trash-can")])],1)]},proxy:!0},{key:"footer",fn:function(){return[n("div",{staticClass:"pa-2 text-right",staticStyle:{"border-top":"1px solid #dadada"}},[n("span",{staticClass:"font-weight-medium"},[t._v("ยอดรวมชำระ :")]),t._v(" "),n("span",[t._v("x,xxx บาท")]),t._v(" "),n("v-btn",{staticClass:"ml-5",attrs:{color:"cusblue3",dark:"",depressed:""},on:{click:function(e){e.stopPropagation(),t.checkout=!0}}},[t._v("รับชำระ")]),t._v(" "),n("v-dialog",{attrs:{"max-width":"700"},model:{value:t.checkout,callback:function(e){t.checkout=e},expression:"checkout"}},[n("v-card",[n("v-data-table",{staticClass:"elevation-0 overflow-y-auto",staticStyle:{"max-height":"550px"},attrs:{headers:t.headersDialog,items:t.desserts,"disable-pagination":"","hide-default-footer":""},scopedSlots:t._u([{key:"item.action",fn:function(){return[n("v-checkbox",{staticClass:"pl-10",attrs:{height:"0",color:"green","on-icon":"mdi-check-circle","off-icon":"mdi-check-circle-outline"}})]},proxy:!0}],null,!0)}),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:function(e){t.checkout=!1}}},[t._v("ยกเลิก")]),t._v(" "),n("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:function(e){t.checkout=!1}}},[t._v("ตกลง")])],1)],1)],1)],1)]},proxy:!0}],null,!0)}),t._v(" "),n("v-dialog",{attrs:{"max-width":"290"},model:{value:t.confirmDel,callback:function(e){t.confirmDel=e},expression:"confirmDel"}},[n("v-card",[n("h2",{staticClass:"pl-6 pt-3 pb-2"},[t._v("คุณแน่ใจหรือไม่?")]),t._v(" "),n("v-card-text",[t._v(" คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้ ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"red",text:""},on:{click:function(e){t.confirmDel=!1}}},[t._v(" ลบ ")]),t._v(" "),n("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.confirmDel=!1}}},[t._v(" ยกเลิก ")])],1)],1)],1)],1)}),[],!1,null,null,null),T=j.exports;r()(j,{VBtn:v.a,VCard:m.a,VCardActions:f.a,VCardText:f.c,VCheckbox:S.a,VDataTable:L.a,VDialog:x.a,VEditDialog:M.a,VIcon:k.a,VSpacer:y.a,VTextField:C.a});var A={components:{posNav:V,posTable:T}},E=Object(o.a)(A,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("posNav"),this._v(" "),e("div",{staticClass:"custom-container"},[e("posTable")],1)],1)}),[],!1,null,null,null);e.default=E.exports}}]);