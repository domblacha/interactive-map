import { Controller, FieldValues } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

import { FormField } from '../types';

type FormInputProps<TFormValues extends FieldValues> = FormField<TFormValues> &
  TextFieldProps;

export default function FormInput<TFormValues extends FieldValues>({
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
