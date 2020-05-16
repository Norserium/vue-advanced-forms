<script>
	import { VueForm, FieldArray, customize, formDefaults, registerValidator } from 'vue-advanced-forms';
	import Field from './service/field-validation';
	import ExampleWrapper from './service/example-wrapper';

	registerValidator('confirm', {
		validator: (value, { target }, {field, form}) => {
			return {
				error: value !== target ? 'Passwords should be equal' : null
			}
		},
		params: ['target']
	})

	export default {
		components: {
			Field, VueForm, ExampleWrapper
		}
	};
</script>

<template>
	<example-wrapper title="Targeting other fields example">
		<vue-form v-slot="form">
			<field type="password" placeholder="Password" name="password" />
			<field type="password" placeholder="Password Confirmation" name="confirmation" validation="confirm:@password" />
		</vue-form>
	</example-wrapper>
</template>
