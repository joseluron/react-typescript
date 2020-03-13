import { User } from '@firebase/auth-types';
import { Location } from 'history';

export interface ICredentials {
    email: string;
    password: string;
}

export interface IAppState {
    authenticatedUser: IAuthenticationState;
    users: IUsersState;
}

export interface IAuthenticationState {
    loading: boolean;
    user: User | null;
    error: string | null;
}

export interface IUsersState {
    loading: boolean;
    fetched: boolean;
    users: Array<IUser> | null;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
}

export const USER_FETCHING = 'USER_FETCHING';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';
export const USER_SIGNING_OUT = 'USER_SIGNING_OUT';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';
export const USER_SIGN_OUT_ERROR = 'USER_SIGN_OUT_ERROR';

export interface IAuthenticationAction {
    type: string;
    user?: User | null;
    error?: string | null;
}

export interface IUsersAction {
    type: string;
    users: Array<IUser> | null;
}

export interface IProtectedLocation extends Location {
    state: {
        from: string;
    };
}

export const DATA_FETCHING = 'DATA_FETCHING';
export const DATA_FECTH_SUCCESS = 'DATA_FECTH_SUCCESS';
export const DATA_FETCH_ERROR = 'DATA_FETCH_ERROR';
