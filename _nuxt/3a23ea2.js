(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{354:function(t,e,n){"use strict";n.r(e);var r={props:{dataTable:{default:null,type:Object,required:!1}},data:function(){return{petCardHidden:!this.$vuetify.breakpoint.smAndDown,actionBtn:[{text:"ประวัติการรักษา",path:"/history/"+this.$route.params.queue},{text:"ทำนัด",path:"/appoint/"+this.$route.params.queue},{text:"Admit",path:"/history/"+this.$route.params.queue},{text:"แจ้งตาย",path:"/history/"+this.$route.params.queue},{text:"แนบไฟล์ภาพ",path:"/insertImg/"+this.$route.params.queue},{text:"จบการรักษา",path:"/history/"+this.$route.params.queue}]}},computed:{loopOnce:function(){var t={weight:{header:"Weight",value:"",unit:"Kg"},temp:{header:"Temp.",value:"",unit:"F"},bp:{header:"BP",value:"",unit:"bpm"},r:{header:"RR",value:"",unit:""}};return t.temp.value=this.TempNotBlank(this.dataTable.VS),t.r.value=this.RRNotBlank(this.dataTable.VS),t.bp.value=this.SysNotBlank(this.dataTable.VS)+"/"+this.DiaNotBlank(this.dataTable.VS),t.weight.value=this.WeightNotBlank(this.dataTable.VS),t}},methods:{TempNotBlank:function(data){for(var t in data)if(""!==data[t].Temp)return data[t].Temp},RRNotBlank:function(data){for(var t in data)if(""!==data[t].R)return data[t].R},SysNotBlank:function(data){for(var t in data)if(""!==data[t].SysBp)return data[t].SysBp},DiaNotBlank:function(data){for(var t in data)if(""!==data[t].DiaBp)return data[t].DiaBp},WeightNotBlank:function(data){for(var t in data)if(""!==data[t].Weight)return data[t].Weight}}},l=n(53),o=n(99),c=n.n(o),d=n(143),v=n(361),X=n(343),h=n(518),m=n(377),f=n(100),_=n(138),x=n(201),C=n(519),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"elevation-4",attrs:{"max-height":"100%"}},[r("v-card-title",{staticClass:"pb-1 pt-3"},[t._v("\n    ข้อมูลเจ้าของสัตว์ และสัตว์เลี้ยง\n  ")]),t._v(" "),r("v-divider",{staticClass:"darker-divider"}),t._v(" "),r("div",{staticClass:"pa-4"},[r("v-row",{attrs:{justify:"center",align:"center",dense:""}},[r("v-col",{attrs:{cols:"4"}},[r("v-img",{attrs:{src:n(358),width:"100"}})],1),t._v(" "),r("v-col",{attrs:{cols:"8"}},[r("v-row",{staticClass:"font-weight-bold",attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"5"}},[t._v("ชื่อสัตว์เลี้ยง")]),t._v(" "),r("v-col",{attrs:{cols:"1"}},[t._v(":")]),t._v(" "),r("v-col",{attrs:{cols:"6"}},[t._v("Snow")])],1),t._v(" "),r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"5"}},[t._v("ประเภท")]),t._v(" "),r("v-col",{attrs:{cols:"1"}},[t._v(":")]),t._v(" "),r("v-col",{attrs:{cols:"6"}},[t._v("หมา")])],1),t._v(" "),r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"5"}},[t._v("เพศ")]),t._v(" "),r("v-col",{attrs:{cols:"1"}},[t._v(":")]),t._v(" "),r("v-col",{attrs:{cols:"6"}},[t._v("เมีย")])],1),t._v(" "),r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"5"}},[t._v("อายุ")]),t._v(" "),r("v-col",{attrs:{cols:"1"}},[t._v(":")]),t._v(" "),r("v-col",{attrs:{cols:"6"}},[t._v("5 ปี 8 เดือน")])],1)],1)],1)],1),t._v(" "),r("v-expand-transition",[r("div",{directives:[{name:"show",rawName:"v-show",value:t.petCardHidden,expression:"petCardHidden"}]},[r("v-divider",{staticClass:"dash-divider"}),t._v(" "),r("div",{staticClass:"pa-4"},[r("v-row",{attrs:{justify:"center",align:"center",dense:""}},[r("v-col",{attrs:{cols:"4"}},[r("v-img",{attrs:{src:n(357),width:"100"}})],1),t._v(" "),r("v-col",{attrs:{cols:"8"}},[r("span",{staticClass:"font-weight-bold"},[t._v("คุณสมประสงค์ ดำยศ")]),r("br"),t._v(" "),r("span",[t._v("เบอร์ติดต่อ : 098-112-4456")])])],1)],1),t._v(" "),"check"==t.$route.params.page?r("div",[r("v-divider",{staticClass:"dash-divider hidden-md-and-down"}),t._v(" "),r("div",{staticClass:"px-3 pt-1 hidden-sm-and-down"},t._l(t.actionBtn,(function(e){return r("v-btn",{key:e.index,staticClass:"cusblue3 font-weight-regular text-capitalize my-2",attrs:{to:e.path,block:"",depressed:"",dark:""}},[t._v(t._s(e.text))])})),1)],1):r("div",[r("v-divider",{staticClass:"dash-divider hidden-md-and-down"}),t._v(" "),r("div",{staticClass:"hidden-sm-and-down"},[r("div",{staticClass:"pa-3"},[r("span",{staticClass:"font-weight-bold"},[t._v("Vital Sign")]),t._v(" "),t._l(t.loopOnce,(function(e){return r("v-row",{key:e.index,staticClass:"text-left",attrs:{align:"center",justify:"center","no-gutters":""}},[r("v-col",{staticClass:"font-weight-medium",attrs:{cols:"5"}},[t._v(t._s(e.header))]),t._v(" "),r("v-col",{attrs:{cols:"5"}},[t._v(t._s(e.value))]),t._v(" "),r("v-col",{attrs:{cols:"2"}},[t._v(t._s(e.unit))])],1)}))],2),t._v(" "),r("v-divider",{staticClass:"dash-divider hidden-md-and-down"}),t._v(" "),r("div",{staticClass:"pa-3"},[r("span",{staticClass:"font-weight-bold"},[t._v("DX (Differential Diagnosis)")]),t._v(" "),r("div",[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.dataTable.DX,expression:"dataTable.DX"}],staticClass:"custom-textarea",attrs:{readonly:!0},domProps:{value:t.dataTable.DX},on:{input:function(e){e.target.composing||t.$set(t.dataTable,"DX",e.target.value)}}})])])],1)],1)],1)]),t._v(" "),r("v-divider",{staticClass:"dash-divider"}),t._v(" "),r("v-btn",{attrs:{color:"cusblue2",block:"",text:""},on:{click:function(e){t.petCardHidden=!t.petCardHidden}}},[r("v-icon",{directives:[{name:"show",rawName:"v-show",value:0==t.petCardHidden,expression:"petCardHidden == false"}]},[t._v("mdi-dots-horizontal")]),t._v(" "),r("v-icon",{directives:[{name:"show",rawName:"v-show",value:1==t.petCardHidden,expression:"petCardHidden == true"}]},[t._v("mdi-chevron-up")])],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:d.a,VCard:v.a,VCardTitle:X.d,VCol:h.a,VDivider:m.a,VExpandTransition:f.a,VIcon:_.a,VImg:x.a,VRow:C.a})},357:function(t,e,n){t.exports=n.p+"img/001-user.4994bf1.svg"},358:function(t,e,n){t.exports=n.p+"img/003-dog-1.50ac46b.svg"},363:function(t,e,n){var content=n(364);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("54170fb2",content,!0,{sourceMap:!1})},364:function(t,e,n){(e=n(12)(!1)).push([t.i,".theme--light.v-small-dialog__actions,.theme--light.v-small-dialog__menu-content{background:#fff}.theme--dark.v-small-dialog__actions,.theme--dark.v-small-dialog__menu-content{background:#1e1e1e}.v-small-dialog{display:block}.v-small-dialog__activator{cursor:pointer}.v-small-dialog__activator__content{display:inline-block}.v-small-dialog__content{padding:0 16px}.v-small-dialog__actions{padding:8px;text-align:right;white-space:pre}",""]),t.exports=e},367:function(t,e,n){var content=n(408);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("33a284d8",content,!0,{sourceMap:!1})},372:function(t,e,n){"use strict";var r=n(70),l=n(1);e.a=l.a.extend({name:"rippleable",directives:{ripple:r.a},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(data.staticClass="v-input--selection-controls__ripple",data.directives=data.directives||[],data.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",data)):null}}})},397:function(t,e,n){"use strict";n(363);var r=n(147),l=n(14),o=n(0),c=n(126),d=n(326),v=n(5);e.a=Object(v.a)(r.a,l.a).extend({name:"v-edit-dialog",props:{cancelText:{default:"Cancel"},large:Boolean,eager:Boolean,persistent:Boolean,saveText:{default:"Save"},transition:{type:String,default:"slide-x-reverse-transition"}},data:function(){return{isActive:!1}},watch:{isActive:function(t){t?(this.$emit("open"),setTimeout(this.focus,50)):this.$emit("close")}},methods:{cancel:function(){this.isActive=!1,this.$emit("cancel")},focus:function(){var input=this.$refs.content.querySelector("input");input&&input.focus()},genButton:function(t,text){return this.$createElement(c.a,{props:{text:!0,color:"primary",light:!0},on:{click:t}},text)},genActions:function(){var t=this;return this.$createElement("div",{class:"v-small-dialog__actions"},[this.genButton(this.cancel,this.cancelText),this.genButton((function(){t.save(t.returnValue),t.$emit("save")}),this.saveText)])},genContent:function(){var t=this;return this.$createElement("div",{staticClass:"v-small-dialog__content",on:{keydown:function(e){e.keyCode===o.x.esc&&t.cancel(),e.keyCode===o.x.enter&&(t.save(t.returnValue),t.$emit("save"))}},ref:"content"},[this.$slots.input])}},render:function(t){var e=this;return t(d.a,{staticClass:"v-small-dialog",class:this.themeClasses,props:{contentClass:"v-small-dialog__menu-content",transition:this.transition,origin:"top right",right:!0,value:this.isActive,closeOnClick:!this.persistent,closeOnContentClick:!1,eager:this.eager,light:this.light,dark:this.dark},on:{input:function(t){return e.isActive=t}},scopedSlots:{activator:function(n){var r=n.on;return t("div",{staticClass:"v-small-dialog__activator",on:r},[t("span",{staticClass:"v-small-dialog__activator__content"},e.$slots.default)])}}},[this.genContent(),this.large?this.genActions():null])}})},407:function(t,e,n){"use strict";var r=n(367);n.n(r).a},408:function(t,e,n){(e=n(12)(!1)).push([t.i,".v-rating .v-btn:not(.v-btn--round).v-size--x-small{min-width:25px;height:15px}.v-rating .left{border-radius:10px 0 0 10px}.v-rating .right{border-radius:0 10px 10px 0}.v-rating .vl{border-left:5px solid hsla(0,0%,52.2%,.8);height:18px}",""]),t.exports=e},409:function(t,e,n){var content=n(410);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("5939d713",content,!0,{sourceMap:!1})},410:function(t,e,n){(e=n(12)(!1)).push([t.i,".v-rating{max-width:100%;white-space:nowrap}.v-rating .v-icon{padding:.5rem;border-radius:50%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:none}.v-rating .v-icon:after{display:none}.v-application--is-ltr .v-rating .v-icon{transform:scaleX(1)}.v-application--is-rtl .v-rating .v-icon{transform:scaleX(-1)}.v-rating--readonly .v-icon{pointer-events:none}.v-rating--dense .v-icon{padding:.1rem}",""]),t.exports=e},421:function(t,e,n){"use strict";n(23);var r={props:{num:{type:Number,required:!0}},data:function(){return{numRate:this.num,colors:["#ff5252","#ffde3c","#1adf27","#ffde3c","#ff5252"]}},methods:{genColor:function(i){return this.colors[i]},toStat:function(t){switch(t){case 1:return"Low";case 2:return"Nomal Low";case 3:return"Nomal";case 4:return"Nomal High";case 5:return"High"}},checkClass:function(t){var e;switch(t){case 0:e="left";break;case 4:e="right"}return e}}},l=(n(407),n(53)),o=n(99),c=n.n(o),d=n(143),v=n(497),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-rating",{attrs:{length:"5","empty-icon":"mdi-square","x-small":"",dense:"",readonly:""},scopedSlots:t._u([{key:"item",fn:function(e){return[n("v-btn",{class:t.checkClass(e.index),attrs:{color:t.genColor(e.index),"x-small":"",tile:"",depressed:""},on:{click:e.click}},[e.index+1==t.numRate?n("div",{staticClass:"vl"}):t._e()])]}}]),model:{value:t.numRate,callback:function(e){t.numRate=e},expression:"numRate"}})}),[],!1,null,null,null);e.a=component.exports;c()(component,{VBtn:d.a,VRating:v.a})},497:function(t,e,n){"use strict";n(156),n(23),n(409);var r=n(62),l=n(25),o=n(107),c=n(106),d=n(372),v=n(14),X=n(0),h=n(5);e.a=Object(h.a)(l.a,o.a,d.a,c.a,v.a).extend({name:"v-rating",props:{backgroundColor:{type:String,default:"accent"},color:{type:String,default:"primary"},clearable:Boolean,dense:Boolean,emptyIcon:{type:String,default:"$ratingEmpty"},fullIcon:{type:String,default:"$ratingFull"},halfIcon:{type:String,default:"$ratingHalf"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,size:[Number,String],value:{type:Number,default:0}},data:function(){return{hoverIndex:-1,internalValue:this.value}},computed:{directives:function(){return this.readonly||!this.ripple?[]:[{name:"ripple",value:{circle:!0}}]},iconProps:function(){var t=this.$props,e=t.dark,n=t.large,r=t.light,l=t.medium,small=t.small;return{dark:e,large:n,light:r,medium:l,size:t.size,small:small,xLarge:t.xLarge,xSmall:t.xSmall}},isHovering:function(){return this.hover&&this.hoverIndex>=0}},watch:{internalValue:function(t){t!==this.value&&this.$emit("input",t)},value:function(t){this.internalValue=t}},methods:{createClickFn:function(i){var t=this;return function(e){if(!t.readonly){var n=t.genHoverIndex(e,i);t.clearable&&t.internalValue===n?t.internalValue=0:t.internalValue=n}}},createProps:function(i){var t={index:i,value:this.internalValue,click:this.createClickFn(i),isFilled:Math.floor(this.internalValue)>i,isHovered:Math.floor(this.hoverIndex)>i};return this.halfIncrements&&(t.isHalfHovered=!t.isHovered&&(this.hoverIndex-i)%1>0,t.isHalfFilled=!t.isFilled&&(this.internalValue-i)%1>0),t},genHoverIndex:function(t,i){var e=this.isHalfEvent(t);return this.halfIncrements&&this.$vuetify.rtl&&(e=!e),i+(e?.5:1)},getIconName:function(t){var e=this.isHovering?t.isHovered:t.isFilled,n=this.isHovering?t.isHalfHovered:t.isHalfFilled;return e?this.fullIcon:n?this.halfIcon:this.emptyIcon},getColor:function(t){if(this.isHovering){if(t.isHovered||t.isHalfHovered)return this.color}else if(t.isFilled||t.isHalfFilled)return this.color;return this.backgroundColor},isHalfEvent:function(t){if(this.halfIncrements){var rect=t.target&&t.target.getBoundingClientRect();if(rect&&t.pageX-rect.left<rect.width/2)return!0}return!1},onMouseEnter:function(t,i){var e=this;this.runDelay("open",(function(){e.hoverIndex=e.genHoverIndex(t,i)}))},onMouseLeave:function(){var t=this;this.runDelay("close",(function(){return t.hoverIndex=-1}))},genItem:function(i){var t=this,e=this.createProps(i);if(this.$scopedSlots.item)return this.$scopedSlots.item(e);var n={click:e.click};return this.hover&&(n.mouseenter=function(e){return t.onMouseEnter(e,i)},n.mouseleave=this.onMouseLeave,this.halfIncrements&&(n.mousemove=function(e){return t.onMouseEnter(e,i)})),this.$createElement(r.a,this.setTextColor(this.getColor(e),{attrs:{tabindex:-1},directives:this.directives,props:this.iconProps,on:n}),[this.getIconName(e)])}},render:function(t){var e=this,n=Object(X.h)(Number(this.length)).map((function(i){return e.genItem(i)}));return t("div",{staticClass:"v-rating",class:{"v-rating--readonly":this.readonly,"v-rating--dense":this.dense}},n)}})},537:function(t,e,n){"use strict";n.r(e);var r=n(354),l={components:{labResult:n(421).a},data:function(){return{headers:[{text:"รายการ",value:"list",align:"left",width:"180",sortable:!1},{text:"ชื่อแล็บ",value:"lab",align:"center",width:"",sortable:!1},{text:"ผล",value:"result",align:"center",width:"",sortable:!1},{text:"หน่วย",value:"unit",align:"center",width:"",sortable:!1},{text:"ค่าปกติ",value:"normal",align:"center",width:"",sortable:!1},{text:"แปลผล",value:"tranresult",align:"left",width:"270",sortable:!1}],desserts:[{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"im text",unit:"เม็ด",normal:"50",tranresult:1},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:2},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:3},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:4},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:5},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:2},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:3},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:4},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:1},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:2},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:3},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:4},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:1},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:2},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:3},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:4},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:1},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:2},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:3},{list:"XXXXXXXXXXXXXXXX",lab:"ยา",result:"10",unit:"เม็ด",normal:"50",tranresult:4}]}},methods:{toStat:function(t){switch(t){case 1:return"Low";case 2:return"Nomal Low";case 3:return"Nomal";case 4:return"Nomal High";case 5:return"High"}}}},o=n(53),c=n(99),d=n.n(c),v=n(518),X=n(535),h=n(397),m=n(519),f=n(422),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-data-table",{staticClass:"elevation-4",attrs:{headers:t.headers,items:t.desserts,"disable-pagination":"","hide-default-footer":"","fixed-header":"",height:"calc(100vh - 110px)"},scopedSlots:t._u([{key:"item.result",fn:function(e){return[n("v-edit-dialog",{attrs:{"return-value":e.item.result},on:{"update:returnValue":function(n){return t.$set(e.item,"result",n)},"update:return-value":function(n){return t.$set(e.item,"result",n)}},scopedSlots:t._u([{key:"input",fn:function(){return[n("v-text-field",{attrs:{label:"Edit","single-line":"",counter:""},model:{value:e.item.result,callback:function(n){t.$set(e.item,"result",n)},expression:"props.item.result"}})]},proxy:!0}],null,!0)},[n("span",{staticClass:"cusblue--text"},[t._v("\n          "+t._s(e.item.result)+"\n        ")])])]}},{key:"item.normal",fn:function(e){var r=e.item;return[/^[0-9]*$/.test(r.result)?n("span",[t._v("\n        "+t._s(r.normal)+"\n      ")]):t._e()]}},{key:"item.tranresult",fn:function(e){var r=e.item;return[/^[0-9]*$/.test(r.result)?n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"4"}},[t._v(t._s(t.toStat(r.tranresult)))]),t._v(" "),n("v-col",{attrs:{cols:"8"}},[n("labResult",{attrs:{num:r.tranresult}})],1)],1):t._e()]}}],null,!0)})],1)}),[],!1,null,null,null),_=component.exports;d()(component,{VCol:v.a,VDataTable:X.a,VEditDialog:h.a,VRow:m.a,VTextField:f.a});var x={components:{OwnerPetCard:r.default,labCard:_},data:function(){return{data:{VS:[{Date:"26/12/2020",Time:"02.07",Temp:"",R:"",SysBp:"120",DiaBp:"50",Weight:"90",PainScr:"33",BCS:"44"},{Date:"03/09/2020",Time:"12.07",Temp:"200",R:"80",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"},{Date:"03/09/2020",Time:"12.07",Temp:"100",R:"555",SysBp:"120",DiaBp:"99",Weight:"10",PainScr:"50",BCS:"555"}],CC:"YYYYYYYYYYYYYYYYYYYYYYY",HT:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. \nThe point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",PE:"YYYYYYYYYYYYYYYYYYYYYYY",DX:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry standard"}}}},C=Object(o.a)(x,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"custom-container"},[e("v-row",{attrs:{dense:""}},[e("v-col",{attrs:{cols:"12",md:"4",lg:"3"}},[e("OwnerPetCard",{directives:[{name:"show",rawName:"v-show",value:!this.$vuetify.breakpoint.smAndDown,expression:"!this.$vuetify.breakpoint.smAndDown"}],attrs:{"data-table":this.data}})],1),this._v(" "),e("v-col",{attrs:{cols:"12",md:"8",lg:"9"}},[e("labCard")],1)],1)],1)])}),[],!1,null,null,null);e.default=C.exports;d()(C,{OwnerPetCard:n(354).default}),d()(C,{VCol:v.a,VRow:m.a})}}]);