<script>
import { updateArray, isFunction, isObject, isString, isUndefined, getValue } from '../service/common';
import { getValidator } from "../service/core";

export const fieldArrayDefaults = {
	behavior: {
		onValidate({ field, form }) {
			const validate = field.validate;
			if (!isUndefined(validate)) {
				if (isFunction(validate)) {
					return validate(field.value);
				} else if (isString(validate) || isObject(validate)) {
					return getValidator(validate)(field.value);
				}
				console.warn(`Can't process the validator ${validate}`);
			}
			return {};
		},
		onMount({ field, form }) {
			if (getValue({ ...form.validationOptions, ...field.validationOptions }, 'onMount', false)) {
				form.validate(field.name);
			}
		},
	}
};

export default {
	inject: ['$form'],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		name: {
			type: String,
		},
		component: {
			type: [String, Object],
			default: 'span'
		},
		defaultValue: {
			type: Array,
			default() {
				return [];
			}
		},
		validation: {
			type: Function,
		},
		validationOptions: {
			type: [String, Function, Object],
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
	data() {
		return {
			id: null,
			items: [],
			names: []
		};
	},
	computed: {
		$name() {
			return this.name;
		},
		values() {
			return this.getField().value;
		},
		field() {
			return this.getField();
		},
		meta() {
			return this.field ? this.field.meta : {};
		},
	},
	destroyed() {
		if (this.$form) {
			this.$form.unmountField(this);
		}
	},
	created() {
		if (!this.$form) {
			throw new Error(`Can't create the Field instance (name: ${this.$name}) because it's not contained in any form`);
		} else {
			this.$form.mountField(this);
			if (this.onMount) {
				this.onMount({ field: this.interface(), form: this.$form });
			}
			this.$watch(this.getField, (data) => {
				if (data) {
					updateArray(this.names, data.value.map((el, index) => `${this.$name}[${index}]`));
				}
			}, { deep: true, immediate: true });
		}
	},
	methods: {
		interface() {
			const self = this;
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
				},
			};
		},
		getName() {
			return this.$name;
		},
		getField() {
			return this.$form.fields[this.$name];
		},
		getInitialValue() {
			return [];
		},
		push(value) {
			this.$form.setFieldValue(this.$name, [...this.values, value]);
		},
		shift() {
			this.$form.setFieldValue(this.$name, this.values.slice(1));
		},
		unshift(value) {
			this.$form.setFieldValue(this.$name, [value, ...this.values]);
		},
		insert(index, value) {
			this.$form.setFieldValue(this.$name, [...this.values.slice(0, index), value, ...this.values.slice(index)]);
		},
		remove(index) {
			this.$form.setFieldValue(this.$name, [...this.values.slice(0, index), ...this.values.slice(index + 1)]);
		},
		replace(index, value) {
			this.$form.setFieldValue(this.$name, [...this.values.slice(0, index), value, ...this.values.slice(index + 1)]);
		},
		pop() {
			this.$form.setFieldValue(this.$name, [...this.values.slice(0, this.values.length - 1)]);
		},
		swap(firstIndex, secondIndex) {
			const array = [...this.values];
			const value = array[secondIndex];
			array[secondIndex] = array[firstIndex];
			array[firstIndex] = value;
			this.$form.setFieldValue(this.getName(), array);
		}
	},
	render(createElement) {
		return createElement(this.component, [
			this.$scopedSlots.default(this.interface())
		]);
	}
};
</script>
