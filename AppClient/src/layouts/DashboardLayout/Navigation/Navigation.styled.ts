import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

interface Navigation extends DrawerProps {
  isOpen: boolean;
}

const Navigation = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<Navigation>(({ theme, isOpen }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '100vw',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    ...(!isOpen && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default {
  Navigation,
};
