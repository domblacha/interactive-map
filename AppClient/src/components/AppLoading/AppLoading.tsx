import { selectApplication } from '@/store/application/selectors';
import { useAppSelector } from '@/store/hooks';
import { Box, CircularProgress } from '@mui/material';

const AppLoading = () => {
  const { isLoading } = useAppSelector(selectApplication);
  if (isLoading) {
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
  }

  return null;
};

export default AppLoading;
