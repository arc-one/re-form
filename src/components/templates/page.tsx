import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';
import { headerLayout } from './headerLayout';
import { formData } from './formData';
import { builderFormData } from '../../components/builder/builderFormData';
import { formFieldInitialValues } from '../builder/formFieldInitialValues';

export const page: DynamicFormSchema = {
    name: "Page",
    mode: "layout",
    editMode: true,
    fields: {
        header: {
            ...formFieldInitialValues,
            label: "Header",
            type: "header",
            span: 24,
            shadowOffsetX: 0,
            shadowOffsetY: 2,
            shadowBlurRadius: 5,
            shadowSpreadRadius: 0,
            shadowColor: 'ddd'
        },
        form: {
            ...formFieldInitialValues,
            label: "Form",
            type: "form",
            span: 24,
            // padding: '30px'
        },
        footer: {
            ...formFieldInitialValues,
            label: "Footer",
            type: "footer",
            padding: '30px 50px'
        },
    },
    values: [{
        header: {
            value: headerLayout
        },

        form: {
            value: { ...formData, ...builderFormData.values[0] },
        },

        footer: {
            value: 'Footer'
        },

    }]
}