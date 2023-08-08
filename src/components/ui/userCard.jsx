import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { loadUsersList } from "../../store/users";

const UserCard = ({ items }) => {
    console.log("items", items);
    const history = useHistory();

    useEffect(() => {
        loadUsersList();
    }, [items]);

    // const { currentUser } = useAuth();

    // const currentUser = useSelector(getCurrentUserData());
    // const currentUserId = useSelector(getCurrentUserId());

    const handleOpenFormUser = () => {
        history.push(`/users/${items._id}/edit`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                {
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleOpenFormUser}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                }

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={items.image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                    <div className="mt-3">
                        <h4>{items.name}</h4>
                        <h5>{items.email}</h5>
                        <p className="text-secondary mb-1">Sex: {items.sex}</p>
                        {/* <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{items.rate}23</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    items: PropTypes.object
};

export default UserCard;
