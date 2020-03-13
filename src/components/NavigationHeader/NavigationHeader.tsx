import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppConstant from '../../App.constants';
import { signOut } from '../../redux/actions/Authentication';

import './NavigationHeader.scss';
import { IAppState, IAuthenticationState } from '../../App.types';

interface INavigationHeaderProps {
    authenticatedUser: IAuthenticationState,
    signOut: Function
}

const NavigationHeader = (props: INavigationHeaderProps) => {
    return (
        <div className="navigation-header-container">
            <div className="navigation-links-container">
                {
                    AppConstant.APP_NAVIGATION.map(link => {
                        return (
                            <Link key={link.linkTo} to={link.path}>
                                <span>{link.linkTo}</span>
                            </Link>
                        );
                    })
                }
            </div>
            <div className="navigation-information-container">
                {
                    props.authenticatedUser.user ? (
                        props.authenticatedUser.user.displayName ? (
                            <span>{props.authenticatedUser.user.displayName}</span>
                        ) : (
                            <span>{props.authenticatedUser.user.email}</span>
                        )
                    ) : (
                        <span>No user</span>
                    )
                }
                <button onClick={() => props.signOut()}>Sign Out</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: IAppState) => ({
    authenticatedUser: state.authenticatedUser
});

export default connect(mapStateToProps, { signOut })(NavigationHeader);
