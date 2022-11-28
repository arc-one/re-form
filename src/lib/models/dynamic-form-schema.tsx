
import { CheckboxOptionType, Menu } from 'antd';
import { AnySoaRecord } from 'dns';

export class DynamicFormSchema {
    autoGenerateId?: string | null = null;
    name: string = "form";
    mode?: 'form' | 'table' | 'layout' = "form";
    editMode?: boolean = false;
    autoSave?: boolean = false;
    fields: { [key: string]: Field; } = {};
    values?: any; //[ { [key: string]: Value; } ] | { [key: string]: Value; };
    layout?: 'vertical' | 'horizontal' | 'inline' = 'vertical';
    margin?: string | number;
    padding?: string | number;
    flex?: string | number = 100;
    height?: string | number;
    groups?: { [key: string]: Group; };
    minRows?: number;
    defaultSpan?: number;
    gutterX?: number;
    gutterY?: number = 0;
    justify?: string = 'start';
    size?: 'large' | 'middle' | 'small';
    setChildValues?: any;

    labelSpan?: number;
    labelOffset?: number;
    wrapperSpan?: number;
    wrapperOffset?: number;
    // maxRows?:number;
}

export class Group {
    title?: string;
    subTitle?: string;
    display?: boolean;
}
export class Field {
    id?: string;
    formName?: string;
    type?: string = "input";
    label?: string;

    required?: boolean;
    disabled?: boolean;
    display?: boolean;
    bordered?: boolean;
    showCount?: boolean;
    defaultValue?: any;
    value?: any;

    colon?: boolean;
    hidden?: boolean;
    labelAlign?: 'left' | 'right' = 'right';
    name?: string;
    normalize?: any;
    preserve?: boolean;
    tooltip?: any;

    subscriptions?: Subscription[];
    onChange?: onChangeEvent[];
    span?: number;
    ref?: any;

    group?: string;
    refOptions?: CheckboxOptionType

    /*
        Properties for Menu
    */


    defaultOpenKeys?: string[];
    defaultSelectedKeys?: string[];
    selectedKeys?: string[];




    /*
        Properties for Drawer
    */

    //autoFocus:boolean;
    afterVisibleChange?: any;
    bodyStyle?: any;
    className?: string;
    closable?: boolean;
    closeIcon?: boolean;
    contentWrapperStyle?: any;
    destroyOnClose?: boolean;
    drawerStyle?: any;
    //extra?:any;
    footer?: any;
    footerStyle?: any;
    forceRender?: boolean;
    getContainer?: any;
    headerStyle?: any;
    height?: string | number;
    keyboard?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    maskStyle?: any;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    push?: boolean | { distance: string | number };
    style?: any;
    drawerSize?: 'default' | 'large';
    drawerTitle?:any;
    visible?: boolean;
    width?: string | number;
   // zIndex?: number;
    onClose?: any;


    /*
        Properties for Button
    */


    block?: boolean;
    danger?: boolean;
    // disabled?:boolean;
    ghost?: boolean;
    href?: string;
    // htmlType?:string;
    icon?: any;
    loading?: boolean;
    shape?: 'default' | 'circle' | 'round';
    target?: string;
    buttontype?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
    onSelect?: any;
    onButtonClick?: any;
    onClick?: any;



    /*
        Properties for Menu
    */

    menuOptions?: MenuItem[];
    refMenuOptions?: RefMenuItem;




    /*
        Properties for Card
    */
    title?: string | number;
    innerTitle?: string | number;

    description?: string | number
    extra?: string | number;
    hoverable?: boolean;
    cover?: string;


    /*
        Properties for Layouts
    */
    margin?: string;
    padding?: string;


    /*
        Properties for input, textarea
    */
    maxLength?: number;
    addonAfter?: string;
    addonBefore?: string;
    allowClear?: boolean;
    status?: 'error' | 'warning';
    prefix?: string;
    size?: 'large' | 'middle' | 'small';
    suffix?: string;

    /*
        Properties for number
    */
    autoFocus?: boolean;
    decimalSeparator?: string;
    max?: number;
    min?: number;
    readOnly?: boolean;
    //controls
    //formatter
    //keyboard
    //parser
    //precision
    //step
    //stringMode
    //onStep

    api?: string;
    apiMap?: any;
    apiParams?: string[];
    apiQueryParams?: any;
    apiSearchParam?: string;
    // optionLabel?: string;
    // optionValue?: string;


    /*
        Properties for Radio
    */

    buttonStyle?: any;
    optionType?: any;
    direction?: any;
    /*
        Properties for autocomplete
    */
    backfill?: boolean;
    // children?: boolean;
    defaultActiveFirstOption?: boolean;
    defaultOpen?: boolean;
    dropdownClassName?: string;
    //filterOption?: boolean;
    notFoundContent?: string;
    open?: boolean;
    options?: CheckboxOptionType[] = [];
    placeholder?: string;
    //onBlur
    //onChange
    //onDropdownVisibleChange
    //onFocus
    //onSearch
    //onSelect
    //onClear




    //////////////////////////////


    //onChange?: string;
    //onPressEnter?: string;

    // dependencies?: boolean = false;
    // extra?: boolean = false;
    // getValueFromEventZ?: boolean = false;
    // getValueProps?: boolean = false;
    // hasFeedback?: boolean = false;
    // help?: boolean = false;
    //htmlFor?: boolean = false;
    //initialValue?: boolean = false;
    //labelCol?: any;
    //messageVariables?: boolean = false;
    //noStyle?: boolean = false;
    //rules?: boolean = false;
    //shouldUpdate?: boolean = false;
    //trigger?: boolean = false;
    //validateFirst?: boolean = false;
    //validateStatus?: boolean = false;
    //validateTrigger?: boolean = false;
    //valuePropName?: boolean = false;
    //wrapperCol?: boolean = false;
    // setValue?: any;


    //Image
    alt?: string;
    fallback?: string;
    //height
    //placeholder
    preview?: boolean;
    src?: string;
    //width

    //Styling
    borderSize?: number;
    borderColor?: string;
    borderType?: string;
    borderLeft?: boolean;
    borderRight?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    backgroundColor?: string;
    backgroundTransparency?: number;

    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowBlurRadius?: number;
    shadowSpreadRadius?: number;
    shadowColor?: string;

    fontType?: string;
    fontSize?: number;
    fontColor?: string;
    textAlign?: string;
    position?: string;
    zIndex?: number;

    minHeight?: number;
    //minWidth?: number;
    

}

export class Subscription {
    to?: string[];
    do?: any;
    in?: 'form' | 'rows' | 'global' = 'form'
}
export class onChangeEvent {
    do?: any;
}

export class Value {
    value?: string | boolean | number | undefined;
    metadata?: any | undefined;
}

export class RefMenuItem {
    label?: string;
    key?: string;
    icon?: string;
    disabled?: string;
    type?: string;

    group?: string;
    refGroupKey?: string;
    refGroupLabel?: string;
    refGroupIcon?: string;
    refGroupDisabled?: string;
    children?: MenuItem[];
}
export class MenuItem {
    label?: string;
    key?: string;
    icon?: string;
    disabled?: string;
    type?: string;
    children?: MenuItem[];
}

// export class FormActions {
//     name?: string;
//     setFieldsValue?: Function;
//     setFieldsProperty?: Function;
// }

