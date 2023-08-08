import React from "react";
import PropTypes from "prop-types";

const SortSelect = ({ value, options, onSort }) => {
  return (
    <div className="d-flex align-items-center p-4">
      <span className="d-block me-2">сортировка</span>
      <select className="form-select" value={value} onChange={onSort}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SortSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sort: PropTypes.func.isRequired
    })
  ).isRequired,
  onSort: PropTypes.func.isRequired
};

export default SortSelect;
