import type { FormInstance } from 'antd/es/form';
import React, { useState } from 'react';
import { Form, Table } from 'antd';
import { DynamicFormSchema, Field, Value, Group } from './models/dynamic-form-schema';
import DynamicFormItem from './form-item';
import { allForms } from './services/dynamic-form-service';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = (props: any) => {
    const index = props['data-row-key'];
    const formValues = props.data.values[index];
    const initialValues: any = {}
    const [form] = Form.useForm();


    if (!allForms[props.data.name]) allForms[props.data.name] = {};
    if (!allForms[props.data.name]?.formActions) allForms[props.data.name].formActions = [];
    allForms[props.data.name].formActions[index] = form;

    if (formValues) {
        Object.keys(formValues).forEach((keyValue: string, index) => {
            initialValues[keyValue] = formValues[keyValue]?.value || formValues[keyValue]
        });

    }

    return (
        <Form
            key={index + '-form'}
            name={props.data.name}
            autoComplete="off"
            initialValues={initialValues}
            form={form}
            component={false}
            onValuesChange={(_, allFields) => {

                //console.log('props', index, form)
                props.onChange(_, allFields, index, form);
            }}
        >
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const TableView = ({ data, onChange }: { data: DynamicFormSchema, onChange: any }): JSX.Element => {
    let formData = data;

    formData.values = formData.values.map((formValues: any, indexRow: number) => {
        formData.values[indexRow].key = indexRow;
        const initalValues: any = {}
        Object.keys(formValues).forEach((keyValue: string, indexColumn) => {
            initalValues[keyValue] = formValues[keyValue]?.value || formValues[keyValue];
            if (!initalValues.key) {
                initalValues.key = indexRow;
            }
        });
        return initalValues;
    })

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = Object.keys(formData.fields).map((fieldName: string, index) => {
        const field: Field = formData.fields[fieldName];

        const col: any = {
            key: fieldName + index,
            title: field.label,
            dataIndex: fieldName,
            width: "12.5%",
            editable: true, // field.disabled || field.readOnly?false:true,
            field,
            data: formData,
        }
        //check if editable
        // if(field.disabled || field.readOnly?false:true) {

        col.render = (value: any, record: any, index: any) => {
            formData.fields[fieldName].defaultValue = value;
            return <DynamicFormItem 
                index={index} 
                indexValues={index} 
                key={fieldName + index} 
                data={formData} 
                fieldName={fieldName} 
                />
        }
        // }
        return col;
    })


    const components = {
        body: {
            row: (props: any) => EditableRow({ ...props, data: formData, onChange })
        }
    };

    return (
        <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={formData.values}
            columns={defaultColumns as ColumnTypes}
        />
    );
};

export default TableView;
