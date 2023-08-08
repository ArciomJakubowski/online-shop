import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, []);
    return <h1>Loading...</h1>;
};

export default LogOut;
