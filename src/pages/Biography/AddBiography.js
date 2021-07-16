import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callFileUploadAPI } from "../../actions/FileUploadAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "@material-ui/core";
import constants from "../../utils/constants";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import {
  callAddBiographyApi,
  callBiographyAPI,
} from "../../actions/BiographyAction";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";

const AddBiography = (props) => {
  const [title, setTitle] = useState("");
  const [isTitleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [file, setFile] = useState("");
  const [isFileError, setFileError] = useState("");
  const [usersData, setUserData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    getBiography();
  }, []);

  const getBiography = () => {
    props
      .callBiographyAPIAction()
      .then((res) => {
        console.log("Biography", res);
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setFile(res.data.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reqParam = {
    title: title.trim(),
    description: description.trim(),
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "" || file === "") {
      if (title.trim() === "") {
        setTitleError("Enter Event Title");
      }

      if (description.trim() === "") {
        setDescriptionError("Enter Event Description");
      }

      if (file === "") {
        setFileError("Select File");
      }

      return null;
    }

    props
      .callAddBiographyApiAction({
        name: title,
        description,
        image: file,
      })
      .then((response) => {
        console.log("Add Bio", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Song Added Successfully",
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
      data.title = e.target.value;
    }
    setUserData(data);
  };

  const handleChange = (event) => {
    setFileError("");
    //   const fileUploaded = event.target.files[0].name;
    //   setFile(fileUploaded);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };
    setUploadPercentage(20);
    setTimeout(() => {
      setUploadPercentage(50);
    }, 1000);
    setTimeout(() => {
      setUploadPercentage(75);
    }, 3000);

    setTimeout(() => {
      setUploadPercentage(100);
    }, 4000);
    setTimeout(() => {
      setUploadPercentage(0);
    }, 5000);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    props
      .callFileUploadAPIAction(data)
      .then((res) => {
        console.log("upload image", res);
        setFile(res.data.image.length ? res.data.image : "");
        setIsEdit(true);
        const data = { ...usersData };
        if (usersData) {
          data.image = event.target.file[0];
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
          <li className="breadcrumb-item active ml-1" aria-current="page">
            Add Biography
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Add Biography</h6>
              <form
                className="cmxform"
                id="signupForm"
                method="get"
                action="#"
                noValidate="novalidate"
              >
                <fieldset>
                  <div className="row">
                    <div className="col-sm-6">
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
                    </div>
                    {/* <div className="col-sm-4"> */}
                      {/* <CustomeFileUpload
                        title="Banner Upload"
                        hiddenFileInput={hiddenFileInput}
                        handleChangeImage={handleChange}
                        handleClickFile={handleClick}
                        value={file}
                        uploadPercentage={uploadPercentage}
                        error={isFileError ? true : false}
                        helperText={isFileError}
                      /> */}
                      {/* <div className="form-group">
                        <label>Event Banner upload</label>
                        <input
                          type="file"
                          name="img[]"
                          className="file-upload-default"
                          accept=".jpg, .jpeg, .png"
                          ref={hiddenFileInput}
                          onChange={handleChange}
                          style={{ display: 'none' }} />
                        <div className="input-group col-xs-12">
                          <input
                            type="text"
                            className="form-control file-upload-info"
                            disabled
                            value={file}
                            placeholder="Upload Image"
                          />

                          <span className="input-group-append">
                            <button
                              onClick={handleClick}
                              className="file-upload-browse btn btn-primary"
                              type="button">Upload</button>
                          </span>
                        </div>
                        <div className="errormsg">
                          {isFileError ? isFileError : null}
                        </div>
                      </div> */}
                    {/* </div> */}
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
                    disabled={uploadPercentage !== 0}
                    onClick={handleSubmit}
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

export default connect(null, mapDispatchToProps)(AddBiography);
