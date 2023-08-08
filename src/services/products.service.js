import httpService from "./http.service";

const productsEndpoint = "products/";

const productsService = {
    get: async () => {
        const { data } = await httpService.get(productsEndpoint);
        return data;
    },
    delete: async (productId) => {
        const { data } = await httpService.delete(productsEndpoint + productId);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productsEndpoint + payload.id,
            payload
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            productsEndpoint + payload.id,
            payload
        );
        return data;
    }
};

export default productsService;
