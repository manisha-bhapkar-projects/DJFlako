import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import { useHistory } from "react-router-dom";
import {
  callSongRequestApi,
  callDeleteSongRequestApi,
} from "../../actions/SongRequestAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import ListHeader from "../../components/ListHeader/ListHeader";

const SongRequest = (props) => {
  const [count, setCount] = useState(2);
  const [limit, setlimit] = useState(10);
  const [usersData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setloading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    songRequest(page, limit, search);
  }, []);

  const songRequest = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callSongRequestApiAction(page, limit, search)
      .then((response) => {
        console.log("song request", response);
        setUserData(response.data.data);
        setCount(response.data.count);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    songRequest(1, limit, e.target.value);
  };

  const handlePageChange = (perPage) => {
    setPageNumber(perPage);
    songRequest(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    songRequest(1, e.target.value, search);
  };

  const DeleteSongRequest = (sr_id) => {
    props
      .callDeleteSongRequestApiAction(sr_id)
      .then((response) => {
        console.log("Delete song request", response);
        if (response.data.status) {
          CustomeNotification("error", "Song Deleted ", "Error", 2000);
        }
        songRequest(pageNumber, limit, search);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Genericcolumns = [
    {
      name: "NO.",
      selector: "sr_id",
      grow: "1",
    },
    // {
    //   name: "SONG NAME",
    //   selector: "song_name",
    //   grow: "3",
    // },
    {
      name: "SONG NAME",
      selector: "song_name",
      grow: "3",
      cell: (row) => {
        return (
          <div className="d-ellipsis d-row-ellipsis">
            {row.song_name}
            </div>
        );
      },
    },
    // {
    //   name: "TITLE",
    //   selector: "title",
    //   grow: "3",
    // },
    {
      name: "TITLE",
      selector: "title",
      grow: "3",
      cell: (row) => {
        return (
          <div className="d-ellipsis d-row-ellipsis">
            {row.title}
            </div>
        );
      },
    },
    // {
    //   name: "Description",
    //   selector: "description",
    //   grow: "3",
    // },

    {
      name: "DESCRIPTION",
      selector: "description",
      grow: "3",
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
      grow: "2",
      cell: (row) => {
        return (
          <>
            <a href="#" className="trash-custom-icon">
              <i
                class="fas fa-trash"
                onClick={(key) => DeleteSongRequest(row.sr_id)}
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
              title="Song Requests"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
              search={search}
              placeholder="Search By Song Name"
              handelSearch={handleSearch}
            />

            <div className="table-responsive">
              <CardListTable
                columns={Genericcolumns}
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
      callSongRequestApiAction: callSongRequestApi,
      callDeleteSongRequestApiAction: callDeleteSongRequestApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(SongRequest);
