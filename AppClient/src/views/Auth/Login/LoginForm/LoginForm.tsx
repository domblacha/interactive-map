import { useForm } from 'react-hook-form';
import { Button, Box } from '@mui/material';

import FormInput from '@/components/FormField/FormInput';
import { useAppDispatch } from '@/store/hooks';
import AUTH_ACTIONS from '@/store/auth/actions';

import { VALIDATION_MESSAGES } from '../../Auth.static';

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(async (data) => {
        dispatch(AUTH_ACTIONS.loginUser(data));
      })}
    >
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
        }}
        control={control}
        errors={errors}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Zaloguj się
      </Button>
    </Box>
  );
};

export default LoginForm;
