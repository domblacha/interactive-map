import { MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import RoomIcon from '@mui/icons-material/Room';
import Settings from '@mui/icons-material/Settings';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AUTH_ACTIONS from '@/store/auth/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes';
import { selectUser } from '@/store/user/selectors';

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { firstName } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickLogout = () => {
    dispatch(AUTH_ACTIONS.logoutUser());
  };

  const handleDashboardClick = () => {
    navigate(PATHS.dashboard);
  };

  const handleMapClick = () => {
    navigate(PATHS.map);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Menu">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {firstName ? firstName[0] : 'U'}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {location.pathname === '/' ? (
          <MenuItem onClick={handleDashboardClick}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        ) : (
          <MenuItem onClick={handleMapClick}>
            <ListItemIcon>
              <RoomIcon fontSize="small" />
            </ListItemIcon>
            Mapa
          </MenuItem>
        )}
        <MenuItem onClick={handleClickLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Wyloguj
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
