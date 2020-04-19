---
title: Field
---

# Field

`Field` component is designated to pass to your input components actual field state. Currently, it can
 be used only as wrapper of your components, but the alternatives are investigating now.

The simplest example of passing input component to `Field` scoped slot might look like this:
```html
<Field name="email" v-slot="field">
	<input v-model="field.value" v-on="field.events">
</Field>
```

The `field` is the data passed by `Field` component, it contains:

- `name` the field name;
- `value` the field value;
- `meta` the field meta;
- `events` the object, that contains default events for `input` and `select` tags: `blur`, `focus`

## Controllable / Uncontrollable

### Uncontrollable Field

The field is uncontrolled by default. It means, that the value of the field is stored
in the form internally.

### Controllable Field

The value of a controllable field is stored externally. To make a field controllable you should pass 
some value to `value` prop, a controlled field can't change it directly, it emits `change` event instead.

```html
<Field :value="value" @change="changeValue" name="email" v-slot="field">
	<input v-model="field.value" v-on="field.events">
</Field>
```

But it much easy to do if use `v-model` directive:
```html
<Field v-model="value" name="email" v-slot="field">
	<input v-model="field.value" v-on="field.events">
</Field>
```


## Props

### `name`

A field's name the internal form state. To access nested objects or arrays, name can also accept lodash-like 
dot path like `user.name` or `users[0].name`

### `component`

A field wrapper component. Default `span`.

### `value`

The field value. If you pass any value to this prop will make the field **controllable**. It means,
that the field value will be equal to passed value. 

### `validation`

The prop to pass field-level validation. It's described in a detail in the [corresponding section](/guides/validation.html).

### `validationOptions`

The validation options

### `defaultValue`

The default value of the field. It is used if  initial value was not defined at the form level.

### `onMount`

The function that defines the mount behavior of the field.

### `onFocus`

The function that defines the field's focus behavior.

### `onBlur`

The function that defines the field's blur behavior.


### `onValidate`

The function that defines the field's validate behavior.


## Events

### `change`

This event is emitted on field's value change

## Examples

To relieve the binding form values to `input`, `textarea` and `select` elements,
we recommend to use `v-model` directive. It's a bit magical, as developers said, but
it eliminate much boilerplate.

### Text

```html
<field name="text" v-slot="field">
	<input v-model="field.value" v-on="field.events">
</field>
```

<text-example/>

### Multiline Text

```html
<field name="text" v-slot="field">
	<textarea v-model="field.value"></textarea>
</field>
```

<textarea-example/>


### Radio

```html
<field name="radio" v-slot="field">
	<label>
		<input type="radio" v-model="field.value" v-on="field.events" value="first-choice">
		First Choice
	</label>
	<label>
		<input type="radio" v-model="field.value" v-on="field.events" value="second-choice">
		Second Choice
	</label>
	<label>
		<input type="radio" v-model="field.value" v-on="field.events" value="third-choice">
		Third Choice
	</label>
</field>
```

<radio-example/>

### Select

```html
<field name="select" v-slot="field">
	<select v-model="field.value" v-on="field.events">
		<option disabled value="">Please select one</option>
		<option value="first-choice">First Choice</option>
		<option value="second-choice">Second Choice</option>
		<option value="third-choice">Third Choice</option>
	</select>
</field>
```

<select-example/>


### Checkboxes

Single checkbox, boolean value:
```html
<field name="boolean" :default-value="false" v-slot="field">
	<label>
		<input type="checkbox" v-model="field.value" v-on="field.events">
		Boolean Checkbox
	</label>
</field>
```

<boolean-checkbox-example/>

Multiple checkboxes, bound to the same field value:
```html
<field name="choice" :default-value="[]" v-slot="field">
	<label>
		<input type="checkbox" v-model="field.value" v-on="field.events" value="first-choice">
		First Choice
	</label>
	<label>
		<input type="checkbox" v-model="field.value" v-on="field.events" value="second-choice">
		Second Choice
	</label>
	<label>
		<input type="checkbox" v-model="field.value" v-on="field.events" value="third-choice">
		Third Choice
	</label>
</field>
```

<multiple-checkbox-example/>

::: tip Notice!
In the examples above the default field value is always set. It's strictly needed to correct
work of the `v-model` directive. As alternative you may set default value of the corresponding field
in `initialValues` of your form, it works too.
:::



## Advices

### Field Components

It may be too tedious to make the boilerplate to output the input element, errors and other meta data.
```html
<field name="text" v-slot="field" class="field">
	<input v-model="field.value" v-on="field.events" class="field__input">
	<p v-if="field.meta.error" class="field__error"> 
		{{ field.meta.error }} 
	</p>
</field>
```

So we recommend to wrap this code to independent component. This component may contain `Field` component inside
or just receive `field` object from its slot. 


#### First Approach
 
```html
<InputField name="text" />
```

Component's code:
```html
<template>
	<field class="field" v-slot="field" v-bind="$attrs" v-on="$listeners">
		<input v-model="field.value" v-on="field.events" class="field__input">
		<p v-if="field.meta.error" class="field__error">
			{{ field.meta.error }}
		</p>
	</field>
</template>

<script>
	export default {}
</script>

<style lang="scss">
	.field {
		&__error {
			color: red;
		}
	}
</style>

```

#### Second Approach
 
```html
<field name="text" v-slot="field" class="field">
	<InputComponent :field="field" />
</field>
```

Component's code:
```html
<template>
	<span class="field">
		<input v-model="field.value" v-on="field.events" class="field__input">
    	<p v-if="field.meta.error" class="field__error"> 
    		{{ field.meta.error }} 
    	</p>
	</span>
</template>

<script>
	export default {
		props: ['field']
	}
</script>

<style lang="scss">
	.field {
		&__error {
			color: red;
		}
	}
</style>

```

::: tip Notice!
In the example above field data passed to `field` prop as a single object. 
It could seem reasonable to pass its parts `meta`, `value` and etc. as independent props, but in
this case you will not be able to pass them to `v-model` directive, because it will try to change the prop value, not
the `field.value` property (that has own setter)
:::

