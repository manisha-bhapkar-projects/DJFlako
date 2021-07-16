import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import GeneList from "../../components/DummyTable/DummyTable";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import {
  callCategoryListAPI,
  callDeleteCategoryApi,
} from "../../actions/CategoryAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import TableHeader from "../../components/TableHeader/TableHeader";
import ListHeader from "../../components/ListHeader/ListHeader";
const CategoryList = (props) => {
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
    getCategoryList(pageNumber, limit, search);
  }, []);

  const getCategoryList = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callCategoryListAPIAction(page, limit, search)
      .then((response) => {
        console.log("Category", response);
        setUserData(response.data.data);
        setCount(response.data.count);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteCategory = (category_id) => {
    props
      .callDeleteCategoryApiAction(category_id)
      .then((response) => {
        console.log("Delete Category", response);
        if (response.data.status) {
          CustomeNotification("error", "Category Deleted ", "Error", 2000);
        }
        getCategoryList(page, limit, search);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getCategoryList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage) => {
    setPageNumber(perPage);
    getCategoryList(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getCategoryList(1, e.target.value, search);
  };

  const Genericcolumns = [
    {
      name: "NO.",
      selector: "category_id",
      grow: "1",
    },
    // {
    //   name: "CATEGORY NAME",
    //   selector: "name",
    //   grow: "2",
    // },

    {
      name: "CATEGORY NAME",
      selector: "name",
      right: false,
      grow: "3",
      cell: (row) => {
        return (
          <>
           <div className="d-ellipsis d-row-ellipsis">
           {row.name}
            </div>
          </>
        );
      },
    },

    // {
    //   name: "Image",
    //   selector: "image",
    //   right: false,
    //   grow: "6",
    //   cell: (row) => {
    //     return (
    //       <audio
    //         className="audio"
    //         preload="none"
    //         controls
    //         controlsList="nodownload"
    //       >
    //         <source
    //           type="audio/mpeg"
    //           codecs="mp3"
    //           src={`${constants.API.UPLOADS_BASE_URL.SONG}${row.image}`}
    //         ></source>
    //       </audio>
    //     );
    //   },
    // },
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
                onClick={(key) => DeleteCategory(row.category_id)}
              ></i>
            </a>
            <a className="edit-custom-icon">
              <i
                class="far fa-edit"
                onClick={() => {
                  history.push(
                    `${constants.ROUTE.CATEGORY_LIST.EDIT_CATEGORY}${row.category_id}`
                  );
                }}
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
              title="Category List"
              onButtonClick={() => {
                history.push(constants.ROUTE.CATEGORY_LIST.ADD_CATEGORY_MUSIC);
              }}
              buttonTitle="Add Category"
              count={count}
              handleDropdownChange={handleDropdownChange}
              limit={limit}
              search={search}
              placeholder="Search By Category Name"
              handelSearch={handelSerach}
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
      callCategoryListAPIAction: callCategoryListAPI,
      callDeleteCategoryApiAction: callDeleteCategoryApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(CategoryList);
