import { builderFormData } from './builderFormData';
import { builderFieldData } from './builderFieldData';
import { builderFieldOptions } from './builderFieldOptions';
import { builderAdvancedFieldData } from './builderAdvancedFieldData';
import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';
import { typeMapping } from './services/types-mapping';
import { setFields } from '../../lib/index';

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