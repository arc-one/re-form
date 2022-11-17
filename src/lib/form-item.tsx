import React from "react";
import {
    Button, Checkbox, Form, Input, InputNumber, Radio, FormInstance,
    Layout, Divider, Select, Space

} from 'antd';
import { DynamicFormSchema, Field, Value } from './models/dynamic-form-schema';
import Autocomplete from './autocomplete';
import { getDollarValue, allForms, fetchList, handleSubscriptions, isInitialLoading, defineGlobalSubscriptionPath, defineGlobalFieldPath, masterdata } from './services/dynamic-form-service';



const DynamicFormItem = ({
    data,
    fieldName,
    index,
    indexValues
}: {
    data: DynamicFormSchema,
    fieldName: string,
    index: number,
    indexValues: number
}): JSX.Element => {

    let [value, setValue] = React.useState();
   // console.log('--' ,data.name, allForms[data.name])
    const field: Field = allForms[data.name].formData.fields[fieldName];
    
    field.name = fieldName;
    defineGlobalSubscriptionPath(data.name, field);
    defineGlobalFieldPath(data.name, fieldName)
    


    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState(field.options);
    const fetchRef = React.useRef(0);
    const rules = [{ required: field.required, message: `${field.label} is required!` }];

    
    const itemProps = {
        key: fieldName,
        label: data.mode == 'form' ? field.label : undefined,
        required: field.required,
        rules,
        name: fieldName,
        colon: field.colon,
        hidden: field.hidden,
        //labelAlign: field.labelAlign,
        normalize: field.normalize,
        tooltip: field.tooltip,
        //  shouldUpdate: true
    }

    const genericProps = {
        maxLength: field.maxLength,
        bordered: field.bordered,
        disabled: field.disabled,
        id: field.id,
        //defaultValue: field.defaultValue, 
        // value: field.value, 

        status: field.status,
        prefix: field.prefix,
        size: field.size || data.size,
        suffix: field.suffix,
        readOnly: field.readOnly,
        placeholder: field.placeholder,
    }

    const inputProps = {
        ...genericProps,
        allowClear: field.allowClear,
        addonAfter: field.addonAfter,
        addonBefore: field.addonBefore,
    }

    const textareaProps = {
        ...genericProps,
    }

    const numberProps = {
        ...genericProps,
        autoFocus: field.autoFocus,
        decimalSeparator: field.decimalSeparator,
        max: field.max,
        min: field.min,
        readOnly: field.readOnly,
        addonAfter: field.addonAfter,
        addonBefore: field.addonBefore,
    }

    const autocompleteProps = {
        ...itemProps,
        ...genericProps,
        backfill: field.backfill,
        defaultActiveFirstOption: field.defaultActiveFirstOption,
        defaultOpen: field.defaultOpen,
        dropdownClassName: field.dropdownClassName,
        notFoundContent: field.notFoundContent,
        open: field.open,
        options: options,
    }

    const autocompleteExtraProps = {
        api: field.api,
        apiMap: field.apiMap,
        apiParams: field.apiParams,
        apiQueryParams: field.apiQueryParams,
        apiSearchParam: field.apiSearchParam,
    }

    const autocompleteMultiProps = {
        ...autocompleteProps,
        mode: "multiple"
    }

    const selectProps = { ...autocompleteProps, value: field.value, options: field.options }

    React.useMemo(() => {

        if (!field?.apiMap || !field?.api) return;
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchList(null, {
            indexValues: indexValues,
            data: data,
            extra: autocompleteExtraProps,
            field: { ...selectProps }
        }).then((newOptions: any) => {
            if (fetchId !== fetchRef.current) {
                return;
            }
            setOptions(newOptions);
            setFetching(false);
            setValue(field.value);
        });
    }, []);




    let element = <Input  {...inputProps} />
    if (field.type == 'number') {
        element = <InputNumber style={{ width: '100%' }} {...numberProps} />
    } else if (field.type == 'textarea') {
        element = <Input.TextArea rows={data.mode === 'table' ? 1 : 4} {...textareaProps} />
    } else if (field.type == 'autocomplete') {
        element = <Autocomplete
            data={data}
            extra={autocompleteExtraProps}
            field={{ ...autocompleteProps, name: fieldName }}
        />
    } else if (field.type == 'autocompleteMulti') {
        element = <Autocomplete
            data={data}
            extra={autocompleteExtraProps}
            field={{ ...autocompleteMultiProps, name: fieldName }}
        />
    }
    else if (field.type == 'select') {
        if (field.refOptions && !autocompleteProps.options) {
            const refForm = masterdata[field?.ref?.formName];
            autocompleteProps.options = refForm.values?.map((formValues: any) => {
                const label: any = getDollarValue(field.refOptions?.label, formValues)
                const value: any = getDollarValue(field.refOptions?.value, formValues)
                return { label, value }
            })
        }
        //   console.log('selectProps', field)


        element = <Select  {...selectProps} >
            {autocompleteProps.options?.map((option: any) => (
                <Select.Option value={option} key={option}>{option}</Select.Option>
            ))}
        </Select>
    }
    else if (field.type == 'checkbox') {
        const checkboxProps = {
            ...genericProps,
            options: field.options,
        }
        element = <Checkbox.Group {...checkboxProps} />
    }
    else if (field.type == 'radio') {
        const radioProps = {
            ...genericProps,
            optionType: field.optionType,
            buttonStyle: field.buttonStyle,
        }
        element = <Radio.Group {...radioProps}><Space direction={field.direction}>
            {

                (field.options || []).map((option: any) => {

                    return <Radio key={option.value} value={option.value}>{option.label}</Radio>

                })

            }
        </Space></Radio.Group>
    }
    else if (field.type == 'divider') {
        element = <Divider />
    }
    else if (field.type == 'button') {

        //     block?:boolean;
        //     danger?:boolean;
        //    // disabled?:boolean;
        //     ghost?:boolean;
        //     href?:string;
        //     htmlType?:string;
        //     //icon?:ReactNode;
        //     loading?:boolean;
        //     shape?: 'default' | 'circle' | 'round';
        //     target?:string;
        //     buttonType?:'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
        //     onClick?:any;




        const buttonProps: any = {
            ...genericProps,
            block: field.block,
            danger: field.danger,
            ghost: field.ghost,
            href: field.href,
            //  htmlType: field.htmlType,
            loading: field.loading,
            icon: field.icon,
            shape: field.shape,
            target: field.target,
            // onClick: field.onClick,
            size: field.size,
            type: field.buttontype,
            disabled: field.disabled
        }
        buttonProps.onClick = (e: any) => {
            if (field?.onButtonClick) field.onButtonClick({ index, data: allForms[data.name].formData, key: allForms[data.name].formData.values[index]?.key || 0, field, row: allForms[data.name].formData.values[index] })
        }
        element = <Button style={{ width: '100%' }} {...buttonProps}>{field.value}</Button>
    }



    return <Form.Item  {...itemProps}>{element}</Form.Item>


};

export default DynamicFormItem;
