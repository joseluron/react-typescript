import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppConstant from '../../App.constants';
import { signOut } from '../../redux/actions/Authentication';

import './NavigationHeader.scss';
import signOutIcon from '../../assets/signOut.png';
import { IAppState, IAuthenticationState } from '../../App.types';
import { Location } from 'history';

interface INavigationHeaderProps {
    authenticatedUser: IAuthenticationState;
    signOut: Function;
    location: Location;
}

const NavigationHeader = (props: INavigationHeaderProps): JSX.Element => {
    return (
        <div className="navigation-header-container">
            <div className="navigation-links-container">
                {
                    AppConstant.APP_NAVIGATION.map(link => {
                        return (
                            <div key={link.linkTo} className={`link-container ${(props.location.pathname === link.path) && "active"}`} >
                                <Link to={link.path}>
                                    {link.linkTo}
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
            <div className="navigation-information-container">
                <span>{
                    props.authenticatedUser.user ? (
                        props.authenticatedUser.user.displayName ? (
                            props.authenticatedUser.user.displayName
                        ) : (
                            props.authenticatedUser.user.email
                        )
                    ) : (
                        "User"
                    )
                }</span>
                <img onClick={(): void => props.signOut()} src={signOutIcon} alt="Sign Out" />
            </div>
        </div>
    )
}

const mapStateToProps = (state: IAppState) => ({
    authenticatedUser: state.authenticatedUser
});

export default connect(mapStateToProps, { signOut })(NavigationHeader);
