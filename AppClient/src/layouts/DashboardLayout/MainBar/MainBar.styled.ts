import { styled } from '@mui/material/styles';
import AppBar, { AppBarProps } from '@mui/material/AppBar';

interface NavBarProps extends AppBarProps {
  isOpen: boolean;
}

const drawerWidth = 240;

const MainBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<NavBarProps>(({ theme, isOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isOpen && {
    marginLeft: 0,
    width: 0,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }),
}));

export default {
  MainBar,
};
