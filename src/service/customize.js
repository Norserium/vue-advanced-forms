import Vue from 'vue';

export function customize(component, props) {
	return {
		inheritAttrs: true,
		render(createElement) {
			return createElement(component, {
				attrs: { ...props, ...this.$attrs },
				on: this.$listeners,
				scopedSlots: this.$scopedSlots,
			})
		}
	}
}
