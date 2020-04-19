---
title: Form-level validation
---

# Form-level validation

Form-level validation is intented to validate all fields at the same time, especially when they are depend on each other.
To enable form-level validation you should pass your custom function to `validate` prop of `Form` component.


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

This format is described in the section about [flattening meta]() in detail.


