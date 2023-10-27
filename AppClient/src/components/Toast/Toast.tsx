import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectToast } from '@/store/toast/selectors';
import { toastHide } from '@/store/toast/actions';

import { GENERIC_MESSAGES } from './Toastr.static';

export default function Toast() {
  const toast = useAppSelector(selectToast);
  const dispatch = useAppDispatch();

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    dispatch(toastHide());
  };

  if (!toast.isOpen) return null;

  return (
    <Snackbar
      open={toast.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.variant}
        sx={{ width: '100%' }}
      >
        {!toast.message && toast.variant === 'error'
          ? GENERIC_MESSAGES.error
          : toast.message}
      </Alert>
    </Snackbar>
  );
}
