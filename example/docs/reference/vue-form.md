---
title: VueForm
---

# VueForm

`VueForm` component is the main component of this library, it contains internal form state and most of its logic.
All fields in this library should be contained by this component.

```html
<vue-form>
	<field name="email" v-slot="field">
    	<input v-model="field.value" v-on="field.events">
    </field>
</vue-form>
```

## Interface

The interface of `VueForm` provide a developer to possibility to access to form's internals, invoke different actions and etc.
It can be accessed from the three places:

1. Through `v-slot` directive
```html
<vue-form v-slot="form">
	...
</vue-form>
```
2. Globally by using `this.$form` method
```js
const form = this.$form('name-of-form')
```
3. Inside one of numerous field and form callbacks
```js
onSubmit({ form }) {
	...
}
```

### Data

This fields are just objects from the internal state of the form.

### `meta`

Form's meta
```js
{
	dirty: false,
	submitting: false,
	validating: false,
	valid: false,
	submitCount: 0
}
```

### `fields`

The object, that contains the fields data:
```js
{
   'user.email': {
   		value: 'noname@yandex.ru',
   		meta: {
   			error: '',
   			touched: true,
   			dirty: true
   		}
   },
   'user.password': {
   		value: '123456',
   		meta: {
   			error: '',
   			touched: true,
   			dirty: true
   		}
   }
}
```

### `values`

Not normalized object that represents fields values
```js
{
   user: {
   		email: 'noname@yandex.ru',
   		password: '123456'
   }
}
```

### Getters

### `getField(name)`

Return the field's data by its name. For example:
```js
{
	name: 'email',
	value: 'noname@yandex.ru',
	meta: {
		error: '',
		touched: true,
		dirty: true
	}
}
```

### `getFields()`

Return the array with that contains field's data. For example:
Return the field's data by its name. For example:
```js
[
	{
		name: 'email',
		value: 'noname@yandex.ru',
		meta: {
			error: '',
			touched: true,
			dirty: true
		}
	},
	{
		name: 'password',
		value: '123456',
		meta: {
			error: '',
			touched: true,
			dirty: true
		}
	}
]
```

### `getFieldRef(name)`

Return the **first** ref for the field by it's name

### `getFieldRefs(name)`

Return all refs for the field by it's name

### `getFieldMeta(name, property)`

Returns the field's meta property value. If property is not defined, it returns object with all meta values.

### `getFieldValue(name)`

Returns the field's value by its name.

### Actions

### `validate(field)`
 
Run field-level validation. If field is not defined runs complete form-level validation.

### `submit(params)`

Run form's submit. The parameter `params` are optional parameter that will be passed to `onSubmit`, `onStartSubmit` and `onEndSubmit` callbacks

### `setFieldValue(name, value)`

Set field value by its name

### `setFieldMeta(name, meta)`

Set field meta by its name. Parameter `meta` should be object, for example:
```js
setFieldMeta(email, {
	touched: true
})
```

### `setMeta(meta)`

Set forms meta. Parameter `meta` should be object, for example:
```js
setMeta(email, {
	submitting: true
})
```

::: tip Notice!
You can't set computed form's meta properties
:::

### `setFieldsMeta(meta)`

Batch set of fields meta. It behaves same way as the default [form-level validation](http://localhost:8080/vue-advanced-cropper/guides/validation.html#form-level-validation) response processing.
For example:
```js
{
	error: {
		main: {
			login: 'This field is required',
			password: 'This field is required',
		}
	}
}
```

This action is useful for manual fields validation, for example after submit error.

### `resetField(name)`

Reset field value by name to its initial value. It may be:
- the value from `initialValues` form's prop 
- the value from `initialValue` prop of first ref for this field
- the empty value (`''`)

### `removeField(name)`

Remove field by its name. It's recommended to not use this action, but in `onUnmountField` callback.

### `createField(name, value, meta, params)`

Create the field with specific name, value and meta parameters. The options parameter `params` is used
to set `mounted` and `controlled` properties.

### Behavior

### `onSubmit({ form, params, values })`

The function that will called on successful submit.

### `onStartSubmit({ form, params, values })`

The function that will called on start submit.

### `onEndSubmit({ form, params, values })`

The function that will called on resolve of promise in `onStartSubmit`.

### `onStartValidate({ form, field })`

The function that will called on start validation.

### `onEndValidate({ form, field })`

The function that will called on resolve of promise in `onStartValidate`.

## Props

### Basic

### `name`

### `initialValues`

### `initialFieldsMeta`

### `initialFormMeta`

### `validation`

### `validationOptions`

### `validationOptions`

### `component`


### Customize Meta

### `fieldMeta`

### `formMeta`


### Customize Behavior

### `onMountField`

### `onUnmountField`

### `onInitForm`

### `onResetForm`

### `onStartValidate`

### `onEndValidate`

### `onChangeField`

### `onSubmit`

### `onStartSubmit`

### `onEndSubmit`

