import React, { useState } from "react";
import { Layout, Form, FormInstance, Col, Row, Divider, Space, Card, Menu, MenuProps } from 'antd';
import { DynamicFormSchema, MenuItem } from './models/dynamic-form-schema';
import { DynamicView } from './index';
import LayoutItem from './layout-item';
import { getDollarValue, allForms, getRefGroups, calcWidth, fetchList, handleSubscriptions, isInitialLoading, defineGlobalSubscriptionPath, defineGlobalFieldPath, masterdata, drop, dragStart, dragEnter } from './services/dynamic-form-service';


const LayoutView = ({ data, onChange, margin = "0px", padding = "0px", onAddRow, onClick, onDrop }: { data: DynamicFormSchema, onChange: any, margin?: string, padding?: string, onAddRow?: any, onClick?: any, onDrop?: any }): JSX.Element => {

    let formData = data;
    let values: any;
    let refForm: DynamicFormSchema;

    const onSelect = (props: any) => {
        if (props.field?.onSelect) props.field.onSelect(props)
    }

    return <Row id={formData.name + '-node'} gutter={[data.gutterX, data.gutterY]}> {

        Object.keys(formData.fields).map((fieldName: string, index) => {
            const field: any = formData.fields[fieldName];

            field.name = fieldName;
            defineGlobalSubscriptionPath(formData.name, field);
            defineGlobalFieldPath(formData.name, fieldName)

            if (masterdata[field?.ref?.formName] && field?.ref?.formName) {
                refForm = masterdata[field?.ref?.formName];
                values = refForm?.values;
            } else {
                values = formData?.values;
            }

            let type = field.type || 'content';
            let items: any = [];

            // MENU TYPE
            if (type === 'menu') {
                let itemsObj: any = {}
                if (field.refMenuOptions && !field.menuOptions) {

                    //Attempt to get group values from parent reference form                    
                    const refForm = masterdata[field?.ref?.formName];
                    let groups = getRefGroups(field, refForm);

                    refForm.values?.forEach((formValues: any, rowIndex: number) => {
                        refForm.values[rowIndex].key = rowIndex;
                        const key: any = getDollarValue(field.refMenuOptions?.key, formValues);
                        const label: any = getDollarValue(field.refMenuOptions?.label, formValues);
                        const icon: any = getDollarValue(field.refMenuOptions?.icon, formValues);
                        const disabled: any = getDollarValue(field.refMenuOptions?.ladisabledbel, formValues);

                        let item = { key, label, icon, disabled }

                        if (field.refMenuOptions?.group && field.refMenuOptions?.group?.substring(0, 1) === '$') {

                            const groupName = field.refMenuOptions?.group?.substring(1)
                            const groupValue = getDollarValue(field.refMenuOptions?.group, formValues);

                            if (groupName && groupValue) {
                                let groupMenuItem: any = {};

                                if (groups) {
                                    groupMenuItem = groups[groupValue];
                                } else {
                                    const fullValue = getDollarValue(field.refMenuOptions?.label, formValues, true);
                                    //console.log('fullValue', fullValue, formValues)
                                    groupMenuItem = {
                                        label: fullValue.label ? fullValue.label : groupValue,
                                        icon: fullValue.icon ? fullValue.icon : groupValue,
                                        disabled: fullValue.disabled ? fullValue.disabled : groupValue,
                                        key: 'group-key-' + rowIndex + '-' + groupValue
                                    }
                                }
                                if (!itemsObj[groupValue]) {
                                    itemsObj[groupValue] = { ...groupMenuItem, children: [] }
                                }
                                itemsObj[groupValue].children.push(item)
                            }
                        } else {
                            itemsObj[key] = item;
                        }
                    })
                    items = Object.values(itemsObj);
                }
                if (field.menuOptions) {
                    items = field.menuOptions;
                }

                const menuProps: any = {
                    key: "menu",
                    mode: "inline",
                    items: items,
                    onClick: (props: any) => onSelect({ ...props, field, data: formData }),
                    style: { margin: field.margin, padding: field.padding, display: field.display === false ? 'none' : 'block' },
                    defaultSelectedKeys: field.defaultSelectedKeys,
                    defaultOpenKeys: field.defaultOpenKeys,
                    selectedKeys: field.selectedKeys,
                    // key:uniqueKey
                }
                return <Col span={field?.span || 24} key={index + '-col'}><Menu {...menuProps} /></Col>
            }

            //OTHER TYPES
            const layoutitems = values?.map((formValues: any, indexValues: any) => {

                const uniqueKey = `layout-item-${fieldName}-${index}-${indexValues}`;
                let value = formValues[fieldName]?.value || formValues[fieldName];

                //console.log('value', value)
                const props = {
                    value,
                    field,
                    data: formData,
                    uniqueKey,
                    type,
                    formValues,
                    onChange,
                    onClick,
                    onAddRow,
                    onDrop,
                    indexValues: indexValues,
                    index: index,

                }
                return <LayoutItem key={uniqueKey + 'layout-item'} {...props} />
            })

            return <Col
                draggable={data.editMode}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={(e:any) => drop(e, {onDrop})}
                className={data.editMode?"element edit-mode":"element"} 
                id={data.name + '-' + fieldName + '-element'}
                flex={field.flex}
                span={field?.span || 24} key={index + '-col'}>
                {layoutitems}
            </Col>

        })
    } </Row>

}


export default LayoutView;