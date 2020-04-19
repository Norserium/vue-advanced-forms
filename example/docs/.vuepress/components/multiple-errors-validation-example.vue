<script>
	import { VueForm, FieldArray, customize, formDefaults } from 'vue-advanced-forms';
	import Field from './service/field-multiple-errors';

	const CustomForm = customize(VueForm, {
		fieldMeta: {
			...formDefaults.fieldMeta,
			error: {
				default: [],
				validate: true
			}
		},
		formMeta: {
			...formDefaults.formMeta,
			valid: {
				default: true,
				computed({form}) {
					return form.getFields().every(field => !field.$mounted || !field.meta.invalid);
				}
			},
		}
	});

	export default {
		components: {
			Field, CustomForm, VueForm,
		},
		methods: {
			validate(value) {
				const error = [];
				if (value.length < 4) {
					error.push('Mimimum number of symbols is 4')
				}
				if (!value.match(/\d/)) {
					error.push('Password should contain numbers')
				}
				if (!value.match(/\W/)) {
					error.push('Password should contain symbols')
				}
				return {
					error,
				}
			}
		}
	};
</script>

<template>
	<div class="example">
		<CustomForm>
			<Field placeholder="Login" name="login" />
			<Field placeholder="Password" name="password" :validation="validate" />
		</CustomForm>
	</div>
</template>

<style lang="scss">
	.example {
		margin-top: 24px;
		margin-bottom: 24px;
	}
</style>
