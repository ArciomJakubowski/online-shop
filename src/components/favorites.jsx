import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    addProductInCart,
    getCarts,
    loadCartList
} from "../store/cartProducts";
import {
    getFavorites,
    loadFavoritesList,
    removeFavorites
} from "../store/favoritesProducts";
import { getProducts, updateProduct } from "../store/products";
import { getCurrentUserId } from "../store/users";

const Favorites = () => {
    const authCurrentUserId = useSelector(getCurrentUserId());
    console.log("authCurrentUserId", authCurrentUserId);

    const history = useHistory();
    const cart = useSelector(getCarts());
    console.log("cart", cart);
    const products = useSelector(getProducts());
    const favorites = useSelector(getFavorites());
    const dispatch = useDispatch();
    console.log("favorites", favorites);

    // Избранные товары зарегистрированного пользователя
    const favoritesAuthUser =
        favorites && favorites.filter((f) => f.userId === authCurrentUserId);
    console.log("favoritesAuthUser", favoritesAuthUser);

    if (favoritesAuthUser) {
        const handlePushToMainPage = () => {
            history.push("/products");
        };

        const handleDelete = (id) => {
            console.log("id", id);
            dispatch(removeFavorites(id));
        };

        const handleAddFavorites = (data) => {
            console.log("data", data);
            dispatch(
                addProductInCart({
                    id: nanoid(),
                    price: data.price,
                    productId: data.productId,
                    quantity: 1,
                    thumbnail: data.thumbnail,
                    title: data.title,
                    total: data.stock - 1,
                    userId: data.userId
                })
            );

            dispatch(
                updateProduct({
                    brand: data.brend,
                    category: data.category,
                    description: data.description,
                    discountPercentage: data.discountPercentage,
                    id: data.productId,
                    images: data.images,
                    price: data.price,
                    rating: data.rating,
                    stock: data.stock - 1,
                    thumbnail: data.thumbnail,
                    title: data.title
                })
            );
            dispatch(removeFavorites(data.id));
        };

        useEffect(() => {
            dispatch(loadFavoritesList());
            dispatch(loadCartList());
            for (const cp of favoritesAuthUser) {
                console.log({ cp });
                const index =
                    products &&
                    products.findIndex((p) => p.id === cp.productId);
                console.log("index", index);
                const copyObjAndModify = {
                    ...products[index],
                    stock: cp.total
                };
                // console.log("obj", products[index]);
                // console.log("copyObj", copyObjAndModify);
                dispatch(updateProduct(copyObjAndModify));
            }
        }, [dispatch, favorites.length]);
        return (
            <>
                {/* {favorites.map((f) => (
                <h1 key={f.id}>{f.title}</h1>
                <button></button>
            ))}
            <button onClick={handleClick}>Назад</button> */}
                <div className=" d-flex container p-2 m-2">
                    <button
                        className="btn btn-primary"
                        onClick={handlePushToMainPage}
                    >
                        <i className="bi bi-caret-left">Назад</i>
                    </button>
                    <h3 className="p-3 fw-normal mt-3 text-black m-auto">
                        Избранное
                    </h3>
                </div>
                {!favoritesAuthUser.length ? (
                    <div className="ms-auto p-3">
                        <h1>Избранное пусто</h1>
                    </div>
                ) : (
                    <div>
                        {favoritesAuthUser.map((f) => (
                            <section key={f.id} className="h-100">
                                <div className="container h-100 ">
                                    <div className="row d-flex justify-content-center align-items-center h-100">
                                        <div className="col-10">
                                            <div className="d-flex justify-content-between align-items-center mb-4"></div>

                                            <div className="card rounded-3 mb-4 ">
                                                <div className="card-body p-4">
                                                    <div className="row d-flex justify-content-between align-items-center">
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={
                                                                    f.thumbnail
                                                                }
                                                                className="img-fluid rounded-3"
                                                                alt="Cotton T-shirt"
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <p className="lead fw-normal mb-2">
                                                                {f.title}
                                                            </p>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            {/* <ButtonsChangeQuantity
                                                        quantity={c.quantity}
                                                        onChange={handleChange}
                                                    /> */}
                                                            <div className=" card-counter mb-3 m-2"></div>
                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() => {
                                                                    handleAddFavorites(
                                                                        f
                                                                    );
                                                                }}
                                                            >
                                                                Добавить в
                                                                корзину
                                                            </button>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end me-4">
                                                            <button
                                                                className="text-danger border border-0 bg-white"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        f.id
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-basket2-fill fs-3"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </>
        );
    }
};

export default Favorites;
