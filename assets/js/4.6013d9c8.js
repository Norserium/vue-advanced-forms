(window.webpackJsonp=window.webpackJsonp||[]).push([[4,19],{155:function(e,t,r){},157:function(e,t,r){"use strict";var n=r(102),i=r(8),a=r(15),l=r(17),o=r(103),u=r(104);n("match",1,(function(e,t,r){return[function(t){var r=l(this),n=null==t?void 0:t[e];return void 0!==n?n.call(t,r):new RegExp(t)[e](String(r))},function(e){var n=r(t,e,this);if(n.done)return n.value;var l=i(e),s=String(this);if(!l.global)return u(l,s);var c=l.unicode;l.lastIndex=0;for(var d,v=[],p=0;null!==(d=u(l,s));){var f=String(d[0]);v[p]=f,""===f&&(l.lastIndex=o(s,a(l.lastIndex),c)),p++}return 0===p?null:v}]}))},193:function(e,t,r){"use strict";var n=r(155);r.n(n).a},194:function(e,t,r){},198:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}r.d(t,"a",(function(){return a}))},208:function(e,t,r){"use strict";r.r(t);var n={components:{Field:r(148).a},props:["validation","validationOptions"],inheritAttrs:!1},i=(r(193),r(29)),a=Object(i.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("field",{staticClass:"field-multiple-errors",attrs:{validation:e.validation,"valitation-options":e.validationOptions},scopedSlots:e._u([{key:"default",fn:function(t){return["checkbox"===e.$attrs.type?r("input",e._g(e._b({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],class:["field-multiple-errors__input",t.meta.error.length?"field-multiple-errors__input--invalid":""],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.value)?e._i(t.value,null)>-1:t.value},on:{change:function(r){var n=t.value,i=r.target,a=!!i.checked;if(Array.isArray(n)){var l=e._i(n,null);i.checked?l<0&&e.$set(t,"value",n.concat([null])):l>-1&&e.$set(t,"value",n.slice(0,l).concat(n.slice(l+1)))}else e.$set(t,"value",a)}}},"input",e.$attrs,!1),t.events)):"radio"===e.$attrs.type?r("input",e._g(e._b({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],class:["field-multiple-errors__input",t.meta.error.length?"field-multiple-errors__input--invalid":""],attrs:{type:"radio"},domProps:{checked:e._q(t.value,null)},on:{change:function(r){return e.$set(t,"value",null)}}},"input",e.$attrs,!1),t.events)):r("input",e._g(e._b({directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],class:["field-multiple-errors__input",t.meta.error.length?"field-multiple-errors__input--invalid":""],attrs:{type:e.$attrs.type},domProps:{value:t.value},on:{input:function(r){r.target.composing||e.$set(t,"value",r.target.value)}}},"input",e.$attrs,!1),t.events)),e._v(" "),t.meta.error.length?r("div",{staticClass:"field-multiple-errors__errors"},e._l(t.meta.error,(function(t){return r("div",[e._v("\n\t\t\t- "+e._s(t)+"\n\t\t")])})),0):e._e(),e._v("\n\t"+e._s(t.meta)+"\n")]}}])})}),[],!1,null,null,null);t.default=a.exports},280:function(e,t,r){"use strict";var n=r(194);r.n(n).a},289:function(e,t,r){"use strict";r.r(t);r(204),r(30),r(157);var n=r(198),i=r(148),a=r(208),l=Object(i.f)(i.e,{fieldMeta:Object(n.a)({},i.g.fieldMeta,{error:{default:[],validate:!0}}),formMeta:Object(n.a)({},i.g.formMeta,{valid:{default:!0,computed:function(e){return e.form.getFields().every((function(e){return!e.$mounted||!e.meta.invalid}))}}})}),o={components:{Field:a.default,CustomForm:l,VueForm:i.e},methods:{validate:function(e){var t=[];return e.length<4&&t.push("Mimimum number of symbols is 4"),e.match(/\d/)||t.push("Password should contain numbers"),e.match(/\W/)||t.push("Password should contain symbols"),{error:t}}}},u=(r(280),r(29)),s=Object(u.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"example"},[t("CustomForm",[t("Field",{attrs:{placeholder:"Login",name:"login"}}),this._v(" "),t("Field",{attrs:{placeholder:"Password",name:"password",validation:this.validate}})],1)],1)}),[],!1,null,null,null);t.default=s.exports}}]);