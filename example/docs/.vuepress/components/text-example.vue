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
			<field name="text" v-slot="field">
				<input v-model="field.value" v-on="field.events">
			</field>
			<DataOutput title="values" :value="form.values"/>
		</vue-form>
	</ExampleWrapper>
</template>
