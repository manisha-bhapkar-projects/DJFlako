import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callFileUploadAPI } from "../../actions/FileUploadAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import constants from "../../utils/constants";
import {
  callUpdateEventsApi,
  callEventsDetail,
} from "../../actions/EventAction";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import "react-sweet-progress/lib/style.css";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";

const EditEvents = (props) => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isAddressError, setAddressError] = useState("");
  const [isDateError, setDateError] = useState("");
  const [isTimeError, setTimeError] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [isFileError, setFileError] = useState("");
  const [upload, setUpload] = useState("");
  const id = props.match.params.id;
  const [usersData, setUserData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditTime, setIsEditTime] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(false);

  useEffect(() => {
    getEventDetails(id);
  }, []);

  const getEventDetails = (id) => {
    props
      .callEventsDetailAction(id)
      .then((res) => {
        console.log("event details", res);
        setUserData(res.data.data);
        setFile(res.data.data.image);
        setTime(res.data.data.time);
        setName(res.data.data.title);
        setAddress(res.data.data.location);
        setDate(res.data.data.date);
        setDescription(res.data.data.description);
        console.log("current time", res.data.data.time);
        const date = new Date(`01-01-1970 ${res.data.data.time}`);
        console.log("date", date);
        setTime(date);
      
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      address.trim() === "" ||
      file === "" ||
      date === "" ||
      time === "" ||
      description.trim() === ""
    ) {
      if (name.trim() === "") {
        setNameError("Enter Event Name");
      }
      if (address.trim() === "") {
        setAddressError("Enter Event Address");
      }
      if (file.trim() === "") {
        setFileError("Please Select File");
      }
      if (date === "") {
        setDateError("Enter Event Date");
      }
      if (time === "") {
        setTimeError("Enter Event Time");
      }
      if (description.trim() === "") {
        setDescriptionError("Enter Event Description");
      }
      return null;
    }

    const request = {
      event_id: id,
      title: usersData.title,
      description: usersData.description,
      location: usersData.location,
      // image: file,
      // date: usersData.date,
      // time: usersData.time,
      date: moment(usersData.date).format("YYYY/MM/DD"),
      // time: (moment(usersData.time).format("HH:mm:ss"))
    };
    //  if(usersData.time){
    //     request.time =(moment(usersData.time).format("HH:mm:ss"))
    //  }
    if (file == usersData.image) {
      request.image = usersData.image;
    } else {
      request.image = file;
    }

    if (isEditTime) {
      request.time = moment(usersData.time).format("HH:mm:ss");
    } else {
      // request.time = time
      request.time = moment(time).format("HH:mm:ss");
    }

    props
      .callUpdateEventsApiAction(request)
      .then((response) => {
        console.log("Edit Event", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Updated Successfully",
            "Success",
            2000
          );
          props.history.push(constants.ROUTE.SIDEBAR.EVENTS);
        } else {
          CustomeNotification("error", response.data.msg, "Error", 2000);
          setDescriptionError(response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeName = (e) => {
    setNameError("");
    setName(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.title = e.target.value;
    }
    setUserData(data);
    setNameError("");
  };

  const handleChangeAddress = (e) => {
    setAddressError("");
    setAddress(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.location = e.target.value;
    }
    setUserData(data);
    setAddressError("");
  };
  const handleChangeDate = (date, e) => {
    setDate(date);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.date = date;
    }
    setUserData(data);
    setDateError("");
    setIsOpenDate(false);
  };
  const handleChangeTime = (date, e) => {
    console.log("target time", date);
    setTime(date);
    setIsEditTime(true);
    const data = { ...usersData };
    if (usersData) {
      data.time = date;
    }
    setUserData(data);
    setTimeError("");
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
          data.image = event.target.file[0];
        }
        setUserData(data);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.EVENTS}>Event List</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Event
          </li>
        </ol>
      </nav>
      <div className="row">
        <div
          className="col-md-12 
                stretch-card"
        >
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Edit Event</h6>
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
                          className=""
                          id="name"
                          label="Name Of Event"
                          labelClassName=""
                          inputClassName=""
                          error={isNameError ? true : false}
                          helperText={isNameError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Event Name"
                          onChange={handleChangeName}
                          value={name}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          className=""
                          id="address"
                          label="Address"
                          labelClassName=""
                          inputClassName=""
                          error={isAddressError ? true : false}
                          helperText={isAddressError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Event Place"
                          value={address}
                          onChange={handleChangeAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Event Date</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container>
                            <KeyboardDatePicker
                              variant="inline"
                              value={date}
                              disablePast
                              helperText={null}
                              format="yyyy/MM/dd"
                              error={isDateError ? true : false}
                              helperText={isDateError}
                              helperTextClassName="errormsg"
                              onChange={handleChangeDate}
                              KeyboardButtonProps={{
                                onFocus: (e) => {
                                  setIsOpenDate(true);
                                },
                              }}
                              PopoverProps={{
                                disableRestoreFocus: true,
                                onClose: () => {
                                  setIsOpenDate(false);
                                },
                              }}
                              InputProps={{
                                onFocus: () => {
                                  setIsOpenDate(true);
                                },
                              }}
                              open={isOpenDate}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Event Time</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container>
                            <KeyboardTimePicker
                              variant="inline"
                              value={time}
                              disablePast
                              helperText={null}
                              format="HH:mm:ss"
                              error={isTimeError ? true : false}
                              helperText={isTimeError}
                              helperTextClassName="errormsg"
                              onChange={handleChangeTime}
                              KeyboardButtonProps={{
                                onFocus: (e) => {
                                  setIsOpenTime(true);
                                },
                              }}
                              PopoverProps={{
                                disableRestoreFocus: true,
                                onClose: () => {
                                  setIsOpenTime(false);
                                },
                              }}
                              InputProps={{
                                onFocus: () => {
                                  setIsOpenTime(true);
                                },
                              }}
                              open={isOpenTime}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-sm-4">
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
                        className="img-xs p-1"
                        src={`${constants.API.UPLOADS_BASE_URL.IMAGES}${file}`}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Event Description</label>
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
      callFileUploadAPIAction: callFileUploadAPI,
      callUpdateEventsApiAction: callUpdateEventsApi,
      callEventsDetailAction: callEventsDetail,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditEvents);
