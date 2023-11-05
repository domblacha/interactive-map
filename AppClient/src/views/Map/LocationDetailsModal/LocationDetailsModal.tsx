import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Comment, Marker } from '@/store/map/types';
import { selectMapState } from '@/store/map/selectors';
import { MAP_ACTION } from '@/store/map/actions';

import AddCommentForm from './AddCommentForm';

type HeaderProps = { location: Marker };
type CommentsProps = { comments: Comment[] };

const Header = ({ location }: HeaderProps) => {
  const hasComments = !!location.comments.length;
  const ratingsAvg = hasComments
    ? location.comments.reduce((acc, comment) => acc + comment.rating, 0) /
      location.comments.length
    : 0;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <DialogTitle sx={{ paddingBottom: '0' }}>{location.name}</DialogTitle>
        <Typography sx={{ padding: '0 24px 5px' }}>
          Autor: {location.authorName}
        </Typography>
      </Box>
      <Rating
        name="half-rating-read"
        value={ratingsAvg}
        precision={0.5}
        readOnly
        sx={{
          margin: '5px 0 0 auto',
          padding: '16px 24px 0 0',
        }}
      />
    </Box>
  );
};

const Comments = ({ comments }: CommentsProps) => {
  const hasComments = !!comments.length;

  if (!hasComments) return null;

  return (
    <Box>
      <Typography sx={{ marginTop: '15px' }}>Wszystkie komentarze:</Typography>
      <List aria-label="mailbox folders">
        {comments.map((comment) => (
          <ListItem divider key={comment.id}>
            <Box>
              <ListItemText
                secondary={comment.authorName || 'Użytkownik nieznany'}
              />
              <ListItemText primary={comment.text} />
            </Box>
            <Rating
              name="half-rating-read"
              value={comment.rating}
              precision={0.5}
              readOnly
              sx={{
                marginLeft: 'auto',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const LocationDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector(selectMapState);

  const isModalOpen = !!selectedLocation;

  const onClose = () => {
    dispatch(MAP_ACTION.clearSelectedLocation());
  };

  return (
    <Dialog open={isModalOpen} onClose={onClose}>
      {selectedLocation && (
        <>
          <Header location={selectedLocation} />
          <DialogContent>
            <DialogContentText>
              {selectedLocation.description}
            </DialogContentText>
            <AddCommentForm markerId={selectedLocation.id} />
            <Comments comments={selectedLocation.comments} />
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationDetailsModal;
