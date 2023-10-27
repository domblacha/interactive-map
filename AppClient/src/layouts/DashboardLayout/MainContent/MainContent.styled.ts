import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
}));

const Container = styled('div')(({ theme }) => {
  const { spacing } = theme;
  return {
    marginTop: spacing(4),
    marginBottom: spacing(4),
    marginLeft: spacing(2),
    marginRight: spacing(2),
  };
});

export default {
  ContentBox,
  Container,
};
