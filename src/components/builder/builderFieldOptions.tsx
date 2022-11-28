import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';

export const builderFieldOptions: DynamicFormSchema = {
    name: "builderFieldOptions",
    mode: "table", // table, object
    autoSave: false,
    layout: 'vertical',
    fields: {
        label: {
            label: "Label",
            required: true,
            placeholder: 'Option Label',
        },
        remove: {
            type: 'button',
            label: "Action",
            value: "Remove",
            onButtonClick: (props: any) => {
                console.log(props)
            },
            buttontype: 'link',
            span: 4,
        },
    },
}