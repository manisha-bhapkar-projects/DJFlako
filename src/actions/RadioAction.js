import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callRadioAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.RADIO.GET}`, {
     
    });
  };
};

export const callUpdateRadioApi = (link) => {
    return (_dispatch, _getState) => {
      return fetchClient.post(`${constants.API.RADIO.UPDATE}`,
      {
        link,
      } 
      );
    };
  };






