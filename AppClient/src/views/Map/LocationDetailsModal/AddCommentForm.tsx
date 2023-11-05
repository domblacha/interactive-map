import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormField/FormInput';
import FormRating from '@/components/FormField/FormRating';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MAP_ACTION } from '@/store/map/actions';
import { selectApplication } from '@/store/application/selectors';
import { selectUser } from '@/store/user/selectors';

type FormValues = {
  text: string;
  rating: number;
};

type AddCommentFormProps = {
  markerId: string;
};

const AddCommentForm = ({ markerId }: AddCommentFormProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectApplication);
  const { isLoggedIn } = useAppSelector(selectUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      text: '',
      rating: 0,
    },
  });

  if (!isLoggedIn) {
    return (
      <Alert sx={{ marginTop: '15px' }} severity="warning">
        Zaloguj sie aby móc dodawać komantarze
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      sx={{ marginTop: 3 }}
      onSubmit={handleSubmit((data) => {
        dispatch(MAP_ACTION.createComment({ ...data, markerId }));
      })}
    >
      <FormInput
        id="text"
        label="Dodaj komentarz"
        name="text"
        fullWidth
        autoFocus
        required
        multiline
        rules={{
          required: 'To pole jest wymagane',
        }}
        control={control}
        errors={errors}
      />
      <Box sx={{ marginTop: 1 }}>
        <FormRating id="rating" name="rating" control={control} />
      </Box>
      <Button disabled={isLoading} type="submit">
        Dodaj
      </Button>
    </Box>
  );
};

export default AddCommentForm;
