import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IApplicationState, AuthState, UserPermissions } from '@/state/interface';

const useAdvertAuth = () => {
  const history = useHistory();
  const currentUser = useSelector(({ auth }: IApplicationState) => auth);

  const verifyAdvertAuth = (user: AuthState): Boolean => {
    if (user.permissions) {
      return user.permissions.some(permission => permission == UserPermissions.ADVERTISER);
    }

    return false;
  };

  useEffect(() => {
    if (!verifyAdvertAuth(currentUser)) {
      history.push('/');
    }
  }, [currentUser, history]);

  return currentUser;
};

export default useAdvertAuth;
