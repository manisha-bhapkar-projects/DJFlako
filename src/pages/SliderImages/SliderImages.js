import React, { useState, useEffect } from "react";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import CardListTable from "../../components/CardListTable/CardListTable";
import {
  callSliderImagesAPI,
  callDeleteSliderImageAPI,
} from "../../actions/SliderImagesAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import ListHeader from "../../components/ListHeader/ListHeader";
const SliderImages = (props) => {
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
    getSliderImages(pageNumber, limit);
  }, []);

  const getSliderImages = (page = 1, limit = 10) => {
    setloading(true);
    props
      .callSliderImagesAPIAction(page, limit)
      .then((response) => {
        console.log("slider list", response);
        setUserData(response.data.data);
        setCount(response.data.count);
        console.log("slider count", response.data.count);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handlePageChange = (perPage) => {
    console.log("perPage",perPage);
    setPageNumber(perPage);
    getSliderImages(perPage, limit);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getSliderImages(1, e.target.value);
  };


  const DeleteSliderImage = (id) => {
    props
      .callDeleteSliderImageAPIAction(id)
      .then((response) => {
        console.log("Delete image", response);
        if (response.data.status) {
          CustomeNotification("error", "Image Deleted ", "Error", 2000);
        }
        getSliderImages(pageNumber, limit);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Musiccolumns = [
    {
      name: "No.",
      selector: "id",
      grow: "1",
      cell: (row) => {
        return <div className="custome-row-style">{row.id}</div>;
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
                onClick={(key) => DeleteSliderImage(row.id)}
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
              title="Slider Images"
              onButtonClick={() => {
                history.push(constants.ROUTE.SLIDER_IMAGES.ADD_SILDER_IMAGES);
              }}
              buttonTitle="Add Images"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callSliderImagesAPIAction: callSliderImagesAPI,
      callDeleteSliderImageAPIAction: callDeleteSliderImageAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(SliderImages);
