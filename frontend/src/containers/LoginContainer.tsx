import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IApplicationState, LoginCredentials } from '@/state/interface';
import { clear, login } from '@/state/ducks/auth/actions';
import { Login } from '@/components/Login';

export const LoginContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, loading, status } = useSelector(({ auth }: IApplicationState) => auth);

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, location]);

  const stateToProps = {
    loading,
    response: status,
  };

  const dispatchToProps = {
    login: useCallback((credentials: LoginCredentials) => dispatch(login(credentials)), [dispatch]),
  };

  return <Login {...stateToProps} {...dispatchToProps} />;
};
