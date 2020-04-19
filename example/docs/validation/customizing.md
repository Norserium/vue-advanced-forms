---
title: Customizing
---

# Customizing

The validation process can be described by the following scheme:

![Overview](../.vuepress/assets/validation/scheme.svg)

It means, that developer can implement a wide range of validation schemes by passing the corresponding
functions to `Form`, `Field` and `FieldArray` props.


### `runValidation`

**Params:** `field` (the name of a field or the reference to it).

**Returns:** promise, that should be resolved on end validation

This methods does nothing, but run `onStartValidation` method and then run `onEndValidation`.

### `onStartValidation`

**Params:** `field`, `form`

**Returns:** promise, that should be resolved on completing work of the validators

By default, this function gets the field-level validations and form-level validation results, resolve all of it, and return the Promise that resolve array of results to proccessing by `onEndValidation` function.

The example of this array:
```js
[
  {
     'name': {
        error: 'You are not allowed to have this name!'
     }
  },
  {
     'password': {
        error: 'Password is too strong for you, mortal!'
     }
  },
]
```

It implements the following procedure:
- Set form meta `validating` to `true`
- Run all field-level validations if `field` is not passed, otherwise run field-level validations only for the current field and linked fields
- Run form-level validation if `field` is not passed or `validateOptions.validateForm` value is equal to `always`

### `onEndValidation`

**Params:** `field`, `form`, `data` (resolved result of `onStartValidation`)

**Returns:** promise, that should be resolved on the end of validation

This function process `onStartValidation` response. By default, it merge validation results and update validable meta data.

It implements the following procedure:
- [Merge validations]() responses
- Update validable meta values of the fields
- Set `validating` to `false`


### `onValidate`

**Params:** `field`, `form`

**Returns:** promise, that should be resolved on the end of validation

This function is invoked by `runFieldValidation` function (in default `onStartValidation` function, for example). By default, it invokes function that passed to `validate` prop or gets global validator and invokes one.
