import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import UserList from '../../components/UserList/UserList';
import { getData } from '../../redux/actions/Users';

import './SettingsPage.scss';
import { IAppState, IUsersState, IAuthenticationState } from '../../App.types';
import { Location } from 'history';

interface ISettingsPageProps extends RouteComponentProps {
    getData: Function;
    authenticatedUser: IAuthenticationState;
    users: IUsersState;
    location: Location;
}

const SettingsPage = (props: ISettingsPageProps): JSX.Element => {

    React.useEffect(() => {
        document.title = 'Settings';
        
        if (!props.users.fetched && !props.users.loading) {
            if (props.authenticatedUser && props.authenticatedUser.user) {
                props.getData(props.authenticatedUser.user.refreshToken);
            }
        }
    })

    return (
        <div className="settings-page-container page-background">
            <NavigationHeader location={props.location} />
            <div className="page-container">
                <h1>Settings</h1>
                <UserList users={props.users} />
            </div>
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    authenticatedUser: state.authenticatedUser,
    users: state.users
});

export default connect(mapStateToProps, { getData })(SettingsPage);
