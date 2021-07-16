import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callPrivacyPolicyAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.PRIVACY_POLICY.GET}`, {
    
    });
  };
};

export const callUpdatePrivacyApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.PRIVACY_POLICY.UPDATE}`, 
     data
    );
  };
};



