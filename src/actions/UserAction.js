import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callUserListAPI = (page = 1, limit=10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.USER.GET}`, 
     {
      page: page,
      limit: limit,
      search: search,
      }, 
      );
  };
};


export const callUserStatusChangeAPI = (user_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.USER.UPDATE_STATUS}`, 
    {
      user_id
    }
    );
  };
};




