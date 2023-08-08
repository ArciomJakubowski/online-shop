import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, onItemSelect, selectedItem }) => {
    return (
        <ul className="list-group">
            {items.map((item) => (
                <li
                    className={
                        "list-group-item" +
                        (item === selectedItem ? " active" : "")
                    }
                    key={"item_" + item}
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

GroupList.propTypes = {
    items: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.string
};

export default GroupList;
