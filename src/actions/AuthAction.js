import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callLoginApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.LOGIN.LOGIN}`, data, {
    
    });
  };
};

// export const callForgotPasswordApi = (data) => {
//   console.log('email',data);
  
//   return (_dispatch, _getState) => {
//     return fetchClient.post(`${constants.API.LOGIN.FORGOTPASSWORD_EMAIL}`, data,
     
//     );
//   };
// };


// export const callChangePasswordApi = (data) => {
//   console.log('change pass', data);
  
//   return (_dispatch, _getState) => {
//     return fetchClient.post(`${constants.API.LOGIN.CHANGE_PASSWORD}`, 
//      data
//     );
//   };
// };

export const callLogoutApi = () => {
  return (_dispatch, _getState) => {
      return fetchClient.get(
          `${constants.API.LOGIN.LOGOUT}`,
         
      );
  };
};