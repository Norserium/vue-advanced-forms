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

function parseParams(params, form) {
	const parsed = { ...params };
	for (const name of ownProperties(params)) {
		if (params[name] && params[name][0] === '@') {
			parsed[name] = form ? form.getFieldValue(params[name].slice(1)) : undefined;
		}
	}
	return parsed;
}

function internalParser(rules) {
	const result = [];
	if (isString(rules)) {
		for (const rule of rules.split('|')) {
			const [name, params] = rule.split(':');
			const scheme         = core.validators[name];
			if (scheme) {
				const listParams = params ? params.split(',') : [];
				result.push({
					params: scheme.params ? arrayToObject(listParams, scheme.params) : listParams,
					validator: scheme.validator
				});
			} else {
				console.warn(`There is no global validator with name ${name}`);
			}
		}
	} else if (isObject(rules)) {
		for (const name of ownProperties(rules)) {
			const scheme = core.validators[name];
			if (scheme) {
				let params = {};
				if (isObject(rules[name])) {
					params = rules[name]
				} else if (isArray(rules[name])) {
					params = scheme.params ? arrayToObject(rules[name], scheme.params) : rules[name]
				}
				result.push({
					params,	validator: scheme.validator
				});
			} else {
				console.warn(`There is no global validator with name ${name}`);
			}
		}
	}
	return result;
}

export function parseValidator(rules, form) {
	const parsedRules = internalParser(rules);

	return parsedRules.map(({validator, params}) => {
		const links = [];
		let processedParams = {};
		if (isObject(params)) {
			processedParams = {...params};
			for (const name of ownProperties(processedParams)) {
				if (processedParams[name] && processedParams[name][0] === '@') {
					const field = processedParams[name].slice(1)
					processedParams[name] = form ? form.getFieldValue(field) : undefined;
					links.push(field);
				}
			}
		} else if (isArray(params)) {
			processedParams = params.map(param => {
				if (param && param[0] === '@') {
					const field = param.slice(1);
					links.push(field);
					return form ? form.getFieldValue(field) : undefined;
				}
				return param;
			});
		}
		return {
			links,
			validator,
			params: processedParams
		};
	});
}

export function getValidator(rules, { form }) {
	const validators = [];
	if (isString(rules)) {
		for (const rule of rules.split('|')) {
			const [name, params] = rule.split(':');
			const scheme         = core.validators[name];
			if (scheme) {
				const arrayParams = params ? params.split(',') : [];
				validators.push((value) => scheme.validator(value, parseParams(arrayToObject(arrayParams, scheme.params), form)));
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
						scheme.validator(value, parseParams(rules[name], form));
					} else if (isArray(rules[name])) {
						scheme.validator(value, parseParams(arrayToObject(rules[name], scheme.params), form));
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
			Promise.all(validators.map(validator => validator(...value)))
				.then(validations => {
					resolve(validations);
				})
				.catch((data) => {
					reject(data);
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

