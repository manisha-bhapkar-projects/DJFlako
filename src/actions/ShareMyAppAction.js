import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callShareMyAppAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.SHARE_MY_APP.GET}`, {
     
    });
  };
};

export const callUpdateShareMyAppApi = (ios_link, android_link) => {
    return (_dispatch, _getState) => {
      return fetchClient.post(`${constants.API.SHARE_MY_APP.UPDATE}`,
      {
        ios_link,
        android_link
      },
      );
    };
  };






