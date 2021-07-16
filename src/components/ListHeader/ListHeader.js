import React from "react";
import PropTypes from "prop-types";

function ListHeader({
  limit,
  handleDropdownChange,
  count,
  search,
  handelSearch,
  onButtonClick,
  title,
  buttonTitle,
  placeholder,
}) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="card-title mb-0">{title}</h6>
        {buttonTitle ? (
          <button
            className="btn btn-primary btn-icon-text mb-2 mb-md-0"
            onClick={onButtonClick}
          >
            {buttonTitle}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        {limit ? (
          <div className="form-group d-flex align-items-center  col-sm-4 ">
            <label>Show</label>
            <select
              name="name"
              value={limit}
              className="form-control mr-3 ml-3 "
              onChange={handleDropdownChange}
            >
              <option value="10" selected>
                10
              </option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value={count}>All</option>
            </select>
            <span className="form-group d-flex align-items-center">
              entries
            </span>
          </div>
        ) : (
          ""
        )}

        {placeholder ? (
          <div className="input-holder">
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              value={search}
              onChange={handelSearch}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

ListHeader.defaultProps = {
  limit: 10,
  handleDropdownChange: () => {},
  count: 0,
  search: "",
  handelSearch: () => {},
  onButtonClick: () => {},
  title: "",
  buttonTitle: "",
  placeholder: "",
};

ListHeader.propTypes = {
  limit: PropTypes.number,
  handleDropdownChange: PropTypes.func,
  count: PropTypes.number,
  search: PropTypes.string,
  handelSearch: PropTypes.func,
  onButtonClick: PropTypes.func,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  placeholder: PropTypes.string,
};

export default ListHeader;
