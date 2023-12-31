import { useForm } from 'react-hook-form';
import { Button, Box } from '@mui/material';

import FormInput from '@/components/FormField/FormInput';

import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../../Auth.static';
import { useAppDispatch } from '@/store/hooks';
import AUTH_ACTIONS from '@/store/auth/actions';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const comparePassword = (confirmationPassword: string) =>
    getValues('password') === confirmationPassword ||
    VALIDATION_MESSAGES.passwordsNotMatch;

  const onSubmit = (data: FormValues) => {
    dispatch(AUTH_ACTIONS.registerUser(data));
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        margin="normal"
        fullWidth
        id="firstName"
        label="Imię"
        name="firstName"
        autoComplete="firstName"
        autoFocus
        required
        rules={{
          required: VALIDATION_MESSAGES.requiredField,
        }}
        control={control}
        errors={errors}
      />
      <FormInput
        margin="normal"
        fullWidth
        id="lastName"
        label="Nazwisko"
        name="lastName"
        autoComplete="lastName"
        autoFocus
        required
        rules={{
          required: VALIDATION_MESSAGES.requiredField,
        }}
        control={control}
        errors={errors}
      />
      <FormInput
        margin="normal"
        fullWidth
        id="email"
        label="Adres Email"
        name="email"
        autoComplete="email"
        autoFocus
        required
        rules={{
          required: VALIDATION_MESSAGES.requiredField,
          pattern: {
            value: VALIDATION_RULES.email,
            message: VALIDATION_MESSAGES.invalidEmail,
          },
        }}
        control={control}
        errors={errors}
      />
      <FormInput
        margin="normal"
        required
        fullWidth
        name="password"
        label="Hasło"
        type="password"
        id="password"
        autoComplete="current-password"
        rules={{
          required: VALIDATION_MESSAGES.requiredField,
          pattern: {
            value: VALIDATION_RULES.password,
            message: VALIDATION_MESSAGES.nonCompilantPass,
          },
        }}
        control={control}
        errors={errors}
      />
      <FormInput
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Potwierdź hasło"
        type="password"
        id="confirmPassword"
        autoComplete="confirm-password"
        rules={{
          required: VALIDATION_MESSAGES.requiredField,
          validate: comparePassword,
        }}
        control={control}
        errors={errors}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Zarejestruj się
      </Button>
    </Box>
  );
};

export default RegisterForm;
