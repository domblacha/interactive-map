import { useEffect } from 'react';

import AppLoading from './components/AppLoading/AppLoading';
import Toast from './components/Toast/Toast';
import { useAppDispatch } from './store/hooks';
import { userGetActive } from './store/user/actions';
import LocalStorage from './helpers/localStorage';
import { TOKENS_KEY } from './helpers/localStorage/LocalSotrage.static';
import AppRoutes from './routes/';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (LocalStorage.getItem(TOKENS_KEY)) {
      dispatch(userGetActive());
    }
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
