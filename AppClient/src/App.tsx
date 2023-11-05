import { useEffect } from 'react';

import AppRoutes from './routes/';
import { useAppDispatch } from './store/hooks';
import APPLICATION_ACTION from './store/application/actions';
import AppLoading from './components/AppLoading';
import Toast from './components/Toast';

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
