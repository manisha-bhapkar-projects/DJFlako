import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callMusicListAPI = (page = 1, limit=10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.MUSIC.GET}`, 
      {
      page: page,
      limit: limit,
      search: search,
      },
      );
  };
};


export const callAddMusicApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.MUSIC.POST}`, 
     data
    );
  };
};


// export const callUploadSong = (data) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.post(
//       `${constants.API.UPLOAD.UPLOAD_SONG}`, data
      
//     )
//   };
// };


export const callDeleteSongApi = (song_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.MUSIC.DELETE}`, 
    {
      song_id
    }
    );
  };
};


export const callEditMusicApi = (
  song_id,
  category_id,
  name,
  image,
  song_file,
  song_url,
  duration) => {
  return (_dispatch, _getState) => {
    console.log("name",name);
    
    return fetchClient.post(`${constants.API.MUSIC.UPDATE}`, 
    
        song_id,
        category_id,
        name,
        image,
        song_file,
        song_url,
        duration,
    
    
    );
  };
};
// export const callMusicDetailsAPI = (id) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.get(`http://167.86.106.219/api/v1/admin/song/details/${id}`, {
//       // http://167.86.106.219/api/v1/admin/song/details/7
//     });
//   };
// };

export const callSongDetail = ( song_id ) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.MUSIC.DETAILS}`,
    {
      song_id
    }
    );
  };
};