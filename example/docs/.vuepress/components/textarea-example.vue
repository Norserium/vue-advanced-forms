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
				<textarea v-model="field.value"></textarea>
			</field>
			<DataOutput title="values" :value="form.values"/>
		</vue-form>
	</ExampleWrapper>
</template>
