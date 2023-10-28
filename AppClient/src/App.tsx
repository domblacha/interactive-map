import { useEffect } from 'react';

import AppLoading from './components/AppLoading/AppLoading';
import Toast from './components/Toast/Toast';
import { useAppDispatch } from './store/hooks';
import { userGetActive } from './store/user/actions';
import AppRoutes from './routes/';
import { MAP_ACTION } from './store/map/actions';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(MAP_ACTION.getAllMarkers());
    dispatch(userGetActive());
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
