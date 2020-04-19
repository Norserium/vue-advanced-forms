---
title: Array and Nested fields
---

# Array and Nested fields

This library supports both array and nested fields. 

## Nested Objects

The `name` prop can use lodash-like dot paths to reference nested names. 
This means that you do not need to flatten out your form's values anymore.

```html
<script>
import { VueForm, Field } from 'vue-advanced-cropper`;

export default {
	components: {
		VueForm, Field
	},
	methods: {
		submit({ values }) {
			console.log(values)
		}
	}
}
</script>

<template>
	<vue-form component="form" v-slot="form" :onSubmit="submit" :initialValues="{
		general: {
			login: 'Avatar',
			email: 'avatar@ultima.com'
		}
	}">
		<field name="general.login" v-slot="field">
			<input v-model="field.value" v-on="field.events"/>
		</field>
		<field name="general.email" v-slot="field">
			<input v-model="field.value" v-on="field.events"/>
		</field>
		<button type="submit"> Submit </button>
	</vue-form>
</template>
```

## Arrays

This library also has support for arrays and arrays of objects out of the box. Using lodash-like bracket syntax for name string you can quickly build fields for items in a list.


```html
<script>
import { VueForm, Field } from 'vue-advanced-cropper`;

export default {
	components: {
		VueForm, Field
	},
	methods: {
		submit({ values }) {
			console.log(values)
		}
	}
}
</script>

<template>
	<vue-form component="form" v-slot="form" :onSubmit="submit" :initialValues="{
		users: [
			'Unnamed',
			'Avatar'
		]
	}">
		<field name="users[0]" v-slot="field">
			<input v-model="field.value" v-on="field.events"/>
		</field>
		<field name="users[1]" v-slot="field">
			<input v-model="field.value" v-on="field.events"/>
		</field>****
		<button type="submit"> Submit </button>
	</vue-form>
</template>
```

For more information around manipulating (add/remove/etc) items in arrays, see [the corresponding section](/reference/field-array/).
