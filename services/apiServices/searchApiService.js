import { API_HOST } from "./config";

export const searchAPI = {
    SEARCH_QUERY: ( query ) => `${API_HOST}/landmarks/search/${query}`
};