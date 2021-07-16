import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callSponsoreListAPI = (page = 1, limit = 10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SPONSORED.GET}`,
      {
        page: page,
        limit: limit,
        search: search,
      },
    );
  };
};


export const callAddSponsorApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SPONSORED.POST}`,
      data
    );
  };
};
export const callDeleteSponsoreApi = (sponsor_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SPONSORED.DELETE}`,
      {
        sponsor_id,
      }
    );
  };
};

export const callSponsoreDetail = (sponsor_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SPONSORED.DETAILS}`,
      {
        sponsor_id
      }
    );
  };
};

export const callUpdateSponsoreApi = (
  sponsor_id,
  name,
  description,
  image, ) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SPONSORED.UPDATE}`,


      sponsor_id,
      name,
      description,
      image,


    );
  };
};

// {
//   "sponsor_id": 1,
//   "name": "New Testing",
//   "description": "Lorem Ipsum",
//   "image": "" (Optional while updating)
// }



// export const callDeleteSongApi = (id) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.delete(`${constants.API.MUSIC.DELETE}${id}`,);
//   };
// };

// export const callMusicDetailsAPI = (id) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.get(`http://167.86.106.219/api/v1/admin/song/details/${id}`, {
//       // http://167.86.106.219/api/v1/admin/song/details/7
//     });
//   };
// };

