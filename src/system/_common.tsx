import { addRow, removeRow, getForm, setForm, getValue, setFields, setValues } from '../lib/index';
import { typeMapping } from './types-mapping';
import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { builderFieldData, builderFieldInitialValues } from '../system/builderFieldData';


export const yesno = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
]

export const fieldMapSubscriptions = [{
  to: ['type'],
  do: ({ changed, current }: any) => {
    if (changed?.value && typeMapping[changed.value] && typeMapping[changed.value][current.field.name]) {
      setFields(current.data.name, { [current.field.name]: { display: true } });
    } else {
      setFields(current.data.name, { [current.field.name]: { display: false } });
    }
  },
}];



export const handleFormMenuSelect = () => {
  setFields('builderLayout', {
    fieldsForm: {
      display: false
    },
    fieldOptions: {
      display: false,
    },
    advancedFieldData: {
      display: false,
    },
    dataForm: {
      display: true,
    }
  });
  setFields('menuLayout', {
    formMenu: {
      defaultSelectedKeys: ['formProperties'],
      selectedKeys: ['formProperties']
    },
    fieldsMenu: {
      selectedKeys: []
    },
  });
};
export const handleMenuSelect = (formData: DynamicFormSchema, row: any, index: number) => {

  setValues('builderFieldData', row);
  setValues('builderAdvancedFieldData', row);
  setFields('builderLayout', {
    fieldsForm: {
      display: true
    },
    // fieldOptions: {
    //   display: true,
    // },
    advancedFieldData: {
      display: true,
    },
    dataForm: {
      display: false,
    }
  });
  setFields('menuLayout', {
    formMenu: {
      selectedKeys: []
    },
    fieldsMenu: {
      selectedKeys: [index + '']
    },
  });
  if (!row?.name) return;
  const optionVals: any = formData.fields[row.name]?.options || [];
  setValues('builderFieldOptions', optionVals);

}