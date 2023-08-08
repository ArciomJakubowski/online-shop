import React from "react";
import PropTypes from "prop-types";
import Product from "./product";

const ProductDisplay = ({ products, productCrop, onSort, ...rest }) => {
    return (
        <div className="d-flex flex-nowrap m-auto">
            {productCrop.map((product) => (
                <Product {...product} {...rest} key={product.id} />
            ))}
        </div>
    );
};

ProductDisplay.propTypes = {
    productCrop: PropTypes.array.isRequired,
    products: PropTypes.array,
    onSort: PropTypes.func
};

export default ProductDisplay;
