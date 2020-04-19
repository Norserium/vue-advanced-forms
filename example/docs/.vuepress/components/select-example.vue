<script>
	import ExampleWrapper from './service/example-wrapper';
	import DataOutput from './service/data-output';
	import { VueForm, Field, InputComponent } from 'vue-advanced-forms';

	export default {
		components: {
			Field, VueForm, InputComponent, ExampleWrapper, DataOutput
		}
	};
</script>

<template>
	<ExampleWrapper>
		<vue-form v-slot="form">
			<field name="select" v-slot="field">
				<select v-model="field.value" v-on="field.events">
					<option disabled value="">Please select one</option>
					<option value="first-choice">First Choice</option>
					<option value="second-choice">Second Choice</option>
					<option value="third-choice">Third Choice</option>
				</select>
			</field>
			<DataOutput title="values" :value="form.values"/>
		</vue-form>
	</ExampleWrapper>
</template>
