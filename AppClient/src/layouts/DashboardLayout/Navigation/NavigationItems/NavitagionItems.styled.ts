import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const NavLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export default {
  NavLink,
};
