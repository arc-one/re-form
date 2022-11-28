import { useState, useEffect, useRef } from 'react';
import '../../App.css';
import DynamicForm, { getValue, getForm, setForm, setFields, setValues, reRender } from '../../lib/index';
import { allForms, allSubscriptionsPath, getSelectedNode, getMasterdata } from '../../lib/services/dynamic-form-service';
import { Col, Row } from 'antd';
import { handleMenuSelect, handleFormMenuSelect } from './services/_common';
import { formFieldInitialValues } from './formFieldInitialValues';
import { menuData } from './menuData';
import { builderEmptyLayout } from './builderEmptyLayout';
import { builder } from './builder';
import { DynamicFormSchema, Field } from '../../lib/models/dynamic-form-schema';


let initDataLoading = true;

function BuilderComponent(props:any) {
    const [selectedFormData, setSelectedFormData] = useState(props.template);

    menuData.values = [];
    Object.keys(selectedFormData.fields).forEach((fieldName: string) => {
        const field: any = selectedFormData.fields[fieldName];
        menuData.values.push({...new Field(), ...formFieldInitialValues, ...field, name: fieldName });
    })

    const onClick = (props: any, selectedData: any) => {

        if (!selectedData) return;

        setTimeout(() => {
            const selectNewForm = getForm(selectedData.form);
            if (!selectedData.field) {
                const _menuData = getMasterdata('menuData');
                _menuData.values = [];
                Object.keys(selectNewForm.fields).forEach((fieldName: string, index: number) => {
                    const field: any = selectNewForm.fields[fieldName];
                    if (selectNewForm?.values[0][field.name]) {
                        field.value = selectNewForm?.values[0][field.name];
                    }
                    _menuData.values.push({...new Field(), ...formFieldInitialValues, ...field });
                })
                handleFormMenuSelect();
            } else {
                const index = Object.values(selectNewForm.fields).findIndex((item: any) => item?.name == selectedData.field);
                const _menuData = getMasterdata('menuData')
                const row = {...new Field(), ...formFieldInitialValues, ..._menuData.values[index * 1] };
                handleMenuSelect(selectNewForm, row, index * 1);
            }
            setValues('builderFormData', selectNewForm);
        }, 100);
    }

    const onAddRow = (_: any, allFields: any, index: number, form: any) => {
        console.log('onAddRow', _, index, form)
    }

    const onChange = (_: any, allFields: any, index: number, form: any) => {
        console.log('onChange', _)

        const formName: string = form?.__INTERNAL__.name || '';
        const selectedNode = getSelectedNode();
        let selectForm = getForm(selectedNode.form);

        if (!allFields) return;
        const vals: any = {}

        Object.keys(_).forEach(propName => {
            const val = _[propName]?.value || _[propName]?.key || _[propName];
            vals[propName] = val;
        })

        if (formName === 'builderFormData') {
            setForm(selectForm.name, { ...selectForm, ...vals });
        }

        if (formName === 'builderFieldData' || formName === 'builderAdvancedFieldData') {

            // update menuData  
            const menuData = getMasterdata('menuData');
            const f = menuData.values.find((item: any) => item.name === allFields.name);
            if (!f) return;
            const menuDataValues = [...menuData.values];
            menuDataValues[f.key] = allFields
            const updatedVals = menuData.values.map((item: any, ind: number) => ({ ...item, ...menuDataValues[ind] }));
            menuData.values = updatedVals;
            reRender('menuLayout');


            if (vals['type'] && !selectForm.values[0][allFields.name]?.value) {
                //console.log('---', selectForm.values[0][allFields.name]);
                const newFormID = Math.floor(Math.random() * 100000);
                builderEmptyLayout.name += newFormID;
                if (vals['type'] === 'form') {
                    builderEmptyLayout.mode = 'form';
                }
                if (vals['type'] === 'layout') {
                    builderEmptyLayout.mode = 'layout';
                }
                selectForm.values[0][allFields.name] = { ...selectForm.values[0][allFields.name], value: builderEmptyLayout };
            }


            if (_?.value) {
                selectForm.values[0][allFields.name] = _.value
                setValues(selectForm.name, selectForm.values);
            }

            selectForm.fields[allFields.name] = { ...selectForm.fields[allFields.name], ...vals };
            setForm(selectForm.name, selectForm);
        }

        //update options
        if (formName === 'builderFieldOptions') {
            const fieldName = getValue('builderFieldData', 'name');
            const optionsData = getForm('builderFieldOptions');
            selectForm.fields[fieldName].options = optionsData.values.map((item: any) => ({ ...item, value: item.key }));
            setForm(selectForm.name, selectForm)
        }

    }

    const onDrop = (props: any) => {
        // console.log('onDrop', props)
        const menuData = getMasterdata('menuData');
        menuData.values = [];
        Object.keys(props.data.fields).forEach((fieldName: string) => {
            const field: any = props.data.fields[fieldName];
            menuData.values.push({ ...formFieldInitialValues, ...field, name: fieldName });
        })

        const menuLayout = getForm('menuLayout');
        setForm('menuLayout', menuLayout);
        const selectedNode = getSelectedNode();
        if (!selectedNode?.field) {
            setFields('menuLayout', {
                formMenu: {
                    selectedKeys: ['formProperties']
                },
                fieldsMenu: {
                    selectedKeys: []
                },
            });
        } else {
            const _selectedFormData = getForm(selectedNode.form);
            const index = Object.values(_selectedFormData.fields).findIndex((item: any) => item?.name == selectedNode.field);
            setFields('menuLayout', {
                formMenu: {
                    selectedKeys: []
                },
                fieldsMenu: {
                    selectedKeys: [index + '']
                },
            });
        }
    }


    setTimeout(() => {
        const selectedNode = getSelectedNode();
        if (initDataLoading) {
            const selectNewForm = getForm(selectedNode.form);
            setValues('builderFormData', selectNewForm)
            initDataLoading = false;
        }
        console.log('allForms', allForms);
        console.log('allSubscriptionsPath', allSubscriptionsPath)
    })

    return (
        <Row>
            <Col className='left-side' flex={'calc(100% - 800px)'}  >
                <DynamicForm
                    data={selectedFormData}
                    onClick={onClick}
                    onDrop={onDrop}
                />
            </Col>
            <Col flex={'500px'} >
                <DynamicForm
                    data={builder}
                    masterdata={{ menuData }}
                    onChange={onChange}
                    onAddRow={onAddRow}
                />
            </Col>
        </Row>
    );
}
export default BuilderComponent;