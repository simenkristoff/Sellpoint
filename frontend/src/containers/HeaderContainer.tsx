import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IApplicationState } from '@/state/interface';
import { logout } from '@/state/ducks/auth/actions';
import { Header } from '@/components/Header';

export const HeaderContainer = () => {
  const dispatch = useDispatch();

  const stateToProps = useSelector(({ auth }: IApplicationState) => ({
    username: auth.username,
    isLoggedIn: auth.isLoggedIn,
    isAdmin: auth.isAdmin
  }));

  const dispatchToProps = {
    logout: useCallback(() => dispatch(logout()), [dispatch]),
  };

  return <Header {...stateToProps} {...dispatchToProps} />;
};
