import { DynamicFormSchema, Field } from '../../lib/models/dynamic-form-schema';
import { getSelectedNode, masterdata, getMasterdata } from '../../lib/services/dynamic-form-service';
import { removeRow, getForm, setForm } from '../../lib/index';
import { yesno, fieldMapSubscriptions as subscriptions } from './services/_common';

export const builderAdvancedFieldData: DynamicFormSchema = {
    name: "builderAdvancedFieldData",
    mode: "form", // table, object
    autoSave: false,
    layout: 'horizontal',
    defaultSpan: 24,
    gutterX: 0,
    gutterY: 0,
    labelSpan: 10,
    groups: {

        text: {
            title: "Text",
        },
        border: {
            title: "Border",
        },
        fill: {
            title: "Fill",
        },
        shadow: {
            title: "Shadow",
        },
    },
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
        padding: {
            label: "Padding",
            subscriptions: [...subscriptions],
        },
        height: {
            label: "Height",
            subscriptions: [...subscriptions],
        },
        minHeight: {
            label: "Min Height",
            type: 'number',
            addonAfter: 'px',
            subscriptions: [...subscriptions],
        },
        borderSize: {
            type: 'number',
            label: "Size",
            group: 'border',
            subscriptions: [...subscriptions],
            addonAfter: 'px'
        },
        borderColor: {
            label: "Color",
            group: 'border',
            addonBefore: '#',
            subscriptions: [...subscriptions],
        },
        borderType: {
            type: "select",
            label: "Type",
            group: 'border',
            subscriptions: [...subscriptions],
            options: [
                {
                    label: 'Solid',
                    value: 'solid',
                },
                {
                    label: "Dotted",
                    value: "dotted",
                },
            ]
        },
        borderLeft: {
            type: 'radio',
            label: "Left",
            group: 'border',
            subscriptions: [...subscriptions],
            options: yesno
        },
        borderRight: {
            type: 'radio',
            label: "Right",
            group: 'border',
            subscriptions: [...subscriptions],
            options: yesno
        },
        borderTop: {
            type: 'radio',
            label: "Top",
            group: 'border',
            subscriptions: [...subscriptions],
            options: yesno
        },
        borderBottom: {
            type: 'radio',
            label: "Bottom",
            group: 'border',
            subscriptions: [...subscriptions],
            options: yesno
        },
        backgroundColor: {
            label: "Color",
            group: 'fill',
            addonBefore: '#',
            subscriptions: [...subscriptions],
        },
        backgroundTransparency: {
            label: "Opacity",
            group: 'fill',
            subscriptions: [...subscriptions],
        },

        shadowOffsetX: {
            type: "number",
            label: "Offset-X",
            group: 'shadow',
            addonAfter: 'px',
            subscriptions: [...subscriptions],
        },
        shadowOffsetY: {
            label: "Offset-Y",
            type: "number",
            group: 'shadow',
            addonAfter: 'px',
            subscriptions: [...subscriptions],
        },
        shadowBlurRadius: {
            label: "Blur",
            type: "number",
            group: 'shadow',
            addonAfter: 'px',
            subscriptions: [...subscriptions],
        },
        shadowSpreadRadius: {
            label: "Spread",
            type: "number",
            group: 'shadow',
            addonAfter: 'px',
            subscriptions: [...subscriptions],
        },
        shadowColor: {
            label: "Color",
            group: 'shadow',
            subscriptions: [...subscriptions],
            addonBefore: '#',
        },

        fontType: {
            type: "select",
            label: "Font Type",
            group: 'text',
            subscriptions: [...subscriptions],
            options: [
                {
                    label: 'Light',
                    value: 'Light',
                },
                {
                    label: 'Book',
                    value: 'Book',
                },
                {
                    label: "Medium",
                    value: "Medium",
                },
                {
                    label: "Bold",
                    value: "Bold",
                },
            ]
        },
        fontSize: {
            label: "Font Size",
            type: 'number',
            group: 'text',
            addonAfter: 'px',
            subscriptions: [...subscriptions],
        },
        fontColor: {
            label: "Color",
            group: 'text',
            subscriptions: [...subscriptions],
            addonBefore: '#',
        },
        textAlign: {
            type: "select",
            label: "Text Align",
            group: 'text',
            subscriptions: [...subscriptions],
            options: [
                {
                    label: 'Left',
                    value: 'left',
                },
                {
                    label: 'center',
                    value: 'Center',
                },
                {
                    label: "right",
                    value: "Right",
                },
            ]
        },
        position: {
            type: "select",
            label: "Position",
            group: 'text',
            subscriptions: [...subscriptions],
            options: [
                {
                    label: 'Absolute',
                    value: 'absolute',
                },
                {
                    label: 'Relative',
                    value: 'relative',
                },
                {
                    label: "Fixed",
                    value: "fixed",
                },
                {
                    label: "Static",
                    value: "static",
                },
                {
                    label: "Sticky",
                    value: "sticky",
                },
            ]
        },
        zIndex: {
            label: "Z-Index",
            type: 'number',
            subscriptions: [...subscriptions],
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
            label: "Bordered",
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
        // remove: {
        //     type: 'button',
        //     value: "Remove",
        //     buttontype: 'primary',
        //     onButtonClick: (props: any) => {

        //         const menuLayout = getForm('menuLayout');
        //         const selected = menuLayout.fields.fieldsMenu.selectedKeys[0] * 1;
        //         removeRow('menuData', selected);
        //         const menuData = getMasterdata('menuData');

        //         masterdata['menuData'] = { ...menuData };
        //         setForm('menuLayout', menuLayout);

        //         const newFields = menuData.values.reduce((acc: any, item: Field) => {
        //             if (item.name) {
        //                 acc[item.name] = item;
        //             }
        //             return acc;
        //         }, {})
        //         const selectedNode = getSelectedNode();
        //         const newFormData = getForm(selectedNode);
        //         newFormData.fields = newFields;
        //         setForm(selectedNode, newFormData);

        //     },
        // },
        // divider: {
        //     type: "divider",
        //     span: 24,
        // },

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