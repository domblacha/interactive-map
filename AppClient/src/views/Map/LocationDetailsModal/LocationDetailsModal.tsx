import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MAP_ACTION } from '@/store/map/actions';
import { selectMapState } from '@/store/map/selectors';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const LocationDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector(selectMapState);

  const isModalOpen = !!selectedLocation;

  const onClose = () => {
    dispatch(MAP_ACTION.clearSelectedLocation());
  };

  return (
    <Dialog open={isModalOpen} onClose={onClose}>
      <DialogTitle>{selectedLocation?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{selectedLocation?.description}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDetailsModal;
