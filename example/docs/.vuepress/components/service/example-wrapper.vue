<script>
	export default {
		props: ['title']
	};
</script>

<template>
	<div class="example-wrapper">
		<div class="example-wrapper__title" v-if="title">
			{{ title }}
		</div>
		<div class="example-wrapper__content">
			<slot/>
		</div>
	</div>
</template>

<style lang="scss">
	.example-wrapper {
		margin-top: 24px;
		margin-bottom: 12px;
		border: solid 1px #EEE;
		position: relative;
		z-index: 1;
		overflow: hidden;
		border-radius: 5px;
		&__content {
			padding: 12px;
		}
		&__title {
			padding: 8px 12px;
			border-bottom: solid 1px #EEE;
			font-size: 12px;
			background: #3eaf7c;
			color: white;
		}
	}
</style>
