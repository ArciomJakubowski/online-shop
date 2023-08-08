import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NavBar from "../../ui/navBar";
import { useLocation, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import BreadCrumbs from "../../ui/breadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductById,
    getProducts,
    loadProductsList,
    updateProduct
} from "../../../store/products";
import {
    addProductInCart,
    getCarts,
    // getCarts,
    loadCartList
} from "../../../store/cartProducts";
import {
    createFavorites,
    getFavorites,
    loadFavoritesList,
    removeFavorites
} from "../../../store/favoritesProducts";
import { getCurrentUserId } from "../../../store/users";

const ProductPage = ({ id }) => {
    const [isInArray, setIsInArray] = useState(false);
    console.log("isInArray!!!!!!!", isInArray);
    console.log("id", id);

    const dispatch = useDispatch();
    // const cart = useSelector(getCarts());

    const authCurrentUserId = useSelector(getCurrentUserId());

    const products = useSelector(getProducts());

    const currentProduct = useSelector(getProductById(id));

    const favoriteProducts = useSelector(getFavorites());

    // Корзина зарегистрированного пользователя
    const cart = useSelector(getCarts());
    const cartAuthUser = cart.filter((c) => c.userId === authCurrentUserId);

    // Избранное зарегистрированного пользователя
    const favoritesAuthUser =
        favoriteProducts &&
        favoriteProducts.filter((c) => c.userId === authCurrentUserId);
    console.log("favoritesAuthUser", favoritesAuthUser);

    // console.log("authId", authCurrentUserId);
    // console.log("favoriteProducts", favoriteProducts);
    console.log("CURRENTPRODUCT", currentProduct);
    // console.log("CURRENTPRODUCTtrans", {
    //     ...currentProduct,
    //     stock: currentProduct.stock - 1
    // });
    console.log(products);
    // console.log([cartAuthUser]);

    const location = useLocation();
    const history = useHistory();

    console.log("location", location);

    const [favorites, setFavorites] = useState(false);

    // console.log("favor", favorites);

    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadCartList());
        dispatch(loadFavoritesList());
    }, [dispatch, isInArray, favorites, cartAuthUser.length]);

    const selectFavorites = (data) => {
        console.log("dataSelected", data.id);
        // setFavorites((prevState) => !prevState);

        if (!favorites) {
            console.log("!FAVORITES");
            setFavorites(true);
            dispatch(
                createFavorites({
                    ...data,
                    id: nanoid(),
                    productId: Number(id),
                    userId: authCurrentUserId
                })
            );
        } else {
            const favProduct = favoritesAuthUser.find(
                (fp) => fp.productId === currentProduct.id
            );
            console.log("favProduct", favProduct);
            setFavorites(false);
            dispatch(removeFavorites(favProduct.id));
        }
    };

    const handleClick = () => {
        // console.log("Click");
        history.push("/products");
    };
    // console.log("HEllo Artsiom");

    // const getProducts = async () => {
    //     const response = await fetch("https://dummyjson.com/products");
    //     const data = await response.json();
    //     setProducts(data.products);
    // };

    // useEffect(() => {
    //     getProducts();
    // }, []);

    // if (products) {
    // function getProductById(prodId) {
    //     return products.find((p) => p.id === Number(prodId));
    // }

    useEffect(() => {
        // Блокировка  повторного нажатия кнопки "добавить в корзину"
        if (cart) {
            for (const c of cartAuthUser) {
                if (c.productId === currentProduct.id) setIsInArray(true);
            }
        }

        // Отработка значка Favorites
        if (favoriteProducts) {
            for (const f of favoriteProducts) {
                if (f.productId === currentProduct.id) setFavorites(true);
                if (f.userId !== authCurrentUserId) setFavorites(false);
            }
        }
    }, []);

    if (currentProduct) {
        const handleAddProduct = (data) => {
            // console.log("handle");
            console.log("handledata", data);
            if (isInArray) return;
            // Отмена повторного добаления товара в корзину
            // cart.forEach((el) => {
            //     if (el.id === data.id) setIsInArray(true);
            // });
            // console.log("isInArray", isInArray);

            // if (!isInArray) {
            // cart.forEach((el) => {
            //     if (el.id === data.id) return;
            // });
            dispatch(
                addProductInCart({
                    id: nanoid(),
                    productId: currentProduct.id,
                    title: currentProduct.title,
                    thumbnail: currentProduct.thumbnail,
                    price: currentProduct.price,
                    quantity: 1,
                    total: currentProduct.stock - 1,
                    userId: authCurrentUserId
                })
            );

            dispatch(
                updateProduct({
                    ...currentProduct,
                    stock: currentProduct.stock - 1
                })
            );
            setIsInArray(true);
            // }
        };

        return (
            <>
                <NavBar id={id} />
                <div className="breadcrumbs">
                    <BreadCrumbs location={location} id={id} />
                </div>
                <div className="container ">
                    {/* <div className="row gutters-sm justify-content-end "> */}
                    <div className="card mb-3 ">
                        <div className="card-body position-relative  ">
                            <img
                                className=" shadow-1-strong me-3"
                                src={currentProduct.thumbnail}
                            />
                        </div>

                        <div className="d-flex card mb-3 position-absolute top-0 end-0 col-md-4 me-3 mt-3">
                            <div className="card-body">
                                {!isInArray && (
                                    <a
                                        className="d-flex justify-content-end mb-3"
                                        onClick={() => {
                                            selectFavorites(currentProduct);
                                        }}
                                    >
                                        <i
                                            className={
                                                "bi bi-heart" +
                                                (favorites === true
                                                    ? "-fill"
                                                    : "")
                                            }
                                        ></i>
                                    </a>
                                )}
                                <div className="d-flex flex-column align-items-center text-center ">
                                    <h1>{currentProduct.title}</h1>
                                    <p>{currentProduct.description}</p>
                                    <p className="text-success">
                                        Доступно {currentProduct.stock} шт.
                                    </p>
                                    <button
                                        className="btn btn-danger"
                                        disabled={isInArray}
                                        onClick={() => {
                                            handleAddProduct(currentProduct);
                                        }}
                                    >
                                        Добавить в корзину
                                    </button>
                                    <p className="d-flex mt-3 ms-auto p-2 ">{`ProductId: ${id}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={handleClick}>
                        {" "}
                        <i className="bi bi-caret-left"></i>Назад
                    </button>
                </div>
            </>
        );
    } else {
        <h1>Loading</h1>;
    }
};

ProductPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default ProductPage;

// const currentLink = [];
// const crumbs = lacation.pathname
//     .split("/")
//     .filter((crumb) => crumb !== "")
//     .map((crumb) => {
//         currentLink.push(`/${crumb}`);
//         return (
//             <div className="crumb" key={crumb}>
//                 <Link to={currentLink.join("")}>{crumb}</Link>
//             </div>
//         );
//     });
// console.log(crumbs);

// productsInCart={productsInCart}
