
import DynamicForm, { getValue, getForm, setForm, getValues, addRow, removeRow, setFields, setValues } from '../lib/index';
import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { builderLayout } from './builderLayout';
import { menuLayout } from './menuLayout';
import { builderFieldData, builderFieldInitialValues } from './builderFieldData';
import { allForms, } from '../lib/services/dynamic-form-service';

export const pageLayout: DynamicFormSchema = {
    name: "pageLayout",
    mode: "layout", // table, object
    fields: {
      menuLayout: {
        type: "layout",
        span: 8,
      },
      builderLayout: {
        type: 'layout',
        span: 16
      },
    },
    values: [{
      menuLayout: {
        value: menuLayout
      },
      builderLayout: {
        value: builderLayout
      },
    }]
  }