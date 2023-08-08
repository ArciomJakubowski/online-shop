import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProductById } from "../../store/products";

const BreadCrumbs = ({ location, id }) => {
    const currentLink = [];
    const productById = useSelector(getProductById(id));

    return location.pathname
        .split("/")
        .filter((crumb) => crumb !== "")
        .map((crumb) => {
            currentLink.push(`/${crumb}`);
            if (Number(crumb) === productById.id) {
                crumb = productById.title;
            }
            return (
                <div className="crumb" key={crumb}>
                    <Link to={currentLink.join("")}>{crumb}</Link>
                </div>
            );
        });
};

BreadCrumbs.propTypes = {
    location: PropTypes.object.isRequired,
    id: PropTypes.string
};

export default BreadCrumbs;
