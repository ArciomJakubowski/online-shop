import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import cartProductsReducer from "./cartProducts";
import favoritesReducer from "./favoritesProducts";
import usersReducer from "./users";

const rootReducer = combineReducers({
    products: productsReducer,
    carts: cartProductsReducer,
    favorites: favoritesReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
