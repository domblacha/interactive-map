import Styled from './Navigation.styled';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import NavigationItems from './NavigationItems';

interface NavigationProps {
  isOpen: boolean;
  toggleNavigation: () => void;
}

export default function Navigation({
  isOpen,
  toggleNavigation,
}: NavigationProps) {
  return (
    <>
      <Styled.Navigation variant="permanent" isOpen={isOpen}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleNavigation}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <NavigationItems />
          <Divider sx={{ my: 1 }} />
        </List>
      </Styled.Navigation>
    </>
  );
}
