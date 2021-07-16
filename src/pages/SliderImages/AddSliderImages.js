import React, { useState } from "react";
import PropTypes from "prop-types";
import constants from "../../utils/constants";
import { callAddSliderImageAPI } from "../../actions/SliderImagesAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { callFileUploadAPI } from "../../actions/FileUploadAction";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { useHistory, Link } from "react-router-dom";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";
import "react-sweet-progress/lib/style.css";
const AddSliderImages = (props) => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [isFileError, setFileError] = useState("");
  const [fileObj, setFileObj] = useState([]);
  const [fileArr, setFileArr] = useState([]);
  const hiddenFileInput = React.useRef(null);
  // const [sliderImage, setImage] = useState('');
  const [image1, setImage1] = useState("");
  const [image, setImage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      setFileError("Please Select File");
      return true;
    }
    props
      .callAddSliderImageAPIAction(image)
      .then((res) => {
        console.log("add slider images", res);
        setImage(res.data.image ? res.data.image : "");
        if (res.data.status) {
          CustomeNotification(
            "success",
            "Image Uploaded Successfully",
            "Success",
            2000
          );
          props.history.push(constants.ROUTE.SIDEBAR.SLIDER_IMAGES);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickFile = (event) => {
    hiddenFileInput.current.click();
    console.log("file");
  };

  const handleChangeImage = (event) => {
    const fileUploaded = event.target.files[0].name;
    setImage1(fileUploaded);
    setFileError("");
    setIsImgLoading(true);
    const image = new FormData();
    image.append("file", event.target.files[0]);
    props
      .callFileUploadAPIAction(image)
      .then((res) => {
        console.log("upload image", res);
        setImage(res.data.image ? res.data.image : "");
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
            <Link to={constants.ROUTE.SIDEBAR.SLIDER_IMAGES}>
              Slider Images
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Images
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Add New Images</h6>
              <form
                className="cmxform"
                id="signupForm"
                method="get"
                noValidate="novalidate"
              >
                <div className="row">
                  <div className="col-sm-6">
                    <CustomeFileUpload
                      title="Image Upload"
                      hiddenFileInput={hiddenFileInput}
                      handleChangeImage={handleChangeImage}
                      handleClickFile={handleClickFile}
                      value={image}
                      uploadPercentage={uploadPercentage}
                      error={isFileError ? true : false}
                      helperText={isFileError}
                      isImgLoading={isImgLoading}
                    />

                    <input
                      className="btn btn-primary mt-4"
                      type="submit"
                      defaultValue="Submit"
                      onClick={handleSubmit}
                      // disabled={uploadPercentage !== 0}
                      disabled={isImgLoading === true}
                    />
                  </div>
                </div>
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
      callAddSliderImageAPIAction: callAddSliderImageAPI,
      callFileUploadAPIAction: callFileUploadAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddSliderImages);
