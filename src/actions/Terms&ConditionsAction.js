import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callTermsConditionsAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TERMS_AND_CONDITIONS.GET}`, {
    
    });
  };
};
export const callUpdateTermsAndConditionsApi = (description) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.TERMS_AND_CONDITIONS.UPDATE}`,
    description
    );
  };
};




