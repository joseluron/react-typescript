import { IAuthenticationState, IAuthenticationAction, USER_FETCHING, USER_FETCH_SUCCESS, USER_FETCH_ERROR, USER_SIGNING_OUT, USER_SIGN_OUT_SUCCESS, USER_SIGN_OUT_ERROR } from '../../App.types';

const initialAuthenticationState: IAuthenticationState = {
    loading: false,
    userCredential: null
}

export default function authentication(state = initialAuthenticationState, action: IAuthenticationAction) {
    switch (action.type) {
        case USER_FETCHING:
            return {
                ...state,
                loading: true,
                userCredential: null
            }
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                userCredential: action.userCredential
            }
        case USER_FETCH_ERROR:
            return {
                ...state,
                loading: false
            }
        case USER_SIGNING_OUT:
            return {
                ...state,
                loading: true
            }
        case USER_SIGN_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                userCredential: null
            }
        case USER_SIGN_OUT_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return {
                ...state,
            }
    }
}
