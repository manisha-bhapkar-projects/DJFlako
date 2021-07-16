
import React from "react";
import PropTypes from "prop-types";

function TableHeader({
  title,
  isOpen,
  search,
  handelSearch,
  handleSearchClose,
}) {
  return (
    <div className="row d-flex align-items-center justify-content-between">
      <div className="col-md-6">
        <div className="row align-items-center ml-0 mr-0">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
      </div>
      <div>
        <div>
          <div className="input-holder">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={handelSearch}
            />
          </div>
          <button className="close" onClick={handleSearchClose} />
        </div>
      </div>
    </div>
  );
}

TableHeader.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  search: PropTypes.string,
  handelSearch: PropTypes.func,
  handleSearchClose: PropTypes.func,
};

TableHeader.defaultProps = {
  title: "",
  isOpen: false,
  search: "",
  handelSearch: () => {},
  handleSearchClose: () => {},
};

export default TableHeader;
