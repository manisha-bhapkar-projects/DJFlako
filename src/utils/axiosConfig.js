import axios from "axios";
import constants from "./constants";
// import history from "./history";
import {getAuthToken} from "./storage";
const fetchClient = () => {
  const defaultOptions = {
    // baseURL:` https://djflakoapp.com/dj-flako/api/admin/`,
    baseURL: `${constants.API.BASEURL.URL}`,
  };																									
  // Create instance
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
 return instance;
};

export default fetchClient();


