(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{375:function(t,e,n){"use strict";n(4);var o={data:function(){return{dialog:!1,resolve:null,reject:null,message:null,title:null,options:{color:"primary",width:290,zIndex:200}}},computed:{show:{get:function(){return this.dialog},set:function(t){this.dialog=t,!1===t&&this.cancel()}}},methods:{open:function(title,t,e){var n=this;return this.dialog=!0,this.title=title,this.message=t,this.options=Object.assign(this.options,e),new Promise((function(t,e){n.resolve=t,n.reject=e}))},agree:function(){this.resolve(!0),this.dialog=!1},cancel:function(){this.reject(!0),this.dialog=!1}}},l=n(55),r=n(74),c=n.n(r),d=n(155),m=n(354),v=n(351),f=n(490),h=n(368),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{style:{zIndex:t.options.zIndex},attrs:{"max-width":t.options.width},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.cancel(e)}},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("v-card",[n("h2",{staticClass:"pl-6 pt-3 pb-2"},[t._v(t._s(t.title))]),t._v(" "),n("v-card-text",{directives:[{name:"show",rawName:"v-show",value:!!t.message,expression:"!!message"}]},[t._v(" "+t._s(t.message)+" ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:t.options.color,text:""},nativeOn:{click:function(e){return t.agree(e)}}},[t._v(" ใช่ ")]),t._v(" "),n("v-btn",{attrs:{color:"grey",text:""},nativeOn:{click:function(e){return t.cancel(e)}}},[t._v(" ไม่ ")])],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;c()(component,{VBtn:d.a,VCard:m.a,VCardActions:v.a,VCardText:v.c,VDialog:f.a,VSpacer:h.a})},419:function(t,e,n){"use strict";var o={data:function(){return{tab:null,lists:[{title:"ระบบ",list:[{name:"สถานพยาบาล",link:"/setting/hospital"},{name:"ผู้ใช้งาน",link:"/setting/users"}]},{title:"ตัวช่วย",list:[{name:"Chief Complaint",link:"/setting/Chief-Complaint"},{name:"Differencial Diagnosis",link:"/setting/Differential-Diagnosis"},{name:"History Ranking",link:"/setting/History-Ranking"},{name:"Physical Examination",link:"/setting/Physical-Examination"}]},{title:"รายการตรวจ",list:[{name:"รายการตรวจ",link:"/setting/check"}]}]}},created:function(){var path=this.$nuxt.$route.path;this.tab="/setting/Chief-Complaint"===path||"/setting/Differential-Diagnosis"===path||"/setting/History-Ranking"===path||"/setting/Physical-Examination"===path?1:"/setting/check"===path?2:0}},l=n(55),r=n(74),c=n.n(r),d=n(354),m=n(351),v=n(424),f=n(158),h=n(159),x=n(99),k=n(108),_=n(369),D=n(454),y=n(370),C=n(217),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[this.$vuetify.breakpoint.smAndUp?n("div",t._l(t.lists,(function(e){return n("v-card",{key:e.index,staticClass:"mb-3 elevation-4"},[n("v-card-title",{staticClass:"pa-0 pl-5 pt-3"},[t._v(t._s(e.title))]),t._v(" "),n("v-divider"),t._v(" "),n("v-list",{staticClass:"pa-0",attrs:{dense:""}},t._l(e.list,(function(e){return n("v-list-item",{key:e.index,attrs:{link:"",to:e.link}},[n("v-icon",{staticClass:"mr-3",attrs:{color:"cusblue3","x-small":""}},[t._v("mdi-record")]),t._v(" "),n("v-list-item-content",[t._v("\n            "+t._s(e.name)+"\n          ")])],1)})),1)],1)})),1):n("div",[n("v-card",{staticClass:"mb-3 elevation-4"},[n("v-tabs",{attrs:{color:"cusblue3"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.lists,(function(e){return n("v-tab",{key:e.title},[t._v("\n          "+t._s(e.title)+"\n        ")])})),1),t._v(" "),n("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.lists,(function(e){return n("v-tab-item",{key:e.title},[n("v-card",{attrs:{flat:""}},[n("v-list",{staticClass:"pa-0",attrs:{dense:""}},t._l(e.list,(function(e){return n("v-list-item",{key:e.index,attrs:{link:"",to:e.link}},[n("v-icon",{staticClass:"mr-3",attrs:{color:"cusblue3","x-small":""}},[t._v("mdi-record")]),t._v(" "),n("v-list-item-content",[t._v("\n                  "+t._s(e.name)+"\n                ")])],1)})),1)],1)],1)})),1)],1)],1)])}),[],!1,null,null,null);e.a=component.exports;c()(component,{VCard:d.a,VCardTitle:m.d,VDivider:v.a,VIcon:f.a,VList:h.a,VListItem:x.a,VListItemContent:k.a,VTab:_.a,VTabItem:D.a,VTabs:y.a,VTabsItems:C.a})},422:function(t,e,n){"use strict";var o=n(55),l=n(74),r=n.n(l),c=n(364),d=n(366),component=Object(o.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("v-row",{staticClass:"cusblue1 px-10",attrs:{align:"center",justify:"center",dense:""}},[e("v-col",{attrs:{cols:"12"}},[e("h1",{staticClass:"font-weight-medium"},[this._v("ตั้งค่า")])])],1)}),[],!1,null,null,null);e.a=component.exports;r()(component,{VCol:c.a,VRow:d.a})},575:function(t,e,n){"use strict";n.r(e);n(132),n(43);var o=n(10),l=n(422),r=n(419),c=(n(224),n(28),n(30),{components:{confirmDialog:n(375).a},props:{items:{type:Array,required:!1,default:null}},data:function(){return{confirmDel:!1,newItemDialog:!1,type:this.$store.state.form.itemGroup,select:null,search:""}},computed:{filterItem:function(){var t=this;return this.items.filter((function(e){return null!==t.select?e.label.toLowerCase().includes(t.search.toLowerCase())&&e.itemGroup.id===t.select||e.code.toLowerCase().includes(t.search.toLowerCase())&&e.itemGroup.id===t.select:e.label.toLowerCase().includes(t.search.toLowerCase())||e.code.toLowerCase().includes(t.search.toLowerCase())}))}},mounted:function(){var t=this;0===this.$store.state.form.itemGroup.length&&this.$store.dispatch("form/addItemGroup").then((function(e){t.type=e}))},methods:{editItem:function(t){this.$emit("edit",t)},delItem:function(t){var e=this;this.$refs.confirm.open("คุณแน่ใจหรือไม่?","คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้",{width:290,color:"red"}).then((function(n){e.$emit("delete",t)})).catch((function(){}))}}}),d=n(55),m=n(74),v=n.n(m),f=n(155),h=n(354),x=n(351),k=n(364),_=n(424),D=n(158),y=n(99),C=n(160),$=n(108),w=n(366),I=n(376),S=n(421),V=n(497),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h3",{staticClass:"pl-5 pt-3 font-weight-medium"},[t._v("รายการตรวจ")]),t._v(" "),n("v-divider",{staticClass:"darker-divider"}),t._v(" "),n("v-row",{staticClass:"pt-3",attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12"}},[n("v-card",{staticClass:"elevation-4",attrs:{height:"540"}},[n("div",{staticClass:"px-7 py-5"},[n("v-row",{attrs:{dense:""}},[n("v-col",{attrs:{cols:"2"}},[n("v-select",{staticClass:"rounded-lg",attrs:{items:t.type,"item-text":"label","item-value":"id","item-color":"cusblue","menu-props":{closeOnContentClick:!0},label:"ประเภท",color:"cusblue",light:"",outlined:"",rounded:"",dense:"",flat:"","hide-details":""},scopedSlots:t._u([{key:"prepend-item",fn:function(){return[n("v-list-item",{style:null===t.select?"background-color: #e2f5fc":"",attrs:{ripple:""},on:{click:function(e){t.select=null}}},[n("v-list-item-content",[n("v-list-item-title",{class:null===t.select?"cusblue--text":""},[t._v("\n                        ทั้งหมด\n                      ")])],1)],1),t._v(" "),n("v-divider",{staticClass:"mt-2"})]},proxy:!0}]),model:{value:t.select,callback:function(e){t.select=e},expression:"select"}})],1),t._v(" "),n("v-col",{attrs:{cols:"10"}},[n("v-text-field",{staticClass:"rounded-lg",attrs:{color:"cusblue",label:"ค้นหา","append-icon":"mdi-magnify",outlined:"","single-line":"",dense:"",flat:"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1),t._v(" "),n("div",{staticClass:"px-7 py-5"},[n("v-card-title",{staticClass:"pa-0 px-3 py-1"},[t._v(" ชื่อ/ประเภท ")]),t._v(" "),n("v-divider"),t._v(" "),n("v-virtual-scroll",{attrs:{items:t.filterItem,"item-height":50,height:"400  "},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.item;return[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[t._v("\n                    "+t._s(o.label)+"\n                    "),n("span",{staticClass:"text--secondary"},[t._v("("+t._s(o.code)+")")]),t._v(" "),null===t.select?n("span",{staticClass:"text--secondary"},[t._v("\n                      - "+t._s(o.itemGroup.label)+"\n                    ")]):t._e()])],1),t._v(" "),n("v-list-item-action",[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"6"}},[n("v-btn",{staticClass:"mr-1",attrs:{icon:"","x-small":""},on:{click:function(e){return t.editItem(o.id)}}},[n("v-icon",{attrs:{color:"black"}},[t._v("mdi-pencil")])],1)],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-btn",{staticClass:"ml-1",attrs:{icon:"","x-small":""},on:{click:function(e){return t.delItem(o.id)}}},[n("v-icon",{attrs:{color:"black"}},[t._v("mdi-trash-can")])],1)],1)],1)],1)],1)]}}])})],1)])],1)],1),t._v(" "),n("confirmDialog",{ref:"confirm"})],1)}),[],!1,null,null,null),T=component.exports;v()(component,{VBtn:f.a,VCard:h.a,VCardTitle:x.d,VCol:k.a,VDivider:_.a,VIcon:D.a,VListItem:y.a,VListItemAction:C.a,VListItemContent:$.a,VListItemTitle:$.b,VRow:w.a,VSelect:I.a,VTextField:S.a,VVirtualScroll:V.a});n(11),n(7),n(6),n(4),n(8),n(22);var L=n(2);function G(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function M(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?G(Object(source),!0).forEach((function(e){Object(L.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):G(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O={props:{itemList:{default:null,type:Array,required:!1}},data:function(){var t=this;return{assignModal:!1,type:this.$store.state.form.itemGroup,groupLab:this.$store.state.form.labGroup,LabResult:[{label:"ข้อความ",value:"text"},{label:"ตัวเลข",value:"numeric"}],res:null,loading:!1,loading1:!1,timeout:null,search:null,value:"",items:[],subLab:[],disableFirst:!1,disableSecond:!0,editing:!1,changeToCreate:!1,valid:!1,valid1:!1,itemData:{id:"",code:"",name:"",itemGroup:1,cost:"",price:"",isSet:!1},checkData:{instruction:"",dose:"",unit:"",frequency:"",caution:"",remark:"",groupId:"",resultType:"text",normalStr:"",normalMin:"",normalMax:"",labUnit:""},rules:{code:[function(t){return!!t||"กรุณากรอกโค้ด"},function(t){return t&&t.length<=50||"ไม่ควรกรอกชื่อเกิน 50 ตัวอักษร"},function(e){return e&&t.checkDuplicate(e)||"โค้ดถูกใช้งานแล้ว"}],name:[function(t){return!!t||"กรุณากรอกข้อความ"},function(t){return t&&t.length<=50||"ไม่ควรกรอกข้อความเกิน 50 ตัวอักษร"}],itemGroup:[function(t){return!!t||"กรุณาเลือกประเภท"}],cost:[function(t){return t&&/^[0-9]*$/.test(t)||"กรุณากรอกตัวเลขเท่านั้น"}],price:[function(t){return t&&/^[0-9]*$/.test(t)||"กรุณากรอกตัวเลขเท่านั้น"}]},rules1:{instruction:[function(t){return!!t||"กรุณากรอกคำแนะนำ"},function(t){return t&&t.length<=100||"ไม่ควรกรอกคำแนะนำเกิน 100 ตัวอักษร"}],dose:[function(t){return t&&/^[0-9]*$/.test(t)||"กรุณากรอกตัวเลขเท่านั้น"}],unit:[function(t){return!!t||"กรุณากรอกหน่วย"},function(t){return t&&t.length<=100||"ไม่ควรกรอกหน่วยเกิน 100 ตัวอักษร"}],frequency:[function(t){return!!t||"กรุณากรอกความถี่"},function(t){return t&&t.length<=100||"ไม่ควรกรอกความถี่เกิน 100 ตัวอักษร"}],caution:[function(t){return!!t||"กรุณากรอกข้อควรระวัง"},function(t){return t&&t.length<=100||"ไม่ควรกรอกความถี่เกิน 100 ตัวอักษร"}],groupId:[function(t){return!!t||"กรุณาเลือกกลุ่ม"}],resultType:[function(t){return!!t||"กรุณาเลือกประเภท"}],normalStr:[function(t){return!!t||"กรุณากรอกค่าปกติ"},function(t){return t&&t.length<=100||"ไม่ควรกรอกค่าปกติ 100 ตัวอักษร"}],normalMin:[function(t){return t&&/^[0-9.]*$/.test(t)||"กรุณากรอกตัวเลขหรือทศนิยมเท่านั้น"}],normalMax:[function(t){return t&&/^[0-9.]*$/.test(t)||"กรุณากรอกตัวเลขหรือทศนิยมเท่านั้น"}],labUnit:[function(t){return!!t||"กรุณากรอกหน่วย"},function(t){return t&&t.length<=100||"ไม่ควรกรอกหน่วยเกิน 100 ตัวอักษร"}]}}},watch:{search:function(t){""!==t?t&&t!==this.value&&this.querySelections(t):this.items=[]},assignModal:function(t){!1===t&&this.newItem()}},mounted:function(){var t=this;0===this.$store.state.form.itemGroup.length&&this.$store.dispatch("form/addItemGroup").then((function(e){t.type=e})),0===this.$store.state.form.labGroup.length&&this.$store.dispatch("form/addlabGroup").then((function(e){t.groupLab=e}))},methods:{open:function(t){var e=this;if(void 0!==t){var n=this.itemList.findIndex((function(e){return e.id===t})),o=M({},this.itemList[n]);this.itemData={id:o.id,code:o.code,name:o.label,itemGroup:o.itemGroup.id,cost:o.cost,price:o.price,isSet:o.isSet},this.disableSecond=!1,this.editing=!0,1===o.itemGroup.id?this.$axios.$get("/api/config/items/".concat(o.id,"/drugs"),{progress:!1}).then((function(t){e.checkData={instruction:t.instruction,dose:t.dose,unit:t.unit,frequency:t.frequency,caution:t.caution,remark:t.remark,groupId:"",resultType:"text",normalStr:"",normalMin:"",normalMax:"",labUnit:""},e.changeToCreate=!1})).catch((function(t){e.changeToCreate=!0,console.log(t)})):3===o.itemGroup.id&&!1===o.isSet?this.$axios.$get("/api/config/items/".concat(o.id,"/labs"),{progress:!1}).then((function(t){e.checkData={instruction:"",dose:"",unit:"",frequency:"",caution:"",remark:"",groupId:t.groupId,resultType:t.resultType,normalStr:t.normalStr,normalMin:t.normalMin,normalMax:t.normalMax,labUnit:t.unit},e.changeToCreate=!1})).catch((function(){e.changeToCreate=!0})):3===o.itemGroup.id&&!0===o.isSet&&(this.res={id:o.id},this.$axios.$get("/api/config/items/".concat(o.id,"/set"),{progress:!1}).then((function(t){e.subLab=t})).catch((function(t){alert(t)})))}this.assignModal=!0},checkDuplicate:function(t){var e=this;return""===this.itemData.id?!this.itemList.some((function(e){return e.code.toLowerCase()===t.toLowerCase()})):!this.itemList.some((function(n){return n.code.toLowerCase()===t.toLowerCase()&&n.code!==e.itemData.code}))},querySelections:function(t){var e=this;clearTimeout(this.timeout),this.timeout=setTimeout((function(){e.$axios.$get("/api/config/items?itemGroupId=3&isSet=false&label=".concat(t),{progress:!1}).then((function(t){e.items=t.results})).catch((function(t){alert(t)}))}),500)},fristSubmit:function(){var t=this;if(this.$refs.form.validate()){this.loading=!0;var e=M({},this.itemData),n={code:e.code,label:e.name,cost:e.cost,price:e.price,isSet:e.isSet,itemGroupId:e.itemGroup};this.$axios.$post("/api/config/items",n,{progress:!1}).then((function(n){setTimeout((function(){t.loading=!1,t.$emit("add",n),1===e.itemGroup||3===e.itemGroup?(t.disableFirst=!0,t.disableSecond=!1,t.res=n):t.assignModal=!1}),500)})).catch((function(e){t.loading=!1,alert(e)}))}},submitData:function(){var t=this;if(this.$refs.form1.validate()){this.loading1=!0;var data=M({},this.checkData),e=this.changeToCreate?{id:this.itemData.id,itemGroupId:this.itemData.itemGroup,isSet:this.itemData.isSet}:this.res;if(console.log(e),1===e.itemGroupId){var n={unit:data.unit,dose:data.dose,caution:data.caution,frequency:data.frequency,instruction:data.instruction};this.$axios.$post("/api/config/items/".concat(e.id,"/drugs"),n,{progress:!1}).then((function(){setTimeout((function(){t.loading1=!1,t.assignModal=!1}),500)})).catch((function(e){t.loading1=!1,alert(e)}))}else if(3===e.itemGroupId&&!1===e.isSet){var o="numeric"===data.resultType?{groupId:data.groupId,resultType:data.resultType,normalMin:data.normalMin,normalMax:data.normalMax,unit:data.labUnit}:{groupId:data.groupId,resultType:data.resultType,normalStr:data.normalStr,unit:data.labUnit};this.$axios.$post("/api/config/items/".concat(e.id,"/labs"),o,{progress:!1}).then((function(){setTimeout((function(){t.loading1=!1,t.assignModal=!1}),500)})).catch((function(e){t.loading1=!1,alert(e)}))}}},updateFirst:function(){var t=this;if(this.$refs.form.validate()){this.loading=!0;var e=M({},this.itemData),n={code:e.code,label:e.name,cost:e.cost,price:e.price,isSet:e.isSet,itemGroupId:e.itemGroup};this.$axios.$put("/api/config/items/".concat(e.id),n,{progress:!1}).then((function(n){setTimeout((function(){t.loading=!1,t.$emit("add",e.id)}),500)})).catch((function(e){t.loading=!1,alert(e)}))}},updateData:function(){var t=this;if(this.$refs.form1.validate()){this.loading1=!0;var data=M({},this.checkData),e=this.itemData;if(console.log(this.changeToCreate),1===e.itemGroup){var n={unit:data.unit,dose:data.dose,caution:data.caution,frequency:data.frequency,instruction:data.instruction};this.$axios.$put("/api/config/items/".concat(e.id,"/drugs"),n,{progress:!1}).then((function(){setTimeout((function(){t.loading1=!1,t.assignModal=!1}),500)})).catch((function(e){t.loading1=!1,alert(e)}))}else if(3===e.itemGroup&&!1===e.isSet){var o="numeric"===data.resultType?{groupId:data.groupId,resultType:data.resultType,normalMin:data.normalMin,normalMax:data.normalMax,unit:data.labUnit}:{groupId:data.groupId,resultType:data.resultType,normalStr:data.normalStr,unit:data.labUnit};this.$axios.$put("/api/config/items/".concat(e.id,"/labs"),o,{progress:!1}).then((function(){setTimeout((function(){t.loading1=!1,t.assignModal=!1}),500)})).catch((function(e){t.loading1=!1,alert(e)}))}}},addSubList:function(){var t=this;null!=this.value&&this.$axios.$post("/api/config/items/".concat(this.res.id,"/set/").concat(this.value.id),{progress:!1}).then((function(){t.subLab.push(t.value),t.value=""})).catch((function(t){alert(t)}))},delSubLab:function(t){var e=this;this.$axios.$delete("/api/config/items/".concat(this.res.id,"/set/").concat(t),{progress:!1}).then((function(){var n=e.subLab.findIndex((function(e){return e.id===t}));e.subLab.splice(n,1)})).catch((function(t){alert(t)}))},newItem:function(){this.itemData={id:"",code:"",name:"",itemGroup:1,cost:"",price:"",isSet:!1},this.checkData={instruction:"",dose:"",unit:"",frequency:"",caution:"",remark:"",groupId:"",resultType:"text",normalStr:"",normalMin:"",normalMax:"",labUnit:""},this.res=null,this.subLab=[],this.disableFirst=!1,this.disableSecond=!0,this.editing=!1,this.$refs.form.resetValidation(),void 0!==this.$refs.form1&&this.$refs.form1.resetValidation()}}},j=n(445),P=n(460),U=n(490),E=n(406),R=n(156),A=n(368),F=Object(d.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-dialog",{attrs:{"max-width":"700",scrollable:""},model:{value:t.assignModal,callback:function(e){t.assignModal=e},expression:"assignModal"}},[n("v-card",[n("h2",{staticClass:"pa-5 pb-2"},[t._v(t._s(""!==t.itemData.id?"แก้ไข":"เพิ่ม"))]),t._v(" "),n("v-divider",{staticClass:"darker-divider"}),t._v(" "),n("v-card-text",{staticClass:"pa-0"},[n("v-form",{ref:"form",attrs:{"lazy-validation":"",autocomplete:"off"},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-card",{staticClass:"elevation-0 px-7 py-2",attrs:{disabled:t.disableFirst}},[n("v-row",{attrs:{dense:""}},[n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading,rules:t.rules.code,color:"cusblue",label:"รหัส"},model:{value:t.itemData.code,callback:function(e){t.$set(t.itemData,"code",e)},expression:"itemData.code"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading,rules:t.rules.name,color:"cusblue",label:"ชื่อ"},model:{value:t.itemData.name,callback:function(e){t.$set(t.itemData,"name",e)},expression:"itemData.name"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-select",{attrs:{rules:t.rules.itemGroup,disabled:t.editing||t.loading,color:"cusblue",items:t.type,"item-text":"label","item-value":"id","item-color":"cusblue","menu-props":{closeOnContentClick:!0},label:"ประเภท"},model:{value:t.itemData.itemGroup,callback:function(e){t.$set(t.itemData,"itemGroup",e)},expression:"itemData.itemGroup"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-checkbox",{attrs:{disabled:t.editing||t.loading,label:"Lab ชุด",color:"cusblue2"},model:{value:t.itemData.isSet,callback:function(e){t.$set(t.itemData,"isSet",e)},expression:"itemData.isSet"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading,rules:t.rules.cost,color:"cusblue",label:"ราคาทุน",dense:""},model:{value:t.itemData.cost,callback:function(e){t.$set(t.itemData,"cost",e)},expression:"itemData.cost"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading,rules:t.rules.price,color:"cusblue",label:"ราคาขาย",dense:""},model:{value:t.itemData.price,callback:function(e){t.$set(t.itemData,"price",e)},expression:"itemData.price"}})],1)],1),t._v(" "),n("v-btn",{staticClass:"cusblue2--text text-none my-1",attrs:{disabled:!t.valid||t.loading,outlined:"",block:""},on:{click:function(e){e.stopPropagation(),""!==t.itemData.id?t.updateFirst():t.fristSubmit()}}},[n("v-progress-circular",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"mr-2",attrs:{indeterminate:"",color:"cusblue2",size:15,width:2}}),t._v("\n              "+t._s(""!==t.itemData.id?"Save":"Add")+"\n            ")],1)],1)],1),t._v(" "),1===t.itemData.itemGroup||3===t.itemData.itemGroup?n("v-form",{ref:"form1",attrs:{"lazy-validation":"",autocomplete:"off"},model:{value:t.valid1,callback:function(e){t.valid1=e},expression:"valid1"}},[n("v-divider",{staticClass:"dash-divider"}),t._v(" "),n("v-card",{staticClass:"elevation-0 px-7 py-2",attrs:{disabled:t.disableSecond}},[1===t.itemData.itemGroup?n("v-row",{attrs:{dense:""}},[n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.instruction,color:"cusblue",label:"Instruction"},model:{value:t.checkData.instruction,callback:function(e){t.$set(t.checkData,"instruction",e)},expression:"checkData.instruction"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.dose,color:"cusblue",label:"Dose"},model:{value:t.checkData.dose,callback:function(e){t.$set(t.checkData,"dose",e)},expression:"checkData.dose"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.unit,color:"cusblue",label:"Unit"},model:{value:t.checkData.unit,callback:function(e){t.$set(t.checkData,"unit",e)},expression:"checkData.unit"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.frequency,color:"cusblue",label:"Frequency"},model:{value:t.checkData.frequency,callback:function(e){t.$set(t.checkData,"frequency",e)},expression:"checkData.frequency"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.caution,color:"cusblue",label:"Caution"},model:{value:t.checkData.caution,callback:function(e){t.$set(t.checkData,"caution",e)},expression:"checkData.caution"}})],1)],1):3===t.itemData.itemGroup?n("div",[!0===t.itemData.isSet?n("div",[n("v-autocomplete",{staticClass:"rounded-lg",attrs:{color:"cusblue",items:t.items,"item-text":"label","item-value":"id","item-color":"cusblue",label:"ค้นหา Labs","append-icon":"mdi-magnify","search-input":t.search,"return-object":"",light:"",outlined:"",dense:"","hide-details":"","hide-no-data":""},on:{"update:searchInput":function(e){t.search=e},"update:search-input":function(e){t.search=e},change:t.addSubList,focus:function(e){t.value=null}},scopedSlots:t._u([{key:"append",fn:function(){return[n("v-icon",[t._v("mdi-magnify")])]},proxy:!0},{key:"selection",fn:function(data){return[n("span",[t._v(t._s(data.item.label))])]}},{key:"item",fn:function(data){return[[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(data.item.label)}})],1)]]}}],null,!1,1799366628),model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),t._v(" "),n("v-card",{staticClass:"pa-5 my-2",attrs:{height:"250"}},[n("span",{staticClass:"font-weight-medium"},[t._v("รายการ Lab ย่อย")]),t._v(" "),n("span",{staticClass:"font-weight-medium float-right"},[t._v("Action")]),t._v(" "),n("br"),t._v(" "),n("v-divider",{staticClass:"medium-divider"}),t._v(" "),0!==t.subLab.length?n("div",t._l(t.subLab,(function(e){return n("div",{key:e.index,staticClass:"mt-3"},[n("span",[t._v(t._s(e.label))]),t._v(" "),n("v-btn",{staticClass:"float-right mr-1 mt-n2",attrs:{color:"red",dark:"",icon:"",depressed:""},on:{click:function(n){return t.delSubLab(e.id)}}},[n("v-icon",[t._v("mdi-close-circle")])],1),t._v(" "),n("v-divider")],1)})),0):n("div",{staticClass:"text-center pa-5 text--secondary"},[t._v("\n                    No data\n                  ")])],1)],1):!1===t.itemData.isSet?n("div",[n("v-select",{staticClass:"rounded-lg",attrs:{disabled:t.loading1,rules:t.rules1.groupId,color:"cusblue",items:t.groupLab,"item-text":"label","item-value":"id","item-color":"cusblue",label:"กลุ่ม Lab",dense:"",outlined:""},model:{value:t.checkData.groupId,callback:function(e){t.$set(t.checkData,"groupId",e)},expression:"checkData.groupId"}}),t._v(" "),n("v-row",{attrs:{dense:""}},[n("v-col",{attrs:{cols:"6"}},[n("v-select",{attrs:{disabled:t.loading1,rules:t.rules1.resultType,color:"cusblue",items:t.LabResult,"item-text":"label","item-value":"value",label:"ประเภทผล Lab","menu-props":"auto"},model:{value:t.checkData.resultType,callback:function(e){t.$set(t.checkData,"resultType",e)},expression:"checkData.resultType"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}}),t._v(" "),"text"===t.checkData.resultType?n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.normalStr,color:"cusblue",label:" ค่าปกติ"},model:{value:t.checkData.normalStr,callback:function(e){t.$set(t.checkData,"normalStr",e)},expression:"checkData.normalStr"}})],1):t._e(),t._v(" "),"numeric"===t.checkData.resultType?n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.normalMin,color:"cusblue",label:"ค่าปกติ (min)"},model:{value:t.checkData.normalMin,callback:function(e){t.$set(t.checkData,"normalMin",e)},expression:"checkData.normalMin"}})],1):t._e(),t._v(" "),"numeric"===t.checkData.resultType?n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.normalMax,color:"cusblue",label:"ค่าปกติ (max)"},model:{value:t.checkData.normalMax,callback:function(e){t.$set(t.checkData,"normalMax",e)},expression:"checkData.normalMax"}})],1):t._e(),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{disabled:t.loading1,rules:t.rules1.labUnit,color:"cusblue",label:"หน่วย"},model:{value:t.checkData.labUnit,callback:function(e){t.$set(t.checkData,"labUnit",e)},expression:"checkData.labUnit"}})],1)],1)],1):t._e()]):t._e(),t._v(" "),1===t.itemData.itemGroup||3===t.itemData.itemGroup&&!1===t.itemData.isSet?n("v-btn",{staticClass:"cusblue2--text text-none col-6",attrs:{dense:"",disabled:!t.valid1||t.loading1,block:"",outlined:""},on:{click:function(e){e.stopPropagation(),""===t.itemData.id||t.changeToCreate?t.submitData():t.updateData()}}},[n("v-progress-circular",{directives:[{name:"show",rawName:"v-show",value:t.loading1,expression:"loading1"}],staticClass:"mr-2",attrs:{indeterminate:"",color:"cusblue2",size:15,width:2}}),t._v("\n              "+t._s(""===t.itemData.id||t.changeToCreate?"Add":"Save")+"\n            ")],1):t._e()],1)],1):t._e()],1),t._v(" "),n("v-card-actions",{staticStyle:{"border-top":"1px solid rgb(202, 201, 201)"}},[n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"cusblue2--text text-none",attrs:{text:""},on:{click:t.newItem}},[t._v("\n          New\n        ")]),t._v(" "),n("v-btn",{staticClass:"cusblue2--text text-none",attrs:{text:""},on:{click:function(e){t.assignModal=!1}}},[t._v("\n          Cancel\n        ")])],1)],1)],1)],1)}),[],!1,null,null,null),z=F.exports;v()(F,{VAutocomplete:j.a,VBtn:f.a,VCard:h.a,VCardActions:x.a,VCardText:x.c,VCheckbox:P.a,VCol:k.a,VDialog:U.a,VDivider:_.a,VForm:E.a,VIcon:D.a,VListItemContent:$.a,VListItemTitle:$.b,VProgressCircular:R.a,VRow:w.a,VSelect:I.a,VSpacer:A.a,VTextField:S.a});var N={components:{settingNav:l.a,settingTab:r.a,checkList:T,checkDialog:z},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$axios,e.next=3,n.$get("/api/config/items",{progress:!1});case 3:return o=e.sent,e.abrupt("return",{item:o.results});case 5:case"end":return e.stop()}}),e)})))()},methods:{addItem:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("/api/config/items",{progress:!1});case 2:n=t.sent,e.item=n.results;case 4:case"end":return t.stop()}}),t)})))()},openDialog:function(t){this.$refs.checkDialog.open(t)},delItem:function(t){var e=this;this.$axios.$delete("/api/config/items/".concat(t)).then((function(n){var o=e.item.findIndex((function(e){return e.id===t}));e.item.splice(o,1)})).catch((function(t){console.log(t)}))}}},B=Object(d.a)(N,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("settingNav"),t._v(" "),n("div",{staticClass:"custom-container"},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{class:this.$vuetify.breakpoint.smAndUp?"px-2":"",attrs:{cols:"12",sm:"4",md:"3",lg:"2"}},[n("settingTab")],1),t._v(" "),n("v-col",{class:this.$vuetify.breakpoint.smAndUp?"px-2":"",attrs:{cols:"12",sm:"8",md:"9",lg:"10"}},[n("checkList",{attrs:{items:t.item},on:{edit:t.openDialog,delete:t.delItem}})],1)],1)],1),t._v(" "),n("v-btn",{key:t.$nuxt.$route.path,attrs:{color:"cusblue2",fixed:"",fab:"",large:"",dark:"",bottom:"",right:""},on:{click:function(e){return e.stopPropagation(),t.openDialog()}}},[n("v-icon",[t._v("mdi-plus")])],1),t._v(" "),n("checkDialog",{ref:"checkDialog",attrs:{"item-list":t.item},on:{add:t.addItem}})],1)}),[],!1,null,null,null);e.default=B.exports;v()(B,{VBtn:f.a,VCol:k.a,VIcon:D.a,VRow:w.a})}}]);