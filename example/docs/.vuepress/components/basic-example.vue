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
				console.log(values)
			}
		}
	};
</script>

<template>
	<ExampleWrapper>
		<vue-form component="form" v-slot="form" :onSubmit="submit">
			<field name="email" :validation="required" v-slot="field">
				<input v-model="field.value" v-on="field.events">
				<div v-if="field.meta.error"> {{ field.meta.error }} </div>
			</field>
			<field name="password" :validation="required" v-slot="field">
				<input v-model="field.value" v-on="field.events">
				<div v-if="field.meta.error"> {{ field.meta.error }} </div>
			</field>
			<button :disabled="!form.meta.valid" type="submit"> Submit </button>
		</vue-form>
	</ExampleWrapper>
</template>
