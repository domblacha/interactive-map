import { TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FormField } from '../types';

type FormInputProps<TFormValues extends Record<string, unknown>> =
  FormField<TFormValues> & TextFieldProps;

export default function FormInput<TFormValues extends Record<string, unknown>>({
  name,
  control,
  rules,
  errors,
  ...rest
}: FormInputProps<TFormValues>) {
  const errorMessage = errors && errors[name]?.message;
  const hasError = !!(errors && errorMessage);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          error={hasError}
          helperText={errorMessage}
          {...rest}
          {...field}
        />
      )}
    />
  );
}
