import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import {
  callUpdateCategoryApi,
  callCategoryDetail,
} from "../../actions/CategoryAction";
import { callSongUploadAPI } from "../../actions/FileUploadAction";
import constants from "../../utils/constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import "react-sweet-progress/lib/style.css";
import CustomeSongUpload from "../../components/CustomeSongUpload/CustomeSongUpload";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";
import { callFileUploadAPI } from "../../actions/FileUploadAction";

const EditCategory = (props) => {
  const [songname, setSongname] = useState("");
  const [file, setFile] = useState("");
  const [songErr, setSongErr] = useState("");
  const [fileErr, setFileErr] = useState("");
  const hiddenFileInput = React.useRef(null);
  const id = props.match.params.id;
  const [usersData, setUserData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [imageErr, setImageErr] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    getCategoryDetails(id);
  }, []);

  const getCategoryDetails = (id) => {
    props
      .callCategoryDetailAction(id)
      .then((res) => {
        console.log("category details", res);
        setUserData(res.data.data);
        setFile(res.data.data.image);
        setSongname(res.data.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // alert("hi");
    if (songname.trim() === "") {
      if (songname.trim() === "") {
        setSongErr("Enter Song Name");
      }
      if (file.trim() === "") {
        setFileErr("Please Select File");
      }
      return null;
    }
    props
      .callUpdateCategoryApiAction({
        category_id: id,
        name: usersData.name,
        image: file,
      })
      .then((response) => {
        console.log("update Category", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Updated Successfully",
            "Success",
            2000
          );
          props.history.push(constants.ROUTE.SIDEBAR.CATEGORY_LIST);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeSongName = (e) => {
    setSongErr("");
    setSongname(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.name = e.target.value;
    }
    setUserData(data);
  };



  const handleClickFile = (event) => {
    hiddenFileInput.current.click();
  };


  const handleChangeImage = (event) => {
    setImageErr("");
    setIsImgLoading(true);
    const data = new FormData();
    data.append("file", event.target.files[0]);
 
    props
      .callFileUploadAPIAction(data)
      .then((res) => {
        console.log("upload img", res);
        setFile(res.data.image.length ? res.data.image : "");
         setIsImgLoading(false);

      })
      .catch((error) => {
        console.log(error);
        setUploadPercentage(0);
      });
  };
  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.CATEGORY_LIST}>
              Category List
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Category
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Edit Category</h6>
              <div
                className="cmxform"
                id="signupForm"
                method="get"
                noValidate="novalidate"
              >
                <fieldset>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          type="text"
                          className=""
                          id="songname"
                          label="Name Of Category"
                          labelClassName=""
                          inputClassName=""
                          error={songErr ? true : false}
                          helperText={songErr}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Category Name"
                          onChange={handleChangeSongName}
                          value={songname}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <CustomeFileUpload
                        title="Catrgory Image"
                        hiddenFileInput={hiddenFileInput}
                        handleChangeImage={handleChangeImage}
                        handleClickFile={handleClickFile}
                        value={file}
                        // uploadPercentage={uploadPercentage}
                        error={imageErr ? true : false}
                        helperText={imageErr}
                        isImgLoading = {isImgLoading}

                      />
                           <img
                        className="img-xs mb-3" 
                        src={`${constants.API.UPLOADS_BASE_URL.IMAGES}${file}`}
                      />
                    </div>
                  </div>

                  <input
                    className="btn btn-primary"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                    // disabled={uploadPercentage !== 0}
                    disabled={
                      isImgLoading === true}
                  />
                </fieldset>
              </div>
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
      callUpdateCategoryApiAction: callUpdateCategoryApi,
      callSongUploadAPIAction: callSongUploadAPI,
      callCategoryDetailAction: callCategoryDetail,
      callFileUploadAPIAction: callFileUploadAPI,

    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditCategory);
