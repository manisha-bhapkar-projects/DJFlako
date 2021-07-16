import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callFileUploadAPI } from "../../actions/FileUploadAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "@material-ui/core";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import {
  callAddBiographyApi,
  callBiographyAPI,
} from "../../actions/BiographyAction";
import "react-sweet-progress/lib/style.css";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";

const Biography = (props) => {
  const [title, setTitle] = useState("");
  const [isTitleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [file, setFile] = useState("");
  const [isFileError, setFileError] = useState("");
  const [usersData, setUserData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(false);

  useEffect(() => {
    getBiography();
  }, []);

  const getBiography = () => {
    props
      .callBiographyAPIAction()
      .then((response) => {
        console.log("Biography list", response);
        // setUserData(response.data.data);
        // setFile(response.data.data.image);
        // setTitle(response.data.data.name);
        setDescription(response.data.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( description.trim() === "" ) {
      // if (title.trim() === "") {
      //   setTitleError("Enter Name");
      // }

      if (description.trim() === "") {
        setDescriptionError("Enter Description");
      }

      // if (file === "") {
      //   setFileError("Select File");
      // }
      return null;
    }
  
    props
      .callAddBiographyApiAction({
        // name: usersData.name,
        description,
        // image: file,
      })
      .then((response) => {
        console.log("Add Bio", response);
        if (response && response.data && response.data.status) {
          CustomeNotification(
            "success",
            "Biography Updated Successfully",
            "Success",
            2000
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleChangeTitle = (e) => {
    setTitleError("");
    setTitle(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.name = e.target.value;
    }
    setUserData(data);
  };

  const handleChangeDescription = (e) => {
    setDescriptionError("");
    setDescription(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.description = e.target.value;
    }
    setUserData(data);
  };

  const hiddenFileInput = React.useRef(null);

  const handleChange = (event) => {
    setFileError("");
    setIsImgLoading(true);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    props
      .callFileUploadAPIAction(data)
      .then((res) => {
        console.log("upload image", res);
        setFile(res.data.image.length ? res.data.image : "");
        setIsImgLoading(false);

        setIsEdit(true);
        const data = { ...usersData };
        if (usersData) {
          data.image = event.target.value;
        }
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
        setUploadPercentage(0);
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active ml-2" aria-current="page">
            Add Biography
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Add New Biography</h6>
              <form
                className="cmxform"
                id="signupForm"
                method="get"
                action="#"
                noValidate="novalidate">
                <fieldset>
                  <div className="row">
                    {/* <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          className=""
                          id="eventname"
                          label="Name"
                          labelClassName=""
                          inputClassName=""
                          error={isTitleError ? true : false}
                          helperText={isTitleError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Event Name"
                          onChange={handleChangeTitle}
                          value={title}
                        />
                      </div>
                    </div> */}
                    {/* <div className="col-sm-4">
                      <CustomeFileUpload
                        title="Banner Upload"
                        hiddenFileInput={hiddenFileInput}
                        handleChangeImage={handleChange}
                        handleClickFile={handleClick}
                        value={file}
                        uploadPercentage={uploadPercentage}
                        error={isFileError ? true : false}
                        helperText={isFileError}
                      isImgLoading={isImgLoading}

                      />
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Biography Description</label>
                        <textarea
                          name="eventdescription"
                          id="eventdescription"
                          rows={5}
                          className="form-control"
                          placeholder="Enter Event Description"
                          defaultValue={""}
                          value={description}
                          onChange={handleChangeDescription}
                        />
                        <div className="errormsg">
                          {isDescriptionError ? isDescriptionError : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                    // disabled={uploadPercentage !== 0}
                    disabled={isImgLoading === true}

                  />
                </fieldset>
              </form>
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
      callFileUploadAPIAction: callFileUploadAPI,
      callAddBiographyApiAction: callAddBiographyApi,
      callBiographyAPIAction: callBiographyAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Biography);
