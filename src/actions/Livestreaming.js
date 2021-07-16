import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callLiveStreamingAPI = () => {
    return (_dispatch) => {
        return fetchClient.get(`${constants.API.LIVESTREAMING.GET}`);
    };
};

export const callUpdateLiveStreamingAPI = (link, adv_link, live_status) => {
    return (_dispatch) => {
        return fetchClient.post(`${constants.API.LIVESTREAMING.POST}`
            , {link, adv_link, live_status}
        );
    }
}