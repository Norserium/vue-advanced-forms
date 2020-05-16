<script>
	import { VueForm, FieldArray, customize, formDefaults } from 'vue-advanced-forms';
	import Field from './service/field-warnings';
	import ExampleWrapper from './service/example-wrapper';

	const CustomForm = customize(VueForm, {
		fieldMeta: {
			...formDefaults.fieldMeta,
			warning: {
				default: null,
				validate: true
			}
		}
	});

	export default {
		components: {
			Field, CustomForm, VueForm, ExampleWrapper
		},
		methods: {
			validate(value) {
				return {
					error: value.length < 4 ? 'Password is dangerously weak' : null,
					warning: value.length < 7 ? 'Password is weak' : null,
				}
			}
		}
	};
</script>

<template>
	<custom-form>
		<example-wrapper title="Validation with warnings">
				<field placeholder="Password" name="password" :validation="validate" />
		</example-wrapper>
	</custom-form>
</template>
