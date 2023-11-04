import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMapState } from '@/store/map/selectors';
import { MAP_ACTION } from '@/store/map/actions';

import AddLocationForm from './AddLocationForm';

const AddLocationModal = () => {
  const dispatch = useAppDispatch();
  const { selectedCoordinates } = useAppSelector(selectMapState);

  const isModalOpen = !!selectedCoordinates;

  const handleClose = () => {
    dispatch(MAP_ACTION.clearSelectedCoordinates());
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle>Dodaj miejsce</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Aby dodać znacznik na mapie w zaznacznonym punkcie, uzupełnij
          formularz i&nbsp;zatwierdz.
        </DialogContentText>
        <AddLocationForm
          coordinates={selectedCoordinates}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddLocationModal;
