import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import UserList from '../../components/UserList/UserList';
import { getData } from '../../redux/actions/Users';

import './DashboardPage.scss';
import { IAppState, IUsersState, IAuthenticationState } from '../../App.types';
import { Location } from 'history';

interface IDashboardPageProps extends RouteComponentProps {
    getData: Function;
    authenticatedUser: IAuthenticationState;
    users: IUsersState;
    location: Location;
}

const DashboardPage = (props: IDashboardPageProps): JSX.Element => {
    
    React.useEffect(() => {
        document.title = 'Dashboard';
        
        if (!props.users.fetched && !props.users.loading) {
            if (props.authenticatedUser && props.authenticatedUser.user) {
                props.getData(props.authenticatedUser.user.refreshToken);
            }
        }
    })
            
    return (
        <div className="dashboard-page-container page-background">
            <NavigationHeader location={props.location} />
            <div className="page-container">
                <h1>Dashboard</h1>
                <UserList users={props.users} />
            </div>
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    authenticatedUser: state.authenticatedUser,
    users: state.users
});

export default connect(mapStateToProps, { getData })(DashboardPage);
