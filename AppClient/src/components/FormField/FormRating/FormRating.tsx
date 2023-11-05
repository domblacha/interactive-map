import { Controller, FieldValues } from 'react-hook-form';
import { Rating, RatingProps } from '@mui/material';

import { FormField } from '../types';

type FormRatingProps<TFormValues extends FieldValues> = FormField<TFormValues> &
  RatingProps;

export default function FormRating<TFormValues extends FieldValues>({
  name,
  control,
  rules,
  ...rest
}: FormRatingProps<TFormValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Rating
          {...rest}
          {...field}
          onChange={(_, value) => field.onChange(value)}
        />
      )}
    />
  );
}
