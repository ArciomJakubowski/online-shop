import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    console.log(currentUser);
    const [, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp?`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                id: data.localId,
                name,
                email,
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
            console.log(data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
            setError(message);
        }
    }

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword?`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            console.log(data);
            setTokens(data);
            getUserData();
        } catch (error) {
            console.log(error.response.data);
            const { code, message } = error.response.data.error;

            if (code === 400) {
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                        throw new Error(
                            "Пользователь с таким Email не существует"
                        );

                    case "INVALID_PASSWORD":
                        throw new Error(
                            "Пользователь с таким Email не существует"
                        );

                    default:
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте повторить позже."
                        );
                }
            }
        }
    }

    async function createUser(data) {
        console.log(data);
        try {
            const { content } = await userService.create(data);
            console.log("content", content);
            setUser(content);
        } catch (error) {
            const { message } = error.response.data;
            setError(message);
        }
    }

    async function getUserData() {
        try {
            const content = await userService.getCurrentUser();
            console.log("content", content);
            setUser(content);
        } catch (error) {
            const { message } = error.response.data.error;
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signUp, currentUser, signIn, logOut }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
