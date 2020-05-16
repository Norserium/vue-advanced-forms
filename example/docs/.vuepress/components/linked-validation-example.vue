<script>
	import { VueForm, FieldArray, customize, formDefaults, registerValidator } from 'vue-advanced-forms';
	import Field from './service/field-validation';
	import ExampleWrapper from './service/example-wrapper';
	import DataOutput from './service/data-output';

	export default {
		components: {
			Field, VueForm, ExampleWrapper, DataOutput
		},
		methods: {
			confirmation(value, { form }) {
				return {
					error: value !== form.getFieldValue('password') ? 'Passwords should be equal' : null
				}
			}
		}
	};
</script>

<template>

	<vue-form v-slot="form">
		<example-wrapper title="Linked fields validation example">
			<field type="password" placeholder="Password" name="password" />
			<field type="password" placeholder="Password Confirmation" name="confirmation" :validation="confirmation" :validation-options="{
				linkedFields: ['password']
			}"/>
		</example-wrapper>
	</vue-form>
</template>
