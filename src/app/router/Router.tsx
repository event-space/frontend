import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import RootLayout from '../layout/RootLayout';
import LoginPage from '../../pages/login/Login';
import PrivateRoute from './PrivateRoute';
import UsersPage from '../../pages/users/Users';
import SpacePage from '../../pages/space/Space';
import CalendarPage from '../../pages/calendar/Calendar';
import HomePage from '../../pages/home/Home';
import ErrorPage from '../../pages/Error/Error';
import RegisterPage from '../../pages/Register/Register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/spaces"
          element={
            <PrivateRoute>
              <SpacePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalendarPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </>,
  ),
);

export default router;
