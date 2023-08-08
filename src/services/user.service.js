import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "users/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload.id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    upDate: async (content) => {
        const { data } = await httpService.patch(
            userEndpoint + localStorageService.getUserId(),
            content
        );
        return data;
    }
};

export default userService;
