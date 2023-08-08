import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Product = ({ id, thumbnail, title, price, description }) => {
    // const { id, thumbnail, title, price, description } = props;
    // console.log("props", props);
    return (
        // <div key={id} className=" d-flex col-4">
        <div key={id} className="card d-flex col-3 ">
            <img
                src={thumbnail}
                className="card-img-top "
                width="150px"
                height="150px"
                alt="product"
            />
            <div className="d-flex flex-column mt-auto card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">${price}</h6>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-ancor d-flex flex-column  mt-auto p-3">
                <Link to={`/products/${id}`} className="btn btn-primary">
                    Открыть карточку
                </Link>
            </div>
        </div>
        // </div>
    );
};

Product.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
};

export default Product;
