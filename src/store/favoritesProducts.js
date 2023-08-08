import { createAction, createSlice } from "@reduxjs/toolkit";
import favoritesService from "../services/favorites.service";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        favoritesRequested: (state) => {
            state.isLoading = true;
        },
        favoritesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        favoritesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        favoritesCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        favoritesRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (f) => f.id !== action.payload
            );
        }
    }
});

const { reducer: favoritesReducer, actions } = favoriteSlice;
const {
    favoritesRequested,
    favoritesReceved,
    favoritesRequestFailed,
    favoritesCreated,
    favoritesRemoved
} = actions;

const createFavoritesRequested = createAction(
    "favorites/createFavoritesRequested"
);
const removeFavoritesRequested = createAction(
    "favorites/removeFavoritesRequested"
);

export const loadFavoritesList = () => async (dispatch) => {
    dispatch(favoritesRequested());
    try {
        const data = await favoritesService.get();
        console.log("dataFavorites", data);
        dispatch(favoritesReceved(data));
    } catch (error) {
        dispatch(favoritesRequestFailed(error.message));
    }
};

export const createFavorites = (content) => async (dispatch) => {
    dispatch(createFavoritesRequested());
    try {
        const data = await favoritesService.create(content);
        console.log("dataCreateFavorites", data);
        dispatch(favoritesCreated(data));
    } catch (error) {
        dispatch(favoritesRequestFailed(error.message));
    }
};
export const removeFavorites = (content) => async (dispatch) => {
    dispatch(removeFavoritesRequested());
    try {
        const data = await favoritesService.delete(content);
        console.log("dataRemoveFavorites", data);
        console.log("contentRemoveFavorites", content);
        dispatch(favoritesRemoved(content));
    } catch (error) {
        dispatch(favoritesRequestFailed(error.message));
    }
};

export const getFavorites = () => (state) => state.favorites.entities;
export const getFavoritesLoading = () => (state) => state.favorites.isLoading;
export const getFavoritesById = (favoritesId) => (state) =>
    state.favorites.entities.find((f) => f.id === favoritesId);

export default favoritesReducer;
