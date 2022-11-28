import React from 'react';
import { AutoComplete, Select } from 'antd';
import debounce from 'lodash/debounce';
import { fetchList } from './services/dynamic-form-service';

const DebounceSelect = (props: any) => {

  // let value: any;
  // let setValue: any;
  // [value, setValue] = React.useState(props.value);  
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const fetchRef = React.useRef(0);

  const debounceFetcher = React.useMemo(() => {

    const loadOptions = (text: any) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchList(text, props).then((newOptions: any) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, 400);
  }, [fetchList, 400]);

  const autocompleteProps = {
    labelInValue: true,
    filterOption: false,
    onSearch: debounceFetcher,
    loading: fetching ? true : false,
    allowClear: true,
    ...props.field,
  }
  if (options) {
    autocompleteProps.options = options;
  }

  if (props.value && autocompleteProps.mode !== 'multiple') autocompleteProps.defaultValue = props.value.label;
  if (props.value?.length && autocompleteProps.mode == 'multiple') autocompleteProps.defaultValue = props.value;

  let element = <AutoComplete onSelect={(value: any) => props.onChange(props, value)} {...autocompleteProps} />
  if (autocompleteProps.mode === 'multiple') {

    element = <Select mode="multiple"  {...autocompleteProps} onChange={(value: any) => props.onChange(props, value)} />
  }
  return element;
} // Usage of DebounceSelect

const _Autocomplete = (props: any) => {
  const debounceProps = {
    ...props,
    onChange: (prps: any, value: any) => {
      props.onChange(value)
    },
    style: {
      width: '100%',
    }
  }

  return (
    <DebounceSelect {...debounceProps} />
  );

}


export default _Autocomplete;


