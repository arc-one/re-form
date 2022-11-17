import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { setForm, setValues, getForm, reRender } from '../lib/index';


export const formData: DynamicFormSchema = {
    name: "formData",
    mode: "form", // table, object
    editMode: true,
    //defaultSpan:8,
    fields: {
      firstName: {
        label: "First Name",
        // options: [
        //   {
        //     label:'1',
        //     value:'ssssss'
        //   }
        // ]
      },
      lastName: {
        label: "Last Name",
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