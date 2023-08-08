import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartList } from "../../../store/cartProducts";
import { loadFavoritesList } from "../../../store/favoritesProducts";
import { loadProductsList } from "../../../store/products";
import {
    getIsLoggedIn,
    getUsersLoading,
    loadUsersList
} from "../../../store/users";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const userStatusLoading = useSelector(getUsersLoading());
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        dispatch(loadProductsList());

        if (isLoggedIn) {
            dispatch(loadCartList());
            dispatch(loadFavoritesList());
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);

    if (userStatusLoading) return "Loading...";
    return children;
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
