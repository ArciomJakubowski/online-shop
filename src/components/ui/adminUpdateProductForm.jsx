import React, { useState, useEffect } from "react";
import TextField from "../form/textField";
import TextAreaField from "../form/textareaField";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductById,
    getProducts,
    loadProductsList,
    updateProduct
} from "../../store/products";
import { useHistory, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import SelectField from "../form/selectField";

const initialState = {
    id: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    images: "",
    thumbnail: "",
    title: ""
};

const AdminUpDateProductForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(getProducts());

    const { edit: id } = useParams();

    console.log("id", id);

    // Получение продукта для редактирования
    const productById = useSelector(getProductById(id));
    console.log("productById", productById);

    const [productChange, setProductChange] = useState(initialState);
    console.log("productChange", productChange);

    // const [formType, setFormType] = useState("createProduct");

    useEffect(() => {
        productById && setProductChange(productById);
    }, []);

    // const productByID = JSON.parse(localStorage.productId);
    // console.log("productByID", productByID);

    useEffect(() => {
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

    // Для отключения кнопоки Принять в форме
    const isNotValid = Object.values(productChange).includes("");

    // Для отключения кнопки Отмена в форме
    const NotValid = Object.values(productChange).every((item) => item === "");

    // const isValid = productChange.length === undefined;
    // const isValid = Object.keys(productChange).length > 0;
    console.log("LENGTH", productChange.length);

    const handleClickCancel = () => {
        history.push("/admin");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!isValid) return;
        // if (productChange) {
        dispatch(updateProduct(productChange));
        // }
        clearForm();
        history.push("/admin");
    };

    return (
        <div className="container mt-5">
            <h1 className="p-3 fw-normal text-black col-5 m-3 mb-auto m-auto ">
                Редактировать продукт
            </h1>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 mb-3">
                    <div className="m-3">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Порядковый номер"
                                name="id"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.id}
                            />
                            <TextField
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
                                label="price"
                                name="price"
                                type="text"
                                onChange={handleProducts}
                                value={productChange.price}
                            />
                            <TextField
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
                                disabled={NotValid}
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

export default AdminUpDateProductForm;
