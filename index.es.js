import Vue from 'vue';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

//
// Main
//
function memoize(fn, options) {
  var cache = options && options.cache ? options.cache : cacheDefault;
  var serializer = options && options.serializer ? options.serializer : serializerDefault;
  var strategy = options && options.strategy ? options.strategy : strategyDefault;
  return strategy(fn, {
    cache: cache,
    serializer: serializer
  });
} //
// Strategy
//


function isPrimitive(value) {
  return value == null || typeof value === 'number' || typeof value === 'boolean'; // || typeof value === "string" 'unsafe' primitive for our needs
}

function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  var computedValue = cache.get(cacheKey);

  if (typeof computedValue === 'undefined') {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);
  var computedValue = cache.get(cacheKey);

  if (typeof computedValue === 'undefined') {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}

function strategyDefault(fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}

function strategyVariadic(fn, options) {
  var strategy = variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}

function strategyMonadic(fn, options) {
  var strategy = monadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
} //
// Serializer
//


function serializerDefault() {
  return JSON.stringify(arguments);
} //
// Cache
//


function ObjectWithoutPrototypeCache() {
  this.cache = Object.create(null);
}

ObjectWithoutPrototypeCache.prototype.has = function (key) {
  return key in this.cache;
};

ObjectWithoutPrototypeCache.prototype.get = function (key) {
  return this.cache[key];
};

ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
  this.cache[key] = value;
};

var cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  }
}; //
// API
//

var src = memoize;
var strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
};
src.strategies = strategies;

var INFINITY = 1 / 0;
var ESCAPE_CHARACTERS = /\\(\\)?/g;
var PROP_NAMES = RegExp('[^.[\\]]+' + '|' + // Or match property names within brackets.
'\\[(?:' + // Match a non-string expression.
'([^"\'][^[]*)' + '|' + // Or match strings (supports escaping characters).
'(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' + ')\\]' + '|' + // Or match "" as the space between consecutive dots or empty brackets.
'(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g');
function deepcopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isUndefined(obj) {
  return typeof obj === 'undefined';
}
function isPromise(obj) {
  return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function isString(obj) {
  return typeof obj === 'string';
}
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}
function isArray(obj) {
  return Array.isArray(obj);
}
function isFunction(obj) {
  return obj && (Object.prototype.toString.call(obj) === '[object Function]' || 'function' === typeof obj || obj instanceof Function);
}
function isSymbol(obj) {
  return obj && (_typeof(obj) === 'symbol' || obj['@@toStringTag'] === 'Symbol' || toString.call(obj) === '[object Symbol]') || false;
}
function isInteger(obj) {
  return String(Math.floor(Number(obj))) === obj;
}
function getValue(obj, key) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return key in obj ? obj[key] : defaultValue;
}
function ownProperties(obj) {
  return Object.keys(obj);
}
function getIn(object, pathString, defaultValue) {
  var path = toPath(pathString);
  var index = 0;

  while (object && index < path.length) {
    object = object[path[index++]];
  }

  return object === undefined ? defaultValue : object;
}
function insertToArray(array, index, value, defaultValue) {
  var length = array.length;

  if (length > index) {
    array.splice(index, 1, value);
  } else {
    for (var i = 0; i < index - length; i++) {
      array.push(defaultValue);
    }

    array.push(value);
  }

  return array;
}
function setValueByPath(object, pathString, value, defaultValue) {
  var path = toPath(pathString);
  var previousElement = object;

  for (var index = 0; index < path.length; index++) {
    var isLast = index === path.length - 1;
    var currentElement = getIn(object, path.slice(0, index + 1));

    if (!currentElement || isLast || !isObject(currentElement) && !isArray(currentElement)) {
      var nextValue = isLast ? value : isInteger(path[index + 1]) && Number(path[index + 1]) >= 0 ? [] : {};

      if (isArray(previousElement)) {
        insertToArray(previousElement, path[index], nextValue);
      } else {
        Vue.set(previousElement, path[index], isUndefined(nextValue) ? defaultValue : nextValue);
      }
    }

    previousElement = getIn(object, path.slice(0, index + 1));
  }
}
function removeValueByPath(object, pathString) {
  var path = toPath(pathString);
  var previousElement = getIn(object, path.slice(0, path.length - 1));
  var removedElement = path[path.length - 1];

  if (isArray(previousElement)) {
    var index = Number(removedElement);

    if (index === previousElement.length - 1) {
      previousElement.pop();
    } else if (index < previousElement.length - 1) {
      previousElement[index] = null;
    }
  } else {
    if (previousElement) {
      Vue.delete(previousElement, removedElement);
    }
  }
}
function freeze(object) {
  return Object.assign({}, object);
}
var stringToPath = src(function (string) {
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
  var result = [];

  if (string.charCodeAt(0) === delimiter.charCodeAt(0)) {
    result.push('');
  }

  string.replace(PROP_NAMES, function (match, expression, quote, subString) {
    var key = match;

    if (quote) {
      key = subString.replace(ESCAPE_CHARACTERS, '$1');
    } else if (expression) {
      key = expression.trim();
    }

    result.push(key);
  });
  return result;
});

function toKey(value) {
  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }

  var result = "".concat(value);
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
function toPath(value) {
  if (Array.isArray(value)) {
    return value.map(toKey);
  }

  return isSymbol(value) ? [value] : _toConsumableArray(stringToPath(value));
}
function isEqual(a, b) {
  return a == b;
}
function defaultMergeAlgorithm(source, destination, name, defaultValue) {
  if (isArray(destination)) {
    return [].concat(_toConsumableArray(destination), _toConsumableArray(source.filter(function (a) {
      return destination.find(function (b) {
        return isEqual(a, b);
      });
    })));
  } else {
    return isUndefined(destination) || isEqual(destination, defaultValue) ? source : destination;
  }
}
function mergeValidations(array, settings) {
  var mergeAlgorithm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultMergeAlgorithm;
  var result = {};

  if (isArray(array)) {
    var blocks = array.reduce(function (value, block) {
      return isArray(block) ? value.concat(block) : value.concat([block]);
    }, []);
    blocks.forEach(function (fields) {
      if (isObject(fields)) {
        // traverse meta
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = ownProperties(fields)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var name = _step2.value;

            if (isObject(fields[name])) {
              // traverse fields
              if (result[name]) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = ownProperties(fields[name])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var meta = _step3.value;

                    if (meta in result[name]) {
                      result[name][meta] = mergeAlgorithm(fields[name][meta], result[name][meta], meta, settings[meta].default);
                    } else {
                      result[name][meta] = fields[name][meta];
                    }
                  }
                } catch (err) {
                  _didIteratorError3 = true;
                  _iteratorError3 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                      _iterator3.return();
                    }
                  } finally {
                    if (_didIteratorError3) {
                      throw _iteratorError3;
                    }
                  }
                }
              } else {
                result[name] = _objectSpread2({}, fields[name]);
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } else {
        console.warn('The merging validations should be objects');
      }
    });
  } else {
    console.warn('The first argument of mergeValidations function should be array');
  }

  return result;
}
function updateArray(value, newValue) {
  if (value.length > newValue.length) {
    value.splice(0, newValue.length);
  }

  for (var i = 0; i < value.length; i++) {
    if (!isEqual(value[i], newValue[i])) {
      Vue.set(value, i, newValue[i]);
    }
  }

  if (value.length < newValue.length) {
    for (var _i = value.length; _i < newValue.length; _i++) {
      value.push(newValue[_i]);
    }
  }
}
function flattenMeta(obj) {
  var result = {};
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = ownProperties(obj)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var meta = _step4.value;
      var queue = [{
        element: obj[meta],
        parent: null
      }];

      while (queue.length) {
        var node = queue.pop();

        if (isObject(node.element) || isArray(node.element)) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = ownProperties(node.element)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var field = _step5.value;
              queue.push({
                name: field,
                element: node.element[field],
                parent: node
              });
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        } else {
          var value = node.element;
          var branch = '';

          while (node.parent !== null) {
            if (isArray(node.parent.element)) {
              branch = "[".concat(node.name, "]") + branch;
            } else if (node.name !== '$self' && node.name !== '$children') {
              branch = "".concat(node.parent.parent ? '.' : '').concat(node.name) + branch;
            }

            node = node.parent;
          }

          if (!result[branch]) {
            result[branch] = {};
          }

          result[branch][meta] = value;
        }
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return result;
}
function arrayToObject(array, names) {
  var result = {};
  names.forEach(function (name, index) {
    result[name] = array[index];
  });
  return result;
}

var core = {
  validators: {},
  install: function install(Vue) {
    if (!this.installed) {
      this.installed = true;
      this.vm = new Vue({
        data: {
          forms: {}
        }
      });
      Vue.mixin({
        beforeCreate: this.init
      });
    }
  },
  create: function create(name, ref) {
    if (this.installed) {
      Vue.set(this.vm.$data.forms, name, _objectSpread2({}, ref.interface()));
    }
  },
  delete: function _delete(name) {
    if (this.installed) {
      if (this.forms) {
        Vue.delete(this.forms, name);
      }
    }
  },
  init: function init() {
    var _this = this;

    this.$form = function (name) {
      if (_this.installed) {
        return core.vm.$data.forms[name];
      } else {
        return null;
      }
    };
  }
};
function getValidator(rules) {
  var validators = [];

  if (isString(rules)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var rule = _step.value;

        var _rule$split = rule.split(':'),
            _rule$split2 = _slicedToArray(_rule$split, 2),
            name = _rule$split2[0],
            params = _rule$split2[1];

        var scheme = core.validators[name];

        if (scheme) {
          var arrayParams = params ? params.split(',') : [];
          validators.push(function (value) {
            return scheme.validator(value, arrayToObject(arrayParams, scheme.params));
          });
        } else {
          console.warn("There is no global validator with name ".concat(name));
        }
      };

      for (var _iterator = rules.split('|')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else if (isObject(rules)) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop2 = function _loop2() {
        var name = _step2.value;
        var scheme = core.validators[name];
        validators.push(function (value) {
          if (scheme) {
            if (isObject(rules[name])) {
              scheme.validator(value, rules[name]);
            } else if (isArray(rules[name])) {
              scheme.validator(value, arrayToObject(rules[name], scheme.params));
            } else if (rules[name]) {
              scheme.validator(value, {});
            }
          } else {
            console.warn("There is no global validator with name ".concat(name));
          }
        });
      };

      for (var _iterator2 = ownProperties(rules)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop2();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return function () {
    for (var _len = arguments.length, value = new Array(_len), _key = 0; _key < _len; _key++) {
      value[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      Promise.all(validators.map(function (validator) {
        return validator.apply(void 0, value);
      })).then(function (validations) {
        resolve(validations);
      });
    });
  };
}
function registerValidator(name, scheme) {
  if (isFunction(scheme)) {
    core.validators[name] = {
      validator: scheme,
      params: []
    };
  } else {
    core.validators[name] = scheme;
  }
}

var formDefaults = {
  fieldMeta: {
    dirty: {
      default: false
    },
    touched: {
      default: false
    },
    error: {
      default: null,
      validate: true
    }
  },
  formMeta: {
    dirty: {
      default: false,
      computed: function computed(_ref) {
        var form = _ref.form;
        return form.getFields().some(function (field) {
          return Boolean(field.meta.dirty);
        });
      }
    },
    valid: {
      default: true,
      computed: function computed(_ref2) {
        var form = _ref2.form;
        return form.getFields().every(function (field) {
          return !field.mounted || !field.meta.error;
        });
      }
    },
    submitting: {
      default: false
    },
    validating: {
      default: false
    },
    submitCount: {
      default: 0
    }
  },
  behavior: {
    onUnmountField: function onUnmountField(_ref3) {
      var form = _ref3.form,
          field = _ref3.field;
      form.removeField(field.name);
    },
    onMountField: function onMountField(_ref4) {// pass

      var form = _ref4.form,
          field = _ref4.field;
    },
    onInitForm: function onInitForm(_ref5) {
      var form = _ref5.form;
      var defaultFormMeta = this.settings.defaultFormMeta;
      form.setMeta(defaultFormMeta);
    },
    onResetForm: function onResetForm(_ref6) {
      var form = _ref6.form;
      var defaultFormMeta = this.settings.defaultFormMeta;
      this.getFields().forEach(function (field) {
        form.resetField(field.name);
      });
      form.setMeta(defaultFormMeta);
    },
    onStartValidate: function onStartValidate(_ref7) {
      var form = _ref7.form,
          field = _ref7.field;
      form.setMeta({
        validating: true
      });
      var promises = [];

      if (!field || getValue(form.validationOptions, 'formValidate', 'normal') === 'always') {
        form.getFields().forEach(function (_ref8) {
          var name = _ref8.name;
          promises.push(_defineProperty({}, name, form.settings.defaultFieldMeta));
        });
        promises.push(form.validateForm().then(flattenMeta));
      }

      form.getFieldRefs().forEach(function (ref) {
        if (!field || form.isLinked(field, ref.getName())) {
          promises.push(form.validateField(ref));
        }
      });
      return Promise.all(promises);
    },
    onEndValidate: function onEndValidate(_ref9) {
      var form = _ref9.form,
          data = _ref9.data;
      // This function awaits response with the following shape:
      // data = [
      //     {
      //        name: {
      //           error: 'This.field is required'
      //        },
      //        password: {
      //           error: null
      //        }
      //     },
      //     {
      //        password: {
      //           error: 'Password is too easy'
      //        }
      //     }
      // ]
      var fieldMeta = form.settings.fieldMeta;
      var validations = mergeValidations(data, this.fieldMeta);
      form.getFields().forEach(function (field) {
        var updatedMeta = {};
        fieldMeta.forEach(function (meta) {
          if (meta.validate) {
            if (validations[field.name] && !isUndefined(validations[field.name][meta.name])) {
              updatedMeta[meta.name] = validations[field.name][meta.name];
            }
          }
        });

        if (ownProperties(updatedMeta).length) {
          form.setFieldMeta(field.name, updatedMeta);
        }
      });
      form.setMeta({
        validating: false
      });
    },
    onStartSubmit: function onStartSubmit(_ref10) {
      var form = _ref10.form,
          params = _ref10.params;
      form.setMeta({
        submitting: true,
        submitCount: form.meta.submitCount + 1
      });
      form.getFields().forEach(function (field) {
        form.setFieldMeta(field.name, {
          touched: true
        });
      });
      return form.validate().then(function () {
        if (form.meta.valid) {
          if (form.onSubmit) {
            return form.onSubmit({
              form: form,
              params: params,
              values: freeze(form.values)
            });
          }
        }
      });
    },
    onSubmit: function onSubmit(_ref11) {
      var form = _ref11.form,
          params = _ref11.params,
          values = _ref11.values;
    },
    onEndSubmit: function onEndSubmit(_ref12) {
      var form = _ref12.form,
          params = _ref12.params;
      form.setMeta({
        submitting: false
      });
    }
  }
};
var script = {
  provide: function provide() {
    return {
      $form: this.interface()
    };
  },
  props: {
    name: {
      type: String
    },
    fieldMeta: {
      type: Object,
      default: function _default() {
        return formDefaults.fieldMeta;
      }
    },
    formMeta: {
      type: Object,
      default: function _default() {
        return formDefaults.formMeta;
      }
    },
    initialValues: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    initialFieldsMeta: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    initialFormMeta: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    validation: {
      type: Function
    },
    validationOptions: {
      type: Object,
      default: function _default() {
        return {
          onChange: true,
          onBlur: true
        };
      }
    },
    component: {
      type: [String, Object],
      default: 'span'
    },
    onUnmountField: {
      type: Function,
      default: formDefaults.behavior.onUnmountField
    },
    onMountField: {
      type: Function,
      default: formDefaults.behavior.onMountField
    },
    onInitForm: {
      type: Function,
      default: formDefaults.behavior.onInitForm
    },
    onResetForm: {
      type: Function,
      default: formDefaults.behavior.onResetForm
    },
    onStartValidate: {
      type: Function,
      default: formDefaults.behavior.onStartValidate
    },
    onEndValidate: {
      type: Function,
      default: formDefaults.behavior.onEndValidate
    },
    onChangeField: {
      type: Function,
      default: formDefaults.behavior.onChangeField
    },
    onBlurField: {
      type: Function,
      default: formDefaults.behavior.onBlurField
    },
    onFocusField: {
      type: Function,
      default: formDefaults.behavior.onFocusField
    },
    onSubmit: {
      type: Function
    },
    onStartSubmit: {
      type: Function,
      default: formDefaults.behavior.onStartSubmit
    },
    onEndSubmit: {
      type: Function,
      default: formDefaults.behavior.onEndSubmit
    }
  },
  data: function data() {
    var data = {
      countFields: 0,
      meta: {},
      values: {},
      fields: {}
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ownProperties(this.formMeta)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var name = _step.value;
        data.meta[name] = isUndefined(this.initialFormMeta[name]) ? this.formMeta[name].default : this.initialFormMeta[name];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return data;
  },
  computed: {
    settings: function settings() {
      var _this = this;

      var fieldMeta = ownProperties(this.fieldMeta).map(function (name) {
        return _objectSpread2({
          name: name
        }, _this.fieldMeta[name]);
      });
      var formMeta = ownProperties(this.formMeta).map(function (name) {
        return _objectSpread2({
          name: name
        }, _this.formMeta[name]);
      });
      var defaultFieldMeta = {};
      var defaultValidatableFieldMeta = {};
      fieldMeta.forEach(function (meta) {
        defaultFieldMeta[meta.name] = meta.default;

        if (meta.validate) {
          defaultValidatableFieldMeta[meta.name] = meta.default;
        }
      });
      var defaultFormMeta = {};
      formMeta.forEach(function (meta) {
        defaultFormMeta[meta.name] = meta.default;
      });
      return {
        fieldMeta: fieldMeta,
        formMeta: formMeta,
        defaultFieldMeta: defaultFieldMeta,
        defaultValidatableFieldMeta: defaultValidatableFieldMeta,
        defaultFormMeta: defaultFormMeta
      };
    }
  },
  created: function created() {
    this.registry = {};
    this.values = deepcopy(isObject(this.initialValues) ? this.initialValues : {});
  },
  mounted: function mounted() {
    if (this.name) {
      core.create(this.name, this);
    }
  },
  destroyed: function destroyed() {
    if (this.name && this.$form && this.$form(this.name)) {
      core.delete(this.name);
    }
  },
  methods: {
    interface: function _interface() {
      var self = this;
      return {
        get meta() {
          return self.meta;
        },

        get fields() {
          return self.fields;
        },

        get values() {
          return self.values;
        },

        get settings() {
          return self.settings;
        },

        get refs() {
          return this.getFieldRefs();
        },

        // Getters
        getField: this.getField,
        getFields: this.getFields,
        getFieldMeta: this.getFieldMeta,
        getFieldValue: this.getFieldValue,
        getFieldRef: this.getFieldRef,
        getFieldRefs: this.getFieldRefs,
        // Actions
        createField: this.createField,
        resetField: this.resetField,
        removeField: this.removeField,
        setFieldMeta: this.setFieldMeta,
        setFieldValue: this.setFieldValue,
        setFieldsMeta: this.setFieldsMeta,
        setMeta: this.setMeta,
        validate: this.validate,
        mountField: this.mountField,
        unmountField: this.unmountField,
        submit: this.submit,
        // Behavior
        onSubmit: this.onSubmit,
        // Props
        validationOptions: this.validationOptions
      };
    },
    getFieldRef: function getFieldRef(field) {
      if (isString(field)) {
        return this.getFieldRefs(field)[0];
      } else {
        return field;
      }
    },
    getFieldRefs: function getFieldRefs(name) {
      if (name) {
        return Object.values(this.registry).filter(function (el) {
          return el.getName() === name;
        }).sort(function (el) {
          return el.getName();
        });
      } else {
        return Object.values(this.registry).sort(function (el) {
          return el.getName();
        });
      }
    },
    getFieldInterface: function getFieldInterface(field) {
      var self = this;
      return {
        get mounted() {
          return field.mounted;
        },

        get controlled() {
          return field.controlled;
        },

        get name() {
          return field.name;
        },

        get value() {
          return field.value;
        },

        set value(value) {
          self.setFieldValue(field.name, value);
        },

        get meta() {
          return field.meta;
        },

        set meta(value) {
          self.setFieldValue(field.name, value);
        },

        get refs() {
          return self.getFieldRefs(field.name);
        }

      };
    },
    getField: function getField(name) {
      var field = this.fields[name];

      if (field) {
        return this.getFieldInterface(field);
      } else {
        return null;
      }
    },
    getFields: function getFields() {
      var _this2 = this;

      return ownProperties(this.fields).map(function (name) {
        return {
          name: name,
          value: _this2.fields[name].value,
          meta: _this2.fields[name].meta,
          refs: _this2.registry[name],
          mounted: _this2.fields[name].mounted
        };
      });
    },
    getInitialValue: function getInitialValue(name, ref) {
      var initialValue = getIn(this.initialValues, name);
      var field = ref ? ref : this.getFieldRef(name);

      if (!isUndefined(initialValue)) {
        return initialValue;
      } else if (field) {
        return field.getInitialValue();
      } else {
        return '';
      }
    },
    getFieldValue: function getFieldValue(name) {
      return getIn(this.values, name);
    },
    getFieldMeta: function getFieldMeta(name, property) {
      var meta = this.fields[name] ? this.fields[name].meta : {};

      if (property) {
        return meta[property] || undefined;
      } else {
        return meta;
      }
    },
    getInitialFieldMeta: function getInitialFieldMeta(path) {
      var fieldMeta = this.settings.fieldMeta;
      var result = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = fieldMeta[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var meta = _step2.value;
          result[meta.name] = getIn(this.initialFieldsMeta[meta.name], path, meta.default);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    },
    getChildren: function getChildren(name) {
      return Object.keys(this.fields).filter(function (field) {
        return field !== name && field.indexOf(name) === 0;
      });
    },
    isLinked: function isLinked(firstName, secondName) {
      return firstName === secondName || firstName.indexOf(secondName) === 0;
    },
    registerField: function registerField(field) {
      // Generate the id
      var id = "$field_".concat(this.countFields);
      var name = field.getName() || id;
      this.registry[id] = field;
      this.countFields += 1; // Add the id for the Field component

      field.id = id;
      return {
        id: id,
        name: name
      };
    },
    removeField: function removeField(name) {
      if (this.values) {
        removeValueByPath(this.values, name);
      }

      Vue.delete(this.fields, name);
    },
    mountField: function mountField(fieldRef) {
      var _this$registerField = this.registerField(fieldRef),
          name = _this$registerField.name;

      var initialMeta = this.getInitialFieldMeta(name);
      var initialValue = this.getInitialValue(name, fieldRef);

      if (!this.fields[name]) {
        this.createField(name, initialValue, initialMeta, {
          mounted: true,
          controlled: fieldRef.controlled
        });
      }

      this.fields[name].mounted = true;
      this.onMountField({
        form: this.interface(),
        field: fieldRef.interface()
      });
    },
    createField: function createField(name) {
      var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var initialMeta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var fieldMeta = this.settings.fieldMeta;
      var filteredMeta = {};
      fieldMeta.forEach(function (meta) {
        if (meta.name in initialMeta) {
          filteredMeta[meta.name] = initialMeta[meta.name];
        }
      });
      var value = getIn(this.values, name);

      if (isUndefined(value)) {
        setValueByPath(this.values, name, initialValue);
        value = initialValue;
      }

      Vue.set(this.fields, name, _objectSpread2({}, params, {
        meta: filteredMeta,
        value: value
      }));
      this.updateForm();
    },
    updateFieldValue: function updateFieldValue(name, value, options) {
      var _this3 = this;

      var fields = [name].concat(_toConsumableArray(this.getChildren(name)));
      fields.forEach(function (field) {
        var oldValue = _this3.fields[field].value;
        var newValue = getIn(_this3.values, field);

        if (oldValue !== newValue) {
          _this3.fields[field].value = newValue;

          if (isFunction(_this3.onChangeField)) {
            _this3.onChangeField({
              form: _this3,
              field: name,
              oldValue: oldValue,
              newValue: newValue,
              options: options
            });
          }
        }
      });
      this.updateForm();
    },
    setFieldValue: function setFieldValue(name, value) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return new Promise(function (resolve, reject) {
        if (name in _this4.fields) {
          var field = _this4.fields[name];

          if (!field || !field.$controlled || options.forced) {
            setValueByPath(_this4.values, name, value);

            _this4.updateFieldValue(name, value, options);
          } else {
            _this4.getFieldRefs(name).forEach(function (ref) {
              ref.$emit('change', value);
            });
          }
        } else {
          console.warn("Can't set the value for not mounted field ".concat(name));
        }

        Vue.nextTick(function () {
          resolve({
            name: name,
            value: value,
            options: options
          });
        });
      });
    },
    setFieldMeta: function setFieldMeta(name, value) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (name in _this5.fields) {
          var fieldMeta = _this5.settings.fieldMeta;
          fieldMeta.forEach(function (meta) {
            if (meta.name in value) {
              if (_this5.fields[name].meta[meta.name] !== value[meta.name]) {
                _this5.fields[name].meta[meta.name] = value[meta.name];
              }
            }
          });

          _this5.updateForm();
        } else {
          console.warn("Can't set the meta for not existing field ".concat(name));
        }

        Vue.nextTick(function () {
          resolve({
            name: name,
            value: value
          });
        });
      });
    },
    resetField: function resetField(name) {
      var initialValue = this.getInitialValue(name);
      var initialMeta = this.getInitialFieldMeta(name);

      if (!this.fields[name].controlled && initialValue) {
        this.setFieldValue(name, initialValue, {
          internal: true
        });
      }

      this.setFieldMeta(name, initialMeta);
    },
    unmountField: function unmountField(fieldRef) {
      var name = fieldRef.getName();
      delete this.registry[fieldRef.id];

      if (this.fields[name]) {
        this.fields[name].mounted = this.getFieldRefs(name).length > 0;
      }

      if (this.onUnmountField) {
        this.onUnmountField({
          form: this.interface(),
          field: fieldRef.interface()
        });
      }
    },
    setMeta: function setMeta(value) {
      var _this6 = this;

      var preventUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var formMeta = this.settings.formMeta;
      formMeta.forEach(function (meta) {
        if (meta.name in value) {
          if (meta.name in _this6.meta) {
            _this6.meta[meta.name] = value[meta.name];
          } else {
            Vue.set(_this6.meta, meta.name, value[meta.name]);
          }
        }
      });

      if (!preventUpdate) {
        this.updateForm();
      }
    },
    validateForm: function validateForm() {
      var _this7 = this;

      var validator = this.validation;
      return new Promise(function (resolve, reject) {
        if (validator) {
          var value = validator(_this7.values);

          if (isPromise(value)) {
            value.then(function (response) {
              resolve(response);
            });
          } else {
            resolve(value);
          }
        } else {
          resolve({});
        }
      });
    },
    validateField: function validateField(field) {
      var _this8 = this;

      var name = field.getName();
      var defaultValidatableFieldMeta = this.settings.defaultValidatableFieldMeta;
      return new Promise(function (resolve, reject) {
        if (field.onValidate) {
          var value = field.onValidate({
            field: field.interface(),
            form: _this8.interface()
          });

          if (isPromise(value)) {
            value.then(function (response) {
              resolve(response);
            });
          } else {
            resolve(value);
          }
        } else {
          resolve(null);
        }
      }).then(function (response) {
        if (isArray(response)) {
          return response.map(function (el) {
            return _defineProperty({}, name, _objectSpread2({}, defaultValidatableFieldMeta, {}, el));
          });
        } else if (isObject(response)) {
          return _defineProperty({}, name, _objectSpread2({}, defaultValidatableFieldMeta, {}, response));
        } else {
          return defaultValidatableFieldMeta;
        }
      });
    },
    validate: function validate(field) {
      var _this9 = this;

      var name = isObject(field) ? field.getName() : field;
      return this.onStartValidate({
        form: this,
        field: name
      }).then(function (data) {
        _this9.onEndValidate({
          form: _this9.interface(),
          field: field,
          data: data
        });

        _this9.updateForm();

        return Vue.nextTick();
      });
    },
    updateMeta: function updateMeta(values) {
      var normalizedValues = flattenMeta(values);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = ownProperties(flattenMeta)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var name = _step3.value;

          if (this.fields[name]) {
            this.setFieldMeta(name, normalizedValues[name]);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    },
    submit: function submit(params) {
      var _this10 = this;

      var form = this.interface();
      this.onStartSubmit({
        form: form,
        params: params
      }).then(function () {
        _this10.onEndSubmit({
          form: form,
          params: params
        });
      });
    },
    updateForm: function updateForm() {
      var _this11 = this;

      var formMeta = this.settings.formMeta;
      var update = {};
      formMeta.forEach(function (meta) {
        if (isFunction(meta.computed)) {
          var value = meta.computed({
            form: _this11.interface()
          });

          if (!isEqual(_this11.meta[meta.name], value)) {
            update[meta.name] = value;
          }
        }
      });

      if (ownProperties(update).length) {
        this.setMeta(update, true);
      }
    }
  },
  render: function render(createElement) {
    var form = this;
    var properties = this.component === 'form' ? {
      on: {
        submit: function submit(event) {
          form.submit();
          event.preventDefault();
        }
      }
    } : {};
    return createElement(this.component, properties, [this.$scopedSlots.default(this.interface())]);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */

/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent_1({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;

      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }

  var debounced = function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.flush = function () {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

debounce.debounce = debounce;
var debounce_1 = debounce;

var fieldDefaults = {
  behavior: {
    onMount: function onMount(_ref) {
      var field = _ref.field,
          form = _ref.form;

      if (getValue(_objectSpread2({}, form.validationOptions, {}, field.validationOptions), 'onMount', false)) {
        form.validate(field.name);
      }
    },
    onFocus: function onFocus(_ref2) {
      var event = _ref2.event,
          field = _ref2.field,
          form = _ref2.form;
    },
    onBlur: function onBlur(_ref3) {
      var event = _ref3.event,
          field = _ref3.field,
          form = _ref3.form;
      form.setFieldMeta(field.name, {
        touched: true
      });

      if (getValue(_objectSpread2({}, form.validationOptions, {}, field.validationOptions), 'onBlur', true)) {
        form.validate(field.name);
      }
    },
    onInput: function onInput(_ref4) {
      var field = _ref4.field,
          form = _ref4.form;

      if (!field.meta.dirty) {
        form.setFieldMeta(field.name, {
          dirty: true
        });
      }
    },
    onValidate: function onValidate(_ref5) {
      var field = _ref5.field,
          form = _ref5.form;
      var validation = field.validation;

      if (!isUndefined(validation)) {
        if (isFunction(validation)) {
          return validation(field.value, {
            form: form,
            field: field
          });
        } else if (isArray(validation)) {
          return validation.map(function (v) {
            return isFunction(v) ? v(field.value, {
              form: form,
              field: field
            }) : {};
          });
        } else if (isString(validation) || isObject(validation)) {
          return getValidator(validation)(field.value, {
            form: form,
            field: field
          });
        }

        console.warn("Can't process the validator ".concat(validation));
      }

      return form.settings.defaultFieldMeta;
    }
  }
};
var script$1 = {
  inject: ['$form'],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    component: {
      type: [String, Object],
      default: 'span'
    },
    value: {},
    defaultValue: {
      default: ''
    },
    validation: {
      type: [String, Function, Object]
    },
    name: {
      type: String
    },
    onFocus: {
      type: Function,
      default: fieldDefaults.behavior.onChangeField
    },
    onBlur: {
      type: Function,
      default: fieldDefaults.behavior.onBlur
    },
    onInput: {
      type: Function,
      default: fieldDefaults.behavior.onInput
    },
    onChange: {
      type: Function,
      default: fieldDefaults.behavior.onChange
    },
    onValidate: {
      type: Function,
      default: fieldDefaults.behavior.onValidate
    },
    onMount: {
      type: Function,
      default: fieldDefaults.behavior.onMount
    }
  },
  data: function data() {
    return {
      id: null
    };
  },
  computed: {
    $name: function $name() {
      return this.name || this.id;
    },
    $value: function $value() {
      if (this.controlled) {
        return this.value;
      } else {
        return this.$form.fields[this.$name] ? this.$form.fields[this.$name].value : null;
      }
    },
    $meta: function $meta() {
      return this.$form.fields[this.$name] ? this.$form.fields[this.$name].meta : {};
    },
    controlled: function controlled() {
      return typeof this.value !== 'undefined';
    }
  },
  watch: {
    value: function value(_value) {
      this.$form.setFieldValue(this.$name, _value, {
        forced: true,
        internal: true
      });
    },
    name: function name(_name, oldName) {
      var _this = this;

      if (this.$form) {
        this.$form.unmountField(oldName);
        this.$nextTick(function () {
          _this.$form.mountField(_this);

          if (_this.onMount) {
            _this.onMount({
              field: _this.interface(),
              form: _this.$form
            });
          }
        });
      }
    }
  },
  created: function created() {
    if (!this.$form) {
      throw new Error("Can't create the Field instance (name: ".concat(this.$name, ") because it's not contained in any form"));
    } else {
      this.$form.mountField(this);

      if (this.onMount) {
        this.onMount({
          field: this.interface(),
          form: this.$form
        });
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$form) {
      this.$form.unmountField(this);
    }
  },
  methods: {
    interface: function _interface() {
      var self = this;
      return {
        mounted: true,
        controlled: this.controlled,
        name: this.$name,

        get meta() {
          return self.$meta;
        },

        set meta(value) {
          self.$form.setFieldMeta(self.$name, value);
        },

        get value() {
          return self.$value;
        },

        set value(value) {
          self.$form.setFieldValue(self.$name, value).then(function () {
            debounce_1(self.$form.validate(self.$name), getValue(_objectSpread2({}, self.$form.validationOptions, {}, self.validationOptions), 'debounce', 0));
          });
        },

        // Events
        events: {
          blur: this.handleBlur,
          focus: this.handleFocus,
          input: this.handleInput
        },
        // Props
        validation: this.validation,
        validationOptions: this.validationOptions
      };
    },
    getName: function getName() {
      return this.$name;
    },
    getValue: function getValue() {
      return this.$value;
    },
    getMeta: function getMeta() {
      return this.$meta;
    },
    getForm: function getForm() {
      return this.$form;
    },
    getInitialValue: function getInitialValue() {
      return this.defaultValue;
    },
    handleFocus: function handleFocus(event) {
      if (isFunction(this.onFocus)) {
        this.onFocus({
          event: event,
          field: this.interface(),
          form: this.getForm()
        });
      }
    },
    handleBlur: function handleBlur(event) {
      if (isFunction(this.onBlur)) {
        this.onBlur({
          event: event,
          field: this.interface(),
          form: this.getForm()
        });
      }
    },
    handleInput: function handleInput(event) {
      if (isFunction(this.onInput)) {
        this.onInput({
          event: event,
          field: this.interface(),
          form: this.getForm()
        });
      }
    }
  },
  render: function render(createElement) {
    if (this.id) {
      return createElement(this.component, [this.$scopedSlots.default(this.interface())]);
    } else {
      return createElement(this.component);
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent_1({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var fieldArrayDefaults = {
  behavior: {
    onValidate: function onValidate(_ref) {
      var field = _ref.field,
          form = _ref.form;
      var validate = field.validate;

      if (!isUndefined(validate)) {
        if (isFunction(validate)) {
          return validate(field.value);
        } else if (isString(validate) || isObject(validate)) {
          return form.getGlobalValidator(validate)(field.value);
        }

        console.warn("Can't process the validator ".concat(validate));
      }

      return {};
    },
    onMount: function onMount(_ref2) {
      var field = _ref2.field,
          form = _ref2.form;

      if (getValue(_objectSpread2({}, form.validationOptions, {}, field.validationOptions), 'onMount', false)) {
        form.validate(field.name);
      }
    }
  }
};
var script$2 = {
  inject: ['$form'],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: {
      type: String
    },
    component: {
      type: [String, Object],
      default: 'span'
    },
    defaultValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    validation: {
      type: Function
    },
    validationOptions: {
      type: [String, Function, Object]
    },
    onMount: {
      type: Function,
      default: fieldArrayDefaults.behavior.onMount
    },
    onValidate: {
      type: Function,
      default: fieldArrayDefaults.behavior.onValidate
    }
  },
  data: function data() {
    return {
      id: null,
      items: [],
      names: []
    };
  },
  computed: {
    $name: function $name() {
      return this.name;
    },
    values: function values() {
      return this.getField().value;
    },
    field: function field() {
      return this.getField();
    },
    meta: function meta() {
      return this.field ? this.field.meta : {};
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$form) {
      this.$form.unmountField(this);
    }
  },
  beforeMount: function beforeMount() {
    var _this = this;

    if (!this.$form) {
      throw new Error("Can't create the Field instance (name: ".concat(this.$name, ") because it's not contained in any form"));
    } else {
      this.$form.mountField(this);

      if (this.onMount) {
        this.onMount({
          field: this.interface(),
          form: this.$form
        });
      }

      this.$watch(this.getField, function (data) {
        if (data) {
          updateArray(_this.names, data.value.map(function (el, index) {
            return "".concat(_this.$name, "[").concat(index, "]");
          }));
        }
      }, {
        deep: true,
        immediate: true
      });
    }
  },
  methods: {
    interface: function _interface() {
      var self = this;
      return {
        push: this.push,
        pop: this.pop,
        shift: this.shift,
        unshift: this.unshift,
        insert: this.insert,
        remove: this.remove,
        replace: this.replace,
        swap: this.swap,

        get validation() {
          return self.validation;
        },

        get validationOptions() {
          return self.validationOptions;
        },

        get name() {
          return self.$name;
        },

        get meta() {
          return self.meta;
        },

        set meta(value) {
          self.$form.setFieldMeta(self.$name, value);
        },

        get mounted() {
          return true;
        },

        get controlled() {
          return self.controlled;
        },

        get names() {
          return self.names;
        }

      };
    },
    getName: function getName() {
      return this.$name;
    },
    getField: function getField() {
      return this.$form.fields[this.$name];
    },
    getInitialValue: function getInitialValue() {
      return [];
    },
    push: function push(value) {
      this.$form.setFieldValue(this.$name, [].concat(_toConsumableArray(this.values), [value]));
    },
    shift: function shift(value) {
      this.$form.setFieldValue(this.$name, this.values.slice(1));
    },
    unshift: function unshift(value) {
      this.$form.setFieldValue(this.$name, [value].concat(_toConsumableArray(this.values)));
    },
    insert: function insert(index, value) {
      this.$form.setFieldValue(this.$name, [].concat(_toConsumableArray(this.values.slice(0, index)), [value], _toConsumableArray(this.values.slice(index))));
    },
    remove: function remove(index) {
      this.$form.setFieldValue(this.$name, [].concat(_toConsumableArray(this.values.slice(0, index)), _toConsumableArray(this.values.slice(index + 1))));
    },
    replace: function replace(index, value) {
      this.$form.setFieldValue(this.$name, [].concat(_toConsumableArray(this.values.slice(0, index)), [value], _toConsumableArray(this.values.slice(index + 1))));
    },
    pop: function pop() {
      this.$form.setFieldValue(this.$name, _toConsumableArray(this.values.slice(0, this.values.length - 1)));
    },
    swap: function swap(firstIndex, secondIndex) {
      var array = _toConsumableArray(this.values);

      var value = array[secondIndex];
      array[secondIndex] = array[firstIndex];
      array[firstIndex] = value;
      this.$form.setFieldValue(this.getName(), array);
    }
  },
  render: function render(createElement) {
    return createElement(this.component, [this.$scopedSlots.default(this.interface())]);
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = normalizeComponent_1({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

function customize(component, props) {
  return {
    inheritAttrs: true,
    render: function render(createElement) {
      return createElement(component, {
        attrs: _objectSpread2({}, props, {}, this.$attrs),
        on: this.$listeners,
        scopedSlots: this.$scopedSlots
      });
    }
  };
}

export { __vue_component__$1 as Field, __vue_component__$2 as FieldArray, __vue_component__ as VueForm, core, customize, formDefaults, getValidator, registerValidator };
//# sourceMappingURL=index.es.js.map
