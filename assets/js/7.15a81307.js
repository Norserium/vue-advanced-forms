(window.webpackJsonp=window.webpackJsonp||[]).push([[7,18,19],{146:function(t,e,a){},147:function(t,e,a){},148:function(t,e,a){"use strict";var l=a(146);a.n(l).a},149:function(t,e,a){"use strict";a.r(e);var l={props:["title"]},n=(a(148),a(29)),s=Object(n.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"example-wrapper"},[this.title?e("div",{staticClass:"example-wrapper__title"},[this._v("\n\t\t"+this._s(this.title)+"\n\t")]):this._e(),this._v(" "),e("div",{staticClass:"example-wrapper__content"},[this._t("default")],2)])}),[],!1,null,null,null);e.default=s.exports},151:function(t,e,a){"use strict";var l=a(147);a.n(l).a},152:function(t,e,a){"use strict";a.r(e);var l={props:{title:{type:String},value:{type:Object}}},n=(a(151),a(29)),s=Object(n.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("pre",{staticClass:"data-output"},[e("strong",[this._v(this._s(this.title))]),this._v(" = "+this._s(JSON.stringify(this.value,null,2))+"\n")])}),[],!1,null,null,null);e.default=s.exports},288:function(t,e,a){"use strict";a.r(e);var l=a(149),n=a(152),s=a(150),u={components:{Field:s.a,VueForm:s.e,InputComponent:s.InputComponent,ExampleWrapper:l.default,DataOutput:n.default}},i=a(29),r=Object(i.a)(u,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ExampleWrapper",[a("vue-form",{scopedSlots:t._u([{key:"default",fn:function(e){return[a("field",{attrs:{name:"boolean","default-value":!1,validation:"required"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("label",[a("input",t._g({directives:[{name:"model",rawName:"v-model",value:e.value,expression:"field.value"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.value)?t._i(e.value,null)>-1:e.value},on:{change:function(a){var l=e.value,n=a.target,s=!!n.checked;if(Array.isArray(l)){var u=t._i(l,null);n.checked?u<0&&t.$set(e,"value",l.concat([null])):u>-1&&t.$set(e,"value",l.slice(0,u).concat(l.slice(u+1)))}else t.$set(e,"value",s)}}},e.events)),t._v("\n\t\t\t\tBoolean Checkbox\n\t\t\t")])]}}],null,!0)}),t._v(" "),a("DataOutput",{attrs:{title:"values",value:e.values}})]}}])})],1)}),[],!1,null,null,null);e.default=r.exports}}]);