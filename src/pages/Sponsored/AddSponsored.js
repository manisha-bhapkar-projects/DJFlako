import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callAddSponsorApi } from '../../actions/SponsoredAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { callFileUploadAPI } from '../../actions/FileUploadAction';
import constants from '../../utils/constants';
import { useHistory, Link } from "react-router-dom";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";

const AddSponsored = props => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [file, setFile] = useState("");
  const [isFileError, setFileError] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const reqParam = {
    name: name.trim(),
    description: description.trim(),
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      description.trim() === "" ||
      file === ""

    ) {

      if (name.trim() === "") {
        setNameError("Enter Company Name");
      }

      if (description.trim() === "") {
        setDescriptionError("Enter Description");
      }
      if (file.trim() === "") {
        setFileError("Please Select File");
      }

      return null;
    }
    props.callAddSponsorApiAction({
      name,
      description,
      image: file
    })
      .then((response) => {
        console.log('Add Sponsore', response);
        if (response.data.status) {
          CustomeNotification("success", "Sponsor Added Successfully", "Success", 2000);
          props.history.push(constants.ROUTE.SIDEBAR.SPONSORED);

        }
      }).catch((err) => {
        console.log(err);
      });
  }

  const handleChangeName = (e) => {
    setNameError("");
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescriptionError("");
    setDescription(e.target.value);
  };
  const hiddenFileInput = React.useRef(null);

  const handleChange = event => {
    setFileError("");
    setIsImgLoading(true);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    props.callFileUploadAPIAction(data)
      .then(res => {
        console.log("upload image", res);
        setFile(res.data.image.length ? res.data.image : '')
         setIsImgLoading(false);

      })
      .catch((error) => {
        console.log(error);
        setUploadPercentage(0);

      });

  };


  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (

    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.SPONSORED}>
              Sponsored List
                        </Link>
          </li>
          <li className="breadcrumb-item active"
            aria-current="page">Add Sponsored
           </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">
                Add New Sponsored
                </h6>
              <form className="cmxform"
                id="signupForm"
                method="get"
                action="#"
                noValidate="novalidate">
                <fieldset>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                    
                        <TextFieldComponent
                          className=""
                          id="eventname"
                          label="Company Name"
                          labelClassName=""
                          inputClassName=""
                          error={isNameError ? true : false}
                          helperText={isNameError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Company Name"
                          onChange={handleChangeName}
                          value={name} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                    <CustomeFileUpload
                        title="Banner Upload"
                        hiddenFileInput={hiddenFileInput}
                        handleChangeImage={handleChange}
                        handleClickFile={handleClick}
                        value={file}
                        uploadPercentage={uploadPercentage}
                        error={isFileError ? true : false}
                        helperText={isFileError}
                        isImgLoading = {isImgLoading}

                      />
                      {/* <div className="form-group">
                        <label>Event Banner upload</label>
                        <input
                          type="file"
                          name="img[]"
                          className="file-upload-default"
                          accept=".jpeg, .jpg, .png"
                          ref={hiddenFileInput}
                          onChange={handleChange}
                          style={{ display: 'none' }} />
                        <div className="input-group col-xs-12">
                          <input
                            type="text"
                            className="form-control file-upload-info"
                            disabled placeholder="Upload Image"
                            value={file} />
                          <span className="input-group-append">
                            <button
                              className="file-upload-browse btn btn-primary"
                              type="button"
                              onClick={handleClick}
                            >Upload</button>
                          </span>
                        </div>
                        <div className="errormsg">{isFileError ? isFileError : null}</div>

                      </div> */}
                      {/* {uploadPercentage > 0 &&

                        <Progress
                          percent={uploadPercentage}
                          label={`${uploadPercentage}%`}
                          status="active"
                        />
                      } */}
                    </div>

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
                          onChange={handleChangeDescription} />
                        <div className="errormsg">{isDescriptionError ? isDescriptionError : null}</div>

                      </div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      callAddSponsorApiAction: callAddSponsorApi,
      callFileUploadAPIAction: callFileUploadAPI
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(AddSponsored);
