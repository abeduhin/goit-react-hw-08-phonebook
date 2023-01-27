import React, { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from 'redux/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { refreshUser } from 'redux/auth/operations';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Loader } from './Loader/Loader';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';


const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const Register = lazy(() => import('../pages/RegistrationPage/Register.js'));
const Login = lazy(() => import('../pages/LoginPage/Login'));
const Contacts = lazy(() => import('../pages/ContactsPage/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch])

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path='register' element={<RestrictedRoute redirectTo='/contacts' component={<Register />} />} />
        <Route path='login' element={<RestrictedRoute redirectTo='/contacts' component={<Login />} />} />
        <Route path='contacts' element={<PrivateRoute redirectTo='/login' component={<Contacts />} />} />
      </Route>
    </Routes>
  );
};