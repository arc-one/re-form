import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
// export const initialValues: any = {
//     type: 'input',
//     readOnly: false,
//     optionType: 'default',
//     span: 12,
//     required: false,
//     hidden: false,
//     disabled: false,
//     autoFocus: false,
//     backfill: false,
//     defaultActiveFirstOption: false,
//     defaultOpen: false,
//     open: false,
//     // colon: false,
//     // bordered: true,
//     allowClear: false,
//     // size: "middle",
//     // options: [
//     //     {
//     //         key: 1,
//     //         value: 1,
//     //         label:'one' 
//     //     }
//     // ]
// }

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