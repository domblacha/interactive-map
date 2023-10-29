import AvatarMenu from '@/components/AvatarMenu';
import Box from '@mui/material/Box';

import AddLocationModal from './AddLocationModal';
import Map from './Map';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/user/selectors';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes';

const MapPage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleClickLoggIn = () => {
    navigate(PATHS.auth);
  };

  return (
    <>
      <Box sx={{ position: 'absolute', top: 15, right: 30, zIndex: 1 }}>
        {user.isLoggedIn ? (
          <AvatarMenu />
        ) : (
          <Button onClick={handleClickLoggIn} variant="contained">
            Zaloguj się
          </Button>
        )}
      </Box>
      <AddLocationModal />
      <Map />
    </>
  );
};

export default MapPage;
