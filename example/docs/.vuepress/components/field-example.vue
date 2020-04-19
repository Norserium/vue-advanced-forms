<script>
	import { VueForm, Field, SelectComponent } from 'vue-advanced-forms';

	export default {
		components: {
			Field, VueForm, SelectComponent
		}
	};
</script>

<template>
	<div class="example">
		<vue-form v-slot="form">
			<label>
				<field name="radio" :props="{ type: 'radio', value: 'first-choice' }"/>
				First Choice
			</label>
			<label>
				<field name="radio" :props="{ type: 'radio', value: 'second-choice' }"/>
				Second Choice
			</label>
			<label>
				<field name="text" :props="{ type: 'text' }"/>
				Text
			</label>
			<div>
				<label>
					<field name="checkbox" :defaultValue="false" :props="{ type: 'checkbox', value: 'first-choice' }"/>
					First Choice
				</label>
				<label>
					<field name="checkbox" :defaultValue="false" :props="{ type: 'checkbox', value: 'second-choice' }"/>
					Second Choice
				</label>
			</div>

			<field component="select" name="test-select">
				<option name="1"> First  </option>
				<option name="2"> Second  </option>
				<option name="3"> Third  </option>
				<option name="4"> Fourth  </option>
			</field>

			<field component="div" name="test-slot" v-slot="field">
				<input :value="field.value" v-on="field.events"/>
				<span> Test </span>
			</field>

			<pre :style="{ background: '#f6f8fa', fontSize: '.65rem', padding: '.5rem' }">
<strong>form</strong> = {{ JSON.stringify(form, null, 2) }}
			</pre>

		</vue-form>
	</div>
</template>

<style lang="scss">
	.example {
		margin-top: 24px;
		margin-bottom: 24px;
	}
</style>
