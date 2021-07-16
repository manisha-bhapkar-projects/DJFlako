import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callBiographyAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.BIOGRAPHY.GET}`, {
     
    });
  };
};


export const callAddBiographyApi = (description) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.BIOGRAPHY.POST}`, 
    description,
    );
  };
};


