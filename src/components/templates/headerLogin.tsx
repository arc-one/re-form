import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';
import { formFieldInitialValues } from '../builder/formFieldInitialValues';

export const headerLogin: DynamicFormSchema = {
    name: "headerLogin",
    editMode: true,
    mode: "layout", // table, object
    //autoSave: false,
   // layout: 'horizontal',
    defaultSpan: 12,
    padding: 0,
    gutterX: 0,
    //labelSpan: 7,
    
    fields: {
        userName: {
            ...formFieldInitialValues,
            label: "userName",
            type: "content",
            span:12,
            padding:'20px'
        },
        login: {
            ...formFieldInitialValues,
            label: "Login",
            type: "content",
            span:12,
            padding:'20px'
        },
    },
    values: [
        {
            userName: 'User Name',
            login: 'Login',
        }
    ]
}