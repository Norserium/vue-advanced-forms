<script>
	export default {
		props: {
			title: {
				type: String
			},
			value: {
				type: Object
			}
		}
	};
</script>

<template>
<pre class="data-output">
<strong>{{ title }}</strong> = {{ JSON.stringify(value, null, 2) }}
</pre>
</template>

<style lang="scss">
	.data-output {
		background: #f6f8fa !important;
		font-size: .65rem;
		padding: .5rem;
		margin-bottom: 0 !important;
	}
</style>
