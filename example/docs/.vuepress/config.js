module.exports = {
	title: 'Vue Advanced Forms',
	description: 'The documentation for Vue Advanced Forms library',
	base: '/vue-advanced-forms/',
	head: [
		['link', { rel: 'icon', href: '/favicon.png', }]
	],
	themeConfig:{
		repo: 'Norserium/vue-advanced-forms',
		logo: '/logo.svg',
		docsDir: 'example/docs',
		editLinks: true,
		search: true,
		sidebar: [
			{
				title: 'Getting Started',
				collapsable: false,
				children: [
					 '/getting-started/overview',
				],
			},
			{
				title: 'Guides',
				collapsable: false,
				children: [
					// '/guides/meta',
					'/guides/array-and-nested-fields',
					'/guides/validation',
					'/guides/submission',
					// '/validation/field-level',
					// '/validation/form-level'
				],
			},
			// {
			// 	title: 'Recipes',
			// 	collapsable: false,
			// 	children: [
			// 		// '/events/move-event',
			// 		// '/events/resize-event',
			// 		// '/events/drag-event'
			// 	],
			// },
			{
				title: 'Components',
				collapsable: false,
				children: [
					'/reference/vue-form',
					'/reference/field',
					'/reference/field-array',
				],
			}
		],
	},
};
