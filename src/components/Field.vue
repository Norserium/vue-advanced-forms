<script>
import debounce from 'debounce';
import { getValue, isFunction, isObject, isString, isUndefined, isArray } from '../service/common';
import { getValidator } from '../service/core';

export const fieldDefaults = {
	behavior: {
		onMount({ field, form }) {
			if (getValue({ ...form.validationOptions, ...field.validationOptions }, 'onMount', false)) {
				form.validate(field.name);
			}
		},
		onFocus({ event, field, form }) {

		},
		onBlur({ event, field, form }) {
			form.setFieldMeta(field.name, {
				touched: true
			});
			if (getValue({ ...form.validationOptions, ...field.validationOptions }, 'onBlur', true)) {
				form.validate(field.name);
			}
		},
		onInput({ field, form }) {
			if (!field.meta.dirty) {
				form.setFieldMeta(field.name, {
					dirty: true
				});
			}
		},
		onValidate({ field, form }) {
			const validation = field.validation;
			if (!isUndefined(validation)) {
				if (isFunction(validation)) {
					return validation(field.value, { form, field });
				} else if (isArray(validation)) {
					return validation.map(v => isFunction(v) ? v(field.value, { form, field }) : {} );
				} else if (isString(validation) || isObject(validation)) {
					return getValidator(validation)(field.value, { form, field });
				}
				console.warn(`Can't process the validator ${validation}`);
			}
			return form.settings.defaultFieldMeta;
		}
	}
};

export default {
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
			type: [String, Function, Object],
		},
		name: {
			type: String,
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
	data() {
		return {
			id: null,
		};
	},
	computed: {
		$name() {
			return this.name || this.id;
		},
		$value() {
			if (this.controlled) {
				return this.value;
			} else {
				return this.$form.fields[this.$name] ? this.$form.fields[this.$name].value : null;
			}
		},
		$meta() {
			return this.$form.fields[this.$name] ? this.$form.fields[this.$name].meta : {};
		},
		controlled() {
			return typeof this.value !== 'undefined';
		}
	},
	watch: {
		value(value) {
			this.$form.setFieldValue(this.$name, value, {
				forced: true,
				internal: true
			});
		},
		name(name, oldName) {
			if (this.$form) {
				this.$form.unmountField(oldName);
				this.$nextTick(() => {
					this.$form.mountField(this);
					if (this.onMount) {
						this.onMount({ field: this.interface(), form: this.$form });
					}
				});
			}
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
		}
	},
	destroyed() {
		if (this.$form) {
			this.$form.unmountField(this);
		}
	},
	methods: {
		interface() {
			const self = this;
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
					self.$form.setFieldValue(self.$name, value).then(() => {
						debounce(
							self.$form.validate(self.$name),
							getValue({ ...self.$form.validationOptions, ...self.validationOptions }, 'debounce', 0)
						);
					});
				},
				// Events
				events: {
					blur: this.handleBlur,
					focus: this.handleFocus,
					input: this.handleInput,
				},
				// Props
				validation: this.validation,
				validationOptions: this.validationOptions,
				ref: this
			};
		},
		getName() {
			return this.$name;
		},
		getValue() {
			return this.$value;
		},
		getMeta() {
			return this.$meta;
		},
		getForm() {
			return this.$form;
		},
		getInitialValue() {
			return this.defaultValue;
		},
		handleFocus(event) {
			if (isFunction(this.onFocus)) {
				this.onFocus({ event, field: this.interface(), form: this.getForm() });
			}
		},
		handleBlur(event) {
			if (isFunction(this.onBlur)) {
				this.onBlur({ event, field: this.interface(), form: this.getForm() });
			}
		},
		handleInput(event) {
			if (isFunction(this.onInput)) {
				this.onInput({ event, field: this.interface(), form: this.getForm() });
			}
		},
	},
	render(createElement) {
		if (this.id) {
			return createElement(this.component, [
				this.$scopedSlots.default(this.interface())
			]);
		} else {
			return createElement(this.component);
		}
	}
};
</script>
