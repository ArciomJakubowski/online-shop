import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    getCartLoading,
    getCarts,
    loadCartList,
    removeProductInCard,
    updateProductInCart
} from "../store/cartProducts";
import { getProducts, updateProduct } from "../store/products";
import { getCurrentUserId } from "../store/users";
// import ButtonsChangeQuantity from "./ui/buttonsChangeQuantity";

const Cart = () => {
    const currentUserId = useSelector(getCurrentUserId());
    // console.log("currentUserId", currentUserId);

    const products = useSelector(getProducts());
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(getCarts());
    console.log("cart", cart);

    // Корзина зарегистрированного пользователя
    const cartAuthUser = cart && cart.filter((c) => c.userId === currentUserId);

    const isLoading = useSelector(getCartLoading());

    console.log("cartAuthUser", cartAuthUser);
    console.log(isLoading);
    // console.log("history", history);
    // console.log("cart", cart);
    // console.log("products", products);

    const handlePushToMainPage = () => {
        history.push("/products");
    };

    useEffect(() => {
        console.log("LoadCartList");
        dispatch(loadCartList());
    }, [dispatch, cart.length]);

    if (cartAuthUser) {
        // const arr = Object.values(cart);

        // console.log("arr", arr.length);

        // const arrayProducts = [];
        // for (let i = 0; i < cart.length; i++) {
        //     for (const products of cart[i].products) {
        //         arrayProducts.push(products);
        //     }
        // }
        // console.log("arrayProducts", arrayProducts);

        useEffect(() => {
            for (const cp of cartAuthUser) {
                // console.log({ cp });
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
        }, [cart]);

        // Подсчет суммы товаров
        let summ = 0;
        cartAuthUser.forEach((p) => (summ += p.price * p.quantity));
        // console.log("summ", summ);

        // Измененение количества товаров
        const handleChangeQuantity = (item, quantity, total) => {
            // console.log("ITEM", item);
            // const index = products.findIndex((p) => p.id === item.id);
            // console.log("object", products[index]);
            // console.log("findById", index);
            dispatch(updateProductInCart({ ...item, quantity, total }));
            // dispatch(updateProduct({...products[index], stock: productById[index].stock }))
        };

        // Удаление товара из корзины
        const handleDelete = (pId, id) => {
            console.log("pId", pId);
            console.log("pId", typeof pId);
            console.log("id", id);
            console.log("id", typeof id);
            console.log("cartAuthUser", cartAuthUser);
            const index = cartAuthUser.findIndex((c) => c.productId === pId);
            console.log("index", index);
            console.log("cartById!!", cartAuthUser[index]);
            // const productById = products.filter((p) => p.id === pId);
            // console.log("productById[0]", productById[0]);
            const productIndex = products.findIndex((p) => p.id === pId);
            console.log("productIndex", productIndex);
            const modifyData = {
                ...products[productIndex],
                stock:
                    products[productIndex].stock + cartAuthUser[index].quantity
            };
            console.log("modifyData", modifyData);
            dispatch(updateProduct(modifyData));
            dispatch(removeProductInCard(id));
        };

        return (
            <>
                <div className=" d-flex container p-2 m-2">
                    <button
                        className="btn btn-primary"
                        onClick={handlePushToMainPage}
                    >
                        Назад
                    </button>
                    <h3 className="p-3 fw-normal mt-3 text-black m-auto">
                        Корзина
                    </h3>
                </div>
                {!cartAuthUser?.length ? (
                    <div className="ms-auto p-3">
                        <h1>Корзина пуста</h1>
                    </div>
                ) : (
                    <div>
                        {cartAuthUser.map(
                            (c) =>
                                c.userId === currentUserId && (
                                    <section key={c.id} className="h-100">
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
                                                                            c.thumbnail
                                                                        }
                                                                        className="img-fluid rounded-3"
                                                                        alt="Cotton T-shirt"
                                                                    />
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                                    <p className="lead fw-normal mb-2">
                                                                        {
                                                                            c.title
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                    {/* <ButtonsChangeQuantity
                                                        quantity={c.quantity}
                                                        onChange={handleChange}
                                                    /> */}
                                                                    <div className=" card-counter mb-3 m-2">
                                                                        <button
                                                                            disabled={
                                                                                c.total ===
                                                                                0
                                                                            }
                                                                            className="btn btn-primary btn-sm m-2"
                                                                            onClick={() =>
                                                                                handleChangeQuantity(
                                                                                    c,
                                                                                    Math.max(
                                                                                        1,
                                                                                        c.quantity +
                                                                                            1
                                                                                    ),
                                                                                    c.total -
                                                                                        1
                                                                                )
                                                                            }
                                                                        >
                                                                            +
                                                                        </button>
                                                                        <span className="col-md-2">
                                                                            {
                                                                                c.quantity
                                                                            }
                                                                        </span>
                                                                        <button
                                                                            disabled={
                                                                                c.quantity ===
                                                                                1
                                                                            }
                                                                            className="btn btn-primary btn-sm m-2"
                                                                            onClick={() =>
                                                                                handleChangeQuantity(
                                                                                    c,
                                                                                    Math.max(
                                                                                        1,
                                                                                        c.quantity -
                                                                                            1
                                                                                    ),
                                                                                    c.total +
                                                                                        1
                                                                                )
                                                                            }
                                                                        >
                                                                            -
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                    <h5 className="mb-0">
                                                                        {c.price *
                                                                            c.quantity}
                                                                        $
                                                                    </h5>
                                                                </div>
                                                                <div className="col-md-1 col-lg-1 col-xl-1 text-end me-4">
                                                                    <button
                                                                        className="text-danger border border-0 bg-white"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                c.productId,
                                                                                c.id
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
                                )
                        )}
                    </div>
                )}

                <section className="bg-body-secondary p-5 position-relative">
                    <div className="card mb-4  ">
                        <div className="card-body p-4 d-flex flex-row ">
                            <div className="form-outline flex-fill"></div>
                            <div className="  ms-3">
                                <h5>{`Total: ${summ}$`}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="card ">
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button
                                    type="button"
                                    className="btn btn-warning btn-block btn-lg"
                                >
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
};

export default Cart;
