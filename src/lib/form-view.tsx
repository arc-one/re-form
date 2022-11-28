import React, { useState } from "react";
import { Form, Col, Row, Divider, Layout } from 'antd';
import { DynamicFormSchema } from './models/dynamic-form-schema';
import DynamicFormItem from './form-item';
import { allForms, drop, dragStart, dragEnter } from './services/dynamic-form-service';

const FormRow = (props: any): JSX.Element => {

    const [form] = Form.useForm();
    const initialValues: any = {};

    if (!allForms[props.data.name]) allForms[props.data.name] = {};
    if (!allForms[props.data.name]?.formActions) allForms[props.data.name].formActions = [];
    allForms[props.data.name].formActions[props.indexValues] = form;


    Object.keys(props.formValues).forEach((keyValue: string) => {
        const formValues = { ...props.formValues };
        initialValues[keyValue] = formValues[keyValue]?.value || formValues[keyValue];
    });

    return <Form
        form={form}
        name={props.data.name}
        initialValues={initialValues}
        labelCol={{ span: props.data.labelSpan, offset: props.data.labelOffset }}
        wrapperCol={{ span: props.data.wrapperSpan, offset: props.data.wrapperOffset }}
        layout={props.data.layout ? props.data.layout : 'vertical'}
        autoComplete="off"
        onValuesChange={(_, allFields) => {
            props.onChange(_, allFields, props.indexValues, form);
        }}
    >
        <>
            {

                Object.keys(props.data.groups).map((groupName: string, groupIndex) => {
                    const group = props.data.groups[groupName];
                    if (group.display === false) return null;
                    let groupHeader;
                    if (group.title || group.subTitle) {
                        groupHeader = <Layout
                            style={{ paddingLeft: '0px' }}
                  
                        // subTitle={group.subTitle}
                        >{group.title}</Layout>
                    }

                    return <div style={{ width: '100%' }} key={`group-${groupName}`}>
                        {groupHeader}
                        <Row
                            id={props.data.name + '-node'}
                            //ref={myRefname}
                            key={`row-${props.indexValues}`}
                            gutter={[props.data.gutterX, props.data.gutterY]}>
                            {
                                Object.keys(props.data.fields).map((fieldName: string, index) => {
                                    const field = props.data.fields[fieldName];
                                    if (field.group === groupName || groupName === 'default' && !field.group || Object.keys(props.data.groups)?.length == 1) {
                                        const display = field?.display === false ? 'none' : 'block';
                                        return <Col
                                            draggable={props.data.editMode}
                                            onDragStart={(e) => dragStart(e, index)}
                                            onDragEnter={(e) => dragEnter(e, index)}
                                            onDragEnd={(e: any) => drop(e, props)}
                                            onClick={(e: any) => {
                                                if (props.onClick) {

                                                    const elementData = e?.target?.closest('.element-selected')?.id?.split('-');
                                                    const clicked: any = {};
                                                    if (elementData && elementData[0]) clicked.formName = elementData[0];
                                                    if (elementData && elementData[1]) clicked.fieldName = elementData[1];

                                                    props.onClick({ field, data: props.data, key: props.indexValues, domEvent: e, clicked });
                                                }
                                            }}
                                            id={props.data.name + '-' + fieldName + '-element'}
                                            className={props.data.editMode ? "element edit-mode" : "element"}
                                            form-name={props.data.name}
                                            // ref={myRefname}
                                            key={`col-${fieldName}`}
                                            span={field?.span || props.data.defaultSpan || 12}
                                            style={{ display: display }}>
                                            <DynamicFormItem index={index} indexValues={props.indexValues} key={fieldName} data={props.data} fieldName={fieldName} />
                                        </Col>
                                    }
                                })
                            }
                        </Row>
                    </div>
                })
            }
        </>
    </Form>

}

const FormView = ({ data, onChange, onClick, onDrop }: { data: DynamicFormSchema, onChange?: any, onClick?: any, onDrop?: any }): JSX.Element => {
    let formData = data;
    return <> {
        formData.values.map((formValues: any, indexValues: any) => {
            formData.values[indexValues].key = indexValues;
            const divider = indexValues > 0 ? <Divider /> : null;
            return <div
                style={{ width: '100%' }}
                key={`form-row-${indexValues}`} >
                {divider}
                <FormRow
                    data={formData}
                    formValues={formValues}
                    indexValues={indexValues}
                    onChange={onChange}
                    onClick={onClick}
                    onDrop={onDrop}
                />
            </div>
        })
    } </>
}

export default FormView;