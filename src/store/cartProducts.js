import { createSlice, createAction } from "@reduxjs/toolkit";
import cartsService from "../services/cart.service";

const cartProductsSlice = createSlice({
    name: "carts",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        carProductsRequested: (state) => {
            state.isLoading = true;
        },
        cartProductsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        cartProductsFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productInCartAdded: (state, action) => {
            // state.entities.push(action.payload);
            // state.entities = [...state.entities, action.payload];
            // state.entities = [];
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        productInCartRemoved: (state, actions) => {
            state.entities = state.entities.filter(
                (p) => p.id !== actions.payload
            );
        },
        productInCartUpdate: (state, actions) => {
            state.entities[
                state.entities.findIndex((c) => c.id === actions.payload.id)
            ] = actions.payload;
        }
    }
});

const { reducer: cartProductsReducer, actions } = cartProductsSlice;
const {
    carProductsRequested,
    cartProductsReceved,
    cartProductsFailed,
    productInCartAdded,
    productInCartRemoved,
    productInCartUpdate
} = actions;

const addProductInCardRequested = createAction(
    "cartProducts/addProductInCardRequested"
);
const removeProductInCardRequested = createAction(
    "cartProducts/removeProductInCardRequested"
);
const updateProductInCardRequested = createAction(
    "cartProducts/updateProductInCardRequested"
);

export const loadCartList = () => async (dispatch) => {
    dispatch(carProductsRequested());
    try {
        const data = await cartsService.get();
        console.log("корзина", data);
        dispatch(cartProductsReceved(data));
    } catch (error) {
        dispatch(cartProductsFailed(error.message));
    }
};

export const addProductInCart = (payload) => async (dispatch) => {
    dispatch(addProductInCardRequested());
    try {
        const data = await cartsService.create(payload);
        console.log("ДАта", data);
        dispatch(productInCartAdded(data));
    } catch (error) {
        dispatch(cartProductsFailed(error.message));
    }
};

export const removeProductInCard = (productId) => async (dispatch) => {
    dispatch(removeProductInCardRequested());
    try {
        const data = await cartsService.delete(productId);
        console.log("dataDeleted", data);
        // if (data === null) {
        dispatch(productInCartRemoved(productId));
        // }
    } catch (error) {
        dispatch(cartProductsFailed(error.message));
    }
};

export const updateProductInCart = (content) => async (dispatch) => {
    dispatch(updateProductInCardRequested);
    try {
        const data = await cartsService.update(content);
        console.log(data);
        dispatch(productInCartUpdate(data));
    } catch (error) {
        dispatch(cartProductsFailed(error.message));
    }
};

export const getCarts = () => (state) => state.carts.entities;
export const getCartLoading = () => (state) => state.carts.isLoading;

export default cartProductsReducer;
