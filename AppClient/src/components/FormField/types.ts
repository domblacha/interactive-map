import {
  Path,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
  DeepMap,
  FieldError,
} from 'react-hook-form';

export interface FormField<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  control: UseFormReturn<TFormValues>['control'];
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
}
