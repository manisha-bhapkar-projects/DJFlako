import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callAddMusicApi } from "../../actions/MusicAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { callCategoryListAPI } from "../../actions/CategoryAction";
import {
  callSongUploadAPI,
  callFileUploadAPI,
} from "../../actions/FileUploadAction";
import constants from "../../utils/constants";
import { Link } from "react-router-dom";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";
import CustomeSongUpload from "../../components/CustomeSongUpload/CustomeSongUpload";
import { Loader } from "react-feather";

const AddMusic = (props) => {
  const [songname, setSongname] = useState("");
  const [selectvalue, setSelectValue] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [singername, setSingername] = useState("");
  const [radioErr, setRadioErr] = useState("");
  const [songErr, setSongErr] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [selectErr, setSelectErr] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [songUrlErr, setSongUrlErr] = useState("");
  const [usersData, setUserData] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const hiddensongInput = React.useRef(null);
  const [radio, setRadio] = useState("0");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadSongPercentage, setSongUploadPercentage] = useState(0);
  const [limit, setlimit] = useState(50);
  const [size, setSize] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);

  useEffect(() => {
    getCategoryList(limit);
  }, []);

  const getCategoryList = (limit) => {
    props
      .callCategoryListAPIAction(limit)
      .then((response) => {
        console.log("Category list", response.data.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const reqParam = {
    songname: songname.trim(),
    singername: singername.trim(),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      songname.trim() === "" ||
      selectvalue === "" ||
      image === "" ||
      (radio == "0" && file == "") ||
      (radio == "1" && songUrl == "")
    ) {
      if (songname.trim() === "") {
        setSongErr("Enter Song Name");
      }
      if (image === "") {
        setImageErr("Please Select Image");
      }
      if (selectvalue.trim() === "" || selectvalue === "Select Categories") {
        setSelectErr("Select Option");
      }
      if (radio == "0" && file == "") {
        setFileErr("Please Select Song");
      } else if (radio == "1" && songUrl == "") {
        setSongUrlErr("Enter Song URL");
      }
      return null;
    }

    const request = {
      name: songname,
      image,
      duration: "03:00",
      category_id: selectvalue,
    };
    if (radio == "0") {
      request.song_file = file;
      // request.song_url = "";
    } else {
      request.song_url = songUrl;
      // request.song_file = "";
    }
    props
      .callAddMusicApiAction(request)
      .then((response) => {
        console.log("Add Music", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Song Added Successfully",
            "Success",
            2000
          );
          props.history.push(constants.ROUTE.SIDEBAR.MUSIC);
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

  const handleChangeSelectValue = (e) => {
    setSelectErr("");
    setSelectValue(e.target.value);
    console.log("dropdown", e.target.value);
  };
  const handleChangeURL = (e) => {
    setSongUrlErr("");
    setSongUrl(e.target.value);
    console.log("url", e.target.value);
  };

  const handleChangesong = (event) => {
    setFileErr("");
    setSongUploadPercentage(0);
    setIsLoading(true);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    props
      .callSongUploadAPIAction(data)
      .then((res) => {
        console.log("upload song", res);
        setFile(res.data.image.length ? res.data.image : "");
        setSongUploadPercentage(0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSongUploadPercentage(0);
      });
  };

  const handleClickFile = (event) => {
    hiddenFileInput.current.click();
  };

  const handleClickSong = (event) => {
    hiddensongInput.current.click();
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
        setImage(res.data.image.length ? res.data.image : "");
        setIsImgLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUploadPercentage(0);
      });
  };
  const handleChangeRadio = (e) => {
    // setFile("");
    // setSongUrl("");
    setRadio(e.target.value);
    console.log("radio", e.target.value);
  };

  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.MUSIC}>Music List</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Music
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Add New Music</h6>
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
                          label="Name Of Song"
                          labelClassName=""
                          inputClassName=""
                          error={songErr ? true : false}
                          helperText={songErr}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Song Name"
                          onChange={handleChangeSongName}
                          value={songname}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <CustomeFileUpload
                        title="Song Image"
                        hiddenFileInput={hiddenFileInput}
                        handleChangeImage={handleChangeImage}
                        handleClickFile={handleClickFile}
                        value={image}
                        error={imageErr ? true : false}
                        helperText={imageErr}
                        isImgLoading={isImgLoading}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="name">Category List</label>
                        <select
                          className="form-control custom-select"
                          onChange={handleChangeSelectValue}
                          value={selectvalue}
                          // size={size}
                        >
                          <option className="wrapper custom-option">
                            Select Categories
                          </option>
                          {usersData &&
                            usersData.map((item, i) => (
                              <option key={i} value={item.category_id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        <div className="errormsg">
                          {selectErr ? selectErr : null}
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label htmlFor="name">Select Option</label>
                        <br />
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="radio"
                              id="optionsRadios"
                              value="1"
                              checked={radio === "1"}
                              defaultValue="option5"
                              onChange={handleChangeRadio}
                            />
                            New
                            <i className="input-frame" />
                          </label>
                        </div>
                        <div className="form-check form-check-inline ">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="radio"
                              defaultChecked
                              checked={radio === "0"}
                              id="optionsRadios"
                              defaultValue="option5"
                              value="0"
                              onClick={handleChangeRadio}
                            />
                            Old
                            <i className="input-frame" />
                          </label>
                        </div>
                        <div className="errormsg">
                          {radioErr ? "Please Select Option" : null}
                        </div>
                      </div>
                    </div>

                    {radio == "0" ? (
                      <div className="col-sm-6">
                        <CustomeSongUpload
                          hiddensongInput={hiddensongInput}
                          handleChangesong={handleChangesong}
                          value={file}
                          handleClickSong={handleClickSong}
                          uploadSongPercentage={uploadSongPercentage}
                          error={fileErr ? true : false}
                          helperText={fileErr}
                          isLoading={isLoading}
                        />
                      </div>
                    ) : (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <TextFieldComponent
                            type="text"
                            className=""
                            id="songUrl"
                            label="Enter Song URL"
                            labelClassName=""
                            inputClassName=""
                            error={songUrlErr ? true : false}
                            helperText={songUrlErr}
                            helperTextClassName="errormsg"
                            isDisable={false}
                            placeholder="Enter Song URL"
                            onChange={handleChangeURL}
                            value={songUrl}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                    disabled={isLoading === true || isImgLoading === true}
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
      callAddMusicApiAction: callAddMusicApi,
      callCategoryListAPIAction: callCategoryListAPI,
      callSongUploadAPIAction: callSongUploadAPI,
      callFileUploadAPIAction: callFileUploadAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddMusic);
