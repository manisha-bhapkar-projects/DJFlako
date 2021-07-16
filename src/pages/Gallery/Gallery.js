import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import {
  callGalleryListAPI,
  callDeleteGalleryImageAPI,
} from "../../actions/GalleryAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import ListHeader from "../../components/ListHeader/ListHeader";

const Gallery = (props) => {
  const [count, setCount] = useState(0);
  const [limit, setlimit] = useState(10);
  const [usersData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getGalleryList(pageNumber, limit);
  }, []);

  const getGalleryList = (page = 1, limit = 10) => {
    setloading(true);
    props
      .callGalleryListAPIAction(page, limit)
      .then((response) => {
        console.log("Gallery list", response);
        setUserData(response.data.data);
        setCount(response.data.count);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteGalleryImage = (gallery_id) => {
    console.log("jjjjjj", gallery_id);
    props
      .callDeleteGalleryImageAPIAction(gallery_id)
      .then((response) => {
        console.log("Delete Gallery", response);
        if (response.data.status) {
          CustomeNotification("error", "Image Deleted ", "Error", 2000);
        }
        getGalleryList();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const handlePageChange = (perPage) => {
    console.log("perPage", perPage);
    setPageNumber(perPage);
    getGalleryList(perPage, limit);
  };
const handelSearch = () =>{

}
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getGalleryList(1, e.target.value);
  };

  const Usercolumns = [
    {
      name: "NO.",
      selector: "gallery_id",
      grow: "1",
    },

    {
      name: "IMAGES",
      selector: "image",
      right: false,
      grow: "5",
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
      name: "ACTION",
      selector: "",
      right: false,
      grow: "3",
      cell: (row) => {
        return (
          <>
            <a className="trash-custom-icon">
              <i className="fas fa-trash"
                onClick={(key) => DeleteGalleryImage(row.gallery_id)}/>
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
              title="Gallery List"
              onButtonClick={() => {
                history.push(constants.ROUTE.GALLERY.ADD_GALLERY);
              }}
              buttonTitle="Add Gallery"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
              // search={search}
            />
           
            <div className="table-responsive">
              <CardListTable
                columns={Usercolumns}
                data={usersData}
                pending={loading}
                pagination={false}
                custompagination
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
      callGalleryListAPIAction: callGalleryListAPI,
      callDeleteGalleryImageAPIAction: callDeleteGalleryImageAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Gallery);
