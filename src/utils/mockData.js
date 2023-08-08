import { useState, useEffect } from "react";
import httpService from "../services/http.service";
import users from "../mockData/users.json";
import products from "../mockData/products.json";
import carts from "../mockData/carts.json";

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = carts.length + users.length + products.length;

    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const upDateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }

        const newProgress = Math.floor((count / summuryCount) * 100);

        if (progress < newProgress) {
            setProgress(() => newProgress);
        }

        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        return upDateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prod of products) {
                await httpService.put("products/" + prod.id, prod);
                incrementCount();
            }
            for (const user of users) {
                await httpService.put("users/" + user.id, user);
                incrementCount();
            }
            for (const cart of carts) {
                await httpService.put("carts/" + cart.id, cart);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialize, progress, status };
};

export default useMockData;
