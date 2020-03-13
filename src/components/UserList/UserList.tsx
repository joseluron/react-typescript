import React from 'react';

import './UserList.scss';
import { IUsersState } from '../../App.types';

interface IUsersListProps {
    users: IUsersState;
}

const UserList = (props: IUsersListProps): JSX.Element => {
    return (
        <div className="users-container">
            <h2>Users:</h2>
            {
                props.users.fetched ? (
                    props.users.users ? (
                        props.users.users.map(user =>
                            <div className="user-container" key={user.id}>
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">{user.email}</span>
                            </div>
                        )
                    ) : (
                            <span>No users in the system</span>
                        )
                ) : (
                        <span>Loading users...</span>
                    )
            }
        </div>
    )
}

export default UserList;
