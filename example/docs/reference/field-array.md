---
title: FieldArray
---

# FieldArray
---

`FieldArray` component is designated to facilitate common array manipulations. 
You pass it a `name` property with the path to the key within values that holds the relevant array. 
This component will you give the list of actual names of fields and different array helper methods via slot.

The simple of using tihs component might look like this:
```html
<field-array name="emails" v-slot="array">
	<field :name="name" v-for="name in array.names" v-slot="field">
		<input v-model="field.value" v-on="field.events"/>
	</field>
	<button @click="array.push('')"> Add Field </button>
</field-array>
```

<field-array-example/>

The `fields` is the data passed by `Field` component.
 
It contains the following data:
- `name` a field array name;
- `meta` a field array meta;
- `names` a list of field names inside the field array

And it has the following methods:
- `push(item)` add value to the end of an array
- `shift(item)` add value to the start of an array
- `swap(indexA, indexB)` swap values in an array
- `move(from, to)` move an element in an array to another index
- `insert(index, value)` insert an element at a given index into the array
- `unshift(value)` add an element to the beginning of an array and return its length
- `remove(index)` remove an element at an index of an array and return it
- `pop()` remove value from the end of the array
- `replace(index, value)` replace a value at the given index into the array

## Props

### `name`

A field's array name the internal form state.

### `component`

A field wrapper component. Default `span`.

### `validation`

The prop to pass field-level validation. It's described in a detail in the [corresponding section](/guides/validation.html).

### `validationOptions`

The validation options

### `onMount`

The function that defines the mount behavior of the field.

### `onValidate`

The function that defines the field's validate behavior.

