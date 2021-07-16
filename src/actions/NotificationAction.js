import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const calLNotificationAPI = (page = 1, limit=10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.NOTIFICATION.GET}`, 
    {
      params: {
        page: page,
        limit: limit,
        search: search,
      }
    }
    );
  };
};

export const calLAddNotificationAPI = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.NOTIFICATION.POST}`, 
     data
    );
  };
};


export const callDeleteNotificationApi = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.delete(`${constants.API.NOTIFICATION.DELETE}${id}`, 

    );
  };
}
// export const callUpdateEventsApi = (  
//   event_id,
//   title,
//   description,
//   image,
//   date,
//   time,
//   location ) => {
//   return (_dispatch, _getState) => {
//     console.log("title", title);
    
//     return fetchClient.post(`${constants.API.EVENTS.UPDATE}`,
    
//       event_id,
//       title,
//       description,
//       image,
//       date,
//       time,
//       location 
  
//     );
//   };
// };


// export const callEventsDetail = ( event_id ) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.post(`${constants.API.EVENTS.DETAILS}`,
//     {
//       event_id
//     }
//     );
//   };
// };

