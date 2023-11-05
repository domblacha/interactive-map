import { useForm } from 'react-hook-form';

import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import FormInput from '@/components/FormField/FormInput';
import { useAppDispatch } from '@/store/hooks';
import { MAP_ACTION } from '@/store/map/actions';
import { Coordinates } from '@/store/map/types';

type FormValues = {
  name: string;
  description: string;
};

interface AddLocationFormProps {
  handleClose: () => void;
  coordinates: Coordinates | null;
}

const AddLocationForm = ({
  coordinates,
  handleClose,
}: AddLocationFormProps) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit((data) => {
        if (!coordinates) return;

        dispatch(
          MAP_ACTION.createMarker({
            ...data,
            ...coordinates,
          })
        );
        handleClose();
      })}
    >
      <FormInput
        margin="normal"
        fullWidth
        id="name"
        label="Nazwa"
        name="name"
        autoFocus
        required
        rules={{
          required: 'To pole jest wymagane',
        }}
        control={control}
        errors={errors}
      />
      <FormInput
        multiline
        margin="normal"
        required
        fullWidth
        name="description"
        label="Opis"
        type="description"
        id="description"
        rules={{
          required: 'To pole jest wymagane',
        }}
        control={control}
        errors={errors}
      />
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button type="submit">Dodaj</Button>
      </DialogActions>
    </Box>
  );
};

export default AddLocationForm;
