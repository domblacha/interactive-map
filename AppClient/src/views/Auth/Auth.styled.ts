import { styled } from '@mui/system';
import { Avatar } from '@mui/material';

const LoginWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `${theme.spacing(8)} ${theme.spacing(1)}`,

  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(8)} ${theme.spacing(2)}`,
  },
  [theme.breakpoints.up('xl')]: {
    padding: `${theme.spacing(8)} ${theme.spacing(10)}`,
  },
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  background: 'transparent',
  color: 'black',
}));

const LinksWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

export default {
  LoginWrapper,
  AvatarWrapper,
  LinksWrapper,
};
