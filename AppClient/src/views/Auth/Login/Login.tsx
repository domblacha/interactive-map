import { Typography, Link } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import AuthStyled from '../Auth.styled';
import LoginForm from './LoginForm/LoginForm';

interface LoginProps {
  toggleForm: () => void;
}

const Login = ({ toggleForm }: LoginProps) => {
  return (
    <AuthStyled.LoginWrapper>
      <AuthStyled.AvatarWrapper>
        <AccountCircleRoundedIcon sx={{ width: '50px', height: '50px' }} />
      </AuthStyled.AvatarWrapper>
      <Typography component="h1" variant="h5">
        Zaloguj się
      </Typography>
      <LoginForm />
      <AuthStyled.LinksWrapper>
        <Link href="#" variant="body2">
          Nie pamiętasz hasła?
        </Link>

        <Link
          variant="body2"
          mt="10px"
          sx={{ cursor: 'pointer' }}
          onClick={toggleForm}
        >
          {'Załóż konto'}
        </Link>
      </AuthStyled.LinksWrapper>
    </AuthStyled.LoginWrapper>
  );
};

export default Login;
