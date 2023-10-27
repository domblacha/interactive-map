import { Routes, Route } from 'react-router-dom';

import DashboardLayout from '@/layouts/DashboardLayout';
import Auth from '@/views/Auth';
import ConfirmEmail from '@/views/Auth/ConfirmEmail/ConfirmEmail';
import MyPlaces from '@/views/MyPlaces';
import FavoritePlaces from '@/views/FavoritePlaces';

import ProtectedRoute from './ProtectedRoute';
import { PATHS } from './paths';
import Map from '@/views/Map';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.map} element={<Map />} />
      <Route path={PATHS.auth} element={<Auth />} />
      <Route path={PATHS.confirmEmail} element={<ConfirmEmail />} />
      <Route
        path={PATHS.dashboard}
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MyPlaces />} />
        <Route path={PATHS.secondFakeView} element={<FavoritePlaces />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
