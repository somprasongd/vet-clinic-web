(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{343:function(t,r,e){"use strict";e.d(r,"a",(function(){return c})),e.d(r,"b",(function(){return l})),e.d(r,"c",(function(){return d})),e.d(r,"d",(function(){return f}));var n=e(361),o=e(0),c=Object(o.i)("v-card__actions"),l=Object(o.i)("v-card__subtitle"),d=Object(o.i)("v-card__text"),f=Object(o.i)("v-card__title");n.a},380:function(t,r,e){"use strict";e.d(r,"a",(function(){return o}));e(83),e(6),e(4),e(9);var n=e(1);function o(t){return n.a.extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(r,e){var n=e.props,data=e.data,o=e.children;data.staticClass="".concat(t," ").concat(data.staticClass||"").trim();var c=data.attrs;if(c){data.attrs={};var l=Object.keys(c).filter((function(t){if("slot"===t)return!1;var r=c[t];return t.startsWith("data-")?(data.attrs[t]=r,!1):r||"string"==typeof r}));l.length&&(data.staticClass+=" ".concat(l.join(" ")))}return n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),r(n.tag,data,o)}})}},389:function(t,r,e){"use strict";var n=e(1),o=e(0);r.a=n.a.extend({name:"comparable",props:{valueComparator:{type:Function,default:o.j}}})},399:function(t,r,e){"use strict";e(10),e(8),e(9);var n=e(2),o=(e(63),e(6),e(4),e(152),e(29),e(34),e(5)),c=e(71),l=e(101);function d(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(r){Object(n.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}r.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var r=Object.values(t).includes(!0);this.$emit("input",!r)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,r=function(input){return input.$watch("hasError",(function(r){t.$set(t.errorBag,input._uid,r)}),{immediate:!0})},e={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?e.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(e.valid=r(input)))})):e.valid=r(input),e},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var r=this.watchers.find((function(i){return i._uid===t._uid}));r&&(r.valid(),r.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var r=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return r.$emit("submit",t)}}},this.$slots.default)}})},513:function(t,r,e){t.exports=e.p+"img/VetClinicLogo.f14098d.png"},514:function(t,r,e){t.exports=e.p+"img/DogCat.e2b08b0.png"},536:function(t,r,e){"use strict";e.r(r);var n={data:function(){return{color:"cusblue",showPass:!1,rmbrMe:!1,loginData:{username:"",password:""}}},methods:{submitLogin:function(){alert("username : "+this.loginData.username+"\n password : "+this.loginData.password)},rmbr:function(){this.rmbrMe,alert(this.rmbrMe)}}},o=e(53),c=e(99),l=e.n(c),d=e(143),f=e(361),h=e(343),m=e(540),v=e(399),w=e(201),y=e(422),component=Object(o.a)(n,(function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("v-card",{staticClass:"elevation-4",attrs:{rounded:"0",color:"white"}},[n("v-card-text",[n("div",{attrs:{align:"center"}},[n("v-img",{attrs:{width:"300",src:e(513)}}),t._v(" "),n("v-img",{attrs:{width:"400",src:e(514)}})],1),t._v(" "),n("v-form",{staticClass:"pr-15 pl-15",attrs:{autocomplete:"off"},on:{submit:t.submitLogin}},[n("v-text-field",{attrs:{color:t.color,type:"text",name:"username",label:"username"},model:{value:t.loginData.username,callback:function(r){t.$set(t.loginData,"username",r)},expression:"loginData.username"}}),t._v(" "),n("v-text-field",{attrs:{color:t.color,type:t.showPass?"text":"password",name:"password",label:"password","append-icon":t.showPass?"mdi-eye":"mdi-eye-off"},on:{"click:append":function(r){t.showPass=!t.showPass}},model:{value:t.loginData.password,callback:function(r){t.$set(t.loginData,"password",r)},expression:"loginData.password"}}),t._v(" "),n("v-btn",{staticClass:"cusblue text-none white--text",attrs:{color:t.color,type:"submit",block:"",rounded:"",large:"",depressed:""}},[t._v("Sign in to your account")]),t._v(" "),n("v-checkbox",{attrs:{label:"Remember me",color:t.color},on:{click:t.rmbr},model:{value:t.rmbrMe,callback:function(r){t.rmbrMe=r},expression:"rmbrMe"}})],1)],1)],1)}),[],!1,null,null,null),_=component.exports;l()(component,{VBtn:d.a,VCard:f.a,VCardText:h.c,VCheckbox:m.a,VForm:v.a,VImg:w.a,VTextField:y.a});var O={components:{LoginForm:_},layout:"LoginLayout"},j=e(518),x=(e(83),e(6),e(4),e(9),e(346),e(394),e(380)),V=e(81),P=Object(x.a)("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,r){var e,n=r.props,data=r.data,o=r.children,c=data.attrs;return c&&(data.attrs={},e=Object.keys(c).filter((function(t){if("slot"===t)return!1;var r=c[t];return t.startsWith("data-")?(data.attrs[t]=r,!1):r||"string"==typeof r}))),n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),t(n.tag,Object(V.a)(data,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(e||[])}),o)}}),C=e(519),B=Object(o.a)(O,(function(){var t=this.$createElement,r=this._self._c||t;return r("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[r("LoginForm"),this._v(" "),r("v-btn",{attrs:{color:"primary",to:"/queue"}},[this._v("Next")])],1)],1)],1)}),[],!1,null,null,null);r.default=B.exports;l()(B,{VBtn:d.a,VCol:j.a,VContainer:P,VRow:C.a})}}]);