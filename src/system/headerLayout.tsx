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

export const headerLayout: DynamicFormSchema = {
    name: "headerLayout",
    editMode: true,
    mode: "layout", // table, object
    //autoSave: false,
   // layout: 'horizontal',
    defaultSpan: 12,
    padding: 0,
    gutterX: 0,
    //labelSpan: 7,
    
    fields: {
        logo: {
            //...initialValues,
            label: "Logo",
            type: "content",
            span:6
        },
        headerBody: {
           // ...initialValues,
            label: "Header Body",
            type: "content",
            span:18
        },
    },
    values: [
        {
            logo: 'Logo',
            headerBody: 'Header Body',
        }
    ]
}