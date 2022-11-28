import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';
import { headerLogin } from './headerLogin';
import { formFieldInitialValues } from '../builder/formFieldInitialValues';

export const headerLayout: DynamicFormSchema = {
    name: "headerLayout",
    editMode: true,
    mode: "layout", // table, object
    //autoSave: false,
    // layout: 'horizontal',
    defaultSpan: 12,
    padding: "0px 30px",
    gutterX: 0,
    //labelSpan: 7,

    fields: {
        logo: {
            ...formFieldInitialValues,
            label: "Logo",
            type: "content",
            span: 6,
            padding: '18px'
        },
        headerBody: {
            ...formFieldInitialValues,
            label: "Header Body",
            type: "content",
            span: 9,
            padding: '18px'
        },
        headerLogin: {
            ...formFieldInitialValues,
            label: "Header Login",
            type: "content",
            span: 9,
        },

    },
    values: [
        {
            logo: 'Logo',
            headerBody: 'Header Body',
            headerLogin: headerLogin
        }
    ]
}