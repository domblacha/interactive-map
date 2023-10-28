import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddLocationForm from './AddLocationForm';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  coordinates: {
    longitude: number;
    latitude: number;
  };
}

const AddLocationModal = ({
  isOpen,
  onClose,
  coordinates,
}: AddLocationModalProps) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Dodaj miejsce</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Aby dodać znacznik na mapie w zaznacznonym punkcie, uzupełnij
          formularz i&nbsp;zatwierdz.
        </DialogContentText>
        <AddLocationForm coordinates={coordinates} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddLocationModal;
