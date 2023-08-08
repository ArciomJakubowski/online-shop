import httpService from "./http.service";

const favoritesEndpoint = "favorites/";

const favoritesService = {
    get: async () => {
        const { data } = await httpService.get(favoritesEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            favoritesEndpoint + payload.id,
            payload
        );
        return data;
    },
    delete: async (favoritesId) => {
        const { data } = await httpService.delete(
            favoritesEndpoint + favoritesId
        );
        return data;
    }
};

export default favoritesService;
