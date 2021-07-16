import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const calLEventAPI = (page = 1, limit=10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.EVENTS.GET}`, 
      {
        page: page,
        limit: limit,
        search: search,
        },
    );
  };
};


export const calLAddEventAPI = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.EVENTS.POST}`, 
     data
    );
  };
};


export const callDeleteEventApi = (event_id) => {
  console.log('event', event_id);
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.EVENTS.DELETE}`, 
    {
      event_id
    }
    );
  };
};
export const callUpdateEventsApi = (  
  event_id,
  title,
  description,
  image,
  date,
  time,
  location ) => {
  return (_dispatch, _getState) => {
    console.log("title", title);
    
    return fetchClient.post(`${constants.API.EVENTS.UPDATE}`,
    
      event_id,
      title,
      description,
      image,
      date,
      time,
      location 
  
    );
  };
};


export const callEventsDetail = ( event_id ) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.EVENTS.DETAILS}`,
    {
      event_id
    }
    );
  };
};

