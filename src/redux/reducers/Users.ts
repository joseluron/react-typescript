import { IUsersState, IUsersAction, DATA_FETCHING, DATA_FECTH_SUCCESS, DATA_FETCH_ERROR } from '../../App.types';

const initialUsersState: IUsersState = {
    loading: false,
    fetched: false,
    users: null,
}

export default function users(state = initialUsersState, action: IUsersAction): object {
    switch (action.type) {
        case DATA_FETCHING:
            return {
                ...state,
                loading: true,
                users: null
            }
        case DATA_FECTH_SUCCESS:
            return {
                ...state,
                loading: false,
                fetched: true,
                users: action.users
            }
        case DATA_FETCH_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return {
                ...state,
            }
    }
}
