import React, { useState } from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import DynamicForm, { getValue, getForm, setForm, getValues, addRow, removeRow, setFields, setValues, reRender } from './lib/index';
import { DynamicFormSchema, Field } from './lib/models/dynamic-form-schema';
import { update } from 'lodash';
import { allForms, allSubscriptionsPath, getSelectedNode, isInitialLoading, getMasterdata, setMasterdata } from './lib/services/dynamic-form-service';
import { Layout, Form, FormInstance, Col, Row, Divider, Space, Card, Menu, MenuProps } from 'antd';
import { handleMenuSelect, handleFormMenuSelect } from './system/_common';

import { formData as _formData } from './system/formData';

import { builderFormData } from './system/builderFormData';
import { builderFieldData, builderFieldInitialValues } from './system/builderFieldData';
import { menuData } from './system/menuData';
import { pageLayout } from './system/pageLayout';
import { isConstructorDeclaration } from 'typescript';
import { builderEmptyLayout } from './system/builderEmptyLayout';
import { headerLayout } from './system/headerLayout';


let _builderFieldInitialValues = builderFieldInitialValues;
let initDataLoading = true;


const page: DynamicFormSchema = {
  name: "MainForm",
  mode: "layout",
  editMode: true,
  fields: {
    header: {
      label: "Header",
      type: "header",
      span: 24,
    },
    form: {
      label: "Form",
      type: "form",
      span: 24,
      // padding: '30px'
    },
    footer: {
      label: "Footer",
      type: "footer",
    },
  },
  values: [{
    header: {
      value: headerLayout
    },

    form: {
      value: { ..._formData, ...builderFormData.values[0] },
    },

    footer: {
      value: 'Footer'
    },

  }]
}

function App() {

  const [selectedFormData, setSelectedFormData] = useState(page);

  menuData.values = [];


  // pageLayout
  Object.keys(selectedFormData.fields).forEach((fieldName: string) => {
    const field: any = selectedFormData.fields[fieldName];
    menuData.values.push({ ..._builderFieldInitialValues, ...field, name: fieldName });
  })

  // let selected = {...getSelectedNode()};
  const onClick = (props: any) => {

    setTimeout(() => {
      const selectedNode = getSelectedNode();
      const selectNewForm = getForm(selectedNode.form);

      //console.log(selectedFormData.name, selectedNode.form)
      if (!selectedNode.field) {
        const _menuData = getMasterdata('menuData');
        _menuData.values = [];
        Object.keys(selectNewForm.fields).forEach((fieldName: string, index: number) => {
          const field: any = selectNewForm.fields[fieldName];
          if (selectNewForm?.values[0][field.name]) {
            field.value = selectNewForm?.values[0][field.name];
          }

          _menuData.values.push({ ...builderFieldInitialValues, ...field });

        })
        handleFormMenuSelect();

      } else {
        const index = Object.values(props.data.fields).findIndex((item: any) => item?.name == props.field.name);

        const _menuData = getMasterdata('menuData')
        const row = { ...builderFieldInitialValues, ..._menuData.values[index * 1] };

        handleMenuSelect(selectNewForm, row, index * 1);
      }
      //setSelectedFormData(selectNewForm);
      setValues('builderFormData', selectNewForm);

    }, 20);
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
      _builderFieldInitialValues = {};
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
      menuData.values.push({ ...builderFieldInitialValues, ...field, name: fieldName });
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

  })
  return (
    <div className="App" >
      <Row>
        <Col className='left-side' flex={'calc(100% - 700px)'}  >
          <DynamicForm data={selectedFormData} onClick={onClick} onDrop={onDrop} />
        </Col>
        <Col flex={'700px'} >
          <DynamicForm data={pageLayout} masterdata={{ menuData }} onChange={onChange} onAddRow={onAddRow} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
