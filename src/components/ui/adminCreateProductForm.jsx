import React, { useState, useEffect } from "react";
import TextField from "../form/textField";
import TextAreaField from "../form/textareaField";
import { useDispatch, useSelector } from "react-redux";
import {
    createProduct,
    getProducts,
    loadProductsList
} from "../../store/products";
import { useHistory } from "react-router-dom";
import SelectField from "../form/selectField";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    // images: "",
    thumbnail: "",
    title: ""
};

const AdminCreateProductForm = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProducts());
    const history = useHistory();
    console.log(history);

    const [productChange, setProductChange] = useState(initialState);
    console.log("productChange", productChange);

    // const [formType, setFormType] = useState("createProduct");

    // const productByID = JSON.parse(localStorage.productId);
    // console.log("productByID", productByID);

    useEffect(() => {
        // if (productByID) {
        //     setProductChange(productByID);
        //     setFormType("updateProduct");
        // }
        dispatch(loadProductsList());
    }, [dispatch]);

    const handleProducts = (target) => {
        setProductChange((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setProductChange(initialState);
    };

    // Категории товаров
    const category = products && products.map((product) => product.category);
    const uniqProductCategory = [...new Set(category)];
    const transformArrayCategory = uniqProductCategory.map((upc) => ({
        id: nanoid(),
        value: upc,
        label: upc
    }));
    console.log("uniqProductCategory", uniqProductCategory);
    console.log("transformArrayCategory", transformArrayCategory);

    // Для отключения кнопоки Принять в форме
    const isNotValid = Object.values(productChange).includes("");

    // Для отключения кнопки Отмена в форме
    // const NotValid = Object.values(productChange).every((item) => item === "");

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!isValid) return;
        // console.log(productChange);

        const transformationData = [productChange].map((p) => ({
            brand: p.brand,
            category: p.category,
            description: p.description,
            id: Number(p.id),
            // images: p.images.split(","),
            thumbnail: p.thumbnail,
            price: Number(p.price),
            stock: Number(p.stock),
            title: p.title
        }));
        // console.log("transformationData", transformationData);
        dispatch(createProduct(...transformationData));
        clearForm();
        history.push("/admin");
    };

    // const isValid = productChange.length === undefined;
    // const isValid = Object.keys(productChange).length > 0;
    console.log("LENGTH", productChange.length);

    const handleClickCancel = () => {
        history.push("/admin");
    };

    return (
        <div className="container mt-5">
            <h1 className="p-3 fw-normal text-black col-5 mb-auto m-auto">
                Создать продукт
            </h1>
            <div className="row my-2">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <div className="m-3">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                placeholder="Пример: 1234"
                                label="Number"
                                name="id"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.id}
                            />
                            <TextField
                                placeholder="Пример: Apple"
                                label="brand"
                                name="brand"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.brand}
                            />
                            {/* <TextField
                                label="category"
                                name="category"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.category}
                            /> */}
                            <SelectField
                                label="category"
                                name="category"
                                defaultOption="Choose..."
                                options={transformArrayCategory}
                                value={productChange.category}
                                onChange={handleProducts}
                            />
                            <TextField
                                label="description"
                                name="description"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.description}
                            />
                            <TextField
                                placeholder="Пример: 1234"
                                label="price"
                                name="price"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.price}
                            />
                            <TextField
                                placeholder="Пример: 1234"
                                label="stock"
                                name="stock"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.stock}
                            />
                            <TextField
                                label="title"
                                name="title"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.title}
                            />
                            <TextAreaField
                                placeholder="Пример: https://avatars.dicebear.com/api/avataaars/f3kk3l.svg"
                                label="thumbnail"
                                name="thumbnail"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.thumbnail}
                            />

                            <button
                                disabled={isNotValid}
                                className="btn btn-success"
                            >
                                <i className="bi bi-check2"></i>
                            </button>
                            <button
                                // disabled={NotValid}
                                className=" btn btn-danger m-4 "
                                onClick={handleClickCancel}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCreateProductForm;
