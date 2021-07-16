import React, { useEffect, useState } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import UserList from "../../components/DummyTable/DummyTable";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import {
  callUserListAPI,
  callUserStatusChangeAPI,
} from "../../actions/UserAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableHeader from "../../components/TableHeader/TableHeader";
import ListHeader from "../../components/ListHeader/ListHeader";

const User = (props) => {
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
    getUser(pageNumber, limit, search);
  }, []);

  const getUser = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callUserListAPIAction(page, limit, search)
      .then((response) => {
        console.log("user list", response);
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
  const UpdateStatus = (user_id) => {
    props
      .callUserStatusChangeAPIAction(user_id)
      .then((res) => {
        console.log("status update", res);
        getUser(pageNumber, limit, search);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getUser(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    getUser(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    getUser(pageNumber, e.target.value, search);
  };

  const Usercolumns = [
    {
      name: "NO.",
      selector: "user_id",
      // sortable: true,
      grow: "1",
    },
    {
      name: "DEVICE ID",
      selector: "device_id",
      //   sortable: true,
      grow: "5",
    },
    {
      name: "FCM ID",
      selector: "fcm_id",
      //   sortable: true,
      grow: "5",
    },
    {
      name: "DEVICE TYPE",
      selector: "device_type",
      //   sortable: true,
      grow: "3",
    },

    {
      name: "STATUS",
      selector: "status",
      // sortable: true,
      right: false,
      grow: "3",
      cell: (row) => {
        return (
          <>
            <label class="switch">
              <input
                type="checkbox"
                checked={row.status === 1 ? true : false}
                onChange={(key) => UpdateStatus(row.user_id)}
                // value={row.status}
              />
              <span class="slider round"></span>
            </label>
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
              title="User List"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
              search={search}
              placeholder="Search By Device ID"
              handelSearch={handelSerach}
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callUserListAPIAction: callUserListAPI,
      callUserStatusChangeAPIAction: callUserStatusChangeAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(User);

{
  /* <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">User List</h6>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group d-flex align-items-center  col-sm-4 ">
                <label>Show</label>
                <select
                  name="name"
                  value={limit}
                  className="form-control  mr-3 ml-3 "
                  // onChange={(e) => { setlimit(e.target.value) }}
                  onChange={handleDropdownChange}
                >
                  <option value="10" selected>10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value={count}>All</option>
                </select>
                <span className="form-group d-flex align-items-center">entries</span>
              </div>
              <div className="form-group">
                <TableHeader
                  search={search}
                  handelSearch={handelSerach}
                />
              </div>
            </div> */
}
