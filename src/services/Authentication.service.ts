import { firebaseAuth, googleProvider } from '../config/Firebase';
import { UserCredential } from '@firebase/auth-types';

import { ICredentials } from '../App.types';

class AuthenticationService {
    public signIn = (credentials: ICredentials): Promise<UserCredential> =>
        firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
    
    public signInWithGoogle = ():Promise<UserCredential> =>
        firebaseAuth.signInWithPopup(googleProvider);

    public signOut = ():Promise<void> =>
        firebaseAuth.signOut();
}

export default new AuthenticationService();
