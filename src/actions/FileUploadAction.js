import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callFileUploadAPI = (file) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.FILE_UPLOAD.POST}`, file, {
    });
  };
};


export const callSongUploadAPI = (file) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SONG_UPLOAD.POST}`, file, {

    });
  };
};

export const callGalleryImageAPI = (image) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.GALLERY.POST}`,
      {
        image
      }
    );
  };
};


