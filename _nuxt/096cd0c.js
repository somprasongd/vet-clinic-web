(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{413:function(t,e,n){"use strict";n(10),n(7),n(6),n(4),n(8);var r=n(2),o=(n(414),n(15)),l=n(5);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(l.a)(o.a).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:d({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})},414:function(t,e,n){var content=n(415);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("e8b41e5e",content,!0,{sourceMap:!1})},415:function(t,e,n){(e=n(12)(!1)).push([t.i,".theme--light.v-subheader{color:rgba(0,0,0,.6)}.theme--dark.v-subheader{color:hsla(0,0%,100%,.7)}.v-subheader{align-items:center;display:flex;height:48px;font-size:.875rem;font-weight:400;padding:0 16px}.v-subheader--inset{margin-left:56px}",""]),t.exports=e},548:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{date:null,menuDate:!1}}},o=n(55),l=n(74),c=n.n(l),d=n(350),v=n(550),f=n(354),h=n(364),m=n(367),x=n(413),w=n(446),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{color:"grey lighten-4",flat:"",tile:""}},[n("v-row",{staticClass:"second-nav cusblue1",attrs:{height:"55",align:"center",justify:"center",dense:"",flat:""}},[n("h1",{staticClass:"font-weight-medium col-sm-4 col-12"},[t._v("รายงาน")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-subheader",{directives:[{name:"show",rawName:"v-show",value:!this.$vuetify.breakpoint.smAndDown,expression:"!this.$vuetify.breakpoint.smAndDown"}],staticClass:"cus-subhead"},[t._v("วันที่ :\n    ")]),t._v(" "),n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-text-field",t._g(t._b({staticClass:"rounded-lg",staticStyle:{"max-width":"200px"},attrs:{"background-color":"cusblue3","append-icon":"mdi-calendar-month",dark:"",filled:"",rounded:"","single-line":"",dense:"",flat:"","hide-details":"",readonly:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},"v-text-field",o,!1),r))]}}]),model:{value:t.menuDate,callback:function(e){t.menuDate=e},expression:"menuDate"}},[t._v(" "),n("v-date-picker",{ref:"picker",attrs:{color:"cusblue",max:(new Date).toISOString().substr(0,10),min:"1950-01-01"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1)],1)}),[],!1,null,null,null),y=component.exports;c()(component,{VCard:d.a,VDatePicker:v.a,VMenu:f.a,VRow:h.a,VSpacer:m.a,VSubheader:x.a,VTextField:w.a});var O={data:function(){return{reportList:[{list:"รายงาน A"},{list:"รายงาน B"},{list:"รายงาน C"},{list:"รายงาน D"}]}}},_=n(362),k=n(157),C=n(158),j=n(99),V=n(107),D=Object(o.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"4",sm:"3",md:"2"}},[n("v-card",{staticClass:"elevation-4 custom-height"},[n("v-list",{staticClass:"py-5",attrs:{dense:""}},t._l(t.reportList,(function(e){return n("v-list-item",{key:e.index,attrs:{link:"",to:e.link}},[n("v-icon",{staticClass:"mr-3",attrs:{color:"cusblue3","x-small":""}},[t._v("mdi-record")]),t._v(" "),n("v-list-item-content",[t._v("\n            "+t._s(e.list)+"\n          ")])],1)})),1)],1)],1),t._v(" "),n("v-col",{staticClass:"pl-5",attrs:{cols:"8",sm:"9",md:"10"}},[n("v-card",{staticClass:"text-center elevation-4 custom-height"},[n("v-icon",{staticClass:"gray--text text--disabled",staticStyle:{"font-size":"80px",top:"40%"}},[t._v("mdi-pdf-box")])],1)],1)],1)}),[],!1,null,null,null),P=D.exports;c()(D,{VCard:d.a,VCol:_.a,VIcon:k.a,VList:C.a,VListItem:j.a,VListItemContent:V.a,VRow:h.a});var S={components:{reportNav:y,reportList:P}},$=Object(o.a)(S,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("reportNav"),this._v(" "),e("div",{staticClass:"custom-container"},[e("reportList")],1)],1)}),[],!1,null,null,null);e.default=$.exports}}]);