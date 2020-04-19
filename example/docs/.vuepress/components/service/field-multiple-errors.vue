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
	<field class="field-multiple-errors" :validation="validation"  :valitation-options="validationOptions" v-slot="field">
		<input
			:class="[
				'field-multiple-errors__input',
				field.meta.error.length ? 'field-multiple-errors__input--invalid' : '',
			]"
			v-model="field.value"
			v-on="field.events"
			v-bind="$attrs"
		/>
		<div
			class="field-multiple-errors__errors"
			v-if="field.meta.error.length"
		>
			<div v-for="error in field.meta.error">
				- {{ error }}
			</div>
		</div>
	</field>
</template>

<style lang="scss">
	.field-multiple-errors {
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
