import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import DynamicForm, { getValues } from '../lib/index';
import { DynamicFormSchema, Field } from '../lib/models/dynamic-form-schema';
import { update } from 'lodash';

function App() {

  const Example: DynamicFormSchema = {
    name: "Example",
    mode: "form", // table, object
    autoSave: false,
    layout: 'vertical',
    groups: {
      basic: {
        title: "Basic Information",
        subTitle: "Some text",

      },
      other: {
        title: "Other Information",
        subTitle: "Some Other Text",
        //display: false
      },

    },
    fields: {
      link: {
        label: "Link",
        span: 12,
        group: 'basic',
      },
      input: {
        label: "Input",
        required: true,
        span: 12,
        //  group: 'basic',
      },
      number: {
        type: "number",
        label: "Number",
        group: 'other',
        span: 12,
        subscriptions: [
          {
            to: ['radio'],
         //   in: 'rows',
            do: (fieldName: string, data: DynamicFormSchema, form: any) => {

              console.log('--', fieldName, data, form)

              form.setFieldsValue(
                {
                  number: 999,
                }

              );
              form.setFieldsProperty(
                {
                  number: {
                    required: true,
                    label: "NNNNNN"
                  },
                }

              );
            }
          }
        ]
      },
      textarea: {
        type: "textarea",
        label: "Textarea",
        span: 24,
        group: 'other',
      },
      autocomplete: {
        type: "autocomplete",
        label: "Autocomplete",
        placeholder: "Select User",
        group: 'other',
        span: 8,
        api: 'https://dummy.restapiexample.com/api/v1/employees',
        apiMap: ((response: any) => {
          return response.data.map((item: any) => ({
            value: item.employee_name,
            key: item.id,
          }))
        }),
      },
      autocompleteMulti: {
        type: "autocompleteMulti",
        label: "Autocomplete Multi",
        span: 8,
        group: 'other',
        api: "https://randomuser.me/api/?results=5",
        apiMap: ((response: any) => {
          return response.results.map((item: any) => ({
            label: `${item.name.first} ${item.name.last}`,
            value: item.login.username,
          }))
        })
      },
      select: {
        type: "select",
        label: "Select",
        span: 8,

        api: 'https://dummy.restapiexample.com/api/v1/employees',
        apiMap: ((response: any) => {
          return response.data.map((item: any) => ({
            label: item.employee_name,
            value: item.id,
          }))
        }),
      },
      checkbox: {
        type: "checkbox",
        label: "Checkbox",
        options: [
          {
            label: 'Option One',
            value: '1',
          },
          {
            label: 'Option Two',
            value: '2',
          },
        ]
      },
      radio: {
        type: "radio",
        label: "Radio",
        options: [
          {
            label: 'Option One',
            value: '1',
          },
          {
            label: 'Option Two',
            value: '2',
          },
        ]
      },

    },
    values: [

      {
        link: {
          value: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        },
        subTitle: {
          value: "Europe Street beat",
        },
        input: {
          value: "input value1",
        },
        textarea: {
          value: "textarea value 1",
        },
        number: {
          value: 111,
        },
        select: {
          value: 5,
        },
        autocomplete: {
          value: { key: 3, label: 'Ashton Cox' },
        },
        autocompleteMulti: {
          value: [
            { key: 3, label: 'Ashton Cox' },
            { key: 5, label: 'sssss' },
          ],
        },
        checkbox: {
          value: "1",
        },
        radio: {
          value: "2",
        },
      },
      {
        link: {
          value: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        },
        subTitle: {
          value: "Europe Street beat",
        },
        input: {
          value: "input value2",
        },
        textarea: {
          value: "textarea value 2",
        },
        number: {
          value: 4444,
        },
        select: {
          value: 5,
        },
        autocomplete: {
          value: { key: 3, label: 'Jhon Smith' },
        },
        autocompleteMulti: {
          value: [
            { key: 3, label: 'Ashton Cox' },
            { key: 5, label: 'sssss' },
          ],
        },
        checkbox: {
          value: "1",
        },
        radio: {
          value: "2",
        },
      },

    ]
  }

  const contentTypeData: DynamicFormSchema = {
    name: "ContentForm",
    mode: "layout",
    // refs: {
    //   newForm: formData
    // },
    fields: {
      menuTitle: {
        type: "content",
        span: 16
      },
      card: {
        type: "card",
        ref: {
          formName: 'newForm',
        },

        // title: "$input",
        // title: "$input",
        innerTitle: "$input",
        description: "$textarea", // "<a href="$input"> hello $textarea >$textarea</a>"
        // extra: "$number",
        // cover: '$link',
        hoverable: true,
        // span: 8,
        // margin: "20px",     
      },


    },
    values: [{

      menuTitle: {
        value: 'Please select',
      },


    }]
  }

  const selectDataForm: DynamicFormSchema = {
    name: "selectDataForm",
    mode: "table",
    autoSave: false,
    fields: {
      selectItemLabel: {
        label: "Label",
        required: true,
        span: 12,
        //  group: 'basic',
      },
      selectItemId: {
        label: "Id",
        required: true,
        span: 12,
        //  group: 'basic',
      },
    },
    values: [

      {
        selectItemId: {
          value: "1",
        },
        selectItemLabel: {
          value: 'Basic',
        },
      },
      {
        selectItemId: {
          value: "2",
        },
        selectItemLabel: {
          value: 'Other',
        },
      },

    ]
  }
  const menuData: DynamicFormSchema = {
    name: "menuData",
    mode: "table", // table, object
    autoSave: false,
    layout: 'vertical',
    // refs: {
    //   selectDataForm: selectDataForm
    // },
    fields: {
      // link: {
      //   label: "Link",
      //   span: 12,
      // },
      menuID: {
        label: "ID",
        required: true,
        span: 8,
        readOnly: true,
        bordered: false
        //  group: 'basic',
      },
      menuItem: {
        label: "Input",
        required: true,
        span: 8,
        //  group: 'basic',
      },
      group: {
        type: "select",
        label: "Select",
        span: 8,
        ref: {
          formName: 'selectDataForm',
        },
        refOptions: {
          label: '$selectItemLabel',
          value: '$selectItemId',
        },
        subscriptions: [
          {
            to:['selectItemLabel'],
            do: (fieldName: string, _formData:DynamicFormSchema, form: any) => {}
          }
        ]

        // options: [
        //   {
        //     label: 'Option One',
        //     value: '1',
        //   },
        //   {
        //     label: 'Option Two',
        //     value: '2',
        //   },
        // ]

      },
    },
    values: [

      {
        link: {
          value: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        },
        menuID: {
          value: "1",
        },
        menuItem: {
          value: "Item 1",
        },
        group: {
          value: "1",
          label: "One"
        }

      },
      {
        link: {
          value: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        },
        menuID: {
          value: "2",
        },
        menuItem: {
          value: "Item 2",
        },
        group: {
          value: "1",
          label: "One"
        }
      },
      {
        link: {
          value: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        },
        menuID: {
          value: "3",
        },
        menuItem: {
          value: "Item 3",
        },
        group: {
          value: "2",
          label: "Two"
        }
      },
    ]
  }
  const menuContent: DynamicFormSchema = {
    name: "menuContent",
    mode: "layout",
    // refs: { menuData },
    fields: {
      menu: {
        type: "menu",
        ref: {
          formName: 'menuData',
        },
        refMenuOptions: {
          label: "$menuItem",
          key: "$menuID",
          group: '$group',
          refGroupKey: '$selectItemId',
          refGroupLabel: '$selectItemLabel',
        },
        subscriptions: [
          {
            to:['menuItem'],
            do: (fieldName: string, _formData:DynamicFormSchema, form: any) => {}
          }
        ]
        // menuOptions: [
        //   {
        //     label: 'Label One',
        //     key: "111",
        //   },
        //   {
        //     label: 'Label Two',
        //     key: "222",
        //   },
        //   {
        //     label: 'Label Thre',
        //     key: "333",
        //   },
        // ],

      },
      place: {
        type: "content",
        span: 12,
        subscriptions: [
          {
            to:['group'],
            do: (fieldName: string, _formData:DynamicFormSchema, form: any) => {
              console.log("--props:", fieldName, _formData, form)
              form.setFieldsValue(
                {
                  place: 999,
                }

              );
            }
          }
        ]
      },
    },
    // values: [{
    //   place: {
    //     value: 'eeeee'
    //   }
    // }]
  }

  const footerTypeData: DynamicFormSchema = {
    name: "FooterForm",
    mode: "layout",
    fields: {
      footerContent: {
        type: "content"
      },
    },
    values: [{
      footerContent: {
        value: "Fooooooter"
      }
    }]
  }

  const page: DynamicFormSchema = {
    name: "MainForm",
    mode: "layout",
    fields: {
      header: {
        type: "header"
      },
      selectData: {
        type: "content",
        span: 12
      },
      content: {
        type: "content",
        span: 12
      },
      content2: {
        type: "content",
        span: 12
      },

      footer: {
        type: "footer",
      },
    },
    values: [{
      header: {
        value: "Hellooooooo"
      },

      selectData: {
        value: selectDataForm,
      },
      content: {
        value: menuData,
      },
      content2: {
        value: menuContent,
      },

      footer: {
        value: footerTypeData
      },

    }]
  }

  const handleClick = () => {
    Example.fields.input.label = "hello";
    // const vals = getValues();
    // console.log(vals)

  }
  return (
    <div className="App">

      <DynamicForm data={Example} />
      

      {/* <DynamicForm data={page} /> */}
<button onClick={handleClick}>Save</button> 
    </div>
  );
}

export default App;
