import { Typography, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Grid from '@/components/Grid';
import { PATHS } from '@/routes';

import {
  EmailIcon,
  MainTitle,
  AbsoluteLink,
  CenteredContent,
  ResendButton,
} from './ConfirmEmail.styled';

const ConfirmEmail = () => {
  return (
    <Grid.Container>
      <Grid.Row>
        <Grid.Col xs={12}>
          <CenteredContent>
            <AbsoluteLink href={PATHS.auth}>
              <Button variant="text" sx={{ p: 2 }}>
                <ArrowBackIosIcon />
                Wróć do logowania
              </Button>
            </AbsoluteLink>
            <EmailIcon color="primary" />
            <MainTitle>Zweryfikuj adres email</MainTitle>
            <Typography sx={{ width: { xs: '100%', md: '60%', lg: '40%' } }}>
              Na podany adres email została wysłana wiadomość weryfikacyjna.
              Kliknij w zawarty w niej link, aby potwierdzić rejestrację. Jeśli
              wiadomość nie dotarła, kliknij poniższy przycisk.
            </Typography>
            <ResendButton variant="contained">Wyślij ponownie</ResendButton>
          </CenteredContent>
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
};

export default ConfirmEmail;
