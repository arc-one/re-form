import { builderFormData } from '../system/builderFormData';
import { builderFieldData, builderFieldInitialValues } from '../system/builderFieldData';
import { menuData } from '../system/menuData';
import { builderFieldOptions } from '../system/builderFieldOptions';
import { builderAdvancedFieldData } from '../system/builderAdvancedFieldData';
import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { yesno, fieldMapSubscriptions as subscriptions } from './_common';
import { typeMapping } from './types-mapping';
import { addRow, removeRow, getForm, setForm, getValue, setFields } from '../lib/index';

export const builderLayout: DynamicFormSchema = {
    name: "builderLayout",
    mode: "layout", // table, object
    padding: 15,
    height: '100vh',
    fields: {
      dataForm: {
        type: 'layout',
        //display:false
      },
      fieldsForm: {
        type: 'layout',
        display: false,
      },
      fieldOptions: {
        type: 'layout',
        display: false,
        subscriptions: [{
          to: ['type'],
          do:  ({ changed, current }: any) => {
              if (changed?.value && typeMapping[changed.value] && typeMapping[changed.value][current.field.name]) {
                  setFields(current.data.name, { [current.field.name]: { display: true } });
              } else {
                  setFields(current.data.name, { [current.field.name]: { display: false } });
              }
          },
      }],
      },
      advancedFieldData: {
        type: 'layout',
        display: false,
      },
    },
    values: [{
      dataForm: {
        value: builderFormData
      },
      fieldsForm: {
        value: builderFieldData
      },
      fieldOptions: {
        value: builderFieldOptions
      },
      advancedFieldData: {
        value: builderAdvancedFieldData
      },

    }]

  }