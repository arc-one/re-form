import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';

export const builderEmptyLayout: DynamicFormSchema = {
    name: "builderEmptyLayout",
    editMode: true,
    mode: "form", // table, object
    //autoSave: false,
   // layout: 'horizontal',
    defaultSpan: 12,
    padding: 30,
    gutterX: 30,
    labelSpan: 7,
    
    fields: {
        colOne: {
            //...initialValues,
            label: "Field One",
        },
        colTwo: {
           // ...initialValues,
            label: "Field Two",
        },
    },
    values: [
        {
            colOne: 'One',
            colTwo: 'Two',
            key:0
        }
    ]
}