(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{489:function(t,e,n){"use strict";var o=n(124),r=n(59),l=n(123),d=n(0),c=n(3),v=Object(c.a)(o.a,Object(r.a)("windowGroup","v-window-item","v-window"));e.a=v.extend().extend().extend({name:"v-window-item",directives:{Touch:l.a},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?void 0!==this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:void 0!==this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(d.g)(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var e=this;this.inTransition&&this.$nextTick((function(){e.computedTransition&&e.inTransition&&(e.windowGroup.transitionHeight=Object(d.g)(t.clientHeight))}))}},render:function(t){var e=this;return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((function(){return[e.genWindowItem()]})))}})},493:function(t,e,n){var content=n(494);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("5c8fbe94",content,!0,{sourceMap:!1})},494:function(t,e,n){(e=n(12)(!1)).push([t.i,".v-textarea textarea{align-self:stretch;flex:1 1 auto;line-height:1.75rem;max-width:100%;min-height:32px;outline:none;padding:0;width:100%}.v-textarea .v-text-field__prefix,.v-textarea .v-text-field__suffix{padding-top:2px;align-self:start}.v-textarea.v-text-field--box .v-text-field__prefix,.v-textarea.v-text-field--box textarea,.v-textarea.v-text-field--enclosed .v-text-field__prefix,.v-textarea.v-text-field--enclosed textarea{margin-top:24px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) textarea{margin-top:10px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-label{top:18px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense textarea{margin-top:6px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-outer{align-self:flex-start;margin-top:8px}.v-textarea.v-text-field--solo{align-items:flex-start}.v-textarea.v-text-field--solo .v-input__append-inner,.v-textarea.v-text-field--solo .v-input__append-outer,.v-textarea.v-text-field--solo .v-input__prepend-inner,.v-textarea.v-text-field--solo .v-input__prepend-outer{align-self:flex-start;margin-top:12px}.v-application--is-ltr .v-textarea.v-text-field--solo .v-input__append-inner{padding-left:12px}.v-application--is-rtl .v-textarea.v-text-field--solo .v-input__append-inner{padding-right:12px}.v-textarea--auto-grow textarea{overflow:hidden}.v-textarea--no-resize textarea{resize:none}.v-textarea.v-text-field--enclosed .v-text-field__slot{align-self:stretch}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:-12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-left:-12px}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-left:12px}",""]),t.exports=e},509:function(t,e,n){"use strict";n(11),n(9),n(6),n(4),n(10);var o=n(1),r=(n(17),n(493),n(460)),l=n(3);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var c=Object(l.a)(r.a);e.a=c.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},r.a.options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var input=this.$refs.input;if(input){input.style.height="0";var t=input.scrollHeight,e=parseInt(this.rows,10)*parseFloat(this.rowHeight);input.style.height=Math.max(e,t)+"px"}},genInput:function(){var input=r.a.options.methods.genInput.call(this);return input.tag="textarea",delete input.data.attrs.type,input.data.attrs.rows=this.rows,input},onInput:function(t){r.a.options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},523:function(t,e,n){"use strict";var o=n(489);e.a=o.a.extend({name:"v-tab-item",props:{id:String},methods:{genWindowItem:function(){var t=o.a.options.methods.genWindowItem.call(this);return t.data.domProps=t.data.domProps||{},t.data.domProps.id=this.id||this.value,t}}})},537:function(t,e,n){"use strict";n(11),n(9),n(6),n(4),n(10);var o=n(1),r=(n(42),n(7)),l=n(86),d=n.n(l);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var v={data:function(){return{petId:"",appointDialog:!1,valid:!1,loading:!1,alert:!1,error:"",oldAppointDialog:!1,oldAppoint:[],menuDate:!1,AppointDate:!1,AppointTime:!1,appointType:this.$store.state.form.appointType,doctor:this.$store.state.form.doctor,plusBtn:[{text:"+3",value:3},{text:"+5",value:5},{text:"+7",value:7},{text:"+30",value:30}],sendAppoint:{petId:"",appointDate:"",appointTime:"",doctor:"",cause:"",remark:"",fromVisitId:""},rules:{appointDate:[function(t){return!!t||"กรุณาเลือกวันที่นัด"}],appointTime:[function(t){return!!t||"กรุณาเลือกเวลานัด"}],cause:[function(t){return!!t||"กรุณากรอกสาเหตุการนัด"},function(t){return t.length<=1e3||"ไม่ควรกรอกสาเหตุการนัด 1000 ตัวอักษร"}],remark:[function(t){return t.length<=1e3||"ไม่ควรกรอกหมายเหตุเกิน 1000 ตัวอักษร"}]}}},computed:{selectDate:function(){return this.sendAppoint.appointDate?d()(this.sendAppoint.appointDate).format("DD/MM/YYYY"):null}},mounted:function(){var t=this;0===this.$store.state.form.doctor.length&&this.$store.dispatch("form/addDoctor").then((function(e){t.doctor=e})),0===this.$store.state.form.appointType.length&&this.$store.dispatch("form/addappointType").then((function(e){t.appointType=e}))},methods:{open:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.sendAppoint.petId=t,e.sendAppoint.appointDate=(new Date).toISOString().substr(0,10),e.sendAppoint.appointTime=d()().format("HH:mm"),n.next=5,e.$axios.$get("/api/appoints?petId=".concat(t),{progress:!1});case 5:0!==(o=n.sent).results.length?(e.oldAppoint=o.results,e.oldAppointDialog=!0):e.appointDialog=!0;case 7:case"end":return n.stop()}}),n)})))()},addText:function(text){this.sendAppoint.cause=this.sendAppoint.cause+text},showAddDialog:function(){var t=this;this.oldAppointDialog=!1,setTimeout((function(){t.appointDialog=!0}),150)},plusDate:function(t){this.sendAppoint.appointDate=d()(this.sendAppoint.appointDate).add(t,"days").format("YYYY-MM-DD")},submitAppoint:function(){var t=this;if(this.$refs.form.validate()){this.loading=!0;var e=function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},this.sendAppoint),n={petId:e.petId,doctorId:""===e.doctor?null:e.doctor,appointDate:e.appointDate,appointTime:e.appointTime,cause:e.cause,remark:e.remark,fromVisitId:void 0!==this.$route.params.queue?parseInt(this.$route.params.queue):null};this.$axios.$post("/api/appoints",n,{progress:!1}).then((function(e){t.successSubmit(e,n.petId)})).catch((function(e){t.errorSubmit(e)}))}},successSubmit:function(t,e){var n=this;setTimeout((function(){n.loading=!1,n.alert=!1,n.appointDialog=!1,n.sendAppoint.cause="",n.sendAppoint.remark="",n.$refs.form.resetValidation(),n.$emit("updateAppoint",{appointDate:t.appointDate,petId:e})}),500)},errorSubmit:function(t){this.loading=!1,this.alert=!0,this.error=t.response.data.error.message}}},f=n(41),x=n(50),m=n.n(x),h=n(486),_=n(110),D=n(183),w=n(62),k=n(464),y=n(473),A=n(638),T=n(463),$=n(465),O=n(479),C=n(184),Y=n(112),I=n(120),V=n(466),S=n(175),j=n(475),M=n(504),P=n(480),G=n(483),R=n(523),H=n(484),E=n(460),B=n(509),N=n(648),component=Object(f.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-dialog",{attrs:{"max-width":"800",scrollable:"",fullscreen:this.$vuetify.breakpoint.xsOnly},model:{value:t.appointDialog,callback:function(e){t.appointDialog=e},expression:"appointDialog"}},[n("v-card",[n("h2",{staticClass:"pa-5 pb-2"},[t._v("ทำนัด")]),t._v(" "),n("v-btn",{staticClass:"mt-4",attrs:{icon:"",absolute:"",right:""},on:{click:function(e){t.appointDialog=!1}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("v-divider",{staticClass:"darker-divider"}),t._v(" "),n("v-card-text",[n("v-form",{ref:"form",attrs:{"lazy-validation":"",autocomplete:"off"},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{attrs:{cols:"12"}},[n("v-select",{attrs:{disabled:t.loading,items:t.doctor,"item-text":"name","item-value":"id",color:"cusblue","item-color":"cusblue",label:"แพทย์ผู้ตรวจ","menu-props":{closeOnContentClick:!0}},scopedSlots:t._u([{key:"prepend-item",fn:function(){return[n("v-list-item",{style:""===t.sendAppoint.doctor?"background-color: #e2f5fc":"",attrs:{ripple:""},on:{click:function(e){t.sendAppoint.doctor=""}}},[n("v-list-item-content",[n("v-list-item-title",{class:""===t.sendAppoint.doctor?"cusblue--text":""},[t._v("\n                        ไม่ระบุแพทย์\n                      ")])],1)],1),t._v(" "),n("v-divider",{staticClass:"mt-2"})]},proxy:!0}]),model:{value:t.sendAppoint.doctor,callback:function(e){t.$set(t.sendAppoint,"doctor",e)},expression:"sendAppoint.doctor"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"6"}},[n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-text-field",t._g(t._b({ref:"bd",attrs:{disabled:t.loading,rules:t.rules.selectDate,label:"วันที่นัด",color:"cusblue","append-icon":"mdi-calendar-month",readonly:""},scopedSlots:t._u([{key:"append",fn:function(){return t._l(t.plusBtn,(function(e){return n("v-btn",{key:e.value,staticClass:"mb-1 ml-1",attrs:{color:"cusblue3 white--text",depressed:"",icon:"",small:"",outlined:""},on:{click:function(n){return t.plusDate(e.value)}}},[t._v("\n                        "+t._s(e.text)+"\n                      ")])}))},proxy:!0}],null,!0),model:{value:t.selectDate,callback:function(e){t.selectDate=e},expression:"selectDate"}},"v-text-field",r,!1),o))]}}]),model:{value:t.menuDate,callback:function(e){t.menuDate=e},expression:"menuDate"}},[t._v(" "),n("v-date-picker",{ref:"picker",attrs:{color:"cusblue",min:(new Date).toISOString().substr(0,10),value:"YYYY-mm",locale:"th","show-current":!1,scrollable:""},model:{value:t.sendAppoint.appointDate,callback:function(e){t.$set(t.sendAppoint,"appointDate",e)},expression:"sendAppoint.appointDate"}})],1)],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"6"}},[n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-text-field",t._g(t._b({attrs:{disabled:t.loading,rules:t.rules.appointTime,color:"cusblue","append-icon":"mdi-clock-outline","background-color":"white",label:"เวลา",readonly:""},model:{value:t.sendAppoint.appointTime,callback:function(e){t.$set(t.sendAppoint,"appointTime",e)},expression:"sendAppoint.appointTime"}},"v-text-field",r,!1),o))]}}]),model:{value:t.AppointTime,callback:function(e){t.AppointTime=e},expression:"AppointTime"}},[t._v(" "),n("v-time-picker",{ref:"picker",attrs:{color:"cusblue",format:"24hr",scrollable:""},model:{value:t.sendAppoint.appointTime,callback:function(e){t.$set(t.sendAppoint,"appointTime",e)},expression:"sendAppoint.appointTime"}})],1)],1),t._v(" "),n("v-col",{attrs:{cols:"12"}},[n("v-textarea",{attrs:{disabled:t.loading,rules:t.rules.cause,label:"สาเหตุการนัด",color:"cusblue","auto-grow":"","row-height":"24",rows:"1"},model:{value:t.sendAppoint.cause,callback:function(e){t.$set(t.sendAppoint,"cause",e)},expression:"sendAppoint.cause"}}),t._v(" "),t._l(t.appointType,(function(e){return n("v-chip",{key:e.id,staticClass:"mx-1",attrs:{small:""},on:{click:function(n){return t.addText(e.label)}}},[t._v("\n                "+t._s(e.label)+"\n              ")])}))],2),t._v(" "),n("v-col",{attrs:{cols:"12"}},[n("v-textarea",{attrs:{disabled:t.loading,rules:t.rules.remark,label:"หมายเหตุ",color:"cusblue","auto-grow":"","row-height":"24",rows:"1"},model:{value:t.sendAppoint.remark,callback:function(e){t.$set(t.sendAppoint,"remark",e)},expression:"sendAppoint.remark"}})],1)],1),t._v(" "),n("v-alert",{attrs:{dense:"",text:"",color:"red",transition:"scroll-y-transition",dismissible:""},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[t._v("\n            "+t._s(t.error)+"\n          ")])],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"cusblue2--text text-none",attrs:{disabled:t.loading,text:""},on:{click:function(e){t.appointDialog=!1}}},[t._v("\n          ยกเลิก\n        ")]),t._v(" "),n("v-btn",{staticClass:"cusblue2--text text-none",attrs:{disabled:!t.valid||t.loading,text:""},on:{click:t.submitAppoint}},[n("v-progress-circular",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"mr-2",attrs:{indeterminate:"",color:"cusblue2",size:15,width:2}}),t._v("\n          บันทึก\n        ")],1)],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"500",scrollable:"",fullscreen:this.$vuetify.breakpoint.xsOnly},model:{value:t.oldAppointDialog,callback:function(e){t.oldAppointDialog=e},expression:"oldAppointDialog"}},[n("v-card",[n("h2",{staticClass:"pa-5 pb-2"},[t._v("รายการนัดหมายถัดไป")]),t._v(" "),n("v-btn",{staticClass:"mt-4",attrs:{icon:"",absolute:"",right:""},on:{click:function(e){t.oldAppointDialog=!1}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("v-divider",{staticClass:"darker-divider"}),t._v(" "),n("v-tabs",{staticClass:"pb-5",attrs:{"show-arrows":"",grow:"","hide-slider":"",color:"cusblue"}},[t._l(t.oldAppoint,(function(e){return n("v-tab",{key:e.id},[n("v-icon",{attrs:{left:""}},[t._v("mdi-calendar-month")]),t._v("\n          "+t._s(t.$moment(e.appointDate).format("DD/MM/YYYY"))+"\n        ")],1)})),t._v(" "),t._l(t.oldAppoint,(function(e){return n("v-tab-item",{key:e.id},[n("v-card",{attrs:{flat:""}},[n("v-card-text",[n("v-text-field",{attrs:{label:"เจ้าของ",value:e.pet.owner.name,disabled:""}}),t._v(" "),n("v-text-field",{attrs:{label:"แพทย์",value:null!==e.doctor?e.doctor.name:"ไม่ระบุแพทย์",disabled:""}}),t._v(" "),n("v-text-field",{attrs:{label:"สัตว์เลี้ยง",value:e.pet.name+"("+e.pet.type+")",disabled:""}}),t._v(" "),n("v-text-field",{attrs:{label:"นัดเพื่อ",value:e.cause,disabled:""}}),t._v(" "),n("v-text-field",{attrs:{label:"เวลา",value:e.appointTime,disabled:""}})],1)],1)],1)}))],2),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:function(e){t.oldAppointDialog=!1}}},[t._v("\n          ยกเลิก\n        ")]),t._v(" "),n("v-btn",{attrs:{color:"cusblue2",text:""},on:{click:t.showAddDialog}},[t._v(" เพิ่ม ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;m()(component,{VAlert:h.a,VBtn:_.a,VCard:D.a,VCardActions:w.a,VCardText:w.c,VChip:k.a,VCol:y.a,VDatePicker:A.a,VDialog:T.a,VDivider:$.a,VForm:O.a,VIcon:C.a,VListItem:Y.a,VListItemContent:I.a,VListItemTitle:I.b,VMenu:V.a,VProgressCircular:S.a,VRow:j.a,VSelect:M.a,VSpacer:P.a,VTab:G.a,VTabItem:R.a,VTabs:H.a,VTextField:E.a,VTextarea:B.a,VTimePicker:N.a})},636:function(t,e,n){"use strict";n.r(e);n(42);var o=n(7),r=n(86),l=n.n(r),d={data:function(){return{startMenuDate:!1,endMenuDate:!1,nowDate:(new Date).toISOString().substr(0,10),doctor:this.$store.state.form.doctor,startDate:l()().subtract(3,"months").format("YYYY-MM-DD"),endDate:(new Date).toISOString().substr(0,10),selectDoctor:""}},computed:{start:function(){return this.startDate?l()(this.startDate).format("DD/MM/YYYY"):null},end:function(){return this.endDate?l()(this.endDate).format("DD/MM/YYYY"):null}},watch:{startDate:function(t){null!==this.endDate&&this.emitDate()},endDate:function(t){null!==this.startDate&&this.emitDate()},selectDoctor:function(t){null!==this.startDate&&null!==this.startDate&&this.emitDate()}},mounted:function(){var t=this;0===this.$store.state.form.doctor.length&&this.$store.dispatch("form/addDoctor").then((function(e){t.doctor=e}))},methods:{emitDate:function(){this.$emit("updateDate",{startDate:this.startDate,endDate:this.endDate,doctor:this.selectDoctor})}}},c=n(41),v=n(50),f=n.n(v),x=n(183),m=n(638),h=n(465),_=n(112),D=n(120),w=n(466),k=n(475),y=n(504),A=n(480),T=n(526),$=n(460),component=Object(c.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{color:"grey lighten-4",flat:"",tile:""}},[n("v-row",{class:"second-nav cusblue1 "+(this.$vuetify.breakpoint.xsOnly?"pb-2":""),attrs:{height:"55",align:"center",justify:"center",dense:"",flat:""}},[n("h1",{staticClass:"font-weight-medium col-sm-3 col-6 order-first"},[t._v("ข้อมูลนัด")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-subheader",{directives:[{name:"show",rawName:"v-show",value:!this.$vuetify.breakpoint.smAndDown,expression:"!this.$vuetify.breakpoint.smAndDown"}],staticClass:"cus-subhead"},[t._v("\n      วันที่เริ่ม :\n    ")]),t._v(" "),n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-text-field",t._g(t._b({staticClass:"rounded-lg cus-input mr-3",attrs:{"background-color":"cusblue3","append-icon":"mdi-calendar-month",dark:"",filled:"",rounded:"","single-line":"",dense:"",flat:"","hide-details":"",readonly:""},model:{value:t.start,callback:function(e){t.start=e},expression:"start"}},"v-text-field",r,!1),o))]}}]),model:{value:t.startMenuDate,callback:function(e){t.startMenuDate=e},expression:"startMenuDate"}},[t._v(" "),n("v-date-picker",{ref:"picker",attrs:{color:"cusblue",max:t.nowDate},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1),t._v(" "),n("v-subheader",{directives:[{name:"show",rawName:"v-show",value:!this.$vuetify.breakpoint.smAndDown,expression:"!this.$vuetify.breakpoint.smAndDown"}],staticClass:"cus-subhead"},[t._v("\n      วันที่สิ้นสุด :\n    ")]),t._v(" "),n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-text-field",t._g(t._b({staticClass:"rounded-lg cus-input mr-3",attrs:{"background-color":"cusblue3","append-icon":"mdi-calendar-month",dark:"",filled:"",rounded:"","single-line":"",dense:"",flat:"","hide-details":"",readonly:""},model:{value:t.end,callback:function(e){t.end=e},expression:"end"}},"v-text-field",r,!1),o))]}}]),model:{value:t.endMenuDate,callback:function(e){t.endMenuDate=e},expression:"endMenuDate"}},[t._v(" "),n("v-date-picker",{ref:"picker",attrs:{color:"cusblue",max:t.nowDate},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),n("v-subheader",{directives:[{name:"show",rawName:"v-show",value:!this.$vuetify.breakpoint.smAndDown,expression:"!this.$vuetify.breakpoint.smAndDown"}],staticClass:"cus-subhead"},[t._v("แพทย์ผู้ตรวจ :\n    ")]),t._v(" "),n("v-select",{class:t.$vuetify.breakpoint.smAndDown?"rounded-lg cus-input order-first":"rounded-lg cus-input",attrs:{items:t.doctor,"item-text":"name","item-value":"id","menu-props":{closeOnContentClick:!0},"background-color":"cusblue3","item-color":"cusblue",label:"ทั้งหมด",dark:"",filled:"",rounded:"","single-line":"",dense:"",flat:"","hide-details":""},scopedSlots:t._u([{key:"prepend-item",fn:function(){return[n("v-list-item",{style:""===t.selectDoctor?"background-color: #e2f5fc":"",attrs:{ripple:""},on:{click:function(e){t.selectDoctor=""}}},[n("v-list-item-content",[n("v-list-item-title",{class:""===t.selectDoctor?"cusblue--text":""},[t._v("\n              แสดงทั้งหมด\n            ")])],1)],1),t._v(" "),n("v-divider",{staticClass:"mt-2"})]},proxy:!0}]),model:{value:t.selectDoctor,callback:function(e){t.selectDoctor=e},expression:"selectDoctor"}})],1)],1)}),[],!1,null,null,null),O=component.exports;f()(component,{VCard:x.a,VDatePicker:m.a,VDivider:h.a,VListItem:_.a,VListItemContent:D.a,VListItemTitle:D.b,VMenu:w.a,VRow:k.a,VSelect:y.a,VSpacer:A.a,VSubheader:T.a,VTextField:$.a});var C={props:{appoint:{type:Array,required:!1,default:null}},data:function(){return{offset:!1,dialog:!1,headers:[{text:"วันที่นัด",value:"appointDate",align:"left",width:"100",sortable:!1},{text:"เวลาที่นัด",value:"appointTime",align:"left",width:"100",sortable:!1},{text:"แพทย์",value:"doctor",align:"left",width:"300",sortable:!1},{text:"สาเหตุ",value:"cause",align:"left",width:"",sortable:!1},{text:"หมายเหตุ",value:"remark",align:"left",width:"",sortable:!1}]}}},Y=n(639),I=Object(c.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-data-table",{staticClass:"elevation-4 overflow-y-auto",attrs:{headers:t.headers,items:t.appoint,"disable-pagination":"","hide-default-footer":"","fixed-header":"",height:"calc(100vh - 160px)"},scopedSlots:t._u([{key:"item.appointDate",fn:function(e){var n=e.item;return[t._v("\n      "+t._s(t.$moment(n.appointDate).format("DD/MM/YYYY"))+"\n    ")]}},{key:"item.doctor",fn:function(e){var n=e.item;return[t._v("\n      "+t._s(null!==n.doctor?n.doctor.name:"")+"\n    ")]}}],null,!0)})],1)}),[],!1,null,null,null),V=I.exports;f()(I,{VDataTable:Y.a});var S={components:{appointNav:O,appointTable:V,appointDialog:n(537).a},validate:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,r,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.$axios,o=t.params,t.query,!(r=t.store).getters.loggedInUser.roles.some((function(t){return 2===t.id}))&&!r.getters.loggedInUser.isAdmin){e.next=12;break}return e.next=4,n.$get("/api/visits/".concat(o.queue),{progress:!1});case 4:if(1!==(l=e.sent).visitStatus.id&&2!==l.visitStatus.id&&3!==l.visitStatus.id&&4!==l.visitStatus.id){e.next=9;break}return e.abrupt("return",!0);case 9:return e.abrupt("return",!1);case 10:e.next=13;break;case 12:return e.abrupt("return",!1);case 13:case"end":return e.stop()}}),e)})))()},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,r,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$axios,o=t.params,e.next=3,n.$get("/api/visits/".concat(o.queue),{progress:!1});case 3:return r=e.sent,e.next=6,n.$get("/api/appoints?petId=".concat(r.pet.id,"&dateRange0=").concat(l()().subtract(3,"months").format("YYYY-MM-DD"),"&dateRange1=").concat(l()().format("YYYY-MM-DD")),{progress:!1});case 6:return d=e.sent,e.abrupt("return",{appoint:d.results,visit:r});case 8:case"end":return e.stop()}}),e)})))()},data:function(){return{defaultSelect:{doctor:"",endDate:l()().format("YYYY-MM-DD"),startDate:l()().subtract(3,"months").format("YYYY-MM-DD")}}},methods:{openAppoint:function(t){this.$refs.appDialog.open(t)},updateDate:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.defaultSelect=t,n.next=3,e.$axios.$get("/api/appoints?petId=".concat(e.visit.pet.id,"&dateRange0=").concat(t.startDate,"&dateRange1=").concat(t.endDate,"&").concat(""!==t.doctor?"doctorId=".concat(t.doctor):""),{progress:!1});case 3:o=n.sent,e.appoint=o.results;case 5:case"end":return n.stop()}}),n)})))()},updateAppoint:function(t){this.updateDate(this.defaultSelect)}}},j=n(110),M=n(184),P=Object(c.a)(S,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("appointNav",{on:{updateDate:t.updateDate}}),t._v(" "),n("div",{staticClass:"custom-container"},[n("appointTable",{attrs:{appoint:t.appoint}})],1),t._v(" "),n("appointDialog",{ref:"appDialog",on:{updateAppoint:t.updateAppoint}}),t._v(" "),n("v-btn",{key:t.$nuxt.$route.path,attrs:{color:"cusblue2",fixed:"",fab:"",small:this.$vuetify.breakpoint.mobile,large:!this.$vuetify.breakpoint.mobile,dark:"",bottom:"",right:""},on:{click:function(e){return e.stopPropagation(),t.openAppoint(t.visit.pet.id)}}},[n("v-icon",[t._v("mdi-plus")])],1)],1)}),[],!1,null,null,null);e.default=P.exports;f()(P,{VBtn:j.a,VIcon:M.a})}}]);