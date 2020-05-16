<script>
	import { VueForm, Field, FieldArray } from 'vue-advanced-forms';
	import ExampleWrapper from './service/example-wrapper';
	import DataOutput from './service/data-output';

	export default {
		components: {
			Field, FieldArray, VueForm, ExampleWrapper, DataOutput
		}
	};
</script>

<template>
	<example-wrapper>
		<vue-form v-slot="form">
			<field-array name="emails" v-slot="array">
				<field class="input-wrapper" :name="name" v-for="name in array.names" v-slot="field">
					<input class="input" v-model="field.value" v-on="field.events"/>
				</field>
				<button class="button" @click="array.push('')"> Add Field </button>
			</field-array>
			<data-output title="values" :value="form.values"/>
		</vue-form>
	</example-wrapper>
</template>
