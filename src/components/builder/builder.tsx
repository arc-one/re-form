
import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';
import { builderLayout } from './builderLayout';
import { menuLayout } from './menuLayout';

export const builder: DynamicFormSchema = {
    name: "builder",
    mode: "layout", // table, object
    fields: {
      menuLayout: {
        type: "layout",
        span: 10,
        backgroundColor: "fcfcfc"
      },
      builderLayout: {
        type: 'layout',
        span: 14,
        backgroundColor: "f5f5f5"
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