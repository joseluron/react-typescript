import AuthenticationService from '../../services/Authentication.service';
import AppConstants from '../../App.constants';
import { ICredentials, USER_FETCHING, USER_FETCH_SUCCESS, USER_FETCH_ERROR, USER_SIGNING_OUT, USER_SIGN_OUT_SUCCESS, USER_SIGN_OUT_ERROR, IProtectedLocation } from '../../App.types';
import { User } from '@firebase/auth-types';
import { History } from 'history';

//
// DISPATCHERS
//
const userSigningIn = () => {
    return {
        type: USER_FETCHING,
    }
}
const userSignedIn = (user: User | null) => {
    return {
        type: USER_FETCH_SUCCESS,
        user
    }
}
const userSignedInError = () => {
    return {
        type: USER_FETCH_ERROR
    }
}
const userSigningOut = () => {
    return {
        type: USER_SIGNING_OUT
    }
}
const userSignedOut = () => {
    return {
        type: USER_SIGN_OUT_SUCCESS
    }
}
const userSignedOutError = () => {
    return {
        type: USER_SIGN_OUT_ERROR
    }
}

//
// ACTIONS
//
export const signIn = (credentials: ICredentials, history: History, location: IProtectedLocation) => (dispatch: any) => {
    dispatch(userSigningIn());
    return AuthenticationService.signIn(credentials)
    .then((userCredential) => {
        console.log('Signed user in: ', userCredential);
        dispatch(userSignedIn(userCredential.user));
        if (location.state && location.state.from) {
            history.push(location.state.from);
        } else {
            history.push(AppConstants.PAGE_URL_DASHBOARD);
        }
    })
    .catch((err: Error) => {
        console.error('Could not sign user in: ', err);
        dispatch(userSignedInError());
    })
}
export const signInWithGoogle = (history: History, location: IProtectedLocation) => (dispatch: any) => {
    dispatch(userSigningIn());
    return AuthenticationService.signInWithGoogle()
    .then((userCredential) => {
        console.log('Signed user in with google: ', userCredential);
        dispatch(userSignedIn(userCredential.user));
        if (location.state && location.state.from) {
            history.push(location.state.from);
        } else {
            history.push(AppConstants.PAGE_URL_DASHBOARD);
        }
    })
    .catch((err: Error) => {
        console.error('Could not sign user in with google : ', err);
        dispatch(userSignedInError());
    })
}
export const signOut = (history: History) => (dispatch: any) => {
    dispatch(userSigningOut());
    return AuthenticationService.signOut()
    .then(() => {
        console.log('Signed user out');
        dispatch(userSignedOut());
        history.push(AppConstants.PAGE_URL_SIGN_IN);
    })
    .catch((err: Error) => {
        console.error('Could not sign user out : ', err);
        dispatch(userSignedOutError());
    })
}

export const isUserSignedIn = (currentUser: User | null) => (dispatch: any) => {
    dispatch(userSignedIn(currentUser));
}