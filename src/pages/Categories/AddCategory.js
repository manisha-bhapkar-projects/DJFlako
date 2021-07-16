import React, { useState } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callAddCategoryApi } from "../../actions/CategoryAction";
// import { callSongUploadAPI } from "../../actions/FileUploadAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { useHistory, Link } from "react-router-dom";
import constants from "../../utils/constants";
import "react-sweet-progress/lib/style.css";
import CustomeSongUpload from "../../components/CustomeSongUpload/CustomeSongUpload";
import { Progress } from "react-sweet-progress";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";
import { callFileUploadAPI } from "../../actions/FileUploadAction";
const AddCategoryMusic = (props) => {
  const [songname, setSongname] = useState("");
  const [file, setFile] = useState("");
  const [songErr, setSongErr] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const hiddenFileInput = React.useRef(null);
  const [imageErr, setImageErr] = useState("");
  const [image, setImage] = useState("");
  const [isImgLoading, setIsImgLoading] = useState(false);

  const handleClickFile = (event) => {
    hiddenFileInput.current.click();
  };

  const reqParam = {
    songname: songname.trim(),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
     // alert("hi");
    if (songname.trim() === "") {
      if (songname.trim() === "") {
        setSongErr("Enter Song Name");
      }
      if (image.trim() === "") {
        setImageErr("Please Select File");
      }
      return null;
    }
    props
      .callAddCategoryApiAction({
        name: songname,
        image
      })
      .then((response) => {
        // console.log("Add Category", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Category Added Successfully",
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
  };

  const handleChange = (event) => {
    setFileErr("");
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        // console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };
    setUploadPercentage(0);
    setTimeout(() => {
      setUploadPercentage(25);
    }, 1000);
    setTimeout(() => {
      setUploadPercentage(50);
    }, 2000);
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
      .callSongUploadAPIAction(data)
      .then((res) => {
        // console.log("upload song", res.data.image);
        setFile(res.data.image.length ? res.data.image : "");
      })
      .catch((error) => {
        console.log(error);
        setUploadPercentage(0);
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };


  const handleChangeImage = (event) => {
    setImageErr("");
    setIsImgLoading(true);

    // const options = {
    //   onUploadProgress: (progressEvent) => {
    //     const { loaded, total } = progressEvent;
    //     let percent = Math.floor((loaded * 100) / total);
    //     console.log(`${loaded}kb of ${total}kb | ${percent}%`);
    //     if (percent < 100) {
    //       setUploadPercentage(percent);
    //     }
    //   },
    // };
    // setUploadPercentage(0);
    // setTimeout(() => {
    //   setUploadPercentage(50);
    // }, 1000);
    // setTimeout(() => {
    //   setUploadPercentage(75);
    // }, 2000);
    // setTimeout(() => {
    //   setUploadPercentage(100);
    // }, 3000);
    // setTimeout(() => {
    //   setUploadPercentage(0);
    // }, 4000);
    const data = new FormData();
    data.append("file", event.target.files[0]);
 
    props
      .callFileUploadAPIAction(data)
      .then((res) => {
        console.log("upload img", res);
        setImage(res.data.image.length ? res.data.image : "");
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
            Add Category
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Add New Category</h6>
              <div
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
                        value={image}
                        // uploadPercentage={uploadPercentage}
                        error={imageErr ? true : false}
                        helperText={imageErr}
                        isImgLoading = {isImgLoading}

                      />
                    </div>
                    {/* <div className="col-sm-6">
                      <CustomeSongUpload
                        hiddensongInput={hiddenFileInput}
                        handleChangesong={handleChange}
                        value={file}
                        handleClickSong={handleClick}
                        uploadSongPercentage={uploadPercentage}
                        error={fileErr ? true : false}
                        helperText={fileErr}
                      />
                    </div> */}
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
      callAddCategoryApiAction: callAddCategoryApi,
      // callSongUploadAPIAction: callSongUploadAPI,
      callFileUploadAPIAction: callFileUploadAPI,

    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddCategoryMusic);
