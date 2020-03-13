import axios, { AxiosResponse } from 'axios';
import AppConstants from '../App.constants';

class DataService {
    public getData = (token: string): Promise<AxiosResponse> => {
        const config = {
            headers: {
               Authorization: "Bearer " + token
            }
         }    
        return axios.get(AppConstants.DATA_URL, config);
    }
}

export default new DataService();
