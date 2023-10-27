import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Styled from './MainBar.styled';
import AvatarMenu from './AvatarMenu';

interface MainBarProps {
  isOpen: boolean;
  toggleNavigation: () => void;
  headerTitle: string;
}

export default function MainBar({
  isOpen,
  toggleNavigation,
  headerTitle,
}: MainBarProps) {
  return (
    <Styled.MainBar isOpen={isOpen}>
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleNavigation}
          sx={{
            marginRight: '36px',
            ...(isOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {headerTitle}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <AvatarMenu />
      </Toolbar>
    </Styled.MainBar>
  );
}
