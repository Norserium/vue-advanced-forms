<script>
	import { VueForm, customize, formDefaults, omit } from 'vue-advanced-forms';
	import Field from './service/field-attributes-validation';

	export default {
		components: {
			Field, VueForm,
		},
	};
</script>

<template>
	<div class="example">
		<VueForm>
			<Field type="number" required placeholder="Name" name="login" />
			<Field type="number" min="0" max="120" placeholder="Weight" name="weight" />
			<Field type="number" min="60" max="250" placeholder="Height" name="height" />
		</VueForm>
	</div>
</template>

<style lang="scss">
	.example {
		margin-top: 24px;
		margin-bottom: 24px;
	}
</style>
