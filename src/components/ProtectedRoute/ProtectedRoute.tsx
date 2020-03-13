import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { IAppState, IAuthenticationState } from '../../App.types';
import AppConstants from '../../App.constants';

interface IProtectedRouteProps {
    path: string;
    component: any;
    exact?: boolean;
    authenticatedUser?: IAuthenticationState;
}

const ProtectedRoute = ({path, component: Component, authenticatedUser, ...rest}: IProtectedRouteProps): JSX.Element => {
    return (
        <Route path={path} {...rest} render = {(props: RouteProps): JSX.Element => (
            (authenticatedUser && (authenticatedUser.user != null)) ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: AppConstants.PAGE_URL_SIGN_IN,
                    state: { from: path }
                }} />
            )
        )} />
    );
}

const mapStateToProps = (state: IAppState) => ({
    authenticatedUser: state.authenticatedUser    
});

export default connect(mapStateToProps, null)(ProtectedRoute);
