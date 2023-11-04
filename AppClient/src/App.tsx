import { useEffect } from 'react';

import AppLoading from './components/AppLoading/AppLoading';
import Toast from './components/Toast/Toast';
import { useAppDispatch } from './store/hooks';
import AppRoutes from './routes/';
import APPLICATION_ACTION from './store/application/actions';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(APPLICATION_ACTION.initApp());
  }, []);

  return (
    <>
      <AppLoading />
      <AppRoutes />
      <Toast />
    </>
  );
}

export default App;
