declare module "vue-advanced-forms" {
	import { Vue } from "vue/types/vue";

	type FieldMetaProps<DefaultFieldMeta> = {
		[k in keyof DefaultFieldMeta]: {
			default?: boolean,
			validate?: boolean
		}
	}

	type FormMetaProps<DefaultFormMeta> = {
		[k in keyof DefaultFormMeta]: {
			default?: boolean,
			computed?: any
		}
	}

	export class Form<DefaultFieldMeta, DefaultFormMeta> extends Vue {
		name: string;
		fieldMeta: FieldMetaProps<DefaultFieldMeta>;
		formMeta: FormMetaProps<DefaultFormMeta>;
		getFieldMeta: (name: string, property?: keyof DefaultFieldMeta) => any;
	}

}
