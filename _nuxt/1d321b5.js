(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{398:function(e,t,r){var content=r(487);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(13).default)("4db16896",content,!0,{sourceMap:!1})},486:function(e,t,r){"use strict";var o=r(398);r.n(o).a},487:function(e,t,r){(t=r(12)(!1)).push([e.i,".bold-owner[data-v-79bebb88]{padding:5px;border-radius:15px}.bold-owner[data-v-79bebb88]:hover{background-color:#d4d4d4;cursor:pointer;transition:.5s}",""]),e.exports=t},526:function(e,t,r){"use strict";r.r(t);var o={data:function(){return{items:["OPD","IPD"],doct:["คนแรก","คนสอง","คนสาม","คนสี่"],queueCount:"5"}}},l=r(53),n=r(99),c=r.n(n),d=r(361),v=r(519),f=r(382),m=r(356),h=r(391),_=r(422),component=Object(l.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("v-card",{attrs:{color:"grey lighten-4",flat:"",tile:""}},[t("v-row",{staticClass:"second-nav cusblue1",attrs:{height:"55",align:"center",justify:"center",dense:"",flat:""}},[t("h1",{staticClass:"font-weight-medium col-sm-4 col-12"},[this._v("เวชระเบียน")]),this._v(" "),t("v-spacer"),this._v(" "),t("v-subheader",{directives:[{name:"show",rawName:"v-show",value:!this.$vuetify.breakpoint.smAndDown,expression:"!this.$vuetify.breakpoint.smAndDown"}],staticClass:"cus-subhead"},[this._v("ตัวเลือก :\n    ")]),this._v(" "),t("v-select",{staticClass:"rounded-lg cus-input mr-3",attrs:{"background-color":"cusblue3",items:this.doct,label:"บ้านเลขที่",dark:"",filled:"",rounded:"","single-line":"",dense:"",flat:"","hide-details":""}}),this._v(" "),t("v-text-field",{staticClass:"rounded-lg cus-textfield",attrs:{"background-color":"cusblue3","append-icon":"mdi-magnify",dark:"",filled:"",rounded:"","single-line":"",dense:"",flat:"","hide-details":""}})],1)],1)}),[],!1,null,null,null),x=component.exports;c()(component,{VCard:d.a,VRow:v.a,VSelect:f.a,VSpacer:m.a,VSubheader:h.a,VTextField:_.a});var C={props:{dessert:{default:null,type:Array,required:!1}},data:function(){return{headers:[{text:"ลำดับ",align:"center",sortable:!1,value:"id"},{text:"เจ้าของ",value:"name",sortable:!1},{text:"เบอร์ติดต่อ",value:"tel",sortable:!1},{text:"ที่อยู่",value:"address",width:"50%",sortable:!1}]}},methods:{ownDetail:function(e){this.$router.push("/record/"+e)}}},w=(r(486),r(535)),k=r(138),y=Object(l.a)(C,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-data-table",{staticClass:"elevation-4 overflow-y-auto",attrs:{headers:e.headers,items:e.dessert,"disable-pagination":"","hide-default-footer":"",height:"calc(100vh - 160px)"},scopedSlots:e._u([{key:"item.name",fn:function(t){var o=t.item;return[r("td",{staticClass:"font-weight-medium"},[r("nuxt-link",{staticClass:"bold-owner text-decoration-none",attrs:{to:"/record/"+o.id}},[e._v(e._s(o.name)+"\n          "),r("v-icon",{attrs:{color:"cusblue2",small:""}},[e._v("mdi-chevron-right")])],1)],1)]}}],null,!0)})],1)}),[],!1,null,"79bebb88",null),O=y.exports;c()(y,{VDataTable:w.a,VIcon:k.a});r(10),r(8),r(6),r(4),r(9);var $=r(2);function V(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var j={data:function(){return{assignModal:!1,valid:!0,nameTitle:["คุณ","นาย","นาง","นางสาว"],addCustomer:{prefix:"",f_name:"",l_name:"",address:"",email:"",tel:"",other:""},rules:{prefix:[function(e){return!!e||"กรุณาใส่คำนำหน้าชื่อ"}],f_name:[function(e){return!!e||"กรุณากรอกชื่อ"},function(e){return e&&e.length<=100||"ไม่ควรกรอกชื่อเกิน 100 ตัวอักษร"}],l_name:[function(e){return!!e||"กรุณากรอกนามสกุล"},function(e){return e&&e.length<=100||"ไม่ควรกรอกนามสกุลเกิน 100 ตัวอักษร"}],address:[function(e){return!!e||"กรุณากรอกที่อยู่"},function(e){return e&&e.length<=1e3||"ไม่ควรกรอกที่อยู่เกิน 1000 ตัวอักษร"}],email:[function(e){return!!e||"กรุณากรอกอีเมล์"},function(e){return/.+@.+\..+/.test(e)||"กรุณากรอกอีเมล์ให้ถูกรูปแบบ"}],tel:[function(e){return!!e||"กรุณากรอกที่อยู่"},function(e){return e&&e.length<=10||"ไม่กรอกใส่ชื่อเกิน 10 ตัวอักษร"},function(e){return/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e)||"กรุณากรอกเบอร์ติดต่อให้ถูกรูปแบบ"}]}}},methods:{submitCustomer:function(){var e=this;if(this.$refs.form.validate()){var t=function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?V(Object(source),!0).forEach((function(t){Object($.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):V(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},this.addCustomer);this.$store.dispatch("addCustomer",t).then((function(){e.$refs.form.reset(),e.assignModal=!1}))}},cancelForm:function(){this.$refs.form.reset(),this.assignModal=!1}}},D=r(143),P=r(343),M=r(518),S=r(359),T=r(377),E=r(399),F=Object(l.a)(j,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-btn",{key:e.$nuxt.$route.path,attrs:{color:"cusblue2",fixed:"",fab:"",large:"",dark:"",bottom:"",right:""},on:{click:function(t){t.stopPropagation(),e.assignModal=!0}}},[r("v-icon",[e._v("mdi-plus")])],1),e._v(" "),r("v-dialog",{attrs:{"max-width":"700",scrollable:""},model:{value:e.assignModal,callback:function(t){e.assignModal=t},expression:"assignModal"}},[r("v-card",[r("v-form",{ref:"form",attrs:{"lazy-validation":"",autocomplete:"off"},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("h2",{staticClass:"pa-5 pb-2"},[e._v("เพิ่มข้อมูลลูกค้า")]),e._v(" "),r("v-divider",{staticClass:"darker-divider"}),e._v(" "),r("div",{staticClass:"py-5 px-10"},[r("v-row",{attrs:{dense:""}},[r("v-col",{attrs:{cols:"3"}},[r("v-select",{attrs:{color:"cusblue",items:e.nameTitle,label:"คำนำหน้าชื่อ","menu-props":"auto",rules:e.rules.prefix,required:""},model:{value:e.addCustomer.prefix,callback:function(t){e.$set(e.addCustomer,"prefix",t)},expression:"addCustomer.prefix"}})],1),e._v(" "),r("v-col",{attrs:{cols:"4.5"}},[r("v-text-field",{attrs:{color:"cusblue",label:"ชื่อ",rules:e.rules.f_name,required:""},model:{value:e.addCustomer.f_name,callback:function(t){e.$set(e.addCustomer,"f_name",t)},expression:"addCustomer.f_name"}})],1),e._v(" "),r("v-col",{attrs:{cols:"4.5"}},[r("v-text-field",{attrs:{color:"cusblue",label:"นามสกุล",rules:e.rules.l_name,required:""},model:{value:e.addCustomer.l_name,callback:function(t){e.$set(e.addCustomer,"l_name",t)},expression:"addCustomer.l_name"}})],1),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{color:"cusblue",label:"ที่อยู่",rules:e.rules.address,required:""},model:{value:e.addCustomer.address,callback:function(t){e.$set(e.addCustomer,"address",t)},expression:"addCustomer.address"}})],1),e._v(" "),r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{color:"cusblue",label:"อีเมล์",rules:e.rules.email,required:""},model:{value:e.addCustomer.email,callback:function(t){e.$set(e.addCustomer,"email",t)},expression:"addCustomer.email"}})],1),e._v(" "),r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{color:"cusblue",label:"เบอร์ติดต่อ",rules:e.rules.tel,required:""},model:{value:e.addCustomer.tel,callback:function(t){e.$set(e.addCustomer,"tel",t)},expression:"addCustomer.tel"}})],1),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{color:"cusblue",label:"อื่นๆ"},model:{value:e.addCustomer.other,callback:function(t){e.$set(e.addCustomer,"other",t)},expression:"addCustomer.other"}})],1)],1)],1),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:e.cancelForm}},[e._v("ยกเลิก")]),e._v(" "),r("v-btn",{attrs:{color:"cusblue2",disabled:!e.valid,text:""},on:{click:function(t){return e.submitCustomer()}}},[e._v("บันทึก")])],1)],1)],1)],1)],1)}),[],!1,null,null,null),A=F.exports;c()(F,{VBtn:D.a,VCard:d.a,VCardActions:P.a,VCol:M.a,VDialog:S.a,VDivider:T.a,VForm:E.a,VIcon:k.a,VRow:v.a,VSelect:f.a,VSpacer:m.a,VTextField:_.a});var I={components:{recordNav:x,recordTable:O,recordDialog:A},computed:{customer:function(){return this.$store.getters.getCustomer}}},N=Object(l.a)(I,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("recordNav"),this._v(" "),t("div",{staticClass:"custom-container"},[t("recordTable",{attrs:{dessert:this.customer}})],1),this._v(" "),t("recordDialog")],1)}),[],!1,null,null,null);t.default=N.exports}}]);