import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callBookingAPI = (page = 1, limit=10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.BOOKING.GET}`, 
     {
      page: page,
      limit: limit,
      search: search,
      }, 
      );
  };
};


export const callDeleteBookingApi = (booking_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.BOOKING.DELETE}`,
    {
    booking_id
    }
     );
  };
};





