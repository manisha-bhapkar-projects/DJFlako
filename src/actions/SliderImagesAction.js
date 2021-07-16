
import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callSliderImagesAPI = (page, limit=10) => {
  console.log("page, limit", page, limit);
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.SLIDER_IMAGES.GET}`, 
    {
      params: {
        page: page,
        limit: limit,
        // search: _search,
      }
    }
      );
  };
};



export const callAddSliderImageAPI = (image) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SLIDER_IMAGES.POST}`, 
    {
      image
    }
    );
  };
};

export const callDeleteSliderImageAPI = (slider_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SLIDER_IMAGES.DELETE}`, 
    {
    slider_id
    }
    );
  };
};