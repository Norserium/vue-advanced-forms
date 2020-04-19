---
title: General
---

# General

This library is designed to allow developer add validation easily and painless and wildly customize in the same time.


Conceptually, the validation can be perceived just as uniform way to set the form and fields meta. Literally. In this part will be described the standard validation implemented in this library. It provides support of synchronous and asynchronous
form-level and field-level validation

## Form-level validation

Form-level validation is intented to validate all fields at the same time, especially when they are depend on each other.
To enable form-level validation you should pass your custom function to `validate` prop of `Form` component. The function can be 
synchronous or asynchronous (return a Promise)


```html
<Form :validate="validate">
  ...
</Form>
```

```js
validate({ values, form }) {
	return {
		error: {
			name: values.name === 'immortal' ? 'You should not use this name!' : null,
			password: values.length > 6 ? 'Your password is too hard, mortal!' : null
		},
	}
}
```

::: tip Notice!
Function `validate` returns object with `error` field, that actually contains field errors.
It's needed to give the developer possibility to make different meta attributes validable (for example, `error` and `warning`).
:::

### Nested fields / arrays

To validate nested fields or arrays you should return object, similar than object, that describes form values.
For example,  your form is described by the following object:
```js
{
   general: {
      names: [
         'Max Payne',
         'Avatar',
         'Nobody'
      ],
      checked: true
   }
}
```

To validate it fields, you should return the object like:
```js
{
   error: {
	   general: {
		  names: [
			 null,
			 null,
			 'You should set the correct name'
		  ],
		  checked: 'This field should be checked'
	   }
   }
}
```

But there is a catch. How to set error for the array itself? If you have got no errors
in the its children fields, you can set the error pretty easy:
```js
{
   error: {
	   general: {
		  names: 'Too few elements',
		  checked: 'This field should be checked'
	   }
   }
}
```

Otherwise, you should use more complex object:
```js
{
   error: {
	   general: {
		  names: {
		  	$self: 'Too few elements',
		  	$children: [
				null,
				null,
				'You should set the correct name'
			]},
	      }
		  checked: 'This field should be checked'
	   }
   }
}
```

## Field-level validation

[Field-level validation]() is intended to easily set the validation for specific fields. 
By default, it support two conceptually different approaches to field-level validation.

### Validation method

You can pass a method to `validation` prop, that will return the new field meta as an object or as an array of objects.

```html
<Field :validation="password" />
```

```js
password({ value, field, form}) {
	return {
		error: value.length > 6 ? 'Your password is too hard, mortal!' : null
	}
}
```

### Validation string / object

This approach is inspired by [VeeValidate](), and has the similar interface.

```html
<Field validation="required | password | max-length:5" />
```

```html
<Field :validation="{ required: condition }" />
```


## Options

