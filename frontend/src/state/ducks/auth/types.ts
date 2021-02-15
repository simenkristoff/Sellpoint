import { ApiResponse, EncodedToken, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

export interface AuthState {
  readonly username: string | null;
  readonly token: EncodedToken | null;
  readonly isLoggedIn: boolean;
  readonly loading: boolean;
  readonly status: ApiResponse | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export const AuthActionTypes = {
  LOGIN: generateAsyncAction('@@auth.LOGIN'),
  LOGOUT: '@@auth.LOGOUT',
  CLEAR: '@@auth.CLEAR',
};

export interface AuthActions {
  login: (credentials: LoginCredentials) => TPayloadMetaAction<LoginCredentials>;
  logout: () => TMetaAction;
  clear: () => TMetaAction;
}
