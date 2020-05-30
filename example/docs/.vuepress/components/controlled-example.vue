<script>
	import ExampleWrapper from './service/example-wrapper';
	import { VueForm, Field } from 'vue-advanced-forms';
	export default {
		components: {
			Field, VueForm, ExampleWrapper
		},
		methods: {
			required(value) {
				return {
					error: !value ? 'This field is required' : null
				}
			},
			submit({ values }) {
				console.log(values);
			}
		},
		data() {
			return {
				email: 'Initial value',
			}
		}
	};
</script>

<template>
	<example-wrapper>
		<vue-form v-slot="form" :on-submit="submit" class="flex">
			<field class="input-wrapper" v-model="email" :validation="required" v-slot="field">
				<input class="input" v-model="field.value" v-on="field.events">
				<div class="error-text" v-if="field.meta.error"> {{ field.meta.error }} </div>
			</field>
		</vue-form>
	</example-wrapper>
</template>

<style lang="scss">
	.basic-example {
		input {
			margin-bottom: 8px;
		}
		.errors {
			font-size: 12px;
			margin-bottom: 8px;
			color: red;
		}
	}
</style>
