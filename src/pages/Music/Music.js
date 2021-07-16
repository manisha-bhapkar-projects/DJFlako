import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import CardListTable from "../../components/CardListTable/CardListTable";
import MusicList from "../../components/DummyTable/DummyTable";
import { callMusicListAPI, callDeleteSongApi } from "../../actions/MusicAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableHeader from "../../components/TableHeader/TableHeader";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import ReactAudioPlayer from "react-audio-player";
import ListHeader from "../../components/ListHeader/ListHeader";

const Music = (props) => {
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
    getSong(pageNumber, limit, search);
  }, []);

  const getSong = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callMusicListAPIAction(page, limit, search)
      .then((response) => {
        console.log("song list", response);
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
  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getSong(1, limit, e.target.value);
  };

  const handlePageChange = (perPage) => {
    setPageNumber(perPage);
    getSong(perPage, limit, search);
  };

  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getSong(1, e.target.value, search);
  };


  const DeleteSong = (song_id) => {
    props
      .callDeleteSongApiAction(song_id)
      .then((response) => {
        console.log("Delete song", response);
        if (response.data.status) {
          CustomeNotification("error", "Song Deleted ", "Error", 2000);
        }
        getSong(pageNumber, limit, search);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Musiccolumns = [
    {
      name: "No.",
      selector: "song_id",
      grow: "1",
      cell: (row) => {
        return <div className="custome-row-style">{row.song_id}</div>;
      },
    },
    // {
    //   name: "SONG NAME",
    //   selector: "name",
    //   grow: "2",
    // },

    {
      name: "SONG NAME",
      selector: "name",
      grow: "5",
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
      selector: "image",
      right: false,
      grow: "2",
      cell: (row) => {
        return (
          <>
            <img
              src={`${constants.API.UPLOADS_BASE_URL.IMAGES}${row.image}`}
              alt="banner"
              className="img-small"
            />
          </>
        );
      },
    },

    {
      name: "SONG",
      selector: "song_file",
      right: false,
      grow: "4",
      cell: (row) => {
        console.log("song row", row);
        return (
          <>
            {row.song_file !== null ? (
              <audio
                className="audio"
                preload="none"
                controls
                controlsList="nodownload"
              >
                <source
                  src={`${constants.API.UPLOADS_BASE_URL.SONG}${row.song_file}`}
                  type='audio/mpeg; codecs="mp3"'
                />
              </audio>
            ) : (
              ""
            )}
          </>
        );
      },
    },

    {
      name: "SONG URL",
      selector: "song_url",
      right: false,
      grow: "4",
      cell: (row) => {
        console.log("song row", row);
        return (
          <>
           <div className="d-ellipsis d-row-ellipsis">
           {row.song_url}
            </div>
          </>
        );
      },
    },
    // {
    //   name: "SONG URL",
    //   selector: "song_url",
    //   grow: "3",
    // },

    {
      name: "ACTION",
      selector: "",
      right: false,
      grow: "2",
      cell: (row) => {
        return (
          <>
            <a className="trash-custom-icon">
              <i
                className="fas fa-trash"
                onClick={(key) => DeleteSong(row.song_id)}
              />
            </a>
            <a className="edit-custom-icon">
              <i
                className="far fa-edit"
                onClick={() => {
                  history.push(
                    `${constants.ROUTE.MUSIC.EDIT_MUSIC}${row.song_id}`
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
              title="Music List"
              onButtonClick={() => {
                history.push(constants.ROUTE.MUSIC.ADD_MUSIC);
              }}
              buttonTitle="Add Music"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
              search={search}
              placeholder="Search By Music Name"
              handelSearch={handelSerach}
            />

            <div className="table-responsive">
              <CardListTable
                columns={Musiccolumns}
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

Music.propTypes = {};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callMusicListAPIAction: callMusicListAPI,
      callDeleteSongApiAction: callDeleteSongApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Music);
