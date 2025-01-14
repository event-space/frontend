import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import RootLayout from '../layout/RootLayout';
import LoginPage from '../../pages/login/Login';
import PrivateRoute from './PrivateRoute';
import HomePage from '../../pages/home/Home';
import ErrorPage from '../../pages/Error/Error';
import RegisterPage from '../../pages/Register/Register';
import { Profile } from '../../pages/Profile';
import { AllSpace } from '../../pages/Spaces';
import { CreateEvent } from '../../pages/event';
import { MyEvents } from '../../pages/my-events';
import Notifications from '../../pages/notifications/Notifications';
import SpaceDetailPage from '../../pages/SpaceDetails';
import AboutPage from '../../pages/about';
import FAQPage from '../../pages/faq';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/spaces" element={<AllSpace />} />
        <Route path="/space/:id" element={<SpaceDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
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
