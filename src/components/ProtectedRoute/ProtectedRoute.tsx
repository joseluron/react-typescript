import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { IAppState, IAuthenticationState } from '../../App.types';
import AppConstants from '../../App.constants';

interface IProtectedRouteProps {
    path: string,
    component: any,
    exact?: any
    authenticatedUser?: IAuthenticationState
}

const ProtectedRoute = ({path, component: Component, authenticatedUser, ...rest}: IProtectedRouteProps) => {
    return (
        <Route path={path} {...rest} render = {props => (
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
