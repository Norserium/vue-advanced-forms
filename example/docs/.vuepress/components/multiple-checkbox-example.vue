<script>
	import ExampleWrapper from './service/example-wrapper';
	import DataOutput from './service/data-output';
	import { VueForm, Field, InputComponent } from 'vue-advanced-forms';

	export default {
		components: {
			Field, VueForm, InputComponent, DataOutput, ExampleWrapper
		}
	};
</script>

<template>
	<ExampleWrapper>
		<vue-form v-slot="form">
			<field name="choice" :default-value="[]" v-slot="field">
				<label>
					<input type="checkbox" v-model="field.value" v-on="field.events" value="first-choice">
					First Choice
				</label>
				<label>
					<input type="checkbox" v-model="field.value" v-on="field.events" value="second-choice">
					Second Choice
				</label>
				<label>
					<input type="checkbox" v-model="field.value" v-on="field.events" value="third-choice">
					Third Choice
				</label>
			</field>
			<DataOutput title="values" :value="form.values" />
		</vue-form>
	</ExampleWrapper>
</template>

