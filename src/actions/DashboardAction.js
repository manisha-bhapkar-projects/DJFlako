import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callDashboardCountAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.DASHBOARD.GET}`,
    
    );
  };
};