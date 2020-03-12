import AuthenticationService from '../../services/Authentication.service';
import { ICredentials, USER_FETCHING, USER_FETCH_SUCCESS, USER_FETCH_ERROR, USER_SIGNING_OUT, USER_SIGN_OUT_SUCCESS, USER_SIGN_OUT_ERROR } from '../../App.types';
import { UserCredential } from '@firebase/auth-types';

//
// DISPATCHERS
//
const userSigningIn = () => {
    return {
        type: USER_FETCHING,
    }
}
const userSignedIn = (userCredential: UserCredential) => {
    return {
        type: USER_FETCH_SUCCESS,
        userCredential
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
export const signIn = (credentials: ICredentials) => (dispatch: any) => {
    dispatch(userSigningIn());
    AuthenticationService.signIn(credentials)
    .then((userCredential) => {
        console.log('Signed user in: ', userCredential);
        dispatch(userSignedIn(userCredential));
    })
    .catch((err: Error) => {
        console.error('Could not sign user in: ', err);
        dispatch(userSignedInError());
        throw new Error(err.message);
    })
}
export const signInWithGoogle = () => (dispatch: any) => {
    dispatch(userSigningIn());
    AuthenticationService.signInWithGoogle()
    .then((userCredential) => {
        console.log('Signed user in with google: ', userCredential);
        dispatch(userSignedIn(userCredential));
    })
    .catch((err: Error) => {
        console.error('Could not sign user in with google : ', err);
        dispatch(userSignedInError());
        throw new Error(err.message);
    })
}
export const signOut = () => (dispatch: any) => {
    dispatch(userSigningOut());
    AuthenticationService.signOut()
    .then(() => {
        console.log('Signed user out');
        dispatch(userSignedOut());
    })
    .catch((err: Error) => {
        console.error('Could not sign user out : ', err);
        dispatch(userSignedOutError());
        throw new Error(err.message);
    })
}