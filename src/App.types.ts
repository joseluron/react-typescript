export interface ICredentials {
    email: string,
    password: string
}

export interface IAppState {
    authenticatedUser: IAuthenticationState
}

export interface IAuthenticationState {
    loading: boolean,
    userCredential: any
}

export const USER_FETCHING = 'USER_FETCHING';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';
export const USER_SIGNING_OUT = 'USER_SIGNING_OUT';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';
export const USER_SIGN_OUT_ERROR = 'USER_SIGN_OUT_ERROR';

export interface IAuthenticationAction {
    type: string,
    userCredential?: any
}
