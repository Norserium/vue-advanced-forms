(window.webpackJsonp=window.webpackJsonp||[]).push([[9,18,19],{146:function(e,t,a){},147:function(e,t,a){},148:function(e,t,a){"use strict";var l=a(146);a.n(l).a},149:function(e,t,a){"use strict";a.r(t);var l={props:["title"]},i=(a(148),a(29)),c=Object(i.a)(l,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"example-wrapper"},[this.title?t("div",{staticClass:"example-wrapper__title"},[this._v("\n\t\t"+this._s(this.title)+"\n\t")]):this._e(),this._v(" "),t("div",{staticClass:"example-wrapper__content"},[this._t("default")],2)])}),[],!1,null,null,null);t.default=c.exports},151:function(e,t,a){"use strict";var l=a(147);a.n(l).a},152:function(e,t,a){"use strict";a.r(t);var l={props:{title:{type:String},value:{type:Object}}},i=(a(151),a(29)),c=Object(i.a)(l,(function(){var e=this.$createElement,t=this._self._c||e;return t("pre",{staticClass:"data-output"},[t("strong",[this._v(this._s(this.title))]),this._v(" = "+this._s(JSON.stringify(this.value,null,2))+"\n")])}),[],!1,null,null,null);t.default=c.exports},284:function(e,t,a){"use strict";a.r(t);var l=a(149),i=a(152),c=a(150),s={components:{Field:c.a,VueForm:c.e,InputComponent:c.InputComponent,DataOutput:i.default,ExampleWrapper:l.default}},n=a(29),r=Object(n.a)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ExampleWrapper",[a("vue-form",{scopedSlots:e._u([{key:"default",fn:function(t){return[a("field",{attrs:{name:"choice","default-value":[]},scopedSlots:e._u([{key:"default",fn:function(t){return[a("label",[a("input",e._g({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],attrs:{type:"checkbox",value:"first-choice"},domProps:{checked:Array.isArray(t.value)?e._i(t.value,"first-choice")>-1:t.value},on:{change:function(a){var l=t.value,i=a.target,c=!!i.checked;if(Array.isArray(l)){var s="first-choice",n=e._i(l,s);i.checked?n<0&&e.$set(t,"value",l.concat([s])):n>-1&&e.$set(t,"value",l.slice(0,n).concat(l.slice(n+1)))}else e.$set(t,"value",c)}}},t.events)),e._v("\n\t\t\t\tFirst Choice\n\t\t\t")]),e._v(" "),a("label",[a("input",e._g({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],attrs:{type:"checkbox",value:"second-choice"},domProps:{checked:Array.isArray(t.value)?e._i(t.value,"second-choice")>-1:t.value},on:{change:function(a){var l=t.value,i=a.target,c=!!i.checked;if(Array.isArray(l)){var s="second-choice",n=e._i(l,s);i.checked?n<0&&e.$set(t,"value",l.concat([s])):n>-1&&e.$set(t,"value",l.slice(0,n).concat(l.slice(n+1)))}else e.$set(t,"value",c)}}},t.events)),e._v("\n\t\t\t\tSecond Choice\n\t\t\t")]),e._v(" "),a("label",[a("input",e._g({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],attrs:{type:"checkbox",value:"third-choice"},domProps:{checked:Array.isArray(t.value)?e._i(t.value,"third-choice")>-1:t.value},on:{change:function(a){var l=t.value,i=a.target,c=!!i.checked;if(Array.isArray(l)){var s="third-choice",n=e._i(l,s);i.checked?n<0&&e.$set(t,"value",l.concat([s])):n>-1&&e.$set(t,"value",l.slice(0,n).concat(l.slice(n+1)))}else e.$set(t,"value",c)}}},t.events)),e._v("\n\t\t\t\tThird Choice\n\t\t\t")])]}}],null,!0)}),e._v(" "),a("DataOutput",{attrs:{title:"values",value:t.values}})]}}])})],1)}),[],!1,null,null,null);t.default=r.exports}}]);