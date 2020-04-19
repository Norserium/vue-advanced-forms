import { isArray, isObject, isFunction, isString, arrayToObject, ownProperties } from './common';

import Vue from 'vue';

export const core = {
	validators: {},
	install(Vue) {
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
	create(name, ref) {
		if (this.installed) {
			Vue.set(this.vm.$data.forms, name, {
				...ref.interface()
			});
		}
	},
	delete(name) {
		if (this.installed) {
			if (this.forms) {
				Vue.delete(this.forms, name);
			}
		}
	},
	init() {
		this.$form = (name) => {
			if (this.installed) {
				return core.vm.$data.forms[name];
			} else {
				return null;
			}
		};
	}
};

export function getValidator(rules) {
	const validators = [];
	if (isString(rules)) {
		for (const rule of rules.split('|')) {
			const [name, params] = rule.split(':');
			const scheme         = core.validators[name];
			if (scheme) {
				const arrayParams = params ? params.split(',') : [];
				validators.push((value) => scheme.validator(value, arrayToObject(arrayParams, scheme.params)));
			} else {
				console.warn(`There is no global validator with name ${name}`);
			}
		}
	} else if (isObject(rules)) {
		for (const name of ownProperties(rules)) {
			const scheme = core.validators[name];
			validators.push((value) => {
				if (scheme) {
					if (isObject(rules[name])) {
						scheme.validator(value, rules[name]);
					} else if (isArray(rules[name])) {
						scheme.validator(value, arrayToObject(rules[name], scheme.params));
					} else if (rules[name]) {
						scheme.validator(value, {});
					}
				} else {
					console.warn(`There is no global validator with name ${name}`);
				}
			});
		}
	}
	return (...value) => {
		return new Promise((resolve, reject) => {
			Promise.all(validators.map(validator => validator(...value))).then(validations => {
				resolve(validations);
			});
		});
	};
}

export function registerValidator(name, scheme) {
	if (isFunction(scheme)) {
		core.validators[name] = {
			validator: scheme,
			params: [],
		};
	} else {
		core.validators[name] = scheme;
	}
}
