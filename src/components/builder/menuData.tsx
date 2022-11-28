import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';

export const menuData: DynamicFormSchema = {
    name: "menuData",
    mode: "table", // table, object
    autoSave: false,
    layout: 'vertical',
    fields: {
        name: {
            label: 'Field Name',
            readOnly: true,
            bordered: false,
            display: false
        },
        label: {
            label: 'Field Label',
            readOnly: true,
            bordered: false
        },
        // fieldView: {
        //     type: 'button',
        //     label: 'Action',
        //     value: "Edit",
        //     onClick: (props: any) => {
        //         const newBuilderLayout: any = { ...allForms['builderLayout'].formData };
        //         newBuilderLayout.fields['fieldsForm'].display = true;
        //         allForms['builderLayout'].setFormData(newBuilderLayout);
        //         allForms['builderFieldData'].formActions[0].setFieldsValue(props.row);
        //     }
        // },
    },
    values: []
}