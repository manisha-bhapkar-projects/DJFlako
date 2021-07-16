import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import {
  callSponsoreListAPI,
  callDeleteSponsoreApi,
} from "../../actions/SponsoredAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import ListHeader from "../../components/ListHeader/ListHeader";
const Sponsored = (props) => {
  const [count, setCount] = useState(2);
  const [limit, setlimit] = useState(10);
  const history = useHistory();
  const [usersData, setUserData] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getSponsore(pageNumber, limit, search);
  }, []);

  const getSponsore = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callSponsoreListAPIAction(page, limit, search)
      .then((response) => {
        console.log("Sponsore list", response);
        if (Array.isArray(response.data)) {
          setCount(0);
          setUserData([]);
        } else {
          setCount(response.data.count);
          setUserData(response.data.data);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteSponsore = (sponsor_id) => {
    console.log("jjjjjj", sponsor_id);

    props
      .callDeleteSponsoreApiAction(sponsor_id)
      .then((response) => {
        console.log("Delete Sponsore", response);
        if (response.data.status) {
          CustomeNotification("error", "Sponsore Deleted ", "Error", 2000);
        }
        getSponsore(page, limit, search);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getSponsore(1, limit, e.target.value);
  };

  const handlePageChange = (perPage) => {
    setPageNumber(perPage);
    getSponsore(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getSponsore(1, e.target.value, search);
  };

  const Usercolumns = [
    {
      name: "NO.",
      selector: "sponsor_id",
      grow: "0.1",
    },
    // {
    //   name: "SPONSORED NAME",
    //   selector: "name",
    //   grow: "3",
    // },
    {
      name: "SPONSORED NAME",
      selector: "name",
      grow: "2",
      cell: (row) => {
        return (
          <div className="d-ellipsis d-row-ellipsis">
            {row.name}
            </div>
        );
      },
    },
    {
      name: "IMAGE",
      selector: "",
      right: false,
      grow: "2 ",
      cell: (row) => {
        return (
          <>
            <img
              src={`${constants.API.UPLOADS_BASE_URL.IMAGES}${row.image}`}
              alt="banner"
              className="img-thumbnail"
            />
          </>
        );
      },
    },
    // {
    //   name: "DESCRIPTION",
    //   selector: "description",
    //   grow: "5",
    // },

    {
      name: "DESCRIPTION",
      selector: "description",
      grow: "2",
      cell: (row) => {
        return (
          <div className="d-ellipsis d-row-ellipsis">
            {row.description}
            </div>
        );
      },
    },
    {
      name: "ACTION",
      selector: "",
      right: false,
      grow: "1",
      cell: (row) => {
        return (
          <>
            <a href="#" className="trash-custom-icon">
              <i
                class="fas fa-trash"
                onClick={(key) => DeleteSponsore(row.sponsor_id)}
              ></i>
            </a>
            <a className="edit-custom-icon">
              <i
                class="far fa-edit"
                onClick={() => {
                  history.push(
                    `${constants.ROUTE.SPONSORED.EDIT_SPONSORED}${row.sponsor_id}`
                  );
                }}/>
            </a>
          </>
        );
      },
    },
  ];
  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <ListHeader
              title="Sponsored List"
              onButtonClick={() => {
                history.push(constants.ROUTE.SPONSORED.ADD_SPONSORED);
              }}
              buttonTitle="Add Sponsored"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
              search={search}
              placeholder="Search By Sponsore Name"
              handelSearch={handleSearch}
            />

            <div className="table-responsive">
              <CardListTable
                columns={Usercolumns}
                data={usersData}
                pending={loading}
                pagination={false}
                custompagination
                paginationServer={false}
                noDataString={"No data found"}
                totalListCount={count}
                paginationTotalRows={count}
                paginationPerPage={limit}
                onPageChangedCalled={handlePageChange}
                inputClassName="mt-3"
                // sortFunction={customSort}
                pageNumber={pageNumber}

              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Sponsored.propTypes = {};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callSponsoreListAPIAction: callSponsoreListAPI,
      callDeleteSponsoreApiAction: callDeleteSponsoreApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Sponsored);
