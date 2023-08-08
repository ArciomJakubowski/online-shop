import axios from "axios";
import configureFile from "../config.json";
import authService from "./auth.service";
// import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: configureFile.apiEndpoint
});

// axios.defaults.baseURL = "https://dummyjson.com/";

http.interceptors.request.use(
    async function (config) {
        if (configureFile.isFireBase) {
            const contianSlash = /\/$/gi.test(config.url);
            config.url =
                (contianSlash ? config.url.slice(0, -1) : config.url) + ".json";
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                // const { data } = await httpAuth.post("token", {
                //     grant_type: "refresh_token",
                //     refresh_token: refreshToken
                // });
                const data = await authService.refresh();
                console.log(data);
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
        }
        console.log(config.url);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    console.log("datA", data);
    return data && !data.id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data || [];
    // было []
}

http.interceptors.response.use(
    (res) => {
        console.log(res);
        console.log(res.data);
        if (configureFile.isFireBase) {
            console.log("interceptors", res.data);

            res.data = transformData(res.data);
            console.log("res.data after transform", res.data);
            // Object.keys(res.data)
            // transformData(res.data);
            // res.data = { content: transformData(res.data) };

            // console.log(res);
            // res.data = res.data.slice(res.data[1], res.data.lenth);
            // res.data = res.data.slice(1, res.data.lenth);

            // if (res.data !== null) return res;
        }
        return res;
    },
    function (error) {
        // console.log("interceptor");
        const expeftedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expeftedErrors) {
            // logger.log(error);
            console.log(error);
            // toast.error("Something wrong . Try  it later.");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    put: http.put,
    delete: http.delete,
    post: http.post,
    patch: http.patch
};

export default httpService;
