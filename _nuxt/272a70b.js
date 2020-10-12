(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{401:function(t,e,l){"use strict";var c={data:function(){return{tab:null,lists:[{title:"ระบบ",list:[{name:"สถานพยาบาล",link:"/setting/hospital"},{name:"ผู้ใช้งาน",link:"/setting/users"}]},{title:"ตัวช่วย",list:[{name:"Chief Complaint",link:"/setting/Chief-Complaint"},{name:"Differencial Diagnosis",link:"/setting/Differential-Diagnosis"},{name:"History Ranking",link:"/setting/History-Ranking"},{name:"Physical Examination",link:"/setting/Physical-Examination"}]},{title:"รายการตรวจ",list:[{name:"รายการตรวจ",link:"/setting/check"}]}]}},created:function(){var path=this.$nuxt.$route.path;this.tab="/setting/Chief-Complaint"===path||"/setting/Differential-Diagnosis"===path||"/setting/History-Ranking"===path||"/setting/Physical-Examination"===path?1:"/setting/check"===path?2:0}},n=l(55),o=l(74),r=l.n(o),v=l(355),d=l(353),m=l(404),_=l(157),f=l(158),x=l(99),C=l(107),h=l(372),k=l(420),V=l(373),w=l(216),component=Object(n.a)(c,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[this.$vuetify.breakpoint.smAndUp?l("div",t._l(t.lists,(function(e){return l("v-card",{key:e.index,staticClass:"mb-3 elevation-4"},[l("v-card-title",{staticClass:"pa-0 pl-5 pt-3"},[t._v(t._s(e.title))]),t._v(" "),l("v-divider"),t._v(" "),l("v-list",{staticClass:"pa-0",attrs:{dense:""}},t._l(e.list,(function(e){return l("v-list-item",{key:e.index,attrs:{link:"",to:e.link}},[l("v-icon",{staticClass:"mr-3",attrs:{color:"cusblue3","x-small":""}},[t._v("mdi-record")]),t._v(" "),l("v-list-item-content",[t._v("\n            "+t._s(e.name)+"\n          ")])],1)})),1)],1)})),1):l("div",[l("v-card",{staticClass:"mb-3 elevation-4"},[l("v-tabs",{attrs:{color:"cusblue3"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.lists,(function(e){return l("v-tab",{key:e.title},[t._v("\n          "+t._s(e.title)+"\n        ")])})),1),t._v(" "),l("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.lists,(function(e){return l("v-tab-item",{key:e.title},[l("v-card",{attrs:{flat:""}},[l("v-list",{staticClass:"pa-0",attrs:{dense:""}},t._l(e.list,(function(e){return l("v-list-item",{key:e.index,attrs:{link:"",to:e.link}},[l("v-icon",{staticClass:"mr-3",attrs:{color:"cusblue3","x-small":""}},[t._v("mdi-record")]),t._v(" "),l("v-list-item-content",[t._v("\n                  "+t._s(e.name)+"\n                ")])],1)})),1)],1)],1)})),1)],1)],1)])}),[],!1,null,null,null);e.a=component.exports;r()(component,{VCard:v.a,VCardTitle:d.d,VDivider:m.a,VIcon:_.a,VList:f.a,VListItem:x.a,VListItemContent:C.a,VTab:h.a,VTabItem:k.a,VTabs:V.a,VTabsItems:w.a})},402:function(t,e,l){"use strict";var c=l(55),n=l(74),o=l.n(n),r=l(366),v=l(368),component=Object(c.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("v-row",{staticClass:"cusblue1 px-10",attrs:{align:"center",justify:"center",dense:""}},[e("v-col",{attrs:{cols:"12"}},[e("h1",{staticClass:"font-weight-medium"},[this._v("ตั้งค่า")])])],1)}),[],!1,null,null,null);e.a=component.exports;o()(component,{VCol:r.a,VRow:v.a})},573:function(t,e,l){"use strict";l.r(e);var c=l(402),n=l(401),o={data:function(){return{confirmDel:!1,newItemDialog:!1,listItem:[{item:"item 1"},{item:"item 2"},{item:"item 3"}],type:["type","type1"]}}},r=l(55),v=l(74),d=l.n(v),m=l(154),_=l(355),f=l(353),x=l(366),C=l(405),h=l(404),k=l(157),V=l(158),w=l(99),L=l(159),y=l(107),D=l(368),I=l(423),S=l(371),T=l(422),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("h3",{staticClass:"pl-5 pt-3 font-weight-medium"},[t._v("รายการตรวจ")]),t._v(" "),l("v-divider",{staticClass:"darker-divider"}),t._v(" "),l("v-row",{staticClass:"pt-3",attrs:{"no-gutters":""}},[l("v-col",{attrs:{cols:"12"}},[l("v-card",{staticClass:"elevation-4",attrs:{height:"540"}},[l("div",{staticClass:"px-7 py-5"},[l("v-row",{attrs:{dense:""}},[l("v-col",{attrs:{cols:"2"}},[l("v-select",{staticClass:"rounded-lg",attrs:{color:"cusblue",items:t.type,label:"ประเภท",light:"",outlined:"",rounded:"",dense:"",flat:"","hide-details":""}})],1),t._v(" "),l("v-col",{attrs:{cols:"10"}},[l("v-text-field",{staticClass:"rounded-lg",attrs:{color:"cusblue",label:"ค้นหา","append-icon":"mdi-magnify",outlined:"","single-line":"",dense:"",flat:"","hide-details":""}})],1)],1)],1),t._v(" "),l("div",{staticClass:"px-7 py-5"},[l("v-card-title",{staticClass:"pa-0 px-3 py-1"},[t._v("\n            ชื่อ/ประเภท\n            "),l("v-spacer"),t._v(" "),l("v-btn",{staticClass:"cusblue3 float-right text-none",attrs:{dark:"",depressed:""},on:{click:function(e){e.stopPropagation(),t.newItemDialog=!0}}},[t._v("New item")]),t._v(" "),l("v-dialog",{attrs:{"max-width":"700"},model:{value:t.newItemDialog,callback:function(e){t.newItemDialog=e},expression:"newItemDialog"}},[l("v-card",[l("h2",{staticClass:"pa-5 pb-2"},[t._v("New Item")]),t._v(" "),l("v-divider",{staticClass:"darker-divider"}),t._v(" "),l("div",{staticClass:"py-5 px-10"},[l("v-row",{attrs:{dense:""}},[l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"ชื่อ item"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"สถานะ"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"จำนวน"}})],1)],1)],1),t._v(" "),l("v-card-actions",[l("v-spacer"),t._v(" "),l("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:function(e){t.newItemDialog=!1}}},[t._v("ยกเลิก")]),t._v(" "),l("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:function(e){t.newItemDialog=!1}}},[t._v("ตกลง")])],1)],1)],1)],1),t._v(" "),l("v-divider"),t._v(" "),l("v-list",{staticClass:"pa-0 px-5"},t._l(t.listItem,(function(e){return l("v-list-item",{key:e.index},[l("v-list-item-content",[l("v-list-item-title",[t._v(" "+t._s(e.item)+" ")])],1),t._v(" "),l("v-list-item-action",[l("v-row",{attrs:{"no-gutters":""}},[l("v-col",{attrs:{cols:"6"}},[l("v-btn",{staticClass:"mr-1",attrs:{icon:"","x-small":""}},[l("v-icon",{attrs:{color:"black"}},[t._v("mdi-pencil")])],1)],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-btn",{staticClass:"ml-1",attrs:{icon:"","x-small":""},on:{click:function(e){t.confirmDel=!0}}},[l("v-icon",{attrs:{color:"black"}},[t._v("mdi-trash-can")])],1)],1)],1)],1)],1)})),1)],1)]),t._v(" "),l("v-dialog",{attrs:{"max-width":"290"},model:{value:t.confirmDel,callback:function(e){t.confirmDel=e},expression:"confirmDel"}},[l("v-card",[l("h2",{staticClass:"pl-6 pt-3 pb-2"},[t._v("คุณแน่ใจหรือไม่?")]),t._v(" "),l("v-card-text",[t._v(" คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้ ")]),t._v(" "),l("v-card-actions",[l("v-spacer"),t._v(" "),l("v-btn",{attrs:{color:"red",text:""},on:{click:function(e){t.confirmDel=!1}}},[t._v(" ลบ ")]),t._v(" "),l("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.confirmDel=!1}}},[t._v("\n              ยกเลิก\n            ")])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null),$=component.exports;d()(component,{VBtn:m.a,VCard:_.a,VCardActions:f.a,VCardText:f.c,VCardTitle:f.d,VCol:x.a,VDialog:C.a,VDivider:h.a,VIcon:k.a,VList:V.a,VListItem:w.a,VListItemAction:L.a,VListItemContent:y.a,VListItemTitle:y.b,VRow:D.a,VSelect:I.a,VSpacer:S.a,VTextField:T.a});var j={data:function(){return{assignModal:!1,LabSet:!0,select:"Labs",type:["Labs","ยา"],groupLab:["กลุ่ม Lab","กลุ่ม Lab"],LabList:[{name:"Lab A"},{name:"Lab B"}],LabResult:["Labs","ยา"]}}},A=l(428),R=Object(r.a)(j,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("v-btn",{key:t.$nuxt.$route.path,attrs:{color:"cusblue2",fixed:"",fab:"",large:"",dark:"",bottom:"",right:""},on:{click:function(e){e.stopPropagation(),t.assignModal=!0}}},[l("v-icon",[t._v("mdi-plus")])],1),t._v(" "),l("v-dialog",{attrs:{"max-width":"700",scrollable:""},model:{value:t.assignModal,callback:function(e){t.assignModal=e},expression:"assignModal"}},[l("v-card",[l("h2",{staticClass:"pa-5 pb-2"},[t._v("แก้ไข")]),t._v(" "),l("v-divider",{staticClass:"darker-divider"}),t._v(" "),l("div",{staticClass:"px-7"},[l("v-row",{attrs:{dense:""}},[l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"รหัส"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"ชื่อ"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-select",{attrs:{color:"cusblue",items:t.type,label:"ประเภท","menu-props":"auto"},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}})],1)],1)],1),t._v(" "),l("v-divider",{staticClass:"dash-divider"}),t._v(" "),l("div",{staticClass:"px-7"},[l("v-row",{attrs:{dense:""}},[l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"ราคาทุน"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"ราคาขาย"}})],1)],1)],1),t._v(" "),l("v-divider",{staticClass:"dash-divider"}),t._v(" "),l("div",{staticClass:"px-7"},["Labs"==t.select?l("div",[l("v-row",{attrs:{justify:"center",align:"center",dense:""}},[l("v-col",{attrs:{cols:"6"}},[l("v-checkbox",{attrs:{label:"Lab ชุด",color:"cusblue2"},model:{value:t.LabSet,callback:function(e){t.LabSet=e},expression:"LabSet"}})],1),t._v(" "),l("v-col",{staticClass:"align-center",attrs:{cols:"6"}},[1==t.LabSet?l("v-row",{attrs:{"no-gutters":"",justify:"center",align:"center"}},[l("v-col",{attrs:{cols:"9"}},[l("v-text-field",{staticClass:"rounded-lg",attrs:{color:"cusblue",label:"ค้นหา Labs","append-icon":"mdi-magnify",outlined:"",dense:"","hide-details":""}})],1),t._v(" "),l("v-col",{attrs:{cols:"3"}},[l("v-btn",{staticClass:"ml-3",attrs:{color:"cusblue3",dark:"",depressed:""}},[t._v("Add")])],1)],1):0==t.LabSet?l("v-row",{attrs:{"no-gutters":"",justify:"center",align:"center"}},[l("v-col",{attrs:{cols:"12"}},[l("v-select",{staticClass:"rounded-lg",attrs:{color:"cusblue",items:t.groupLab,label:"กลุ่ม Lab",dense:"",outlined:"","hide-details":""}})],1)],1):t._e()],1)],1),t._v(" "),1==t.LabSet?l("div",[l("span",{staticClass:"font-weight-medium"},[t._v("รายการ Lab ย่อย")]),t._v(" "),l("span",{staticClass:"font-weight-medium float-right"},[t._v("Action")]),l("br"),t._v(" "),l("v-divider",{staticClass:"medium-divider"}),t._v(" "),t._l(t.LabList,(function(e){return l("div",{key:e.index,staticClass:"mt-3"},[l("span",[t._v(t._s(e.name))]),t._v(" "),l("v-btn",{staticClass:"float-right mr-1 mt-n2",attrs:{color:"red",dark:"",icon:"",depressed:""}},[l("v-icon",[t._v("mdi-close-circle")])],1),t._v(" "),l("v-divider")],1)}))],2):0==t.LabSet?l("v-row",{attrs:{dense:""}},[l("v-col",{attrs:{cols:"6"}},[l("v-select",{attrs:{color:"cusblue",items:t.LabResult,label:"ประเภทผล Lab","menu-props":"auto"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}}),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"ราคาขาย"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"ราคาขาย"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"ราคาขาย"}})],1)],1):t._e()],1):"ยา"==t.select?l("v-row",{attrs:{dense:""}},[l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"Instruction"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"Dose"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"Unit"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"Frequency"}})],1),t._v(" "),l("v-col",{attrs:{cols:"6"}},[l("v-text-field",{attrs:{color:"cusblue",label:"Caution"}})],1)],1):t._e()],1),t._v(" "),l("v-card-actions",[l("v-spacer"),t._v(" "),l("v-btn",{staticClass:"cusblue2--text text-none",attrs:{text:""}},[t._v("New")]),t._v(" "),l("v-btn",{staticClass:"cusblue2--text text-none",attrs:{text:""}},[t._v("Delete")]),t._v(" "),l("v-btn",{staticClass:"cusblue2--text text-none",attrs:{text:""}},[t._v("Save")])],1)],1)],1)],1)}),[],!1,null,null,null),E=R.exports;d()(R,{VBtn:m.a,VCard:_.a,VCardActions:f.a,VCheckbox:A.a,VCol:x.a,VDialog:C.a,VDivider:h.a,VIcon:k.a,VRow:D.a,VSelect:I.a,VSpacer:S.a,VTextField:T.a});var M={components:{settingNav:c.a,settingTab:n.a,Check:$,checkDialog:E}},N=Object(r.a)(M,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("settingNav"),this._v(" "),e("div",{staticClass:"custom-container"},[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{class:this.$vuetify.breakpoint.smAndUp?"px-2":"",attrs:{cols:"12",sm:"4",md:"3",lg:"2"}},[e("settingTab")],1),this._v(" "),e("v-col",{class:this.$vuetify.breakpoint.smAndUp?"px-2":"",attrs:{cols:"12",sm:"8",md:"9",lg:"10"}},[e("Check")],1)],1)],1),this._v(" "),e("checkDialog")],1)}),[],!1,null,null,null);e.default=N.exports;d()(N,{VCol:x.a,VRow:D.a})}}]);