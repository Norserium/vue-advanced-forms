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
	<field :validation="validation"  :valitation-options="validationOptions" v-slot="field">
		<input
			class="input"
			:class="{
				'input-error': field.meta.error.length,
			}"
			v-model="field.value"
			v-on="field.events"
			v-bind="$attrs"
		/>
		<div
			class="validation-text color-error"
			v-if="field.meta.error.length"
		>
			<div v-for="error in field.meta.error">
				- {{ error }}
			</div>
		</div>
	</field>
</template>
