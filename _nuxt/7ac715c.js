(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{424:function(t,e,o){t.exports=o.p+"img/001-user.4994bf1.svg"},425:function(t,e,o){t.exports=o.p+"img/003-dog-1.50ac46b.svg"},529:function(t,e,o){"use strict";o.r(e);var l={props:{title:{type:String,required:!0}}},n=o(54),c=o(75),r=o.n(c),d=o(357),v=o(359),component=Object(n.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-row",{staticClass:"cusblue1 px-10",attrs:{align:"center",justify:"center",dense:""}},[e("v-col",{attrs:{md:"12",cols:"12"}},[e("h1",{staticClass:"font-weight-medium"},[this._v(this._s(this.title))])])],1)}),[],!1,null,null,null),m=component.exports;r()(component,{VCol:d.a,VRow:v.a});var h={props:{owner:{default:null,type:Object,required:!1}},data:function(){return{actionBtns:[{text:"แก้ไขข้อมูล",action:""},{text:"ลบข้อมูล",action:""}]}}},f=o(154),_=o(156),k=o(347),C=o(344),x=o(394),y=o(151),w=o(215),D=o(152),P=o(99),V=o(349),$=Object(n.a)(h,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("v-card",{staticClass:"elevation-5"},[l("v-card-title",[t._v("ข้อมูลเจ้าของสัตว์")]),t._v(" "),l("v-divider",{staticClass:"darker-divider"}),t._v(" "),l("div",{staticClass:"px-10 py-5"},[l("v-row",{attrs:{"no-gutters":""}},[l("v-col",{attrs:{lg:"1",md:"2",sm:"3",cols:"4"}},[l("v-row",{attrs:{"no-gutters":""}},[l("v-col",{attrs:{cols:"12"}},[l("v-avatar",{attrs:{size:"100"}},[l("v-img",{attrs:{src:o(424)}})],1)],1),t._v(" "),l("v-col",{attrs:{cols:"12"}},[l("v-menu",{attrs:{"offset-y":"","nudge-left":"80"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[l("v-btn",t._g(t._b({staticClass:"mx-7",attrs:{color:"cusblue2",dark:"",icon:"",depressed:"",large:""}},"v-btn",n,!1),o),[l("v-icon",[t._v("mdi-dots-horizontal-circle")])],1)]}}])},[t._v(" "),l("v-list",{attrs:{width:"200"}},[l("v-list-item",[l("h4",[t._v("Action")])]),t._v(" "),l("v-divider"),t._v(" "),t._l(t.actionBtns,(function(e){return l("v-btn",{key:e.text,staticClass:"cusblue2--text",attrs:{block:"",text:"",tile:""}},[t._v(t._s(e.text))])}))],2)],1)],1)],1)],1),t._v(" "),l("v-col",{staticClass:"pa-6",attrs:{lg:"11",md:"10",sm:"9",cols:"8"}},[l("v-row",{attrs:{"no-gutters":""}},[l("v-col",{attrs:{cols:"12"}},[l("div",{staticClass:"font-weight-medium"},[t._v(t._s(t.owner.name))])]),t._v(" "),l("v-col",{attrs:{lg:"3",md:"6",cols:"12"}},[l("span",{staticClass:"font-weight-medium"},[t._v("เบอร์ติดต่อ :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(t.owner.tel))])]),t._v(" "),l("v-col",{attrs:{lg:"4",md:"6",cols:"12"}},[l("span",{staticClass:"font-weight-medium"},[t._v("Email :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(t.owner.email))])]),t._v(" "),l("v-col",{attrs:{lg:"5",md:"12",cols:"12"}},[l("span",{staticClass:"font-weight-medium"},[t._v("ที่อยู่ :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(t.owner.address))])])],1)],1)],1)],1)],1)}),[],!1,null,null,null),Y=$.exports;r()($,{VAvatar:f.a,VBtn:_.a,VCard:k.a,VCardTitle:C.d,VCol:d.a,VDivider:x.a,VIcon:y.a,VImg:w.a,VList:D.a,VListItem:P.a,VMenu:V.a,VRow:v.a});o(16),o(17),o(4);var E=o(78),M=o.n(E),O={props:{userDetail:{default:null,type:Object,required:!1},petId:{default:null,type:String,required:!1}},data:function(){return{depositDialog:!1,DepositDate:!1,dateDepo:"",DepositTime:!1,TimeDepo:"",enabled:!1,checkDialog:!1,valid:!0,doctor:["Doctor","Doctor1","Doctor2"],nameTitle:["คุณ","นาย","นาง","นางสาว"],userDetails:this.userDetail,sendCheck:{type:"",time:"",status:"",doctor:"",important:"",weight:"",temp:"",do:{check:[],other:""},problem:""},rules:{doctor:[function(t){return!!t||"กรุณาเลือกแพทย์ผู้ตรวจ"}],important:[function(t){return!!t||"กรุณากรอกความสำคัญ"},function(t){return t&&t.length<=100||"ไม่ควรกรอกความสำคัญเกิน 100 ตัวอักษร"}],weight:[function(t){return!!t||"กรุณากรอกน้ำหนัก"},function(t){return/^[0-9]*$/.test(t)||"กรุณากรอกตัวเลขเท่านั้น"},function(t){return t&&t.length<=3||"ไม่ควรกรอกน้ำหนักเกิน 10 ตัวอักษร"}],temp:[function(t){return!!t||"กรุณากรอกอุณหภูมิ"},function(t){return/^[0-9]*$/.test(t)||"กรุณากรอกตัวเลขเท่านั้น"},function(t){return t&&t.length<=3||"ไม่ควรกรอกอุณหภูมิเกิน 10 ตัวอักษร"}]}}},methods:{submitCheck:function(){var t=this;this.$refs.form.validate()&&(this.sendCheck.type="OPD",this.sendCheck.status="รอตรวจ",this.sendCheck.time=M()().format("YYYY-MM-DD, h:mm:ss a"),this.$store.dispatch("queue/addQueueOPD",{user:this.userDetails,petId:this.petId,status:this.sendCheck}).then((function(){t.checkDialog=!1})))},submitDeposit:function(){this.sendCheck.type="ฝากเลี้ยง",this.sendCheck.status="ฝากเลี้ยง",this.sendCheck.time=M()().format("YYYY-MM-DD, h:mm:ss a"),this.userDetails.status=this.sendCheck,this.$store.commit("queue/addQueueOPD",[this.userDetails,this.petId])},UpdateTime:function(){this.dateDepo=M()().format("YYYY-MM-DD"),this.TimeDepo=M()().format("HH:mm"),this.depositDialog=!0}}},T=o(438),S=o(536),I=o(446),j=o(411),A=o(397),B=o(442),F=o(436),R=o(521),z=Object(n.a)(O,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-btn",{staticClass:"ma-2 px-0",attrs:{color:"cusblue3",dark:"",block:"",depressed:""},on:{click:function(e){e.stopPropagation(),t.checkDialog=!0}}},[t._v("ส่งตรวจ")]),t._v(" "),o("v-btn",{staticClass:"ma-2 px-0",attrs:{color:"cusblue3",dark:"",block:"",depressed:""},on:{click:t.UpdateTime}},[t._v("ฝากเลี้ยง")]),t._v(" "),o("v-btn",{staticClass:"ma-2 px-0",attrs:{color:"cusblue3",dark:"",block:"",depressed:""}},[t._v("ทำนัด")]),t._v(" "),o("v-btn",{staticClass:"ma-2 px-0",attrs:{color:"cusblue3",dark:"",block:"",depressed:""}},[t._v("ประวัติการรักษา")]),t._v(" "),o("v-dialog",{attrs:{"max-width":"700"},model:{value:t.checkDialog,callback:function(e){t.checkDialog=e},expression:"checkDialog"}},[o("v-card",[o("v-form",{ref:"form",attrs:{"lazy-validation":"",autocomplete:"off"},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[o("h2",{staticClass:"pa-5 pb-2"},[t._v("ส่งตรวจ")]),t._v(" "),o("v-divider",{staticClass:"darker-divider"}),t._v(" "),o("div",{staticClass:"py-5 px-10"},[o("v-row",{attrs:{dense:""}},[o("v-col",{attrs:{cols:"6"}},[o("v-select",{attrs:{items:this.$store.state.doctor.doctors,label:"แพทย์ผู้ตรวจ",rules:t.rules.doctor},model:{value:t.sendCheck.doctor,callback:function(e){t.$set(t.sendCheck,"doctor",e)},expression:"sendCheck.doctor"}})],1),t._v(" "),o("v-col",{attrs:{cols:"6"}},[o("v-text-field",{attrs:{color:"cusblue",label:"ความสำคัญ",rules:t.rules.important},model:{value:t.sendCheck.important,callback:function(e){t.$set(t.sendCheck,"important",e)},expression:"sendCheck.important"}})],1),t._v(" "),o("v-col",{attrs:{cols:"6"}},[o("v-text-field",{attrs:{color:"cusblue",label:"นำหนัก / kg",rules:t.rules.weight},model:{value:t.sendCheck.weight,callback:function(e){t.$set(t.sendCheck,"weight",e)},expression:"sendCheck.weight"}})],1),t._v(" "),o("v-col",{attrs:{cols:"6"}},[o("v-text-field",{attrs:{color:"cusblue",label:"อุณหภูมิ / C°",rules:t.rules.temp},model:{value:t.sendCheck.temp,callback:function(e){t.$set(t.sendCheck,"temp",e)},expression:"sendCheck.temp"}})],1),t._v(" "),o("v-col",{attrs:{cols:"4"}},[o("v-checkbox",{staticClass:"mx-2",attrs:{value:"ดูอาการ",label:"ดูอาการ"},model:{value:t.sendCheck.do.check,callback:function(e){t.$set(t.sendCheck.do,"check",e)},expression:"sendCheck.do.check"}})],1),t._v(" "),o("v-col",{attrs:{cols:"4"}},[o("v-checkbox",{staticClass:"mx-2",attrs:{value:"ทำแผล",label:"ทำแผล"},model:{value:t.sendCheck.do.check,callback:function(e){t.$set(t.sendCheck.do,"check",e)},expression:"sendCheck.do.check"}})],1),t._v(" "),o("v-col",{attrs:{cols:"4"}},[o("v-checkbox",{staticClass:"mx-2",attrs:{value:"ฟังผลตรวจ",label:"ฟังผลตรวจ Lab"},model:{value:t.sendCheck.do.check,callback:function(e){t.$set(t.sendCheck.do,"check",e)},expression:"sendCheck.do.check"}})],1),t._v(" "),o("v-col",{attrs:{cols:"4"}},[o("v-checkbox",{staticClass:"mx-2",attrs:{value:"ฉีดยา",label:"ฉีดยา"},model:{value:t.sendCheck.do.check,callback:function(e){t.$set(t.sendCheck.do,"check",e)},expression:"sendCheck.do.check"}})],1),t._v(" "),o("v-col",{attrs:{cols:"4"}},[o("v-checkbox",{staticClass:"mx-2",attrs:{value:"ให้น้ำเกลือ",label:"ให้น้ำเกลือ"},model:{value:t.sendCheck.do.check,callback:function(e){t.$set(t.sendCheck.do,"check",e)},expression:"sendCheck.do.check"}})],1),t._v(" "),o("v-col",{attrs:{cols:"4"}},[o("v-checkbox",{staticClass:"mx-2",attrs:{value:"Xray / Ultrasound",label:"Xray / Ultrasound"},model:{value:t.sendCheck.do.check,callback:function(e){t.$set(t.sendCheck.do,"check",e)},expression:"sendCheck.do.check"}})],1),t._v(" "),o("v-col",{staticClass:"px-3",attrs:{cols:"12"}},[o("v-row",{attrs:{align:"center","no-gutters":""}},[o("v-checkbox",{staticClass:"shrink mr-2 mt-0",attrs:{"hide-details":"",label:"อื่นๆ"},model:{value:t.enabled,callback:function(e){t.enabled=e},expression:"enabled"}}),t._v(" "),o("v-text-field",{staticClass:"mt-5",attrs:{dense:"",disabled:!t.enabled},model:{value:t.sendCheck.do.other,callback:function(e){t.$set(t.sendCheck.do,"other",e)},expression:"sendCheck.do.other"}})],1)],1),t._v(" "),o("v-col",{attrs:{cols:"12"}},[o("v-text-field",{attrs:{color:"cusblue",label:"สาเหตุการเข้ารับบริการ"},model:{value:t.sendCheck.problem,callback:function(e){t.$set(t.sendCheck,"problem",e)},expression:"sendCheck.problem"}})],1)],1)],1),t._v(" "),o("v-card-actions",[o("v-spacer"),t._v(" "),o("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:function(e){t.checkDialog=!1}}},[t._v("ไม่ส่ง")]),t._v(" "),o("v-btn",{attrs:{color:"cusblue2",disabled:!t.valid,text:""},on:{click:t.submitCheck}},[t._v("ส่ง")])],1)],1)],1)],1),t._v(" "),o("v-dialog",{attrs:{"max-width":"800",scrollable:""},model:{value:t.depositDialog,callback:function(e){t.depositDialog=e},expression:"depositDialog"}},[o("v-card",[o("h2",{staticClass:"pa-5 pb-2"},[t._v("ฝากเลี้ยง")]),t._v(" "),o("v-divider",{staticClass:"darker-divider"}),t._v(" "),o("div",{staticClass:"px-7"},[o("v-row",[o("v-col",{attrs:{cols:"6"}},[o("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var l=e.on,n=e.attrs;return[o("v-text-field",t._g(t._b({attrs:{color:"cusblue","append-icon":"mdi-calendar-month","background-color":"white",label:"วันที่วัด",readonly:""},model:{value:t.dateDepo,callback:function(e){t.dateDepo=e},expression:"dateDepo"}},"v-text-field",n,!1),l))]}}]),model:{value:t.DepositDate,callback:function(e){t.DepositDate=e},expression:"DepositDate"}},[t._v(" "),o("v-date-picker",{ref:"picker",attrs:{color:"cusblue",max:(new Date).toISOString().substr(0,10),min:"1950-01-01"},model:{value:t.dateDepo,callback:function(e){t.dateDepo=e},expression:"dateDepo"}})],1)],1),t._v(" "),o("v-col",{attrs:{cols:"6"}},[o("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var l=e.on,n=e.attrs;return[o("v-text-field",t._g(t._b({attrs:{color:"cusblue","append-icon":"mdi-clock-outline","background-color":"white",label:"เวลา",readonly:""},model:{value:t.TimeDepo,callback:function(e){t.TimeDepo=e},expression:"TimeDepo"}},"v-text-field",n,!1),l))]}}]),model:{value:t.DepositTime,callback:function(e){t.DepositTime=e},expression:"DepositTime"}},[t._v(" "),o("v-time-picker",{ref:"picker",attrs:{color:"cusblue",format:"24hr",scrollable:""},model:{value:t.TimeDepo,callback:function(e){t.TimeDepo=e},expression:"TimeDepo"}})],1)],1),t._v(" "),o("v-col",{attrs:{cols:"12"}},[o("v-text-field",{attrs:{color:"cusblue",label:"รายละเอียด"}})],1)],1)],1),t._v(" "),o("v-card-actions",[o("v-spacer"),t._v(" "),o("v-btn",{staticClass:"cusblue2--text text-none",attrs:{text:""}},[t._v("ยกเลิก")]),t._v(" "),o("v-btn",{staticClass:"cusblue2--text text-none",attrs:{text:""}},[t._v("บันทึก")])],1)],1)],1)],1)}),[],!1,null,null,null),N=z.exports;r()(z,{VBtn:_.a,VCard:k.a,VCardActions:C.a,VCheckbox:T.a,VCol:d.a,VDatePicker:S.a,VDialog:I.a,VDivider:x.a,VForm:j.a,VMenu:V.a,VRow:v.a,VSelect:A.a,VSpacer:B.a,VTextField:F.a,VTimePicker:R.a});var L={components:{sendcheckDialog:N},props:{customer:{default:null,type:Object,required:!1}},data:function(){return{actionBtns:[{text:"แก้ไขข้อมูล",action:""},{text:"แจ้งตาย",action:""},{text:"ลบข้อมูล",action:""}]}},methods:{calcAge:function(t){var e=M()(),o=M()(t.toString(),"YYYY-MM-DD"),l=M.a.duration(e.diff(o));return l.years()+" ปี "+l.months()+" เดือน "+l.days()+" วัน "}}},U=o(441),H=Object(n.a)(L,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("v-card",{staticClass:"elevation-5"},[l("v-card-title",[t._v("ข้อมูลสัตว์เลี้ยง")]),t._v(" "),l("v-divider",{staticClass:"darker-divider"}),t._v(" "),""!=t.customer.pet?l("div",t._l(t.customer.pet,(function(e,i){return l("div",{key:i},[l("v-row",{staticClass:"px-10 py-5",attrs:{"no-gutters":""}},[l("v-col",{attrs:{lg:"1",md:"2",cols:"6"}},[l("v-row",[l("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[l("v-avatar",{attrs:{size:"100"}},[l("v-img",{attrs:{src:o(425)}})],1)],1),t._v(" "),l("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[l("v-menu",{attrs:{"offset-y":"","nudge-left":"80"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[l("v-btn",t._g(t._b({staticClass:"mx-7",attrs:{color:"cusblue2",dark:"",icon:"",depressed:"",large:""}},"v-btn",n,!1),o),[l("v-icon",[t._v("mdi-dots-horizontal-circle")])],1)]}}],null,!0)},[t._v(" "),l("v-list",{attrs:{width:"200"}},[l("v-list-item",[l("h4",[t._v("Action")])]),t._v(" "),l("v-divider"),t._v(" "),t._l(t.actionBtns,(function(e){return l("v-btn",{key:e.text,staticClass:"cusblue2--text",attrs:{block:"",text:"",tile:""}},[t._v(t._s(e.text))])}))],2)],1)],1)],1)],1),t._v(" "),l("v-col",{staticClass:"pa-4 pb-1",attrs:{lg:"10",md:"8",cols:"12",order:t.$vuetify.breakpoint.smAndDown?"last":""}},[l("v-row",{attrs:{dense:""}},[l("v-col",{attrs:{lg:"3",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("ชื่อสัตว์เลี้ยง :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.name))])]),t._v(" "),l("v-col",{attrs:{lg:"9",sm:"8",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("สถานะ :")]),t._v(" "),l("v-chip",{attrs:{color:"#4ec714","text-color":"white",small:"",label:""}},[t._v(t._s(e.status))])],1),t._v(" "),l("v-col",{attrs:{lg:"12",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("Microchip No :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.microship))])]),t._v(" "),l("v-col",{attrs:{lg:"3",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("วันเกิด :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(t.$moment(e.bd).format("DD/MM/YYYY")))])]),t._v(" "),l("v-col",{attrs:{lg:"2",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("อายุ :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(t.calcAge(e.bd)))])]),t._v(" "),l("v-col",{attrs:{lg:"2",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("ประเภท :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.type))])]),t._v(" "),l("v-col",{attrs:{lg:"2",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("สายพันธุ์ :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.specie))])]),t._v(" "),l("v-col",{attrs:{lg:"",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("เพศ :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.gender))])]),t._v(" "),l("v-col",{attrs:{lg:"",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("สี :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.color))])]),t._v(" "),l("v-col",{attrs:{lg:"3",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("ทำหมัน :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.sterile))])]),t._v(" "),l("v-col",{attrs:{lg:"9",sm:"4",cols:"6"}},[l("span",{staticClass:"font-weight-medium"},[t._v("ตำหนิ :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.scar))])]),t._v(" "),l("v-col",{attrs:{lg:"12",sm:"12",cols:"12"}},[l("span",{staticClass:"font-weight-medium"},[t._v("นัดหมายครั้งต่อไป :")]),t._v(" "),l("span",{staticClass:"font-weight-light"},[t._v(t._s(e.appoint))])])],1)],1),t._v(" "),l("v-col",{attrs:{lg:"1",md:"2",cols:"6"}},[l("sendcheckDialog",{attrs:{"user-detail":t.customer,"pet-id":e.id}})],1)],1),t._v(" "),l("v-divider")],1)})),0):l("div",{staticClass:"text-center pa-15 grey--text"},[t._v("Not Found Pet")])],1)}),[],!1,null,null,null),J=H.exports;r()(H,{VAvatar:f.a,VBtn:_.a,VCard:k.a,VCardTitle:C.d,VChip:U.a,VCol:d.a,VDivider:x.a,VIcon:y.a,VImg:w.a,VList:D.a,VListItem:P.a,VMenu:V.a,VRow:v.a});o(19);var Q={data:function(){return{assignModal:!1,date:null,menuDate:!1,valid:!0,type:["หมา","แมว","นก","หนู"],gender:["ผู้","เมีย"],sterile:["ทำแล้ว","ยังไม่ทำ"],addPet:{name:"",microship:"",status:"ทั่วไป",bd:null,bd_year:"",bd_month:"",bd_day:"",type:"",gender:"",color:"",sterile:"",scar:"",note:""},rules:{name:[function(t){return!!t||"กรุณากรอกชื่อสัตว์เลี้ยง"},function(t){return t&&t.length<=100||"ไม่ควรกรอกชื่อเกิน 100 ตัวอักษร"}],bd:[function(t){return!!t||"กรุณาเลือกวันเกิดของสัตว์เลี้ยง"}],type:[function(t){return!!t||"กรุณาเลือกประเภทสัตว์เลี้ยง"}],gender:[function(t){return!!t||"กรุณาเลือกเพศสัตว์เลี้ยง"}],color:[function(t){return!!t||"กรุณากรอกสีสัตว์เลี้ยง"},function(t){return t&&t.length<=100||"ไม่ควรกรอกสีเกิน 100 ตัวอักษร"}],sterile:[function(t){return!!t||"กรุณาเลือกการทำหมัน"}]}}},computed:{selectDate:function(){return this.addPet.bd?(this.calcDate(this.addPet.bd),M()(this.addPet.bd).format("DD/MM/YYYY")):null}},methods:{onEnter:function(t){this.$refs[t].focus()},writeDate:function(){var t=M()();t=M()(t).subtract(this.addPet.bd_year,"years"),t=M()(t).subtract(this.addPet.bd_month,"months"),t=M()(t).subtract(this.addPet.bd_day,"days"),this.addPet.bd=M()(t).format("YYYY-MM-DD")},calcDate:function(t){var e=M()(),o=M()(t.toString(),"YYYY-MM-DD"),l=M.a.duration(e.diff(o));this.addPet.bd_year=l.years(),this.addPet.bd_month=l.months(),this.addPet.bd_day=l.days()},submitPet:function(){var t=this;this.$refs.form.validate()&&this.$store.dispatch("addPet",{id:this.$route.params.owner,pet:this.addPet}).then((function(){t.resetPet(),t.assignModal=!1}))},cancelForm:function(){this.resetPet(),this.assignModal=!1},resetPet:function(){this.addPet.name="",this.addPet.microship="",this.addPet.bd=null,this.addPet.bd_year="",this.addPet.bd_month="",this.addPet.bd_day="",this.addPet.type="",this.addPet.gender="",this.addPet.color="",this.addPet.sterile="",this.addPet.scar="",this.addPet.note=""}}},X=Object(n.a)(Q,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-btn",{key:t.$nuxt.$route.path,attrs:{color:"cusblue2",fixed:"",fab:"",large:"",dark:"",bottom:"",right:""},on:{click:function(e){e.stopPropagation(),t.assignModal=!0}}},[o("v-icon",[t._v("mdi-plus")])],1),t._v(" "),o("v-dialog",{attrs:{"max-width":"700",scrollable:""},model:{value:t.assignModal,callback:function(e){t.assignModal=e},expression:"assignModal"}},[o("v-card",[o("v-form",{ref:"form",attrs:{"lazy-validation":"",autocomplete:"off"},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[o("h2",{staticClass:"pa-5 pb-2"},[t._v("เพิ่มข้อมูลสัตว์เลี้ยง")]),t._v(" "),o("v-divider",{staticClass:"darker-divider"}),t._v(" "),o("div",{staticClass:"py-5 px-10"},[o("v-row",{attrs:{dense:""}},[o("v-col",{attrs:{cols:"6"}},[o("v-text-field",{attrs:{color:"cusblue",label:"ชื่อสัตว์เลี้ยง",rules:t.rules.name},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("microship")}},model:{value:t.addPet.name,callback:function(e){t.$set(t.addPet,"name",e)},expression:"addPet.name"}})],1),t._v(" "),o("v-col",{attrs:{cols:"6"}},[o("v-text-field",{ref:"microship",attrs:{color:"cusblue",label:"Microchip No"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.onEnter("bd"),t.menuDate=!0}},model:{value:t.addPet.microship,callback:function(e){t.$set(t.addPet,"microship",e)},expression:"addPet.microship"}})],1),t._v(" "),o("v-col",{attrs:{cols:"6"}},[o("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var l=e.on,n=e.attrs;return[o("v-text-field",t._g(t._b({ref:"bd",attrs:{label:"วันเกิด",color:"cusblue","append-icon":"mdi-calendar-month",rules:t.rules.bd,readonly:""},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.onEnter("year"),t.menuDate=!1}},model:{value:t.selectDate,callback:function(e){t.selectDate=e},expression:"selectDate"}},"v-text-field",n,!1),l))]}}]),model:{value:t.menuDate,callback:function(e){t.menuDate=e},expression:"menuDate"}},[t._v(" "),o("v-date-picker",{ref:"picker",attrs:{color:"cusblue",max:(new Date).toISOString().substr(0,10),min:"1950-01-01",value:"YYYY-mm",locale:"th","show-current":!1,scrollable:""},model:{value:t.addPet.bd,callback:function(e){t.$set(t.addPet,"bd",e)},expression:"addPet.bd"}})],1)],1),t._v(" "),o("v-col",{attrs:{cols:"2"}},[o("v-text-field",{ref:"year",attrs:{color:"cusblue",label:"ปี"},on:{change:t.writeDate,keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("month")}},model:{value:t.addPet.bd_year,callback:function(e){t.$set(t.addPet,"bd_year",e)},expression:"addPet.bd_year"}})],1),t._v(" "),o("v-col",{attrs:{cols:"2"}},[o("v-text-field",{ref:"month",attrs:{color:"cusblue",label:"เดือน"},on:{change:t.writeDate,keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("day")}},model:{value:t.addPet.bd_month,callback:function(e){t.$set(t.addPet,"bd_month",e)},expression:"addPet.bd_month"}})],1),t._v(" "),o("v-col",{attrs:{cols:"2"}},[o("v-text-field",{ref:"day",attrs:{color:"cusblue",label:"วัน"},on:{change:t.writeDate,keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("type")}},model:{value:t.addPet.bd_day,callback:function(e){t.$set(t.addPet,"bd_day",e)},expression:"addPet.bd_day"}})],1),t._v(" "),o("v-col",{attrs:{cols:"2"}},[o("v-select",{ref:"type",attrs:{items:t.type,label:"ประเภท",rules:t.rules.type},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("gender")}},model:{value:t.addPet.type,callback:function(e){t.$set(t.addPet,"type",e)},expression:"addPet.type"}})],1),t._v(" "),o("v-col",{attrs:{cols:"2"}},[o("v-select",{ref:"gender",attrs:{items:t.gender,label:"เพศ",rules:t.rules.gender},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("color")}},model:{value:t.addPet.gender,callback:function(e){t.$set(t.addPet,"gender",e)},expression:"addPet.gender"}})],1),t._v(" "),o("v-col",{attrs:{cols:"2"}},[o("v-text-field",{ref:"color",attrs:{color:"cusblue",label:"สี",rules:t.rules.color},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("sterile")}},model:{value:t.addPet.color,callback:function(e){t.$set(t.addPet,"color",e)},expression:"addPet.color"}})],1),t._v(" "),o("v-col",{attrs:{cols:"3"}},[o("v-select",{ref:"sterile",attrs:{items:t.sterile,label:"การทำหมัน",rules:t.rules.sterile},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("scar")}},model:{value:t.addPet.sterile,callback:function(e){t.$set(t.addPet,"sterile",e)},expression:"addPet.sterile"}})],1),t._v(" "),o("v-col",{attrs:{cols:"3"}},[o("v-text-field",{ref:"scar",attrs:{color:"cusblue",label:"ตำหนิ"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter("note")}},model:{value:t.addPet.scar,callback:function(e){t.$set(t.addPet,"scar",e)},expression:"addPet.scar"}})],1),t._v(" "),o("v-col",{attrs:{cols:"12"}},[o("v-text-field",{ref:"note",attrs:{color:"cusblue",label:"Note"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitPet(e)}},model:{value:t.addPet.note,callback:function(e){t.$set(t.addPet,"note",e)},expression:"addPet.note"}})],1)],1)],1),t._v(" "),o("v-card-actions",[o("v-spacer"),t._v(" "),o("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:t.cancelForm}},[t._v("ยกเลิก")]),t._v(" "),o("v-btn",{attrs:{color:"cusblue2",disabled:!t.valid,text:""},on:{click:t.submitPet}},[t._v("\n            บันทึก\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null),G=X.exports;r()(X,{VBtn:_.a,VCard:k.a,VCardActions:C.a,VCol:d.a,VDatePicker:S.a,VDialog:I.a,VDivider:x.a,VForm:j.a,VIcon:y.a,VMenu:V.a,VRow:v.a,VSelect:A.a,VSpacer:B.a,VTextField:F.a});var K={components:{userRecordNav:m,ownerCard:Y,petCard:J,petDialog:G},data:function(){return{ownerDetail:{}}},computed:{one_customer:function(){return this.check_customer()}},methods:{check_customer:function(){return this.$store.getters.getCustomerById(this.$route.params.owner)}},validate:function(t){var e=t.params;return t.store.state.customerState.some((function(t){return t.id===e.owner}))}},W=Object(n.a)(K,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("userRecordNav",{attrs:{title:this.one_customer.name}}),this._v(" "),e("div",{staticClass:"custom-container"},[e("ownerCard",{attrs:{owner:this.one_customer}}),this._v(" "),e("div",{staticClass:"pt-5"},[e("petCard",{attrs:{customer:this.one_customer}})],1)],1),this._v(" "),e("petDialog")],1)}),[],!1,null,null,null);e.default=W.exports}}]);