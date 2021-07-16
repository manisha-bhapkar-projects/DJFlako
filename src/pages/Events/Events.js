import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import CardListTable from "../../components/CardListTable/CardListTable";
import EventsList from "../../components/DummyTable/DummyTable";
import Modal from "../../components/Modal/Modal";
import { calLEventAPI, callDeleteEventApi } from "../../actions/EventAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import TableHeader from "../../components/TableHeader/TableHeader";
import ListHeader from "../../components/ListHeader/ListHeader";

const Events = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [limit, setlimit] = useState(10);
  const [usersData, setUserData] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    getEvents(pageNumber, limit, search);
  }, []);

  const getEvents = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .calLEventAPIAction(page, limit, search)
      .then((response) => {
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

  const DeleteEvent = (event_id) => {
    console.log("jjjjjj", event_id);
    props
      .callDeleteEventApiAction(event_id)
      .then((response) => {
        console.log("Delete Event", response);
        if (response.data.status) {
          CustomeNotification("error", "Event Deleted ", "Error", 2000);
        }
        getEvents(pageNumber, limit, search);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getEvents(1, limit, e.target.value);
  };

  const handlePageChange = (perPage) => {
    setPageNumber(perPage);
    getEvents(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getEvents(1, e.target.value, search);
  };

  const Eventcolumns = [
    {
      name: "NO.",
      selector: "event_id",
      grow: "0.1",
    },
    // {
    //   name: "EVENT NAME",
    //   selector: "title",
    //   grow: "3",
    // },
    {
      name: "EVENT NAME",
      selector: "title",
      grow: "5",
      cell: (row) => {
        return (
          <div className="d-ellipsis d-row-ellipsis">
            {row.title}
            </div>
        );
      },
    },
    // {
    //   name: "ADDRESS",
    //   selector: "location",
    //   grow: "3",
    // },
    {
      name: "ADDRESS",
      selector: "location",
      grow: "5",
      cell: (row) => {
        return (
          <div className="d-ellipsis d-row-ellipsis">
            {row.location}
            </div>
        );
      },
    },
    {
      name: "DATE",
      selector: "date",
      grow: "3",
    },
    {
      name: "TIME",
      selector: "time",
      grow: "3",
    },
    {
      name: "BANNER OF EVENT",
      selector: "image",
      right: false,
      grow: "4",
      cell: (row) => {
        console.log("img", row.image);
        return (
          <>
            <img
              src={`${constants.API.UPLOADS_BASE_URL.IMAGES}${row.image}`}
              // {`http://34.202.173.112/dj-flako-php-laravel/storage/uploads/${row.image}`}
              alt="banner"
              className="img-small"
            />
          </>
        );
      },
    },
    // {
    //   name: "EVENT DESCRIPTION",
    //   selector: "description",
    //   left: true,
    //   grow: "5",
    // },

    {
      name: "EVENT DESCRIPTION",
      selector: "description",
      grow: "5",
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
        console.log("rrr", row.event_id);

        return (
          <>
            <a className="trash-custom-icon">
              <i
                class="fas fa-trash"
                onClick={(key) => DeleteEvent(row.event_id)}
              />
            </a>
            <a className="edit-custom-icon">
              <i
                class="far fa-edit"
                onClick={() => {
                  history.push(
                    `${constants.ROUTE.EVENTS.EDIT_EVENTS}${row.event_id}`
                  );
                }}
              />
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
              title="Event List"
              onButtonClick={() => {
                history.push(constants.ROUTE.EVENTS.ADD_EVENTS);
              }}
              buttonTitle="Add Event"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
              search={search}
              placeholder="Search By Event Name"
              handelSearch={handleSearch}
            />

            <div className="table-responsive">
              <CardListTable
                columns={Eventcolumns}
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
      <Modal
        isOpen={showModal}
        onCancelClickListner={() => setShowModal(false)}
      />
    </div>
  );
};

Events.propTypes = {};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      calLEventAPIAction: calLEventAPI,
      callDeleteEventApiAction: callDeleteEventApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Events);
