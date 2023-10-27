/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from 'react-router-dom';

import LocalStorage from '@/helpers/localStorage';
import { TOKENS_KEY } from '@/helpers/localStorage/LocalSotrage.static';
import { Tokens } from '@/helpers/localStorage/LocalStorage.types';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/user/selectors';

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { isLoggedIn } = useAppSelector(selectUser);
  const tokens = LocalStorage.getItem<Tokens>(TOKENS_KEY);

  if (!tokens?.accessToken && !tokens?.refreshToken && !isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
