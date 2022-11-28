import React, { useState } from "react";
import { Row, Col, ConfigProvider } from 'antd';
import { DynamicFormSchema, Field, Group } from './models/dynamic-form-schema';
import TableView from './table-view';
import FormView from './form-view';
import LayoutView from './layout-view';
import { allForms, onChange, setInitialLoadingStatus, handleAllSubscriptions, isInitialLoading, setSelectedNode, getSelectedNode, handleOnclickForEditMode, setMasterdata, selectNode } from './services/dynamic-form-service';
import _ from 'lodash'
import type { FormInstance } from 'antd/es/form';


const DynamicForm = (props: any): JSX.Element => {

    const selectedNode = getSelectedNode();

    if (props.data.editMode) {
        setSelectedNode({ parents: [], form: props.data.name });
        setTimeout(() => selectNode(getSelectedNode()));
    }

    setTimeout(() => {
        if (isInitialLoading) {
            setInitialLoadingStatus(false);
            handleAllSubscriptions();
        }
    });

    //const df
    return <ConfigProvider
        theme={{

        }}
    >
        {DynamicView(props)}
    </ConfigProvider>;
}

export const DynamicView = (props: any): JSX.Element => {

    let section;
    let _delayedClick: any;
    let clickedOnce: any;
    let selectedData: any;

    const data = { ...new DynamicFormSchema, ...props.data };
    data.groups = { ...{ default: new Group() }, ...data.groups };

    // Set min Rows
    if (data?.minRows === undefined) data.minRows = 1;
    if (!data?.values) data.values = [];
    if (!data?.values || data.minRows > data?.values?.length) {
        for (let index = 0; index < data.minRows; index++) {
            if (!data.values[index]) data.values[index] = { key: index };
        }
    }

    //Set allForms
    const [formData, setFormData] = useState(data);
    if (!formData.name || !props?.data?.mode) return <div>Cannot display the form!</div>
    allForms[formData.name] = { formData, setFormData };

    //Set Masterdata
    if (props.masterdata) setMasterdata(props.masterdata);
    if (props?.onAddRow) formData.onAddRow = props.onAddRow;
    if (!data) return <div>Error! The form is not defined</div>


    const fieldChange = (
        {
            _,
            allFields,
            index,
            form,
            from,
            formData
        }:
            {
                _: any,
                allFields: any,
                index: number,
                form?: FormInstance,
                from?: string,
                formData: DynamicFormSchema
            }) => {
        onChange(_, allFields, index, form, from);
        if (props?.onChange && allFields) {
            props.onChange(_, allFields, index, form);
            const fieldName = Object.keys(_)[0];
            if (formData?.fields[fieldName]) {
                const field = formData.fields[fieldName]
                if (field.onChange?.length) {
                    field.onChange.forEach(item => {
                        if (item?.do && typeof item?.do == 'function') {
                            item.do({ field, formData, index });
                        }
                    })
                }
            }
        }
    }

    // const click = (onClickProps: any) => {
    //     clickedOnce = undefined;
    //     if (onClickProps.data.name != selectedData?.form) return;
    //     props?.onClick(onClickProps);
    // };

    const onClick = (onClickProps: any) => {
        if (!props?.onClick) return;

        if (!onClickProps?.data?.editMode) {
            props?.onClick(onClickProps);
            return;
        }

        selectedData = handleOnclickForEditMode(onClickProps, props);
        props?.onClick(onClickProps, selectedData);

        // if (!_delayedClick) {
        //     _delayedClick = _.debounce(click, 300);
        // }
        // if (clickedOnce) {
        //     _delayedClick.cancel();
        //     clickedOnce = false;
        //     props?.onClick(onClickProps);
        // } else {
        //     _delayedClick(onClickProps);
        //     clickedOnce = true;
        // }
    }

    if (formData.mode === 'form') section = <FormView
        data={{ ...formData }}
        onChange={(
            _: any,
            allFields: any,
            index: number,
            form?: FormInstance
        ) => fieldChange({ _, allFields, index, form, from: 'form', formData })}
        onDrop={props?.onDrop}
        onClick={onClick} />

    if (formData.mode === 'table') section = <TableView data={{ ...formData }} onChange={(
        _: any,
        allFields: any,
        index: number,
        form?: FormInstance
    ) => fieldChange({ _, allFields, index, form, from: 'table', formData })} />

    if (formData.mode === 'layout') section = <LayoutView
        data={{ ...formData }}
        onClick={onClick}
        onChange={(
            _: any,
            allFields: any,
            index: number,
            form?: FormInstance
        ) => fieldChange({ _, allFields, index, form, from: 'layout', formData })}
        onDrop={props?.onDrop}
        onAddRow={formData?.onAddRow} />

    const rowProps: any = {
        justify: formData.justify
    }

    return <div style={{
        margin: formData.margin,
        padding: formData.padding,
        height: formData.height,
        //   width:'100%'
        //overflow: 'hidden'
    }}>
        <Row {...rowProps}>
            <Col flex={formData.flex}>
                {section}
            </Col>
        </Row>
    </div>
};

export const addRow = (formName: string) => {
    const newFormData = { ...allForms[formName].formData };
    newFormData.values.push({});
    allForms[formName]?.setFormData(newFormData);
}
export const removeRow = (formName: string, key: number) => {
    const newFormData = { ...allForms[formName].formData };
    newFormData.values = newFormData.values.filter((item: any) => item.key !== key);
    allForms[formName]?.setFormData({ ...newFormData });
    allForms[formName].formData = newFormData;

    if (allForms[formName].formActions) {
        let newFormActions = [...allForms[formName].formActions];
        allForms[formName].formActions = newFormActions.filter((item: any, ind: number) => ind !== key);;
    }
}
export const getForm = (formName: string) => {
    return allForms[formName]?.formData;
}
export const setForm = (formName: string, formData: DynamicFormSchema) => {
    allForms[formName]?.setFormData({ ...allForms[formName].formData, ...formData });
}
export const getValue = (formName: string, fieldName: string, index: number = 0) => {
    return allForms[formName]?.formActions[index].getFieldsValue([fieldName])[fieldName];
}
export const getValues = (formName: string, fieldNames: string[], index: number = 0) => {
    if (fieldNames) {
        return allForms[formName]?.formActions[index]?.getFieldsValue(fieldNames);
    } else {
        return allForms[formName]?.formActions[index]?.getFieldsValue();
    }
}
export const setFields = (formName: string, fields: { [key: string]: Field }) => {
    const formData: any = { ...allForms[formName].formData };
    Object.keys(fields).forEach((fieldName: string) => {
        formData.fields[fieldName] = { ...formData.fields[fieldName], ...fields[fieldName] }
    });
    if (typeof allForms[formName]?.setFormData == 'function') {
        allForms[formName]?.setFormData(formData);
        //allForms[formName]?.setFormData({ ...allForms[formName].formData, ...formData });
    }

}
export const setValues = (formName: string, _values: { [key: string]: any } | [{ [key: string]: any }]) => {

    const _formData = getForm(formName);
    let values;

    if (!_values) return;

    if (!Array.isArray(_values)) {
        values = [_values];
    } else {
        values = _values;
    }

    values.forEach((rowValues: { [key: string]: any }, index) => {
        _formData.values[index] = { ..._formData.values[index], ...rowValues } || [];

        if (allForms[formName]?.formActions && allForms[formName]?.formActions[index]?.setFieldsValue) {
            allForms[formName]?.formActions[index]?.setFieldsValue({ ...rowValues });
        }
    });

    if (typeof allForms[formName]?.setFormData == 'function') {
        allForms[formName].setFormData({ ..._formData });
    }
    //todo handle particular field  not all
    handleAllSubscriptions();
}
export const reRender = (formName: string) => {
    allForms[formName]?.setFormData({ ...allForms[formName].formData });
}
export default DynamicForm;
