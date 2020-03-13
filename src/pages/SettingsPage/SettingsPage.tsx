import React from 'react';
import { connect } from 'react-redux';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import { getData } from '../../redux/actions/Users';

import { IAppState, IUsersState, IAuthenticationState } from '../../App.types';

interface ISettingsPageProps {
    getData: Function,
    authenticatedUser: IAuthenticationState,
    users: IUsersState
}

const SettingsPage = (props: ISettingsPageProps) => {

    React.useEffect(() => {
        if (!props.users.fetched) {
            if (props.authenticatedUser && props.authenticatedUser.user) {
                props.getData(props.authenticatedUser.user.refreshToken);
            }
        }
    }, [props.users.fetched])

    return (
        <div className="settings-page-container">
            <NavigationHeader />
            <h1>Settings</h1>
            {
                !props.users.loading ? (
                    props.users && props.users.users ? (
                        props.users.users.map(user => <span key={user.id}>{user.name}</span>)
                    ) : (
                        <span>No users in the system</span>
                    )
                ) : (
                    <span>Loading...</span>
                )
            }
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    authenticatedUser: state.authenticatedUser,
    users: state.users
});

export default connect(mapStateToProps, { getData })(SettingsPage);
