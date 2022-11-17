import React, { useState } from "react";
import {
    Button, Checkbox, Form, Input, InputNumber, Radio, FormInstance,
    Layout, Col, Card, Drawer, Row

} from 'antd';
import { DynamicFormSchema, Field, Value } from './models/dynamic-form-schema';
import Autocomplete from './autocomplete';
import { DynamicView } from './index';
import LayoutView from './layout-view';
import { getDollarValue, allForms, calcWidth, fetchList, handleSubscriptions, isInitialLoading, defineGlobalSubscriptionPath, defineGlobalFieldPath } from './services/dynamic-form-service';

const LayoutItem = ({
    value,
    field,
    uniqueKey,
    type,
    formValues,
    onChange,
    onAddRow,
    onClick,
    data,
    index,
    indexValues,
    onDrop
}: {
    value: any,
    field: Field,
    uniqueKey: string,
    type: string,
    formValues: any,
    onChange: any,
    onAddRow: any,
    onClick: any,
    data: DynamicFormSchema,
    index: number,
    indexValues: number,
    onDrop?: any
}): JSX.Element => {
    
    const rowProps: any = {
        justify: value?.justify || 'start'
    }

    if (value?.mode === 'form' || value?.mode === 'table' || value?.mode === 'layout') {
        const form = <DynamicView
            key={uniqueKey}
            data={value}
            onClick={onClick}
            onChange={onChange}
            onDrop={onDrop}
            onAddRow={onAddRow} />

        value =
            <Row {...rowProps}>
                <Col flex={value.flex || 100 + '%'}>
                    {form}
                </Col>
            </Row>
    }

    const props: any = {
        style: { margin: field.margin, padding: field.padding, display: field.display === false ? 'none' : 'block' },
        key: uniqueKey,
      //  id:data.name + '-' + field.name + '-element'
    }

    let element = <></>;
    if (type == 'header') {
        element = <Layout.Header {...props}>{value}</Layout.Header>
    } else if (type == 'content') {
        element = <Layout.Content {...props}>{value}</Layout.Content>
    } else if (type == 'footer') {
        element = <Layout.Footer {...props}>{value}</Layout.Footer>
    } else if (type == 'sider') {
        props.width = calcWidth(field.span || props.data.defaultSpan || 24);
        element = <Layout.Sider {...props}>{value}</Layout.Sider>
    } else if (type == 'layout') {
        element = <Layout {...props} >{value}</Layout>
    } else if (type == 'card') {

        props.title = getDollarValue(field.title, formValues)
        const innerTitle = getDollarValue(field.innerTitle, formValues)
        props.extra = getDollarValue(field.extra, formValues)
        const description = getDollarValue(field.description, formValues)
        const coverLink = getDollarValue(field.cover, formValues)
        if (coverLink) props.cover = <img alt={props.title} src={coverLink} />

        props.hoverable = field?.hoverable;

        element = <Card {...props} ><Card.Meta title={innerTitle} description={description} /></Card>
    } if (type === 'drawer') {

        const drawerProps = {
            ...props,
            autoFocus: field.autoFocus,
            afterVisibleChange: field.afterVisibleChange,
            bodyStyle: field.bodyStyle,
            className: field.className,
            closable: field.closable,
            closeIcon: field.closeIcon,
            contentWrapperStyle: field.contentWrapperStyle,
            destroyOnClose: field.destroyOnClose,
            //extra:field.extra,
            footer: field.footer,
            footerStyle: field.footerStyle,
            forceRender: field.forceRender,
            getContainer: field.getContainer,
            headerStyle: field.headerStyle,
            height: field.height,
            keyboard: field.keyboard,
            mask: field.mask,
            maskClosable: field.maskClosable,
            maskStyle: field.maskStyle,
            placement: field.placement,
            push: field.push,
            style: field.style,
            size: field.drawerSize,
            title: field.title,
            visible: field.visible,
            width: field.width,
            zIndex: field.zIndex,
            onClose: field.onClose,
        }
        element = <Drawer {...drawerProps}>{value}</Drawer>
    } else if (type === 'button') {

        //console.log('Button');

        const buttonProps: any = {
            bordered: field.bordered,
            disabled: field.disabled,
            id: field.id,
            block: field.block,
            danger: field.danger,
            ghost: field.ghost,
            href: field.href,
            //  htmlType: field.htmlType,
            loading: field.loading,
            icon: field.icon,
            shape: field.shape,
            target: field.target,
            size: field.size,
            type: field.buttontype,
        }

        buttonProps.onClick = (e: any) => {
            if (field?.onButtonClick) {
                field.onButtonClick({ indexValues, field, data: allForms[data.name].formData, row: allForms[data.name].formData.values[indexValues] })
            }
        }
        element = <Button style={{ width: '100%' }} {...buttonProps}>{field.value}</Button>
    } else if (type === 'form') {
        element = value
    }

    return <div className="node-element"  onClick={(e) => {
        if (onClick) {
            onClick({ field, data: data, key: indexValues, domEvent: e });
        }
    }} >{element}</div>;

};

export default LayoutItem;