import React from 'react';
import { connect } from 'react-redux';

import { signIn, signInWithGoogle } from '../../redux/actions/Authentication';

import './SignInPage.scss';
import { ICredentials } from '../../App.types';

interface ISignInPageProps {
    signIn: Function,
    signInWithGoogle: Function,
}

const SignInPage = (props: ISignInPageProps) => {
    const [credentials, setCredentials] = React.useState<ICredentials>({ email: '', password: '' });

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const actualCredentials = { ...credentials };
        setCredentials({ ...actualCredentials, [ev.target.name]: ev.target.value});
    }

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        console.log('Submitting credentials: ', credentials);

        props.signIn(credentials);

    }

    const signInWithGoogle = () => {
        console.log('Signing in with google');
        
        props.signInWithGoogle();
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

export default connect(null, { signIn, signInWithGoogle })(SignInPage);
