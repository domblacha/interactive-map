import { useState } from 'react';

import Grid from '@/components/Grid';

import Login from './Login/Login';
import Register from './Register';
import AdvertisingContent from './AdvertisingContent';

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const toggleForm = () => {
    setIsLoginPage((value) => !value);
  };

  return (
    <Grid.Container>
      <Grid.Row>
        <Grid.Col xs={12} sm={8} md={5}>
          {isLoginPage ? (
            <Login toggleForm={toggleForm} />
          ) : (
            <Register toggleForm={toggleForm} />
          )}
        </Grid.Col>
        <Grid.Col sm={4} md={7} display={{ xs: 'none', sm: 'block' }}>
          <AdvertisingContent />
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
};

export default Auth;
