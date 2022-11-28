import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';
import { formFieldInitialValues } from '../builder/formFieldInitialValues';

export const formData: DynamicFormSchema = {
    name: "formData",
    mode: "form", // table, object
    editMode: true,
    padding:"0px 15px",
    //defaultSpan:8,
    gutterX:30,
    fields: {
      firstName: {
        ...formFieldInitialValues,
        label: "First Name",
        placeholder: "Type First Name",
      },
      middleName: {
        ...formFieldInitialValues,
        label: "Middle Name",
        placeholder: "Type Middle Name",
      },

      lastName: {
        ...formFieldInitialValues,
        label: "Last Name",
        placeholder: "Type Last Name",
      },

      phoneNumber: {
        ...formFieldInitialValues,
        label: "Phone Number",
        placeholder: "Type Phone Name",
      },

      
      // displayName: {
      //   label: "Display Name",
      //   span: 24,
      //   subscriptions: [{
      //     to:['firstName'],
      //     do: ({ changed, current }: any) => {

      //       const newForm = getForm('formData')
      //       newForm.values[0][current.field.name] = changed.value;
      //       console.log('newForm', newForm);
      //       setForm('formData', newForm);

      //     }

      //   }]
      // },
      // phone: {
      //   label: "Phone Number",
      // },
      
    }
  }