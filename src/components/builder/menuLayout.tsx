
import { getForm, setForm } from '../../lib/index';
import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';
import { formFieldInitialValues } from './formFieldInitialValues';
import { allForms, getSelectedNode, unSelectNode, selectNode, getMasterdata } from '../../lib/services/dynamic-form-service';
import { handleMenuSelect, handleFormMenuSelect } from './services/_common';


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
            type: "layout",
            padding: "20px 30px 10px",
            fontSize: 14,
            //fontType: ""

        },
        fieldsMenu: {
            type: "menu",
            //height: "calc(100vh - 200px)",
            ref: {
                formName: 'menuData',
            },
            refMenuOptions: {
                label: "$label",
                key: "$key",
            },
            onSelect: (props: any) => {
                const _menuData = getMasterdata('menuData')
                const row = { ...formFieldInitialValues, ..._menuData.values[props.key * 1] };

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
            padding: "10px",
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
                const newField: any = { ...formFieldInitialValues, label: 'Field ' + newFieldID, name: 'field' + newFieldID, type, span };
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