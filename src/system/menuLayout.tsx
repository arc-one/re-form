
import DynamicForm, { getValue, getForm, setForm, getValues, addRow, removeRow, setFields, setValues } from '../lib/index';
import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { menuData } from './menuData';
import { builderFieldData, builderFieldInitialValues } from './builderFieldData';
import { allForms, setSelectedNode, getSelectedNode, unSelectNode, selectNode, getMasterdata } from '../lib/services/dynamic-form-service';
import { handleMenuSelect, handleFormMenuSelect } from '../system/_common';


export const menuLayout: DynamicFormSchema = {
    name: "menuLayout",
    mode: "layout", // table, object
    height: '100vh',
    fields: {
        formMenu: {
            type: "menu",
            ref: {
                formName: 'menuData',
            },
            menuOptions: [{
                label: "Form Configuration",
                key: "formProperties",
            }],
            onSelect: (props: any) => {
                handleFormMenuSelect()
            },
            defaultSelectedKeys: ['formProperties']
        },
        fieldsPropertiesTitle: {
            type: "content",
        },
        fieldsMenu: {
            type: "menu",
            ref: {
                formName: 'menuData',
            },
            refMenuOptions: {
                label: "$label",
                key: "$key",
            },
            onSelect: (props: any) => {
                const _menuData = getMasterdata('menuData')
                const row = { ...builderFieldInitialValues, ..._menuData.values[props.key * 1] };

                handleMenuSelect(props.data, row, props.key * 1);
                let selectedNode = getSelectedNode();
                unSelectNode(selectedNode);
                selectedNode.field = row.name
                selectNode(selectedNode);
            }
        },
        addField: {
            type: 'button',
            value: "Add Field",
            // buttontype:'primary',
            onButtonClick: (props: any) => {

                const selectedNode = getSelectedNode();
                const selectedForm = getForm(selectedNode.form);
                let type = 'input';
                let span = 12;
                if(selectedForm.mode !== 'form') {
                    type = 'content';
                    span = 24;
                }


                const newFieldID = Math.floor(Math.random() * 100000);
                const menuData = getMasterdata('menuData');
                const newField: any = { ...builderFieldInitialValues, label: 'Field ' + newFieldID, name: 'field' + newFieldID, type, span };
                menuData.values.push(newField);
                const menuLayout = getForm('menuLayout');
                allForms['menuLayout'].setFormData({ ...menuLayout });

                const newSelectedForm = {...selectedForm}
                newSelectedForm.fields['field' + newFieldID] = newField;
                if(selectedForm.mode !== 'form') {
                    newSelectedForm.values[0]['field' + newFieldID] = 'New Element'
                }
                
                setForm(selectedNode.form, newSelectedForm);

                //setFields(selectedNode.form, { ['field' + newFieldID]: newField })
            },
        },
    },
    values: [{
        fieldsPropertiesTitle: {
            value: "Fields:"
        },
    }]
}