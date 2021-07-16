import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callSocialLinkAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.SOCIAL_LINKS.GET}`, {
     
    });
  };
};

export const callUpdateSocialLinkApi = ( facebook, instagram, twitter, mixcloud) => {
    return (_dispatch, _getState) => {
      return fetchClient.post(`${constants.API.SOCIAL_LINKS.UPDATE}`,
      {
        facebook,
        instagram,
        twitter,
        mixcloud
     }
      );
    };
  };






