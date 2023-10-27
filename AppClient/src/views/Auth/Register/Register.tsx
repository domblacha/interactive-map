import { Typography, Link } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import AuthStyled from '../Auth.styled';
import RegisterForm from './RegisterForm/RegisterForm';

interface RegisterProps {
  toggleForm: () => void;
}
const Register = ({ toggleForm }: RegisterProps) => {
  return (
    <AuthStyled.LoginWrapper>
      <AuthStyled.AvatarWrapper>
        <AccountCircleRoundedIcon sx={{ width: '50px', height: '50px' }} />
      </AuthStyled.AvatarWrapper>
      <Typography component="h1" variant="h5">
        Zarejestruj się
      </Typography>
      <RegisterForm />
      <AuthStyled.LinksWrapper>
        <Link
          variant="body2"
          mt="10px"
          sx={{ cursor: 'pointer' }}
          onClick={toggleForm}
        >
          {'lub zaloguj się'}
        </Link>
      </AuthStyled.LinksWrapper>
    </AuthStyled.LoginWrapper>
  );
};

export default Register;
