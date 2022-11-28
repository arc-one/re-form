import { DynamicFormSchema, Field, Subscription } from '../models/dynamic-form-schema';
import { FormInstance } from 'antd';
import { getForm, setForm } from "../index";
import _ from "lodash";

let reqs: any = {};
export let isInitialLoading = true;
export let allForms: any = {};
export let allFieldsPath: any = {};
export let allSubscriptionsPath: any = {};
export let masterdata: any = {};

let selectedNode: any = {};
let dragItem: any;
let dragOverItem: any;
let singleClickedID: string | undefined;
let doubleClickedID: string | undefined;

export const setSingleClickedID = (_clickedID: any) => {
  singleClickedID = _clickedID;
}
export const getSingleClickedID = () => {
  return singleClickedID;
}

export const setDoubleClickedID = (_clickedID: any) => {
  doubleClickedID = _clickedID;
}
export const getDoubleClickedID = () => {
  return doubleClickedID;
}


export const setMasterdata = (_masterdata: any) => {
  masterdata = { ...masterdata, ..._masterdata };
}
export const getMasterdata = (name: string) => {
  return masterdata[name];
}


export const setSelectedNode = (params: any) => {
  selectedNode = { ...selectedNode, ...params };
  return selectedNode;
}
export const getSelectedNode = () => {
  return selectedNode;
}
export const selectNode = (selectedNode: any) => {
  if (selectedNode?.form) {
    document.getElementById(selectedNode?.form + '-node')?.classList?.add('node-selected');

    const elements: any = document.getElementById(selectedNode?.form + '-node')?.childNodes;
    elements.forEach((elem: any) => {
      elem.classList?.add('selectable-element')
    })
  }
  if (selectedNode?.field) {
    document.getElementById(selectedNode?.form + '-' + selectedNode?.field + '-element')?.classList?.add('element-selected');
  }
}
export const unSelectNode = (selectedNode: any) => {
  if (selectedNode?.form) {
    document.getElementById(selectedNode?.form + '-node')?.classList?.remove('node-selected');
    const elements: any = document.getElementById(selectedNode?.form + '-node')?.childNodes;
    elements.forEach((elem: any) => {
      elem.classList?.remove('selectable-element');
    })
  }
  if (selectedNode?.form && selectedNode?.field) {
    document.getElementById(selectedNode?.form + '-' + selectedNode?.field + '-element')?.classList?.remove('element-selected');
  }
}


let _in: boolean = false;
export const handleOnclickForEditMode = (onClickProps: any, props: any) => {

  let selectedData = {...selectedNode};
  if (selectedNode?.form) {
    if (onClickProps.domEvent.detail == 1 && !_in) {

      const directClick = onClickProps.domEvent.target.closest('.selectable-element.edit-mode');
      if (!directClick) return;
      const childElement = directClick?.id?.split('-');
      const clickedFormName = childElement[0];
      const clickedFieldName = childElement[1];
      const clickedForm = getForm(clickedFormName);

      if (clickedForm.fields[clickedFieldName]) {
        const newSelectedNode = {
          form: clickedForm?.name,
          field: clickedFieldName
        }
        selectedData = {...newSelectedNode};
        unSelectNode(selectedNode);
        selectedNode = setSelectedNode({...newSelectedNode})
        selectNode(selectedNode);
      }
    }
    if (onClickProps.domEvent.detail > 1 && !_in) {
      const directClick = onClickProps.domEvent.target.closest('.element-selected');
      if (directClick) {

        const childElement = directClick?.id?.split('-');
        const clickedFormName = childElement[0];
        const clickedFieldName = childElement[1];
        const clickedForm = getForm(clickedFormName);

        let newSelectedForm: DynamicFormSchema = clickedForm?.values[0][clickedFieldName]?.value || clickedForm?.values[0][clickedFieldName];

        if (newSelectedForm) {
          if (newSelectedForm?.mode == 'form' || newSelectedForm?.mode == 'layout' || newSelectedForm?.mode == 'table') {

            const newSelectedNode = {
              parents: _.uniq([...selectedNode.parents, clickedForm.name]),
              form: newSelectedForm.name,
              field: undefined
            }
            selectedData = {...newSelectedNode};
            unSelectNode(selectedNode);
            selectedNode = setSelectedNode({...newSelectedNode});
            selectNode(selectedNode);
          }
        }
      } else {

        if (selectedNode.field === onClickProps.field.name) return;
        const parentFormName = selectedNode.parents[selectedNode.parents?.length - 1];

        if (!parentFormName) return;

        const newSelection = {
          parents: selectedNode.parents.filter((parent: string) => parent !== parentFormName),
          form: parentFormName,
          field: undefined
        }
        selectedData = {...newSelection};
        unSelectNode(selectedNode);
        selectedNode = setSelectedNode(newSelection);
        selectNode(selectedNode);
      }
    }
  }
  _in = true;
  setTimeout(() => {
    _in = false;
    setSingleClickedID(undefined);
    setDoubleClickedID(undefined);
  });

  return selectedData;
}

const getDragElement = (e: any) => {
  const selectedNode = getSelectedNode();
  const selectedForm = getForm(selectedNode.form);
  const path = `#${selectedNode.form}-node > .element`
  const closest = e.target?.closest(path);
  const elementData = closest?.id?.split('-');

  if (!elementData) return;

  const index = Object.keys(selectedForm.fields).findIndex((field: string, key: number) => field === elementData[1]);
  elementData.push(index)
  return elementData;
}

export const dragStart = (e: any, position: any) => {
  if (!selectedNode?.form) return;
  const elementData = getDragElement(e);
  if (!elementData || elementData[0] !== selectedNode?.form) return;
  if (elementData?.length === 4 && elementData[2] === 'element') {
    dragItem = elementData;
  } else {
    dragItem = undefined;
  }
};

export const dragEnter = (e: any, position: any) => {
  if (!selectedNode?.form) return;
  dragOverItem = undefined;
  const elementData = getDragElement(e);

  if (!elementData || elementData[0] !== selectedNode?.form) return;
  if (elementData?.length === 4 && elementData[2] === 'element') {
    dragOverItem = elementData;
  }
};

export const drop = (e: any, props: any) => {
  if (!selectedNode?.form || !dragOverItem || !dragItem) return;
  const elementData = getDragElement(e);
  if (!elementData || elementData[0] !== selectedNode?.form) return;
  if (dragItem?.length === 4 && dragItem[2] === 'element') {
    const dragForm = getForm(dragItem[0]);
    const dragField = dragForm.fields[dragItem[1]];
    let reorderedFields: any = {};
    for (let fieldName in dragForm.fields) {
      if (fieldName !== dragOverItem[1] && fieldName !== dragItem[1]) {
        reorderedFields[fieldName] = dragForm.fields[fieldName];
      } else if (fieldName === dragOverItem[1]) {
        if (dragItem[3] > dragOverItem[3]) {
          reorderedFields[dragItem[1]] = dragForm.fields[dragItem[1]];
          reorderedFields[fieldName] = dragForm.fields[fieldName];
        } else {
          reorderedFields[fieldName] = dragForm.fields[fieldName];
          reorderedFields[dragItem[1]] = dragForm.fields[dragItem[1]];
        }
      }
    }
    dragForm.fields = reorderedFields;
    setForm(dragForm.name, dragForm);
    unSelectNode({...selectedNode});
    setTimeout(() => selectNode({...selectedNode}));
    if (props?.onDrop) {
      props.onDrop({ data: dragForm, dragItem, dragOverItem });
    }
  }
};

export const setInitialLoadingStatus = (status: boolean) => {
  isInitialLoading = status;
}
export const addGlobalStateForm = (form: DynamicFormSchema) => {
  const formName = form.name
  if (!allForms[form.name]) allForms[form.name] = {};
  allForms[form.name] = { formData: form };
}
export const getGlobalState = () => {
  return allForms;
}
export const fetchList = async (text: string | null, props: any) => {
  //console.log('----', props)  
  if (!props.extra.apiMap || !props.extra.api) return;
  const url = buildURL({ ...props.extra, ...props.field }, props.form, text);

  if (reqs[url]) {
    return reqs[url];
  } else {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => props.extra.apiMap(response))
      .then((response) => {
        reqs[url] = response;
        console.log(reqs)
        return response;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


}
export const buildURL = (field: Field, form: FormInstance, text: string | null = null) => {

  if (!field.api) return '';

  let queryString = '';
  let paramsString = '';
  let autocompleteString = '';
  let j = 0;

  if (field.apiQueryParams) {
    for (let key in field.apiQueryParams) {
      if (field.apiSearchParam === key) continue;
      if (j == 0) queryString += '?'; else queryString += '&';
      let val = field.apiQueryParams[key];
      if (typeof val != 'string' && val) val = val.toString();
      if (val && val?.substring(0, 1) === '$') {
        const fieldName = val?.substring(1);
        const fieldValue = form.getFieldsValue([fieldName])
        const v = fieldValue[fieldName];
        queryString += `${key}=${v}`;
      } else {
        queryString += `${key}=${val}`;
      }
      j++;
    }
  }

  if (field.apiParams && field.apiParams.length > 0) {
    for (var i = 0; i < field.apiParams.length; ++i) {
      let val = field.apiParams[i] || null;
      if (typeof val != 'string' && val) val = val + '';
      if (val && val?.substring(0, 1) === '$') {
        const fieldName = val?.substring(1);
        const fieldValue = form.getFieldsValue([fieldName])
        const v = fieldValue[fieldName];
        if (v) {
          paramsString += "/" + v;
        } else {
          break;
        }
      } else {
        paramsString += "/" + val;
      }
    }
  }

  if (field.apiSearchParam) {
    autocompleteString = `${field.apiSearchParam}=${text}`;
    if (queryString === '')
      autocompleteString = `?${autocompleteString}`;
    else
      autocompleteString = `&${autocompleteString}`;
  }


  return field.api + paramsString + queryString + autocompleteString;
}
export const getRefGroups = (field: Field, refForm: DynamicFormSchema) => {

  const groupName = field.refMenuOptions?.group?.substring(1);

  //console.log('refMenuOptions', groupName, field.refMenuOptions)

  let groupLabel: string;
  let groupKey: string;
  let groups: any;
  if (groupName) {

    const refRefName = refForm.fields[groupName]?.ref?.formName;

    //Attempt to get group values from parent reference form
    if (refRefName) {

      const refRefData: DynamicFormSchema = masterdata[refRefName];

      refRefData.values?.forEach((refFormValues: any, rowIndex: number) => {
        const key: any = getDollarValue(field.refMenuOptions?.refGroupKey, refFormValues);
        if (key) {
          if (!groups) groups = {};
          groups[key] = {
            key: 'group-key-' + key,
            label: getDollarValue(field.refMenuOptions?.refGroupLabel, refFormValues),
            icon: getDollarValue(field.refMenuOptions?.refGroupIcon, refFormValues),
            disabled: getDollarValue(field.refMenuOptions?.refGroupDisabled, refFormValues),
          }
        }

      });

      // console.log('groups', groups)
    }

  }
  return groups;

}
export const getDollarValue = (str: any, formValues: any, fullValue: boolean = false): any => {
  let res: any = str;
  if (!str) return res;

  const found = str.replace(/\\./g, '').match(/\$\w+/g);

  found?.forEach((item: string) => {
    const fieldName = item?.substring(1);
    const value = formValues[fieldName];
    // console.log('====', value, fullValue)
    if (fullValue) {
      res = value?.value || value;
    } else {
      res = str.replace(item, value?.value || value);
    }

  });

  return res;
}
export const getFormDataByFormName = (formName: string) => {
  //  console.log('allForms', allForms);
  //const formName:string =  form.__INTERNAL__.name || '';
  if (!allForms[formName]) return {
    formData: undefined,
    setFormData: undefined,
    formActions: undefined
  }

  return allForms[formName];
}
export const onChange = (_: any, _allFields: any, index: number, form?: any, from?: string) => {
  if (_?.target || !form) return;
  const formName = form?.__INTERNAL__.name || '';
  const changedFormData = allForms[formName]?.formData;
  if (!index && index !== 0 || !changedFormData) return;
  const changedField = Object.keys(_);
  if (changedField?.length > 0) {
    const changedFieldName = changedField[0];
    changedFormData.values[index][changedFieldName] = _[changedFieldName];
    //todo check this again
    if (from != 'layout' && !isInitialLoading) {
      handleSubscriptions(changedFieldName, changedFormData, index);
    }
  }
}


// const extendFormActions = (form: FormInstance, formData: DynamicFormSchema, index: number) => {
//   let internalForm: any = {};
//   if (form) {
//     internalForm = { ...form };
//     internalForm.setFieldsValue = (values: any) => {
//       form.setFieldsValue(values);
//       for (let key in values) {
//         const val = values[key];
//         if (formData.fields[key]) {
//           if (!formData.values) formData.values = [];
//           if (!formData.values[index]) formData.values[index] = {};
//           if (!formData.values[index][key]?.value) formData.values[index][key] = { value: undefined }
//           formData.values[index][key].value = val;
//           onChange({ [key]: val }, {}, index, internalForm);
//         } else {
//           console.error(`Error setFieldsValue(). Property ${key} doesn't exist.`)
//         }
//       }
//     }
//   } else {
//     internalForm.__INTERNAL__ = { name: formData.name };
//     internalForm.setFieldsValue = (values: any) => {
//       for (let key in values) {
//         const val = values[key];
//         if (formData.fields[key]) {
//           if (!formData.values) formData.values = [];
//           if (!formData.values[index]) formData.values[index] = {};
//           if (!formData.values[index][key]?.value) formData.values[index][key] = { value: undefined }
//           formData.values[index][key].value = val;
//           onChange({ [key]: val }, {}, index, internalForm);
//         } else {
//           console.error(`Error setFieldsValue(). Property ${key} doesn't exist.`)
//         }
//       }
//     }
//   }

//   internalForm.setFieldsProperty = (fieldsProperty: any) => {
//     for (let key in fieldsProperty) {
//       const properties = fieldsProperty[key];
//       if (formData.fields[key]) {
//         formData.fields[key] = { ...formData.fields[key], ...properties };
//       } else {
//         console.error(`Error setFieldsProperty(). Property ${key} doesn't exist.`)
//       }
//     }
//   }

//   return internalForm;
// }
export function defineGlobalSubscriptionPath(formName: string, field: Field) {
  const fieldName = field.name;
  if (field.subscriptions?.length && fieldName) {
    field.subscriptions.forEach((subscription: Subscription) => {
      if (subscription?.to?.length) {
        subscription.to.forEach((to: string) => {
          if (!allSubscriptionsPath[to]) allSubscriptionsPath[to] = {}
          if (!allSubscriptionsPath[to][formName]) allSubscriptionsPath[to][formName] = {};
          if (!allSubscriptionsPath[to][formName][fieldName]) allSubscriptionsPath[to][formName][fieldName] = true;
        });
      }
    })
  }
}
export function defineGlobalFieldPath(formName: string, fieldName: string) {
  allFieldsPath[fieldName] = formName;
}
export const handleSubscriptions = (changedFieldName: string | undefined, changedFormData: DynamicFormSchema, index: number) => {
  if (!changedFieldName) return;
  if (allSubscriptionsPath[changedFieldName]) {
    for (let subscrFormName in allSubscriptionsPath[changedFieldName]) {
      for (let subscrFieldName in allSubscriptionsPath[changedFieldName][subscrFormName]) {
        if (allForms[subscrFormName]) {
          const subscriptions = allForms[subscrFormName].formData.fields[subscrFieldName].subscriptions;
          const { formData, setFormData, formActions } = getFormDataByFormName(subscrFormName || '');
          subscriptions.forEach((subscription: Subscription) => {
            subscription = { ...new Subscription, ...subscription }
            if (typeof subscription?.do === 'function' && subscription.to?.includes(changedFieldName)) {
              if (subscription.in === 'form') {


                let changedValue;
                if (changedFormData.values[index] && changedFormData.values[index][changedFieldName]) {
                  changedValue = changedFormData.values[index][changedFieldName]
                }
                let changedField;
                if (changedFormData.fields && changedFormData.fields[changedFieldName]) {
                  changedField = changedFormData.fields[changedFieldName]
                }

                let currentValue;
                if (formData.values[0] && formData.values[0][subscrFieldName]) {
                  currentValue = formData.values[0][subscrFieldName];
                }

                let currentField;
                if (formData.fields && formData.fields[subscrFieldName]) {
                  currentField = formData.fields[subscrFieldName];
                }


                subscription?.do({
                  changed: {
                    value: changedValue,
                    field: changedField,
                    data: changedFormData,
                    //action: newFormAction                                
                  },
                  current: {
                    value: currentValue,
                    field: currentField,
                    data: formData,
                    //action: newFormAction    
                  }
                });
              } else if (subscription.in === 'rows') {
                formActions.forEach((formAction: any, actionIndex: number) => {
                  // formAction = extendFormActions(formAction, formData, actionIndex)
                  subscription?.do({
                    changed: {
                      value: changedFormData.values[index][changedFieldName],
                      field: changedFormData.fields[changedFieldName],
                      data: changedFormData,
                      //action: newFormAction                                
                    },
                    current: {
                      value: formData.values[actionIndex][subscrFieldName],
                      field: formData.fields[subscrFieldName],
                      data: formData,
                      //action: newFormAction    
                    }
                  });
                });
              }
              // setFormData({ ...formData });
            }
          })
        }

      }
    }
  }
}
export const handleAllSubscriptions = () => {
  //todo setup index correctly
  const index = 0;
  for (let changedFieldName in allSubscriptionsPath) {
    const changedFormDataName = allFieldsPath[changedFieldName];
    const changedFormData = allForms[changedFormDataName].formData;
    handleSubscriptions(changedFieldName, changedFormData, index);
  }
}
export const calcWidth = (span: any) => {
  if (!span) return 250;
  return span * 100 / 24 + '%';
}