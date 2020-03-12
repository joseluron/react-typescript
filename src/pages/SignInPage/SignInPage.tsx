import React from 'react';

import AuthenticationService from '../../services/Authentication.service';

import './SignInPage.scss';
import { ICredentials } from '../../App.types';

function SignInPage() {
    const [credentials, setCredentials] = React.useState<ICredentials>({ email: '', password: '' });

    function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const actualCredentials = { ...credentials };
        setCredentials({ ...actualCredentials, [ev.target.name]: ev.target.value});
    }

    function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        console.log("Submitting credentials: ", credentials);

        AuthenticationService.signIn(credentials)
        .then(userCredentials => {
            console.log("Signed in user: ", userCredentials);
        })
        .catch(err => {
            console.error("Could not sign in the user: ", err);
        })
    }

    function signInWithGoogle() {
        console.log("Signing in with google");
        AuthenticationService.signInWithGoogle()
        .then(userCredentials => {
            console.log("Signed in with google: ", userCredentials);
        })
        .catch(err => {
            console.error("Could not sign in with google");
        })
    }

    return (
        <div className="sign-in-page-container">
            <div className="sign-in-form-container">
                <h1>Sign In</h1>
                <form className="sign-in-form" onSubmit={onSubmit}>
                    {
                        Object.keys(credentials).map(key => {
                            return (
                                <React.Fragment key={key}>
                                    <label htmlFor={key}>{key === "email" ? "Email" : "Password"}</label>
                                    <input
                                        type={key}
                                        id={key}
                                        name={key}
                                        placeholder={`Introduce your ${key}`}
                                        value={credentials[key as keyof ICredentials]}
                                        onChange={onChange}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                    <button type="submit">Sign in</button>
                </form>
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </div>
    );
}

export default SignInPage;
