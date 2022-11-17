import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { yesno, fieldMapSubscriptions as subscriptions } from './_common';
import { addRow, removeRow, getForm, setForm, getValue, setFields, setValues } from '../lib/index';
import { builderEmptyLayout } from './builderEmptyLayout';
import { getSelectedNode, allForms } from '../lib/services/dynamic-form-service';



export const builderFieldInitialValues: any = {
    type: 'input',
    readOnly: false,
    optionType: 'default',
    span: 12,
    required: false,
    hidden: false,
    disabled: false,
    autoFocus: false,
    backfill: false,
    defaultActiveFirstOption: false,
    defaultOpen: false,
    open: false,
    // colon: false,
    // bordered: true,
    allowClear: false,
    // size: "middle",
    // options: [
    //     {
    //         key: 1,
    //         value: 1,
    //         label:'one' 
    //     }
    // ]
}


export const builderFieldData: DynamicFormSchema = {
    name: "builderFieldData",
    mode: "form", // table, object
    autoSave: false,
    layout: 'horizontal',
    defaultSpan: 24,
    gutterX: 0,
    gutterY: 0,
    labelSpan: 7,
    fields: {
        name: {
            label: "Field Name",
            required: true,
            disabled: true,
            subscriptions: [...subscriptions]
        },
        label: {
            label: "Label",
            subscriptions: [...subscriptions]

        },
        type: {
            type: "select",
            label: "Type",
            options: [
                {
                    label: 'Input',
                    value: 'input',
                },
                {
                    label: 'Number',
                    value: 'number',
                },
                {
                    label: 'Textarea',
                    value: 'textarea',
                },
                {
                    label: 'Autocomplete',
                    value: 'autocomplete',
                },
                {
                    label: 'Autocomplete Multi',
                    value: 'autocompleteMulti',
                },
                {
                    label: 'Select',
                    value: 'select',
                },
                {
                    label: 'Checkbox',
                    value: 'checkbox',
                },
                {
                    label: 'Radio',
                    value: 'radio',
                },
                {
                    label: 'Button',
                    value: 'button',
                },



                {
                    label: 'Header',
                    value: 'header',
                },
                {
                    label: 'Footer',
                    value: 'footer',
                },
                {
                    label: 'Layout',
                    value: 'layout',
                },
                {
                    label: 'Form',
                    value: 'form',
                },
                {
                    label: 'Content',
                    value: 'content',
                },
                {
                    label: 'Sider',
                    value: 'sider',
                },
                {
                    label: 'Card',
                    value: 'card',
                },
                {
                    label: 'Drawer',
                    value: 'drawer',
                },



            ],
            // onChange: [{
            //     do: (params: any) => {


            //         const selected = getSelectedNode();
            //         //const selectedForm = getForm(selected.form);

            //       //  console.log('params do', selected, params);
            //         // const selectedField = selectedForm.fields[selected.field];

            //         // selectedField.type = 'form';
            //         // setFields(selected.form, {[selected.field]:{type: 'form'}});

            //         // setTimeout(() => {

            //         //     setValues(selected.form, { [selected.field]: { value: builderEmptyLayout } });

            //         //     console.log('--allForms', allForms)
            //         // })

            //     }
            // }]

        },
        value: {
            label: 'Value',
        },
        placeholder: {
            label: "Placeholder",
            subscriptions: [...subscriptions]
        },
        defaultValue: {
            type: 'textarea',
            label: "Default Value",
            subscriptions: [...subscriptions]
        },
        api: {
            label: "Api URL",
            subscriptions: [...subscriptions]
        },
        apiSearchParam: {
            label: "Api Search Param",
            subscriptions: [...subscriptions]
        },
        apiMap: {
            type: 'textarea',
            label: "Api Mapping",
            subscriptions: [...subscriptions]
        },
        apiParams: {
            type: 'textarea',
            label: "Api Params",
            subscriptions: [...subscriptions]
        },
        apiQueryParams: {
            type: 'textarea',
            label: "Api Query Params",
            subscriptions: [...subscriptions]
        },

        span: {
            type: "number",
            label: "Span",
            subscriptions: [...subscriptions]
        },


        required: {
            type: "radio",
            label: "Required",
            options: yesno,
            subscriptions: [...subscriptions]
        },
        hidden: {
            type: "radio",
            label: "Hidden",
            options: yesno,
            subscriptions: [...subscriptions]
        },
        disabled: {
            type: "radio",
            label: "Disabled",
            options: yesno,
            subscriptions: [...subscriptions]
        },
        readOnly: {
            type: "radio",
            label: "Read Only",
            options: yesno,
            subscriptions: [...subscriptions]
        },

        optionType: {
            type: "radio",
            label: "Option Type",
            subscriptions: [...subscriptions],
            options: [
                {
                    label: 'Default',
                    value: 'default',
                },
                {
                    label: 'Button',
                    value: 'button',
                },
            ]
        },
        addOption: {
            type: 'button',
            value: "Add Option",
            subscriptions: [...subscriptions],
            onButtonClick: (props: any) => {
                addRow('builderFieldOptions');
            },
        },
    },
    values: [builderFieldInitialValues]
}



// {
//     type: 'container0',
//     fields: {
//         header: {
//             type: 'header',
//             fields: {
//                 logo: {... },
//                 account: {... }
//             },
//             ...
//         },
//         router: {
//             type: 'router',
//                 subscribe: {
//                 to: ['$url'],
//             },
//             fields: {
//                 container1: {
//                     type: 'container',
//                     fields: {
//                         picture: {... },
//                         accountData: {... }
//                     },

//                 },
//                 tabs: {
//                     type: 'tabs',
//                         options: [...],
//                         fields: {
//                         router: {
//                             type: 'router',
//                                 subscribe: {
//                                 to: ['tabs'],
//                             },
//                             fields: {
//                                 cards: {...},
//                                 ...
//                             },

//                         }

//                     },

//                 },
//                 sidenav: {
//                     type: 'sidenav',
//                     fields: {
//                         form: {
//                             type: 'form',
//                             fields: {
//                                 firstName: {... },
//                                 lastName: {... },
//                                 country: {... },
//                                 city: {... },
//                                 ...
//                             },
//                         },
//                     },
//                 }
//             },
//             ...
//         }
//         ...
//     },

// }
