import { Box, CircularProgress } from '@mui/material';

import { selectApplication } from '@/store/application/selectors';
import { useAppSelector } from '@/store/hooks';

const AppLoading = () => {
  const { isLoading } = useAppSelector(selectApplication);

  if (!isLoading) return null;

  return (
    <Box
      component="div"
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        background: '#ffffff99',
        zIndex: 1,
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default AppLoading;
