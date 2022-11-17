import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { allForms, getSelectedNode, masterdata, getMasterdata } from '../lib/services/dynamic-form-service';
import { addRow, removeRow, getForm, setForm, getValue, setFields } from '../lib/index';
import { yesno, fieldMapSubscriptions as subscriptions } from './_common';



export const builderAdvancedFieldData: DynamicFormSchema = {
    name: "builderAdvancedFieldData",
    mode: "form", // table, object
    autoSave: false,
    layout: 'horizontal',
    defaultSpan: 24,
    gutterX: 0,
    gutterY: 0,
    labelSpan: 7,
    fields: {
        name: {
            display: false,

        },
        label: {
            display: false,
        },

        size: {
            type: "select",
            label: "Size",
            subscriptions: [...subscriptions],
            options: [
                {
                    label: 'Small',
                    value: 'small',
                },
                {
                    label: "Middle",
                    value: "middle",
                },
                {
                    label: "Large",
                    value: "large",
                },
            ]
        },
        maxLength: {
            type: "number",
            label: "Max Length",
            subscriptions: [...subscriptions],
        },
        max: {
            type: "number",
            label: "Max",
            subscriptions: [...subscriptions],
        },
        min: {
            type: "number",
            label: "Min",
            subscriptions: [...subscriptions],
        },

        prefix: {
            label: "Prefix",
            subscriptions: [...subscriptions],
        },
        suffix: {
            label: "Suffix",
            subscriptions: [...subscriptions],
        },
        addonAfter: {
            label: "Addon After",
            subscriptions: [...subscriptions],
        },
        addonBefore: {
            label: "Addon Before",
            subscriptions: [...subscriptions],
        },
        decimalSeparator: {
            label: "Decimal Separator",
            subscriptions: [...subscriptions],
        },
        tooltip: {
            label: "Tooltip",
            subscriptions: [...subscriptions],
        },
        notFoundContent: {
            label: "Not Found Content",
            subscriptions: [...subscriptions],
        },
        allowClear: {
            type: "radio",
            label: "Allow Clear",
            subscriptions: [...subscriptions],
            options: yesno
        },

        bordered: {
            type: "radio",
            label: "Bordered Field",
            subscriptions: [...subscriptions],
            options: yesno
        },
        colon: {
            type: "radio",
            label: "Label Colon",
            subscriptions: [...subscriptions],
            options: yesno
        },
        autoFocus: {
            type: "radio",
            label: "Auto Focus",
            subscriptions: [...subscriptions],
            options: yesno
        },

        backfill: {
            type: "radio",
            label: "Backfill",
            subscriptions: [...subscriptions],
            options: yesno
        },
        defaultActiveFirstOption: {
            type: "radio",
            label: "Default Active First Option",
            subscriptions: [...subscriptions],
            options: yesno
        },
        defaultOpen: {
            type: "radio",
            label: "Default Open",
            subscriptions: [...subscriptions],
            options: yesno
        },
        open: {
            type: "radio",
            label: "Open",
            subscriptions: [...subscriptions],
            options: yesno
        },

        block: {
            type: "radio",
            label: "Block",
            subscriptions: [...subscriptions],
            options: yesno
        },
        danger: {
            type: "radio",
            label: "Danger",
            subscriptions: [...subscriptions],
            options: yesno
        },
        ghost: {
            type: "radio",
            label: "Ghost",
            subscriptions: [...subscriptions],
            options: yesno
        },
        loading: {
            type: "radio",
            label: "Loading",
            subscriptions: [...subscriptions],
            options: yesno
        },
        href: {
            label: "href",
            subscriptions: [...subscriptions],
        },
        icon: {
            label: "Icon",
            subscriptions: [...subscriptions],
        },
        direction: {
            type: "select",
            label: "Direction",
            subscriptions: [...subscriptions],
            options: [
                {
                    label: 'Verical',
                    value: 'verical',
                },
                {
                    label: "Horizontal",
                    value: "horizontal",
                },
            ]
        },
        shape: {
            type: "select",
            label: "Shape",
            subscriptions: [...subscriptions],
            options: [
                {
                    label: 'Default',
                    value: 'default',
                },
                {
                    label: "Circle",
                    value: "circle",
                },
                {
                    label: "Round",
                    value: "round",
                },

            ]
        },
        target: {
            label: "Target",
            subscriptions: [...subscriptions],
        },
        remove: {
            type: 'button',
            value: "Remove",
            buttontype: 'primary',
            onButtonClick: (props: any) => {

                const menuLayout = getForm('menuLayout');
                const selected = menuLayout.fields.fieldsMenu.selectedKeys[0] * 1;
                removeRow('menuData', selected);
                const menuData = getMasterdata('menuData');

                masterdata['menuData'] = { ...menuData };
                setForm('menuLayout', menuLayout);

                const newFields = menuData.values.reduce((acc: any, item: Field) => {
                    if (item.name) {
                        acc[item.name] = item;
                    }
                    return acc;
                }, {})
                const selectedNode = getSelectedNode();
                const newFormData = getForm(selectedNode);
                newFormData.fields = newFields;
                setForm(selectedNode, newFormData);

            },
        },
        divider: {
            type: "divider",
            span: 24,
        },

    },
    values: []
}

// export const builderAdvancedFieldInitialValues: any = {
//     autoFocus: false,
//     backfill: false,
//     defaultActiveFirstOption: false,
//     defaultOpen: false,
//     open: false,
//     colon: false,
//     bordered: false,
//     allowClear: false,
//     size: "middle"
// }