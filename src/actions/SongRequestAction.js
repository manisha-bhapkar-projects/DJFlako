import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callSongRequestApi = (page = 1, limit=10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SONG_REQUEST.GET}`,
     {
      page: page,
      limit: limit,
      search: search,
    }, 
    );
  };
};

export const callDeleteSongRequestApi = (sr_id) => {
    return (_dispatch, _getState) => {
      return fetchClient.post(`${constants.API.SONG_REQUEST.DELETE}`,
      {
        sr_id,
    }
      );
    };
  };
  