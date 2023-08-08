import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, removeProduct } from "../../../store/products";
import { useHistory } from "react-router-dom";

const AdminPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProducts());
    const history = useHistory();

    // Переадрессация на форму обновления продукта
    const handleOpenUpdateProductForm = (id) => {
        history.push(`admin/${id}`);
    };

    // Удаление продукта из списка
    const handleDelete = (id) => {
        dispatch(removeProduct(id));
    };

    // Переадрессация на форму создания продукта
    const handleOpenCreateProductForm = (e) => {
        history.push("/admin/edit/create");
    };

    // Выход из admin page
    const handleReturn = () => {
        history.push("/logout");
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <h1 className="m-3">AdminPage</h1>
                <button className="btn btn-primary m-2" onClick={handleReturn}>
                    Выйти
                </button>
            </div>
            <button
                className="btn btn-primary mt-5 ms-5"
                onClick={handleOpenCreateProductForm}
            >
                <i className="bi bi-plus-circle"></i>
            </button>
            <div className="d-flex justify-content-center">
                <div className=" d-flex card col-11 m-3 p-3 ">
                    <table className="card-table">
                        <thead>
                            <tr>
                                <th scope="col">Number</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Title</th>
                                <th scope="col">Foto</th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td className="fw-bolder">{p.brand}</td>
                                        <td>{p.category}</td>
                                        <td>{p.description}</td>
                                        <td>{p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.title}</td>
                                        <td>
                                            {/* {Array.isArray(p.images)
                                                ? p.images.map((pi) => (
                                                      <ul key={pi}>
                                                          <li>{pi}</li>
                                                      </ul>
                                                  ))
                                                : p.images} */}
                                            {p.thumbnail}
                                        </td>
                                        <td>
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Basic outlined example"
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-light"
                                                    onClick={() =>
                                                        handleOpenUpdateProductForm(
                                                            p.id
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-brush-fill text-warning"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-light"
                                                    onClick={() =>
                                                        handleDelete(p.id)
                                                    }
                                                >
                                                    <i className="bi bi-x-circle text-danger"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
