import { ApiResponse, EncodedToken, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

/**
 * Interface describing the Auth state
 * @interface AuthState
 */
export interface AuthState {
  readonly username: string | null;
  readonly email: string | null;
  readonly token: EncodedToken | null;
  readonly isLoggedIn: boolean;
  readonly loading: boolean;
  readonly status: ApiResponse | null;
}

/**
 * Interface describing the required login credentials
 * @interface LoginCredentials
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

export const AuthActionTypes = {
  LOGIN: generateAsyncAction('@@auth.LOGIN'),
  REGISTER: generateAsyncAction('@@auth.REGISTER'),
  LOGOUT: '@@auth.LOGOUT',
  CLEAR: '@@auth.CLEAR',
};

/**
 * The available Auth actions
 * @interface AuthActions
 */
export interface AuthActions {
  login: (credentials: LoginCredentials) => TPayloadMetaAction<LoginCredentials>;
  register: (credentials: RegisterCredentials) => TPayloadMetaAction<RegisterCredentials>;
  logout: () => TMetaAction;
  clear: () => TMetaAction;
}
