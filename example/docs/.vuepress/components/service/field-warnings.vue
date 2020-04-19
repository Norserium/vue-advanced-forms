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
	<Field class="field-warnings" :validation="validation"  :valitation-options="validationOptions" v-slot="field">
		<input
			:class="[
				'field-warnings__input',
				field.meta.error ? 'field-warnings__input--invalid' : '',
				field.meta.warning ? 'field-warnings__input--warning' : '',
			]"
			v-model="field.value"
			v-on="{...field.events, ...$listeners}"
			v-bind="$attrs"
		/>
		<div
			:class="[
				'field-warnings__message',
				field.meta.warning ? 'field-warnings__message--warning' : '',
				field.meta.error ? 'field-warnings__message--error' : '',
			]"
			v-if="field.meta.error || field.meta.warning"
		>
			{{ field.meta.error || field.meta.warning }}
		</div>
	</Field>
</template>

<style lang="scss">
	.field-warnings {
		margin-bottom: 16px;
		transition: 0.5s;
		display: flex;
		flex-direction: column;
		&__input {
			display: block;
			background: white;
			border-radius: 10px;
			border: solid 1px #EEE;
			padding: 10px 20px;
			outline: none;
			&--warning {
				border-color: gold;
			}
			&--invalid {
				border-color: #E11;
			}
		}

		&__message {
			font-size: 11px;
			margin-top: 3px;
			&--warning {
				color: gold;
			}
			&--error {
				color: #E11;
			}
		}
	}
</style>
