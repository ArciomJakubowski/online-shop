import React, { useEffect } from "react";
import imageLogo from "../image/Logo.jpg";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarts, loadCartList } from "../../store/cartProducts";
import { getFavorites } from "../../store/favoritesProducts";
// import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";
import {
    getCurrentUserData,
    getCurrentUserId,
    getIsLoggedIn
} from "../../store/users";

const NavBar = ({ onChange, value: searchQuery, id: Id, products }) => {
    const history = useHistory();
    // console.log("value", searchQuery);
    // console.log("onChange", onChange);
    console.log("products", products);
    console.log("Id", Id);
    // console.log("productsInCart", productsInCart.length);
    const dispatch = useDispatch();
    const cart = useSelector(getCarts());
    const favoriotes = useSelector(getFavorites());
    // const { currentUser } = useAuth();
    const isLoggedIn = useSelector(getIsLoggedIn());
    // console.log("currentUser", currentUser);

    // data авторизованного юзера
    const currentUserData = useSelector(getCurrentUserData());
    console.log("currentUserData", currentUserData);

    // Товары корзины у зарегистрированного пользователя
    const currentUserId = useSelector(getCurrentUserId());
    const filterProductInNavAuthUser =
        currentUserId && cart.filter((c) => c.userId === currentUserId);
    // console.log("filterProductInNavAuthUser", filterProductInNavAuthUser);

    // Избранные товары у зарегистрированного юзера
    const favoritesAuthUser =
        favoriotes && favoriotes.filter((f) => f.userId === currentUserId);
    console.log("favoritesAuthUser", favoritesAuthUser);

    useEffect(() => {
        dispatch(loadCartList());
    }, [dispatch]);

    // console.log("cart", cart);
    if (!cart) return "Loading...";
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        className="rounded-pill"
                        src={imageLogo}
                        alt="logo"
                        width="100px"
                        height="75px"
                    />
                </Link>
                {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {!products && (
                                <Link
                                    // className="nav-link active "
                                    className="link-underline link-underline-opacity-0"
                                    // aria-current="page"
                                    to="/products"
                                >
                                    Каталог
                                </Link>
                            )}
                        </li>
                    </ul>
                    {!Id && (
                        <div className="d-flex mx-auto p-2 ">
                            <input
                                className="form-control me-2"
                                type="text"
                                placeholder="Search"
                                id="searchQuery"
                                name="searchQuery"
                                onChange={onChange}
                                value={searchQuery}
                            />
                            {/* <button
                            className="btn btn-outline-success"
                            type="submit"
                        >
                            Search
                        </button> */}
                        </div>
                    )}

                    <ul className=" nav d-flex">
                        {currentUserData?.name !== "admin" ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders">
                                        Заказы
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link position-relative"
                                        to="/cart"
                                    >
                                        Корзина
                                        {filterProductInNavAuthUser?.length >
                                            0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {
                                                    filterProductInNavAuthUser.length
                                                }
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link position-relative"
                                        to="/favorites"
                                    >
                                        Избранное
                                        {favoritesAuthUser?.length > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {favoritesAuthUser.length}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            </>
                        ) : (
                            // <li className="nav-item">
                            //     <Link className="nav-link" to="/admin">
                            //         Dashboard
                            //     </Link>
                            // </li>
                            history.push("/admin")
                        )}

                        <li className="nav-item">
                            {isLoggedIn ? (
                                <NavProfile />
                            ) : (
                                <Link className="nav-link" to="/login">
                                    Профиль
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    currentProduct: PropTypes.object,
    productsInCart: PropTypes.array,
    products: PropTypes.array
};

export default NavBar;
