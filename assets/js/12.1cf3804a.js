(window.webpackJsonp=window.webpackJsonp||[]).push([[12,18,19],{146:function(t,e,n){},147:function(t,e,n){},148:function(t,e,n){"use strict";var s=n(146);n.n(s).a},149:function(t,e,n){"use strict";n.r(e);var s={props:["title"]},a=(n(148),n(29)),l=Object(a.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"example-wrapper"},[this.title?e("div",{staticClass:"example-wrapper__title"},[this._v("\n\t\t"+this._s(this.title)+"\n\t")]):this._e(),this._v(" "),e("div",{staticClass:"example-wrapper__content"},[this._t("default")],2)])}),[],!1,null,null,null);e.default=l.exports},151:function(t,e,n){"use strict";var s=n(147);n.n(s).a},152:function(t,e,n){"use strict";n.r(e);var s={props:{title:{type:String},value:{type:Object}}},a=(n(151),n(29)),l=Object(a.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("pre",{staticClass:"data-output"},[e("strong",[this._v(this._s(this.title))]),this._v(" = "+this._s(JSON.stringify(this.value,null,2))+"\n")])}),[],!1,null,null,null);e.default=l.exports},279:function(t,e,n){"use strict";n.r(e);var s=n(149),a=n(152),l=n(150),u={components:{Field:l.a,VueForm:l.e,InputComponent:l.InputComponent,ExampleWrapper:s.default,DataOutput:a.default}},i=n(29),r=Object(i.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ExampleWrapper",[n("vue-form",{scopedSlots:t._u([{key:"default",fn:function(e){return[n("field",{attrs:{name:"text"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("input",t._g({directives:[{name:"model",rawName:"v-model",value:e.value,expression:"field.value"}],domProps:{value:e.value},on:{input:function(n){n.target.composing||t.$set(e,"value",n.target.value)}}},e.events))]}}],null,!0)}),t._v(" "),n("DataOutput",{attrs:{title:"values",value:e.values}})]}}])})],1)}),[],!1,null,null,null);e.default=r.exports}}]);