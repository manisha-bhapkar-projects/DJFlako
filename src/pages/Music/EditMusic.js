import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import {
  callAddMusicApi,
  callEditMusicApi,
  callSongDetail,
} from "../../actions/MusicAction";
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
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";
import CustomeSongUpload from "../../components/CustomeSongUpload/CustomeSongUpload";
const EditMusic = (props) => {
  const [songname, setSongname] = useState("");
  const [selectvalue, setSelectValue] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [radioErr, setRadioErr] = useState("");
  const [songErr, setSongErr] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [details, setDetails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectErr, setSelectErr] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [songUrlErr, setSongUrlErr] = useState("");
  const [usersData, setUserData] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const hiddensongInput = React.useRef(null);
  const [radio, setRadio] = useState("0");
  const id = props.match.params.id;
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadSongPercentage, setSongUploadPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);

  useEffect(() => {
    getCategoryList();
    getSongDetails(id);
  }, []);

  const getSongDetails = (id) => {
    props
      .callSongDetailAction(id)
      .then((res) => {
        console.log("song details", res);
        setDetails(res.data.data);
        setSelectValue(res.data.data.category_id);
        setImage(res.data.data.image);
        setFile(res.data.data.song_file);
        setSongUrl(res.data.data.song_url);
        console.log("singurl", res.data.data.song_url);

        setSongname(res.data.data.name);
        console.log("name", res.data.data.name);
        setRadio(res.data.data.song_url ? "1" : "0");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategoryList = () => {
    props
      .callCategoryListAPIAction()
      .then((response) => {
        console.log("Category list", response.data.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeURL = (e) => {
    setSongUrlErr("");
    setSongUrl(e.target.value);
    setIsEdit(true);
    const data = { ...details };
    if (details) {
      data.song_url = e.target.value;
    }
    setDetails(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (songname.trim() === "" ||
     (radio == "0" && file === "") ||
      (radio == "1" && songUrl.trim() === "")  ||
       selectvalue === "" || selectvalue === "Select Categories" 
      ) 
       {
      if (songname.trim() === "") {
        setSongErr("Enter Song Name");
      }
      if (radio == "0" && file === "" ) {
        setFileErr("Please Upload Song");
      }
      if (radio == "1" &&  songUrl.trim() === "") {
        setSongUrlErr("Enter Song URL");
      }
      if ( selectvalue === "" || selectvalue === "Select Categories" ) {
        setSelectErr("Select Option");
      }
     

      return null;
    }

    const request = {
      song_id: id,
      name: songname,
      duration: "03:25",
      category_id: selectvalue,
    };
    if (songUrl == "") {
      request.song_file = file;
      // request.song_url = "";
    } else {
      request.song_url = songUrl;
      // request.song_file = "";
    }
    if (image == details.image) {
      request.image = details.image;
    } else {
      request.image = image;
    }

    props
      .callEditMusicApiAction(request)
      .then((response) => {
        console.log("Edit Music", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Song Updated Successfully",
            "Success",
            2000
          );
          props.history.push(constants.ROUTE.SIDEBAR.MUSIC);
        }
        else{
          CustomeNotification("error", response.data.msg, "Error", 2000);

        }
      })
      .catch((err) => {
      });
  };

  const handleChangeSongName = (e) => {
    console.log("songname", e.target.value);

    setSongErr("");
    setSongname(e.target.value);
    setIsEdit(true);
    const data = { ...details };
    if (details) {
      data.name = e.target.value;
    }
    setDetails(data);
  };

  const handleChangeSelectValue = (e) => {
    setSelectErr("");
    setSelectValue(e.target.value);
    console.log("category", e.target.value);
    setIsEdit(true);
    const data = { ...details };
    if (details) {
      data.category_id = e.target.value;
    }
    setDetails(data);
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
    setSongUrl("");
    setFile("");
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
            Edit Music
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Edit Music</h6>
              <div
                className="cmxform"
                id="signupForm"
                method="get"
                noValidate="novalidate"
              >
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
                        title="Banner Upload"
                        hiddenFileInput={hiddenFileInput}
                        handleChangeImage={handleChangeImage}
                        handleClickFile={handleClickFile}
                        value={image}
                        uploadPercentage={uploadPercentage}
                        error={imageErr ? true : false}
                        helperText={imageErr}
                        isImgLoading = {isImgLoading}
                      

                      />
                        <img
                        className="img-xs mb-3" 
                        src={`${constants.API.UPLOADS_BASE_URL.IMAGES}${image}`}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="name">Category List</label>
                        <select
                          className="form-control"
                          onChange={handleChangeSelectValue}
                          value={selectvalue}
                          style={{ color: "#464545" }}
                        >
                          <option>Select Categories</option>
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
                        <div
                          className="form-check 
                                                form-check-inline"
                        >
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="radio"
                              id="optionsRadios"
                              value="1"
                              checked={radio == "1"}
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
                              checked={radio == "0"}
                              id="optionsRadios"
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

                    {
                      radio == "0" ? (
                        <div className="col-sm-6">
                          <CustomeSongUpload
                            hiddensongInput={hiddensongInput}
                            handleChangesong={handleChangesong}
                            value={file}
                            handleClickSong={handleClickSong}
                            uploadSongPercentage={uploadSongPercentage}
                            error={fileErr ? true : false}
                            helperText={fileErr}
                            isLoading = {isLoading}

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
                      )
                    }
                  </div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                    disabled={
                      isLoading === true || isImgLoading === true}
                  />
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
      callEditMusicApiAction: callEditMusicApi,
      callCategoryListAPIAction: callCategoryListAPI,
      callSongDetailAction: callSongDetail,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditMusic);
