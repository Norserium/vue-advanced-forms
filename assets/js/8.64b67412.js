(window.webpackJsonp=window.webpackJsonp||[]).push([[8,16,17],{146:function(e,t,a){},147:function(e,t,a){},149:function(e,t,a){"use strict";var c=a(146);a.n(c).a},150:function(e,t,a){"use strict";a.r(t);var c={},l=(a(149),a(29)),n=Object(l.a)(c,(function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"example-wrapper"},[this._t("default")],2)}),[],!1,null,null,null);t.default=n.exports},151:function(e,t,a){"use strict";var c=a(147);a.n(c).a},152:function(e,t,a){"use strict";a.r(t);var c={props:{title:{type:String},value:{type:Object}}},l=(a(151),a(29)),n=Object(l.a)(c,(function(){var e=this.$createElement,t=this._self._c||e;return t("pre",{staticClass:"data-output"},[t("strong",[this._v(this._s(this.title))]),this._v(" = "+this._s(JSON.stringify(this.value,null,2))+"\n")])}),[],!1,null,null,null);t.default=n.exports},290:function(e,t,a){"use strict";a.r(t);var c=a(150),l=a(152),n=a(148),r={components:{Field:n.a,VueForm:n.e,InputComponent:n.InputComponent,DataOutput:l.default,ExampleWrapper:c.default}},i=a(29),s=Object(i.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ExampleWrapper",[a("vue-form",{scopedSlots:e._u([{key:"default",fn:function(t){return[a("field",{attrs:{name:"choice","default-value":[]},scopedSlots:e._u([{key:"default",fn:function(t){return[a("label",[a("input",e._g({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],attrs:{type:"checkbox",value:"first-choice"},domProps:{checked:Array.isArray(t.value)?e._i(t.value,"first-choice")>-1:t.value},on:{change:function(a){var c=t.value,l=a.target,n=!!l.checked;if(Array.isArray(c)){var r="first-choice",i=e._i(c,r);l.checked?i<0&&e.$set(t,"value",c.concat([r])):i>-1&&e.$set(t,"value",c.slice(0,i).concat(c.slice(i+1)))}else e.$set(t,"value",n)}}},t.events)),e._v("\n\t\t\t\tFirst Choice\n\t\t\t")]),e._v(" "),a("label",[a("input",e._g({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],attrs:{type:"checkbox",value:"second-choice"},domProps:{checked:Array.isArray(t.value)?e._i(t.value,"second-choice")>-1:t.value},on:{change:function(a){var c=t.value,l=a.target,n=!!l.checked;if(Array.isArray(c)){var r="second-choice",i=e._i(c,r);l.checked?i<0&&e.$set(t,"value",c.concat([r])):i>-1&&e.$set(t,"value",c.slice(0,i).concat(c.slice(i+1)))}else e.$set(t,"value",n)}}},t.events)),e._v("\n\t\t\t\tSecond Choice\n\t\t\t")]),e._v(" "),a("label",[a("input",e._g({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],attrs:{type:"checkbox",value:"third-choice"},domProps:{checked:Array.isArray(t.value)?e._i(t.value,"third-choice")>-1:t.value},on:{change:function(a){var c=t.value,l=a.target,n=!!l.checked;if(Array.isArray(c)){var r="third-choice",i=e._i(c,r);l.checked?i<0&&e.$set(t,"value",c.concat([r])):i>-1&&e.$set(t,"value",c.slice(0,i).concat(c.slice(i+1)))}else e.$set(t,"value",n)}}},t.events)),e._v("\n\t\t\t\tThird Choice\n\t\t\t")])]}}],null,!0)}),e._v(" "),a("DataOutput",{attrs:{title:"values",value:t.values}})]}}])})],1)}),[],!1,null,null,null);t.default=s.exports}}]);