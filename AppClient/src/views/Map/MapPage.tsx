import { useNavigate } from 'react-router-dom';
import AvatarMenu from '@/components/AvatarMenu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/user/selectors';
import { PATHS } from '@/routes';
import { selectApplication } from '@/store/application/selectors';

import Map from './Map';
import AddLocationModal from './AddLocationModal';
import LocationDetailsModal from './LocationDetailsModal';

const AuthButtons = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector(selectUser);
  const { isLoading } = useAppSelector(selectApplication);

  if (isLoading) return null;

  const handleClickLoggIn = () => {
    navigate(PATHS.auth);
  };

  return (
    <Box sx={{ position: 'absolute', top: 15, right: 30, zIndex: 1 }}>
      {isLoggedIn ? (
        <AvatarMenu />
      ) : (
        <Button onClick={handleClickLoggIn} variant="contained">
          Zaloguj się
        </Button>
      )}
    </Box>
  );
};

const MapPage = () => {
  return (
    <>
      <AuthButtons />
      <AddLocationModal />
      <LocationDetailsModal />
      <Map />
    </>
  );
};

export default MapPage;
