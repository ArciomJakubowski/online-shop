import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestedFailed: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        authRequested: (state) => {
            state.error = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (u) => u.id !== action.payload
            );
        },
        userUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u.id === action.payload.id)
            ] = action.payload;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;

const {
    usersRequested,
    usersReceved,
    usersRequestedFailed,
    userCreated,
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    // userRemoved,
    userUpdated
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateReguested = createAction("users/userCreateReguested");
const userCreateFailed = createAction("users/userCreateFailed");
// const userRemoveReguested = createAction("userRemoveReguested");
const userUpdateReguested = createAction("userUpdateReguested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const signIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            console.log("dataLoginUser", data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            console.log(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                authRequestFailed(error.message);
            }
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            console.log("dataUserAuth", data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    id: data.localId,
                    name,
                    email,
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const data = await userService.get();
        console.log("dataUserList", data);
        dispatch(usersReceved(data));
    } catch (error) {
        dispatch(usersRequestedFailed(error.message));
    }
};

export const updateData = (payload) => async (dispatch) => {
    dispatch(userUpdateReguested());
    try {
        const content = await userService.upDate(payload);
        console.log("dataUpdateUser", content);
        dispatch(userUpdated(content));
        history.push(`/users/${content.id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateReguested());
    try {
        const { content } = await userService.create(payload);
        console.log("USERcontent", content);
        dispatch(userCreated(content));
        history.push("/products");
    } catch (error) {
        dispatch(userCreateFailed(error.message));
    }
};

export const logout = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const getCurrentUserData = () => (state) => {
    // console.log("UsersData", state.users.entities);
    // console.log("auth", typeof state.users.auth.userId);
    // console.log("state.users", state.users);

    return state.users.entities && state.users.auth
        ? state.users.entities.find((u) => u.id === state.users.auth.userId)
        : null;
};

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        console.log("state.users.entitiesInStore", state.users.entities);
        return state.users.entities.find((u) => u.id === userId);
    }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoading = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserId = () => (state) =>
    state.users.auth && state.users.auth.userId;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
