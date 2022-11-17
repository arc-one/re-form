import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { yesno } from './_common';

export const builderFormData: DynamicFormSchema = {
  name: "builderFormData",
  mode: "form", // table, object
  autoSave: false,
  layout: 'horizontal',
  defaultSpan: 24,
  gutterX: 0,
  gutterY: 0,
  labelSpan: 7,
  //size: 'small',
  fields: {

    name: {
      label: "Name",
      required: true,
    },
    mode: {
      label: "Mode",
      required: true,
      type: 'select',
      options: [
        {
          label: 'Form',
          value: 'form',
        },
        {
          label: 'Table',
          value: 'table',
        },
        {
          label: 'Layout',
          value: 'layout',
        },
      ]
    },
    autoSave: {
      type: "radio",
      label: "Auto Save",
      options: yesno
    },
    layout: {
      type: "radio",
      label: "Layout",
      direction: 'vertical',
      options: [
        {
          label: 'Vertical',
          value: 'vertical',
        },
        {
          label: 'Horizontal',
          value: 'horizontal',
        },
        {
          label: 'Inline',
          value: 'inline',
        },
      ]
    },
    justify: {
      type: "radio",
      label: "Justify",
      direction: 'vertical',
      options: [
        {
          label: 'Start',
          value: 'start',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'End',
          value: 'end',
        },


      ]
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: "Middle",
          value: "middle",
        },
        {
          label: "Large",
          value: "large",
        },
      ]
    },
    defaultSpan: {
      label: "Span",
      type: 'number',
    },
    margin: {
      label: "Margin",
      type: 'number',
    },
    padding: {
      label: "Padding",
      type: 'number',
    },
    flex: {
      label: "Flex",
    },
    height: {
      label: "Height",
    },
    minRows: {
      type: 'number',
      label: "Min Rows",
    },
    gutterX: {
      type: 'number',
      label: "Gutter-X",
    },
    gutterY: {
      type: 'number',
      label: "Gutter-Y",
    },


    labelSpan: {
      type: 'number',
      label: "Label Span",
    },
    labelOffset: {
      type: 'number',
      label: "Label Offset",
    },
    wrapperSpan: {
      type: 'number',
      label: "Wrapper Span",
    },
    wrapperOffset: {
      type: 'number',
      label: "Wrapper Offset",
    },



  },
  values: [{
    mode: 'form',
    gutterX: 30,
    gutterY: 30,
    flex: '100%',
    margin: 0,
    padding: 45,
    justify: 'start',
    layout: 'vertical',
    minRows: 1,
    size: 'middle',
    defaultSpan: 12
  }]
}