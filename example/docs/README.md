---
title: Overview
---

# Overview

This library is highly inpired by [Formik](https://jaredpalmer.com/formik/docs/guides/form-submission) library and [AngularJS](https://angularjs.org/) forms. 
Though the building forms with Vue is more easier than with React, there are still tasks, that
any developer should handle:
- store the values and field/form meta
- validate field values
- handle the form's submission

It may be sometime pretty tedious, and this library is trying to make it as easy as it can be.

<BasicExample/>

```html
<script>
	import { VueForm, Field } from 'vue-advanced-forms';
	export default {
		components: {
			Field, VueForm
		},
		methods: {
			required(value) {
				return {
					error: !value ? 'This field is required' : null
				}
			},
			submit({ values }) {
				console.log(values)
			}
		}
	};
</script>

<template>
	<ExampleWrapper>
		<vue-form component="form" v-slot="form" :onSubmit="submit">
			<field name="email" :validation="required" v-slot="field">
				<input v-model="field.value" v-on="field.events">
				<div v-if="field.meta.error"> {{ field.meta.error }} </div>
			</field>
			<field name="password" :validation="required" v-slot="field">
				<input v-model="field.value" v-on="field.events">
				<div v-if="field.meta.error"> {{ field.meta.error }} </div>
			</field>
			<button :disabled="!form.meta.valid" type="submit"> Submit </button>
		</vue-form>
	</ExampleWrapper>
</template>
```

Could it be easier?

## Installation

### NPM

```bash
npm install --save vue-advanced-forms
```

```bash
yarn add vue-advanced-forms
```

### CDN

If you want to use this library without using, for example, different build systems you can use the CDN link, but currently the support of this method is quite limited.

[https://unpkg.com/vue-advanced-forms@latest/dist/index.umd.js](https://unpkg.com/vue-advanced-forms@latest/dist/index.umd.js)

Then add somewhere in head the link to this script:

```html
<script src="https://unpkg.com/vue-advanced-forms@latest/dist/index.umd.js" />
```

And you can use globally registered components: `VueForm`, `Field`, `FieldArray`.
