<script>
import debounce from 'debounce';
import { getValue, isFunction, isObject, isString, isUndefined, isArray } from '../service/common';
import { parseValidator } from '../service/core';

export const fieldDefaults = {

	behavior: {
		onMount({ field, form }) {
			if (getValue({ ...form.validationOptions, ...field.validationOptions }, 'onMount', false)) {
				form.validateField(field.name);
			}
		},
		onCreate({ field, form }) {

		},
		onFocus({ field, form }) {

		},
		onGetLinkedFields({ field }) {
			const linkedFields = [];
			if (field.validationOptions.linkedFields) {
				linkedFields.push(...field.validationOptions.linkedFields);
			}
			if (isString(field.validation) || isObject(field.validation)) {
				parseValidator(field.validation).forEach(({ links }) => {
					linkedFields.push(...links);
				});
			}
			return linkedFields;
		},
		onBlur({ field, form }) {
			form.setFieldMeta(field.name, {
				touched: true
			});
			if (getValue({ ...form.validationOptions, ...field.validationOptions }, 'onBlur', true)) {
				form.validateField(field.name);
			}
		},
		onInput({ field, form }) {
			if (!field.meta.dirty) {
				form.setFieldMeta(field.name, {
					dirty: true
				});
			}
		},
		onChange({ field, form }) {
			if (getValue({ ...form.validationOptions, ...field.validationOptions }, 'onChange', true)) {
				field.debouncedValidate();
			}
		},
		onValidate({ field, form }) {
			const validation = field.validation;
			if (!isUndefined(validation)) {
				if (isFunction(validation)) {
					return validation(field.value, { form, field });
				} else if (isArray(validation)) {
					return Promise.all(validation.map(v => isFunction(v) ? v(field.value, { form, field }) : {} ));
				} else if (isString(validation) || isObject(validation)) {
					return Promise.all(
						parseValidator(validation, form).map(({ validator, params }) => {
							return validator(field.value, params, { form, field });
						})
					);
				}
				console.warn(`Can't process the validator ${validation} for the field ${field.name}`);
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
		validationOptions: {
			type: Object,
			default() {
				return {};
			}
		},
		name: {
			type: String,
		},
		onFocus: {
			type: Function,
			default: fieldDefaults.behavior.onFocus
		},
		onBlur: {
			type: Function,
			default: fieldDefaults.behavior.onBlur
		},
		onInput: {
			type: Function,
			default: fieldDefaults.behavior.onInput
		},
		onValidate: {
			type: Function,
			default: fieldDefaults.behavior.onValidate
		},
		onChange: {
			type: Function,
			default: fieldDefaults.behavior.onChange
		},
		onMount: {
			type: Function,
			default: fieldDefaults.behavior.onMount
		},
		onCreate: {
			type: Function,
			default: fieldDefaults.behavior.onCreate
		},
		onGetLinkedFields: {
			type: Function,
			default: fieldDefaults.behavior.onGetLinkedFields
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
		},
		validation() {
			if (this.$form && !this.validation) {
				this.$form.validateField(this.$name);
			}
		}
	},
	created() {
		if (!this.$form) {
			throw new Error(`Can't create the Field instance (name: ${this.$name}) because it's not contained in any form`);
		} else {
			this.$form.mountField(this);
			if (this.onCreate) {
				this.onCreate({ field: this.interface(), form: this.$form });
			}
			// Arguable solution
			this.debouncedValidate = debounce(
				this.validate,
				getValue({ ...this.$form.validationOptions, ...this.validationOptions }, 'debounce', 0)
			);
		}
	},
	mounted() {
		if (this.onMount) {
			this.onMount({ field: this.interface(), form: this.$form });
		}
	},
	destroyed() {
		if (this.$form) {
			this.$form.unmountField(this);
		}
	},
	updated() {
		console.log('rerender', this.$name)
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
					self.$form.setFieldValue(self.$name, value, { internal: true }).then(() => {
						self.onChange({ field: self.interface(), form: self.$form });
					})
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
				// Methods:
				setValue: this.setValue,
				setMeta: this.setMeta,
				validate: this.validate,
				debouncedValidate: this.debouncedValidate,
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
		getLinkedFields() {
			return this.onGetLinkedFields({ field: this.interface(), form: this.$form });
		},
		setValue(value) {
			this.$form.setFieldValue(this.$name, value, { internal: true }).then(() => {
				this.onChange({ field: this.interface(), form: this.$form });
			})
		},
		setMeta(meta) {
			this.$form.setFieldMeta(this.$name, meta);
		},
		handleFocus(params) {
			if (isFunction(this.onFocus)) {
				this.onFocus({ params, field: this.interface(), form: this.getForm() });
			}
		},
		handleBlur(params) {
			if (isFunction(this.onBlur)) {
				this.onBlur({ params, field: this.interface(), form: this.getForm() });
			}
		},
		handleInput(params) {
			if (isFunction(this.onInput)) {
				this.onInput({ params, field: this.interface(), form: this.getForm() });
			}
		},
		validate() {
			return this.$form.validateField(this.$name);
		}
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
