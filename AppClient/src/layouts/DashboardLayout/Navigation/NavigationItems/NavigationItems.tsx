import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Styled from './NavitagionItems.styled';
import { PATHS } from '@/routes/paths';

export default function NavigationItems() {
  return (
    <>
      <Styled.NavLink to={PATHS.dashboard}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Moje miejsca" />
        </ListItemButton>
      </Styled.NavLink>
      <Styled.NavLink to={PATHS.secondFakeView}>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Ulubione miejsca" />
        </ListItemButton>
      </Styled.NavLink>
    </>
  );
}
