<script>
	import { Field } from 'vue-advanced-forms';

	export default {
		components: {
			Field
		},
		props: ['validation', 'validationOptions', 'name'],
		inheritAttrs: false
	};
</script>

<template>
	<field class="input-wrapper" :name="name" :validation="validation"  :validation-options="validationOptions" v-slot="field">
		<input
			class="input"
			:class="{'input-error': field.meta.error}"
			v-model="field.value"
			v-on="{...field.events}"
			v-bind="$attrs"
			autocomplete="no"
		/>
		<div class="validation-text color-error" v-if="field.meta.error">
			{{ field.meta.error }}
		</div>
	</field>
</template>
