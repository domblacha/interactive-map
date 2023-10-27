import { CheckboxProps, Checkbox } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FormField } from '../types';

type FormCheckboxProps<TFormValues extends Record<string, unknown>> =
  FormField<TFormValues> & CheckboxProps;

export default function FormCheckbox<
  TFormValues extends Record<string, unknown>,
>({ name, control, rules, ...rest }: FormCheckboxProps<TFormValues>) {
  //   const errorMessage = errors && errors[name]?.message;
  //   const hasError = !!(errors && errorMessage);

  // todo zrobić obsługę errora dla checkboxa
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <Checkbox {...rest} {...field} />}
    />
  );
}
