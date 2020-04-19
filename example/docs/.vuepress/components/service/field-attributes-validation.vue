<script>
	import { Field, customize } from 'vue-advanced-forms';

	const CustomField = customize(Field, {
		onValidate({ field }) {
			const { $attrs } = field.ref;
			return {
				error: (
					(('required' in $attrs) && !field.value) ||
					(('max' in $attrs) && Number(field.value) > Number($attrs.max)) ||
					(('min' in $attrs) && Number(field.value) < Number($attrs.min))
				)
			};
		}
	});

	export default {
		components: {
			CustomField
		},
		props: ['validation', 'validationOptions', 'name', 'required', 'max', 'min']
	};
</script>

<template>
	<CustomField class="field-attributes-validation" v-bind="$props" v-slot="field">
		<input
			:class="[
				'field-attributes-validation__input',
				field.meta.error ? 'field-attributes-validation__input--invalid' : '',
			]"
			:required="required"
			:max="max"
			:min="min"
			v-model="field.value"
			v-on="{...field.events, ...$listeners}"
			v-bind="$attrs"
		/>
	</CustomField>
</template>

<style lang="scss">
	.field-attributes-validation {
		margin-bottom: 16px;
		transition: 0.5s;
		display: flex;
		flex-direction: column;
		line-height: 1.8;
		&__input {
			&--invalid {
				border-color: #E11;
			}
		}

		&__errors {
			font-size: 11px;
			margin-top: 3px;
			color: #E11;
		}
	}
</style>
