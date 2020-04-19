<script>
import Vue from 'vue';

import { core } from '../service/core';
import { freeze, isEqual, isFunction, flattenMeta, getValue, deepcopy, removeValueByPath, setValueByPath, getIn, mergeValidations, isUndefined, ownProperties, isObject, isArray, isPromise, isString } from '../service/common';

export const formDefaults = {
	fieldMeta: {
		dirty: {
			default: false
		},
		touched: {
			default: false,
		},
		error: {
			default: null,
			validate: true
		}
	},
	formMeta: {
		dirty: {
			default: false,
			computed({ form }) {
				return form.getFields().some(field => Boolean(field.meta.dirty));
			}
		},
		valid: {
			default: true,
			computed({ form }) {
				return form.getFields().every(field => !field.mounted || !field.meta.error);
			}
		},
		submitting: {
			default: false,
		},
		validating: {
			default: false,
		},
		submitCount: {
			default: 0
		}
	},
	behavior: {
		onUnmountField({ form, field }) {
			form.removeField(field.name);
		},
		onMountField({ form, field }) {
			// pass
		},
		onInitForm({ form }) {
			const { defaultFormMeta } = this.settings;

			form.setMeta(defaultFormMeta);
		},
		onResetForm({ form }) {
			const { defaultFormMeta } = this.settings;

			this.getFields().forEach(field => {
				form.resetField(field.name);
			});

			form.setMeta(defaultFormMeta);
		},

		onStartValidate({ form, field }) {
			form.setMeta({
				validating: true,
			});

			const promises = [];

			if (!field || getValue(form.validationOptions, 'formValidate', 'normal') === 'always') {
				form.getFields().forEach(({ name }) => {
					promises.push({ [name]: form.settings.defaultFieldMeta });
				});
				promises.push(form.validateForm().then(flattenMeta));
			}

			form.getFieldRefs().forEach(ref => {
				if (!field || form.isLinked(field, ref.getName())) {
					promises.push(form.validateField(ref));
				}
			});

			return Promise.all(promises);
		},

		onEndValidate({ form, data }) {
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
			console.log(data)

			const { fieldMeta } = form.settings;
			const validations = mergeValidations(data, this.fieldMeta);

			form.getFields().forEach(field => {
				const updatedMeta = {};
				fieldMeta.forEach(meta => {
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
				validating: false,
			});
		},
		onStartSubmit({ form, params }) {
			form.setMeta({
				submitting: true,
				submitCount: form.meta.submitCount + 1
			});
			form.getFields().forEach(field => {
				form.setFieldMeta(field.name, {
					touched: true,
				});
			});
			return form.validate().then(() => {
				if (form.meta.valid) {
					if (form.onSubmit) {
						return form.onSubmit({ form, params, values: freeze(form.values) });
					}
				}
			});
		},
		onSubmit({ form, params, values }) {

		},
		onEndSubmit({ form, params }) {
			form.setMeta({
				submitting: false,
			});
		}
	}
};

export default {
	provide() {
		return {
			$form: this.interface()
		};
	},
	props: {
		name: {
			type: String,
		},
		fieldMeta: {
			type: Object,
			default() {
				return formDefaults.fieldMeta;
			}
		},
		formMeta: {
			type: Object,
			default() {
				return formDefaults.formMeta;
			}
		},
		initialValues: {
			type: Object,
			default() {
				return {};
			}
		},
		initialFieldsMeta: {
			type: Object,
			default() {
				return {};
			}
		},
		initialFormMeta: {
			type: Object,
			default() {
				return {};
			}
		},
		validation: {
			type: Function,
		},
		validationOptions: {
			type: Object,
			default() {
				return {
					onChange: true,
					onBlur: true,
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
			type: Function,
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
	data() {
		const data = {
			countFields: 0,
			meta: {},
			values: {},
			fields: {}
		};
		for (const name of ownProperties(this.formMeta)) {
			data.meta[name] = isUndefined(this.initialFormMeta[name]) ? this.formMeta[name].default : this.initialFormMeta[name];
		}
		return data;
	},
	computed: {
		settings() {
			const fieldMeta = ownProperties(this.fieldMeta).map(name => ({
				name,
				...this.fieldMeta[name]
			}));

			const formMeta = ownProperties(this.formMeta).map(name => ({
				name,
				...this.formMeta[name]
			}));

			const defaultFieldMeta            = {};
			const defaultValidatableFieldMeta = {};
			fieldMeta.forEach(meta => {
				defaultFieldMeta[meta.name] = meta.default;
				if (meta.validate) {
					defaultValidatableFieldMeta[meta.name] = meta.default;
				}
			});

			const defaultFormMeta = {};
			formMeta.forEach(meta => {
				defaultFormMeta[meta.name] = meta.default;
			});

			return {
				fieldMeta,
				formMeta,
				defaultFieldMeta,
				defaultValidatableFieldMeta,
				defaultFormMeta
			};
		}
	},
	created() {
		this.registry = {};
		this.values   = deepcopy(isObject(this.initialValues) ? this.initialValues : {});
	},
	mounted() {
		if (this.name) {
			core.create(this.name, this);
		}
	},
	destroyed() {
		if (this.name && this.$form && this.$form(this.name)) {
			core.delete(this.name);
		}
	},
	methods: {
		interface() {
			const self = this;
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

		getFieldRef(field) {
			if (isString(field)) {
				return this.getFieldRefs(field)[0];
			} else {
				return field;
			}
		},

		getFieldRefs(name) {
			if (name) {
				return Object.values(this.registry).filter(el => el.getName() === name).sort(el => el.getName());
			} else {
				return Object.values(this.registry).sort(el => el.getName());
			}
		},

		getFieldInterface(field) {
			const self = this;
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
		getField(name) {
			const field = this.fields[name];

			if (field) {
				return this.getFieldInterface(field);
			} else {
				return null;
			}
		},
		getFields() {
			return ownProperties(this.fields).map(name => ({
				name: name,
				value: this.fields[name].value,
				meta: this.fields[name].meta,
				refs: this.registry[name],
				mounted: this.fields[name].mounted,
			}));
		},
		getInitialValue(name, ref) {
			const initialValue = getIn(this.initialValues, name);
			const field        = ref ? ref : this.getFieldRef(name);
			if (!isUndefined(initialValue)) {
				return initialValue;
			} else if (field) {
				return field.getInitialValue();
			} else {
				return '';
			}
		},
		getFieldValue(name) {
			return getIn(this.values, name);
		},
		getFieldMeta(name, property) {
			const meta = this.fields[name] ? this.fields[name].meta : {};
			if (property) {
				return meta[property] || undefined;
			} else {
				return meta;
			}
		},
		getInitialFieldMeta(path) {
			const { fieldMeta } = this.settings;
			const result      = {};

			for (const meta of fieldMeta) {
				result[meta.name] = getIn(this.initialFieldsMeta[meta.name], path, meta.default);
			}
			return result;
		},
		getChildren(name) {
			return Object.keys(this.fields).filter(field => field !== name && field.indexOf(name) === 0);
		},

		isLinked(firstName, secondName) {
			return firstName === secondName || firstName.indexOf(secondName) === 0;
		},
		registerField(field) {
			// Generate the id
			const id          = `$field_${this.countFields}`;
			const name        = field.getName() || id;
			this.registry[id] = field;
			this.countFields += 1;

			// Add the id for the Field component
			field.id = id;

			return {
				id, name
			};
		},
		removeField(name) {
			if (this.values) {
				removeValueByPath(this.values, name);
			}
			Vue.delete(this.fields, name);
		},
		mountField(fieldRef) {
			const { name }       = this.registerField(fieldRef);
			const initialMeta  = this.getInitialFieldMeta(name);
			const initialValue = this.getInitialValue(name, fieldRef);
			if (!this.fields[name]) {
				this.createField(name, initialValue, initialMeta, { mounted: true, controlled: fieldRef.controlled });
			}
			this.fields[name].mounted = true;
			this.onMountField({ form: this.interface(), field: fieldRef.interface() });
		},
		createField(name, initialValue = null, initialMeta = {}, params = {}) {
			const { fieldMeta }  = this.settings;
			const filteredMeta = {};
			fieldMeta.forEach(meta => {
				if (meta.name in initialMeta) {
					filteredMeta[meta.name] = initialMeta[meta.name];
				}
			});

			let value = getIn(this.values, name);
			if (isUndefined(value)) {
				setValueByPath(this.values, name, initialValue);
				value = initialValue;
			}

			Vue.set(this.fields, name, {
				...params,
				meta: filteredMeta,
				value: value,
			});

			this.updateForm();
		},


		updateFieldValue(name, value, options) {
			const fields = [name, ...this.getChildren(name)];

			fields.forEach(field => {
				const oldValue = this.fields[field].value;
				const newValue = getIn(this.values, field);
				if (oldValue !== newValue) {
					this.fields[field].value = newValue;
					if (isFunction(this.onChangeField)) {
						this.onChangeField({
							form: this,
							field: name,
							oldValue,
							newValue,
							options
						});
					}
				}
			});
			this.updateForm();
		},
		setFieldValue(name, value, options = {}) {
			return new Promise((resolve, reject) => {
				if (name in this.fields) {
					const field = this.fields[name];
					if (!field || !field.$controlled || options.forced) {
						setValueByPath(this.values, name, value);
						this.updateFieldValue(name, value, options);
					} else {
						this.getFieldRefs(name).forEach(ref => {
							ref.$emit('change', value);
						});
					}
				} else {
					console.warn(`Can't set the value for not mounted field ${name}`);
				}
				Vue.nextTick(() => {
					resolve({ name, value, options });
				});
			});
		},
		setFieldMeta(name, value) {

			return new Promise((resolve, reject) => {
				if (name in this.fields) {
					const { fieldMeta } = this.settings;
					fieldMeta.forEach(meta => {
						if (meta.name in value) {
							if (this.fields[name].meta[meta.name] !== value[meta.name]) {
								this.fields[name].meta[meta.name] = value[meta.name];
							}
						}
					});
					this.updateForm();
				} else {
					console.warn(`Can't set the meta for not existing field ${name}`);
				}
				Vue.nextTick(() => {
					resolve({ name, value });
				});
			});
		},

		resetField(name) {
			const initialValue = this.getInitialValue(name);
			const initialMeta  = this.getInitialFieldMeta(name);

			if (!this.fields[name].controlled && initialValue) {
				this.setFieldValue(name, initialValue, {
					internal: true
				});
			}
			this.setFieldMeta(name, initialMeta);
		},

		unmountField(fieldRef) {
			const name = fieldRef.getName();
			delete this.registry[fieldRef.id];
			if (this.fields[name]) {
				this.fields[name].mounted = this.getFieldRefs(name).length > 0;
			}
			if (this.onUnmountField) {
				this.onUnmountField({ form: this.interface(), field: fieldRef.interface() });
			}
		},

		setMeta(value, preventUpdate = false) {
			const { formMeta } = this.settings;
			formMeta.forEach(meta => {
				if (meta.name in value) {
					if (meta.name in this.meta) {
						this.meta[meta.name] = value[meta.name];
					} else {
						Vue.set(this.meta, meta.name, value[meta.name]);
					}
				}
			});
			if (!preventUpdate) {
				this.updateForm();
			}
		},
		validateForm() {
			const validator = this.validation;
			return new Promise((resolve, reject) => {
				if (validator) {
					const value = validator(this.values);
					if (isPromise(value)) {
						value.then((response) => {
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
		validateField(field) {
			const name = field.getName();
			const { defaultValidatableFieldMeta } = this.settings;
			return new Promise((resolve, reject) => {
				if (field.onValidate) {
					const value = field.onValidate({ field: field.interface(), form: this.interface() });
					if (isPromise(value)) {
						value.then((response) => {
							resolve(response);
						});
					} else {
						resolve(value);
					}
				} else {
					resolve(null);
				}
			}).then(response => {
				if (isArray(response)) {
					return response.map(el => ({
						[name]: { ...defaultValidatableFieldMeta, ...el }
					}));
				} else if (isObject(response)) {
					return {
						[name]: { ...defaultValidatableFieldMeta, ...response }
					};
				} else {
					return defaultValidatableFieldMeta;
				}
			});
		},
		validate(field) {
			const name = isObject(field) ? field.getName() : field;
			return this.onStartValidate({ form: this, field: name }).then(
				(data) => {
					this.onEndValidate({
						form: this.interface(),
						field,
						data
					});
					this.updateForm();
					return Vue.nextTick();
				}
			);
		},
		updateMeta(values) {
			const normalizedValues = flattenMeta(values);
			for (const name of ownProperties(flattenMeta)) {
				if (this.fields[name]) {
					this.setFieldMeta(name, normalizedValues[name]);
				}
			}
		},
		submit(params) {
			const form = this.interface();
			this.onStartSubmit({ form, params }).then(() => {
				this.onEndSubmit({ form, params });
			});
		},
		updateForm() {
			const { formMeta } = this.settings;

			const update = {};
			formMeta.forEach(meta => {
				if (isFunction(meta.computed)) {
					const value = meta.computed({ form: this.interface() });
					if (!isEqual(this.meta[meta.name], value)) {
						update[meta.name] = value;
					}
				}
			});
			if (ownProperties(update).length) {
				this.setMeta(update, true);
			}
		}
	},
	render(createElement) {
		const form = this;
		const properties = this.component === 'form' ? {
			on: {
				submit(event) {
					form.submit();
					event.preventDefault();
				}
			}
		} : {};
		return createElement(this.component, properties, [
			this.$scopedSlots.default(this.interface())
		]);
	}
};
</script>