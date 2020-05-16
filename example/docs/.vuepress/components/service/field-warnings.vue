<script>
	import { Field } from 'vue-advanced-forms';

	export default {
		components: {
			Field
		},
		props: ['validation', 'validationOptions'],
		inheritAttrs: false
	};
</script>

<template>
	<field class="flex" :validation="validation"  :valitation-options="validationOptions" v-slot="field">
		<input
			class="input"
			:class="{
				'input-warning': field.meta.warning,
				'input-error': field.meta.error,
			}"
			v-model="field.value"
			v-bind="$attrs"
		/>
		<div
			class="validation-text"
			:class="{
				'color-warning': field.meta.warning,
				'color-error': field.meta.error,
			}"
			v-if="field.meta.error || field.meta.warning"
		>
			{{ field.meta.error || field.meta.warning }}
		</div>
	</field>
</template>
