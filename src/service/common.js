import Vue from 'vue';
import memoize from 'fast-memoize';
import debounce from 'debounce';

const INFINITY = 1 / 0;
const ESCAPE_CHARACTERS = /\\(\\)?/g;
const PROP_NAMES = RegExp(
	'[^.[\\]]+' + '|' +
	// Or match property names within brackets.
	'\\[(?:' +
	// Match a non-string expression.
	'([^"\'][^[]*)' + '|' +
	// Or match strings (supports escaping characters).
	'(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
	')\\]'+ '|' +
	// Or match "" as the space between consecutive dots or empty brackets.
	'(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
	, 'g');

export function deepcopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

export function isUndefined(obj) {
	return typeof obj === 'undefined';
}

export function isPromise(obj) {
	return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function isString(obj) {
	return typeof obj === 'string';
}

export function isBoolean(obj) {
	return typeof obj === 'boolean';
}

export function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}

export function isNull(obj) {getValue;
	return obj === null;
}

export function isArray(obj) {
	return Array.isArray(obj);
}

export function isFunction(obj) {
	return obj && (Object.prototype.toString.call(obj) === '[object Function]' || 'function' === typeof obj || obj instanceof Function);
}

export function isSymbol(obj) {
	return (obj && ((typeof obj === 'symbol')
		|| (obj['@@toStringTag'] === 'Symbol')
		|| toString.call(obj) === '[object Symbol]')) || false;
}

export function isInteger(obj) {
	return String(Math.floor(Number(obj))) === obj;
}

export function getValue(obj, key, defaultValue = null) {
	return key in obj ? obj[key] : defaultValue;
}

export function ownProperties(obj) {
	return Object.keys(obj);
}

export function flatten(obj) {
	const queue = [{
		element: obj,
		parent: null
	}];
	const result = [];
	while (queue.length) {
		let node = queue.pop();
		if (isObject(node.element) || isArray(node.element)) {
			for (const field of ownProperties(node.element)) {
				queue.push({
					name: field,
					element: node.element[field],
					parent: node
				});
			}
		} else {
			const element = node.element;
			let branch = '';
			while (node.parent !== null) {
				branch = (isArray(node.parent.element) ? `[${node.name}]` : `${node.parent.parent ? '.' : ''}${node.name}`) + branch;
				node = node.parent;
			}
			result[branch] = element;
		}
	}
	return result;
}


export function getIn(object, pathString, defaultValue) {
	const path = toPath(pathString);

	let index = 0;
	while (object && index < path.length) {
		object = object[path[index++]];
	}

	return object === undefined ? defaultValue : object;
}

export function insertToArray(array, index, value, defaultValue) {
	const length = array.length;
	if (length > index) {
		array.splice(index, 1, value);
	} else {
		for (let i = 0; i < index - length; i++) {
			array.push(defaultValue);
		}
		array.push(value);
	}
	return array;
}

export function setValueByPath(object, pathString, value, defaultValue) {
	const path = toPath(pathString);

	let previousElement = object;
	for (let index = 0; index < path.length; index++) {
		const isLast = index === path.length - 1;
		const currentElement = getIn(object, path.slice(0, index + 1));
		if (!currentElement || isLast || !isObject(currentElement) && !isArray(currentElement)) {
			const nextValue = isLast ? value : (isInteger(path[index + 1]) && Number(path[index + 1]) >= 0 ? [] : {});
			if (isArray(previousElement)) {
				insertToArray(previousElement, path[index], nextValue);
			} else {
				Vue.set(previousElement, path[index], isUndefined(nextValue) ? defaultValue : nextValue);
			}
		}
		previousElement = getIn(object, path.slice(0, index + 1));
	}
}

export function removeValueByPath(object, pathString) {
	const path = toPath(pathString);

	let previousElement = getIn(object, path.slice(0, path.length - 1));
	let removedElement = path[path.length - 1];

	if (isArray(previousElement)) {
		const index = Number(removedElement);
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

export function freeze(object) {
	return Object.assign({}, object);
}

const stringToPath = memoize((string, delimiter='.') => {
	const result = [];
	if (string.charCodeAt(0) === delimiter.charCodeAt(0)) {
		result.push('');
	}
	string.replace(PROP_NAMES, (match, expression, quote, subString) => {
		let key = match;
		if (quote) {
			key = subString.replace(ESCAPE_CHARACTERS, '$1');
		}
		else if (expression) {
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
	const result = `${value}`;
	return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

export function splitOnPathAndIndex(name) {
	const path = toPath(name);
	return [
		path.slice(0, path.length - 1),
		path[path.length - 1]
	];
}

export function processName(path) {
	const result = path.match(/(.*?)\[(\d+)\]?$/);
	if (result) {
		return [result[1], result[2]];
	} else {
		return [null, null];
	}
}

export function toPath(value) {
	if (Array.isArray(value)) {
		return value.map(toKey);
	}
	return isSymbol(value) ? [value] : [...stringToPath(value)];
}

export function isEqual(a, b) {
	return a == b;
}

export function defaultMergeAlgorithm(source, destination, name, defaultValue) {
	if (isArray(destination)) {
		return [...destination, ...source.filter(a => destination.find(b => isEqual(a, b)))];
	} else {
		return (isUndefined(destination) || isEqual(destination, defaultValue)) ? source : destination;
	}
}

export function mergeValidations(array, settings, mergeAlgorithm = defaultMergeAlgorithm) {
	const result = {};
	if (isArray(array)) {
		const blocks = array.reduce((value, block) => (isArray(block) ? value.concat(block) : value.concat([block])), []);
		blocks.forEach(fields => {
			if (isObject(fields)) {
				// traverse meta
				for (const name of ownProperties(fields)) {
					if (isObject(fields[name])) {
						// traverse fields
						if (result[name]) {
							for (const meta of ownProperties(fields[name])) {
								if (meta in result[name]) {
									result[name][meta] = mergeAlgorithm(fields[name][meta], result[name][meta], meta, settings[meta].default);
								} else {
									result[name][meta] = fields[name][meta];
								}
							}
						} else {
							result[name] = { ...fields[name] };
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


export function updateArray(value, newValue) {
	if (value.length > newValue.length) {
		value.splice(0, newValue.length);
	}
	for (let i = 0; i < value.length; i++) {
		if (!isEqual(value[i], newValue[i])) {
			Vue.set(value, i, newValue[i]);
		}
	}
	if (value.length < newValue.length) {
		for (let i = value.length; i < newValue.length; i++) {
			value.push(newValue[i]);
		}
	}
}

export function flattenMeta(obj) {
	const result = {};

	for (const meta of ownProperties(obj)) {
		const queue = [
			{
				element: obj[meta],
				parent: null
			}
		];
		while (queue.length) {
			let node = queue.pop();
			if (isObject(node.element) || isArray(node.element)) {
				for (const field of ownProperties(node.element)) {
					queue.push({
						name: field,
						element: node.element[field],
						parent: node
					});
				}
			} else {
				const value = node.element;
				let branch = '';
				while (node.parent !== null) {
					if (isArray(node.parent.element)) {
						branch = `[${node.name}]` + branch;
					} else if (node.name !== '$self' && node.name !== '$children') {
						branch = `${node.parent.parent ? '.' : ''}${node.name}` + branch;
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
	return result;
}

export function arrayToObject(array, names) {
	const result = {};
	names.forEach((name, index) => {
		result[name] = array[index];
	});
	return result;
}

const debounces = [];
export function initDebounce(callback, timeout) {
	const savedCallback = debounces.find((saved) => saved.callback === callback && saved.timeout === timeout)
	if (savedCallback) {
		return savedCallback.debounced;
	} else {
		const newCallback = debounce(callback, timeout);
		debounces.push({ debounced: newCallback, callback, timeout});
		return newCallback;
	}
}
