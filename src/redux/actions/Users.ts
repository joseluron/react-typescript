import DataService from '../../services/Data.service';
import { DATA_FETCHING, DATA_FECTH_SUCCESS, DATA_FETCH_ERROR, IUser } from '../../App.types';
import { Store, AnyAction } from 'redux';

//
// DISPATCHERS
//
const fetchingData = (): AnyAction => {
    return {
        type: DATA_FETCHING,
    }
}
const dataFetched = (users: Array<IUser>): AnyAction => {
    return {
        type: DATA_FECTH_SUCCESS,
        users
    }
}
const dataFetchedError = (): AnyAction => {
    return {
        type: DATA_FETCH_ERROR
    }
}


//
// ACTIONS
//
export const getData = (token: string): Function => (dispatch: Store['dispatch']): Promise<void> => {
    dispatch(fetchingData());
    return DataService.getData(token)
    .then(usersData => {
        console.log('Fetched users data: ', usersData);
        dispatch(dataFetched(usersData.data));
    })
    .catch((err: Error) => {
        console.error('Could not fetch data: ', err);
        dispatch(dataFetchedError());
    })
}
