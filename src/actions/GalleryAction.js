import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callGalleryImageAPI = (image) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.GALLERY.POST}`,
      {
        image
      }
    );
  };
};



// export const callGalleryListAPI = (page = 1, limit = 10) => {
//   console.log("page & limit", _page, _limit);
  
//   return (_dispatch, _getState) => {
//     return fetchClient.get(`${constants.API.GALLERY.GET}`,
//       {
//         params: {
//           page: page,
//           limit: limit,
//           // search: _search,
//         },
//       }
//       );
//   };
// };

export const callGalleryListAPI = (page=1, limit=10) => {
  // console.log("Pageno, limt",page, limit);
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.GALLERY.GET}`, 
      {
        params: {
          page: page,
          limit: limit,
          // search: _search,
        },
      }
   );
  };
};


export const callDeleteGalleryImageAPI = (gallery_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.GALLERY.DELETE}`,
      {
        gallery_id
      }
    );
  };
};

