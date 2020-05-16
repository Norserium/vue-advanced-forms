<script>
	import { VueForm, customize, formDefaults, omit } from 'vue-advanced-forms';
	import Field from './service/field-attributes-validation';
	import ExampleWrapper from "./service/example-wrapper";

	export default {
		components: {
			ExampleWrapper,
			Field, VueForm,
		},
	};
</script>

<template>
	<example-wrapper title="Attributes validation example">
		<vue-form>
			<field type="text" required placeholder="Name" name="login" />
			<field type="number" min="0" max="120" placeholder="Weight" name="weight" />
			<field type="number" min="60" max="250" placeholder="Height" name="height" />
		</vue-form>
	</example-wrapper>
</template>

<style lang="scss">
	.example {
		margin-top: 24px;
		margin-bottom: 24px;
	}
</style>
