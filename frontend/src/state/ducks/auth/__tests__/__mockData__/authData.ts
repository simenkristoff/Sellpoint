import { EncodedToken } from '@/state/interface';
import { AuthState, LoginCredentials } from '../../types';

export const authLogin: LoginCredentials = {
  username: 'simen',
  password: '1234',
};

export const authToken: EncodedToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNpbWVuIiwiZXhwIjoxNjEzNDA0OTYyLCJlbWFpbCI6InNpbWVuLmtyaXN0b2ZmZXJzZW45OEBnbWFpbC5jb20ifQ.LbPf6g2e6YhyMfaEMPXLO077ix2usoIr--9Z7JH65jo';

export const apiLoginSuccessResponse = {
  token: authToken,
  user: {
    username: 'simen',
    email: 'simen.kristoffersen98@gmail.com',
  },
};

export const signedOutState: AuthState = {
  username: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  status: null,
};

export const signedInState: AuthState = {
  username: 'simen',
  token: authToken,
  isLoggedIn: true,
  loading: false,
  status: null,
};
