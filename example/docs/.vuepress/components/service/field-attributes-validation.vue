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
		props: ['validation', 'validationOptions', 'name', 'required', 'max', 'min'],
		inheritAttrs: false
	};
</script>

<template>
	<custom-field class="input-wrapper" v-bind="$props" v-slot="field">
		<input
			class="input"
			:class="{
				'input-error': field.meta.error
			}"
			v-model="field.value"
			v-on="field.events"
			v-bind="$attrs"
		/>
	</custom-field>
</template>
