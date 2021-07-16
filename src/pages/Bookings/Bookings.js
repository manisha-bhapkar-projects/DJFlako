import React, { useEffect, useState } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import UserList from "../../components/DummyTable/DummyTable";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import {
  callBookingAPI,
  callDeleteBookingApi,
} from "../../actions/BookingAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableHeader from "../../components/TableHeader/TableHeader";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import ListHeader from "../../components/ListHeader/ListHeader";
import moment from "moment";
const Booking = (props) => {
  const [count, setCount] = useState(0);
  const [limit, setlimit] = useState(10);
  const history = useHistory();
  const [usersData, setUserData] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    getBooking(pageNumber, limit, search);
  }, []);

  const getBooking = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callBookingAPIAction(page, limit, search)
      .then((response) => {
        console.log("Booking list", response);
        if (Array.isArray(response.data)) {
          setCount(0);
          setUserData([]);
        } else {
          setCount(response.data.count);
          setUserData(response.data.data);
          setloading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteBooking = (booking_id) => {
    props
      .callDeleteBookingApiAction(booking_id)
      .then((response) => {
        console.log("Delete Booking", response);
        if (response.data.status) {
          CustomeNotification("error", "Booking Deleted ", "Error", 2000);
        }
        getBooking(page, limit, search);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getBooking(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    getBooking(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getBooking(1, e.target.value, search);
  };

  const Usercolumns = [
    {
      name: "NO.",
      selector: "booking_id",
      grow: "1",
    },
    {
      name: "NAME",
      selector: "name",
      grow: "5",
    },
    {
      name: "EMAIL",
      selector: "email",
      grow: "5",
    },
    {
      name: "NUMBER",
      selector: "number",
      grow: "3",
    },
    {
      name: "DATE",
      selector: "date",
      right: false,
      grow: "4",
      cell: (row) => {
        return (
          <>{row.date ? moment(row.date).format("DD-MM-YYYY") : row.date}</>
        );
      },
    },

    {
      name: "TIME",
      selector: "time",
      right: false,
      grow: "1",
      cell: (row) => {
        return <>{row.time ? moment(row.time).format("HH:mm") : row.time}</>;
      },
    },
    {
      name: "ADDRESS",
      selector: "address",
      grow: "3",
    },
    {
      name: "STATE",
      selector: "state",
      grow: "3",
    },
    {
      name: "LOCATION",
      selector: "location",
      grow: "3",
    },
    {
      name: "ACTION",
      selector: "",
      right: false,
      grow: "2",
      cell: (row) => {
        return (
          <>
            <a href="#" className="trash-custom-icon">
              <i
                class="fas fa-trash"
                onClick={(key) => DeleteBooking(row.booking_id)}
              ></i>
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
              title="Booking List"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
              search={search}
              placeholder="Search By Name"
              handelSearch={handleSerach}
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
                pageNumber={pageNumber}

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
      callBookingAPIAction: callBookingAPI,
      callDeleteBookingApiAction: callDeleteBookingApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Booking);
