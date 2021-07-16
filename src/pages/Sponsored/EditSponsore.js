import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callUpdateSponsoreApi, callSponsoreDetail } from '../../actions/SponsoredAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { callFileUploadAPI } from '../../actions/FileUploadAction';
import constants from '../../utils/constants';
import { useHistory, Link } from "react-router-dom";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";
import "react-sweet-progress/lib/style.css";
const EditSponsored = props => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [file, setFile] = useState("");
  const [isFileError, setFileError] = useState("");
  const id = props.match.params.id;
  const [usersData, setUserData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(false);

  useEffect(() => {
    getSponsoreDetails(id);
  }, []);

  const getSponsoreDetails = (id) => {
    props
      .callSponsoreDetailAction(id)
      .then((res) => {
        console.log('sponsore details', res);
        setUserData(res.data.data);
        setName(res.data.data.name);
        console.log('image',res.data.data.image);
        setFile(res.data.data.image);
        setDescription(res.data.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
    props.callUpdateSponsoreApiAction({
      sponsor_id: id,
      name,
      description,
      image: file,

    })
      .then((response) => {
        console.log('update Sponsore', response);
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


  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (

    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link
              to={constants.ROUTE.SIDEBAR.SPONSORED}>
              Sponsored List
            </Link>
          </li>
          <li className="breadcrumb-item active"
            aria-current="page">Edit Sponsored
           </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">
                Edit New Sponsored
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
                          id="name"
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
                              <img
                        className="img-xs mb-3" 
                        src={`${constants.API.UPLOADS_BASE_URL.IMAGES}${file}`}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">
                          Biography Description
                          </label>
                        <textarea
                          name="eventdescription"
                          id="eventdescription"
                          rows={5}
                          className="form-control"
                          placeholder="Enter Event Description"
                          defaultValue={""}
                          value={description}
                          onChange={handleChangeDescription} />
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
      callUpdateSponsoreApiAction: callUpdateSponsoreApi,
      callFileUploadAPIAction: callFileUploadAPI,
      callSponsoreDetailAction: callSponsoreDetail
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(EditSponsored);
