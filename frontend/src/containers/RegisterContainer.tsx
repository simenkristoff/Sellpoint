import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IApplicationState, RegisterCredentials } from '@/state/interface';
import { clear, register } from '@/state/ducks/auth/actions';
import { Register } from '@/components/Register';

export const RegisterContainer = () => {
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
    register: useCallback((credentials: RegisterCredentials) => dispatch(register(credentials)), [dispatch]),
  };

  return <Register {...stateToProps} {...dispatchToProps} />;
};
