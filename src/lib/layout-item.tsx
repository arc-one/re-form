import React, { useState } from "react";
import {
    Button, Layout, Col, Card, Drawer, Row, Image
} from 'antd';
import { DynamicFormSchema, Field, Value } from './models/dynamic-form-schema';
import Autocomplete from './autocomplete';
import { DynamicView } from './index';
import LayoutView from './layout-view';
import { getDollarValue, allForms, calcWidth, setSingleClickedID, getSingleClickedID, setDoubleClickedID, getDoubleClickedID } from './services/dynamic-form-service';
//import image from '../../public/inside-tesla-logo-new.svg';
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
        justify: value?.justify || 'center',
    }

    const style = {
        borderTop: field.borderTop ? field.borderSize + "px " + field.borderType + " #" + field.borderColor : '',
        borderBottom: field.borderBottom ? field.borderSize + "px " + field.borderType + " #" + field.borderColor : '',
        borderLeft: field.borderLeft ? field.borderSize + "px " + field.borderType + " #" + field.borderColor : '',
        borderRight: field.borderRight ? field.borderSize + "px " + field.borderType + " #" + field.borderColor : '',
        margin: field.margin,
        padding: field.padding,
        display: field.display === false ? 'none' : 'block',
        height: field?.height,
        minHeight: field?.minHeight,
        overflowY: 'auto',
        backgroundColor: field.backgroundColor ? "#" + field.backgroundColor : '',
        opacity: field.backgroundTransparency ? field.backgroundTransparency / 100 : 1,

        boxShadow: field.shadowOffsetX + 'px ' + field.shadowOffsetY + 'px ' + field.shadowBlurRadius + 'px ' + field.shadowSpreadRadius + 'px #' + field.shadowColor,

        fontFamily: field.fontType?"Gotham "+field.fontType:"",
        fontSize: field.fontSize,
        color: "#"+field.fontColor,
        textAlign: field.textAlign,
        position: field.position,


       // position: 'relative', // not sure, requires testing
    }




    const props: any = {
        key: uniqueKey,
        id: data.name + '-' + field.name + '-click',
    }


    if (value?.mode === 'form' || value?.mode === 'table' || value?.mode === 'layout') {
        props.data = value;
        props.onClick = onClick;
        props.onChange = onChange;
        props.onDrop = onDrop;
        // props.onAddRow = onAddRow;
        value =
            <Row {...rowProps}>
                <Col flex={value.flex || 100 + '%'}>
                    <DynamicView {...props} />
                </Col>
            </Row>

    }

    const onClickEvent = (e: any) => {

        if (e.detail == 1 && getSingleClickedID() !== e.target?.id) {
            setSingleClickedID(e.target?.id);
            onClick({
                field,
                data: data,
                key: indexValues,
                domEvent: e,
                clickedID: e.target?.id
            });
        }

        if (e.detail === 2 && e.target?.id !== getDoubleClickedID()) {
            setDoubleClickedID(e.target?.id);
            onClick({
                field,
                data: data,
                key: indexValues,
                domEvent: e,
                clickedID: e.target?.id
            });
        }
    }

    let element = <></>;

    props.style = style;

    if (type == 'header') {
        element = <Layout.Header {...props}>{value}</Layout.Header>
    } else if (type == 'image') {

        props.preview = field.preview || false;
        props.alt = field.alt || field.name;
        props.fallback = field.fallback;
        props.src = value || field.src;
        
        element = <Image
            {...props}
        />
        // element = <Layout.Content {...props}>{value}</Layout.Content>
    } else if (type == 'content') {
        element = <Layout.Content {...props}>{value}</Layout.Content>
    } else if (type == 'footer') {
        element = <Layout.Footer {...props}>{value}</Layout.Footer>
    } else if (type == 'sider') {
        props.width = calcWidth(field.span || props.data.defaultSpan || 24);
        element = <Layout.Sider {...props}>{value}</Layout.Sider>
    } else if (type == 'layout' || type === 'form') {
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
    } else if (type === 'drawer') {

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
    }


    return <div className="node-element" id={data.name + '-' + field.name + '-click'} onClick={onClickEvent} >{element}</div>;

};

export default LayoutItem;