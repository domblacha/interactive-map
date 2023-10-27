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
  rules?: RegisterOptions;
  control?: UseFormReturn<TFormValues>['control'];
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
}
