import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callCategoryListAPI = (page = 1, limit, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.CATEGORY_LIST.GET}`,
     {
      page: page,
      limit: limit,
      search: search,
    }, 
    );
  };
};

// export const callCategoryListAPIForDropDown = (page = 1, limit=10, search = "") => {
//   return (_dispatch, _getState) => {
//     return fetchClient.post(`${constants.API.CATEGORY_LIST.GET}`,
//      {
//       page: page,
//       limit: limit,
//       search: search,
//     }, 
//     );
//   };
// };


export const callAddCategoryApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.CATEGORY_LIST.POST}`, 
     data
    );
  };
};

export const callDeleteCategoryApi = (category_id) => {
  console.log('event', category_id);
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.CATEGORY_LIST.DELETE}`,
  {
      category_id,
  }
    );
  };
};
export const callUpdateCategoryApi = ( category_id, name, image) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.CATEGORY_LIST.UPDATE}`,
      category_id,
      name,
      image
    );
  };
};

export const callCategoryDetail = ( category_id ) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.CATEGORY_LIST.DETAILS}`,
    {
      category_id
    }
    );
  };
};


