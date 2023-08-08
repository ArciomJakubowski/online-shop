import React from "react";
import { Redirect, Route } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../store/users";

const ProtectedRouteForAdminPage = ({
    component: Component,
    children,
    ...rest
}) => {
    const currentUserID = useSelector(getCurrentUserId());

    const currentUser =
        currentUserID && useSelector(getUserById(currentUserID));

    return (
        <Route
            {...rest}
            render={(props) => {
                if (currentUser?.name !== "admin") {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRouteForAdminPage.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRouteForAdminPage;
