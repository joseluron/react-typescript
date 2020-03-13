import React from 'react';
import { connect } from 'react-redux';

import { signIn, signInWithGoogle } from '../../redux/actions/Authentication';

import './SignInPage.scss';
import { ICredentials, IAppState, IAuthenticationState } from '../../App.types';
import { RouteComponentProps } from 'react-router-dom';

interface ISignInPageProps extends RouteComponentProps {
    signIn: Function;
    signInWithGoogle: Function;
    authenticatedUser: IAuthenticationState;
}

const SignInPage = (props: ISignInPageProps): JSX.Element => {
    const [credentials, setCredentials] = React.useState<ICredentials>({ email: '', password: '' });

    React.useEffect(() => {
        document.title = 'Sign In';
    })

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        const actualCredentials = { ...credentials };
        setCredentials({ ...actualCredentials, [ev.target.name]: ev.target.value });
    }

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
        ev.preventDefault();
        console.log('Submitting credentials: ', credentials);

        props.signIn(credentials, props.history, props.location);
    }

    const signInWithGoogle = (): void => {
        console.log('Signing in with google');

        props.signInWithGoogle(props.history, props.location);
    }

    return (
        <div className="sign-in-page-container page-background">
            <div className="sign-in-form-container">
                <h1>Sign In</h1>
                <form className="sign-in-form" onSubmit={onSubmit}>
                    {
                        Object.keys(credentials).map(key => {
                            return (
                                <div className="form-group" key={key}>
                                    <label htmlFor={key}>{key}</label>
                                    <input
                                        type={key}
                                        id={key}
                                        name={key}
                                        placeholder={`Introduce your ${key}`}
                                        value={credentials[key as keyof ICredentials]}
                                        onChange={onChange}
                                        disabled={props.authenticatedUser.loading}
                                    />
                                </div>
                            )
                        })
                    }
                    <button className={`sign-in-button ${props.authenticatedUser.loading && 'disabled'}`} type="submit" disabled={props.authenticatedUser.loading}>Sign in</button>
                </form>
                <button className={`google-provider-button ${props.authenticatedUser.loading && 'disabled'}`} onClick={signInWithGoogle} disabled={props.authenticatedUser.loading}>Sign in with Google</button>
                {props.authenticatedUser.loading &&
                    <div className="loading-spinner-container">
                        <div className="loading-spinner" />
                    </div>
                }
                {props.authenticatedUser.error &&
                    <div className="error-message">
                        {props.authenticatedUser.error}
                    </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    authenticatedUser: state.authenticatedUser
});

export default connect(mapStateToProps, { signIn, signInWithGoogle })(SignInPage);
