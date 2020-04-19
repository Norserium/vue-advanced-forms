<script>
	import { VueForm, FieldArray, customize, formDefaults } from 'vue-advanced-forms';
	import Field from './service/field-warnings';

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
			Field, CustomForm, VueForm,
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
