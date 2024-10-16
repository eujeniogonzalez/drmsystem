import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../../const/router-const';
import MainPage from '../../../pages/main-page/main-page';
import LoginPage from '../../../pages/login-page/login-page';
import RegisterPage from '../../../pages/register-page/register-page';
import NotFoundPage from '../../../pages/not-found-page/not-found-page';
import RepassPage from '../../../pages/repass-page/repass-page';
import ConfirmPage from '../../../pages/confirm-page/confirm-page';
import NewPasswordPage from '../../../pages/new-password-page/new-password-page';
import PrivateRoute from '../private-route/private-route';
import DashboardPage from '../../../pages/dashboard/dashboard-page';

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<MainPage />} />
      <Route path={AppRoutes.Login} element={<LoginPage />} />
      <Route path={AppRoutes.Register} element={<RegisterPage />} />
      <Route path={AppRoutes.Repass} element={<RepassPage />} />
      <Route path={AppRoutes.Confirm} element={<ConfirmPage />} />
      <Route path={AppRoutes.NewPassword} element={<NewPasswordPage />} />
      <Route path={AppRoutes.Dashboard} element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path={AppRoutes.NotFound} element={<NotFoundPage />} /> 
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
